import React from 'react';
import styles from './QA.css';
import Search from './Search/Search';
import QuestionsList from './QuestionsList/QuestionsList';

const QA = function () {
  return (
    <div className={styles.container}>
      <h3>Questions & Answers</h3>
      <Search />
      <QuestionsList />
    </div>
  );
};

export default QA;
