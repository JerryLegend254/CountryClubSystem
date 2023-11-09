import { Helmet } from 'react-helmet-async';

import { SignUpView } from 'src/sections/signup';

// ----------------------------------------------------------------------

export default function SignInPage() {
  return (
    <>
      <Helmet>
        <title> Sign Up | Jerked UI </title>
      </Helmet>

      <SignUpView />
    </>
  );
}
