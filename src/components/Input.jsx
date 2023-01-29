import PropTypes from 'prop-types';

function Input({
  name,
  labelName,
  type,
  id,
  testId,
  handleInput,
  placeholder,
}) {
  return (
    <label htmlFor={ name }>
      {labelName}
      <input
        type={ type }
        name={ name }
        id={ id }
        data-testid={ testId }
        onChange={ handleInput }
        placeholder={ placeholder }
      />
    </label>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  labelName: PropTypes.string,
  testId: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
};

Input.defaultProps = {
  id: '',
  placeholder: '',
  labelName: '',
};

export default Input;
