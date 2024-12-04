const fetchSpellCheckData = async () => {
  try {
    const response = await fetch('http://localhost:8080/FinalProject/spellcheck?keyString=caokie&option=1');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching spell check data:", error);
    throw error;
  }
};

export default fetchSpellCheckData;
