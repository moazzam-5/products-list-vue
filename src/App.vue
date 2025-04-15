<template>
  <div>
    <div v-if="loading">
      <div class="flex flex-wrap justify-center py-24 px-4 gap-6">
        <div v-for="i in 4" :key="i">
          <loaderCard />
        </div>
      </div>
    </div>
    <div v-else-if="errorMsg" class="text-center py-4 text-xl">
      {{ errorMsg.error }}
    </div>
    <div v-else class="py-24 w-full mb-4 px-4">
      <h2 class="text-center font-semibold text-2xl pb-8">Products</h2>
      <div class="flex flex-wrap justify-center max-w-8xl mx-auto gap-8">
        <div v-for="(product, index) in products" :key="index">
          <productCard :product="product" />
        </div>
      </div>
      <pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @prev="prev"
        @next="next"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import productCard from "./components/productCard.vue";
import loaderCard from "./components/loaderCard.vue";
import pagination from "./components/pagination.vue";
import { getAllProducts } from "./Services/productService";

onMounted(() => {
  fetchAllProducts();
});

const loading = ref(false);
const products = ref([]);
const errorMsg = ref(null);

const limit = ref(10);
const skip = ref(0);
const total = ref(0);

const currentPage = computed(() => Math.floor(skip.value / limit.value) + 1);
const totalPages = computed(() => Math.ceil(total.value / limit.value));

const fetchAllProducts = async () => {
  loading.value = true;
  try {
    const data = await getAllProducts(limit.value, skip.value);
    products.value = data.products;
    total.value = data.total;
  } catch (error) {
    errorMsg.value = error;
  } finally {
    loading.value = false;
  }
};
const next = () => {
  if (currentPage.value < totalPages.value) {
    skip.value += limit.value;
  }
};
const prev = () => {
  if (currentPage.value > 1) {
    skip.value -= limit.value;
  }
};

watch([limit, skip], fetchAllProducts);
</script>

<style scoped></style>
