import { store } from '@/redux/store';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';

type AppProviderProps = {
  children: React.ReactNode;
};
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ReduxProvider store={store}>
      <HelmetProvider>{children}</HelmetProvider>
    </ReduxProvider>
  );
};
