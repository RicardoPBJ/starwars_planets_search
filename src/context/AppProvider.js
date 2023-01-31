import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [optionsNumberFilter, setOptionsNumberFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [optionsComparison, setOptionsComparison] = useState([
    'maior que', 'menor que', 'igual a',
  ]);
  const [filtersList, setFiltersList] = useState([]);
  const [numberFilter, setNumberFilter] = useState(false);
  const [planetFiltered, setPlanetFiltered] = useState([]);
  const [planetSearch, setPlanetSearch] = useState('');
  const [planetData, setPlanetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const makeFetch = async (url) => {
    try {
      setIsLoading(true);

      const response = await fetch(url);

      const json = await response.json();
      json.results.map((result) => delete result.residents);
      return setPlanetData(json.results);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  const values = useMemo(() => ({
    setOptionsComparison,
    optionsComparison,
    setOptionsNumberFilter,
    optionsNumberFilter,
    filtersList,
    setFiltersList,
    planetFiltered,
    setPlanetFiltered,
    numberFilter,
    setNumberFilter,
    makeFetch,
    setPlanetData,
    isLoading,
    errors,
    planetSearch,
    setPlanetSearch,
    planetData,
  }), [
    optionsNumberFilter,
    planetSearch,
    planetData,
    isLoading,
    errors,
    numberFilter,
    planetFiltered,
    filtersList,
    optionsComparison,
  ]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default AppProvider;
