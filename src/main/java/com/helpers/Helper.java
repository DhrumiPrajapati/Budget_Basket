package com.helpers;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Helper {
	
	public static List<Product> readProductData(String filePath) {
        List<Product> productList = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] values = line.split(",");
                if (values.length >= 2) {
                    productList.add(new Product(values[0].toLowerCase(), values[5], values[2],values[3],values[4],values[1], 0));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return productList;
    }
}
