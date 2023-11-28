
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { usePlans } from 'src/hooks/use-plans';
import { useMembers } from 'src/hooks/use-members';
import { usePayments } from 'src/hooks/use-payments';

import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const { memberCount } = useMembers();
  const { plansCount } = usePlans();
  const { paymentCount, totalRevenue, totalPayments, payments } = usePayments();

  const chartData = {
    labels: payments.map((payment) => payment.paymentDate), // Adjust as needed
    series: [
      {
        name: 'Total Payments',
        type: 'area',
        fill: 'gradient',
        data: payments.map((payment) => payment.price), // Replace with the actual payment data property
      },
      // Add more series if needed
    ],
  };
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Revenue"
            total={totalRevenue}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_revenue.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Users"
            total={memberCount}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Sport plans"
            total={plansCount}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_hockey.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Payments"
            total={paymentCount}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_payments.svg" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Payments made over time"
            subheader="Gradient graph"
            chart={chartData}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Revenue per plan"
            chart={{
              series: totalPayments,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
