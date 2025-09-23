<template>
  <div class="project-detail-page">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <el-skeleton animated>
        <template #template>
          <el-skeleton-item variant="p" style="width: 100%; height: 600px" />
        </template>
      </el-skeleton>
    </div>

    <!-- 错误状态 -->
    <el-alert
      v-else-if="error"
      :title="error"
      type="error"
      show-icon
      closable
      @close="error = null"
    />

    <!-- 页面内容 -->
    <div v-else class="detail-content">
      <!-- 页面标题 -->
      <div class="page-header">
        <h2>项目详情</h2>
        <div class="header-actions">
          <el-button @click="handleBack">
            <el-icon><Back /></el-icon>
            返回
          </el-button>
        </div>
      </div>

      <el-row :gutter="20">
        <!-- 左侧主要内容区域 -->
        <el-col :span="18">
          <!-- 项目基本信息 -->
          <el-card class="detail-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>项目基本信息</span>
              </div>
            </template>
            <el-descriptions :column="2" border>
              <el-descriptions-item label="项目编码">{{ projectDetail?.projectCode }}</el-descriptions-item>
              <el-descriptions-item label="项目名称">{{ projectDetail?.projectName }}</el-descriptions-item>
              <el-descriptions-item label="项目审批文号">{{ projectDetail?.projectApprovalDocumentNumber }}</el-descriptions-item>
              <el-descriptions-item label="项目审批单位">{{ projectDetail?.projectApprovalUnit }}</el-descriptions-item>
              <el-descriptions-item label="项目类型">{{ projectDetail?.projectType }}</el-descriptions-item>
              <el-descriptions-item label="项目类别">{{ projectDetail?.projectRelate }}</el-descriptions-item>
              <el-descriptions-item label="项目规模">{{ projectDetail?.projectScale }}</el-descriptions-item>
              <el-descriptions-item label="项目行业分类">{{ projectDetail?.projectIndustriesType }}</el-descriptions-item>
              <el-descriptions-item label="项目地点">{{ projectDetail?.projectAddress }}</el-descriptions-item>
              <el-descriptions-item label="项目法人">{{ projectDetail?.projectLegalPerson[0]?.projectLegalPersonName }}</el-descriptions-item>
              <el-descriptions-item label="联系人">{{ projectDetail?.projectLegalPerson[0]?.contactor }}</el-descriptions-item>
              <el-descriptions-item label="联系方式">{{ projectDetail?.projectLegalPerson[0]?.contactInformation }}</el-descriptions-item>
              <el-descriptions-item label="项目内容" :span="2">{{ projectDetail?.projectContent }}</el-descriptions-item>
            </el-descriptions>
          </el-card>

          <!-- 项目资金构成 -->
          <el-card class="detail-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>项目资金构成</span>
              </div>
            </template>
            <el-table :data="projectDetail?.fundList || []" style="width: 100%" border>
              <el-table-column prop="fundSource" label="资金来源" />
              <el-table-column prop="fundAmount" label="出资金额" />
              <el-table-column prop="fundRatio" label="出资比例" />
              <el-table-column label="操作" width="150">
                <template #default="scope">
                  <el-button size="small" @click="handleViewFund(scope.row)">查看</el-button>
                  <el-button size="small" @click="handleEditFund(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>

          <!-- 项目审批信息 -->
          <!-- <el-card class="detail-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>项目审批信息</span>
              </div>
            </template>
            <el-descriptions :column="2" border>
              <el-descriptions-item label="项目审批文号">{{ projectDetail?.approvalDocNumber }}</el-descriptions-item>
              <el-descriptions-item label="项目审批单位">{{ projectDetail?.approvalUnitName }}</el-descriptions-item>
              <el-descriptions-item label="项目建议书">
                <el-link v-if="projectDetail?.projectProposal" type="primary" :underline="false">
                  {{ projectDetail?.projectProposal }}
                </el-link>
              </el-descriptions-item>
              <el-descriptions-item label="可行性研究">
                <el-link v-if="projectDetail?.feasibilityStudy" type="primary" :underline="false">
                  {{ projectDetail?.feasibilityStudy }}
                </el-link>
              </el-descriptions-item>
              <el-descriptions-item label="初步设计">
                <el-link v-if="projectDetail?.preliminaryDesign" type="primary" :underline="false">
                  {{ projectDetail?.preliminaryDesign }}
                </el-link>
              </el-descriptions-item>
              <el-descriptions-item label="核准备案文件">
                <el-link v-if="projectDetail?.approvalDocument" type="primary" :underline="false">
                  {{ projectDetail?.approvalDocument }}
                </el-link>
              </el-descriptions-item>
              <el-descriptions-item label="其他文件" :span="2">
                <el-link v-if="projectDetail?.otherDocuments" type="primary" :underline="false">
                  {{ projectDetail?.otherDocuments }}
                </el-link>
              </el-descriptions-item>
            </el-descriptions>
          </el-card> -->

          <!-- 采购需求清单 -->
          <!-- <el-card class="detail-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>采购需求清单</span>
              </div>
            </template>
            <el-table :data="projectDetail?.procurementList || []" style="width: 100%" border>
              <el-table-column prop="itemName" label="采购项名称" />
              <el-table-column prop="specification" label="规格型号" />
              <el-table-column prop="quantity" label="数量" />
              <el-table-column prop="unit" label="单位" />
              <el-table-column prop="budgetAmount" label="预算金额" />
            </el-table>
          </el-card> -->
        </el-col>

        <!-- 右侧审批进度卡片 -->
        <el-col :span="6">
          <el-card class="approval-card" shadow="never">
            <template #header>
              <div class="card-header">
                <span>审批进度</span>
              </div>
            </template>
            <div class="approval-steps">
              <el-timeline size="large">
                <el-timeline-item
                  v-for="(activity, index) in approvalActivities"
                  :key="index"
                  :timestamp="activity.timestamp"
                  :type="activity.type"
                  :icon="activity.icon"
                  :hollow="activity.hollow"
                  placement="middle"
                  size="large"
                >
                  <el-card shadow="never">
                    <h5 class="activity-title">{{ activity.title }}</h5>
                    <p class="activity-content">{{ activity.content }}</p>
                    <p class="activity-operator" v-if="activity.operator">
                      操作人: {{ activity.operator }}
                    </p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 资金构成弹窗 -->
    <el-dialog
      v-model="fundDialogVisible"
      :title="fundDialogTitle"
      width="500px"
    >
      <el-form 
        ref="fundFormRef" 
        :model="fundForm" 
        :rules="fundFormRules" 
        label-width="100px"
      >
        <el-form-item label="资金来源" prop="fundSource">
          <el-input v-model="fundForm.fundSource" placeholder="请输入资金来源" />
        </el-form-item>
        
        <el-form-item label="出资金额" prop="fundAmount">
          <el-input v-model="fundForm.fundAmount" placeholder="请输入出资金额" />
        </el-form-item>
        
        <el-form-item label="出资比例" prop="fundRatio">
          <el-input v-model="fundForm.fundRatio" placeholder="请输入出资比例" />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="fundDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveFundInfo">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { Back, Edit, Clock, Check, Close } from '@element-plus/icons-vue'
