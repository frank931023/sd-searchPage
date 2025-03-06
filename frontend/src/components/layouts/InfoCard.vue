<template>
  <div class="border p-4 rounded-lg shadow-md bg-white w-full mx-auto">
    <!-- 網址 -->
    <p class="text-sm text-gray-600 break-words">{{ data.url }}</p>

    <!-- 標題 -->
    <a :href="data.url" class="text-lg text-blue-600 font-semibold hover:underline break-words">
      {{ data.title }}
    </a>

    <!-- 內文 -->
    <p class="text-gray-700 mt-2 break-words">{{ data.text }}</p>

    <!-- 其他資訊 -->
    <div class="mt-3 text-sm text-gray-500 flex justify-between break-words">
      <span>{{ data.created_at }}</span>
      <span>人氣: {{ data.popularity }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: Object,
})
</script>
