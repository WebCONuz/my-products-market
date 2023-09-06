<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/product";
const productStore = useProductStore();
const route = useRoute();
const currentImg = ref(null);

onMounted(async () => {
  await productStore.getOneProduct(route.params.id);
  currentImg.value = productStore.oneProduct.data?.images[0];
});
</script>

<template>
  <main id="products">
    <div v-if="productStore.oneProduct.loading" class="flex items-center justify-center w-full min-h-screen bg-pink-100">
      <p class="text-pink-600 text-xl">Loading...</p>
    </div>
    <div v-else class="container py-8">
      <div class="flex items-center">
        <div class="images flex w-[60%]">
          <div v-if="productStore.oneProduct.data?.images?.length > 0" class="flex flex-col w-[20%]">
            <img 
              v-for="(item, i) in productStore.oneProduct.data?.images" 
              :src="item" 
              alt="image"
              :key="i + 'PNG'"
              class="w-full rounded-md border cursor-pointer"
              :class="i !== productStore.oneProduct.data.images?.length - 1 ? 'mb-4' : 'mb-0'"
              @click="currentImg = item"
            >
          </div>
          <div class="w-[80%] pl-4">
            <img :src="currentImg" alt="main" class="w-full h-full object-cover rounded-xl border">
          </div>
        </div>
        <div class="info w-[40%] pl-8">
          <h1 class="text-2xl font-bold text-gray-500 mb-4">{{ productStore.oneProduct.data?.title }}</h1>
          <p class="text-lg mb-4">
            <span class="font-bold text-gray-500">Brand:</span> {{ productStore.oneProduct.data?.brand }}
          </p>
          <p class="text-lg mb-4">
            <span class="font-bold text-gray-500">Price:</span>  {{ productStore.oneProduct.data?.price }}
          </p>
          <p class="text-lg mb-4">
            <span class="font-bold text-gray-500">Discount:</span> {{ productStore.oneProduct.data?.discountPercentage }}
          </p>
          <p class="text-lg mb-4">
            <span class="font-bold text-gray-500">Category:</span> {{ productStore.oneProduct.data?.category }}
          </p>
          <div class="flex items-center mb-4">
            <i class='bx bxs-star text-2xl text-yellow-500 mr-2' ></i>            
            <span>{{ productStore.oneProduct.data?.rating }}</span>
          </div>
          <p class="text-lg text-gray-800 mb-8">{{ productStore.oneProduct.data?.description }}</p>
          <router-link to="/" class="py-2 px-4 rounded-md bg-pink-200 text-pink-500 font-semibold text-sm uppercase hover:bg-pink-300 duration-200">All Products</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
