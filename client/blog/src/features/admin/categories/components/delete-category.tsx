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
import { useDeleteCategory } from '../apis/delete-category';
import { useQueryClient } from '@tanstack/react-query';
import { useQueryString } from '@/hooks/useQueryString';
import { toastContents } from '@/enums/toast-contents';
import { toast } from '@/hooks/use-toast';
import { ErrorData } from '@/enums/error-data';
import { Spinner } from '@/components/spiner';
import { Fragment } from 'react/jsx-runtime';

type DeleteCategoryFormProps = {
  id: number | null | undefined;
  setId: (id: number | null) => void;
};
export const DeleteCategoryForm = ({ id, setId }: DeleteCategoryFormProps) => {
  const query = useQueryClient();
  const queryString = useQueryString();
  const page = Number.parseInt(queryString['page']) || 1;
  const limit = Number.parseInt(localStorage.getItem('rows') || '10');
  const { isPending, mutate } = useDeleteCategory({
    mutationConfig: {
      onSuccess: () => {
        toast(toastContents.general.success);
        query.invalidateQueries({
          queryKey: ['categories', { page, limit }],
        });
        setId(null);
      },
      onError: (error: ErrorData) => {
        console.log(error);
        if (error.statusCode == 500) {
          toast(toastContents.general.success);
        }
      },
    },
  });
  const deleteCategory = () => {
    if (!id) return;
    mutate(id);
  };

  return (
    <Dialog
      open={id != null}
      onOpenChange={() => {
        setId(null);
      }}
    >
      <DialogPortal>
        <DialogOverlay className='fixed z-50 inset-0 bg-gray-500 opacity-30 backdrop-blur-lg' />
        <DialogContent className='fixed z-50 w-[450px] top-32 left-1/2 -translate-x-1/2 p-10 rounded-xl bg-white'>
          <DialogHeader className='mb-4'>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the category? (This action can not
              undo)
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end space-x-2'>
            <Button
              onClick={() => {
                setId(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteCategory();
              }}
            >
              {isPending ? <Spinner></Spinner> : <Fragment>Delete</Fragment>}
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
