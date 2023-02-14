import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from "../../cypress/mocks/testData";
import userEvent from '@testing-library/user-event';
import AppProvider from '../context/AppProvider';
import mockFetch from '../../cypress/mocks/fetch';

const spyFetch = jest.spyOn(global, "fetch");

describe('Testando o App Star Wars', () => {
  beforeEach(async () => {
    spyFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
  })
  test('testando a barra de pesquisa', () => {
    render(<AppProvider><App /></AppProvider>);
    const searchInput = screen.getByRole('textbox');

    userEvent.type(searchInput, 'Ta');

    expect(searchInput).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(searchInput.value).toBe('Ta');

    userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
    expect(screen.getByTestId('column-filter').value).toBe('population');

    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
    expect(screen.getByTestId('comparison-filter').value).toBe('menor que');

    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), '500');
    expect(screen.getByTestId('value-filter').value).toBe('500');
  });
  test('testando filtro numerico', () => {
    render(<AppProvider><App /></AppProvider>);

    const filterButton = screen.getByRole('button', {
      name: /filtrar/i
    });

    userEvent.click(filterButton);

    const filterSaved = screen.getByText(/population maior que 0/i);

    expect(filterButton).toBeInTheDocument();
    expect(filterSaved).toBeInTheDocument();
  })
  test('testando table', async () => {
    render(<AppProvider><App /></AppProvider>)

    userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
    expect(screen.getByTestId('column-filter').value).toBe('population');

    userEvent.selectOptions(screen.getByTestId('column-filter'), 'surface_water');
    expect(screen.getByTestId('column-filter').value).toBe('surface_water');

    userEvent.selectOptions(screen.getByTestId('column-filter'), 'surface_water');
    expect(screen.getByTestId('column-filter').value).toBe('surface_water');

    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
    expect(screen.getByTestId('comparison-filter').value).toBe('igual a');

    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
    expect(screen.getByTestId('comparison-filter').value).toBe('maior que');

    userEvent.clear(screen.getByTestId('value-filter'));
    userEvent.type(screen.getByTestId('value-filter'), '40');
    expect(screen.getByTestId('value-filter').value).toBe('40');

    const filterButton = screen.getByRole('button', {
      name: /filtrar/i
    });

    userEvent.click(filterButton);

    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
    expect(screen.getByTestId('comparison-filter').value).toBe('menor que');
    userEvent.click(filterButton);

    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
    expect(screen.getByTestId('comparison-filter').value).toBe('igual a');
    userEvent.click(filterButton);



    const filterAll = screen.getByRole('button', {  name: /excluir filtros/i})

    userEvent.click(filterAll)

    expect(filterAll).toBeInTheDocument()


  })
  test('testando filters', () => {
    render(<AppProvider><App /></AppProvider>)

    const input = screen.getByRole('spinbutton')
    userEvent.clear(input);
    userEvent.type(input, '400');

    const filterButton = screen.getByRole('button', {  name: /filtrar/i})

    userEvent.click(filterButton);

    const view = screen.getByTestId('button0')

    userEvent.click(view);

    const inpuColumn = screen.getByTestId("column-filter")
    userEvent.selectOptions(inpuColumn, 'population');

    const inputCompare = screen.getByTestId("comparison-filter")
    userEvent.selectOptions(inputCompare, 'menor que')

    const inputValue = screen.getByTestId("value-filter")
    userEvent.type(inputValue, '4000')

    const button = screen.getByTestId('button-filter');
    userEvent.click(button);

    userEvent.selectOptions(inputCompare, 'maior que')
    userEvent.click(button)
  })
  test('Testando o componente SortFilter', () => {
    render(<AppProvider><App /></AppProvider>)

    const columnSort = screen.getByTestId('column-sort');

    const descRadio = screen.getByTestId('column-sort-input-desc');

    const sortButton = screen.getByTestId('column-sort-button');

    userEvent.click(descRadio);
    userEvent.click(sortButton);

    const ascRadio = screen.getByTestId('column-sort-input-asc');
    userEvent.click(ascRadio);
    userEvent.click(sortButton);

    userEvent.selectOptions(columnSort, 'diameter');
  })
  test('Testando o componente ', async () => {
    mockFetch()
    const { debug } = render(<AppProvider><App /></AppProvider>)
    await waitFor(async () => {
      userEvent.selectOptions(screen.getByTestId('column-filter'), 'population')
      userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que')
    }
    );

    debug()

    await waitFor(() => expect(screen.getByTestId('table')).toBeInTheDocument())

    const filterButton = screen.getByRole('button', {  name: /filtrar/i})

    userEvent.click(filterButton);
    
    await waitFor(async () => {
      userEvent.selectOptions(screen.getByTestId('column-filter'), 'diameter')
      userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a')
    });

    userEvent.click(filterButton);
    
    // expect(screen.getByTestId('filter')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('button0'));
  })
})
