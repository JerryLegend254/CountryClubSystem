import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Grid, Button, Container } from '@mui/material';

import { useAuth } from 'src/hooks/use-auth';
import { usePayments } from 'src/hooks/use-payments';

import Iconify from 'src/components/iconify';

import AppOrderTimeline from '../../overview/app-order-timeline';

export default function UserPaymentsView() {
  const { payments, calculateTotalPaymentsByUser } = usePayments();
  const { user } = useAuth();
  const navigate = useNavigate();

  const useInfo = calculateTotalPaymentsByUser(payments, user.uid);

  const userPayArr = useInfo[user.uid];
  const rightArr = userPayArr?.payments.filter((subarr) => subarr.userId === user.uid);

  const sum = rightArr?.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">My expenditure</Typography>
        <Typography variant="h3">${sum}</Typography>
      </Stack>
      <Grid xs={12} md={6} item lg={4}>
        <AppOrderTimeline
          title="My payments"
          list={rightArr?.map((p, index) => ({
            id: p.id,
            title: `${p.sportplanId} : $${p.price}`,
            type: `order${index + 1}`,
            time: p.paymentDate,
          }))}
        />
      </Grid>
      <Stack mt={3}>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => navigate('/user-index/add-plan')}
          endIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add to my plans
        </Button>
      </Stack>
    </Container>
  );
}
