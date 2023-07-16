import axios from 'axios';

const getCartItems = async (userId: any) => {
  try {
    const response = await axios.get(
      'http://localhost:8080/cart?user=' + userId
    );
    const data = response.data;
    return { items: data };
  } catch (error: any) {
    console.log(error.message);
  }
};

export default getCartItems;
