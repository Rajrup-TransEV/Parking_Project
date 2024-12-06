import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonInput, IonButton, IonText, IonItem, IonLabel, IonToast } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

interface LoginResponse {
  token: string;
  // You can add other fields if necessary
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  // Always check for token on page load, but don't automatically redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Token is found, but still stay on the login page
      console.log('Token found, but staying on the login page');
    }
  }, []);

  // Handle form submission
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please fill in both fields');
      setShowToast(true);
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('password', password);

      // Specify the expected response type as LoginResponse
      const response = await axios.post<LoginResponse>('http://localhost:5000/users/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('auth_token', token); // Store the token in localStorage
        history.replace('/dashboard'); // Navigate to the dashboard
      } else {
        setErrorMessage('Login failed. Please try again.');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Something went wrong. Please try again.');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '20px' }}>
          <h2>Welcome Back!</h2>

          {/* Email Input */}
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>

          {/* Password Input */}
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>

          {/* Login Button */}
          <IonButton expand="full" onClick={handleLogin}>
            Login
          </IonButton>

          {/* Error Message */}
          {errorMessage && (
            <IonText color="danger">
              <p>{errorMessage}</p>
            </IonText>
          )}

          {/* Forgot Password Link */}
          <div style={{ marginTop: '10px' }}>
            <IonText>
              <a href="/forgot-Password">Forgot Password?</a>
            </IonText>
          </div>

          {/* Sign Up Button */}
          <div style={{ marginTop: '20px' }}>
            <IonButton expand="full" color="secondary" routerLink="/signUp">
              Sign Up
            </IonButton>
          </div>

          {/* Toast for showing error messages */}
          <IonToast
            isOpen={showToast}
            message={errorMessage}
            duration={2000}
            onDidDismiss={() => setShowToast(false)}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
