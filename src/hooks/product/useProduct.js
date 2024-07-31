import { useState, useEffect } from 'react';
import axios from 'axios';
import { database } from '../../../firebase';
import { get,ref,child } from 'firebase/database';
const useProducts = (category, query) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'Products'));

        if (snapshot.exists()) {
          const productsData = snapshot.val();

          // Convert the products object into an array
          const productsArray = Object.entries(productsData).map(([productId, productData]) => ({
            id: productId,
            ...productData,
          }));

          // Filter products based on matching StoreId with auth.uid

          setProducts(productsArray);
          setError(null);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return { products, loading, error };
};

export default useProducts;


