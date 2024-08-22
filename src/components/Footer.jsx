import {
  Box,
  Heading,
  HStack,
  Stack,
  VStack,
  Button,
  Input,
  Text,
  Image,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import instaLogo from '../assets/Instagram_logo_2016.svg.png';
import linkedInLogo from '../assets/174857.png';
import gitHubLogo from '../assets/github-mark-white.png';
import logo from '../assets/ivideos-logos (1)/ivideos-logos.jpeg';

const Footer = () => {
  return (
    <Box bgColor={'blackAlpha.900'} minH={'40'} p={'12'} color={'white'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={'stretch'} w={'full'} px={'4'}>
          <Heading
            size="md"
            textTransform={'uppercase'}
            textAlign={['center', 'left']}
          >
            Subscribe to get updates
          </Heading>
          <HStack>
            <Input
              type={'email'}
              placeholder="Enter Your Email Here..."
              border={'1px'}
              borderRadius="3xl"
              focusBorderColor="1px"
            />
            <Button p={'0'} colorScheme={'purple'} variant={'ghost'}>
              <AiOutlineSend />
            </Button>
          </HStack>
        </VStack>

        <VStack
          w={'full'}
          borderLeft={['none', '1px solid white']}
          borderRight={['none', '1px solid white']}
        >
          <Heading display={'flex'} gap={'10px'} textAlign={'center'}>
            <Link to="/">
              <Image src={logo} h={'12'} borderRadius={'full'} />
            </Link>
            iVideos
          </Heading>
          <Text>All rights reserverd</Text>
        </VStack>

        <VStack w={'full'}>
          <Heading size={'lg'} mb={'4'}>
            Social Media
          </Heading>
          <Flex gap={'20px'}>
            <Link
              to="https://www.instagram.com/ivikaskashyap/"
              target={'_blank'}
            >
              <Image src={instaLogo} alt="Instagram" h={'12'} />
            </Link>
            <Link
              to="https://www.linkedin.com/in/vikas-kashyap-bb7a5318b/"
              target={'_blank'}
            >
              <Image src={linkedInLogo} alt="LinkedIn" h={'12'} />
            </Link>
            <Link to="https://github.com/imvikaskashyap" target={'_blank'}>
              <Image src={gitHubLogo} alt="GitHub" h={'12'} />
            </Link>
          </Flex>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
