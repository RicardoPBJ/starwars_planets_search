import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const {
    planetData,
    sort,
    isLoading,
    makeFetch,
    planetSearch,
    planetFiltered,
    numberFilter,
  } = useContext(AppContext);
  const [planetArray, setPlanetArray] = useState([]);
  useEffect(() => {
    const atualPlanets = numberFilter ? planetFiltered : planetData;
    setPlanetArray(atualPlanets);
  }, [planetData, planetFiltered, numberFilter]);

  useEffect(() => {
    makeFetch('https://swapi.dev/api/planets');
  }, []);

  useEffect(() => {
    const { radios, sorts } = sort;
    const newPlanetArray = planetArray.reduce((acc, curr) => {
      if (curr[sorts] === 'unknown') {
        acc.push(curr);
      } else {
        const index = acc.findIndex((item) => item[sorts] === 'unknown');
        acc.splice(index, 0, curr);
      }
      return acc;
    }, []);

    if (sort.radios) {
      switch (radios) {
      case 'ASC': {
        setPlanetArray(newPlanetArray
          .sort((value1, value2) => value1[sorts] - value2[sorts]));
        break;
      }
      case 'DESC': {
        setPlanetArray(newPlanetArray
          .sort((value1, value2) => value2[sorts] - value1[sorts]));
        break;
      }
      default: break;
      }
    }

    // }, [sortOk, numberFilter, planetData, sort, planetFiltered]);
  }, [sort]);

  console.log(planetArray);

  return (
    <div>
      {
        isLoading
        && <p>Loading...</p>
      }

      {
        !!planetData.length
        && (
          <table data-testid="table" className="">
            <thead>
              <tr>
                {
                  Object.keys(planetData[0]).map((value) => (
                    <th key={ value } className="table-categories">{value}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {planetArray
                .filter(({ name }) => name.includes(planetSearch))
                .map((planet, index) => (
                  <tr key={ index } className="">
                    {Object.entries(planet)
                      .map((item, ind) => (
                        <td
                          key={ `${item[1]} ${ind}` }
                          data-testid={ `planet-${item[0]}` }
                          className="table-words"
                        >
                          {item[1]}
                        </td>))}
                  </tr>)) }
            </tbody>
          </table>
        )
      }
    </div>

  );
}
