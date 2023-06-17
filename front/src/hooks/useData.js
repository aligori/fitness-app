import {useEffect, useState} from 'react';
import {API} from "../utils/plugins/API";

function useData(uri, extraDeps = []) {
  const [data, setData] = useState();
  useEffect(() => {
    if (uri) {
      let ignore = false;
      API.get(uri)
        .then(response => {
          if (!ignore) {
            setData(response.data);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [uri, ...extraDeps]);
  return data;
}

export default useData;