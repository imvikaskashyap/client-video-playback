import React from 'react';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box bgGradient="linear(to-r, purple.500, pink.500)" color="white" minHeight="100vh" padding="20px">
      <Flex alignItems="center" justifyContent="center" direction="column" textAlign="center" height="100vh">
        <VStack spacing={6}>
          <Heading size="2xl" fontFamily="Poppins" fontWeight="bold">
            Welcome to Your Learning Platform
          </Heading>
          <Text fontSize="xl" fontWeight="medium" maxW="600px" px={4}>
            Enhance your skills with our curated list of videos. Continue your progress seamlessly and learn at your own pace.
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default HomePage;
