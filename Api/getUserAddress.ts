import axios from 'axios';

const getUserDetailsAndAddresses = async (userId:any) => {
  try {
    const response = await axios.get(`http://localhost:8080/users/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error; // You might want to throw the error back to the calling code for handling.
  }
};

export default getUserDetailsAndAddresses;
