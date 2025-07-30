<script setup>
import { ref } from 'vue'

const url = ref('')
const emit = defineEmits(['added'])

async function submit() {
  if (!url.value) return
  const res = await fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: url.value })
  })
  if (res.ok) {
    url.value = ''
    emit('added')
  } else {
    alert('Failed to add')
  }
}
</script>

<template>
  <div class="my-4 flex">
    <input v-model="url" placeholder="Product URL" class="border p-2 flex-1 mr-2" />
    <button @click="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
  </div>
</template>
