<template>
  <div>
    <div v-if="loading">
      <div class="">
        <div class="flex flex-wrap justify-center py-24 px-4 gap-6">
          <div v-for="i in 4" :key="i" class="">
            <loaderCard />
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="errorMsg" class="text-center py-4 text-xl">{{ errorMsg.error }}</div>
    <div v-else class="py-24 w-full mb-4 px-4">
      <h2 class="text-center font-semibold text-2xl pb-8">Products</h2>
      <div class="flex flex-wrap justify-center max-w-8xl mx-auto gap-8">
        <div v-for="(product, index) in products" :key="index">
          <productCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import productCard from "./components/productCard.vue";
import loaderCard from "./components/loaderCard.vue";
import { getAllProducts } from "./Services/productService";

onMounted(() => {
  fetchAllProducts();
});

const loading = ref(false);
const products = ref([]);
const errorMsg = ref(null);

const fetchAllProducts = async () => {
  loading.value = true;
  try {
    const data = await getAllProducts();
    products.value = data.products;
  } catch (error) {
    errorMsg.value = error;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
