/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorData } from '@/enums/error-data';
import {
  DefaultOptions,
  MutationOptions,
} from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    // throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions;

export type ApiFnReturnType<FnT extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnT>>;

export type MutationConfig<Fn extends (...args: any) => Promise<any>> =
  MutationOptions<ApiFnReturnType<Fn>, ErrorData, Parameters<Fn>[0]>;
