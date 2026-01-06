import React from "react";

import HomeCategories from "../components/HomeCategories";
import HomeSlider from "../components/HomeSlider";
import FeaturedProducts from "../components/FeaturedProducts";
import JustForYou from "../components/JustForYou";


const Home = () => {
  return (
   <div>
   <HomeSlider/>
   <HomeCategories/>
   <FeaturedProducts/>
   <JustForYou/>
   </div>
    
  );
};

export default Home;
