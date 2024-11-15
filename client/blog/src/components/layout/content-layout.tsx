import { Head } from "@/components/seo/Head"

type ContentLayoutPropsType = {
  title: string,
  children: React.ReactNode,
}
export const ContentLayout = ({title, children}: ContentLayoutPropsType)=>{
  return(
    <div>
      <Head title={title} />
      {children}
    </div>
  )
}