import { axiosInstanceJwt } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const updateCategoryFormSchema = z.object({
  name: z.string().min(1, { message: 'this field can not be blank' }),
});

type categoryFormInput = z.infer<typeof updateCategoryFormSchema>;

type UpdateCategoryParam = {
  id: number | undefined | null;
  data: categoryFormInput;
};
export const updateCategory = (data: UpdateCategoryParam) => {
  return axiosInstanceJwt.put(`categories/${data.id}`, data.data);
};

export type UseUpdateUserOptions = {
  mutationConfig?: MutationConfig<typeof updateCategory>;
};

export const useUpdateCategory = ({ mutationConfig }: UseUpdateUserOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: async (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
