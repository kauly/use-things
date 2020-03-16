import { useState, useEffect } from "react";
import { pipe, isEmpty, isNil } from "ramda";

const fetchHook = ({ success, data, func }) => {
  if (!func) return { success, data };
  const hook = func(data);
  return { success, data: hook };
};

const fetchConfig = ({ token, method = "GET", data = {} }) => ({
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
  body: !isEmpty(data) ? JSON.stringify(data) : undefined
});

const preFlight = (data, func) => (isNil(func) ? data : func(data));

export const useNativeFetch = (
  {
    url,
    token,
    data = undefined,
    onComplete = undefined,
    onError = undefined,
    onPreFlight = undefined,
    method = "GET"
  },
  dep = undefined
) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    if (!isNil(dep) && !dep) return;
    (async function() {
      const config = fetchConfig({
        token,
        method,
        data: preFlight(data, onPreFlight)
      });
      setLoading(true);
      try {
        const res = await fetch(url, config);
        if (res.status !== 200) throw res.status;
        const data = await res.json();
        pipe(fetchHook, setResponse)({ success: true, data, func: onComplete });
      } catch (err) {
        console.error(err);
        pipe(
          fetchHook,
          setResponse
        )({ success: false, data: err, func: onError });
      }
      setLoading(false);
    })();
  }, [url, dep, data]);

  return [response, loading];
};
