import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  return { product, loading, error };
};

export default useProductDetail;
