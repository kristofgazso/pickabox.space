import React, {useState} from 'react';
import Loader from './loader';

const useLoader = () => {
   const [loading, setLoading] = useState(false);
   return [
      loading ? <Loader/>: null,
      //Show the loading screen
      () => setLoading(true),
      //Hide the loading screen
      () => setLoading(false)
   ]
}

export default useLoader
