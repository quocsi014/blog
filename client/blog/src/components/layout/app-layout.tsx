import { Head } from '@/components/seo/Head';
import { paths } from '@/config/paths';
import { Link, NavLink } from 'react-router-dom';
import logo from '@/asset/images/logo.png';
type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AppLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className='h-screen w-screen px-80 flex flex-col bg-gray-100'>
      <Head title={title} />
      <div className='w-full px-10 py-4 flex items-center justify-between bg-white font-semibold'>
        <div className='flex items-center'>
          <Link to={paths.home.getHref()}>
            <img src={logo} className='size-16 mr-2' alt='' />
          </Link>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'text-black mr-4' : 'text-gray-400 mr-4'
            }
            to={paths.app.posts.getHref()}
          >
            Posts
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'text-black' : 'text-gray-400'
            }
            to={paths.app.writters.getHref()}
          >
            Writters
          </NavLink>
        </div>
        <div className='flex'>
          <Link to={paths.auth.login.getHref()}>Login</Link>
          <div className='border-l-2 mx-2 border-black'></div>
          <Link to={paths.auth.register.getHref()}>Register</Link>
        </div>
      </div>
      <div className='h-full px-10'>{children}</div>
    </div>
  );
};
