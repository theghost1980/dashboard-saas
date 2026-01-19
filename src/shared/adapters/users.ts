import type {
  InternalUser,
  UserDummyJSON,
  UserJSONPlaceholder,
} from '@/types/users';

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
