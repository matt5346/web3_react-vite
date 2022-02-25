import React, { createContext, useState, useCallback } from 'react';
import Notification from "./Notification";

export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    // const contextValue = {
    //     notifications,
    //     addNotifications: useCallback((message) => {
    //         console.log(message, 'MESSAGE');
    //     }),
    // };

    const createNotification = useCallback((message, color, autoClose = true, children) => {
        console.log(color, message, children, 'color, autoClose, children');
        setNotifications((prevNotifications) => {
          return [
            ...prevNotifications,
            {
              children,
              color,
              message,
              autoClose,
              id: prevNotifications.length,
            },
          ];
        });
      }, [setNotifications]);

      const deleteNotification = (id) => {
        const filteredNotifications = notifications.filter(
            (_, index) => id !== index,
            []
        );
        setNotifications(filteredNotifications);
    };

    return (
        <NotificationContext.Provider value={{notifications, createNotification}}>
            {children}
            {notifications.map(({ id, ...props }, index) => (
                <Notification
                    key={id}
                    onDelete={() => deleteNotification(index)}
                    {...props}
                />
            ))}
        </NotificationContext.Provider>
    );
}
// import React, { createContext } from 'react';

// export const NotificationContext = createContext({});
