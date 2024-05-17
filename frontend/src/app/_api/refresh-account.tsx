'use client';

import { getAccountAction } from '@/app/_api/get-account-action';
import { Account, SetAccount } from '@/app/_account_context/account-context';


export async function refreshAccount({setAccount}: {setAccount: SetAccount}) {
  const attemptedAccount = await getAccountDetailsAction();
  if ('account' in attemptedAccount) {setAccount(attemptedAccount.account);}
}
