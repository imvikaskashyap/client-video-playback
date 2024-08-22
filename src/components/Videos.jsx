import React, { useState, useEffect } from 'react';
import { Heading, Stack, VStack, Button, HStack } from '@chakra-ui/react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { BACKEND_URL } from '../utils/config';

const Videos = () => {
  const [videoArr, setVideoArr] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [savedTime, setSavedTime] = useState(0);

  const userId = localStorage.getItem('userId');

  console.log(currentVideoIndex)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/videos/videoList`);
        setVideoArr(response.data);

        if (userId && response.data.length > 0) {
          const progressResponse = await axios.get(
            `${BACKEND_URL}/progress/user/${userId}`
          );

         
          if (progressResponse.data.length > 0) {
            const lastProgress = progressResponse.data[0]; 

            setCurrentVideoIndex(lastProgress.currentVideoIndex);
            setSavedTime(lastProgress.durationWatched);
          }
        }
      } catch (error) {
        console.error('Error fetching videos or progress:', error);
      }
    };

    fetchVideos();
  }, []);

  const playerRef = React.useRef(null);

  useEffect(() => {
    if (savedTime > 0 && playerRef.current) {
      playerRef.current.seekTo(savedTime, 'seconds');
    }
  }, [savedTime]);
  
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (playerRef.current) {
        const watchedSeconds = playerRef.current.getCurrentTime();
        const videoDuration = videoArr[currentVideoIndex]?.duration;
  
        try {
          await axios.post(`${BACKEND_URL}/progress/videoProgress`, {
            userId,
            videoId: videoArr[currentVideoIndex]._id,
            durationWatched: watchedSeconds,
            videoDuration: videoDuration,
            currentVideoIndex: currentVideoIndex, 
          });
        } catch (error) {
          console.error('Error saving progress before unload:', error);
        }
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentVideoIndex, videoArr]);
  

  const handleProgress = async (progress) => {
    const watchedSeconds = progress.playedSeconds;
    const videoDuration = videoArr[currentVideoIndex]?.duration;
  
    try {
      await axios.post(`${BACKEND_URL}/progress/videoProgress`, {
        userId,
        videoId: videoArr[currentVideoIndex]._id,
        durationWatched: watchedSeconds,
        videoDuration: videoDuration,
        currentVideoIndex: currentVideoIndex + 1, 
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };
  

  const handleVideoEnd = () => {
    setCompletedVideos(prevCompleted => [...prevCompleted, currentVideoIndex]);

    if (currentVideoIndex < videoArr.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const handleVideoClick = index => {
    if (completedVideos.includes(index)) {
      setCurrentVideoIndex(index);
    }
  };

  return (
    <Stack direction={['column', 'row']} h={'100vh'} marginTop={'100px'}>
      <VStack w={'100vw'} h={'100vh'}>
      {videoArr.length > 0 && videoArr[currentVideoIndex] && (
  <ReactPlayer
    ref={playerRef}
    url={videoArr[currentVideoIndex].videoUrl}
    playing
    controls
    width="100%"
    height="100%"
    onProgress={handleProgress}
    onEnded={handleVideoEnd}
  />
)}


        <HStack spacing={'4'}>
          <Button
            onClick={handlePreviousVideo}
            isDisabled={currentVideoIndex === 0}
            colorScheme={'purple'}
          >
            Previous
          </Button>
        </HStack>

        <VStack alignItems={'flex-start'} p={'8'} w={'full'}>
          <Heading>
            {videoArr[currentVideoIndex]?.title || 'No Title Available'}
          </Heading>
        </VStack>
      </VStack>

      <VStack
        w={['full', 'xl']}
        alignItems={'stretch'}
        overflowY={'auto'}
        spacing={'8'}
        p="8"
      >
        {videoArr.map((video, index) => (
          <Button
            key={video._id}
            variant={'ghost'}
            colorScheme={'purple'}
            onClick={() => handleVideoClick(index)}
            isDisabled={!completedVideos.includes(index)}
            style={{
              opacity: completedVideos.includes(index) ? 1 : 0.5,
            }}
          >
            {video.title || `Video ${index + 1}`}
          </Button>
        ))}
      </VStack>
    </Stack>
  );
};

export default Videos;
