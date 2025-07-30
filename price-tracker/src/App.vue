<script setup>
import ProductForm from './components/ProductForm.vue'
import ProductList from './components/ProductList.vue'
import { ref } from 'vue'

const listRef = ref(null)
function added() {
  listRef.value?.load()
}
</script>

<template>
  <main class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Price Tracker</h1>
    <ProductForm @added="added" />
    <ProductList ref="listRef" />
  </main>
</template>
