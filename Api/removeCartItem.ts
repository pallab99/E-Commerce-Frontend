import api from './api';

const removeCartItem=async(itemId: any)=>{
    try {
        const response = await api.delete(`/deleteCartItemByProductId/${itemId}`)
        const data = response.data;
        return { items: data };
      } catch (error: any) {
        console.log(error.message);
      }
}

export default removeCartItem;