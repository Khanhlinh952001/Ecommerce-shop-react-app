import { useState, useEffect } from "react";
import { ref, set, get, child, remove } from "firebase/database";
import { database } from "../../firebase"; // Ensure Firebase is initialized
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const generateUniqueOrderId = (existingIds) => {
  let orderId;
  do {
    orderId = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit number
  } while (existingIds.has(orderId));
  return orderId;
};

const useOrders = (userId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchOrders(userId);
    }
  }, [userId]);

  const fetchOrders = async (userId) => {
    setLoading(true);
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `orders/${userId}`));
      if (snapshot.exists()) {
        setOrders(Object.values(snapshot.val()));
      } else {
        setOrders([]);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

 const addOrder = async (order) => {
  const existingIds = new Set(orders.map(o => o.orderId));
  const newOrderId = generateUniqueOrderId(existingIds); // Function to generate a unique order ID

  try {
    // Assume database is defined elsewhere
    await set(ref(database, `orders/${userId}/${newOrderId}`), { ...order, orderId: newOrderId });

    // Update local state
    setOrders((prevOrders) => [...prevOrders, { ...order, orderId: newOrderId }]);
    
    // Show success toast notification
    toast.success(`Order ${newOrderId} added successfully!`);

    // Navigate to order details page after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      navigate(`/orderDetails/${newOrderId}`);
    }, 3000);
  } catch (err) {
    // Handle error
    setError(err);
    toast.error('Error adding order!');
  }
};

  const deleteOrder = async (orderId) => {
    try {
      await remove(ref(database, `orders/${userId}/${orderId}`));
      setOrders((prevOrders) => prevOrders.filter(order => order.orderId !== orderId));
      toast.success(`Order ${orderId} deleted successfully!`);
    } catch (err) {
      setError(err);
      toast.error('Error deleting order!');
    }
  };

  return { orders, loading, error, addOrder, deleteOrder };
};

export default useOrders;
