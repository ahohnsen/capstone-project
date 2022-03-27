import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { auth } from '../firebase.js';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [isButtonDeactivated, setIsButtonDeactivated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user === null) {
        setCurrentUser(user);
        setCurrentUserData(null);
        setUsers(null);
      } else {
        setCurrentUser(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    axios
      .get('/api/users')
      .then(response => response.data)
      .then(users => {
        setUsers(users);
        const foundUser = users.find(user => user._id === currentUser.email);
        setCurrentUserData(foundUser);
      });
  }, [currentUser]);

  async function signup(data) {
    if (data.password !== data.passwordConfirmation) {
      return setError('The passwords do not match.');
    }

    try {
      setError('');
      setIsButtonDeactivated(true);
      await saveNewUser({
        _id: data.email,
        userId: nanoid(),
        fullname: data.fullname,
      });
      await auth.createUserWithEmailAndPassword(data.email, data.password);
      navigate('/');
    } catch {
      setError(
        'Failed to create an account. Please refresh the page and try again.'
      );
      axios.delete('/api/users', { data: { _id: data.email } });
    }
    setIsButtonDeactivated(false);
  }

  function saveNewUser(userData) {
    try {
      return axios.post('/api/users', userData);
    } catch (error) {
      console.log('Error', error.messages);
    }
  }

  async function login(data) {
    try {
      setError('');
      setIsButtonDeactivated(true);
      await auth.signInWithEmailAndPassword(data.email, data.password);
      navigate('/');
    } catch {
      setError('Failed to log in. Please try again.');
    }
    setIsButtonDeactivated(false);
  }

  async function logout() {
    setError('');

    try {
      await auth.signOut();
      navigate('/login');
    } catch {
      setError('Failed to log out. Please try again.');
    }
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  const value = {
    currentUser,
    users,
    currentUserData,
    setCurrentUserData,
    login,
    signup,
    logout,
    resetPassword,
    isButtonDeactivated,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
