import { Helmet } from 'react-helmet-async';

import { AddUserPlanView } from 'src/sections/add-user-plan/view';

// ----------------------------------------------------------------------

export default function AddUserPlanPage() {
  return (
    <>
      <Helmet>
        <title> Add to my plans | Jerked UI </title>
      </Helmet>

      <AddUserPlanView />
    </>
  );
}
