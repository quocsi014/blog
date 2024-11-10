import { Head } from '@/components/seo/Head';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

export const AuthLayout = ({
  children,
  title,
  description,
}: AuthLayoutProps) => {
  return (
    <div className='h-screen w-screen flex justify-center bg-gray-100'>
      <Head title={title} />
      <Card className='h-fit mt-20 w-[400px]'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};
