<template>
  <!--header part-->
  <header class="flex items-center justify-between p-4">
    <div class="flex items-center space-x-4">
      <div class="text-gray-700 hover:underline cursor-pointer">關於 Poopal</div>
      <div class="text-gray-700 hover:underline cursor-pointer">Poopal 商店</div>
    </div>

    <!-- computer version -->
    <div class="hidden sm:flex items-center space-x-10">
      <p class="text-gray-700 hover:underline cursor-pointer">Gmail</p>
      <p class="text-gray-700 hover:underline cursor-pointer">圖片</p>
      <button @click="toggleAppsMenu">
        <img src="../../assets/img/grid.png" alt="" class="w-6 h-6 cursor-pointer" />
      </button>
      <button>
        <img
          src="../../assets/img/profile.png"
          alt=""
          class="w-8 h-8 rounded-full cursor-pointer"
        />
      </button>
    </div>

    <!-- hamburger menu for small size -->
    <button
      @click="toggleMenu"
      class="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 ml-auto"
    >
      <img src="../../assets/img/hamburger.png" alt="menu" class="w-8 h-8 cursor-pointer" />
    </button>

    <!-- span the menu -->
    <div
      v-if="menuOpen"
      class="absolute top-14 right-4 w-40 bg-white shadow-md rounded-lg p-2 sm:hidden"
    >
      <p class="text-gray-700 hover:bg-gray-100 cursor-pointer p-2 rounded">Gmail</p>
      <p class="text-gray-700 hover:bg-gray-100 cursor-pointer p-2 rounded">圖片</p>
      <p class="text-gray-700 hover:bg-gray-100 cursor-pointer p-2 rounded">應用程式</p>
      <p class="text-gray-700 hover:bg-gray-100 cursor-pointer p-2 rounded">個人帳戶</p>
    </div>
  </header>

  <!--main part-->
  <main class="flex flex-col items-center flex-grow justify-center mt-20">
    <!-- Poopal sign -->
    <h1 class="text-4xl sm:text-6xl font-bold text-gray-800">Poopal</h1>
    <!-- search box -->
    <div class="mt-6 w-full max-w-lg sm:max-w-md xs:max-w-sm">
      <div
        class="flex items-center border border-gray-300 rounded-full px-3 sm:px-4 py-2 shadow-sm hover:shadow-md"
      >
        <input
          v-model="searchQuery"
          @keydown="handleSearch"
          type="text"
          placeholder="搜尋 Poopal 或輸入網址"
          class="flex-grow outline-none sm:text-lg text-base w-0"
        />

        <router-link to="/result">
          <img
            src="../../assets/img/search.png"
            alt="搜尋"
            class="w-4 sm:w-5 h-4 sm:h-5 cursor-pointer"
        /></router-link>
      </div>
    </div>

    <!-- search btns -->
    <div class="mt-6 flex space-x-4">
      <router-link to="/result">
        <button class="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Poopal 搜尋</button>
      </router-link>
      <a href="https://ssp.moe.gov.tw/cases/1357" target="_blank"
        ><button class="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">想要便便了</button></a
      >
    </div>

    <!-- shortcuts -->
    <div
      class="mt-12 grid grid-cols-3 sm:grid-cols-4 md-grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-6"
    >
      <div v-for="(link, index) in links" :key="index" class="flex flex-col items-center space-y-1">
        <div
          class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 hover-bg-gray-600"
        >
          <img :src="link.icon" :alt="link.name" class="w-10 h-10" />
        </div>
        <p class="text-gray-900 text-sm">{{ link.name }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const links = ref([
  { name: 'YouTube', icon: 'src/assets/img/shortcuts/youtube.png' },
  { name: 'Yahoo', icon: 'src/assets/img/shortcuts/yahoo.png' },
  { name: 'ChatGPT', icon: 'src/assets/img/shortcuts/chatgpt.png' },
  { name: 'GitHub', icon: 'src/assets/img/shortcuts/github-logo.png' },
  { name: 'Gmail', icon: 'src/assets/img/shortcuts/google.png' },
  { name: 'Discord', icon: 'src/assets/img/shortcuts/discord.png' },
  { name: 'Tree', icon: 'src/assets/img/shortcuts/tree.png' },
  { name: 'Hugging Face', icon: 'src/assets/img/shortcuts/hugging.png' },
  { name: 'Docker', icon: 'src/assets/img/shortcuts/docker.png' },
])

// control  menu span status
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push('/result')
  }
}
</script>

<style scoped>
div.overflow-y-auto {
  max-height: 300px;
  overflow-y: auto;
}
</style>
