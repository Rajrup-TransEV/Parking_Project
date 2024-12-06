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
  IonAvatar,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/react';
import { carSportOutline, calendarOutline, locationOutline, informationCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';  // Import useHistory for navigation
import './ParkingHistory.css';  // Import your CSS file

// Updated parkingHistory array to include time in a separate format
const parkingHistory = [
  {
    id: 1,
    location: 'Downtown Parking Lot',
    startDate: '2024-12-01T08:00:00',
    endDate: '2024-12-02T18:00:00',
    status: 'Completed',
  },
  {
    id: 2,
    location: 'City Center Garage',
    startDate: '2024-11-15T10:00:00',
    endDate: '2024-11-16T14:00:00',
    status: 'Canceled',
  },
  {
    id: 3,
    location: 'Airport Parking',
    startDate: '2024-10-10T05:00:00',
    endDate: '2024-10-12T20:00:00',
    status: 'Completed',
  },
];

// Helper functions to format date and time separately
const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

const formatTime = (dateTime: string) => {
  const date = new Date(dateTime);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return date.toLocaleTimeString('en-US', options);
};

const ParkingHistory: React.FC = () => {
  const history = useHistory(); // Initialize history for navigation

  // Handle clicking the details button
  const handleDetails = (id: number) => {
    // Navigate to the details page, passing the history item ID
    history.push(`/parking-history-details/${id}`);
  };

  return (
    <IonPage className="parking-history-container">
      <IonHeader>
        <IonToolbar className="header-bar">
          <IonTitle className="page-title">Parking Slot History</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="page-content">
        <IonList lines="none">
          {parkingHistory.map((historyItem) => (
            <IonItem key={historyItem.id} className="history-card">
              <IonAvatar slot="start">
                <IonIcon icon={carSportOutline} className="car-icon-style" />
              </IonAvatar>
              <IonLabel>
                <h2 className="parking-location">{historyItem.location}</h2>
                <IonRow className="date-status-row">
                  <IonCol size="6">
                    <IonText color="medium">
                      <small>
                        <IonIcon icon={calendarOutline} />
                        {formatDate(historyItem.startDate)} - {formatDate(historyItem.endDate)}
                      </small>
                    </IonText>
                  </IonCol>
                  <IonCol size="6" className="status-container">
                    <IonText color={historyItem.status === 'Completed' ? 'success' : 'danger'}>
                      <small>{historyItem.status}</small>
                    </IonText>
                  </IonCol>
                </IonRow>
                <IonRow className="time-row">
                  <IonCol size="6">
                    <IonText color="medium">
                      <small>
                        <IonIcon icon={locationOutline} />
                        Start: {formatTime(historyItem.startDate)}
                      </small>
                    </IonText>
                  </IonCol>
                  <IonCol size="6" className="status-container">
                    <IonText color="medium">
                      <small>
                        <IonIcon icon={locationOutline} />
                        End: {formatTime(historyItem.endDate)}
                      </small>
                    </IonText>
                  </IonCol>
                </IonRow>
              </IonLabel>
              {/* Add onClick handler to navigate to details page */}
              <IonButton fill="clear" color="primary" slot="end" onClick={() => handleDetails(historyItem.id)}>
                <IonIcon icon={informationCircleOutline} />
                Details
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ParkingHistory;
