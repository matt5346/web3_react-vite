import React, { useContext } from "react";
// import ReactDOM from "react-dom";

import Notification, { Color } from "./Notification";
import { NotificationContext } from "./NotificationContext";
// import { APINotificationsProvider } from "./NotificationContext";
// import createContainer from "./createContainer";

// const containerElement = createContainer();
// let notify;

// useAPINotifications();

function useAPINotifications() {
  console.log(useContext(NotificationContext), 'NotificationContext useAPINotifications');
  // const { notifications, addNotificationFunc } = useContext(APINotificationsContext);
  // return { notifications, addNotificationFunc };
}

// ReactDOM.render(
//   <NotificationsManager
//     setNotify={(notifyFn) => {
//       notify = notifyFn;
//     }}
//   />,
//   containerElement
// );

export { Notification, Color };

export function info(children, autoClose) {
  console.log(children, 'INFO SHOW');
  return notify({
    color: Color.info,
    children,
    autoClose,
  });
}

export function success(children, autoClose) {
  return notify({
    color: Color.success,
    children,
    autoClose,
  });
}

export function warning(children, autoClose) {
  return notify({
    color: Color.warning,
    children,
    autoClose,
  });
}

export function error(children, autoClose) {
  return notify({
    color: Color.error,
    children,
    autoClose,
  });
}