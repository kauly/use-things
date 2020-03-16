import React, { useEffect, useState } from "react";
import { useNativeFetch } from "./hooks";

const url = "https://swapi.co/api/people/1";

const App = () => {
  const [trigger, setTrigger] = useState(false);
  const [response, loading, error] = useNativeFetch({ url }, trigger);

  useEffect(() => {
    console.log("App -> response, loading, error", response);
  }, [response, loading, error]);

  const _handleClick = e => setTrigger(!trigger);

  return (
    <div>
      Make a request?
      <button onClick={_handleClick}>YES</button>
    </div>
  );
};

export default App;
