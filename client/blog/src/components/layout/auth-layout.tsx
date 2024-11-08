import { Head } from '@/components/seo/Head';
import { HeaderAuth } from '@/features/auth/components/header-auth';

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className='h-screen w-screen flex justify-center bg-gray-100'>
      <Head title={title} />
      <div className='mt-10 py-10 px-8 w-[450px]  shadow-gray-400 drop-shadow-lg bg-white h-fit rounded-2xl'>
        <HeaderAuth title={title} />
        {children}
      </div>
    </div>
  );
};
