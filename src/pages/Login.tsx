import React from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <h2>Login Page</h2>
        <IonButton>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
