import { Head } from '@/components/seo/Head';

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AppLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className='h-screen w-screen flex justify-center bg-gray-100'>
      <Head title={title} />
      {children}
    </div>
  );
};
