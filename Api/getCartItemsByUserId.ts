import api from './api';

const getCartItems = async (userId: any) => {
  try {
    const response = await api.get('/cartItemsByUser?user=' + userId);
    const data = response.data;
    console.log({data});
    
    return { items: data };
  } catch (error: any) {
    console.log(error.message);
  }
};

export default getCartItems;
