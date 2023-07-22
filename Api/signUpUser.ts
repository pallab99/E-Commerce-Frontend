import api from "./api"

const signUpUser = async (data:any) => {
    try {
      const response = await api.post('/signUp', data);
      const userDetails = response;
      return userDetails;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export default signUpUser;
  