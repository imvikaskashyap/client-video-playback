import React, { useState } from 'react';
import {
  Container,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../utils/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/users/login`, {
        email,
        password,
      });

      toast({
        title: 'Login Successful',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setTimeout(toast.closeAll, 5000);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      navigate('/videos');
    } catch (error) {
      toast({
        title: 'Login Failed',
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
          <Heading textAlign={'center'}>Welcome Back</Heading>

          <Input
            placeholder="Email"
            type={'email'}
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            focusBorderColor={'purple.500'}
          />
          <Input
            placeholder="Password"
            type={'password'}
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            focusBorderColor={'purple.500'}
          />

          <Button colorScheme={'purple'} type={'submit'} isLoading={loading}>
            Log In
          </Button>

          <Text textAlign={'right'}>
            New User?{' '}
            <Button colorScheme={'pink'} variant={'link'}>
              <Link to={'/signup'}>Sign Up</Link>
            </Button>
          </Text>
        </VStack>
      </form>
    </Container>
  );
};

export default Login;
