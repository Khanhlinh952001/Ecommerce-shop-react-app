import React, { createContext, useState, useEffect, useContext } from 'react';
import { ref, set, child, get, update } from 'firebase/database';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, database } from '../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const dbRef = ref(database);
          const snapshot = await get(child(dbRef, `customers/${firebaseUser.uid}`));
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          } else {
            console.log("No data available for user");
          }
        } catch (error) {
          setError(error.message);
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `customers/${userCredential.user.uid}`));
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Logged in successfully!');
      } else {
        console.log("No data available for user");
      }
    } catch (error) {
      setError(error.message);
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, fullName, phoneNumber, area, city, state, postCode) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = {
        id: user.uid,
        email,
        fullName,
        phoneNumber,
        billingAddress: {
          streetAddress: area,
          city,
          state,
          zip: postCode
        }
      };
      await set(ref(database, `customers/${user.uid}`), userData);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      setError(error.message);
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user');
      toast.success('Logged out successfully!');
    } catch (error) {
      setError(error.message);
      console.error("Logout failed:", error);
    }
  };

  const updateUser = async (updatedUser) => {
    if (!user || !user.id) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      await update(ref(database, `customers/${user.id}`), updatedUser);
      const updatedUserData = { ...user, ...updatedUser };
      setUser(updatedUserData);
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      toast.success('Profile updated successfully!');
    } catch (error) {
      setError(error.message);
      console.error("Profile update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
