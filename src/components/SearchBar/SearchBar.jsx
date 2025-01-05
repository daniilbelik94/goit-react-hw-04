import toast, { Toaster } from 'react-hot-toast';

import styles from './SearchBar.module.css';

const notify = () =>
  toast.error('Write a word to search for', {
    duration: 3000,
    position: 'top-right',
  });

const SearchBar = ({ onSearch }) => {
  function onSubmitHandler(e) {
    e.preventDefault();
    if (e.target.elements.search.value.trim() === '') {
      notify();
      return;
    }
    const searchValue = e.target.elements.search.value;
    onSearch(searchValue);
    e.target.reset();
  }

  return (
    <header className={styles.searchHeader}>
      <form className={styles.searchForm} onSubmit={onSubmitHandler}>
        <input
          className={styles.searchInput}
          type='text'
          name='search'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
        />
        <button className={styles.searchBtn} type='submit'>
          Search
        </button>
        <Toaster />
      </form>
    </header>
  );
};

export default SearchBar;