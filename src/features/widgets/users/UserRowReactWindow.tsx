import type { InternalUser } from '@/types/app';

type RowExtraProps = {
  users: InternalUser[];
};

type RowInjectedProps = {
  index: number;
  style: React.CSSProperties;
};

type RowProps = RowInjectedProps & RowExtraProps;

export function Row({ index, style, users }: RowProps) {
  const user = users[index];
  return <div style={style}>{user.name}</div>;
}
