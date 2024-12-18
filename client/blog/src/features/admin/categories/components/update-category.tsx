import { useEffect } from 'react';
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
import { toast } from '@/hooks/use-toast';
import { toastContents } from '@/enums/toast-contents';
import {
  createCategoryFormSchema,
} from '../apis/create-category';
import { useQueryClient } from '@tanstack/react-query';
import { useQueryString } from '@/hooks/useQueryString';
import { ErrorData } from '@/enums/error-data';
import { Category } from '@/types/category';
import { useUpdateCategory } from '../apis/update-category';
type UpdateCategoryFormProps = {
  category: Category | null;
  onClose: () => void;
};
export const CategoryUpdateForm = ({
  category,
  onClose,
}: UpdateCategoryFormProps) => {
  const form = useForm<z.infer<typeof createCategoryFormSchema>>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      name: '',
    },
  });
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
      });
    }
  }, [category]);
  const query = useQueryClient();
  const queryString = useQueryString();
  const page = Number.parseInt(queryString['page']) || 1;
  const limit = Number.parseInt(localStorage.getItem('rows') || '10');
  const { isPending, mutate } = useUpdateCategory({
    mutationConfig: {
      onSuccess: () => {
        toast(toastContents.general.success);
        query.invalidateQueries({
          queryKey: ['categories', { page, limit }],
        });
        onClose();
        form.reset();
      },
      onError: (error: ErrorData) => {
        console.log(error);
        if (error.statusCode == 500) {
          toast(toastContents.general.success);
          form.reset();
        }
      },
    },
  });
  function onSubmit(values: z.infer<typeof createCategoryFormSchema>) {
    mutate({id: category?.id, data: values});
  }
  return (
    <Dialog 
      open={category != null}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogPortal>
        <DialogOverlay className='fixed z-50 inset-0 bg-gray-500 opacity-30 backdrop-blur-lg' />
        <DialogContent className='fixed z-50 w-[450px] top-32 left-1/2 -translate-x-1/2 p-10 rounded-xl bg-white'>
          <DialogHeader className='mb-4'>
            <DialogTitle>Update Category</DialogTitle>
            <DialogDescription>
              Fill in the details below to update the category.
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
