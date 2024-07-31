import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  const notificationStyle = notification.type === 'success'
    ? 'bg-green-500'
    : 'bg-red-500';

  return (
    <div className={`fixed top-4 right-4 px-4 py-2 text-white ${notificationStyle} rounded shadow-lg`}>
      {notification.message}
    </div>
  );
};

export default Notification;
