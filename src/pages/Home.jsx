import React, { useContext } from 'react';
import '../style/home.css';
import Table from '../components/Table';
import Input from '../components/Input';
import AppContext from '../context/AppContext';
import NumberFilter from '../components/NumberFilter';
import NumberFiltersList from '../components/NumberFiltersList';
import SortFilter from '../components/SortFilter';

export default function Home() {
  const { setPlanetSearch, filtersList, planetSearch } = useContext(AppContext);

  const handleChange = ({ target: { value } }) => {
    setPlanetSearch(value);
  };

  return (
    <div className="home-page">
      <div className="filters">
        <Input
          name="text"
          labelName=""
          value={ planetSearch }
          type="text"
          testId="name-filter"
          handleInput={ handleChange }
          placeholder=""
          inputClass="filters-search-input"
          labelClass=""
        />
        {filtersList.length > 0 && <NumberFiltersList />}
        <div className="home-filters">
          <NumberFilter />
          <SortFilter />
        </div>
      </div>
      <Table />
    </div>
  );
}
