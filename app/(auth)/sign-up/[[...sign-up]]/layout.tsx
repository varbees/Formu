import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
      <main className='flex w-full text-center justify-center items-center flex-grow'>
        {children}
      </main>
    </div>
  );
};

export default Layout;
