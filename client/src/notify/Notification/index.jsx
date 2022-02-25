import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { ImCross } from 'react-icons/im'

import "./Notification.css";
import createContainer from "../createContainer";
const container = createContainer();
let timeToDelete = 300;
let timeToClose = 10000;

const Notification = ({ color = Color.info, message = '', autoClose = false, onDelete, children,  }) => {
  const [isClosing, setIsClosing] = useState(false);

  const slideClass = isClosing ? 'slide-out' : 'slide-in';
  const isShrink = isClosing ? 'shrink' : '';
  useEffect(() => {
    if (isClosing) {
      const timeoutId = setTimeout(onDelete, timeToDelete);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isClosing, onDelete]);

  useEffect(() => {
    if (autoClose) {
      const timeoutId = setTimeout(() => setIsClosing(true), timeToClose);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [autoClose]);

  return createPortal(
    <div className={`notification-wrap ${isShrink}`}>
      <div
        className={`notification ${color} ${slideClass}`}
      >
        {message}
        <button onClick={() => setIsClosing(true)} className="closeButton">
          <ImCross fontSize={14} className="closeButton__icon"/>
        </button>
      </div>
    </div>,
    container
  );
}

export const Color = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

Notification.propTypes = {
  notificationType: PropTypes.oneOf(Object.keys(Color)),
  children: PropTypes.element,
};

export default Notification;