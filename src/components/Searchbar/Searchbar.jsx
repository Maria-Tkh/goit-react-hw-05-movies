import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSearch }) {
  const handleSearch = e => {
    e.preventDefault();
    if (e.target.query.value.trim()) {
      onSearch(e.target.query.value);
    }
    console.log(e.target.query.value);
    e.target.reset();
  };

  return (
    <>
      <form className="" onSubmit={handleSearch}>
        <input className={styles.input} name="query" type="text" autoComplete="off" autoFocus />
        <button type="submit" className={styles.button}>
          <span className="">Search</span>
        </button>
      </form>
    </>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
