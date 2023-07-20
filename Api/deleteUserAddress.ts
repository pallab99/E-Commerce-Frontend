import axios from 'axios';

export const removeUserAddress = async (userDetails:any, userAddresses:any, selectedAddress:any) => {
  try {
    const newUser = { ...userDetails, addresses: [...userAddresses] };
    newUser.addresses.splice(selectedAddress, 1);
    const userId = userDetails?.id;
    const response = await axios.patch(
      `http://localhost:8080/users/${userId}`,
      newUser
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error; // You might want to throw the error back to the calling code for handling.
  }
};
