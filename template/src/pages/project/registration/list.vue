<template>
  <div class="project-registration-list">
    <!-- 搜索区域 -->
    <el-card class="search-card">
      <el-form
        ref="searchFormRef"
        :model="searchForm"
        label-width="80px"
        class="search-form"
      >
        <!-- 简单搜索 -->
        <el-row :gutter="20">
          <el-col :span="6"></el-col>
          <el-col :span="8">
            <el-input
              v-model="searchForm.projectName"
              placeholder="请输入项目名称或编号"
              clearable
            />
          </el-col>
          <el-col :span="8">
            <div class="search-buttons">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button @click="handleReset">重置</el-button>
              <el-button
                type="primary"
                link
                @click="advancedSearchVisible = !advancedSearchVisible"
              >
                {{ advancedSearchVisible ? '收起' : '高级搜索' }}
                <el-icon>
                  <ArrowUp v-if="advancedSearchVisible" />
                  <ArrowDown v-else />
                </el-icon>
              </el-button>
            </div>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" @click="handleCreateProject">
              新增项目登记
            </el-button>
          </el-col>
        </el-row>

        <!-- 高级搜索 -->
        <el-collapse-transition>
          <div v-show="advancedSearchVisible" class="advanced-search">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="项目编号">
                  <el-input
                    v-model="searchForm.projectCode"
                    placeholder="请输入项目编号"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目名称">
                  <el-input
                    v-model="searchForm.projectName"
                    placeholder="请输入项目名称"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建人">
                  <el-input
                    v-model="searchForm.creator"
                    placeholder="请输入创建人"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="年度">
                  <el-input
                    v-model="searchForm.annual"
                    placeholder="请输入年度"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="项目法人">
                  <el-input
                    v-model="searchForm.projectLegalPerson"
                    placeholder="请输入项目法人"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建状态">
                  <el-select
                    v-model="searchForm.status"
                    placeholder="请选择状态"
                    clearable
                    style="width: 100%"
                  >
                    <el-option
                      v-for="status in statusOptions"
                      :key="status"
                      :label="status"
                      :value="status"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-form>
    </el-card>


    <!-- 项目登记列表区域 -->
    <el-card class="list-card">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-skeleton animated>
          <template #template>
            <el-skeleton-item variant="p" style="width: 100%; height: 400px" />
          </template>
        </el-skeleton>
      </div>

      <!-- 空状态 -->
      <el-empty
        v-else-if="projectList.length === 0"
        description="暂无项目登记数据"
      />

      <!-- 错误状态 -->
      <el-alert
        v-else-if="error"
        :title="error"
        type="error"
        show-icon
        closable
        @close="error = null"
      />

      <!-- 列表数据 -->
      <div v-else>
        <el-table
          :data="projectList"
          stripe
          style="width: 100%"
          row-key="id"
        >
          <!-- <el-table-column type="index" label="序号" width="80" /> -->
          <el-table-column prop="projectCode" label="项目编号" min-width="120" />
          <el-table-column prop="projectName" label="项目名称" min-width="150" />
          <el-table-column prop="projectApprovalDocumentNumber" label="批准文号" min-width="120" />
          <el-table-column prop="annual" label="年度" width="80" />
          <el-table-column prop="projectLegalPerson" label="项目法人" min-width="120" />
          <el-table-column prop="creator" label="创建人" min-width="100" />
          <el-table-column prop="creationTime" label="创建时间" min-width="150" />
          <el-table-column prop="projectApprovalUnit" label="状态" width="100">
            <template #default="{ row }">
              <el-tag
                :type="getStatusTagType(row.projectApprovalUnit)"
              >
                {{ getStatusTagName(row.projectApprovalUnit) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button
                type="primary"
                link
                size="small"
                @click="handleView(row)"
              >
                查看
              </el-button>
              <el-button
                type="danger"
                link
                size="small"
                @click="handleDelete(row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="pagination.page"
            v-model:page-size="pagination.size"
            :page-sizes="[10, 20, 50, 100]"
            :total="pagination.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import {
  ArrowUp,
  ArrowDown
} from '@element-plus/icons-vue'
import { getProjectList, deleteProject } from '@/api/project/registration/list.ts'

// 类型定义
interface ProjectItem {
  id: string
  projectCode: string
  projectName: string
  projectApprovalDocumentNumber: string
  annual: string
  projectLegalPerson: string
  creator: string
  createTime: string
  status: string
}

interface Pagination {
  page: number
  size: number
  total: number
}

// 路由
const router = useRouter()

// 表单引用
const searchFormRef = ref<FormInstance>()

// 状态管理
const loading = ref(false)
const error = ref<string | null>(null)
const advancedSearchVisible = ref(false)

// 搜索表单
const searchForm = reactive({
  annual: "",
  creator: "",
  projectCode: "",
  projectLegalPerson: "",
  projectName: "",
  sortField: "",
  sortOrder: "ASC",
  status: ""
})

// 状态选项
const statusOptions = [
  {
    label: '待审批',
    value: 'PENDING'
  }, {
    label: '已批准',
    value: 'APPROVED'
  }, {
    label: '已拒绝',
    value: 'REJECTED'
  }
]

// 分页配置
const pagination = reactive<Pagination>({
  page: 1,
  size: 10,
  total: 0
})

// 项目列表数据
const projectList = ref<ProjectItem[]>([])

// 获取状态标签类型
const getStatusTagType = (projectApprovalUnit: string) => {
  switch (projectApprovalUnit) {
    case 'PENDING':
      return 'warning'
    case 'APPROVED':
      return 'success'
    case 'REJECTED':
      return 'danger'
    default:
      return 'info'
  }
}

const getStatusTagName = (projectApprovalUnit: string) => {
  switch (projectApprovalUnit) {
    case 'PENDING':
      return '待审批'
    case 'APPROVED':
      return '已批准'
    case 'REJECTED':
      return '已拒绝'
    default:
      return 'info'
  }
}

// 搜索功能
const handleSearch = () => {
  pagination.page = 1
  loadProjectList()
}

// 重置功能
const handleReset = () => {
  searchFormRef.value?.resetFields()
  advancedSearchVisible.value = false
  pagination.page = 1
  loadProjectList()
}

// 新增项目登记
const handleCreateProject = () => {
  // 跳转到项目登记页面
  router.push('/project/register/fill-project-info')
}

// 查看详情
const handleView = (row: ProjectItem) => {
  // 跳转到详情页面
  router.push(`/project/detail/${row.projectSN}`)
}


// 删除项目
const handleDelete = (row: ProjectItem) => {
  ElMessageBox.confirm(
    `确定要删除项目 "${row.projectName}" 吗？`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    // 执行删除操作
    await deleteProject({
      projectSNList: [ row.projectSN ]
    })
    loadProjectList()
  }).catch(() => {
    // 用户取消删除
    ElMessage.info('已取消删除')
  })
}

