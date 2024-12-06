import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonToggle,
  IonRow,
  IonCol,
  IonCheckbox,
  IonAlert
} from '@ionic/react';
import { personCircleOutline, colorPaletteOutline, helpCircleOutline, informationCircleOutline, settingsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation
import './Settings.css';

const Settings: React.FC = () => {
  const [showAlert, setShowAlert] = React.useState(false);
  const history = useHistory(); // Initialize useHistory

  // Navigate to Appearance Settings page
  const navigateToAppearance = () => {
    history.push('/appearance-settings'); // Navigate to the AppearanceSettings page
  };

  return (
    <IonPage className="settings-page">
      <IonHeader>
        <IonToolbar className="header-toolbar">
          <IonTitle className="title">Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="content">
        <IonList lines="none">
          {/* Account Settings Section */}
          <IonItem button className="settings-item">
            <IonIcon icon={personCircleOutline} slot="start" className="settings-icon" />
            <IonLabel className="settings-label">Account Settings</IonLabel>
          </IonItem>

          {/* Appearance Settings Section */}
          <IonItem button className="settings-item" onClick={navigateToAppearance}>
            <IonIcon icon={colorPaletteOutline} slot="start" className="settings-icon" />
            <IonLabel className="settings-label">Appearance</IonLabel>
          </IonItem>

          {/* Help and Support Section */}
          <IonItem button className="settings-item">
            <IonIcon icon={helpCircleOutline} slot="start" className="settings-icon" />
            <IonLabel className="settings-label">Help and Support</IonLabel>
          </IonItem>

          {/* About Section */}
          <IonItem button className="settings-item">
            <IonIcon icon={informationCircleOutline} slot="start" className="settings-icon" />
            <IonLabel className="settings-label">About</IonLabel>
          </IonItem>

          {/* Automatic Parking System Settings */}
          <IonItem className="settings-toggle-item">
            <IonLabel className="settings-label">Enable Auto-Park</IonLabel>
            <IonToggle slot="end" disabled />
          </IonItem>

          {/* Parking System Specific Options */}
          <IonItem className="settings-toggle-item">
            <IonLabel className="settings-label">Automatic Parking Mode</IonLabel>
            <IonToggle slot="end" disabled />
          </IonItem>

          <IonItem className="settings-toggle-item">
            <IonLabel className="settings-label">Parking Space Sensors</IonLabel>
            <IonToggle slot="end" disabled />
          </IonItem>

          {/* Ratings Section (Disabled) */}
          <IonItem button className="settings-item">
            <IonLabel className="settings-label">Ratings</IonLabel>
          </IonItem>

          {/* System Settings */}
          <IonItem className="settings-item">
            <IonLabel className="settings-label">System Settings</IonLabel>
            <IonIcon icon={settingsOutline} slot="start" className="settings-icon" />
          </IonItem>

          {/* Privacy Settings with Checkbox */}
          <IonItem className="settings-toggle-item">
            <IonLabel className="settings-label">Enable Location Tracking</IonLabel>
            <IonCheckbox slot="end" disabled />
          </IonItem>

          {/* Save Changes Button */}
          <IonRow className="save-button-container">
            <IonCol>
              <IonButton expand="full" color="primary" disabled className="save-buttons">
                Save Changes
              </IonButton>
            </IonCol>
          </IonRow>
        </IonList>

        {/* Optional Alert Example */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Feature Unavailable"
          message="This feature is currently disabled."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
