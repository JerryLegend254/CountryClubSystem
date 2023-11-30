import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useAuth } from 'src/hooks/use-auth';

import { bgGradient } from 'src/theme/css';

import FormRow from 'src/components/form/form-row';
  
export default function ProfileView() {
  const theme = useTheme();

  const {updateUserProfile} = useAuth()

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success('Profile Changed successfully');
      reset();
      queryClient.invalidateQueries(['members']);
    },
    onError: (err) => toast.error(err.message),
  });
  async function onSubmit(data) {
    mutate(data);
  }

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormRow error={errors?.username?.message}>
          <TextField
            name="username"
            label="Username"
            type="text"
            {...register('username', { required: 'The field is required' })}
          />
        </FormRow>
        <FormRow error={errors?.photoUrl?.message}>
            <TextField
            name="photoUrl"
            placeholder="Profile Picture Url"
            type="text"
            {...register('photoUrl', { required: 'The field is required' })}
          />
        </FormRow>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          // onClick={handleClick}
          // disabled={isLoading}
        >
          Update Profile
        </LoadingButton>
      </Stack>
    </form>
  );

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Profile</Typography>
      </Stack>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/background/overlay_4.jpg',
          }),
          height: 1,
        }}
      >

        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <Typography variant="h4">Update Profile</Typography>

            <Divider sx={{ my: 3 }} />

            {renderForm}
          </Card>
        </Stack>
      </Box>
    </Container>
  );
}
