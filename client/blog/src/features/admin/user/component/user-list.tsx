import { useUsers } from '@/features/admin/user/apis/list-user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '@/types/user';
import { formatDate } from '@/utils/data';
import { TableRowsSkeleton } from '@/components/table-rows-skeleton';
import { Pagination } from '@/components/pagination';
import { useQueryString } from '@/hooks/useQueryString';
import { SelectRow } from '@/components/select-row';
import { ScrollArea, ScrollAreaViewport } from '@radix-ui/react-scroll-area';
import { ScrollBar } from '@/components/ui/scroll-area';
import { CreateUser } from '@/features/admin/user/component/create-user';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/ui/button';
import { MdRemoveRedEye } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { UpdateUserForm } from '@/features/admin/user/component/update-user';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import useUpdateSearchParam from '@/hooks/use-update-query';
import { SortButton } from '@/components/ui/sort-button';
export const UserList = () => {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [asc, setAsc] = useState<boolean | null>(null);
  const searchRef = useRef('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const updateSearchParam = useUpdateSearchParam();
  const queryString = useQueryString();
  const { data } = useUsers({
    page: Number.parseInt(queryString['page']) || 1,
    limit: Number.parseInt(localStorage.getItem('rows') || '10'),
    query: searchRef.current,
    sortBy: sortBy,
    asc: asc,
  });
  const [userUpdate, setUserUpdate] = useState<User | null>(null);
  useEffect(() => {
    if (!userUpdate) {
      return;
    }
    if (!data) {
      return;
    }
    const user = data.data.items.find((u: User) => u.id == userUpdate.id);
    setUserUpdate(user);
  }, [data, userUpdate]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const searchDebounce = useDebounce((search: string) => {
    updateSearchParam('page');
    searchRef.current = search;
  }, 500);
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    searchDebounce(newSearch);
  };
  const onCloseUpdateForm = () => {
    setUserUpdate(null);
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
            placeholder='Search by name, email and role (Ctr + K)'
          ></Input>
        </div>
        {/* <Button className='bg-gray-500 hover:bg-gray-600 text-white text-lg'>
          Create user
        </Button> */}
        <CreateUser></CreateUser>
        <UpdateUserForm
          user={userUpdate}
          onClose={onCloseUpdateForm}
        ></UpdateUserForm>
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
                User
              </TableHead>
              <TableHead className='w-[100px] font-bold text-black'>
                Avatar
              </TableHead>
              <TableHead className='w-[200px] space-x-2 font-bold text-black'>
                <span>First name</span>
                <SortButton
                  sortField='firstName'
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  asc={asc}
                  setAsc={setAsc}
                ></SortButton>
              </TableHead>
              <TableHead className='w-[200px] space-x-2 font-bold text-black'>
                <span>Last name</span>
                <SortButton
                  sortField='lastName'
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  asc={asc}
                  setAsc={setAsc}
                ></SortButton>
              </TableHead>
              <TableHead className='space-x-2 font-bold text-black'>
                <span>Email</span>
                <SortButton
                  sortField='email'
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  asc={asc}
                  setAsc={setAsc}
                ></SortButton>
              </TableHead>
              <TableHead className='w-[150px] font-bold text-black'>
                Role
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
              data.data.items.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell className='text-md font-semibold'>
                    {user.id}
                  </TableCell>
                  <TableCell className='text-md font-semibold'>
                    <Avatar
                      avatarUrl={user.avatar?.url}
                      lastName={user.last_name}
                      firstName={user.first_name}
                    />
                  </TableCell>
                  <TableCell className='text-md font-medium text-gray-700'>
                    {user.first_name}
                  </TableCell>
                  <TableCell className='text-md font-medium text-gray-700'>
                    {user.last_name}
                  </TableCell>
                  <TableCell className='text-md font-medium text-gray-700'>
                    {user.email}
                  </TableCell>
                  <TableCell className='text-md font-medium text-gray-700'>
                    {user.role}
                  </TableCell>
                  <TableCell className='text-md font-medium text-gray-700'>
                    {formatDate(user.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className='space-x-1'>
                      <Button
                        className='bg-blue-400 hover:bg-blue-500'
                        onClick={() => {
                          setUserUpdate(user);
                        }}
                      >
                        <MdRemoveRedEye />
                      </Button>
                      <Button
                        className='opacity-50 hover:opacity-100'
                        variant={'secondary'}
                      >
                        <IoMdTrash />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRowsSkeleton col={8} row={10}></TableRowsSkeleton>
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
