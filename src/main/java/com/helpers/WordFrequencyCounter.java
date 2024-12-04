package com.helpers;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

// Main class for word frequency counting functionality
public class WordFrequencyCounter {

    private static final String CSV_FILE_PATH = "C:\\Users\\KIIT\\eclipse-workspace\\Selenium4\\src\\com\\sample\\ProductData.csv";
    private static final int TOP_N = 1;

    // Method to get word frequencies from the CSV file
    public static Map<String, Integer> getWordFrequenciesFromCSV() throws IOException {
        List<Product> productList = new ArrayList<>();
        try {
            productList = Helper.readProductData(CSV_FILE_PATH);
        } catch (Exception e) {
            System.err.println("An unexpected error occurred while reading the file: " + e.getMessage());
            return Collections.emptyMap(); // Return empty map in case of error
        }

        return countWordFrequencies(productList);
    }

    // Method to count word frequencies from a list of products
    public static Map<String, Integer> countWordFrequencies(List<Product> productList) {
        Map<String, Integer> wordFrequencyMap = new HashMap<>();

        try {
            for (Product product : productList) {
                String[] words = extractWords(product.name);
                updateWordFrequency(words, wordFrequencyMap);
            }
        } catch (Exception e) {
            System.err.println("Error processing product list: " + e.getMessage());
            e.printStackTrace();
        }

        return wordFrequencyMap;
    }

    // Helper method to update word frequencies in the map
    private static void updateWordFrequency(String[] words, Map<String, Integer> wordFrequencyMap) {
        for (String word : words) {
            wordFrequencyMap.put(word, wordFrequencyMap.getOrDefault(word, 0) + 1);
        }
    }

    // Helper method to extract words from a text
    private static String[] extractWords(String text) {
        if (text == null || text.isEmpty()) {
            return new String[0]; // Return an empty array if the input text is null or empty
        }
        // Convert text to lowercase and then split it into words
        return text.toLowerCase().split("[\\s.,;:!?/()\\[\\]\"]+");
    }

    // Method to get the top N most frequent words
    public static List<Map.Entry<String, Integer>> getFrequentWords(Map<String, Integer> wordFrequencyMap) {
        PriorityQueue<Map.Entry<String, Integer>> heap = new PriorityQueue<>(
                (e1, e2) -> e2.getValue().compareTo(e1.getValue())
        );

        heap.addAll(wordFrequencyMap.entrySet());

        List<Map.Entry<String, Integer>> sortedList = new ArrayList<>();
        while (!heap.isEmpty()) {
            sortedList.add(heap.poll());
        }

        return sortedList.stream().collect(Collectors.toList());
    }

    // Method to display the top most frequent words
    public static void displayTopMostFrequentWords(List<Map.Entry<String, Integer>> sortedEntries, int topN) {
        for (int i = 0; i < Math.min(topN, sortedEntries.size()); i++) {
            Map.Entry<String, Integer> entry = sortedEntries.get(i);
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
    
    public static int getWordFrequency(Map<String, Integer> wordFrequencyMap, String word) {
    	if (wordFrequencyMap.containsKey(word)) {
    	    Integer value = wordFrequencyMap.get(word);
    	    
    	    System.out.println(value);
        	return value;
    	}
    	else {
    		return 0;
    	}

        
        
    }

    public static void main(String[] args) throws IOException {
        Map<String, Integer> wordFrequencyMap = getWordFrequenciesFromCSV();
        List<Map.Entry<String, Integer>> sortedEntries = getFrequentWords(wordFrequencyMap);

        displayTopMostFrequentWords(sortedEntries, TOP_N);
    }
}
