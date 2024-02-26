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
    <div className="d-flex align-items-center justify-content-around">
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
        labelName="Ordenar"
        selectClass="filter-select"
        labelClass="label-select d-flex flex-column align-items-start "
      />
      <div className="d-flex flex-column">
        <Input
          name="radio"
          labelName="Ascendente"
          value="ASC"
          type="radio"
          testId="column-sort-input-asc"
          handleInput={ handleRadio }
          placeholder="Search"
          inputClass="color-yellow"
          labelClass="sort-label"
        />
        <Input
          name="radio"
          labelName="Descendente"
          value="DESC"
          type="radio"
          testId="column-sort-input-desc"
          handleInput={ handleRadio }
          placeholder="Search"
          labelClass="sort-label"
          inputClass="color-yellow"
        />
      </div>
      <Button
        isDisabled={ radios.clicked }
        testId="column-sort-button"
        btnLabel="Ordenar"
        handleButton={ handleButton }
        btnClass="filter-btn btn-label"
      />
    </div>
  );
}
