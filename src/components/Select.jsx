import PropTypes from 'prop-types';
import React from 'react';

function Select({
  name, testId, id, options, handleSelect, labelName, selectClass, labelClass }) {
  return (
    <label htmlFor="name" className={ labelClass }>
      {labelName}
      <select
        data-testid={ testId }
        name={ name }
        id={ id }
        onChange={ handleSelect }
        className={ selectClass }
      >
        {
          options.map((value, index) => (
            <option
              key={ index }
              value={ value }
            >
              {value}
            </option>
          ))
        }
      </select>
    </label>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  testId: PropTypes.string,
  id: PropTypes.string,
  labelName: PropTypes.string,
  handleSelect: PropTypes.func,
  selectClass: PropTypes.string,
  labelClass: PropTypes.string,
};

Select.defaultProps = {
  testId: null,
  id: null,
  options: [''],
  handleSelect: null,
  labelName: '',
  selectClass: '',
  labelClass: '',
};

export default Select;
