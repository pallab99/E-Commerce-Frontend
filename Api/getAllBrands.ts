import api from "./api"

const getAllBrands = async () => {
    try {
      const response = await api.get('/allBrand');
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export default getAllBrands;
  