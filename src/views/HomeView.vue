<script setup>
import { onMounted, ref } from 'vue';
import Paginate from "vuejs-paginate-next";
import { useProductStore } from "../stores/product";
const productStore = useProductStore();

const allData = ref(null);
let showData = ref([]);
const cardLength = ref(0);

// States for Pagination
const limit = 20;
const totalPages = ref(0);
const currentPage = ref(1);

// Pagination Function
let PaginationFunction = () => {
  showData.value = allData.value.filter((item, index) => {
    if(index >= (currentPage.value - 1) * limit && index < currentPage.value * limit){
      return item;
    }
  })
}

//Fiter
async function filterProduct(e){
  await productStore.getFilterProduct(e.target.value);
  allData.value = productStore.filteredProducts.data;
  PaginationFunction()
}

// Add To Cart
function addToCard(id){
  const arr = JSON.parse(localStorage.getItem('products')) || [];
  const founded = arr.find(item => item.id === id);
  if(!founded){
    const data = allData.value.find(item => item.id === id);
    arr.push(data);
    cardLength.value = arr.length;
    localStorage.setItem('products', JSON.stringify(arr));
    console.log(`${id} ID li element savatga qo'shildi.`);
  } else {
    const data = arr.filter(item => item.id !== id);
    localStorage.setItem('products', JSON.stringify(data))
    cardLength.value = data.length;
    console.log(`${id} ID li element savatdan olib tashlandi.`);
  }
}

// Mounted
onMounted(async () => {
  await productStore.getAllProducts();
  totalPages.value = Math.ceil(allData.value?.length / limit);
  allData.value = productStore.products.data;
  PaginationFunction();
  const arr = JSON.parse(localStorage.getItem('products')) || [];
  cardLength.value = arr.length;
});
</script>

<template>
  <main id="products">
    <!-- loading -->
    <div 
      v-if="productStore.products.loading || productStore.filteredProducts.loading" 
      class="flex items-center justify-center w-full min-h-screen bg-pink-100"
    >
      <p class="text-pink-600 text-xl">Loading...</p>
    </div>

    <!-- content -->
    <div v-else>
      <header class="sticky top-0 left-0 z-10 w-full py-4 bg-pink-100 shadow-md px-4">
          <div class="container flex items-center justify-between">
              <router-link to="/" class="text-lg uppercase font-semibold">Home</router-link>
              <div class="flex">
                  <select class="outline-none px-2 mr-2 rounded-md" @input="filterProduct">
                      <option value="smartphones">smartphones</option>
                      <option value="laptops">laptops</option>
                      <option value="fragrances">fragrances</option>
                      <option value="skincare">skincare</option>
                      <option value="home-decoration">home-decoration</option>
                      <option value="groceries">groceries</option>
                  </select>
                  <router-link to="/cart" class="relative block">
                      <i class='bx bxs-cart text-3xl text-gray-500' ></i>
                      <div 
                        v-if="cardLength" 
                        class="absolute bottom-0 -right-2 w-5 h-5 bg-white text-gray-500 text-xs rounded-full flex items-center justify-center"
                      >{{ cardLength }}</div>
                  </router-link>
              </div>
          </div>
      </header>

      <div  class="container">
        <h1 class="text-center my-8 text-3xl font-bold text-pink-500 uppercase">All Products</h1>
        <div class="flex flex-wrap mt-8 mb-2">
          <div
            v-for="item in showData"
            class="product-card shadow-xl rounded-xl overflow-hidden"
            :key="item.id + 'AAZD'"
          >
            <router-link :to="'/products/' + item.id" class="block w-full h-auto">
              <img :src="item.images[0]" alt="card-img" class="w-full h-[250px] object-cover bg-pink-50">
            </router-link>
            <div class="p-4">
              <h2 class="text-lg mb-2 text-pink-600 font-semibold h-[28px] overflow-hidden">{{ item.title }}</h2>
              <p class="mb-4 text-sm text-pink-400 h-[40px] overflow-hidden">{{ item.description }}</p>
              <p class="text-sm text-pink-400 h-[40px] overflow-hidden">
                <span class="font-semibold">Price:</span> {{ item.price }}<i class='bx bx-dollar'></i>
              </p>
              <div class="flex items-center">
                <router-link 
                  :to="'/products/' + item.id" 
                  class="py-1 px-2 text-sm rounded-md bg-green-200 text-green-600 mr-2"
                >Read More</router-link>
                <button 
                  @click="addToCard(item.id)"
                  class="py-1 px-2 text-sm rounded-md bg-pink-200 text-pink-600"
                >Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- pagination -->
        <Paginate
          v-if="totalPages > 1"
          :page-count="totalPages"
          :page-range="3"
          :margin-pages="2"
          :click-handler="PaginationFunction"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          v-model="currentPage"
        >
        </Paginate>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
