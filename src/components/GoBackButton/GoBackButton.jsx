import PropTypes from 'prop-types';
import styles from './GoBackButton.module.css';

export default function GoBackButton({ onClick }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      Go back
    </button>
  );
}

GoBackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
