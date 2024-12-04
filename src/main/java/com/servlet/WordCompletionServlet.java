package com.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Map;
import java.util.stream.Collectors;

import com.helpers.WordCompletion;

@WebServlet("/wordcompletion")
public class WordCompletionServlet extends HttpServlet {

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

        // Get parameters from request
        String prefix = request.getParameter("prefix");

        // Validate input
        if (prefix == null || prefix.isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing parameter: prefix is required.");
            return;
        }

        // Use the WordCompletion class to get word suggestions
        Map<String, Integer> wordFrequencyMap = WordCompletion.getWordCompletion(prefix);

        // Convert the map to a JSON-like string
        String jsonResponse = mapToJson(wordFrequencyMap);

        // Set the response type
        response.setContentType("application/json");

        // Write the JSON response
        response.getWriter().write(jsonResponse);
    }

    private String mapToJson(Map<String, Integer> map) {
        // Use StringBuilder to build the JSON string
        StringBuilder json = new StringBuilder();
        json.append("[");

        // Convert the map to a JSON-like string with proper escaping
        map.entrySet().stream()
           .sorted((e1, e2) -> e2.getValue().compareTo(e1.getValue())) // Sort by frequency in descending order
           .limit(10) // Limit to top 10 suggestions
           .forEach(entry -> {
               if (json.length() > 1) {
                   json.append(",");
               }
               json.append("{")
                   .append("\"word\": \"").append(escapeJson(entry.getKey())).append("\", ")
                   .append("\"frequency\": ").append(entry.getValue())
                   .append("}");
           });

        json.append("]");
        return json.toString();
    }

    // Method to escape JSON special characters
    private String escapeJson(String value) {
        if (value == null) {
            return "";
        }

        // Escape special characters
        return value.replace("\\", "\\\\")
                    .replace("\"", "\\\"")
                    .replace("\b", "\\b")
                    .replace("\f", "\\f")
                    .replace("\n", "\\n")
                    .replace("\r", "\\r")
                    .replace("\t", "\\t");
    }
}
