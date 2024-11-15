import { paths } from '@/config/paths';
import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '@/asset/images/logo.png';
import { useSelector } from 'react-redux';
import { userSelector } from '@/redux/selector/user-selector';

export const AdminLayout = () => {
  const className = ({ isActive }: { isActive: boolean }) => {
    return `p-2 rounded-xl min-w-52 ${isActive ? 'bg-blue-500 text-white' : ''}`;
  };
  const user = useSelector(userSelector);

  return (
    <div className='h-screen w-screen flex  bg-gray-100'>
      <div className='flex flex-col items-center h-full bg-white px-4'>
        <div className='flex items-center py-4'>
          <Link to={paths.app.home.getHref()}>
            <img src={logo} className='size-14 mr-2' alt='' />
          </Link>
        </div>
        <div className='flex flex-col py-10 font-bold'>
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
      <div>
        <Outlet />
      </div>
    </div>
  );
};
