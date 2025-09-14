'use client';

import { logout } from '@/actions/logout';

const SettingsPage = () => {
  const onClick = async () => {
    await logout();
  };

  return (
    <div>
      <button onClick={onClick} type="button">
        Sign Out
      </button>
    </div>
  );
};

export default SettingsPage;
