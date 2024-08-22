import React, { useState, useEffect } from 'react';
import {
  VStack,
  Heading,
  Text,
  Box,
  Stack,
  Center,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BACKEND_URL } from '../../utils/config';

const ProgressDashboard = ({ userId }) => {
  const [progressData, setProgressData] = useState([]);
  const [totalVideoDuration, setTotalVideoDuration] = useState(0);
  // const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //  
  //   const storedUserId = localStorage.getItem('userId');
  //   console.log('Stored UserId:', storedUserId); // Debugging line
  //   if (storedUserId) {
  //     setUserId(storedUserId);
  //   } else {
  //     console.error('UserId not found in localStorage');
  //     setLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchProgress = async () => {
      try {
        const progressResponse = await axios.get(
          `${BACKEND_URL}/progress/user/${userId}`
        );
        console.log('Progress Data:', progressResponse.data);
        setProgressData(progressResponse.data);

        const durationResponse = await axios.get(
          `${BACKEND_URL}/videos/totalVideoDuration`
        );
        console.log(
          'Total Video Duration:',
          durationResponse.data.totalDuration
        );
        setTotalVideoDuration(durationResponse.data.totalDuration);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [userId]);

  const calculateOverallProgress = () => {
    if (totalVideoDuration === 0) {
      return { percentage: 0, totalDurationWatched: 0 };
    }

    const totalDurationWatched = progressData.reduce(
      (acc, item) => acc + item.durationWatched,
      0
    );

    return {
      percentage: (totalDurationWatched / totalVideoDuration) * 100 || 0,
      totalDurationWatched,
    };
  };

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const overallProgress = calculateOverallProgress();

  if (loading) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (!userId) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Text>User not logged in. Please log in to see your progress.</Text>
      </Flex>
    );
  }

  return (
    <VStack spacing={6} align="stretch" p={8} mb="50px">
      <Heading size="lg" textAlign="center">
        Your Video Progress
      </Heading>
      {totalVideoDuration > 0 ? (
        <>
          <Center>
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="md"
              w="full"
              maxW="350px"
              textAlign="center"
            >
              <Text fontWeight="bold" mb={4}>
                Overall Progress
              </Text>
              <CircularProgressbar
                value={overallProgress.percentage}
                text={`${overallProgress.percentage.toFixed(2)}%`}
                styles={buildStyles({
                  textColor: '#333',
                  pathColor: '#48BB78',
                  trailColor: '#D9D9D9',
                })}
              />
              <Text fontSize="sm" mt={4}>
                {overallProgress.percentage.toFixed(2)}% completed (
                {formatTime(overallProgress.totalDurationWatched)} watched of{' '}
                {formatTime(totalVideoDuration)})
              </Text>
            </Box>
          </Center>
          <Stack spacing={4} direction="row" wrap="wrap" justify="center">
            {progressData.map(item => (
              <Box
                key={item.videoId}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                w="full"
                maxW="250px"
                textAlign="center"
              >
                <Text fontWeight="bold" mb={4}>
                  {item.videoTitle}
                </Text>
                <CircularProgressbar
                  value={(item.durationWatched / item.videoDuration) * 100}
                  text={`${(
                    (item.durationWatched / item.videoDuration) *
                    100
                  ).toFixed(2)}%`}
                  styles={buildStyles({
                    textColor: '#333',
                    pathColor: '#FFD700',
                    trailColor: '#D9D9D9',
                  })}
                />
                <Text fontSize="sm" mt={4}>
                  {((item.durationWatched / item.videoDuration) * 100).toFixed(
                    2
                  )}
                  % completed ({formatTime(item.durationWatched)} watched of{' '}
                  {formatTime(item.videoDuration)})
                </Text>
              </Box>
            ))}
          </Stack>
        </>
      ) : (
        <Flex justify="center" align="center" height="200px">
          <Text>No videos available for tracking progress.</Text>
        </Flex>
      )}
    </VStack>
  );
};

export default ProgressDashboard;
