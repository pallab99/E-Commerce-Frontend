import api from "./api"

const getSingleProductDetails = async (productId:any) => {
    try {
      const response = await api.get(
        `product/${productId}`
      );
      const data = response.data;
      const productImages = data?.images;
      return { product: data, images: productImages };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export default getSingleProductDetails;
  