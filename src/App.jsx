import React, { useEffect, useState } from "react";
import { useFetch } from "./hooks";

const url = "https://swapi.co/api/people/1";

const App = () => {
  const [trigger, setTrigger] = useState(false);
  const [response, loading, error] = useFetch({ trigger, url });

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
