import { Button } from '@/components/ui/button';
import { MdOutlineSearch } from 'react-icons/md';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

export const AppSearchModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          <MdOutlineSearch /> <span className='text-gray-500'>(Ctrl + K)</span>
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className='fixed inset-0 bg-gray-500 opacity-40 backdrop-blur-lg' />
        <DialogContent className='fixed top-32 left-1/2 -translate-x-1/2'>
          <div className='w-[400px] p-4 rounded-xl opacity-95 bg-white'>
            <div className='flex items-center text-xl'>
              <MdOutlineSearch size={20} />
              <Input
                className='focus-visible:ring-transparent border-0'
                placeholder='Search posts, authors and tags'
              ></Input>
            </div>
            <div></div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
