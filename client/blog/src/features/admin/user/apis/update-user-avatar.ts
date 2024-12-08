import { axiosInstanceJwt } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

type UpdateUserAvatarParam = {
  id: number | undefined;
  data: FormData;
};

export const updateUserAvatar = (data: UpdateUserAvatarParam) => {
  return axiosInstanceJwt.put(`users/${data.id}/avatar`, data.data)
};

export type UseUpdateUserAvatarOptions = {
  mutationConfig?: MutationConfig<typeof updateUserAvatar>
}

export const UseUpdateUserAvatar = ({mutationConfig}: UseUpdateUserAvatarOptions) =>{
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: updateUserAvatar,
    onSuccess: async (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
}
