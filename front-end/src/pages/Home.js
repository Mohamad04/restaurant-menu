import React, { useState } from 'react'
import Menu from "../components/Menu";
import Categories from "../components/Categories";
import Button from '../components/General/Button';
import fakeItems from "../db";

const allCategories = [
  "all",
  ...new Set(fakeItems.map((item) => item.category)),
];
// console.log(allCategories);


const Home = () =>  {
  const [menuItems, setMenuItems] = useState(fakeItems);
  const [categories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(fakeItems);
      return;
    }
    const newItems = fakeItems.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <main className="mx-auto flex flex-col my-6">
        <div className="text-center">
            <h2 className="text-3xl inline-block mr-5 ">our menu</h2>
            <Button type="primaryPlus" />
        </div>
        <Categories categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
    </main>
  );
}



export default Home;