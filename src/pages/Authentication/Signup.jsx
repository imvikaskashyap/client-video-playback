import React, { useState } from 'react';
import { Container, VStack, Heading, Input, Button, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../utils/config';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting to register with:', { name, email, password });
      const response = await axios.post(`${BACKEND_URL}/users/register`, {
        name,
        email,
        password,
      });

      console.log('Registration successful:', response);

      toast({
        title: 'Registration Successful',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);

      toast({
        title: 'Registration Failed',
        description: error.response?.data?.message || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
      <form onSubmit={handleSubmit}>
        <VStack
          alignItems={'stretch'}
          spacing={'8'}
          w={['full', '96']}
          m={'auto'}
          my={'16'}
        >
          <Heading textAlign={'center'}>Sign Up</Heading>

          <Input
            placeholder="Name"
            type={'text'}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            focusBorderColor={'purple.500'}
          />
          <Input
            placeholder="Email"
            type={'email'}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            focusBorderColor={'purple.500'}
          />
          <Input
            placeholder="Password"
            type={'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            focusBorderColor={'purple.500'}
          />

          <Button
            colorScheme={'purple'}
            type={'submit'}
            isLoading={loading}
          >
            Sign Up
          </Button>

          <Text textAlign={'right'}>
            Already a User?{' '}
            <Button colorScheme={'pink'} variant={'link'}>
              <Link to={'/login'}>Log In</Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Signup;