import { getProjectDetail } from '@/api/project/registration/detail'
import type { 
  ProjectDetailResponse, 
  ProjectFundItem 
} from '@/api/project/registration/detail'

// 路由和参数
const route = useRoute()
const router = useRouter()
const projectSN = route.params.id as string

// 状态管理
const loading = ref(false)
const error = ref<string | null>(null)

// 项目详情数据
const projectDetail = ref<ProjectDetailResponse | null>(null)

// 弹窗相关
const fundDialogVisible = ref(false)
const fundDialogTitle = ref('')
const fundDialogMode = ref<'add' | 'edit' | 'view'>('view')
const currentFundItem = ref<ProjectFundItem | null>(null)

// 资金构成表单
const fundFormRef = ref<FormInstance>()
const fundForm = reactive({
  fundSource: '',
  fundAmount: '',
  fundRatio: ''
})

// 表单验证规则
const fundFormRules = reactive<FormRules>({
  fundSource: [{ required: true, message: '请输入资金来源', trigger: 'blur' }],
  fundAmount: [{ required: true, message: '请输入出资金额', trigger: 'blur' }],
  fundRatio: [{ required: true, message: '请输入出资比例', trigger: 'blur' }]
})

// 获取审批状态标签类型
const getApprovalStatusType = (status?: string) => {
  if (!status) return 'info'
  
  switch (status) {
    case '待审批':
      return 'info'
    case '审批中':
      return 'warning'
    case '已通过':
      return 'success'
    case '已驳回':
      return 'danger'
    default:
      return 'info'
  }
}

// 审批活动数据
const approvalActivities = computed(() => {
  const status = projectDetail.value?.approvalStatus?.status
  const baseActivities = [
    {
      title: '提交申请',
      content: '项目申请已提交',
      timestamp: projectDetail.value?.createTime || '',
      type: 'success',
      icon: h(Check),
      hollow: false
    },
    {
      title: '审批受理',
      content: '等待审批人员处理',
      timestamp: status && ['待审核', '审批中', '已通过', '已驳回'].includes(status) 
        ? projectDetail.value?.approvalStatus?.updateTime || '' 
        : '',
      type: ['待审核', '审批中', '已通过', '已驳回'].includes(status || '') ? 'success' : 'info',
      icon: ['待审核', '审批中', '已通过', '已驳回'].includes(status || '') ? h(Check) : h(Clock),
      hollow: !['待审核', '审批中', '已通过', '已驳回'].includes(status || '')
    },
    {
      title: '审批完成',
      content: status === '已通过' ? '项目审批已通过' : status === '已驳回' ? '项目审批被驳回' : '等待审批结果',
      timestamp: (status === '已通过' || status === '已驳回') 
        ? projectDetail.value?.approvalStatus?.updateTime || '' 
        : '',
      type: status === '已通过' ? 'success' : status === '已驳回' ? 'danger' : 'info',
      icon: status === '已通过' ? h(Check) : status === '已驳回' ? h(Close) : h(Clock),
      hollow: !['已通过', '已驳回'].includes(status || '')
    }
  ]
  
  return baseActivities
})

