import React, { useEffect, useState } from "react";
import HeroLayout from "../component/layout/HeroLayout";
import GenderCollectionSection from "../component/product/GenderCollectionSection";
import NewArrivals from "../component/product/NewArrivals";
import ProductDetails from "../component/product/ProductDetails";
import ProductGrid from "../component/product/ProductGrid";
import FeaturedCollection from "../component/product/FeaturedCollection";
import FeaturesSection from "../component/product/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProductsByFilters } from "../../redux/slice/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProducts, setBestSellerProducts] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
    //fetch best seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <HeroLayout />
      <GenderCollectionSection />
      <NewArrivals />

      {/* {Best Seller} */}
      <h2 className="text-3xl font-bold text-center mb-4">Best Seller</h2>
      {bestSellerProducts ? (
        <ProductDetails productId={bestSellerProducts._id} />
      ) : (
        <p className="text-center"> Loading best seller product ... </p>
      )}

      <div className="container mx-auto pl-15 pr-15">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
