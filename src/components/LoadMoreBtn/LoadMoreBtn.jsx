import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <button className={styles.LoadMoreBtn} type='button' onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;