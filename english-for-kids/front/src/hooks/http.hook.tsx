import { useCallback, useState } from "react";

const useHttp = () => {
  const [loading, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setLoad(true);
    try {
      if (body) {
        /* eslint-disable no-param-reassign */
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }
      /* eslint-enable no-param-reassign */
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Что не так");
      }
      setLoad(false);
      return data;
    } catch (e) {
      setLoad(false);
      setError(e.message);
      throw e;
    }
  }, []);
  return { loading, request, error };
};

export default useHttp;
