
import './productPage.css';

export const metadata = {
  title: 'Product Management',
  description: 'Manage products and inventory for your store.',
};

export default function ProductLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}
