import React, { useState, useEffect, useRef } from 'react';
import { Stack, Box } from '@chakra-ui/react';
import axios from 'axios';
import { BACKEND_URL } from '../utils/config';
import VideoDetails from '../components/VideoDetails';
import VideoPlayer from '../components/VideoPlayer';
import NavigationButtons from '../components/NavigationButtons';
import ProgressBar from '../components/ProgressBar';

const Videos = () => {
  const [videoArr, setVideoArr] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); 
  const [completedVideos, setCompletedVideos] = useState([]);
  const [videoProgress, setVideoProgress] = useState([]);
  const [seeking, setSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [savedProgress, setSavedProgress] = useState(0);

  const userId = localStorage.getItem('userId');
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/videos/videoList`);
        setVideoArr(response.data);

        if (userId && response.data.length > 0) {
          const progressResponse = await axios.get(`${BACKEND_URL}/progress/user/${userId}`);
          const progressData = progressResponse.data;

          if (progressData.length > 0) {
            // Initialize video progress data
            const videoProgressData = response.data.map((video, index) => {
              const progress = progressData.find(p => p.videoId === video._id);
              return progress
                ? { ...progress, currentVideoIndex: index }
                : { videoId: video._id, currentVideoIndex: index, durationWatched: 0, videoDuration: video.duration };
            });

            setVideoProgress(videoProgressData);

            // Set completed videos
            const completed = progressData
              .filter(progress => progress.durationWatched >= progress.videoDuration)
              .map(progress => response.data.findIndex(video => video._id === progress.videoId));
            setCompletedVideos(completed);

            // Determine where to start for the current user 
            const lastWatchedIndex = progressData.findIndex(progress => progress.durationWatched > 0);
            const savedIndex = parseInt(localStorage.getItem('currentVideoIndex'), 10);

            // If the saved index is valid and matches the current user, use it --->
            if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < response.data.length) {
              setCurrentVideoIndex(savedIndex);
            } else if (lastWatchedIndex >= 0) {
              setCurrentVideoIndex(lastWatchedIndex); // Resume from last watched video --->
            }
          } else {
            // No progress found for the current user, start from the first video --->
            setCurrentVideoIndex(0);
          }
        } else {
          // No user ID or video data, reset to 0 index --->
          setCurrentVideoIndex(0);
        }
      } catch (error) {
        console.error('Error fetching videos or progress:', error);
      }
    };

    fetchVideos();
  }, [userId]);

  // Fetch and apply saved progress for the current video --->
  useEffect(() => {
    const fetchSavedProgress = async () => {
      if (userId && videoArr[currentVideoIndex]) {
        try {
          const response = await axios.get(`${BACKEND_URL}/progress/user/${userId}`);
          const videoData = response.data.find(v => v.videoId === videoArr[currentVideoIndex]._id);

          if (videoData && videoData.durationWatched) {
            setSavedProgress(videoData.durationWatched);

            // Seek to the saved progress
            if (playerRef.current) {
              playerRef.current.seekTo(videoData.durationWatched, 'seconds');
            }
          }
        } catch (error) {
          console.error('Error fetching saved progress:', error);
        }
      }
    };

    fetchSavedProgress();
  }, [currentVideoIndex, videoArr, userId]);

  const handleProgress = (progress) => {
    const playedSeconds = Math.round(progress.playedSeconds); 
    const videoDuration = Math.round(videoArr[currentVideoIndex]?.duration); 
    const buffer = 2; 

    if (!seeking && playedSeconds >= videoProgress[currentVideoIndex]?.durationWatched + buffer) {
      playerRef.current.seekTo(videoProgress[currentVideoIndex]?.durationWatched, 'seconds');
    } else if (!seeking && playedSeconds > videoProgress[currentVideoIndex]?.durationWatched) {
      updateVideoProgress(currentVideoIndex, playedSeconds);
    }

    if (playedSeconds && videoDuration) {
      const isAtEnd = playedSeconds >= videoDuration;

      if (isAtEnd) {
       
        updateVideoProgress(currentVideoIndex, videoDuration); 
        setCompletedVideos(prev => [...new Set([...prev, currentVideoIndex])]);
      }

      axios.post(`${BACKEND_URL}/progress/videoProgress`, {
        userId,
        videoId: videoArr[currentVideoIndex]._id,
        // Use full duration of the video if at the end
        durationWatched: isAtEnd ? videoDuration : playedSeconds, 
        videoDuration: videoDuration,
        currentVideoIndex: currentVideoIndex,
      }).catch(error => console.error('Error updating progress:', error));
    }
  };

  const updateVideoProgress = (index, playedSeconds) => {
    setVideoProgress(prevProgress =>
      prevProgress.map((progress, i) =>
        i === index ? { ...progress, durationWatched: playedSeconds } : progress
      )
    );
  };

  const handleSeek = seconds => {
    setSeeking(false);
    if (seconds > videoProgress[currentVideoIndex]?.durationWatched) {
      playerRef.current.seekTo(videoProgress[currentVideoIndex]?.durationWatched, 'seconds');
    }
  };

  const handleSeekStart = () => setSeeking(true);

  const handleVideoEnd = () => {
    setCompletedVideos(prev => [...new Set([...prev, currentVideoIndex])]);
    // video fully watched 
    updateVideoProgress(currentVideoIndex, videoArr[currentVideoIndex]?.duration); 

    if (currentVideoIndex < videoArr.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      localStorage.setItem('currentVideoIndex', (currentVideoIndex + 1).toString());
      const nextVideoProgress = videoProgress[currentVideoIndex + 1];
      if (nextVideoProgress) {
        playerRef.current.seekTo(nextVideoProgress.durationWatched, 'seconds');
      }
      setIsPlaying(true);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      const previousIndex = currentVideoIndex - 1;

      // Reset the progress of the previous video to the beginning --- 0 sec
      setVideoProgress(prevProgress =>
        prevProgress.map((progress, i) =>
          i === previousIndex ? { ...progress, durationWatched: 0 } : progress
        )
      );

      setCurrentVideoIndex(previousIndex);
      localStorage.setItem('currentVideoIndex', previousIndex.toString());

      // Seek to the start of the previous video
      if (playerRef.current) {
        playerRef.current.seekTo(0, 'seconds');
      }

      setIsPlaying(true);
    }
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < videoArr.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      localStorage.setItem('currentVideoIndex', (currentVideoIndex + 1).toString());
      const nextVideoProgress = videoProgress[currentVideoIndex + 1];
      if (nextVideoProgress) {
        playerRef.current.seekTo(nextVideoProgress.durationWatched, 'seconds');
      }
      setIsPlaying(true);
    }
  };

  const nextVideoTitle = currentVideoIndex < videoArr.length - 1 ? videoArr[currentVideoIndex + 1]?.title : 'No video to next';
  const prevVideoTitle = currentVideoIndex > 0 ? videoArr[currentVideoIndex - 1]?.title : 'No video to previous';

  return (
    <Stack direction={['column', 'row']} h="100vh" mt="20px" p="50px" pr="0" mb="100px">
      <VideoDetails
        title={videoArr[currentVideoIndex]?.title}
        description={videoArr[currentVideoIndex]?.description}
      />
      <Box w="50%" position="relative" padding={"10px"} >
        {videoArr.length > 0 && (
          <VideoPlayer
            videoUrl={videoArr[currentVideoIndex]?.videoUrl}
            onProgress={handleProgress}
            onSeek={handleSeek}
            onSeekStart={handleSeekStart}
            onEnded={handleVideoEnd}
            isPlaying={isPlaying}
            playerRef={playerRef}
          />
        )}
        <NavigationButtons
          handlePreviousVideo={handlePreviousVideo}
          handleNextVideo={handleNextVideo}
          currentVideoIndex={currentVideoIndex}
          videoArrLength={videoArr.length}
          prevVideoTitle={prevVideoTitle}
          nextVideoTitle={nextVideoTitle}
        />
      </Box>
      <ProgressBar completedVideos={completedVideos} totalVideos={videoArr.length} />
    </Stack>
  );
};

export default Videos;
