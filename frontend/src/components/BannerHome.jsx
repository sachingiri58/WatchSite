import React from "react";
import {bannerHomeStyles} from '../assets/dummyStyles';
import Navbar from './Navbar';
const BannerHome=()=>{
  return (
    <div>
      <div className={bannerHomeStyles.container}>
      <div className={bannerHomeStyles.navbarWrapper}>

      <Navbar/>
      </div>
      </div>
    </div>
  )
}
export default BannerHome