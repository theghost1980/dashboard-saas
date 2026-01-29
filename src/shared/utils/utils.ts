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

const getlastUpdateMinutesFromNow = (dateNow: Date, lastDate: Date) => {
  const diffMs = dateNow.getTime() - lastDate.getTime();
  const minutes = Math.floor(diffMs / 60000);
  return Math.max(0, minutes);
};

export const getCustomerValue = {
  getStringValue,
  getNumberValue,
  getlastUpdateMinutesFromNow,
};
