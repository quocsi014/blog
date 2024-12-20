import { axiosInstanceJwt } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const deleteCategory = (id: number) => {
  return axiosInstanceJwt.delete(`categories/${id}`);
};

export type UseDeleteCategoryOptions = {
  mutationConfig: MutationConfig<typeof deleteCategory>;
};

export const useDeleteCategory = ({mutationConfig}: UseDeleteCategoryOptions)=>{
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: async (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
}
