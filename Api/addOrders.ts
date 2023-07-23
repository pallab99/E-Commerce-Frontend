import Api from './api'
export const addOrder = async (data:any) => {
 console.log({data});
 
  try {
    const response = await Api.post('/createOrder', data);
    return response;
  } catch (error:any) {
    throw new Error(error);
  }
};
