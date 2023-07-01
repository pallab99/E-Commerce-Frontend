import axios from "axios";

const getAllCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/categories');
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export default getAllCategories;
  