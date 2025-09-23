<template>
  <div class="api-test-page">
    <el-card class="page-card" shadow="never">
      <template #header>
        <div class="page-header">
          <h2>API 测试</h2>
          <p>测试各种 API 响应情况和错误处理</p>
        </div>
      </template>
      
      <div class="page-content">
        <div class="test-section">
          <h4>
            <el-icon><Connection /></el-icon>
            基础 API 测试
          </h4>
          <div class="test-buttons">
            <el-button type="primary" @click="testSuccess" :loading="loading">
              <el-icon><Check /></el-icon>
              测试成功响应
            </el-button>
            <el-button type="danger" @click="testError" :loading="loading">
              <el-icon><Close /></el-icon>
              测试错误响应
            </el-button>
            <el-button type="warning" @click="testTimeout" :loading="loading">
              <el-icon><Clock /></el-icon>
              测试超时
            </el-button>
            <el-button type="info" @click="testPickData" :loading="loading">
              <el-icon><Download /></el-icon>
              测试 pickData
            </el-button>
          </div>
        </div>
        
        <el-divider />
        
        <div class="test-section">
          <h4>
            <el-icon><DataBoard /></el-icon>
            Mock 数据测试
          </h4>
          <div class="test-buttons">
            <el-button type="success" @click="testMockSuccess" :loading="loading">
              <el-icon><SuccessFilled /></el-icon>
              Mock 成功响应
            </el-button>
            <el-button type="danger" @click="testMockAuth" :loading="loading">
              <el-icon><Lock /></el-icon>
              Mock 权限错误
            </el-button>
            <el-button type="warning" @click="testMockServer" :loading="loading">
              <el-icon><Warning /></el-icon>
              Mock 服务器错误
            </el-button>
            <el-button type="info" @click="testMockBusiness" :loading="loading">
              <el-icon><InfoFilled /></el-icon>
              Mock 业务错误
            </el-button>
          </div>
        </div>
        
        <div v-if="result" class="result-section">
          <h4>
            <el-icon><Document /></el-icon>
            响应结果
          </h4>
          <el-card class="result-display" shadow="never">
            <pre>{{ JSON.stringify(result, null, 2) }}</pre>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { http } from '@/api/http';
import { pickData } from '@/api/types';
import { ElMessage } from 'element-plus';
import { 
  Connection, 
  Check, 
  Close, 
  Clock, 
  Download, 
  DataBoard, 
  SuccessFilled, 
  Lock, 
  Warning, 
  InfoFilled, 
  Document 
} from '@element-plus/icons-vue';

const loading = ref(false);
const result = ref<any>(null);

async function testSuccess() {
  loading.value = true;
  try {
    const res = await http.get<{ message: string }>('/foo/list');
    result.value = res;
    if (res.success) {
      ElMessage.success('请求成功！');
    }
  } catch (error) {
    console.error('测试成功响应失败:', error);
  } finally {
    loading.value = false;
  }
}

async function testError() {
  loading.value = true;
  try {
    const res = await http.get<any>('/api/nonexistent');
    result.value = res;
  } catch (error) {
    console.error('测试错误响应失败:', error);
  } finally {
    loading.value = false;
  }
}

async function testTimeout() {
  loading.value = true;
  try {
    const res = await http.get<any>('/api/timeout', {}, { timeout: 1000 });
    result.value = res;
  } catch (error) {
    console.error('测试超时失败:', error);
  } finally {
    loading.value = false;
  }
}

async function testPickData() {
  loading.value = true;
  try {
    const res = await http.get<{ list: any[] }>('/foo/list');
    const data = pickData(res); // 这里会抛错如果失败
    result.value = data;
    ElMessage.success('pickData 测试成功！');
  } catch (error: any) {
    result.value = { error: error.message };
    ElMessage.error(`pickData 测试失败: ${error.message}`);
  } finally {
    loading.value = false;
  }
}

// Mock 数据测试
async function testMockSuccess() {
  loading.value = true;
  try {
    const res = await http.get<{ list: any[] }>('/foo/list');
    result.value = res;
    if (res.success) {
      ElMessage.success('Mock 成功响应测试通过！');
    }
  } catch (error) {
    console.error('Mock 成功响应测试失败:', error);
  } finally {
    loading.value = false;
  }
}

async function testMockAuth() {
  loading.value = true;
  try {
    const res = await http.get<any>('/api/error/auth');
    result.value = res;
  } catch (error) {
    console.error('Mock 权限错误测试失败:', error);
  } finally {
    loading.value = false;
  }
}

async function testMockServer() {
  loading.value = true;
  try {
    const res = await http.get<any>('/api/error/server');
    result.value = res;
  } catch (error) {
    console.error('Mock 服务器错误测试失败:', error);
  } finally {
    loading.value = false;
  }
}

async function testMockBusiness() {
  loading.value = true;
  try {
    const res = await http.get<any>('/api/error/business');
    result.value = res;
  } catch (error) {
    console.error('Mock 业务错误测试失败:', error);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
.api-test-page {
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
  overflow-y: auto;
}

.test-section {
  h4 {
    margin: 0 0 16px 0;
    color: #303133;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.test-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.result-section {
  margin-top: auto;
  
  h4 {
    margin: 0 0 16px 0;
    color: #303133;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.result-display {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  max-height: 300px;
  overflow-y: auto;
  
  pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 12px;
    line-height: 1.4;
    color: #495057;
  }
}
</style>
