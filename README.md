# Budget Basket Application

This project focuses on analyzing food prices from various grocery stores, leveraging advanced algorithms, data structures, and web scraping techniques to create an efficient and user-friendly platform.

## Features

### Web Scraping & Data Collection
- **Selenium-based Web Crawler**:
  - Crawls grocery websites in headless mode.
  - Extract product details such as name, price, and category.
  - Stores data in JSON files for easy processing.
  - Parameters like location and dates can be set for customized crawling.

### Search Frequency & User Analytics
- **Search Frequency Tracking**:
  - Implemented using a combination of AVL Trees and HashMaps.
  - Tracks user search queries and provides frequency insights.
- **HashMap Integration**:
  - Enables quick retrieval and analysis of search data.
  - Offers insights into user behavior trends.

### Advanced Data Structures & Algorithms
- **Trie for Word Completion**:
  - Supports auto-completion for user search queries.
  - Handles large datasets efficiently for real-time suggestions.
- **Spell Checking**:
  - Hybrid Trie implementation suggests corrections for misspelled words.
  - Uses edit distance calculations for accurate suggestions.
- **Frequency Count**:
  - Counts word occurrences across datasets using TreeMap for sorted storage.
- **Page Ranking**:
  - Ranks results based on search term frequency, relevance, and additional criteria.

### Data Validation & Pattern Matching
- **Regex for Input Validation**:
  - Ensures valid URLs, dates, and input formats.
  - Includes methods to validate and parse dates.
- **Regex for Pattern Extraction**:
  - Extracts phone numbers, email addresses, and price details from data using custom patterns.

## Implementation Highlights
- **Backend Development**:
  - Entire backend implemented in Java.
  - JSON used for seamless data handling.
  - Modular functions ensure scalability and maintainability.
- **Efficiency**:
  - Optimized algorithms for fast search and retrieval.
  - Leveraged AVL Trees for balanced performance in search operations.

## Technologies Used
- **Programming Language**: Java
- **Web Scraping**: Selenium
- **Data Storage**: JSON
- **Algorithms**: Trie, AVL Trees, Regex
- **Other Tools**: TreeMap, HashMap for dynamic data management

## Team Contributions
- **Web Crawler Development**:
  - Implemented Selenium-based crawler for gathering product data.
  - Customized crawling logic for headless execution and JSON storage.
- **Search Analytics**:
  - Designed and developed search frequency and word completion features.
  - Enhanced spell checking and word suggestion accuracy.
- **Data Validation**:
  - Validated URLs, dates, and inputs using robust regex patterns.
- **Frequency Analysis**:
  - Implemented efficient data structures for tracking search trends and user behavior.
