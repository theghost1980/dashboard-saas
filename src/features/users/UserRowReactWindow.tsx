import type { InternalUser } from '@/types/users';

type RowExtraProps = {
  users: InternalUser[];
};

type RowInjectedProps = {
  index: number;
  style: React.CSSProperties;
};

type RowProps = RowInjectedProps & RowExtraProps;

//below to compare performance using a react-window list
// <List
//   style={{ height: 300, width: '100%' }}
//   rowCount={filteredUsers.length}
//   rowHeight={30}
//   overscanCount={5}
//   rowComponent={Row}
//   rowProps={{
//     users: filteredUsers,
//   }}
// />

export function Row({ index, style, users }: RowProps) {
  const user = users[index];
  return <div style={style}>{user.name}</div>;
}
