import axios from 'axios';

export const addOrder = async (orderDetails:any, totalAmount:any, totalItems:any) => {
  const data = { orderDetails, totalAmount, totalItems };
  try {
    const response = await axios.post('http://localhost:8080/orders', data);
    return response;
  } catch (error:any) {
    throw new Error(error);
  }
};
