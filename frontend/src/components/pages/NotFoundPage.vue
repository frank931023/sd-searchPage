<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center"
  >
    <!-- 404 錯誤訊息 -->
    <h1 class="text-6xl font-bold text-red-500 animate-bounce">404</h1>
    <p class="text-2xl mt-4">你是不是走錯路了？還是你的 IQ 像恐龍一樣？</p>
    <p class="text-lg mt-2">快回去，不然這隻恐龍就要來咬你了！</p>

    <!-- 返回首頁按鈕 -->
    <router-link
      to="/"
      class="mt-6 px-6 py-3 bg-red-600 hover:bg-red-800 text-white font-bold rounded"
    >
      滾回首頁
    </router-link>

    <!-- 恐龍遊戲 -->
    <div class="mt-8">
      <canvas ref="gameCanvas" class="border-2 border-white"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// 獲取 Canvas DOM
const gameCanvas = ref(null)

// 遊戲初始化
onMounted(() => {
  if (!gameCanvas.value) return

  const canvas = gameCanvas.value
  const ctx = canvas.getContext('2d')

  // 設定畫布大小
  canvas.width = 600
  canvas.height = 200

  // 恐龍遊戲變數
  let dino = { x: 50, y: 150, width: 40, height: 40, dy: 0, jumping: false }
  let obstacles = []
  let gravity = 0.6
  let gameSpeed = 4
  let gameOver = false

  // 監聽鍵盤按鍵 (跳躍)
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !dino.jumping) {
      dino.dy = -10
      dino.jumping = true
    }
  })

  // 產生障礙物
  const spawnObstacle = () => {
    if (Math.random() < 0.02) {
      obstacles.push({ x: canvas.width, y: 160, width: 20, height: 40 })
    }
  }

  // 遊戲更新
  const updateGame = () => {
    if (gameOver) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 更新恐龍
    dino.y += dino.dy
    dino.dy += gravity

    if (dino.y > 150) {
      dino.y = 150
      dino.jumping = false
    }

    // 更新障礙物
    spawnObstacle()
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].x -= gameSpeed

      // 碰撞檢測
      if (
        dino.x < obstacles[i].x + obstacles[i].width &&
        dino.x + dino.width > obstacles[i].x &&
        dino.y < obstacles[i].y + obstacles[i].height &&
        dino.y + dino.height > obstacles[i].y
      ) {
        gameOver = true
        alert('遊戲結束！你真的很廢😆')
        location.reload()
      }
    }

    // 移除離開畫面的障礙物
    obstacles = obstacles.filter((obs) => obs.x > -obs.width)

    // 畫恐龍
    ctx.fillStyle = 'white'
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height)

    // 畫障礙物
    ctx.fillStyle = 'red'
    for (let obs of obstacles) {
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height)
    }

    requestAnimationFrame(updateGame)
  }

  // 開始遊戲
  updateGame()
})
</script>

<style scoped>
/* 讓 404 標題閃爍 */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce {
  animation: bounce 0.5s infinite;
}
</style>
