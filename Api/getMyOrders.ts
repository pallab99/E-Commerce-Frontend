import Api from './api'

export const getMyOrders = async (userId:any) => {
  try {
    const response = await Api.get(
      `/getOrderByUser/${userId}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};
