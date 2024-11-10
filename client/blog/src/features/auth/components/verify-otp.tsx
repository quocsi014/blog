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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ERR_DATAS, ErrorData } from '@/config/error-data';
import { requestOtp } from '@/features/auth/apis/request-otp';
import { verifyOtp } from '@/features/auth/apis/verify-otp';
import { useQueryString } from '@/hooks/useQueryString';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const formSchema = z.object({
  otp: z.string().min(6, { message: 'please fill 6 digits' }),
  email: z.string().email(),
});

const useCountDown = (delay: number, maxTime: number) => {
  const [timeLeft, setTimeLeft] = useState<number>(maxTime);
  const intervalId = useRef<number | null>(null);

  const startCountdown = useCallback(() => {
    intervalId.current = window.setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= delay) {
          clearInterval(intervalId.current!);
          return 0;
        }
        return prevTimeLeft - delay;
      });
    }, delay);
  }, [delay]);

  const reset = useCallback(() => {
    clearInterval(intervalId.current!);
    setTimeLeft(maxTime);
    startCountdown();
  }, [maxTime, startCountdown]);

  useEffect(() => {
    startCountdown();
    return () => clearInterval(intervalId.current!);
  }, [startCountdown]);

  return { timeLeft, reset };
};

export const VerifyOtpForm = () => {
  const queryStrings = useQueryString();
  const navigate = useNavigate();
  const { timeLeft, reset } = useCountDown(1000, 180000);
  const displayTimeLeft = (time: number): string => {
    return `${Math.floor(time / 60000)
      .toString()
      .padStart(
        2,
        '0',
      )}:${((time % 60000) / 1000).toString().padStart(2, '0')}`;
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
      email: queryStrings.email,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data: { token: string }) => {
      const expiration = new Date();
      Cookies.set('otp_token', data.token, {
        expires: expiration.setMinutes(expiration.getMinutes() + 5),
      });
      navigate(queryStrings.redirectTo);
    },
    onError: (error: ErrorData) => {
      switch (error.ERR_CODE) {
        case ERR_DATAS.auth.otp.invalid_otp.ERR_CODE:
          form.setError('otp', {
            message: ERR_DATAS.auth.otp.invalid_otp.message,
          });
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  const resendOtpMutation = useMutation({
    mutationFn: requestOtp,
    onSuccess: () => {
      reset();
    },
    onError: (error: ErrorData) => {
      console.log(error);
    },
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='otp'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Otp</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    {...field}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className='font-normal' />
              </FormItem>
            )}
          />
          <div className='flex'>
            {resendOtpMutation.isPending ? (
              <Button variant={'outline'} disabled>
                <Spinner />
              </Button>
            ) : timeLeft == 0 ? (
              <Button
                onClick={() =>
                  resendOtpMutation.mutate({ email: form.getValues().email })
                }
                variant={'outline'}
                type='button'
              >
                resend otp ({displayTimeLeft(timeLeft)})
              </Button>
            ) : (
              <Button variant={'outline'} disabled>
                resend otp ({displayTimeLeft(timeLeft)})
              </Button>
            )}

            {isPending ? (
              <Button
                className='w-full ml-2 font-bold text-md'
                type='submit'
                disabled
              >
                <Spinner />
              </Button>
            ) : (
              <Button className='w-full ml-2 font-bold text-md' type='submit'>
                next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
