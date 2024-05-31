import axios from 'axios';

const callApi = async (
  url: string,
  method: 'get' | 'post' | 'patch' | 'delete' | 'put' = 'get',
  body: {} | null = null,
) => {
  if (url.charAt(0) !== '/') {
    url = '/' + url;
  }

  try {
    const res = await axios({
      url: `/api${url}`,
      method: method,
      data: body,
    });
    return res.data;
  } catch (error: any) {
    throw error?.response;
  }
};
export default callApi;
