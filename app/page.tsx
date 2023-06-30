import Category_Filter from '@/Components/Category_Filter';
import Navbar from '@/Components/Navbar';
export default function Home() {
  return (
      <div>
        <Navbar>
          <Category_Filter></Category_Filter>
        </Navbar>
      </div>
  );
}
