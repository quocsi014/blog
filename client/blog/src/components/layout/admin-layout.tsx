import { paths } from '@/config/paths';
import { Link, NavLink, Outlet} from 'react-router-dom';
import logo from '@/asset/images/logo.png';
import { useSelector } from 'react-redux';
import { userSelector } from '@/redux/selector/user-selector';
import { AccountManagement } from '@/components/layout/account-management';

export const AdminLayout = () => {
  const className = ({ isActive }: { isActive: boolean }) => {
    return `p-2 rounded-xl w-full ${isActive ? 'bg-blue-500 text-white' : ''}`;
  };
  const user = useSelector(userSelector);
  return (
    <div className='h-screen w-screen flex bg-gray-100'>
      <div className='flex flex-col items-center h-full bg-white'>
        <div className='flex items-center justify-center py-2 bg-slate-200 w-full'>
          <Link to={paths.app.home.getHref()}>
            <img src={logo} className='size-16 mr-2' alt='' />
          </Link>
        </div>
        <div className='flex flex-col py-10 font-bold px-4 w-64'>
          {user?.role == 'ADMIN' || user?.role == 'WRITTER' ? (
            <>
              <NavLink
                className={className}
                to={paths.app.admin.dashboard.getHref()}
              >
                Dashboard
              </NavLink>
              {user?.role == 'ADMIN' ? (
                <NavLink
                  className={className}
                  to={paths.app.admin.users.getHref()}
                >
                  Users
                </NavLink>
              ) : (
                <></>
              )}
              <NavLink
                className={className}
                to={paths.app.admin.posts.getHref()}
              >
                Posts
              </NavLink>
              {user?.role == 'ADMIN' ? (
                <NavLink
                  className={className}
                  to={paths.app.admin.category.getHref()}
                >
                  Categories
                </NavLink>
              ) : (
                <></>
              )}
              <NavLink
                className={className}
                to={paths.app.admin.comments.getHref()}
              >
                Comments
              </NavLink>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className='w-full'>
        <div className='flex justify-end w-full px-10 bg-white h-20 items-center'>
          <AccountManagement />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
