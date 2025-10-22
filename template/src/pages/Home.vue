<template>
  <div class="home-page">
    <el-card class="page-card" shadow="never">
      <template #header>
        <div class="page-header">
          <h2>首页</h2>
          <p>欢迎来到 示例产品管理系统</p>
        </div>
      </template>
      
      <div class="page-content">
        <el-button type="primary" @click="load" :loading="loading">
          <el-icon><Refresh /></el-icon>
          请求 Mock 列表
        </el-button>
        
        <div v-if="list.length" class="list-container">
          <h4>数据列表：</h4>
          <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="date" label="日期" width="180" />
          </el-table>
        </div>
        
        <el-empty v-else-if="!loading" description="暂无数据，点击上方按钮加载" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { http } from "@/api/http";
import { ElMessage } from 'element-plus';
import { Refresh } from '@element-plus/icons-vue';

const list = ref<{id:number;title:string;date:string}[]>([]);
const loading = ref(false);

async function load(){
  loading.value = true;
  try {
    const res = await http.get<{list: {id:number;title:string;date:string}[]}>("/foo/list");
    if (!res.success) {
      ElMessage.error(res.msg || '请求失败');
      return;
    }
    list.value = res.data.list;
    ElMessage.success(`成功加载 ${res.data.list.length} 条数据`);
  } catch (error) {
    ElMessage.error('请求失败');
    console.error('加载数据失败:', error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
.home-page {
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
  gap: 20px;
}

.list-container {
  flex: 1;
  
  h4 {
    margin: 0 0 16px 0;
    color: #303133;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
