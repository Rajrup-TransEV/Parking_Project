import React, { useState, useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonPage, IonItem, IonLabel, IonAvatar, IonGrid, IonRow, IonCol, IonText, IonSpinner, IonIcon } from '@ionic/react';
import { notificationsOutline, settingsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import axios from 'axios';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [profileName] = useState("User");
  const [availableSpaces, setAvailableSpaces] = useState<number>(0);
  const [occupiedSpaces, setOccupiedSpaces] = useState<number>(0);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [realTimeStatus, setRealTimeStatus] = useState<any>(null);
  const [parkingHistory, setParkingHistory] = useState<any[]>([]);
  const history = useHistory(); // Initialize history for navigation

  // Fetch real-time parking status and wallet balance from the backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statusResponse, walletResponse, historyResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/parking/status'),
          axios.get('http://localhost:5000/api/user/wallet'),
          axios.get('http://localhost:5000/api/user/history')
        ]);
        setRealTimeStatus(statusResponse.data);
        setAvailableSpaces(statusResponse.data.availableSpaces);
        setOccupiedSpaces(statusResponse.data.occupiedSpaces);
        setWalletBalance(walletResponse.data.balance);
        setParkingHistory(historyResponse.data.history);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Handle booking parking slot and redirect to the booking page
  const handleBookParking = () => {
    history.push('/parking-booking'); // Redirect to the ParkingSlotBooking page
  };

  // Handle wallet navigation
  const handleWallet = () => {
    history.push('/wallet'); // Redirect to the Wallet page
  };

  // Handle notifications
  const handleNotifications = () => {
    history.push('/notifications'); // Navigate to the Notifications page
  };

  // Handle settings - navigate to the settings page
  const handleSettings = () => {
    history.push('/settings'); // Navigate to the settings page
  };

  // Handle View Parking History navigation
  const handleViewParkingHistory = () => {
    history.push('/parking-history'); // Redirect to the ParkingHistory page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            {/* Profile Avatar */}
            <IonButton color="primary" fill="clear">
              <IonAvatar>
                <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Profile" />
              </IonAvatar>
            </IonButton>

            {/* Notifications Icon */}
            <IonButton fill="clear" onClick={handleNotifications}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>

            {/* Settings Icon */}
            <IonButton fill="clear" onClick={handleSettings}>
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          {/* Loading Spinner */}
          {loading ? (
            <IonRow>
              <IonCol size="12" className="ion-text-center">
                <IonSpinner name="dots" />
              </IonCol>
            </IonRow>
          ) : (
            <>
              {/* Wallet Balance */}
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonLabel>
                      <h2>Wallet Balance</h2>
                      <p>${walletBalance}</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Real-Time Parking Status */}
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonLabel>
                      <h2>Available Spaces</h2>
                      <p>{availableSpaces}</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>

                <IonCol size="12" sizeMd="6">
                  <IonItem>
                    <IonLabel>
                      <h2>Occupied Spaces</h2>
                      <p>{occupiedSpaces}</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>

              {/* Book Parking Slot Button */}
              <IonRow>
                <IonCol size="12">
                  <IonButton expand="full" color="primary" onClick={handleBookParking}>
                    Book Parking Slot
                  </IonButton>
                </IonCol>
              </IonRow>

              {/* Wallet Button */}
              <IonRow>
                <IonCol size="12">
                  <IonButton expand="full" color="tertiary" onClick={handleWallet}>
                    Go to Wallet
                  </IonButton>
                </IonCol>
              </IonRow>

              {/* Parking History Button */}
              <IonRow>
                <IonCol size="12">
                  <IonButton className='but' expand="full" color="secondary" onClick={handleViewParkingHistory}>
                    View Parking History
                  </IonButton>
                </IonCol>
              </IonRow>
            </>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
