'use client';

import { BeatLoader } from 'react-spinners';
import { useCallback, useEffect, useState } from 'react';

import { verifyEmail } from '@/actions/email-verification';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';
import { useSearchParams } from 'next/navigation';

export const EmailVerificationForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Invalid token');
      return;
    }

    verifyEmail(token)
      .then((data) => {
        if (data) {
          setError(data.error);
          setSuccess(data.success);
        }
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your email Verification"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex flex-col justify-center items-center space-y-4">
        {!error && !success && <BeatLoader />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};
