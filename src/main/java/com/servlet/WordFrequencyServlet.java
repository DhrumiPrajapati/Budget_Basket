package com.servlet;

import com.helpers.WordFrequencyCounter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@WebServlet("/wordfrequency")
public class WordFrequencyServlet extends HttpServlet {

    private static final int DEFAULT_TOP_N = 0;

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Handle CORS preflight requests
        response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");

        // Get the 'topN' parameter from the request
        String word = request.getParameter("word");
        int topN = DEFAULT_TOP_N; // Default value

        // Validate and parse the 'topN' parameter
//        if (word != null && !word.isEmpty()) {
//            try {
//                topN = Integer.parseInt(topNStr);
//            } catch (NumberFormatException e) {
//                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid topN parameter. It should be a number.");
//                return;
//            }
//        }

        // Use the WordFrequencyCounter class to get word frequencies
        Map<String, Integer> wordFrequencyMap = WordFrequencyCounter.getWordFrequenciesFromCSV();
        int wordCount = WordFrequencyCounter.getWordFrequency(wordFrequencyMap, word);
        
        System.out.println(wordCount);

        // Set the response type
        response.setContentType("application/json");

        // Convert the list to a JSON-like string and write to response
//        String jsonResponse = listToJson(wordCount);
        
        String jsonResponse = String.format("{\"word\":\"%s\", \"frequency\":%d}", word, wordCount);
        response.getWriter().write(jsonResponse);
    }

    // Helper method to convert a list of Map.Entry to a JSON-like string
//    private String listToJson(List<Map.Entry<String, Integer>> list) {
//        StringBuilder json = new StringBuilder("[");
//        for (int i = 0; i < list.size(); i++) {
//            Map.Entry<String, Integer> entry = list.get(i);
//            json.append("{\"word\":\"").append(entry.getKey()).append("\", \"frequency\":").append(entry.getValue()).append("}");
//            if (i < list.size() - 1) {
//                json.append(",");
//            }
//        }
//        json.append("]");
//        return json.toString();
//    }
}
