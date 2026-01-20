import type { InternalUser } from '@/types/app';
import type { UserDummyJSON } from '@/types/datasource/dummyjson/rawdata';
import type { UserJSONPlaceholder } from '@/types/datasource/jsonplaceholder/rawdata';

const mapDummyJsonUserToInternal = (u: UserDummyJSON): InternalUser => ({
  id: u.id,
  name: [u.firstName, u.maidenName, u.lastName].filter(Boolean).join(' '),
  username: u.username,
  email: u.email,
  image: u.image,
});

const mapJsonPlaceHolderUserToInternal = (
  u: UserJSONPlaceholder,
): InternalUser => ({
  id: u.id,
  name: u.name,
  username: u.username,
  email: u.email,
  image: undefined,
});

export const AdapterUserUtils = {
  mapDummyJsonUserToInternal,
  mapJsonPlaceHolderUserToInternal,
};
