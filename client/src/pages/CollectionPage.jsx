import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "../component/product/ProductGrid";
import Sortoptions from "./Sortoptions";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../../redux/slice/productSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // Close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add Event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    // remove event listner
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     const fetchedProducts = [
  //       {
  //         _id: 5,
  //         name: "Product one",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=8" }],
  //       },
  //       {
  //         _id: 6,
  //         name: "Product two",
  //         price: 120,
  //         images: [{ url: "https://picsum.photos/500/500?random=9" }],
  //       },
  //       {
  //         _id: 7,
  //         name: "Product three",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=40" }],
  //       },
  //       {
  //         _id: 8,
  //         name: "Product four",
  //         price: 150,
  //         images: [{ url: "https://picsum.photos/500/500?random=51" }],
  //       },
  //       {
  //         _id: 9,
  //         name: "Product one",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=80" }],
  //       },
  //       {
  //         _id: 10,
  //         name: "Product two",
  //         price: 120,
  //         images: [{ url: "https://picsum.photos/500/500?random=90" }],
  //       },
  //       {
  //         _id: 11,
  //         name: "Product three",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=42" }],
  //       },
  //       {
  //         _id: 12,
  //         name: "Product four",
  //         price: 150,
  //         images: [{ url: "https://picsum.photos/500/500?random=81" }],
  //       },
  //     ];
  //     setProducts(fetchedProducts);
  //   }, 1000);
  // }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={` ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 
             lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>

        {/* Sort Options */}
        <Sortoptions />

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
