import axios from 'axios';

export const getImages = async function (searchValue, countPage) {
  const API_KEY = '42001706-084c655b89d9d100c07cefb17';
  const url = 'https://pixabay.com/api/';
  const response = await axios.get(url, {
    params: {
      key: API_KEY,
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: countPage,
      per_page: 40,
    },
  });
  return response.data;
};
