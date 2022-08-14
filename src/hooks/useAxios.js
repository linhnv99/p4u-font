import AxiosInstance from '../api/axios'
import { useEffect, useState } from "react";

export const useAxios = ({ url, args, method = "get" }) => {
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
          url,
          data: args,
        });
        setState({
          loading: false,
          data: response.data,
        });
      } catch (error) {
        setState({
          loading: false,
          error: "ERROR",
        });
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, error, data };
};
