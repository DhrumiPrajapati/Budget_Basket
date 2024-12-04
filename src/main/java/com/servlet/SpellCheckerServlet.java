package com.servlet;

import com.helpers.SpellChecker;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/spellcheck")
public class SpellCheckerServlet extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Handle CORS preflight requests
        response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // Adjust as needed
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // Adjust as needed
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");

        // Get parameters from request
        String keyString = request.getParameter("keyString");
        String optionStr = request.getParameter("option");

        // Validate input
        if (keyString == null || keyString.isEmpty() || optionStr == null || optionStr.isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing parameters: keyString and option are required.");
            return;
        }

        int option;
        try {
            option = Integer.parseInt(optionStr);
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid option parameter. It should be a number.");
            return;
        }

        // Use the SpellChecker class to get alternative words
        List<String> alternativeWords = SpellChecker.spellCheck(keyString, option);

        // Set the response type
        response.setContentType("application/json");

        // Convert the list to a JSON-like string and write to response
        String jsonResponse = listToJson(alternativeWords);
        response.getWriter().write(jsonResponse);
    }

    private String listToJson(List<String> list) {
        // Use StringBuilder to build the JSON string
        StringBuilder json = new StringBuilder("[");
        for (int i = 0; i < list.size(); i++) {
            json.append("\"").append(escapeJson(list.get(i))).append("\"");
            if (i < list.size() - 1) {
                json.append(",");
            }
        }
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
