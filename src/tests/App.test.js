import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from "../../cypress/mocks/testData";
import userEvent from '@testing-library/user-event';

describe('Testando o App Star Wars', () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  });
  test('testando a barra de pesquisa', () => {
    render(<App />);
    const searchInput = screen.getByRole('textbox');

    userEvent.type(searchInput, 'Ta')

    expect(searchInput).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(searchInput.value).toBe('Ta');
  });
  test('testando filtro numerico', () => {
    render(<App />)

    const filterButton = screen.getByRole('button', {
      name: /filtrar/i
    })

    userEvent.click(filterButton)

    const filterSaved = screen.getByText(/population maior que 0/i)

    expect(filterButton).toBeInTheDocument()
    expect(filterSaved).toBeInTheDocument()

    userEvent.selectOptions(screen.getByTestId('column-filter'), 'population')
    expect(screen.getByTestId('column-filter').value).toBe('population');

    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que')
    expect(screen.getByTestId('comparison-filter').value).toBe('menor que');

    userEvent.clear(screen.getByTestId('value-filter'))
    userEvent.type(screen.getByTestId('value-filter'), '500')
    expect(screen.getByTestId('value-filter').value).toBe('500')
  })
})
