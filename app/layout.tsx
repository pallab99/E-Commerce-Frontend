import { ReduxProvider } from '@/Redux/provider';
import './globals.css';
import CartItems from '@/Components/CartItems'
export const metadata = {
  title: 'Urban Bazar',
  description: 'Shop all trendy pieces today',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [cartItems, setCartItems] = useState();
 
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <ReduxProvider>
          <CartItems>
          {children}
          </CartItems>
        </ReduxProvider>
      </body>
    </html>
  );
}
