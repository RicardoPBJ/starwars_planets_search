import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Button from './Button';

export default function NumberFiltersList() {
  const {
    planetData,
    filtersList,
    setFiltersList,
    setNumberFilter,
    setOptionsNumberFilter,
    optionsNumberFilter,
    setPlanetFiltered,
  } = useContext(AppContext);

  const deleteFilter = (item) => {
    const column = item.split(' ')[0];
    const newFilters = filtersList.filter((filter) => filter !== item);
    setFiltersList(newFilters);
    setOptionsNumberFilter([...optionsNumberFilter, column]);
    if (newFilters.length === 0) {
      setNumberFilter(false);
    }
    if (newFilters.length > 0) {
      let filtered = [];
      newFilters.forEach((filters) => {
        const filterSplit = filters.split(' ');
        const compare = `${filterSplit[1]} ${filterSplit[2]}`;
        const columnItem = filterSplit[0];
        const value = filterSplit[3];
        filtered = planetData.filter((planet) => {
          switch (compare) {
          case 'maior que':
            return +planet[columnItem] > +value;
          case 'menor que':
            return +planet[columnItem] < +value;
          case 'igual a':
            return +planet[columnItem] === +value;
          default:
            return false;
          }
        });
      });
      setPlanetFiltered(filtered);
    }
  };

  return (
    <div>
      {
        filtersList
          .map((item, index) => (
            <div key={ `filter ${index}` } data-testid="filter">
              <p>{ item }</p>
              <Button
                testId={ `button${index}` }
                btnLabel="excluir"
                handleButton={ () => deleteFilter(item) }
                btnClass=""
              />
            </div>))
      }
    </div>
  );
}
