import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';

import { useAuth } from 'src/hooks/use-auth';

function Userpage() {
  const { logout } = useAuth();
  const  handleLogout = async() => {
    await logout();
  }
  return (
    <div>
      <Typography>
        User page
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleLogout}
        >
          Logout
        </LoadingButton>
      </Typography>
    </div>
  );
}

export default Userpage;
