import React from "react";

const Categories = ({ categories, filterItems }) => {
// console.log(categories);
  return (
    <div className="container mx-auto text-center">
      {categories.map((category, index) => 
         
          <button
            type="button"
            className=" mx-3 mt-2 p-2 hover:bg-indigo-600 hover:text-white rounded"
            key={index}
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
      )}
    </div>
  );
};

export default Categories;
