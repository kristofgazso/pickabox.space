import React from 'react';
import Spinner from '../image/spinner.gif';

const loader = () => {
   return (
      <div className='fp-container'>
         <img src={Spinner} className='fp-loader' alt='loading'/>
      </div>
   )
}

export default loader;
