import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { Select, Button, MenuItem, Container, TextField, InputLabel, FormControl } from '@mui/material';

import { useAuth } from 'src/hooks/use-auth';
import { usePlans } from 'src/hooks/use-plans';
import { httpAddToMySportsplans } from 'src/hooks/requests';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import FormRow from 'src/components/form/form-row';

export default function AddUserPlanView() {
  const theme = useTheme();

  const { sportplans } = usePlans();
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { user, isLoading } = useAuth();

  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const selectedPlan = watch('plan');

  useEffect(() => {
    const selectedSportPlan = sportplans?.find((plan) => plan.id === selectedPlan);
    if (selectedSportPlan) {
      setValue('amount', Number(selectedSportPlan.price));
    }
  }, [selectedPlan, setValue, sportplans]);
  // const [planCost, setPlanCost] = useState('');

  const { mutate } = useMutation({
    mutationFn: httpAddToMySportsplans,
    onSuccess: () => {
      toast.success('New sportsplan  has been added to your plans');
      reset();
      queryClient.invalidateQueries(['sportsplan'])
    },
    onError: (err) => toast.error(err.message),
  });
  async function onSubmit(data) {
    const userId = user.uid;
    mutate({ ...data, userId });
  }

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormRow error={errors?.plan?.message}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sports plan</InputLabel>
            <Controller
              name="plan"
              control={control}
              defaultValue=""
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Sports plan"
                  {...field}
                >
                  {sportplans?.map(({ id, name, price }) => (
                    <MenuItem key={id} value={id}>{`${name} : $${price}`}</MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </FormRow>

        <TextField name="amount" disabled {...register('amount')} />
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
          Add to my plans
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
          onClick={() => navigate('/user-index/user-payments')}
          endIcon={<Iconify icon="eva:eye-fill" />}
        >
          View my plans
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
