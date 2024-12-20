import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/utils/data';
import { TableRowsSkeleton } from '@/components/table-rows-skeleton';
import { Pagination } from '@/components/pagination';
import { SelectRow } from '@/components/select-row';
import { ScrollArea, ScrollAreaViewport } from '@radix-ui/react-scroll-area';
import { ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MdRemoveRedEye } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { Input } from '@/components/ui/input';
import { SortButton } from '@/components/ui/sort-button';
import { useCategories } from '../apis/list-category';
import { ChangeEvent, useRef, useState } from 'react';
import useUpdateSearchParam from '@/hooks/use-update-query';
import { useQueryString } from '@/hooks/useQueryString';
import { Category } from '@/types/category';
import { useDebounce } from '@/hooks/use-debounce';
import { CreateCategory } from './create-category';
import { CategoryUpdateForm } from './update-category';
import { DeleteCategoryForm } from './delete-category';
export const CategoryList = () => {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [asc, setAsc] = useState<boolean | null>(null);
  const searchRef = useRef('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const updateSearchParam = useUpdateSearchParam();
  const queryString = useQueryString();
  const { data } = useCategories({
    page: Number.parseInt(queryString['page']) || 1,
    limit: Number.parseInt(localStorage.getItem('rows') || '10'),
    query: searchRef.current,
    sortBy: sortBy,
    asc: asc,
  });
  const [categoryUpdate, setCategoryUpdate] = useState<Category | null>(null);
  const onCloseUpdateForm = () => {
    setCategoryUpdate(null);
  };
  const [categoryDelete, setCategoryDelete] = useState<number | null | undefined>(null);
  const searchDebounce = useDebounce((search: string) => {
    updateSearchParam('page');
    searchRef.current = search;
  }, 500);
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    searchDebounce(newSearch);
  };
  return (
    <div className='overflow-hidden'>
      <div className='py-4 flex justify-between'>
        <div className='flex space-x-4'>
          <SelectRow />
          <Input
            ref={searchInputRef}
            value={search}
            onChange={(e) => {
              onSearchChange(e);
            }}
            className='w-72 focus-visible:ring-transparent border-0'
            placeholder='Search by name (Ctr + K)'
          ></Input>
        </div>
        <CreateCategory></CreateCategory>
       <CategoryUpdateForm onClose={onCloseUpdateForm} category={categoryUpdate} ></CategoryUpdateForm> 
        <DeleteCategoryForm id={categoryDelete} setId={setCategoryDelete} ></DeleteCategoryForm>
        {/* <Button className='bg-gray-500 hover:bg-gray-600 text-white text-lg'>
          Create user
        </Button> */}
      </div>
      <ScrollArea className='h-[600px] rounded-xl overflow-auto'>
        <ScrollAreaViewport>
          <ScrollBar
            className='flex touch-none select-none bg-blackA3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col'
            orientation='vertical'
          />
        </ScrollAreaViewport>
        <Table>
          <TableHeader className='bg-gray-200 text-lg text-gray-600 z-10'>
            <TableRow>
              <TableHead className='w-[100px] font-bold text-black'>
                Category
              </TableHead>
              <TableHead className=' space-x-2 font-bold text-black'>
                <span>Name</span>
                <SortButton
                  sortField='name'
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  asc={asc}
                  setAsc={setAsc}
                ></SortButton>
              </TableHead>
              <TableHead className='w-[200px] space-x-2 font-bold text-black'>
                <span>Created at</span>
                <SortButton
                  sortField='createdAt'
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  asc={asc}
                  setAsc={setAsc}
                ></SortButton>
              </TableHead>
              <TableHead className='w-[200px] font-bold text-black'>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='bg-white'>
            {data ? (
              data.data.items.map((category: Category) => (
                <TableRow key={category.id}>
                  <TableCell className='text-md font-semibold'>
                    {category.id}
                  </TableCell>
                  <TableCell className='text-md font-medium text-gray-700'>
                    {category.name}
                  </TableCell>
                  <TableCell className='text-md font-medium text-gray-700'>
                    {formatDate(category.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className='space-x-1'>
                      <Button
                        className='bg-blue-400 hover:bg-blue-500'
                        onClick={() => {
                          setCategoryUpdate(category)
                        }}
                      >
                        <MdRemoveRedEye />
                      </Button>
                      <Button
                        className='opacity-50 hover:opacity-100'
                        variant={'secondary'}
                        onClick={()=>{setCategoryDelete(category.id)}}
                      >
                        <IoMdTrash />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRowsSkeleton col={4} row={10}></TableRowsSkeleton>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {data ? (
        <Pagination
          className=' flex justify-end mt-6'
          currentPage={Number.parseInt(queryString['page'] || '1')}
          totalPage={data.data.totalPage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
