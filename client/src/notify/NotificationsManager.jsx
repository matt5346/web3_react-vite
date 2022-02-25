import React, { createContext, useState, useEffect, useCallback } from "react";
import NotificationContext from "./NotificationsManager";
import ReactDOM, { createPortal } from 'react-dom';
import PropTypes from "prop-types";

import Notification from "./Notification";
const appRoot = document.getElementsByTagName('html')[0];

const NotificationsManager = ({ children }) => {
  let [notifications, setNotifications] = useState([]);


  const createNotification = useCallback(({ color, message, autoClose, children }) => {
    console.log(color, autoClose, children, 'color, autoClose, children');
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

  useEffect(() => {
    createNotification(notifications)
  }, [notifications, setNotifications]);

  let deleteNotification = (id) => {
    const filteredNotifications = notifications.filter(
      (_, index) => id !== index,
      []
    );
    setNotifications(filteredNotifications);
  };

  return notifications.map(({ id, ...props }, index) => (
    <Notification
      key={id}
      onDelete={() => deleteNotification(index)}
      {...props}
    />
  ));
}

export default NotificationsManager;