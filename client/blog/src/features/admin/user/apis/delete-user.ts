import { axiosInstanceJwt } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const deleteUser = (id: number) => {
  return axiosInstanceJwt.delete(`users/${id}`);
};

export type UseDeleteUserOptions = {
  mutationConfig: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({mutationConfig}: UseDeleteUserOptions)=>{
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
}
