import React from 'react';
import { HStack, Button, Text } from '@chakra-ui/react';

const NavigationButtons = ({
  handlePreviousVideo,
  handleNextVideo,
  currentVideoIndex,
  videoCompleted,
  videoArrLength,
  prevVideoTitle,
  nextVideoTitle,
}) => (
  <>
    <HStack width="100%" justifyContent="space-between" px="4" marginTop={"30px"}>
      <Button
        onClick={handlePreviousVideo}
        isDisabled={currentVideoIndex === 0}
        colorScheme="purple"
      >
        Previous
      </Button>
      <Button
        onClick={handleNextVideo}
        isDisabled={!videoCompleted || currentVideoIndex === videoArrLength - 1}
        colorScheme="purple"
      >
        Next
      </Button>
    </HStack>
    <HStack width="100%" justifyContent="space-between" px="4" mt="10px">
      <Text>{prevVideoTitle}</Text>
      <Text>{nextVideoTitle}</Text>
    </HStack>
  </>
);

export default NavigationButtons;
