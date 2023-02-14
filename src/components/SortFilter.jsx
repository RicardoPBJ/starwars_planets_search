import React, { useContext, useState } from 'react';
import Select from './Select';
import Input from './Input';
import Button from './Button';
import AppContext from '../context/AppContext';

export default function SortFilter() {
  const { setSort, setSortOk } = useContext(AppContext);
  const [radios, setRadios] = useState({
    value: '',
    clicked: true,
  });
  const [sorts, setSorts] = useState('population');
  const handleChange = ({ target: { value } }) => {
    setSorts(value);
  };
  const handleRadio = ({ target: { value } }) => {
    setRadios({
      value,
      clicked: false,
    });
  };

  const handleButton = () => {
    setSort({
      radios: radios.value,
      sorts,
    });
    setSortOk(true);
  };

  return (
    <div>
      <Select
        name="sort-select"
        value={ sorts }
        testId="column-sort"
        options={ [
          'population',
          'orbital_period',
          'diameter',
          'rotation_period',
          'surface_water'] }
        handleSelect={ handleChange }
        labelName="sort"
      />
      <Input
        name="radio"
        labelName="ASC"
        value="ASC"
        type="radio"
        testId="column-sort-input-asc"
        handleInput={ handleRadio }
        placeholder="Search"
      />
      <Input
        name="radio"
        labelName="DESC"
        value="DESC"
        type="radio"
        testId="column-sort-input-desc"
        handleInput={ handleRadio }
        placeholder="Search"
      />
      <Button
        isDisabled={ radios.clicked }
        testId="column-sort-button"
        btnLabel="alo"
        handleButton={ handleButton }
      />
    </div>
  );
}
