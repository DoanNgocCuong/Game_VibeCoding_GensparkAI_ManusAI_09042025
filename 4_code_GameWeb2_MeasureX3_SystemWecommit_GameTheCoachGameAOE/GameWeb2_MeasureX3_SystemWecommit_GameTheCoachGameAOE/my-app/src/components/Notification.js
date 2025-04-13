import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faArrowUp,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

const Notification = ({ message, type = 'info', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return faCheckCircle;
      case 'error':
        return faExclamationCircle;
      case 'level-up':
        return faArrowUp;
      default:
        return faInfoCircle;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'level-up':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div
      className={`notification-animation px-4 py-3 rounded-lg shadow-lg max-w-md ${
        getStyles()
      } ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
    >
      <FontAwesomeIcon icon={getIcon()} className="mr-2" />
      {message}
    </div>
  );
};

export default Notification; 