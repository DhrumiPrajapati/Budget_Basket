import React, { useEffect, useState } from 'react';
import Product from './Product';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Items({selectedItem}) {
  // const products = []

  const [Products,setProducts] = useState([]);

  const [message,setMessage]= useState(undefined);

  const fetchData = async (selectedItem) => {
    try {
        const response = await fetch(`http://localhost:8080/FinalProject/pagerank?query=${selectedItem}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setProducts(data);// Assuming the response is an array of objects with a "word" field
    } catch (error) {
        console.error('Fetching word completion data failed:', error);
        return [];
    }
  };

  const fetchSpellCheckingData = async (prefix) => {
    try {
        const response = await fetch(`http://localhost:8080/FinalProject/spellcheck?keyString=${prefix}&option=5`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        return data.map(item => item); // Assuming the response is an array of objects with a "word" field
    } catch (error) {
        console.error('Fetching word completion data failed:', error);
        return [];
    }
  };

  useEffect(()=>{

    fetchSpellCheckingData(selectedItem).then((data) => {
      if(data[0] == selectedItem) {
        fetchData(selectedItem);
        console.log("No Spell mistake");
        setMessage(undefined);
      }
      else {
        console.log("Spell mistake");
        fetchData(data[0]);
        if(selectedItem != "") {
          setMessage("Showing results for: " + data[0]);
        }
      }
    });
    

    
  },[selectedItem]);


  const products = [
    {
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },{
      productName: "Salted Butter",
      productCategory: "Dairy & Eggs",
      productBrand: "Selection",
      productPrice: 5.89,
      unitDetails: "454 g",
      formattedPrice: "$1.30 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h45/h0b/10239121489950.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/butter-margarine/salted-butter/p/059749894784"
    },
    {
      productName: "Banana",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 0.25,
      unitDetails: "---",
      formattedPrice: "$1.30 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/ha0/h3a/11860660912158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/bananas-plantains/banana/p/4011"
    },
    {
      productName: "2% Milk",
      productCategory: "Dairy & Eggs",
      productBrand: "Lactantia",
      productPrice: 5.49,
      unitDetails: "2 L",
      formattedPrice: "$0.27 /100ml ml",
      productImageUrl: "https://product-images.metro.ca/images/h0f/hec/11354247069726.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/milk-cream-butter/2-whole-milk/2-milk/p/068200010120"
    },
    {
      productName: "Smooth Peanut Butter",
      productCategory: "Pantry",
      productBrand: "Kraft",
      productPrice: 6.99,
      unitDetails: "1 kg",
      formattedPrice: "$0.70 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h06/h01/10778620067870.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/pantry/cereals-spreads-syrups/nut-seed-butters/smooth-peanut-butter/p/068100084245"
    },
    {
      productName: "English Cucumber",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 1.28,
      unitDetails: "1 un",
      formattedPrice: "$1.28 /un. un.",
      productImageUrl: "https://product-images.metro.ca/images/h26/h87/10916746887198.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/vegetables/tomatoes-cucumber/english-cucumber/p/4593"
    },
    {
      productName: "Tomato and Basil Pasta Sauce",
      productCategory: "Pantry",
      productBrand: "Classico",
      productPrice: 3.49,
      unitDetails: "650 mL",
      formattedPrice: "$0.54 /100ml ml",
      productImageUrl: "https://product-images.metro.ca/images/hb7/h4c/9986985525278.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/pantry/canned-jarred/pasta-pasta-sauces/tomato-and-basil-pasta-sauce/p/057000330040"
    },
    {
      productName: "2-ply facial tissues",
      productCategory: "Household & Cleaning",
      productBrand: "Scotties",
      productPrice: 9.99,
      unitDetails: "6x126 sheets",
      formattedPrice: "$1.32 /100sheet sheet",
      productImageUrl: "https://product-images.metro.ca/images/hc6/h39/11655039451166.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/household-cleaning/paper/facial-tissues/2-ply-facial-tissues/p/061328801366"
    },
    {
      productName: "Red Cluster Tomatoes",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 4.24,
      unitDetails: "Approximately 5 tomatoes per cluster",
      formattedPrice: "$5.47 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/hab/hfb/9276941434910.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/vegetables/tomatoes-cucumber/red-cluster-tomatoes/p/4664"
    },
    {
      productName: "Lean Ground Beef",
      productCategory: "Meat & Poultry",
      productBrand: "---",
      productPrice: 23.12,
      unitDetails: "A tray contains on average 1200 g",
      formattedPrice: "$15.41 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/h8a/h85/12048169795614.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/meat-poultry/beef-veal/ground/lean-ground-beef/p/201710"
    },
    {
      productName: "Raspberries",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 3.98,
      unitDetails: "170 g",
      formattedPrice: "$2.34 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/hb7/hd5/10406085296158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/berries-cherries/raspberries/p/715756100019"
    },
    {
      productName: "Salted Roasted Pistachios",
      productCategory: "Snacks",
      productBrand: "Irresistibles",
      productPrice: 3.98,
      unitDetails: "200 g",
      formattedPrice: "$1.99 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/he2/h44/12931611492382.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/snacks/salty-snacks/nuts-seeds-jerky/salted-roasted-pistachios/p/059749963084"
    },
    {
      productName: "Classic Flavour Chips",
      productCategory: "Snacks",
      productBrand: "Lay's",
      productPrice: 6,
      unitDetails: "235 g",
      formattedPrice: "$1.28 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h68/ha2/13032774926366.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/snacks/salty-snacks/chips/classic-flavour-chips/p/060410047019"
    },
    {
      productName: "Honey Nut Oats Cereal",
      productCategory: "Pantry",
      productBrand: "General Mills",
      productPrice: 4.49,
      unitDetails: "430 g",
      formattedPrice: "$1.04 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h46/h1a/12879171715102.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/pantry/cereals-spreads-syrups/family-cereals/honey-nut-oats-cereal/p/065633132948"
    },
    {
      productName: "Frozen Straight Cut Fries",
      productCategory: "Frozen",
      productBrand: "McCain",
      productPrice: 4.99,
      unitDetails: "650 g",
      formattedPrice: "$0.77 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/ha7/h00/12743871856670.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/frozen/fruit-vegetables/french-fries-onion-rings/frozen-straight-cut-fries/p/055773000696"
    },
    {
      productName: "Frozen Original Waffles",
      productCategory: "Frozen",
      productBrand: "Eggo",
      productPrice: 5.49,
      unitDetails: "560 g",
      formattedPrice: "$0.98 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/heb/h3d/12816103866398.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/frozen/breakfast-foods/waffles-pancakes-french-toast/frozen-original-waffles/p/064100238220"
    },
    {
      productName: "Soft Drink",
      productCategory: "Beverages",
      productBrand: "Coca-Cola",
      productPrice: 5.49,
      unitDetails: "6x710 mL",
      formattedPrice: "$0.13 /100ml ml",
      productImageUrl: "https://product-images.metro.ca/images/h11/hfd/10495619268638.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/beverages/soft-drinks/cola/soft-drink/p/067000104022"
    },
    {
      productName: "Soft Drink",
      productCategory: "Beverages",
      productBrand: "Pepsi",
      productPrice: 5.49,
      unitDetails: "6x710 mL",
      formattedPrice: "$0.13 /100ml ml",
      productImageUrl: "https://product-images.metro.ca/images/h06/he7/12879091990558.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/beverages/soft-drinks/cola/soft-drink/p/069000009840"
    },
    {
      productName: "Frozen Three-Meat Pie",
      productCategory: "Frozen",
      productBrand: "Irresistibles",
      productPrice: 6.99,
      unitDetails: "635 g",
      formattedPrice: "$1.10 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h13/hb7/10433024884766.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/frozen/meat-poultry/meat-pie/frozen-three-meat-pie/p/059749883047"
    },
    {
      productName: "Halves and Pieces of Walnuts",
      productCategory: "Snacks",
      productBrand: "Irresistibles",
      productPrice: 12.99,
      unitDetails: "750 g",
      formattedPrice: "$1.73 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h28/h65/9254624657438.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/snacks/salty-snacks/nuts-seeds-jerky/halves-and-pieces-of-walnuts/p/059749963251"
    },
    {
      productName: "White Mushrooms",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 2.67,
      unitDetails: "227 g",
      formattedPrice: "$1.18 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/hef/h3d/11415513530398.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/vegetables/mushrooms/white-mushrooms/p/059749868709"
    },
    {
      productName: "2.9% Vanilla Flavoured Probiotic Yogurt",
      productCategory: "Dairy & Eggs",
      productBrand: "Activia",
      productPrice: 3.49,
      unitDetails: "650 g",
      formattedPrice: "$0.54 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/ha7/h1b/12612362633246.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/yogurt/probiotic-yogurts/2-9-vanilla-flavoured-probiotic-yogurt/p/056800098297"
    },
    {
      productName: "Garlic and Fine Herbs Fresh Cheese",
      productCategory: "Dairy & Eggs",
      productBrand: "Boursin",
      productPrice: 7.29,
      unitDetails: "150 g",
      formattedPrice: "$4.86 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/h2b/h4a/12436226703390.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/deli-cheese/soft-fresh/garlic-and-fine-herbs-fresh-cheese/p/079813000118"
    },
    {
      productName: "2% Key Lime Greek Yogurt",
      productCategory: "Dairy & Eggs",
      productBrand: "Oikos",
      productPrice: 4.49,
      unitDetails: "4x100 g",
      formattedPrice: "$1.12 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/hb1/h18/11570807570462.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/dairy-eggs/yogurt/multipacks/2-key-lime-greek-yogurt/p/056800666717"
    },
    {
      productName: "Hickory Smoked Classic Cut Bacon",
      productCategory: "Meat & Poultry",
      productBrand: "Schneiders",
      productPrice: 5.99,
      unitDetails: "375 g",
      formattedPrice: "$1.60 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/hca/hf2/12174964129822.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/meat-poultry/sausages-bacon/bacon/hickory-smoked-classic-cut-bacon/p/063100375898"
    },
    {
      productName: "Frozen Chicken Pie",
      productCategory: "Deli & Prepared Meals",
      productBrand: "Irresistibles",
      productPrice: 6.99,
      unitDetails: "600 g",
      formattedPrice: "$1.17 /100g g",
      productImageUrl: "https://product-images.metro.ca/images/ha5/hf5/9848552030238.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/deli-prepared-meals/ready-meals-sides/quiche-savoury-pies/frozen-chicken-pie/p/059749949231"
    },
    {
      productName: "Red Seedless Grapes",
      productCategory: "Fruits & Vegetables",
      productBrand: "Red",
      productPrice: 8.77,
      unitDetails: "A bag contains on average 1000 g",
      formattedPrice: "$8.77 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/h00/hcf/8872792752158.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/grapes/red-seedless-grapes/p/4023"
    },
    {
      productName: "Seedless Green Grapes",
      productCategory: "Fruits & Vegetables",
      productBrand: "---",
      productPrice: 8.77,
      unitDetails: "A bag contains on average 1000 g",
      formattedPrice: "$8.77 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/h54/h29/8874218455070.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/fruits-vegetables/fruits/grapes/seedless-green-grapes/p/4022"
    },
    {
      productName: "White Cakes with Caramel",
      productCategory: "Snacks",
      productBrand: "Vachon",
      productPrice: 7,
      unitDetails: "12 un - 336 g or $3.99 ea. ea.",
      formattedPrice: "",
      productImageUrl: "https://product-images.metro.ca/images/hab/h89/10893960052766.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/snacks/sweet-snacks-candy/cookies-cakes/white-cakes-with-caramel/p/060737053014"
    },
    {
      productName: "European Cut Chuck Roast",
      productCategory: "Meat & Poultry",
      productBrand: "---",
      productPrice: 41.31,
      unitDetails: "1 roast",
      formattedPrice: "$27.54 /kg kg",
      productImageUrl: "https://product-images.metro.ca/images/h19/hc0/8886494298142.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/meat-poultry/beef-veal/roasts-ribs-racks/european-cut-chuck-roast/p/201228"
    },
    {
      productName: "Orange Juice without Pulp",
      productCategory: "Beverages",
      productBrand: "Simply",
      productPrice: 4.99,
      unitDetails: "1.54 L",
      formattedPrice: "$0.32 /100ml ml",
      productImageUrl: "https://product-images.metro.ca/images/h0a/hd9/11541102788638.jpg",
      productDetailLink: "https://www.foodbasics.ca/aisles/beverages/juices-drinks/refrigerated-juices-drinks/orange-juice-without-pulp/p/059600060211"
    },
    // Continue adding more products as needed
  ];
  

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage =20;

  // Calculate the index range for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
    setCurrentPage(pageNumber);
    console.log("clicked");  
  };

  return (
    <div className="container mx-auto px-4 py-8">
    {message !== undefined && (
      message
    )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {currentProducts.map((product, index) => (
          <Product
            key={index}
            productName={product.name}
            productCategory={product.cat}
            productBrand={""}
            productPrice={product.price}
            unitDetails={product.weight}
            formattedPrice={""}
            productImageUrl={product.image}
            productDetailLink={product.link}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {/* Pagination buttons */}
        <button
          className="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        <div className="text-slate-500">{`Page ${currentPage} / ${Math.ceil(products.length / productsPerPage)}`}</div>
        <button
          className="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastProduct >= products.length}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}

export default Items;
