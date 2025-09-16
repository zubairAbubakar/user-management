'use client';

import { adminActions } from '@/actions/admin';
import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserRole } from '@prisma/client';
import { toast } from 'sonner';

const AdminPage = () => {
  const onServerActionsClick = () => {
    adminActions().then((data) => {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success(data.success);
      }
    });
  };

  const onApiRouteClick = () => {
    fetch('/api/admin')
      .then((res) => {
        if (res.status === 200) {
          toast.success('You have access to this admin API route!');
        } else {
          toast.error('You do NOT have access to this admin API route!');
        }
      })
      .catch(() => {
        toast.error('Error connecting to the API route.');
      });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔐 Admin </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You have access to this admin content!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Test server actions</p>
          <Button onClick={onServerActionsClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Test API route access</p>
          <Button onClick={onApiRouteClick}>Call API Route</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
