import axios from 'axios';
import { message } from 'antd';


const AddToCart = async (product: any) => {
  try {
    const userId = localStorage.getItem('userInfo');
    const data = { product, quantity: 1, user: userId };
    await axios.post('http://localhost:8080/cart', data);
    
    message.success('Added to cart successfully');
  } catch (error) {
    message.error('Something went wrong');
  }
};

export default AddToCart;
