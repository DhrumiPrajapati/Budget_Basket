import React, { useState } from "react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SearchBar from "./SearchBar";
import Alert from "./Alert";

function Navbar({ category, setCategory, categoryList,selectedItem, setSelectedItem ,setOptionList  }) {
  const { ref } = useGSAP(() => {
    gsap.from('nav', { opacity: 0 ,ease: "power2.out",y: -100, duration: 1 }); // Animating the nav element
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleClick = (cat) => {
    setCategory(cat);
    // Show alert
    setAlertType('success'); // Set alert type (success, error, info, warning)
    setAlertMessage(`Selected category: ${cat}`);
    setShowAlert(true);

    // Hide alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <>
      <nav ref={ref} className="bg-gray-800 rounded-xl sticky top-0 z-50">
        <div className="mx-auto mb-3 max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="TechTitens"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {categoryList.slice(0, 7).map((cat, index) => (
                    
                    <button
                      key={index}
                      onClick={() => handleClick(cat)}
                      className={`rounded-md px-3 py-2 text-sm font-medium ${
                        category === cat
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      {cat} 
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <SearchBar selectedItem={selectedItem} setSelectedItem={setSelectedItem} setOptionList={setOptionList} />
            </div>
          </div>
        </div>

        {/* Alert component */}
        {showAlert && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
            <Alert type={alertType} message={alertMessage} onClose={() => setShowAlert(false)} />
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
