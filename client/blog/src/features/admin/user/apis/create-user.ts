import { Role } from "@/enums/roles";
import { axiosInstanceJwt } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const createUserFormSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email({ message: 'this field must be an email' }),
  role: z.enum(Object.values(Role) as [Role, ...Role[]]),
  password: z.string().min(6, {
    message: 'password must have al least 6 characters',
  }),
});


type userFormInput = z.infer<typeof createUserFormSchema>;

export const createUser = (data: userFormInput) => {
  return axiosInstanceJwt.post('users', data)
}

export type UseCreateUserOptions = {
  mutationConfig?: MutationConfig<typeof createUser>;
}

export const UseCreateUser = ({mutationConfig}: UseCreateUserOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: createUser,
    onSuccess: async (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
}