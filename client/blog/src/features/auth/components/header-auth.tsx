import { paths } from '@/config/paths';
import { Link } from 'react-router-dom';
import logo from '@/asset/images/logo.png';
export const HeaderAuth = ({title}: {title: string}) => {
  return (
    <div className='flex flex-col items-center'>
      <Link to={paths.home.getHref()}>
        <img src={logo} alt='' className='size-52 rounded-full mb-8' />
      </Link>
      <h1 className='text-5xl font-bold'>{title}</h1>
    </div>
  );
};
