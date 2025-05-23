<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden max-w-sm w-full5">
    <div class="relative">
      <img
        :src="product?.thumbnail"
        alt="Product image"
        class="w-full h-64 object-cover"
      />
      <span
        v-if="isSaleAmount > 0"
        class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
        >SALE</span
      >
      <button
        class="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
      >
        <svg
          class="w-4 h- text-center text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      </button>
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-1">
            {{ product?.title }}
          </h2>
          <p class="text-sm text-gray-600">{{ product?.category }}</p>
        </div>
      </div>
      <div class="" :class="[isSaleAmount > 0 ? 'py-2' : 'py-4']">
        <p class="text-lg font-bold text-green-600">
          {{ getDiscountAmount(product?.price, product?.discountPercentage) }}
        </p>
        <p v-if="isSaleAmount > 0" class="text-sm text-gray-500 line-through">
          ${{ product?.price }}
        </p>
      </div>
      <div class="flex items-center mb-2">
        <div class="flex text-yellow-400">
          <i v-for="s in fullStar" :key="s" class="fas fa-star"></i>
          <i v-if="halfStar" class="fas fa-star-half-alt"></i>
          <i v-for="s in emptyStar" class="far fa-star"></i>
        </div>
        <span class="text-gray-600 text-sm ml-2"
          >({{ product?.rating }}/5)</span
        >
      </div>
      <p class="text-gray-600 text-sm mb-4">
        {{ product?.description }}
      </p>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <i class="fas fa-truck text-blue-500 mr-2"></i>
          <span class="text-sm text-gray-600">{{
            product?.shippingInformation
          }}</span>
        </div>
        <div class="flex items-center">
          <i class="fas fa-clock text-blue-500 mr-2"></i>
          <span class="text-sm text-gray-600"
            >In Stock:{{ product?.stock }}</span
          >
        </div>
      </div>
      <div class="flex space-x-2">
        <button
          class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200"
        >
          Add to Cart
        </button>
        <button
          class="bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200"
        >
          Quick View
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, toRefs } from "vue";
import { getDiscountAmount } from "../Utils/discountUtil";

const props = defineProps({
  product: {
    type: Object,
  },
});
const { product } = toRefs(props);

const fullStar = computed(() => Math.floor(product.value.rating));
const halfStar = computed(() => product.value.rating % 1 >= 0.5);
const emptyStar = computed(() => 5 - fullStar.value - (halfStar.value ? 1 : 0));
const isSaleAmount = computed(() =>
  Math.floor(product.value.discountPercentage)
);
</script>
