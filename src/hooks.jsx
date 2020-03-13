import { useEffect, useState } from "react";
import { pipe } from "ramda";

const fetchResponse = ({ success, data }) => ({
  success,
  data
});

export const useFetch = ({ trigger = false, config = {}, url }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (!trigger) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(url, config);
        const data = await res.json();
        pipe(fetchResponse, setResponse)({ success: true, data });
      } catch (err) {
        console.error(err);
        pipe(fetchResponse, setError)({ success: false, data: err });
      }
      setLoading(false);
    })();
  }, [trigger]);
  return [response, loading, error];
};
