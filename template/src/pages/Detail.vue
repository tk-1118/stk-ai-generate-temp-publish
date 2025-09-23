<template>
  <div class="detail-page">
    <el-card class="page-card" shadow="never">
      <template #header>
        <div class="page-header">
          <h2>详情页面</h2>
          <p>查看 ID 为 {{ id }} 的详细信息</p>
        </div>
      </template>
      
      <div class="page-content">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="ID">{{ id }}</el-descriptions-item>
          <el-descriptions-item label="类型">产品详情</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ currentTime }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag type="success">正常</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="描述" :span="2">
            这是一个示例详情页面，展示如何在新的布局系统中展示详细信息。
          </el-descriptions-item>
        </el-descriptions>
        
        <div class="actions">
          <el-button type="primary" @click="handleEdit">
            <el-icon><Edit /></el-icon>
            编辑
          </el-button>
          <el-button @click="handleBack">
            <el-icon><Back /></el-icon>
            返回
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from 'element-plus';
import { Edit, Back } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const currentTime = computed(() => {
  return new Date().toLocaleString();
});

const handleEdit = () => {
  ElMessage.info('编辑功能开发中...');
};

const handleBack = () => {
  router.back();
};
</script>

<style scoped lang="scss">
.detail-page {
  height: 100%;
  padding: 0;
  
  .page-card {
    height: 100%;
    border: none;
    
    :deep(.el-card__body) {
      padding: 24px;
      height: calc(100% - 80px);
      display: flex;
      flex-direction: column;
    }
  }
}

.page-header {
  h2 {
    margin: 0 0 8px 0;
    color: #303133;
    font-size: 24px;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    color: #606266;
    font-size: 14px;
  }
}

.page-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}
</style>
