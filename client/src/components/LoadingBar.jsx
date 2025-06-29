import React from 'react';
import styles from './LoadingBar.module.css';

const LoadingBar = ({ progress }) => {
  return (
    <div className={styles.loadingBarContainer}>
      <div className={styles.loadingBarTrack}>
        <div 
          className={styles.loadingBarProgress}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingBar;