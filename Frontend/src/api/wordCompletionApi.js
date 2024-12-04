const fetchWordCompletionData = async (prefix) => {
  try {
    const response = await fetch(`http://localhost:8080/FinalProject/wordcompletion?prefix=${prefix}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const wordsArray = data.map(item => item.word);
    return wordsArray;
  } catch (error) {
    console.error('Error fetching word completion data:', error);
    throw error;
  }
};

export default fetchWordCompletionData;
