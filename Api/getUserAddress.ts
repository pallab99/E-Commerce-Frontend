import axios from 'axios';
import Api from './api'
const getUserAddresses = async (userId:any) => {
  try {
    const response = await Api.get(`getAddressByUserId/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};

export default getUserAddresses;
