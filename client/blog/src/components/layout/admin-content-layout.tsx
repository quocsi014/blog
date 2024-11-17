import { Head } from "@/components/seo/Head";

type AdminContentLayoutPropsType = {
  children: React.ReactNode;
  title: string,
};

export const AdminContentLayout = ({
  children, title
}: AdminContentLayoutPropsType) => {
  return (
    <div className="px-14 py-10">
      <div className="relative">
      <Head title={title}></Head>
      <div className="text-2xl font-semibold">{title}</div>
      <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
