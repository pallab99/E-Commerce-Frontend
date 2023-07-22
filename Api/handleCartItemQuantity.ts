import api from './api';

const handleCartItemQuantity = async (productId: any, data: any) => {
  console.log(data);

  try {
    const response = await api.patch(
      `/updateCartItemByProductId/${productId}`,
      data
    );
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

export default handleCartItemQuantity;
