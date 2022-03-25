import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase.js';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [buttonIsDeactivated, setButtonIsDeactivated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logoutError, setLogoutError] = useState('');
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
        const foundUser = users.find(user => user.email === currentUser.email);
        setCurrentUserData(foundUser);
      });
  }, [currentUser]);

  async function signup(data) {
    if (data.password !== data.passwordConfirmation) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setButtonIsDeactivated(true);
      await saveNewUser({
        _id: data.email,
        fullname: data.fullname,
        email: data.email,
      });
      await auth.createUserWithEmailAndPassword(data.email, data.password);
      navigate('/');
    } catch {
      setError('Failed to create an account');
      axios.delete('/api/users', { data: { _id: data.email } });
    }
    setButtonIsDeactivated(false);
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
      setButtonIsDeactivated(true);
      await auth.signInWithEmailAndPassword(data.email, data.password);
      navigate('/');
    } catch {
      setError('Failed to log in');
    }
    setButtonIsDeactivated(false);
  }

  async function logout() {
    setLogoutError('');

    try {
      await auth.signOut();
      navigate('/login');
    } catch {
      setLogoutError('Failed to log out');
    }
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  const value = {
    currentUser,
    users,
    currentUserData,
    login,
    signup,
    logout,
    resetPassword,
    buttonIsDeactivated,
    error,
    logoutError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
