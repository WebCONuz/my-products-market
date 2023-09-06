import { defineStore } from "pinia";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: {
      data: null,
      loading: false,
      error: null,
    },
    oneProduct: {
      data: null,
      loading: false,
      error: null,
    },
    filteredProducts: {
      data: null,
      loading: false,
      error: null,
    }
  }),
  actions: {
    // GET ALL
    async getAllProducts() {
      this.products.loading = true;
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        this.products.data = data.products;
      } catch (error) {
        this.products.error = error;
      } finally {
        this.products.loading = false;
      }
    },

    // GET BY ID
    async getOneProduct(id) {
      this.oneProduct.loading = true;
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        this.oneProduct.data = data;
      } catch (error) {
        this.oneProduct.error = error;
      } finally {
        this.oneProduct.loading = false;
      }
    },

    // FILTER PRODUCT
    async getFilterProduct(product) {
      this.filteredProducts.loading = true;
      try {
        console.log(product);
        const res = await fetch(`https://dummyjson.com/products/category/${product}`);
        const data = await res.json();
        console.log(data.products);
        this.filteredProducts.data = data.products;
      } catch (error) {
        this.filteredProducts.error = error;
      } finally {
        this.filteredProducts.loading = false;
      }
    }
  },
});
