package com.helpers;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

// Main class for word completion functionality
public class WordCompletion {

    private static final String CSV_FILE_PATH = "C:\\Users\\KIIT\\Desktop\\uwin_firstSem\\AppliedComputing\\FinalProducts.csv";

    // Method to get word completions based on a prefix
    public static Map<String, Integer> getWordCompletion(String prefix) {
        AVLTree avlTree = new AVLTree();

        try {
            populateAVLTree(avlTree, CSV_FILE_PATH);
        } catch (IOException e) {
            System.err.println("Error reading the CSV file.");
            e.printStackTrace();
            return Collections.emptyMap(); // Return empty map in case of error
        } catch (Exception e) {
            System.err.println("Unexpected error occurred while reading the file.");
            e.printStackTrace();
            return Collections.emptyMap(); // Return empty map in case of error
        }

        return avlTree.getWordsWithPrefix(prefix);
    }

    // Helper method to populate the AVL Tree from a CSV file
    private static void populateAVLTree(AVLTree avlTree, String filePath) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] words = line.split(",");
                for (String word : words) {
                    avlTree.insert(word.trim().toLowerCase());
                }
            }
        }
    }

    // Method to get the top 10 suggestions sorted by frequency
    public static List<Map.Entry<String, Integer>> getTopSuggestions(Map<String, Integer> wordFrequencyMap) {
        PriorityQueue<Map.Entry<String, Integer>> minHeap = new PriorityQueue<>(
            Comparator.comparingInt(Map.Entry::getValue)
        );

        for (Map.Entry<String, Integer> entry : wordFrequencyMap.entrySet()) {
            minHeap.offer(entry);
            if (minHeap.size() > 10) {
                minHeap.poll();
            }
        }

        List<Map.Entry<String, Integer>> topSuggestions = new ArrayList<>(minHeap);
        topSuggestions.sort((a, b) -> b.getValue() - a.getValue());
        return topSuggestions;
    }
}

// AVL Tree implementation
class AVLNode {
    String word;
    int frequency;
    AVLNode left, right;
    int height;

    AVLNode(String word) {
        this.word = word;
        this.frequency = 1;
        this.height = 1;
    }
}

class AVLTree {
    private AVLNode root;

    private int getHeight(AVLNode node) {
        return (node == null) ? 0 : node.height;
    }

    private AVLNode rotateRight(AVLNode y) {
        AVLNode x = y.left;
        AVLNode T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
        x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;

        return x;
    }

    private AVLNode rotateLeft(AVLNode x) {
        AVLNode y = x.right;
        AVLNode T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
        y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;

        return y;
    }

    private int getBalance(AVLNode node) {
        return (node == null) ? 0 : getHeight(node.left) - getHeight(node.right);
    }

    public void insert(String word) {
        try {
            root = insertRecursive(root, word);
        } catch (Exception e) {
            System.err.println("Error inserting word: " + word);
            e.printStackTrace();
        }
    }

    private AVLNode insertRecursive(AVLNode node, String word) {
        if (node == null)
            return new AVLNode(word);

        if (word.compareTo(node.word) < 0)
            node.left = insertRecursive(node.left, word);
        else if (word.compareTo(node.word) > 0)
            node.right = insertRecursive(node.right, word);
        else {
            node.frequency++;
            return node;
        }

        node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));

        int balance = getBalance(node);

        if (balance > 1 && word.compareTo(node.left.word) < 0)
            return rotateRight(node);

        if (balance < -1 && word.compareTo(node.right.word) > 0)
            return rotateLeft(node);

        if (balance > 1 && word.compareTo(node.left.word) > 0) {
            node.left = rotateLeft(node.left);
            return rotateRight(node);
        }

        if (balance < -1 && word.compareTo(node.right.word) < 0) {
            node.right = rotateRight(node.right);
            return rotateLeft(node);
        }

        return node;
    }

    public Map<String, Integer> getWordsWithPrefix(String prefix) {
        Map<String, Integer> prefixMap = new HashMap<>();
        try {
            getWordsWithPrefixRecursive(root, prefix, prefixMap);
        } catch (Exception e) {
            System.err.println("Error retrieving words with prefix: " + prefix);
            e.printStackTrace();
        }
        return prefixMap;
    }

    private void getWordsWithPrefixRecursive(AVLNode node, String prefix, Map<String, Integer> prefixMap) {
        if (node == null) return;

        if (node.word.startsWith(prefix))
            prefixMap.put(node.word, node.frequency);

        if (node.left != null)
            getWordsWithPrefixRecursive(node.left, prefix, prefixMap);

        if (node.right != null)
            getWordsWithPrefixRecursive(node.right, prefix, prefixMap);
    }
}
