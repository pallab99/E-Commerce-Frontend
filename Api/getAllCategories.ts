import api from "./api"

const getAllCategories = async () => {
    try {
      const response = await api.get('/allCategory');
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export default getAllCategories;
  