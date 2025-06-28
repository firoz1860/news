import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinnerContent}>
        <Loader2 size={32} className={styles.spinner} />
        <p className={styles.loadingText}>Loading news...</p>
      </div>
    </div>
  );
};

export default Spinner;


