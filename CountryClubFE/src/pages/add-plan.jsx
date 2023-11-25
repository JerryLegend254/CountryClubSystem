import { Helmet } from 'react-helmet-async';

import { AddPlanView } from '../sections/add-plan/view';

// ----------------------------------------------------------------------

export default function AddPlanPage() {
  return (
    <>
      <Helmet>
        <title> Add plan | Jerked UI </title>
      </Helmet>

      <AddPlanView />
    </>
  );
}
