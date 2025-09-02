<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button @click="$router.go(-1)" class="text-gray-600 hover:text-gray-900">
              <i class="fa fa-arrow-left text-lg"></i>
            </button>
            <h1 class="text-xl font-semibold text-gray-900">会员中心</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- 会员卡片 -->
      <div class="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i class="fa fa-crown text-2xl text-white"></i>
              </div>
              <div>
                <h2 class="text-2xl font-bold">{{ memberInfo.name }}</h2>
                <p class="text-white/90">{{ memberInfo.level }} 会员</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-white/90 text-sm">会员编号</p>
              <p class="text-lg font-semibold">{{ memberInfo.memberNumber }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center">
              <p class="text-2xl font-bold">{{ memberInfo.points }}</p>
              <p class="text-white/90 text-sm">积分余额</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold">{{ memberInfo.totalSpent }}</p>
              <p class="text-white/90 text-sm">累计消费</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold">{{ memberInfo.daysToExpire }}</p>
              <p class="text-white/90 text-sm">天后到期</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 会员等级进度 -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">会员等级进度</h3>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">当前等级：{{ memberInfo.level }}</span>
            <span class="text-sm text-gray-500">下一等级：{{ nextLevel.name }}</span>
          </div>
          
          <div class="relative">
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div 
                class="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500"
                :style="{ width: progressPercentage + '%' }"
              ></div>
            </div>
            <div class="flex justify-between mt-2 text-sm text-gray-600">
              <span>已消费 ¥{{ memberInfo.totalSpent }}</span>
              <span>还需 ¥{{ nextLevel.requiredSpent - memberInfo.totalSpent }} 升级</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 会员权益 -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">会员权益</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="benefit in memberBenefits" 
            :key="benefit.id"
            class="border border-gray-200 rounded-lg p-4 hover:border-yellow-300 transition-colors"
          >
            <div class="flex items-center space-x-3 mb-3">
              <div :class="[
                'w-10 h-10 rounded-lg flex items-center justify-center',
                benefit.available ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'
              ]">
                <i :class="benefit.icon"></i>
              </div>
              <div>
                <h4 :class="[
                  'font-medium',
                  benefit.available ? 'text-gray-900' : 'text-gray-400'
                ]">{{ benefit.title }}</h4>
                <p :class="[
                  'text-sm',
                  benefit.available ? 'text-gray-600' : 'text-gray-400'
                ]">{{ benefit.description }}</p>
              </div>
            </div>
            
            <div v-if="!benefit.available" class="text-xs text-gray-400">
              {{ benefit.requiredLevel }} 及以上可享受
            </div>
          </div>
        </div>
      </div>

      <!-- 积分记录 -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">积分记录</h3>
          <button 
            @click="showAllPoints = !showAllPoints"
            class="text-sm text-yellow-600 hover:text-yellow-700"
          >
            {{ showAllPoints ? '收起' : '查看全部' }}
          </button>
        </div>
        
        <div class="space-y-3">
          <div 
            v-for="(record, index) in displayedPointsRecords" 
            :key="record.id"
            class="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div class="flex items-center space-x-3">
              <div :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm',
                record.type === 'earn' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              ]">
                <i :class="record.type === 'earn' ? 'fa fa-plus' : 'fa fa-minus'"></i>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ record.description }}</p>
                <p class="text-sm text-gray-500">{{ formatDate(record.date) }}</p>
              </div>
            </div>
            <div :class="[
              'font-semibold',
              record.type === 'earn' ? 'text-green-600' : 'text-red-600'
            ]">
              {{ record.type === 'earn' ? '+' : '-' }}{{ record.points }} 积分
            </div>
          </div>
        </div>
        
        <div v-if="pointsRecords.length === 0" class="text-center py-8">
          <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <i class="fa fa-coins text-2xl text-gray-400"></i>
          </div>
          <p class="text-gray-500">暂无积分记录</p>
        </div>
      </div>

      <!-- 会员等级说明 -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">会员等级说明</h3>
        
        <div class="space-y-4">
          <div 
            v-for="level in memberLevels" 
            :key="level.id"
            :class="[
              'border rounded-lg p-4 transition-colors',
              level.name === memberInfo.level 
                ? 'border-yellow-300 bg-yellow-50' 
                : 'border-gray-200 hover:border-gray-300'
            ]"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-3">
                <div :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                  level.color
                ]">
                  {{ level.icon }}
                </div>
                <h4 class="font-semibold text-gray-900">{{ level.name }}</h4>
                <span v-if="level.name === memberInfo.level" class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  当前等级
                </span>
              </div>
              <span class="text-sm text-gray-600">消费满 ¥{{ level.requiredSpent }}</span>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div v-for="benefit in level.benefits" :key="benefit" class="text-gray-600">
                • {{ benefit }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MembershipPage',
  data() {
    return {
      showAllPoints: false,
      memberInfo: {
        name: '张三',
        level: '黄金会员',
        memberNumber: 'VIP202401001',
        points: 2580,
        totalSpent: 8500,
        daysToExpire: 365
      },
      memberLevels: [
        {
          id: 1,
          name: '普通会员',
          icon: '🥉',
          color: 'bg-gray-100 text-gray-600',
          requiredSpent: 0,
          benefits: ['基础积分', '生日优惠', '新品预告', '客服优先']
        },
        {
          id: 2,
          name: '银牌会员',
          icon: '🥈',
          color: 'bg-gray-200 text-gray-700',
          requiredSpent: 2000,
          benefits: ['1.2倍积分', '专属客服', '免费配送', '优先退换']
        },
        {
          id: 3,
          name: '黄金会员',
          icon: '🥇',
          color: 'bg-yellow-100 text-yellow-600',
          requiredSpent: 5000,
          benefits: ['1.5倍积分', '专属优惠', '生日礼品', '优先发货']
        },
        {
          id: 4,
          name: '钻石会员',
          icon: '💎',
          color: 'bg-blue-100 text-blue-600',
          requiredSpent: 15000,
          benefits: ['2倍积分', '专属活动', '定制服务', '免费维修']
        }
      ],
      memberBenefits: [
        {
          id: 1,
          title: '积分加成',
          description: '购物享受1.5倍积分',
          icon: 'fa fa-coins',
          available: true,
          requiredLevel: '黄金会员'
        },
        {
          id: 2,
          title: '专属客服',
          description: '7x24小时专属客服',
          icon: 'fa fa-headset',
          available: true,
          requiredLevel: '银牌会员'
        },
        {
          id: 3,
          title: '免费配送',
          description: '全场商品免费配送',
          icon: 'fa fa-shipping-fast',
          available: true,
          requiredLevel: '银牌会员'
        },
        {
          id: 4,
          title: '生日礼品',
          description: '生日当月专属礼品',
          icon: 'fa fa-gift',
          available: true,
          requiredLevel: '黄金会员'
        },
        {
          id: 5,
          title: '专属活动',
          description: '参与会员专属活动',
          icon: 'fa fa-star',
          available: false,
          requiredLevel: '钻石会员'
        },
        {
          id: 6,
          title: '定制服务',
          description: '享受个性化定制',
          icon: 'fa fa-magic',
          available: false,
          requiredLevel: '钻石会员'
        }
      ],
      pointsRecords: [
        {
          id: 1,
          type: 'earn',
          description: '购买商品获得积分',
          points: 150,
          date: '2024-01-15'
        },
        {
          id: 2,
          type: 'use',
          description: '积分兑换优惠券',
          points: 100,
          date: '2024-01-10'
        },
        {
          id: 3,
          type: 'earn',
          description: '签到获得积分',
          points: 10,
          date: '2024-01-09'
        },
        {
          id: 4,
          type: 'earn',
          description: '评价商品获得积分',
          points: 20,
          date: '2024-01-08'
        },
        {
          id: 5,
          type: 'earn',
          description: '分享商品获得积分',
          points: 5,
          date: '2024-01-07'
        }
      ]
    }
  },
  computed: {
    nextLevel() {
      const currentLevelIndex = this.memberLevels.findIndex(level => level.name === this.memberInfo.level)
      if (currentLevelIndex < this.memberLevels.length - 1) {
        return this.memberLevels[currentLevelIndex + 1]
      }
      return { name: '已达最高等级', requiredSpent: this.memberInfo.totalSpent }
    },
    progressPercentage() {
      const currentLevelIndex = this.memberLevels.findIndex(level => level.name === this.memberInfo.level)
      if (currentLevelIndex === this.memberLevels.length - 1) {
        return 100
      }
      
      const currentLevel = this.memberLevels[currentLevelIndex]
      const nextLevel = this.memberLevels[currentLevelIndex + 1]
      
      const progress = (this.memberInfo.totalSpent - currentLevel.requiredSpent) / 
                      (nextLevel.requiredSpent - currentLevel.requiredSpent)
      
      return Math.min(Math.max(progress * 100, 0), 100)
    },
    displayedPointsRecords() {
      return this.showAllPoints ? this.pointsRecords : this.pointsRecords.slice(0, 3)
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN')
    }
  }
}
</script>

<style scoped>
.bg-primary {
  background-color: #10b981;
}

.bg-primary-dark {
  background-color: #059669;
}

.text-primary {
  color: #10b981;
}

.border-primary {
  border-color: #10b981;
}

.ring-primary {
  --tw-ring-color: #10b981;
}
</style>