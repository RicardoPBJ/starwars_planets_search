import React, { useContext } from 'react';
import Table from '../components/Table';
import Input from '../components/Input';
import AppContext from '../context/AppContext';
import NumberFilter from '../components/NumberFilter';
import NumberFiltersList from '../components/NumberFiltersList';

export default function Home() {
  const { setPlanetSearch, filtersList, planetSearch } = useContext(AppContext);

  const handleChange = ({ target: { value } }) => {
    setPlanetSearch(value);
  };

  return (
    <>
      <Input
        name="text"
        labelName="Pesquisar Planetas"
        value={ planetSearch }
        type="text"
        testId="name-filter"
        handleInput={ handleChange }
        placeholder="Search"
      />
      {
        filtersList.length > 0
        && <NumberFiltersList />
      }
      <NumberFilter />
      <Table />
    </>
  );
}
