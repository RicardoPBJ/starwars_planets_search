import React, { useContext } from 'react';
import Table from '../components/Table';
import Input from '../components/Input';
import AppContext from '../context/AppContext';

export default function Home() {
  const { setPlanetSearch } = useContext(AppContext);

  const handleChange = ({ target: { value } }) => {
    setPlanetSearch(value);
  };

  return (
    <>
      <Input
        name="text"
        labelName="Pesquisar Planetas"
        type="text"
        testId="name-filter"
        handleInput={ handleChange }
        placeholder="Search"
      />
      <Table />
    </>
  );
}
