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
import { Link } from 'react-router-dom';
import { z } from 'zod';

import google from '@/asset/images/google_logo.png'

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: "This field is required"}),
});

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const login = (values: z.infer<typeof formSchema>)=>{
    console.log(values)
  }

  return (
    <div className='flex items-center flex-col mt-40'>
      <div className='flex flex-col w-96 border p-8 rounded-lg'>
        <h1 className='text-5xl font-bold self-center'>Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(login)} className='space-y-2 flex flex-col'>
            <FormField
            control={form.control}
            name='email'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='example@abc.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='your password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Link to='/forgot' className='text-md text-gray-600 self-center underline font-semibold'>Forget password?</Link>
          <Button type='submit' >Login</Button>
          </form>
        </Form>
        <span className='self-center mt-2'>You dont have account? <Link to='/register' className='underline font-semibold'>register</Link></span>
        <span className='self-center text-gray-400 my-2'>or</span>
        <Button variant={'secondary'}>
          <img src={google} alt="" className='w-10' />
          <span>Login with google</span>
        </Button>
      </div>
    </div>
  );
}

export default Login;
