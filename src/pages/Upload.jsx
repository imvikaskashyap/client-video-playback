import React, { useState } from 'react';
import {
  Button,
  Container,
  HStack,
  Input,
  VStack,
  Text,
  Box,
} from '@chakra-ui/react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import axios from 'axios';
import { BACKEND_URL } from '../utils/config';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleUpload = async e => {
    e.preventDefault();

    if (!file || !title || !description) {
      alert('Please provide a title, description, and choose a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/videos/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        alert('Video uploaded successfully!');
      } else {
        alert('Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video');
    }
  };

  return (
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
      <VStack h={'full'} color={'purple.500'} justifyContent={'center'}>
        <AiOutlineCloudUpload size={'60px'} />
        <form onSubmit={handleUpload}>
          <VStack spacing={4}>
            <Input
              required
              type={'text'}
              placeholder="Video Title"
              value={title}
              onChange={handleTitleChange}
            />
            <Input
              required
              type={'text'}
              placeholder="Video Description"
              value={description}
              onChange={handleDescriptionChange}
            />
            <HStack>
              <Input
                required
                type={'file'}
                accept="video/*"
                onChange={handleFileChange}
                css={{
                  '&::file-selector-button': {
                    border: 'none',
                    width: 'calc(100% + 36px)',
                    height: '100%',
                    marginLeft: '-18px',
                    color: 'purple',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                  },
                }}
              />
              <Button type="submit" colorScheme={'purple'}>
                Upload
              </Button>
            </HStack>
            {file && (
              <Box mt={4} textAlign="center">
                <Text fontSize="md" mb={2}>
                  Selected Video: {file.name}
                </Text>
              </Box>
            )}
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default Upload;
