
import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box 
      textAlign="center" 
      py={10} 
      px={6} 
      h="100vh"
      bgGradient="linear(to-r, purple.400, pink.400)"
      color="white"
    >
      <VStack spacing={6}>
        <Heading
          display="inline-block"
          as="h1"
          size="4xl"
        >
          404
        </Heading>
        <Text fontSize="2xl" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text fontSize="lg" mb={6}>
          The page you're looking for does not seem to exist.
        </Text>
        <Button
          colorScheme="purple"
          bg="purple.600"
          rounded="full"
          as={Link}
          to="/"
          _hover={{
            bg: 'purple.700',
          }}
        >
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;
