import type { InternalUser } from '@/types/users';
import { memo } from 'react';

type UserRowProps = {
  user: InternalUser;
};

export const UserRow = memo(function UserRow({ user }: UserRowProps) {
  console.count('UserRow render');
  return (
    <li>
      {user.name} - {user.email}
    </li>
  );
});
