import { Container } from '@/components/container';
import { BaseLayout } from '@/components/layout/base-layout';
import { paths } from '@/config/paths';
import { NavLink, Outlet } from 'react-router-dom';
import { AppSearchModal } from '@/features/app-search/components/AppSearchModal';

export const AppLayout = () => {
  const className = ({ isActive }: { isActive: boolean }) => {
    return `pb-2 pt-4 mr-4 block border-b-4 ${isActive ? 'border-blue-500 text-gray-700' : 'border-transparent text-gray-600 hover:text-black'}`;
  };

  return (
    <BaseLayout>
      <Container className='flex items-center justify-between font-bold text-xl bg-white'>
        <div className='flex font'>
          <NavLink className={className} to={paths.app.home.getHref()}>
            Home
          </NavLink>
          <NavLink className={className} to={paths.app.writters.getHref()}>
            Authors
          </NavLink>
        </div>
        <div>
          <AppSearchModal />
        </div>
      </Container>

      <Container className='bg-gray-50 h-full'>
          <Outlet />
        </Container>
    </BaseLayout>
  );
};
