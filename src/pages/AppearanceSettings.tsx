import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonToggle, IonRow, IonCol, IonButton } from '@ionic/react';
import './AppearanceSettings.css'; 

const AppearanceSettings: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      const prefersDarkMode = JSON.parse(savedTheme);
      setDarkMode(prefersDarkMode);
      document.body.classList.toggle('dark', prefersDarkMode);
    } else {

      const prefersSystemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersSystemDarkMode);
      document.body.classList.toggle('dark', prefersSystemDarkMode);
    }
  }, []);  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Appearance Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines="none">
          <IonItem>
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle checked={darkMode} onIonChange={toggleTheme} />
          </IonItem>
          <IonItem>
            <IonLabel>Font Style</IonLabel>
            <IonToggle checked={false} onIonChange={() => {}} /> 
          </IonItem>

          {/* Other Appearance Settings */}
          <IonRow>
            <IonCol size="12">
              <IonButton expand="full" color="primary" onClick={() => alert('Other appearance settings can go here.')}>
                Apply Changes
              </IonButton>
            </IonCol>
          </IonRow>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AppearanceSettings;
