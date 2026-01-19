import type { UserJSONPlaceholder } from '@/types/users';
const expandUsers = (base: UserJSONPlaceholder[], targetCount = 5000) => {
  if (!base.length) return [];

  const result: UserJSONPlaceholder[] = [];
  const baseLen = base.length;

  for (let i = 0; i < targetCount; i++) {
    const original = base[i % baseLen];
    const newId = i + 1;
    const suffix = String(newId).padStart(4, '0');

    result.push({
      ...original,
      id: newId,
      username: `${original.username}-${suffix}`,
      name: `${original.name} (${suffix})`,
      email: original.email.replace('@', `+${suffix}@`),
    });
  }

  return result;
};

export const ApiUtils = {
  expandUsers,
};
