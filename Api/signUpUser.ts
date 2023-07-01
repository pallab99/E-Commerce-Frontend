import axios from "axios";

const signUpUser = async (data:any) => {
    try {
      const response = await axios.post('http://localhost:8080/users', data);
      const userDetails = response.data;
      return userDetails;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export default signUpUser;
  