import axios from "axios";

const getAllBrands = async () => {
    try {
      const response = await axios.get('http://localhost:8080/brands');
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export default getAllBrands;
  