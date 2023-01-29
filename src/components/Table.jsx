import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const { planetData, isLoading, makeFetch, planetSearch } = useContext(AppContext);

  useEffect(() => {
    makeFetch('https://swapi.dev/api/planets');
  }, []);

  console.log(planetData);

  return (
    <div>
      {
        isLoading
        && <p>Loading...</p>
      }

      {
        !!planetData.length
        && (
          <table>
            <thead>
              <tr>
                {
                  Object.keys(planetData[0]).map((value) => (
                    <th key={ value }>{value}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                Object.values(planetData)
                  .filter(({ name }) => name.includes(planetSearch))
                  .map((planet, index) => (
                    <tr key={ index }>
                      {Object.values(planet)
                        .map((item, ind) => <td key={ ind }>{item}</td>)}
                    </tr>))
              }
            </tbody>
          </table>
        )
      }
    </div>

  );
}