// 获取审批步骤激活状态
const getApprovalStepActive = () => {
  if (!projectDetail.value?.approvalStatus?.status) return 0
  
  switch (projectDetail.value.approvalStatus.status) {
    case '已提交':
      return 0
    case '待审核':
    case '审批中':
      return 1
    case '已通过':
    case '审核通过':
      return 2
    case '已驳回':
      // 如果被驳回，我们可能想要显示在待审核步骤
      return 1
    default:
      return 0
  }
}

// 加载项目详情
const loadProjectDetail = async () => {
  try {
    loading.value = true
    error.value = null
    
    const res = await getProjectDetail({
      projectSNList: [ projectSN ]
    })
    if (res.success) {
      projectDetail.value = res?.data?.projectList[0] || {}
      console.log(projectDetail.value);
      
    } else {
      error.value = res.msg || '获取项目详情失败'
    }
  } catch (err) {
    error.value = '获取项目详情失败，请重试'
    console.error('获取项目详情失败:', err)
  } finally {
    loading.value = false
  }
}
// 返回上一页
const handleBack = () => {
  router.back()
}

// 新增资金构成
const handleAddFund = () => {
  fundDialogMode.value = 'add'
  fundDialogTitle.value = '新增资金构成'
  Object.assign(fundForm, {
    fundSource: '',
    fundAmount: '',
    fundRatio: ''
  })
  fundDialogVisible.value = true
}

// 导入资金构成
const handleImportFund = () => {
  ElMessage.info('导入功能开发中...')
}

// 查看资金构成
const handleViewFund = (row: ProjectFundItem) => {
  fundDialogMode.value = 'view'
  fundDialogTitle.value = '查看资金构成'
  Object.assign(fundForm, row)
  fundDialogVisible.value = true
}

// 编辑资金构成
const handleEditFund = (row: ProjectFundItem) => {
  fundDialogMode.value = 'edit'
  fundDialogTitle.value = '编辑资金构成'
  currentFundItem.value = row
  Object.assign(fundForm, row)
  fundDialogVisible.value = true
}

// 保存资金构成信息
const saveFundInfo = async () => {
  if (!fundFormRef.value) return
  
  await fundFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        ElMessage.success('保存成功')
        fundDialogVisible.value = false
        // 重新加载项目详情
        await loadProjectDetail()
      } catch (error) {
        console.error('保存资金构成信息失败:', error)
        ElMessage.error('保存资金构成信息失败')
      }
    }
  })
}

// 组件挂载时加载数据
onMounted(() => {
  loadProjectDetail()
})
</script>

<style lang="scss" scoped>
.project-detail-page {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  
  .loading-container {
    padding: 40px 0;
  }
  
  .detail-content {
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      
      h2 {
        margin: 0;
        color: var(--el-text-color-primary);
        font-size: 24px;
        font-weight: 600;
      }
      
      .header-actions {
        display: flex;
        gap: 12px;
      }
    }
    
    .detail-card {
      margin-bottom: 20px;
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .card-actions {
          display: flex;
          gap: 12px;
        }
      }
    }
    
    .approval-card {
      position: sticky;
      top: 20px;
      
      .approval-status {
        text-align: center;
        margin-bottom: 20px;
        
        .el-tag {
          margin-bottom: 16px;
        }
        
        .status-info {
          .update-time {
            margin: 0 0 8px 0;
            color: var(--el-text-color-secondary);
            font-size: 14px;
          }
          
          .description {
            margin: 0;
            color: var(--el-text-color-regular);
            font-size: 14px;
            line-height: 1.5;
          }
        }
      }
      
      .approval-steps {
        :deep(.el-timeline) {
          .el-timeline-item {
            .el-timeline-item__wrapper {
              padding-left: 10px;
              
              .el-timeline-item__timestamp {
                font-size: 12px;
                color: var(--el-text-color-secondary);
                margin-bottom: 4px;
               
              }
            }
            
            .el-card {
              background-color: var(--el-fill-color-light);
              border: none;
              margin-left: 10px;
              
              .activity-title {
                margin: 0 0 6px 0;
                font-size: 15px;
                font-weight: 500;
                color: var(--el-text-color-primary);
              }
              
              .activity-content {
                margin: 0 0 6px 0;
                font-size: 13px;
                color: var(--el-text-color-regular);
              }
              
              .activity-operator {
                margin: 0;
                font-size: 12px;
                color: var(--el-text-color-secondary);
              }
            }
          }
        }
      }
    }
  }
}
</style>