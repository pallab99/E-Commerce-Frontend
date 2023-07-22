import api from "./api"

const signInUser = async (data:any) => {
    try {
      const response = await api.post('/signIn', data);
      const userDetails = response;
      return userDetails;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export default signInUser;
  