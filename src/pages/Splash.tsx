import React, { useEffect } from 'react';
import { IonPage, IonContent, IonImg } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Splash: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    // Simulate the splash screen delay (e.g., logo animation and text fade-in)
    setTimeout(() => {
      history.push('/login'); // Navigate to the Login page after 5 seconds
    }, 5000);
  }, [history]);

  return (
    <IonPage>
      <IonContent className="flex justify-center items-center bg-[#31004F] h-screen">
        {/* Logo */}
        <IonImg className="w-[150px] h-[150px] animate-slideIn" src="src/assets/parly.png" alt="Logo" />

        {/* Text animation */}
        <div className="flex justify-center mt-5 opacity-0 animate-textFadeIn">
          <span className="text-white text-xl mr-2 animate-delay-2s">P</span>
          <span className="text-white text-xl mr-2 animate-delay-2.3s">A</span>
          <span className="text-white text-xl mr-2 animate-delay-2.6s">R</span>
          <span className="text-white text-xl mr-2 animate-delay-2.9s">K</span>
          <span className="text-white text-xl animate-delay-3.2s">Y</span>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
