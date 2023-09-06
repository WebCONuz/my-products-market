<script setup></script>

<template>
    <header class="sticky top-0 left-0 z-10 w-full py-4 bg-pink-100 shadow-md px-4">
        <div class="container flex items-center justify-between">
            <router-link to="/" class="text-lg uppercase font-semibold">Home</router-link>
            <div class="flex">
                <select class="outline-none px-2 mr-2 rounded-md">
                    <option value="smartphones">smartphones</option>
                    <option value="laptops">laptops</option>
                    <option value="fragrances">fragrances</option>
                    <option value="skincare">skincare</option>
                    <option value="home-decoration">home-decoration</option>
                    <option value="groceries">groceries</option>
                </select>
                <router-link to="/cart">
                    <i class='bx bxs-cart text-2xl text-gray-500' ></i>
                </router-link>
            </div>
        </div>
    </header>
</template>

<style scoped></style>