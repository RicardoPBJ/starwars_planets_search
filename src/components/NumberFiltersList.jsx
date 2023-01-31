import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Button from './Button';

export default function NumberFiltersList() {
  const { filtersList } = useContext(AppContext);

  return (
    <div>
      {
        filtersList
          .map((item, index) => (
            <span key={ `filter ${index}` }>
              <p>{ item }</p>
              <Button
                testId="button"
                btnLabel="excluir"
                handleButton={ () => console.log('alo') }
              />
            </span>))
      }
    </div>
  );
}
