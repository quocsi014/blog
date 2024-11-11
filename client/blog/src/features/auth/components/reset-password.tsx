import { Spinner } from "@/components/spiner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { paths } from "@/config/paths";
import { ERR_DATAS, ErrorData } from "@/enums/error-data";
import { toastContents } from "@/enums/toast-contents";
import { resetPassword } from "@/features/auth/apis/reset-password";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  password: z.string().min(6, {
    message: 'password must have al least 6 characters',
  }),
  confirm: z.string().min(6, {
    message: 'password must have al least 6 characters',
  }),
});

export const ResetPasswordForm = () => {

  const navigate = useNavigate();
  const {toast} = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirm: '',
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate(paths.auth.login.getHref());
    },
    onError: (error: ErrorData) => {
      switch(error.ERR_CODE) {
        case ERR_DATAS.auth.register.email_verification_invalid.ERR_CODE:
          toast(toastContents.auth.unverified_email)
          setTimeout(()=>{navigate(paths.auth.requestOtp.getHref(paths.auth.reset.getHref()))},5000)
      }
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='your password' {...field} />
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
                    <Input type='password' placeholder='confirm password' {...field} />
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
                reset
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}