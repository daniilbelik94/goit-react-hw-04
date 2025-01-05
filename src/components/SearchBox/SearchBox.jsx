import { useId } from 'react';

import styles from './SearchBox.module.css';

const SearchBox = ({ searchValue, onSearch }) => {
  const searchInput = useId();
  return (
    <div className={styles.searchBox}>
      <label className={styles.label} htmlFor={searchInput}>
        Find contact by name
      </label>
      <input
        className={styles.input}
        type='text'
        id={searchInput}
        value={searchValue}
        onChange={(event) => {
          onSearch(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchBox;