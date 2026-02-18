import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Async thunk which will display the products in filterd options
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchProductsByFilters",
  async ({
    collection,
    size,
    color,
    gender,
    material,
    minPrice,
    maxPrice,
    limit,
    sortBy,
    search,
    category,
    brand,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (material) query.append("material", material);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (limit) query.append("limit", limit);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (brand) query.append("brand", brand);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
  }
);

//Asynk thunk to fetch single product by id
export const fetchProductsDetails = createAsyncThunk(
  "products/fetchProductsDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    return response.data;
  }
);

//async thunk to fetch updated products
export const updateProducts = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productsData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productsData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

//async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProducts: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      collection: "",
      size: "",
      color: "",
      gender: "",
      material: "",
      minPrice: "",
      maxPrice: "",
      limit: "",
      sortBy: "",
      search: "",
      category: "",
      brand: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        collection: "",
        size: "",
        color: "",
        gender: "",
        material: "",
        minPrice: "",
        maxPrice: "",
        limit: "",
        sortBy: "",
        search: "",
        category: "",
        brand: "",
      };
    },
  },
  extraReducers: (builder) => {
    // handle fetching products with filter
    builder
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchProductsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProducts = action.payload;
      })
      .addCase(fetchProductsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.loading = false;
        const updateProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updateProduct._id
        );
        if (index !== -1) {
          state.products[index] = updateProduct;
        }
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
