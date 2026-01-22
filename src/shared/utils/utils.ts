import type { InternalCustomer } from '@/types/app';

const getStringValue = (
  customer: InternalCustomer,
  key: 'email' | 'name' | 'username',
): string => {
  return customer[key];
};

const getNumberValue = (
  customer: InternalCustomer,
  key: 'pending' | 'rate',
): number => {
  if (key === 'pending') return customer.activity.todosPending;
  return customer.activity.todosCompletionRate;
};

export const getCustomerValue = {
  getStringValue,
  getNumberValue,
};
