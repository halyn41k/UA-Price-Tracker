<script setup>
import { onMounted, ref } from 'vue'
import PriceChart from './PriceChart.vue'

const products = ref([])

async function load() {
  const res = await fetch('http://localhost:3000/api/products')
  products.value = await res.json()
}

async function remove(id) {
  await fetch(`http://localhost:3000/api/products/${id}`, { method: 'DELETE' })
  load()
}

onMounted(load)

defineExpose({ load })
</script>

<template>
  <div>
    <div v-for="p in products" :key="p.id" class="border p-4 mb-4">
      <div class="flex justify-between items-center mb-2">
        <div>
          <h2 class="font-bold">{{ p.name }}</h2>
          <a :href="p.url" class="text-sm text-blue-500" target="_blank">Open</a>
        </div>
        <button @click="remove(p.id)" class="text-red-500">Delete</button>
      </div>
      <PriceChart :history="p.history" />
    </div>
  </div>
</template>
