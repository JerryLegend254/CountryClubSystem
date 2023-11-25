import { Helmet } from 'react-helmet-async';

import { UserPaymentsView } from 'src/sections/user-payments/view';

// ----------------------------------------------------------------------

export default function AddPlanPage() {
  return (
    <>
      <Helmet>
        <title> My plans | Jerked UI </title>
      </Helmet>

      <UserPaymentsView />
    </>
  );
}