// 分页相关方法
const handleSizeChange = (val: number) => {
  pagination.size = val
  pagination.page = 1
  loadProjectList()
}

const handleCurrentChange = (val: number) => {
  pagination.page = val
  loadProjectList()
}

// 加载项目列表数据
const loadProjectList = async () => {
  try {
    loading.value = true
    error.value = null
    
    // 构造查询参数
    const params = {
      page: pagination.page,
      size: pagination.size,
      ...searchForm
    }
    
    // 调用API获取数据
    const res = await getProjectList(params)
    if (res.success) {
      projectList.value = res.data.records
      pagination.total = res.data.total
    } else {
      error.value = res.msg || '获取数据失败'
    }
  } catch (err) {
    error.value = '获取数据失败，请重试'
    console.error('获取项目列表失败:', err)
  } finally {
    loading.value = false
  }
}
loadProjectList()

// 监听搜索表单变化，自动搜索
watch(searchForm, () => {
  pagination.page = 1
  loadProjectList()
}, { deep: true })

// 组件挂载时加载数据
onMounted(() => {
  loadProjectList()
})
</script>

<style lang="scss" scoped>
.project-registration-list {
  padding: 20px;
  
  .search-card {
    margin-bottom: 20px;
    
    .search-form {
      .search-buttons {
        display: flex;
        align-items: center;
        gap: 10px;
        height: 100%;
      }
      
      .advanced-search {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid var(--el-border-color-light);
      }
    }
  }
  
  .action-bar {
    margin-bottom: 20px;
    text-align: right;
  }
  
  .list-card {
    .loading-container {
      padding: 40px 0;
    }
    
    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>