import axios from 'axios';

const fetchSuperheros: Function = async (params: string) => {
  const {data} = await axios.get(
    `https://superheroapi.com/api/2054933857978228/${params}`,
  );
  return data;
};

export default fetchSuperheros;
