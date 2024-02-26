import PropTypes from 'prop-types';

function Input({
  name,
  labelName,
  type,
  id,
  testId,
  handleInput,
  placeholder,
  value,
  labelClass,
  inputClass,
}) {
  return (
    <label htmlFor={ name } className={ labelClass }>
      {labelName}
      <input
        type={ type }
        name={ name }
        id={ id }
        value={ value }
        data-testid={ testId }
        onChange={ handleInput }
        placeholder={ placeholder }
        className={ inputClass }
      />
    </label>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  labelName: PropTypes.string,
  testId: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
};

Input.defaultProps = {
  value: '',
  id: '',
  placeholder: '',
  labelName: '',
  labelClass: '',
  inputClass: '',
};

export default Input;
