import AxiosInstance from '../api/axios'
import { useEffect, useState } from "react";
import { BASE_URL } from '../constants';

export const useAxios = ({ path, method = "get" }, args) => {
  const [{ loading, error, data }, setState] = useState({
    loading: true,
    error: null,
    data: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance({
          method,
          url: BASE_URL + path,
          data: args,
        });
        setState({
          loading: false,
          data: response.data,
        });
      } catch (error) {
        setState({
          loading: false,
          error: error,
        });
      }
    };
    fetchData();
  }, []);

  return { loading, error, data };
};
