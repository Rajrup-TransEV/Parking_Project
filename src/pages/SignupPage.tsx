import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonLoading } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Define a type for the response data
interface SignupResponse {
  message: string;
  token?: string;  // Optional token field, in case the backend returns it
}

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const history = useHistory();

  const handleSignUp = async () => {
    if (!username || !name || !email || !phoneNumber || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);

    // Create URLSearchParams object to serialize data as x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);

    try {
      // Specify the expected response type as SignupResponse
      const response = await axios.post<SignupResponse>('http://localhost:5000/users/signup', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Correct content type for URLSearchParams
        },
      });

      if (response.status === 201) {
        // If signup is successful, store token in localStorage (if returned)
        if (response.data.token) {
          localStorage.setItem('auth_token', response.data.token);
        }

        // Navigate to login page or home page after successful signup
        setIsLoading(false);
        setIsSubmitting(false);
        history.push('/login');
      }
    } catch (error) {
      setErrorMessage('An error occurred during sign-up. Please try again.');
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="signup-container">
          <h2>Create an Account</h2>

          {/* Username */}
          <IonItem>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              required
            />
          </IonItem>

          {/* Name */}
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              value={name}
              onIonChange={(e) => setName(e.detail.value!)}
              required
            />
          </IonItem>

          {/* Email */}
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              type="email"
              required
            />
          </IonItem>

          {/* Phone Number */}
          <IonItem>
            <IonLabel position="floating">Phone Number</IonLabel>
            <IonInput
              value={phoneNumber}
              onIonChange={(e) => setPhoneNumber(e.detail.value!)}
              type="tel"
              required
            />
          </IonItem>

          {/* Password */}
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              type="password"
              required
            />
          </IonItem>

          {errorMessage && (
            <IonText color="danger">
              <p>{errorMessage}</p>
            </IonText>
          )}

          {/* Submit Button */}
          <IonButton
            expand="full"
            color="primary"
            onClick={handleSignUp}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </IonButton>

          {/* Loading spinner */}
          <IonLoading isOpen={isLoading} message="Signing you up..." />

          {/* Optional link to login page */}
          <IonButton
            expand="full"
            fill="clear"
            onClick={() => history.push('/login')}
            color="secondary"
          >
            Already have an account? Login
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
