import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Avatar, Box } from '@mui/material';
import { axiosinstance } from '../../AxiosInstance/axios.js';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosinstance.get('/auth/userfetch');
        if (response.status === 200) {         
          setUser(response.data.result); // Assuming result = { name, email, createdAt, avatarUrl }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <Typography variant="body1" sx={{ p: 2 }}>
        Loading user profile...
      </Typography>
    );
  }

  return (
<>
<Grid container spacing={3}>
      {/* Profile Header */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar
            alt={user.displayName}
            src={user.avatar} // fallback avatar
            sx={{ width: 80, height: 80 }}
          />
          <Box>
            <Typography variant="h5">{user.displayName}</Typography>
            <Typography variant="body2" color="text.secondary">{user.email}</Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Email */}
      <Grid item xs={12} md={6}>
        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Email</Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Paper>
      </Grid>

      {/* Created At */}
      <Grid item xs={12} md={6}>
        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Created At</Typography>
          <Typography variant="body1">
            {new Date(user.createdAt).toLocaleDateString()}
          </Typography>
        </Paper>
      </Grid>


     
    </Grid>
{/* <div className='bg-red-300 w-[35vw] rounded-3xl h-[46vw] relative'>
    <h1 className='flex justify-center mt-10'>{user.displayName}</h1>

<div className='bg w-[30vw] h-[40vw] absolute top-8 left-6 border border-gray-400 rounded-4xl'>

</div>

</div> */}
</>
);
};

export default UserProfile;
