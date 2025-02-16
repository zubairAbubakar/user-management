import React from 'react';
import { CardWrapper } from '@/components/auth/card-wrapper';

const LoginPage = () => {
  return (
    <>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account? Sign up"
        backButtonHref="/auth/signup"
      >
        Login Form
      </CardWrapper>
    </>
  );
};

export default LoginPage;
