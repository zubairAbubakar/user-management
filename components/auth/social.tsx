'use client';

import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { useSearchParams } from 'next/navigation';

export const Socials = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={() => onClick('google')}
      >
        <FcGoogle />
      </Button>
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={() => onClick('github')}
      >
        <FaGithub />
      </Button>
    </div>
  );
};
