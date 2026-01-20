import React, { useEffect } from "react";
import { brandPageStyles } from "../assets/dummyStyles";
import { useNavigate, useParams } from "react-router-dom";
import watchesData from "../assets/CategoriesHomedata";
import { useCart } from "../CartContent";
import { ArrowLeft, Minus, Plus } from "lucide-react";

const BrandPage = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const brandWatches = watchesData[brandName?.toLowerCase()] || [];
  const { addItem, cart, increment, decrement } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const findInCart = (id) => cart.find((p) => p.id === id);

  if (!brandWatches.length) {
    return (
      <div className={brandPageStyles.container}>
        <div className={brandPageStyles.notFoundCard}>
          <h2 className={brandPageStyles.notFoundTitle}>No watches found</h2>
          <p className={brandPageStyles.notFoundText}>
            This brand has no watches listed in our collection yet.
          </p>
          <button
            onClick={() => navigate(-1)}
            className={brandPageStyles.goBackButton}
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={brandPageStyles.mainContainer}>
      <div className="max-w-7xl mx-auto relative">
        <div className={brandPageStyles.headerContainer}>
          <div className={brandPageStyles.backButtonContainer}>
            <button
              className={brandPageStyles.backButton}
              onClick={() => navigate(-1)}
            >
              <div className={brandPageStyles.backIcon}>
                <ArrowLeft size={20} />
              </div>
              <span className={brandPageStyles.backText}>Back</span>
            </button>
          </div>

          <div className={brandPageStyles.titleContainer}>
            <h1 className={brandPageStyles.title}>
              {brandName.replace("-", " ")} Collections
            </h1>
          </div>
        </div>

        {/* Watches grid */}
        <div className={brandPageStyles.grid}>
          {brandWatches.map((watch) => {
            const inCart = findInCart(watch.id);
            return (
              <div key={watch.id} className={brandPageStyles.card}>
                <div className={brandPageStyles.imageContainer}>
                  <img
                    src={watch.img}
                    alt={watch.name}
                    className={brandPageStyles.image}
                  />
                </div>

                {/* Watch details */}
                <div className={brandPageStyles.detailsContainer}>
                  <h2 className={brandPageStyles.watchName}>{watch.name}</h2>
                  <p className={brandPageStyles.watchDesc}>{watch.desc}</p>

                  <div className={brandPageStyles.priceAndControls}>
                    <p className={brandPageStyles.price}>{watch.price}</p>

                    {inCart ? (
                      <div className={brandPageStyles.quantityContainer}>
                        <button
                          onClick={() => decrement(watch.id)}
                          className={brandPageStyles.quantityButton}
                        >
                          <Minus size={16} />
                        </button>

                        <div className={brandPageStyles.quantityCount}>
                          {inCart.qty}
                        </div>

                        <button
                          onClick={() => increment(watch.id)}
                          className={brandPageStyles.quantityButton}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          addItem({
                            id: watch.id,
                            name: watch.name,
                            price: watch.price,
                            img: watch.img,
                            qty: 1,
                          })
                        }
                        className={brandPageStyles.addButton}
                      >
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
