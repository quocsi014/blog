import { axiosInstanceJwt } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const createCategoryFormSchema = z.object({
  name: z.string().min(1, { message: 'this field can not be blank' }),
});

type categoryFormInput = z.infer<typeof createCategoryFormSchema>;

export const createCategory = (data: categoryFormInput) => {
  return axiosInstanceJwt.post('categories', data);
};

export type UseCreateUserOptions = {
  mutationConfig?: MutationConfig<typeof createCategory>;
};

export const useCreateCatagory = ({ mutationConfig }: UseCreateUserOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: createCategory,
    onSuccess: async (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
