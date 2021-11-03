import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import styles from './RatingList.css';
import RatingListEntry from './RatingListEntry/RatingListEntry';
import { ProductIdContext } from '../../../context/ProductIdContext';

export default function RatingList() {
  const [reviewList, setReviewList] = useState([]);
  const { productId } = useContext(ProductIdContext);

  useEffect(() => {
    function getFirstTwoReviews() {
      return axios.get('/api/reviews/firstTwoReviews', {
        params: {
          productId,
        },
      });
    }

    getFirstTwoReviews().then((response) => {
      setReviewList(response.data.reviews);
    });
  }, [productId]);

  return (
    <div className={styles.content}>
      {reviewList.map((review) => (
        <RatingListEntry key={review.review_id} review={review} />
      ))}
    </div>
  );
}
