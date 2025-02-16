'use client';

import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  mode = 'modal',
  asChild = false,
}) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/login');
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
