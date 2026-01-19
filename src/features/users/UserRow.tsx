import type { User } from '@/types/users';
import { memo } from 'react';

type UserRowProps = {
  user: User;
};

export const UserRow = memo(function UserRow({ user }: UserRowProps) {
  console.count('UserRow render');
  return (
    <li>
      {user.name} - {user.email}
    </li>
  );
});
