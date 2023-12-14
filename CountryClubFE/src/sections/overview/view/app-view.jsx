
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


  const groupedPayments = payments.reduce((result, payment) => {
    const dateKey = payment.paymentDate.split('T')[0]; // Extract date portion
    if (!result[dateKey]) {
      result[dateKey] = [];
    }
    result[dateKey].push(payment);
    return result;
  }, {});

  // Calculate the total for each day
  const dailyTotals = Object.keys(groupedPayments).map((dateKey) => ({
    paymentDate: dateKey, // Keep the date as a string
    total: groupedPayments[dateKey].reduce((sum, payment) => sum + payment.price, 0),
  }));

  // Sort the daily totals by date
  const sortedDailyTotals = dailyTotals.sort((a, b) => a.paymentDate.localeCompare(b.paymentDate));

  const chartData = {
    labels: sortedDailyTotals.map((total) => total.paymentDate),
    series: [
      {
        name: 'Total Payments',
        type: 'area',
        fill: 'gradient',
        data: sortedDailyTotals.map((total) => total.total),
      },
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
