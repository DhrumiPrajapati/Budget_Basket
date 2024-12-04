package com.helpers;

public class Product {
    protected String name;
    protected String link;
    protected String price;
    protected String weight;
    protected String image;
    protected String cat;
    public int frequency;

    public Product(String name, String link, String price, String weight, String image, String cat, int frequency) {
        this.name = name;
        this.link = link;
        this.price = price;
        this.weight = weight;
        this.image = image;
        this.cat = cat;
        
        this.frequency = frequency;
    }

    // Getter methods
    public String getName() {
        return name;
    }

    public String getLink() {
        return link;
    }

    public String getPrice() {
        return price;
    }
    
    public String getWeight() {
        return weight;
    }

    public String getImage() {
        return image;
    }
    
    public String getCat() {
        return cat;
    }

    public int getFrequency() {
        return frequency;
    }
}
