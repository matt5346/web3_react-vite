import { useState, useContext } from 'react';
import { Navbar, Welcome, Footer, Services, Transactions } from './components';
import { Notification, Color } from "./notify";
const message = "This is a notification!";

const App = () => {
  return (
    <div className="min-h-screen">
        <div className="gradient-bg-welcome">
            <Navbar />
            <Welcome />
        </div>
        <Services />
        <Transactions />
        <Footer />
    </div>
  )
}

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const createNotification = (color, message) => {
    // addNotificationFunc('TEST ERROR');
    setNotifications([...notifications, { color, message, id: notifications.length }])
  };

  const deleteNotification = (id) =>
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );

  return (
    <>
      <button onClick={() => createNotification(Color.info, 'test')}>Info</button>
      <button onClick={() => createNotification(Color.success)}>Success</button>
      <button onClick={() => createNotification(Color.warning)}>Warning</button>
      <button onClick={() => createNotification(Color.error)}>Error</button>
      {notifications.map(({ id, color }) => (
        <Notification
          key={id}
          onDelete={() => deleteNotification(id)}
          color={color}
          autoClose={true}
        >
          {message}
        </Notification>
      ))}
    </>
  );
}

export default App
