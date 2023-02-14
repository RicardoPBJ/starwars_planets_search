import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const comparisonOptions = ['maior que', 'menor que', 'igual a'];
export default function NumberFilter() {
  const {
    planetData,
    setPlanetFiltered,
    setNumberFilter,
    setFiltersList,
    filtersList,
    planetFiltered,
    optionsNumberFilter,
    setOptionsNumberFilter,
  } = useContext(AppContext);
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState('0');
  const [column, setColumn] = useState('population');

  const handleFilter = (compare, value, columnItem) => {
    if (planetFiltered.length === 0) {
      setPlanetFiltered(
        planetData.filter((planet) => {
          switch (compare) {
          case 'maior que':
            return +planet[columnItem] > +value;
          case 'menor que':
            return +planet[columnItem] < +value;
          default:
            return +planet[columnItem] === +value;
          }
        }),
      );
    } else {
      setPlanetFiltered(
        planetFiltered
          .filter((planet) => {
            switch (compare) {
            case 'maior que':
              return +planet[columnItem] > +value;
            case 'menor que':
              return +planet[columnItem] < +value;
            default:
              return +planet[columnItem] === +value;
            }
          }),
      );
    }
  };

  const onNumberFilter = () => {
    handleFilter(comparison, number, column);
    const actualFilter = `${column} ${comparison} ${number}`;
    setFiltersList([...filtersList, actualFilter]);
    setNumberFilter(true);
    if (optionsNumberFilter.includes(column)) {
      setOptionsNumberFilter(
        optionsNumberFilter.filter((option) => option !== column),
      );
    }
    // setOptionsNumberFilter([...optionsNumberFilter]);
  };

  const deleteAllFilters = () => {
    setNumberFilter(false);
    setFiltersList([]);
  };

  useEffect(() => {
    setColumn(optionsNumberFilter[0]);
  }, [optionsNumberFilter]);

  return (
    <form>
      <Select
        name="column-filter"
        testId="column-filter"
        id="column-filter"
        options={ optionsNumberFilter }
        handleSelect={ ({ target: { value } }) => setColumn(value) }
      />
      <Select
        name="comparison-filter"
        testId="comparison-filter"
        id="comparison-filter"
        options={ comparisonOptions }
        handleSelect={ ({ target: { value } }) => setComparison(value) }
      />
      <Input
        id="value-filter"
        name="value-filter"
        labelName=""
        value={ number }
        type="number"
        testId="value-filter"
        placeholder=""
        handleInput={ ({ target: { value } }) => setNumber(value) }
      />
      <Button
        testId="button-filter"
        btnLabel="Filtrar"
        handleButton={ onNumberFilter }
      />
      <Button
        testId="button-remove-filters"
        btnLabel="Excluir filtros"
        handleButton={ deleteAllFilters }
      />
    </form>
  );
}
