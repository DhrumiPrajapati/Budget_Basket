import React from "react";

const Product = ({
  productName,
  productCategory,
  productBrand,
  productPrice,
  unitDetails,
  formattedPrice,
  productImageUrl,
  productDetailLink,
}) => {
  
  return (
    <>
      <article className="rounded-xl bg-white p-3 shadow-xl hover:shadow-2xl hover:transform hover:scale-105 duration-300">
        <a href={productDetailLink} target="_blank" rel="noopener noreferrer">
          <div className="relative flex items-end overflow-hidden rounded-xl">
            <img
              src={productImageUrl}
              alt={productName}
              className="w-full h-full object-cover p-1 rounded-xl"
              // Adjust the height here to make the image larger
            />
            <div className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-white px-px shadow-md">
              <a
                href="https://www.foodbasics.ca/"
                className="block rounded-full overflow-hidden"
                style={{ width: "24px", height: "24px" }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Food_Basics_Logo.png/250px-Food_Basics_Logo.png"
                  alt="Rating"
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
          </div>

          <div className="mt-1 p-2">
            <h2 className="text-slate-700">{productName}</h2>
            <p className="mt-1 text-sm text-slate-400">{productCategory}</p>

            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-lg font-bold text-blue-500">
                  ${productPrice}
                </p>
                <p className="mt-1 text-sm text-slate-400">{formattedPrice}</p>
              </div>

              <div className="flex items-center space-x-1.5">
                <a
                  href={productDetailLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-4 w-4 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </a>
      </article>
    </>
  );
};

Product.defaultProps = {
  productName: "Product Name",
  productCategory: "Category",
  productBrand: "Brand",
  productPrice: 0.0,
  unitDetails: "",
  formattedPrice: "$0.00",
  productImageUrl: "https://via.placeholder.com/300",
  productDetailLink: "#",
};

export default Product;
