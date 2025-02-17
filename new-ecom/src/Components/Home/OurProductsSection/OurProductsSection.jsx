import { useState } from "react";
import { Link } from "react-router-dom";
import { ourProductsCustomizations } from "../../../Data/staticData";
import SectionTitle from "../../Shared/MiniComponents/SectionTitle";
import ExploreProducts from "../ProductPoster/ExploreProducts";
import s from "./OurProductsSection.module.scss";

const OurProductsSection = () => {
  const [productLimit, setProductLimit] = useState(8);

  const handleLoadMore = () => {
    setProductLimit((prevLimit) => prevLimit + 4); // Dynamically load 4 more products
  };

  return (
    <section className={s.ourProductsSection}>
      <div className={s.wrapper}>
        <SectionTitle
          eventName="Our Products"
          sectionName="Explore Our Products"
        />
      </div>

      <ExploreProducts
        numOfProducts={productLimit}
        customization={ourProductsCustomizations}
      />

      <div className={s.buttonContainer}>
        {productLimit < ourProductsCustomizations.length ? (
          <button
            onClick={handleLoadMore}
            className={s.viewProductsBtn}
            aria-label="Load more products"
          >
            Load More
          </button>
        ) : (
          <Link
            to="/products"
            className={`${s.viewProductsBtn} ${s.exploreAllBtn}`}
            aria-label="Explore all products"
          >
            Explore All
          </Link>
        )}
      </div>
    </section>
  );
};

export default OurProductsSection;
