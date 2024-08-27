import React from 'react';
import { Heading, VStack, Text } from '@chakra-ui/react';

const VideoDetails = ({ title, description }) => (
  <VStack w="75%" p="8" alignItems="flex-start" mt={"70px"}>
    <Heading>{title || 'No Title Available'}</Heading>
    <Text mt={4}>{description || 'No Description Available'}</Text>
  </VStack>
);

export default VideoDetails;
