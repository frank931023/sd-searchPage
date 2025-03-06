<template>
  <div class="bg-white min-h-screen text-black px-6 sm:px-10">
    <!-- ✅ 第一層 (電腦版 Header，手機版改變排版) -->
    <section class="flex flex-col sm:flex-row items-center py-4 sm:py-8">
      <div class="flex justify-between items-center w-full sm:w-auto">
        <button class="sm:hidden">
          <img src="../../assets/img/grid.png" alt="" class="h-6 w-6" />
        </button>

        <!-- ✅ 手機版 Google 標誌 (居中) -->
        <router-link
          to="/"
          class="text-4xl font-bold tracking-wide text-center sm:text-left sm:text-3xl sm:mr-6"
        >
          Poopal
        </router-link>

        <button class="sm:hidden">
          <img src="../../assets/img/profile.png" alt="" class="h-6 w-6" />
        </button>
      </div>

      <!-- ✅ 搜尋框 (手機版置中，電腦版靠左) -->
      <div
        class="flex items-center w-full sm:flex-grow sm:max-w-2xl bg-gray-200 rounded-full px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-gray-400 my-4 sm:my-0"
      >
        <!-- 輸入框 -->
        <input
          type="text"
          placeholder="搜尋 Poopal 或輸入網址"
          class="flex-grow bg-transparent text-black outline-none text-base sm:text-lg"
        />

        <!-- ✅ 按鈕群組 (RWD: 讓語音 & Lens 只在 `sm` 以上顯示) -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          <button class="text-gray-500 hover:text-black hidden sm:flex">✖</button>
          <button class="text-gray-500 hover:text-black hidden sm:flex">
            <img src="../../assets/img/voice-search.png" alt="voice search" class="h-5 w-5" />
          </button>
          <button class="text-gray-500 hover:text-black hidden sm:flex">
            <img src="../../assets/img/camera.png" alt="Google Lens" class="h-5 w-5" />
          </button>
          <button class="text-gray-500 hover:text-black">
            <img src="../../assets/img/search.png" alt="search" class="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>

      <!-- ✅ 右側 Google 應用程式 & 個人帳戶 (手機版縮小間距) -->
      <div class="hidden md:flex items-center space-x-10 ml-auto">
        <button>
          <img src="../../assets/img/grid.png" alt="" class="h-6 w-6" />
        </button>
        <button>
          <img src="../../assets/img/profile.png" alt="" class="h-8 w-8 rounded-full" />
        </button>
      </div>
    </section>

    <!-- ✅ 第二層：categories 選單 + 排序選單 -->
    <div
      class="flex flex-col sm:flex-row items-center justify-between mt-2 sm:mt-0 text-sm text-gray-600"
    >
      <!-- ✅ categories (分類選單) -->
      <nav class="overflow-x-auto whitespace-nowrap w-full sm:w-auto">
        <div class="flex space-x-6">
          <p
            v-for="(category, index) in categories"
            :key="index"
            @click="selectCategory(index)"
            :class="{
              'border-b-2 border-black text-black pb-1': selectedCategory === index,
              'hover:text-black cursor-pointer': true,
            }"
          >
            {{ category }}
          </p>
        </div>
      </nav>

      <!-- ✅ 排序方式 (手機版換行，電腦版對齊右側) -->
      <div class="mt-2 sm:mt-0 flex items-center space-x-2 pb-1">
        <label for="filter" class="mr-2">排序方式：</label>
        <select
          id="filter"
          v-model="selectedFilter"
          class="border border-gray-300 rounded px-2 py-1 focus:ring focus:ring-gray-400"
        >
          <option v-for="(option, index) in filterOptions" :key="index" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="my-8">
      <div class="space-y-4">
        <InfoCard v-for="(item, index) in paginatedResults" :key="index" :data="item" />
      </div>
    </div>
  </div>
  <!-- 分頁按鈕 -->
  <div class="flex flex-wrap justify-center items-center gap-2 sm:space-x-2 my-6">
    <!-- 第一頁 -->
    <button
      @click="changePage(1)"
      :disabled="currentPage === 1"
      class="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 text-sm sm:text-base"
    >
      第一頁
    </button>

    <!-- 上一頁 -->
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 text-sm sm:text-base"
    >
      上一頁
    </button>

    <!-- 顯示當前頁數 -->
    <span class="px-4 py-2 bg-gray-200 rounded text-sm sm:text-base">
      第 {{ currentPage }} 頁 / 共 {{ totalPages }} 頁
    </span>

    <!-- 下一頁 -->
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 text-sm sm:text-base"
    >
      下一頁
    </button>

    <!-- 最後一頁 -->
    <button
      @click="changePage(totalPages)"
      :disabled="currentPage === totalPages"
      class="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 text-sm sm:text-base"
    >
      最後一頁
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import InfoCard from '@/components/layouts/InfoCard.vue'

// 分類選單項目
const categories = ref(['全部', '購物', '圖片', '影片', '新聞', '網頁', '書籍', '更多', '工具'])
const results = ref([])

// 讀取 JSON
onMounted(async () => {
  const res = await fetch('src/search_dataset.json') // public 資料夾內的檔案
  results.value = await res.json()
})

// 當前選中的分類索引
const selectedCategory = ref(0)

// 切換選中的分類
const selectCategory = (index) => {
  selectedCategory.value = index
  currentPage.value = 1 // 切換分類時，重置當前頁數
}

// watch(selectedFilter, () => {
//   currentPage.value = 1 // ✨ 選擇篩選時回到第一頁
// })

// 排序選項
const filterOptions = ref([
  { label: '最受歡迎', value: 'relevance' },
  { label: '最新上傳', value: 'latest' },
  { label: '最不受歡迎', value: 'popularity' },
  { label: '最舊文章', value: 'oldest' },
  { label: '首字母排列', value: 'alphabet' },
])

// 當前選中的篩選條件
const selectedFilter = ref('relevance')

const filteredResults = computed(() => {
  return [...results.value].sort((a, b) => {
    if (selectedFilter.value === 'relevance') {
      return b.popularity - a.popularity // 由高到低
    } else if (selectedFilter.value === 'latest') {
      return new Date(b.created_at) - new Date(a.created_at) // 最新的排前面
    } else if (selectedFilter.value === 'popularity') {
      return a.popularity - b.popularity // 由低到高
    } else if (selectedFilter.value === 'oldest') {
      return new Date(a.created_at) - new Date(b.created_at) // 最舊的排前面
    } else if (selectedFilter.value === 'alphabet') {
      return a.title.localeCompare(b.title, 'zh-TW') // 中文拼音排序
    }
    return 0
  })
})

const currentPage = ref(1) // 當前頁數
const itemsPerPage = 10 // 每頁顯示 10 筆資料

// 計算總頁數
const totalPages = computed(() => Math.ceil(filteredResults.value.length / itemsPerPage))

// 取得當前頁面要顯示的資料
const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredResults.value.slice(start, start + itemsPerPage)
})

// **🔹 切換頁數**
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* 移除 input 在 iOS 內建的樣式 */
input::-webkit-search-decoration,
input::-webkit-search-cancel-button {
  display: none;
}

/* 讓滑動區域的 scrollbar 不顯示 (適用於 Chrome, Safari) */
nav::-webkit-scrollbar {
  display: none;
}
</style>
