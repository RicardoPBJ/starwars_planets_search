import PropTypes from 'prop-types';

function Button({ testId, btnLabel, isDisabled, handleButton, btnClass }) {
  return (
    <button
      type="button"
      data-testid={ testId }
      disabled={ isDisabled }
      onClick={ handleButton }
      className={ btnClass }
    >
      {btnLabel}
    </button>
  );
}

Button.propTypes = {
  testId: PropTypes.string.isRequired,
  btnLabel: PropTypes.string.isRequired,
  handleButton: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  btnClass: PropTypes.string,
};

Button.defaultProps = {
  isDisabled: false,
  btnClass: '',
};

export default Button;
