package com.helpers;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.util.*;

public class SpellChecker {

	private static final String CSV_FILE_PATH = "C:\\Users\\KIIT\\eclipse-workspace\\Selenium4\\src\\com\\sample\\ProductData.csv";

    public static List<String> spellCheck(String keyString, int option) {
        List<String> alternativeWords = new ArrayList<>();

        keyString = keyString.toLowerCase();

        try {
            CuckooHashTable<String> ch = new CuckooHashTable<>(new StringHashFamily(3), 101);
            Map<String, Integer> wordDistance = new HashMap<>();

            List<String> productNames = readProductNamesFromCSV(CSV_FILE_PATH);
            for (String productName : productNames) {
                String[] words = extractWords(productName);
                for (String word : words) {
                    ch.insert(word);
                    wordDistance.put(word, editDistance(keyString, word));
                }
            }

            alternativeWords = sortAndGetWords(wordDistance, option);
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }

        return alternativeWords;
    }

    private static List<String> readProductNamesFromCSV(String filePath) throws IOException {
        List<String> productNames = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            br.readLine(); // Skip header
            while ((line = br.readLine()) != null) {
                String[] values = line.split(",");
                productNames.add(values[0]); // Assuming the product name is the first column
            }
        }
        return productNames;
    }

    private static String[] extractWords(String text) {
        if (text == null || text.isEmpty()) {
            return new String[0];
        }
        return text.toLowerCase().split("[\\s.,;:!?/()\\[\\]\"]+");
    }

    public static List<String> sortAndGetWords(Map<String, Integer> wordDistance, int option) {
        List<Map.Entry<String, Integer>> entries = new ArrayList<>(wordDistance.entrySet());
        mergeSort(entries);

        Map<String, Integer> sortedMap = new LinkedHashMap<>();
        for (Map.Entry<String, Integer> entry : entries) {
            sortedMap.put(entry.getKey(), entry.getValue());
        }

        List<String> alternativeWords = new ArrayList<>();
        int count = 0;
        for (Map.Entry<String, Integer> entry : sortedMap.entrySet()) {
            if (count < option) {
                alternativeWords.add(entry.getKey());
                count++;
            } else {
                break;
            }
        }
        return alternativeWords;
    }

    static int editDistance(String word1, String word2) {
        int len1 = word1.length();
        int len2 = word2.length();

        int[][] dp = new int[len1 + 1][len2 + 1];

        for (int i = 0; i <= len1; i++) {
            dp[i][0] = i;
        }

        for (int j = 0; j <= len2; j++) {
            dp[0][j] = j;
        }

        for (int i = 0; i < len1; i++) {
            char c1 = word1.charAt(i);
            for (int j = 0; j < len2; j++) {
                char c2 = word2.charAt(j);

                if (c1 == c2) {
                    dp[i + 1][j + 1] = dp[i][j];
                } else {
                    int replace = dp[i][j] + 1;
                    int insert = dp[i][j + 1] + 1;
                    int delete = dp[i + 1][j] + 1;

                    int min = Math.min(replace, insert);
                    min = Math.min(min, delete);
                    dp[i + 1][j + 1] = min;
                }
            }
        }

        return dp[len1][len2];
    }

    private static void mergeSort(List<Map.Entry<String, Integer>> entries) {
        mergeSortRecursive(entries, 0, entries.size() - 1);
    }

    private static void mergeSortRecursive(List<Map.Entry<String, Integer>> entries, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSortRecursive(entries, left, mid);
            mergeSortRecursive(entries, mid + 1, right);
            merge(entries, left, mid, right);
        }
    }

    private static void merge(List<Map.Entry<String, Integer>> entries, int left, int mid, int right) {
        List<Map.Entry<String, Integer>> temp = new ArrayList<>();
        int i = left, j = mid + 1;

        while (i <= mid && j <= right) {
            if (entries.get(i).getValue() <= entries.get(j).getValue()) {
                temp.add(entries.get(i++));
            } else {
                temp.add(entries.get(j++));
            }
        }

        while (i <= mid) {
            temp.add(entries.get(i++));
        }

        while (j <= right) {
            temp.add(entries.get(j++));
        }

        for (int k = left; k <= right; k++) {
            entries.set(k, temp.get(k - left));
        }
    }

    public interface HashFamily<AnyType> {
        int hash(AnyType x, int which);
        int getNumberOfFunctions();
        void generateNewFunctions();
    }

    public static class StringHashFamily implements HashFamily<String> {
        private final int[] MULTIPLIERS;
        private final Random r = new Random();

        public StringHashFamily(int d) {
            MULTIPLIERS = new int[d];
            generateNewFunctions();
        }

        @Override
        public int hash(String x, int which) {
            final int MULT = MULTIPLIERS[which];
            int hashVal = 0;

            for (int i = 0; i < x.length(); i++) {
                hashVal = MULT * hashVal + x.charAt(i);
            }

            return hashVal;
        }

        @Override
        public int getNumberOfFunctions() {
            return MULTIPLIERS.length;
        }

        @Override
        public void generateNewFunctions() {
            for (int i = 0; i < MULTIPLIERS.length; i++) {
                MULTIPLIERS[i] = r.nextInt();
            }
        }
    }

    public static class CuckooHashTable<AnyType> {
        private static final double MAX_LOAD = 0.4;
        private final HashFamily<? super AnyType> hashFunctions;
        private final int numHashFunctions;

        private AnyType[] array;
        private int currentSize;

        public CuckooHashTable(HashFamily<? super AnyType> hf, int size) {
            allocateArray(nextPrime(size));
            doClear();
            hashFunctions = hf;
            numHashFunctions = hf.getNumberOfFunctions();
        }

        public boolean contains(AnyType x) {
            return findPos(x) != -1;
        }

        private int myhash(AnyType x, int which) {
            int hashVal = hashFunctions.hash(x, which);
            hashVal %= array.length;
            if (hashVal < 0) {
                hashVal += array.length;
            }
            return hashVal;
        }

        private int findPos(AnyType x) {
            for (int i = 0; i < numHashFunctions; i++) {
                int pos = myhash(x, i);
                if (array[pos] != null && array[pos].equals(x)) {
                    return pos;
                }
            }
            return -1;
        }

        public boolean insert(AnyType x) {
            if (contains(x)) {
                return false;
            }

            if (currentSize >= array.length * MAX_LOAD) {
                expand();
            }

            return insertHelper1(x);
        }

        private boolean insertHelper1(AnyType x) {
            final int COUNT_LIMIT = 100;
            while (true) {
                int lastPos = -1;
                int pos;

                for (int count = 0; count < COUNT_LIMIT; count++) {
                    for (int i = 0; i < numHashFunctions; i++) {
                        pos = myhash(x, i);

                        if (array[pos] == null) {
                            array[pos] = x;
                            currentSize++;
                            return true;
                        }
                    }

                    int i = 0;
                    do {
                        pos = myhash(x, r.nextInt(numHashFunctions));
                    } while (pos == lastPos && i++ < 5);

                    AnyType tmp = array[lastPos = pos];
                    array[pos] = x;
                    x = tmp;
                }

                if (++rehashes > ALLOWED_REHASHES) {
                    expand();
                    rehashes = 0;
                } else {
                    rehash();
                }
            }
        }

        private void expand() {
            rehash((int) (array.length / MAX_LOAD));
        }

        private void rehash() {
            hashFunctions.generateNewFunctions();
            rehash(array.length);
        }

        private void rehash(int newLength) {
            AnyType[] oldArray = array;

            allocateArray(nextPrime(newLength));
            currentSize = 0;

            for (AnyType str : oldArray) {
                if (str != null) {
                    insert(str);
                }
            }
        }

        private void doClear() {
            currentSize = 0;
            Arrays.fill(array, null);
        }

        private void allocateArray(int arraySize) {
            array = (AnyType[]) new Object[arraySize];
        }

        private static int nextPrime(int n) {
            while (!isPrime(n)) {
                n++;
            }
            return n;
        }

        private static boolean isPrime(int n) {
            if (n <= 1) {
                return false;
            }

            if (n == 2 || n == 3) {
                return true;
            }

            if (n % 2 == 0 || n % 3 == 0) {
                return false;
            }

            for (int i = 5; i * i <= n; i += 6) {
                if (n % i == 0 || n % (i + 2) == 0) {
                    return false;
                }
            }

            return true;
        }

        private static final Random r = new Random();
        private int rehashes = 0;
        private static final int ALLOWED_REHASHES = 1;
    }
}
