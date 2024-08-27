import React from 'react';
import {
  VStack,
  Box,
  Heading,
  Text,
  Center,
  Container,
} from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Container maxW="container.lg" py={10}>
      <Center>
        <Box
          w="full"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          bgGradient="linear(to-r, teal.100, cyan.100)"
        >
          <VStack spacing={6} align="start">
            <Heading as="h1" size="xl" textAlign="center" color="teal.600">
              You'r Welcome!
            </Heading>

            <Text fontSize="lg" color="gray.700">
              1. Please <strong>Sign Up</strong> first, and then{' '}
              <strong>Log In</strong> to explore all the functionalities of this
              assignment web application.
            </Text>

            <Text fontSize="lg" color="gray.700">
              2. Please use <strong>Firefox browser</strong> to ensure this
              functionality works properly. In Chrome, there may be some issues
              such as buffering when the playback speed is trying to increasing
              but in firefox it doesn't.
            </Text>

            <Text fontSize="lg" color="gray.700">
              3. You can also upload videos using this application. This
              functionality is primarily designed for an admin role, but I have
              not implemented the admin role to keep the project scope
              manageable.
            </Text>

            <Text fontSize="lg" color="gray.700">
              4. The application updates the video-watched duration every
              second. An alternative approach could be storing the data in
              cookies.
            </Text>
            <Text fontSize="lg" color="gray.700">
              5. I have implemented a video player with all functionality which
              was given in assignment:
             
            </Text>

            <Text fontSize="lg" color="gray.700">
              6. Please note that the backend is hosted on Render, so it might
              take up to 50 seconds for the API to respond initially.
            </Text>
            <Text fontSize="lg" color="gray.700">
              7. Please check readme file for a detailed description of the solution.
            </Text>
          </VStack>
        </Box>
      </Center>
    </Container>
  );
};

export default HomePage;
