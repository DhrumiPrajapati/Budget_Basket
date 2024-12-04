package com.helpers;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class PageRanking {

    private static final String CSV_FILE_PATH = "C:\\Users\\KIIT\\eclipse-workspace\\Selenium4\\src\\com\\sample\\ProductData.csv";

    public static List<Product> searchProducts(String query) {
        List<Product> productList = readProductData(CSV_FILE_PATH);
        List<String> searchKeywords = Arrays.asList(query.toLowerCase().split("\\s+"));
        calculateKeywordFrequency(productList, searchKeywords);
        return rankPages(productList);
    }

    private static List<Product> readProductData(String filePath) {
        List<Product> productList = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] values = line.split(",");
                if (values.length >= 2) {
                    productList.add(new Product(values[0], values[5], values[2],values[3],values[4],values[1], 0));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return productList;
    }

    private static void calculateKeywordFrequency(List<Product> productList, List<String> searchKeywords) {
        for (Product product : productList) {
            int totalFrequency = 0;
            for (String keyword : searchKeywords) {
                totalFrequency += boyerMoore(product.name.toLowerCase(), keyword.toLowerCase());
            }
            product.frequency = totalFrequency;
        }
    }

    private static int boyerMoore(String text, String pattern) {
        Map<Character, Integer> badChar = preprocessPattern(pattern);
        int m = pattern.length();
        int n = text.length();
        int s = 0; // s is the shift of the pattern with respect to text
        int count = 0;

        while (s <= (n - m)) {
            int j = m - 1;

            while (j >= 0 && pattern.charAt(j) == text.charAt(s + j))
                j--;

            if (j < 0) {
                count++;
                s += (s + m < n) ? m - badChar.getOrDefault(text.charAt(s + m), -1) : 1;
            } else {
                s += Math.max(1, j - badChar.getOrDefault(text.charAt(s + j), -1));
            }
        }
        return count;
    }

    private static Map<Character, Integer> preprocessPattern(String pattern) {
        Map<Character, Integer> badChar = new HashMap<>();
        int m = pattern.length();

        for (int i = 0; i < m; i++) {
            badChar.put(pattern.charAt(i), i);
        }

        return badChar;
    }

    private static List<Product> rankPages(List<Product> productList) {
        productList.sort((p1, p2) -> Integer.compare(p2.frequency, p1.frequency));
        return productList;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String searchQuery;
        List<Product> rankedProducts;

        while (true) {
            System.out.print("Enter Search Query (or type 'exit' to quit): ");
            searchQuery = scanner.nextLine();

            if (searchQuery.equalsIgnoreCase("exit")) {
                break;
            }

            rankedProducts = searchProducts(searchQuery);
            System.out.println("Search Results:");
            int count = 0;
            for (Product product : rankedProducts) {
                System.out.println("Product: " + product.name + ", Link: " + product.link + ", Price: " + product.price);
                count++;
                if (count >= 10) {
                    break;
                }
            }
            System.out.println();
        }

        scanner.close();
    }
}
