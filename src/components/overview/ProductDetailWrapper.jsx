import React, { useState, useEffect } from 'react';
import axios from 'axios';

const withProductDetails =
  (WrappedComponent, productId) =>
  (...props) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
      axios
        .get(`/products?productId=${productId}`)
        .then((response) => {
          setProduct(response.data.Product);
        })
        .catch((error) => {
          console.log('Error getting product details', error);
        });
    }, []);
    // allowed for HOC
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent product={product} {...props} />;
  };

export default withProductDetails;