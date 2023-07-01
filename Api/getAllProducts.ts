import axios from 'axios';

const getAllProducts = async (props: any) => {
  try {
    const { filter, sort } = props;

    let queryString = '';
    for (let key in filter) {
      queryString += `${key}=${filter[key]}&`;
      const categoryValues = filter[key];
      if (categoryValues.length) {
        const lastCategoryValue = categoryValues[categoryValues.length - 1];
        queryString += `${key}=${lastCategoryValue}&`;
      }
    }
    let sortQueryString = '';
    for (let key in sort) {
      sortQueryString += `${key}=${sort[key]}&`;
    }
    const isCategoryEmpty =
      !filter.category || Object.keys(filter.category).length === 0;
    const isBrandEmpty =
      !filter.brand || Object.keys(filter.brand).length === 0;

    if (isCategoryEmpty) {
      queryString = queryString.replace('category=&', '');
    }

    if (isBrandEmpty) {
      queryString = queryString.replace('brand=&', '');
    }

    const response = await axios.get(
      'http://localhost:8080/products?' + queryString + sortQueryString
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getAllProducts;
