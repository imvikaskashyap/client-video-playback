import React from 'react';
import { VStack } from '@chakra-ui/react';
import ProgressDashboard from './ProgressDashboard';

const Dashboard = () => {
  const userId = localStorage.getItem('userId');
  // console.log(userId, typeof userId);
  // const userId = '66c7457d1d40ae06dc0e457b';
 

  return (
    <VStack>
      <ProgressDashboard userId={userId} />
    </VStack>
  );
};

export default Dashboard;
