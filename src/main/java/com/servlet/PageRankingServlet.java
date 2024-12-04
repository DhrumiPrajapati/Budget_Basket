package com.servlet;

import com.helpers.PageRanking;
import com.helpers.Product;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/pagerank")
public class PageRankingServlet extends HttpServlet {

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
        String query = request.getParameter("query");

        // Validate input
        if (query == null || query.isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing query parameter.");
            return;
        }

        // Use the PageRanking class to get ranked products
        List<Product> rankedProducts = PageRanking.searchProducts(query);

        // Set the response type
        response.setContentType("application/json");

        // Convert the list to a JSON-like string and write to response
        String jsonResponse = productsToJson(rankedProducts);
        response.getWriter().write(jsonResponse);
    }

    private String productsToJson(List<Product> products) {
        // Use StringBuilder to build the JSON string
        StringBuilder json = new StringBuilder("[");
        for (int i = 0; i < products.size(); i++) {
            Product p = products.get(i);
            json.append("{")
                .append("\"name\":\"").append(escapeJson(p.getName())).append("\",")
                .append("\"link\":\"").append(escapeJson(p.getLink())).append("\",")
                .append("\"price\":\"").append(escapeJson(p.getPrice())).append("\",")
                .append("\"weight\":\"").append(escapeJson(p.getWeight())).append("\",")
                .append("\"image\":\"").append(escapeJson(p.getImage())).append("\",")
                .append("\"cat\":\"").append(escapeJson(p.getCat())).append("\",")
                .append("\"frequency\":").append(p.getFrequency())
                .append("}");
            if (i < products.size() - 1) {
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
