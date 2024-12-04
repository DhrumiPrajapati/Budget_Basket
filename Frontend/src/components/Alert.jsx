import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

function Alert({ type, message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible) {
      gsap.fromTo(
        '.alert',
        { y: '-100%', opacity: 0, scale: 0.2 },
        { y: '0%', opacity: 1, scale: 1, duration: 1, ease: 'power4.out' }
      );
    } else {
      gsap.to('.alert', { y: '-100%', opacity: 0, duration: 0.5, ease: 'power4.in', onComplete: onClose });
    }
  }, [visible, onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 7000); // Close alert after 7 seconds

    return () => clearTimeout(timer);
  }, []);

  let bgColor = '';
  let textColor = '';

  switch (type) {
    case 'info':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-700';
      break;
    case 'success':
      bgColor = 'bg-green-100';
      textColor = 'text-green-700';
      break;
    case 'warning':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-700';
      break;
    case 'error':
      bgColor = 'bg-red-100';
      textColor = 'text-red-700';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-700';
      break;
  }

  return (
    visible && (
      <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 w-64 sm:w-80 bg-white shadow-md rounded-lg p-4 mb-4 text-sm ${bgColor} ${textColor} alert`} role="alert" style={{ zIndex: 999999999 }}>
        <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
        </svg>
        <div>
          <span className="font-medium">{type.charAt(0).toUpperCase() + type.slice(1)} alert!</span> {message}
        </div>
      </div>
    )
  );
}

export default Alert;
