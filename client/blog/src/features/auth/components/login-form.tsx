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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import google_logo from '@/asset/images/google_logo.png';
import { paths } from '@/config/paths';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/features/auth/apis';
import { ERR_DATAS, ErrorData } from '@/config/error-data';
import { Spinner } from '@/components/spiner';
import Cookies from 'js-cookie';
import { TokenPair } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import { useQueryString } from '@/hooks/useQueryString';

const formSchema = z.object({
  email: z.string().email({ message: 'this field must be an email' }),
  password: z.string().min(1, {
    message: 'this field is required',
  }),
});

export const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {setAccessToken} = useAuth();
  const navigate = useNavigate()
  const queryStrings = useQueryString()

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data: TokenPair) => {
      setAccessToken(data.access_token)
      Cookies.set('refresh_token', data.refresh_token, { expires: 30 });
      navigate(queryStrings.redirectTo || paths.app.posts.getHref())
    },
    onError: (error: ErrorData) => {
      switch (error.ERR_CODE) {
        case ERR_DATAS.auth.login.incorrect_data.ERR_CODE:
          form.setError('email', {
            type: 'munual',
            message: ERR_DATAS.auth.login.incorrect_data.message,
          });
          form.setError('password', {
            type: 'munual',
            message: ERR_DATAS.auth.login.incorrect_data.message,
          });
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className='flex flex-col'>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='your password' {...field} />
                  </FormControl>
                  <FormMessage className='font-normal' />
                  <div className='text-gray-500'>
                    <Link
                      className='underline font-semibold'
                      to={paths.auth.requestOtp.getHref(
                        paths.auth.forgotPassword.getHref(),
                      )}
                    >
                      forgot password?
                    </Link>
                  </div>
                </FormItem>
              )}
            />
            <div className='w-full flex justify-center text-gray-500'>
              <span>
                You don't have an account?{' '}
                <Link
                  className='underline font-semibold'
                  to={paths.auth.requestOtp.getHref(
                    paths.auth.register.getHref(),
                  )}
                >
                  register
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
                login
              </Button>
            )}
          </form>
        </Form>
      </div>
      <div className='flex items-center justify-center my-2'>
        <div className='w-32 left-0 border-t'></div>
        <span className='relative self-center text-gray-500 px-3'>or</span>
        <div className='w-32 right-0 border-t'></div>
      </div>
      <div>
        <Button className='w-full' variant={'outline'}>
          <div>
            <img src={google_logo} alt='' className='h-10' />
          </div>
          <span>Login with google</span>
        </Button>
      </div>
    </div>
  );
};
