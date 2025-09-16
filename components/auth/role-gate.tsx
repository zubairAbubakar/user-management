'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { UserRole } from '@prisma/client';
import { FormError } from '../form-error';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate: React.FC<RoleGateProps> = ({
  children,
  allowedRole,
}) => {
  const user = useCurrentUser();

  if (user?.role !== allowedRole) {
    return (
      <FormError message="You do not have permission to access this content." />
    );
  }

  return <>{children}</>;
};
