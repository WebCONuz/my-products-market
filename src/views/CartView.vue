<script setup>
import { onMounted, ref } from 'vue';
import Paginate from "vuejs-paginate-next";
import { useProductStore } from "../stores/product";
const productStore = useProductStore();

const allData = ref(null);


// Add To Cart
function deleteCard(id){
    const arr = JSON.parse(localStorage.getItem('products')) || [];
    const data = arr.filter(item => item.id !== id);
    allData.value = data;
    localStorage.setItem('products', JSON.stringify(data))
}

// Mounted
onMounted(async () => {
  allData.value = JSON.parse(localStorage.getItem('products')) || [];
});
</script>

<template>
  <main id="products">
      <div v-if="allData?.length === 0" class="flex flex-col items-center justify-center w-full min-h-screen bg-pink-100">
        <span class="mb-2">Cart is empty!</span>
        <router-link to="/" class="text-lg hover:text-pink-500 duration-200">Go Home</router-link>
    </div>
    <div v-else class="container">
          <div class="flex justify-between items-center px-4">
            <router-link to="/" class="text-lg uppercase font-semibold">Home</router-link>
            <h1 class="text-center my-8 text-lg font-bold text-pink-500 uppercase">Cart Products</h1>
          </div>
        <div class="flex flex-wrap mt-8 mb-2">
          <div
            v-for="item in allData"
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
                  @click="deleteCard(item.id)"
                  class="py-1 px-2 text-sm rounded-md bg-pink-200 text-pink-600"
                >Delete to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </main>
</template>

<style scoped></style>
