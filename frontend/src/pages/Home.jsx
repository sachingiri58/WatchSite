import React from "react";
import BannerHome from "../components/BannerHome";
import CategoriesHome from "../components/CategoriesHome";
import ComingSoonWatchesPage from "../components/ComingSoonWatchesPage";
import FashionPage from "../components/FashionPage";
import TestiomonialsPage from "../components/TestimonialsPage";
const Home=()=>{
  return (
    <div>
      <BannerHome/>
<CategoriesHome/>
<ComingSoonWatchesPage/>
<FashionPage/>
<TestiomonialsPage/>
    </div>
  )
}
export default Home