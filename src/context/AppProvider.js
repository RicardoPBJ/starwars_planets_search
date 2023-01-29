import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
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
    makeFetch,
    setPlanetData,
    isLoading,
    errors,
    planetSearch,
    setPlanetSearch,
    planetData,
  }), [planetSearch, planetData, isLoading, errors]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export default AppProvider;
