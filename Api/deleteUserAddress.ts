import Api from './api'
export const removeUserAddress = async (addressId: any) => {
  try {
    const response = await Api.delete(
      `/deleteAddress/${addressId}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
