import axios from 'axios';

// Define the function to fetch orders for a specific user
export const getMyOrders = async (userId:any) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/orders?orderDetails.userId=${userId}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error; // You might want to throw the error back to the calling code for handling.
  }
};
