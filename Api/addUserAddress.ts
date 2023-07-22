import Api from './api';

const addUserAddress = async (data: any) => {
  try {
    const response = await Api.post('/addAddress', data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default addUserAddress;
