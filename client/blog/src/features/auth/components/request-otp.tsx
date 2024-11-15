import { Spinner } from '@/components/spiner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ErrorData } from '@/enums/error-data';
import { paths } from '@/config/paths';
import { requestOtp } from '@/features/auth/apis/request-otp';
import { useQueryString } from '@/hooks/useQueryString';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'this field must be an email' }),
});
export const RequestOtp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const navigate = useNavigate()
  const queryStrings = useQueryString()

  const { mutate, isPending } = useMutation({
    mutationFn: requestOtp,
    onSuccess: () => {
      navigate(paths.auth.verifyOtp.getHref(queryStrings.target, form.getValues().email))
    },
    onError: (error: ErrorData) => {
      console.log(error)
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
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

          {isPending ? (
            <Button className='w-full font-bold text-md' type='submit' disabled>
              <Spinner />
            </Button>
          ) : (
            <Button className='w-full font-bold text-md' type='submit'>
              next
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
