import type { InternalCustomer, SortKey } from '@/types/app';

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

const getSortValue = (c: InternalCustomer, k: SortKey) => {
  switch (k) {
    case 'name':
    case 'email':
    case 'username':
      return getCustomerValue.getStringValue(c, k);
    case 'pending':
    case 'rate':
      return getCustomerValue.getNumberValue(c, k);
    default:
      return '';
  }
};

export const getCustomerValue = {
  getStringValue,
  getNumberValue,
  getlastUpdateMinutesFromNow,
  getSortValue,
};
