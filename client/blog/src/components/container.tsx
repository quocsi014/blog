type ContainerPropsType = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerPropsType) => {
  return <div className={`px-80 w-full ${className || ''}`}>{children}</div>;
};
