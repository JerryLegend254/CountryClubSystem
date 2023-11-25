import { Helmet } from 'react-helmet-async';

import { PaymentsView } from 'src/sections/payments/view';



// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Payments | Minimal UI </title>
      </Helmet>

      <PaymentsView />
    </>
  );
}
