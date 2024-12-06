import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonPage, IonToast } from '@ionic/react';
import io from 'socket.io-client';

const Notifications: React.FC = () => {
  const [notification, setNotification] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    // Connect to the socket server
    const socketIo = io('http://localhost:5000');
    setSocket(socketIo);

    // Listen for 'response' events from the server
    socketIo.on('response', (data: any) => {
      setResponse(data);
      setNotification(data.message || 'Notification received.');
      setShowToast(true);
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const sendNotification = () => {
    if (socket) {
      const data = {
        parkingspotid: 'P123',
        detectionstatus: 'Yes',
        confirmationstatus: 'Yes',
      };
      socket.emit('bookingconfchannel', data);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonButton expand="full" onClick={sendNotification}>
          Send Notification
        </IonButton>

        {/* Display Response Toast */}
        <IonToast
          isOpen={showToast}
          message={notification}
          duration={3000}
          onDidDismiss={() => setShowToast(false)}
        />

        {response && (
          <div>
            <h3>Response:</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
