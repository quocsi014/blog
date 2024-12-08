import { Role } from "@/enums/roles";
import { axiosInstanceJwt } from "@/lib/axios"
import { MutationConfig } from "@/lib/react-query"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod";


export const updateUserFormSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email({ message: 'this field must be an email' }),
  role: z.enum(Object.values(Role) as [Role, ...Role[]]),
});

type userFormInput = z.infer<typeof updateUserFormSchema> 

type updateUserParam = {
  id: number | undefined,
  data: userFormInput

}
export const updateUser = (data: updateUserParam)=>{
  return axiosInstanceJwt.put(`users/${data.id}`, data.data)
}

export type UseUpdateUserOption = {
  mutationConfig?: MutationConfig<typeof updateUser>,
}

export const useUpdateUser = ({mutationConfig}: UseUpdateUserOption) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: updateUser,
    onSuccess: async (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
}