import { axiosInstance as axios } from './axiosConfig';

export interface User {
  username: string;
  _id: string;
}

interface UsersError {
  error: string;
}

export type AxiosResponse = User[] & UsersError;

export const getUsers = async () => {
  try {
    const { data } = await axios.get<AxiosResponse>('/users');
    return data;
  } catch (error) {
    console.log(error);
  }
};
