import { Helmet } from 'react-helmet-async';

import { ViewPlansView } from 'src/sections/view-plans/view';


// ----------------------------------------------------------------------

export default function ViewPlansPage() {
  return (
    <>
      <Helmet>
        <title> Plans | Minimal UI </title>
      </Helmet>

      <ViewPlansView/>
    </>
  );
}
