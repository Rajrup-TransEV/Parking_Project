import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonLoading } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import "./ForgotPasswordPage.css"

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  const history = useHistory();

  // Method to send OTP to the email
  const sendOTP = async () => {
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email);

      const response = await axios.post('http://localhost:5000/passwordreset', formData);

      if (response.status === 201) {
        setOtpSent(true);
        setSuccessMessage('OTP sent successfully to your email.');
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while sending OTP. Please try again.');
    }
    setIsLoading(false);
  };

  // Method to verify OTP and reset password
  const verifyOTPAndResetPassword = async () => {
    if (!otp || !newPassword) {
      setErrorMessage('Please enter both OTP and new password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('otp', otp);
      formData.append('newpassword', newPassword);

      const response = await axios.post('http://localhost:5000/passwordreset', formData);

      if (response.status === 200) {
        setOtpVerified(true);
        setSuccessMessage('Password reset successfully.');
        setErrorMessage('');
        setTimeout(() => {
          history.push('/login'); // Navigate to login after success
        }, 2000);
      } else {
        setErrorMessage('Invalid OTP or password reset failed.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while resetting your password. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Forgot Password</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="forgot-password-container">
          <h2>Forgot Your Password?</h2>

          {/* Email Input (First Step) */}
          {!otpSent && (
            <IonItem>
              <IonLabel position="floating">Enter your email address</IonLabel>
              <IonInput
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                type="email"
                required
              />
            </IonItem>
          )}

          {/* OTP and New Password Input (Second Step, after OTP sent) */}
          {otpSent && !otpVerified && (
            <div>
              <IonItem>
                <IonLabel position="floating">Enter OTP</IonLabel>
                <IonInput
                  value={otp}
                  onIonChange={(e) => setOtp(e.detail.value!)}
                  type="text"
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Enter new password</IonLabel>
                <IonInput
                  value={newPassword}
                  onIonChange={(e) => setNewPassword(e.detail.value!)}
                  type="password"
                  required
                />
              </IonItem>

              <IonButton
                expand="full"
                color="primary"
                onClick={verifyOTPAndResetPassword}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Verifying OTP...' : 'Verify OTP & Reset Password'}
              </IonButton>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <IonText color="danger">
              <p>{errorMessage}</p>
            </IonText>
          )}

          {/* Success Message */}
          {successMessage && (
            <IonText color="success">
              <p>{successMessage}</p>
            </IonText>
          )}

          {/* Send OTP Button (First Step) */}
          {!otpSent && (
            <IonButton
              expand="full"
              color="primary"
              onClick={sendOTP}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
            </IonButton>
          )}

          {/* Loading Spinner */}
          <IonLoading isOpen={isLoading} message="Sending OTP..." />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPasswordPage;
