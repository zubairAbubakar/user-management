import { Suspense } from 'react';
import { ErrorCard } from '@/components/auth/error-card';
import { CardWrapper } from '@/components/auth/card-wrapper';

const ErrorLoadingCard = () => {
  return (
    <CardWrapper
      headerLabel="Loading..."
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center py-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    </CardWrapper>
  );
};

const AuthErrorPage = () => {
  return (
    <Suspense fallback={<ErrorLoadingCard />}>
      <ErrorCard />
    </Suspense>
  );
};

export default AuthErrorPage;
