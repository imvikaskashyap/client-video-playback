import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 
const ProgressBar = ({ completedVideos, totalVideos }) => {
 
  const overallCompletionPercentage =
    totalVideos > 0 ? (completedVideos.length / totalVideos) * 100 : 0;

  return (
    <Box
      position="absolute"
      top="40px"
      right="30px"
      width="80px"
      height="80px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      //   bg="white"
      borderRadius="50%"
      zIndex="1000"
    >
      <CircularProgressbar
        value={overallCompletionPercentage}
        text={`${Math.round(overallCompletionPercentage)}%`}
        styles={buildStyles({
          textSize: '20px',
          pathColor: `rgba(62, 152, 199, ${overallCompletionPercentage / 100})`,
          textColor: '#60b607',
          trailColor: '#D9D9D9',
        })}
      />
      <Text mt={2}  fontSize="xs" textAlign="center">
        {completedVideos.length}/{totalVideos} completed
      </Text>
    </Box>
  );
};

export default ProgressBar;
