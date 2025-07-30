<script setup>
import { onMounted, ref, watch } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale)

const props = defineProps({
  history: Array
})
const canvasRef = ref(null)
let chart

function render() {
  if (!canvasRef.value) return
  if (chart) chart.destroy()
  const labels = props.history.map(h => new Date(h.date).toLocaleDateString())
  const data = props.history.map(h => h.price)
  chart = new Chart(canvasRef.value, {
    type: 'line',
    data: { labels, datasets: [{ label: 'Price', data }] },
    options: { responsive: true }
  })
}

onMounted(render)
watch(() => props.history, render, { deep: true })
</script>

<template>
  <canvas ref="canvasRef" class="w-full h-40"></canvas>
</template>
