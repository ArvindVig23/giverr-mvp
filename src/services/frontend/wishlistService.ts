import callApi from './callApiService';

export const addRemoveWishlistService = async (oppId: string) => {
  try {
    const response: any = await callApi(`/wishlist`, 'post', { oppId });
    return response;
  } catch (error: any) {
    throw error.data;
  }
};

export const getWishlistList = async (currentPage: number) => {
  try {
    const response: any = await callApi(`/wishlist?page=${currentPage}`);
    return response.data;
  } catch (error: any) {
    throw error.data;
  }
};
