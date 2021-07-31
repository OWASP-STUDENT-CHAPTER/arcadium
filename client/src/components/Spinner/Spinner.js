import React from 'react';
import spinner from './spinner.gif';

const Spinner = ({ width }) => (
  <>
    <img
      src={spinner}
      alt='Loading...'
      style={{ width: { width }, margin: 'auto', display: 'block' }}
    />
  </>
);

export default Spinner;
