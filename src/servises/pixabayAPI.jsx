import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23580980-4f75151f85975025bb6074227';

export async function pixabayAPI(query, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
