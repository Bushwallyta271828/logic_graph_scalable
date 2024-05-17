'use client';

import { getAccountDetailsAction } from '@/app/_api/get-account-details-action';
import { Account, SetAccount } from '@/app/_account_context/account-context';


export async function getAccountClient({setAccount}: {setAccount: SetAccount}):
  Promise<{account: Account} | null> {
  const attemptedAccount = await getAccountDetailsAction();
  if ('account' in attemptedAccount) {setAccount(attemptedAccount.account);}
  return attemptedAccount;
}
