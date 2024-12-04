import React, { useState, useRef, useEffect } from 'react';

function SearchBar({ selectedItem, setSelectedItem, setOptionList }) {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [count,setCount] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target) && !event.target.closest('.search-option')) {
        setShowOptions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [inputRef]);

  useEffect(() => {
    if (selectedItem) {
      console.log(`Selected item changed: ${selectedItem}`);
    }
  }, [selectedItem]);

  const fetchWordCompletionData = async (prefix) => {
    try {
        const response = await fetch(`http://localhost:8080/FinalProject/wordcompletion?prefix=${prefix}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.map(item => item.word); // Assuming the response is an array of objects with a "word" field
    } catch (error) {
        console.error('Fetching word completion data failed:', error);
        return [];
    }
};


const fetchWordFrequencyData = async (prefix) => {
  try {
      const response = await fetch(`http://localhost:8080/FinalProject/wordfrequency?word=${prefix}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.frequency; // Assuming the response is an array of objects with a "word" field
  } catch (error) {
      console.error('Fetching word Frequency data failed:', error);
      return [];
  }
};




  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    try {
      const fetchedOptions = await fetchWordCompletionData(searchTerm);
      const fetchedCount = await fetchWordFrequencyData(searchTerm);
      setOptions(fetchedOptions);
      setCount(fetchedCount);
    } catch (error) {
      console.error('Error fetching word completion data:', error);
    }

    setShowOptions(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedItem(option);
    setSearch(option); // Set search term to the selected option
    setShowOptions(false);
    setShowAlert(true); // Show the alert when an option is selected
  };

  const handleSearchButtonClick = () => {
    performSearch();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (options.length > 0) {
        const firstOption = options[0];
        if (firstOption.toLowerCase() === search.toLowerCase()) {
          performSearch();
        } else {
          setSelectedItem(search);
          setSearch('');
          setShowOptions(false);
          setShowAlert(true);
        }
      } else {
        performSearch();
      }
    }
  };

  const performSearch = () => {
    setShowAlert(true);

    setSelectedItem(search);

    setSearch(''); // Clear the search input after performing search
  };

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <strong key={index} className="font-bold">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  const handleItemClick = (option) => {
    setSelectedItem(option);
    setSearch("");
    setShowOptions(false);
    setShowAlert(true);
  };

  return (
    <>
      <div className="relative w-[20rem] rounded-xl bg-white shadow-md">
        <input
          ref={inputRef}
          type="search"
          className="w-full border-none bg-transparent px-4 py-2 text-gray-900 focus:outline-none"
          placeholder={selectedItem ? selectedItem : 'Search'}
          value={search}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowOptions(true)}
        />

        {showOptions && options.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-md z-50 search-option">
            {options.map((option) => (
              <li
                key={option}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-xl"
                onClick={() => handleItemClick(option)}
              >
                {highlightText(option, search)}
              </li>
            ))}
          </ul>
        )}
        <span className="absolute left-[-20%] top-1/2 transform -translate-y-1/2 flex items-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
            />
          </svg>
          <span className="text-sm">{count}</span>
        </span>
        <button
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-xl px-4 py-1 font-semibold text-gray-100 ${
            search ? 'bg-gray-800' : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleSearchButtonClick}
          disabled={!search}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default SearchBar;
