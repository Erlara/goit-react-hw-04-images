import PropTypes from 'prop-types';
import { ButtonLoad } from './Button.styled';

export const Button = ({ onLoad }) => {
  return <ButtonLoad onClick={() => onLoad()}>Load more</ButtonLoad>;
};

Button.propTypes = {
  onLoad: PropTypes.func.isRequired,
};
