import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
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
import { Link } from 'react-router-dom';
import { paths } from '@/config/paths';
import { Spinner } from '@/components/spiner';
import { UseCreateUser } from '@/features/admin/user/apis/create-user';
import { toast } from '@/hooks/use-toast';
import { toastContents } from '@/enums/toast-contents';

import { Role } from '@/enums/roles';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useQueryClient } from '@tanstack/react-query';
import { useQueryString } from '@/hooks/useQueryString';
import { ERR_DATAS, ErrorData } from '@/enums/error-data';

const roles = Object.values(Role).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(), // Tùy chỉnh label nếu cần
}));

const formSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email({ message: 'this field must be an email' }),
  role: z.enum(Object.values(Role) as [Role, ...Role[]]),
  password: z.string().min(6, {
    message: 'password must have al least 6 characters',
  }),
  confirm: z.string().min(6, {
    message: 'password must have al least 6 characters',
  }),
});

export const CreateUser = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      role: Role.Writer,
      password: '',
      confirm: '',
    },
  });
  const query = useQueryClient();
  const queryString = useQueryString();
  const page = Number.parseInt(queryString['page']) || 1;
  const limit = Number.parseInt(localStorage.getItem('rows') || '10');
  const { isPending, mutate } = UseCreateUser({
    mutationConfig: {
      onSuccess: () => {
        toast(toastContents.general.success);
        setIsOpen(false);
        query.invalidateQueries({
          queryKey: ['users', { page, limit }],
        });
        form.reset();
      },
      onError: (error: ErrorData) => {
        console.log(error)
        if(error.statusCode == 500){
          toast(toastContents.general.success);
          setIsOpen(false);
          form.reset();
        }else{
          switch (error.ERR_CODE) {
            case ERR_DATAS.users.create_user.email_exist.ERR_CODE:
              form.setError('email', {
                type: 'munual',
                message: ERR_DATAS.users.create_user.email_exist.message,
              });
          }
        }
      },
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { confirm, ...data } = values;
    if (confirm != data.password) {
      form.setError('confirm', {
        message: 'confirm password is not match',
      });
    }
    mutate(data);
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Create user</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className='fixed z-50 inset-0 bg-gray-500 opacity-30 backdrop-blur-lg' />
        <DialogContent className='fixed z-50 w-[450px] top-32 left-1/2 -translate-x-1/2 p-10 rounded-xl bg-white'>
          <DialogHeader className='mb-4'>
            <DialogTitle>Create User</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new user.
            </DialogDescription>
          </DialogHeader>
          <div>
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
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='your password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='font-normal' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirm'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='confirm password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='font-normal' />
                    </FormItem>
                  )}
                />

                <div className='w-full flex text-gray-500'>
                  <span>
                    You have an account?{' '}
                    <Link
                      className='underline font-semibold'
                      to={paths.auth.login.getHref()}
                    >
                      login
                    </Link>
                  </span>
                </div>
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
                    register
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
