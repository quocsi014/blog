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
import { Spinner } from '@/components/spiner';
import { toast } from '@/hooks/use-toast';
import { toastContents } from '@/enums/toast-contents';
import {
  createCategoryFormSchema,
  useCreateCatagory,
} from '../apis/create-category';
import { useQueryClient } from '@tanstack/react-query';
import { useQueryString } from '@/hooks/useQueryString';
import { ErrorData } from '@/enums/error-data';

export const CreateCategory = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof createCategoryFormSchema>>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      name: '',
    },
  });
  const query = useQueryClient();
  const queryString = useQueryString();
  const page = Number.parseInt(queryString['page']) || 1;
  const limit = Number.parseInt(localStorage.getItem('rows') || '10');
  const { isPending, mutate } = useCreateCatagory({
    mutationConfig: {
      onSuccess: () => {
        toast(toastContents.general.success);
        setIsOpen(false);
        query.invalidateQueries({
          queryKey: ['categories', { page, limit }],
        });
        form.reset();
      },
      onError: (error: ErrorData) => {
        console.log(error);
        if (error.statusCode == 500) {
          toast(toastContents.general.success);
          setIsOpen(false);
          form.reset();
        }
      },
    },
  });
  function onSubmit(values: z.infer<typeof createCategoryFormSchema>) {
    mutate(values);
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Create category</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className='fixed z-50 inset-0 bg-gray-500 opacity-30 backdrop-blur-lg' />
        <DialogContent className='fixed z-50 w-[450px] top-32 left-1/2 -translate-x-1/2 p-10 rounded-xl bg-white'>
          <DialogHeader className='mb-4'>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new category.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='name of category' {...field} />
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
                    create
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
