import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, onProgress, onSeek, onSeekStart, onEnded, isPlaying, playerRef,}) => (
  <ReactPlayer
    ref={playerRef}
    url={videoUrl}
    playing={isPlaying}
    controls
    width="100%"
    height="90%"
    onProgress={onProgress}
    onSeek={onSeek}
    onSeekStart={onSeekStart}
    onEnded={onEnded}
  />
);

export default VideoPlayer;
