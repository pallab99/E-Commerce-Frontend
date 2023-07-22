import { message } from 'antd';
import api from './api';

const AddToCart = async (product: any) => {
  try {
    const userId = localStorage.getItem('userInfo');
    const data = { product, quantity: 1, user: userId };
    await api.post('/addToCart', data);

    message.success('Added to cart successfully');
  } catch (error) {
    message.error('Something went wrong');
  }
};

export default AddToCart;
