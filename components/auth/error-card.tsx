'use client';

import { useSearchParams } from 'next/navigation';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { CardWrapper } from './card-wrapper';

export const ErrorCard = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return 'An account with this email already exists. Please sign in with your original method.';
      case 'OAuthSignin':
        return 'Error signing in with OAuth provider.';
      case 'OAuthCallback':
        return 'Error in OAuth callback.';
      case 'OAuthCreateAccount':
        return 'Could not create OAuth account.';
      case 'EmailCreateAccount':
        return 'Could not create email account.';
      case 'Callback':
        return 'Error in callback.';
      case 'OAuthCallbackError':
        return 'Error in OAuth callback.';
      case 'EmailSignin':
        return 'Check your email address.';
      case 'CredentialsSignin':
        return 'Invalid credentials.';
      case 'SessionRequired':
        return 'Please sign in to access this page.';
      default:
        return 'Something went wrong.';
    }
  };

  return (
    <CardWrapper
      headerLabel="Authentication Error"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex flex-col justify-center items-center space-y-4">
        <ExclamationTriangleIcon className="text-destructive w-10 h-10" />
        <p className="text-center text-sm text-muted-foreground">
          {getErrorMessage(error)}
        </p>
      </div>
    </CardWrapper>
  );
};
