import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { Button, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useAuth } from 'src/hooks/use-auth';
import { httpAddSportsplan } from 'src/hooks/requests';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import FormRow from 'src/components/form/form-row';

export default function AddPlanView() {
  const theme = useTheme();

  const navigate = useNavigate()


  const { isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: httpAddSportsplan,
    onSuccess: () => {
      toast.success('New sports plan was added');
      reset()
    },
    onError: (err) => toast.error(err.message),
  });
  async function onSubmit(data) {
    // mutate(data);
    console.log(data)
    mutate(data)
  }

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormRow error={errors?.spn?.message}>
          <TextField
            name="spn"
            label="Sports plan name"
            type="text"
            {...register('spn', { required: 'The field is required' })}
          />
        </FormRow>
        <FormRow error={errors?.amount?.message}>
          <TextField
            name="amount"
            label="Amount"
            type="number"
            {...register('amount', { required: 'The field is required', validate: (value) => Number(value) > 0 || "Price should be more than ksh.0" })}
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
          disabled={isLoading}
        >
          Add Plan
        </LoadingButton>
      </Stack>
    </form>
  );

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Sports plan</Typography>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => navigate('/view-plans')}
          endIcon={<Iconify icon="eva:eye-fill" />}
        >
          View plans
        </Button>
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
            <Typography variant="h4">Add Plan</Typography>

            <Divider sx={{ my: 3 }} />

            {renderForm}
          </Card>
        </Stack>
      </Box>
    </Container>
  );
}
