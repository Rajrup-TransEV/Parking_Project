import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import './index.css';
import LoginPage from './pages/LoginPage';   // Your Login Page
import AppearanceSettings from "./pages/AppearanceSettings";
import ParkingHistory from './pages/ParkingHistory';
import SignupPage from './pages/SignupPage';   // Your Login Page
import Splash from './pages/Splash'; // Update the import to match the new location
import Dashboard from './pages/Dashboard';
import ParkingSlotBooking from './pages/ParkingSlotBooking';
import Settings from './pages/Settings';  
import Notifications from './pages/Notifications';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme/variables.css';  
import ForgotPasswordPage from './pages/ForgotPasswordPage';
// import Dashboard from './pages/Dashboard';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/splash" component={Splash} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} exact />
        <Route path="/Dashboard" component={Dashboard} exact />
        <Route path="/parking-booking" component={ParkingSlotBooking} exact />
        <Route path="/settings" component={Settings} exact />
        <Route path="/parking-history" component={ParkingHistory} exact />
        <Route path="/appearance-settings" component={AppearanceSettings} />
        <Route path="/notifications" component={Notifications } />
      
        
        {/* Default route */}
        <Route exact path="/">
          <Redirect to="/splash" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
