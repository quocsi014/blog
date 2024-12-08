import { User } from '@/types/user';
import { Fragment, useEffect, useRef} from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/spiner';

import { Role, roleMap } from '@/enums/roles';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  updateUserFormSchema,
  useUpdateUser,
} from '@/features/admin/user/apis/update-user';
import { Avatar } from '@/components/avatar';
import { MdChangeCircle } from 'react-icons/md';
import { useQueryClient } from '@tanstack/react-query';
import { useQueryString } from '@/hooks/useQueryString';
import { toast } from '@/hooks/use-toast';
import { toastContents } from '@/enums/toast-contents';
import { UseUpdateUserAvatar } from '@/features/admin/user/apis/update-user-avatar';
import default_avatar from '@/asset/images/default_avatar.png'
type UpdateUserFormProps = {
  user: User | null;
  onClose: () => void;
};
const roles = Object.values(Role).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(), // Tùy chỉnh label nếu cần
}));
export const UpdateUserForm = ({ user, onClose }: UpdateUserFormProps) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof updateUserFormSchema>>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      role: roleMap[user ? user.role : 'Writter'],
    },
  });
  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: roleMap[user.role],
      });
    }
  }, [user, form]);
  const query = useQueryClient();
  const queryString = useQueryString();
  const page = Number.parseInt(queryString['page']) || 1;
  const limit = Number.parseInt(localStorage.getItem('rows') || '10');
  const updateAvatarMutation = UseUpdateUserAvatar({
    mutationConfig: {
      onSuccess: () => {
        toast(toastContents.general.success);
        query.invalidateQueries({
          queryKey: ['users', { page, limit }],
        });
      },
    },
  });
  const { isPending, mutate } = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        toast(toastContents.general.success);
        onClose();
        query.invalidateQueries({
          queryKey: ['users', { page, limit }],
        });
        form.reset();
      },
      onError: (error) => {
        console.log(error);
      },
    },
  });
  const onSubmit = (values: z.infer<typeof updateUserFormSchema>) => {
    mutate({ id: user?.id, data: values });
  };
  const updateUserAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    updateAvatarMutation.mutate({ id: user?.id, data: formData });
  };

  return (
    <Dialog
      open={user != null}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogPortal>
        <DialogOverlay className='fixed z-50 inset-0 bg-gray-500 opacity-30 backdrop-blur-lg' />
        <DialogContent className='fixed z-50 w-[450px] top-32 left-1/2 -translate-x-1/2 p-10 rounded-xl bg-white'>
          <DialogHeader className='mb-8'>
            <DialogTitle>Update user</DialogTitle>
            <DialogDescription>
              Fill in the details below to update the user.
            </DialogDescription>
          </DialogHeader>
          <div>
            {user ? (
              <div className='w-full flex justify-center relative'>
                <Avatar
                  className='size-52 mb-4 border-4'
                  lastName={user.last_name}
                  firstName={user.first_name}
                  avatarUrl={user.avatar? user.avatar.url : default_avatar}
                ></Avatar>
                {updateAvatarMutation.isPending ? (
                  <div className='rounded-full size-52 bg-gray-400 absolute top-0 left-1/2 -translate-x-1/2 opacity-50 flex items-center justify-center'>
                    <Spinner></Spinner>
                  </div>
                ) : (
                  <Fragment></Fragment>
                )}
                <button
                  className='absolute bottom-0 rounded-full bg-gray-100 text-gray-300 hover:text-gray-400'
                  onClick={() => {
                    avatarInputRef.current?.click();
                  }}
                >
                  <MdChangeCircle size={32} />
                </button>
                <input
                  type='file'
                  ref={avatarInputRef}
                  accept='image/*'
                  onChange={updateUserAvatar}
                  hidden
                />
              </div>
            ) : (
              <Fragment></Fragment>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <div className='flex space-x-2'>
                  <FormField
                    control={form.control}
                    name='first_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firstname</FormLabel>
                        <FormControl>
                          <Input placeholder='Edogawa' {...field} />
                        </FormControl>
                        <FormMessage className='font-normal' />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='last_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lastname</FormLabel>
                        <FormControl>
                          <Input placeholder='Conan' {...field} />
                        </FormControl>
                        <FormMessage className='font-normal' />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='example@email.com' {...field} />
                      </FormControl>
                      <FormMessage className='font-normal' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange} // Cập nhật giá trị
                          value={field.value} // Giá trị hiện tại
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select a role' />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className='font-normal' />
                    </FormItem>
                  )}
                />
                {isPending ? (
                  <Button
                    className='w-full font-bold text-md'
                    type='submit'
                    disabled
                  >
                    <Spinner />
                  </Button>
                ) : (
                  <Button className='w-full font-bold text-md' type='submit'>
                    update
                  </Button>
                )}
              </form>
            </Form>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
