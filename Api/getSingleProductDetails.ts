import axios from "axios";

const getSingleProductDetails = async (productId:any) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/products/${productId}`
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
  