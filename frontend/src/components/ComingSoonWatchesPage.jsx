import React from "react";
import { comingSoonStyles } from "../assets/dummyStyles";
import CS1 from "../assets/CS1.png";
import CS2 from "../assets/CS2.png";
import CS3 from "../assets/CS3.png";
import CS4 from "../assets/CS4.png";
import CS5 from "../assets/CS5.png";

const watches = [
  { id: 1, name: "Norqain Independence", price: 619000, imgUrl: CS1 },
  { id: 2, name: "Zenith Chronomaster", price: 1069200, imgUrl: CS2 },
  { id: 3, name: "Jacob & Co. Epic X", price: 3100000, imgUrl: CS3 },
  { id: 4, name: "Bvlgari Octo", price: 2450000, imgUrl: CS4 },
  { id: 5, name: "Louis Erard Excellence", price: 3300000, imgUrl: CS5 },
];

// ✅ price formatter
const formatINR = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);

const ComingSoonWatchesPage = () => {
  return (
    <section className={comingSoonStyles.section}>
      <div className={comingSoonStyles.container}>
        <div className={comingSoonStyles.headerContainer}>
          <div className={comingSoonStyles.titleContainer}>
            <h2 className={comingSoonStyles.title}>New Arrivals</h2>
            <p className={comingSoonStyles.subtitle}>Coming soon</p>
          </div>

          <a href="/watches" className={comingSoonStyles.viewAllLink}>
            View All
          </a>
        </div>

        {/* Watches Row */}
        <div className={comingSoonStyles.watchesContainer}>
          <div className={comingSoonStyles.watchesRow}>
            {watches.map((w) => (
              <figure key={w.id} className={comingSoonStyles.watchItem}>
                <div className={comingSoonStyles.imageContainer}>
                  <img
                    src={w.imgUrl}
                    alt={w.name}
                    className={comingSoonStyles.image}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='240'></svg>";
                    }}
                  />
                </div>

                <figcaption className={comingSoonStyles.figcaption}>
                  <div className={comingSoonStyles.watchName}>{w.name}</div>
                  <div className={comingSoonStyles.price}>
                    {formatINR(w.price)}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonWatchesPage;
