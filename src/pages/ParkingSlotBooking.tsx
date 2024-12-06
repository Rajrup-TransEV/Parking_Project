import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonSelect, IonSelectOption, IonRow, IonCol, IonAlert, IonSpinner } from '@ionic/react';
import './ParkingSlotBooking.css';  

const ParkingSlotBooking: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState<string>('');  
  const [availableParking, setAvailableParking] = useState<any[]>([]); 
  const [selectedParking, setSelectedParking] = useState<any | null>(null);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null); 
  const [selectedDuration, setSelectedDuration] = useState<number>(1);  
  const [showAlert, setShowAlert] = useState<boolean>(false); 
  const [loading, setLoading] = useState<boolean>(false);

  const dummyParkingData = [
    { id: 1, location: 'Kolkata Sector V', availableSlots: 5, isActive: true },
    { id: 2, location: 'Kolkata New Town', availableSlots: 3, isActive: true },
    { id: 3, location: 'Kolkata Salt Lake', availableSlots: 2, isActive: false }
  ];

  const dummySlotData = [
    { slotId: 1, status: 'available' },
    { slotId: 2, status: 'occupied' },
    { slotId: 3, status: 'available' },
    { slotId: 4, status: 'available' },
    { slotId: 5, status: 'occupied' }
  ];

  useEffect(() => {
    setAvailableParking(dummyParkingData);
  }, []);

  // Simulate fetching available slots for a selected parking lot
  const handleSelectParkingLot = (parkingId: number) => {
    const selected = availableParking.find((parking) => parking.id === parkingId);
    setSelectedParking(selected);
    if (selected && selected.isActive) {
      setAvailableSlots(dummySlotData);
    } else {
      setAvailableSlots([]);
    }
  };

  const handleBookParking = () => {
    if (selectedSlot && selectedDuration) {
      setShowAlert(true);
    }
  };

  const handleSearchLocation = () => {
    const filteredParking = dummyParkingData.filter((parking) =>
      parking.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setAvailableParking(filteredParking);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setSelectedSlot(null);
    setSelectedDuration(1);
    setAvailableSlots([]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Parking Slot Booking</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRow>
          <IonCol size="12">
            <IonInput
              value={searchLocation}
              onIonInput={(e) => setSearchLocation(e.detail.value!)}
              placeholder="Search location (e.g., Kolkata Sector V)"
              clearInput
            />
            <IonButton expand="full" onClick={handleSearchLocation}>
              Search Parking Lots
            </IonButton>
          </IonCol>
        </IonRow>

        {availableParking.length > 0 && (
          <IonRow>
            {availableParking.map((parking) => (
              <IonCol size="12" sizeMd="6" key={parking.id}>
                <IonButton 
                  color={parking.isActive ? 'primary' : 'danger'} 
                  expand="full" 
                  onClick={() => handleSelectParkingLot(parking.id)}
                >
                  {parking.location}
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        )}
        {selectedParking && availableSlots.length > 0 && (
          <div className="parking-lot">
            {availableSlots.map((slot) => (
              <div 
                className={`car-slot ${slot.status === 'available' ? 'available' : 'occupied'}`} 
                key={slot.slotId}
                onClick={() => {
                  if (slot.status === 'available') {
                    setSelectedSlot(slot);
                  }
                }}
              >
                <div className="car-slot-label">{`Slot ${slot.slotId}`}</div>
              </div>
            ))}
          </div>
        )}
        <IonRow>
          <IonCol size="12">
            <IonSelect value={selectedDuration} onIonChange={(e) => setSelectedDuration(e.detail.value!)}>
              <IonSelectOption value={1}>1 Hour</IonSelectOption>
              <IonSelectOption value={2}>2 Hours</IonSelectOption>
              <IonSelectOption value={3}>3 Hours</IonSelectOption>
            </IonSelect>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12">
            <IonButton 
              expand="full" 
              onClick={handleBookParking} 
              disabled={!selectedSlot || selectedSlot.status === 'occupied'}
            >
              Book Slot
            </IonButton>
          </IonCol>
        </IonRow>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={handleCloseAlert}
          header="Booking Confirmed"
          message={`Your parking slot ${selectedSlot?.slotId} at ${selectedParking?.location} is booked for ${selectedDuration} hour(s).`}
          buttons={[{ text: 'Okay', handler: handleCloseAlert }]}/>
      </IonContent>
    </IonPage>
  );
};

export default ParkingSlotBooking;
