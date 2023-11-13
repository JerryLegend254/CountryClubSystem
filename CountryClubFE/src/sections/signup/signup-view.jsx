import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/hooks/use-auth';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import FormRow from 'src/components/form/form-row';

export default function SignInView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const { signup, isLoading, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success('User was created successfully');
    },
    onError: (err) => toast.error(err.message),
  });
  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  async function onSubmit(data) {
    mutate(data);
  }

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormRow error={errors?.email?.message}>
          <TextField
            name="email"
            label="Email address"
            type="email"
            {...register('email', { required: 'The field is required' })}
          />
        </FormRow>
        <FormRow error={errors?.username?.message}>
          <TextField
            name="username"
            label="Username"
            {...register('username', { required: 'The field is required' })}
          />
        </FormRow>
        <FormRow error={errors?.password?.message}>
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'The field is required' })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormRow>
        <FormRow error={errors?.confPass?.message}>
          <TextField
            name="conf_password"
            label="Confirm Password"
            type={showConfPassword ? 'text' : 'password'}
            {...register('confPass', {
              required: 'The field is required',
              validate: (value) => value === getValues().password || 'Password do not match',
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfPassword(!showConfPassword)} edge="end">
                    <Iconify icon={showConfPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormRow>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        // onClick={handleClick}
        disabled={isLoading}
      >
        Sign Up
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign up to Jerked C.C</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <NavLink variant="subtitle2" sx={{ ml: 0.5 }} to="/login">
              Login
            </NavLink>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
