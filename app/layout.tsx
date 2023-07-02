// "use client"
import { ReduxProvider } from '@/Redux/provider';
import './globals.css';
import { CookiesProvider } from 'react-cookie';

export const metadata = {
  title: 'Urban Bazar',
  description: 'Shop all trendy pieces today',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {/* <CookiesProvider> */}
        <ReduxProvider>{children}</ReduxProvider>
        {/* </CookiesProvider> */}
      </body>
    </html>
  );
}
