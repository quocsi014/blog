import { Spinner } from '@/components/spiner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ErrorData } from '@/config/error-data';
import { paths } from '@/config/paths';
import { register } from '@/features/auth/apis/register';
import { useQueryString } from '@/hooks/useQueryString';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'this field must be an email' }),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  password: z.string().min(6, {
    message: 'password must have al least 6 characters',
  }),
  confirm: z.string().min(6, {
    message: 'password must have al least 6 characters',
  }),
});

export const RegisterForm = () => {
  const queryStrings = useQueryString();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: queryStrings.email,
      first_name: '',
      last_name: '',
      password: '',
      confirm: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate(paths.auth.login.getHref());
    },
    onError: (error: ErrorData) => {
      console.log(error)
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
    <div className='flex flex-col'>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='your password' {...field} />
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
                    <Input placeholder='confirm password' {...field} />
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
    </div>
  );
};
