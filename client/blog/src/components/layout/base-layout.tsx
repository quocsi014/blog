import { paths } from '@/config/paths';
import { Link } from 'react-router-dom';
import logo from '@/asset/images/logo.png';
import { Fragment } from 'react/jsx-runtime';
import { useLogout } from '@/features/auth/apis/logout';
import { Container } from '@/components/container';
import { useSelector } from 'react-redux';
import {
  accessTokenSelector,
  userSelector,
} from '@/redux/selector/user-selector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
type AuthLayoutProps = {
  children: React.ReactNode;
};

export const BaseLayout = ({ children }: AuthLayoutProps) => {
  const user = useSelector(userSelector);
  const accessToken = useSelector(accessTokenSelector);
  const { mutate } = useLogout({});
  return (
    <div className='h-screen w-screen flex flex-col bg-gray-100'>
      <Container className='w-full py-4 border-b-2 flex items-center justify-between bg-white font-semibold'>
        <div className='flex items-center'>
          <Link to={paths.app.home.getHref()}>
            <img src={logo} className='size-14 mr-2' alt='' />
          </Link>
        </div>
        <div className='flex items-center'>
          {user ? (
            <Fragment>
              <Avatar>
                <AvatarImage
                  src={user.avatar_url}
                />
                <AvatarFallback>{user.first_name[0]+user.last_name[0]}</AvatarFallback>
              </Avatar>
              <div className='border-l-2 mx-4 border-black self-stretch'></div>
              <span
                className='cursor-pointer'
                onClick={() => {
                  mutate(accessToken);
                }}
              >
                Log out
              </span>
            </Fragment>
          ) : (
            <Fragment>
              <Link to={paths.auth.login.getHref()}>Login</Link>
              <div className='border-l-2 mx-4 border-black'></div>
              <Link to={paths.auth.register.getHref()}>Register</Link>
            </Fragment>
          )}
        </div>
      </Container>
      {children}
    </div>
  );
};
