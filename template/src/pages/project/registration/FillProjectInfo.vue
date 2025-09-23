<template>
  <div class="fill-project-info">
    <el-card class="project-card">
      <template #header>
        <div class="card-header">
          <span>填写项目信息</span>
        </div>
      </template>
      
      <!-- 项目基本信息 -->
      <el-form 
        ref="basicFormRef" 
        :model="basicForm" 
        :rules="basicFormRules" 
        label-width="120px" 
        class="project-form"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目编号" prop="projectCode">
              <el-input v-model="basicForm.projectCode" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="projectName">
              <el-input 
                v-model="basicForm.projectName" 
                placeholder="请输入项目名称，最多100个字符"
                maxlength="100"
                show-word-limit
              />
            </el-form-item>
          </el-col>
         
        </el-row>
        
        <el-row :gutter="20">
           <el-col :span="12">
            <el-form-item label="年度" prop="annual">
              <el-select v-model="basicForm.annual" placeholder="请选择年度">
                <el-option
                  v-for="item in yearOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目行业分类" prop="projectIndustriesType">
              <el-select v-model="basicForm.projectIndustriesType" placeholder="请选择项目行业分类">
                <el-option
                  v-for="item in industryTypeOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目类型" prop="projectType">
              <el-radio-group v-model="basicForm.projectType">
                <el-radio
                  v-for="item in projectTypeOptions"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目类别" prop="projectRelate">
              <el-radio-group v-model="basicForm.projectRelate">
                <el-radio
                  v-for="item in projectRelateOptions"
                  :key="item.value"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="项目规模" prop="projectScale">
              <el-input 
                v-model="basicForm.projectScale" 
                type="textarea"
                placeholder="请输入项目规模，最多500个字符"
                maxlength="500"
                show-word-limit
                :rows="2"
              />
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="项目地点" prop="projectAddress">
              <el-cascader
                v-model="basicForm.projectAddress"
                :options="regionOptions"
                :props="{ expandTrigger: 'hover' }"
                placeholder="请选择项目地点"
              />
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item label="项目内容" prop="projectContent">
          <el-input 
            v-model="basicForm.projectContent" 
            type="textarea"
            placeholder="请输入项目内容，最多500个字符"
            maxlength="500"
            show-word-limit
            :rows="3"
          />
        </el-form-item>
        
        <el-form-item label="组织形式" prop="organizationForm">
          <el-radio-group v-model="basicForm.organizationForm">
            <el-radio
              v-for="item in organizationFormOptions"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      
      <!-- 项目法人信息 -->
      <div class="form-section">
        <h3 class="section-title">项目法人信息</h3>
        <el-form 
          ref="legalFormRef" 
          :model="legalForm" 
          :rules="legalFormRules" 
          label-width="120px" 
          class="project-form"
        >
          <el-form-item label="项目法人" prop="projectLegalPersonName">
            <el-select 
              v-model="legalForm.projectLegalPersonName" 
              placeholder="请选择项目法人"
              filterable
            >
              <el-option
                v-for="item in orgList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="联系人" prop="contactor">
                <el-input 
                  v-model="legalForm.contactor" 
                  placeholder="请输入联系人，最多10个字符"
                  maxlength="10"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系方式" prop="contactInformation">
                <el-input 
                  v-model="legalForm.contactInformation" 
                  placeholder="请输入联系方式，11位且以1开头"
                  maxlength="11"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      
      <!-- 项目资金构成 -->
      <div class="form-section">
        <h3 class="section-title">项目资金构成</h3>
        <div class="fund-actions">
          <el-button type="primary" @click="openFundDialog('add')">新增</el-button>
          <!-- <el-button @click="importFundData">导入</el-button> -->
        </div>
        
        <el-table :data="fundList" style="width: 100%" class="fund-table">
          <el-table-column prop="index" label="序号" width="60" />
          <el-table-column prop="fundSource" label="资金来源" />
          <el-table-column prop="fundSourceSN" label="出资金额" />
          <el-table-column prop="contributionScale" label="出资比例" />
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button size="small" @click="openFundDialog('view', scope.row)">查看</el-button>
              <el-button size="small" @click="openFundDialog('edit', scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
      <!-- 项目审批信息 -->
      <div class="form-section">
        <h3 class="section-title">项目审批信息</h3>
        <el-form 
          ref="approvalFormRef" 
          :model="approvalForm" 
          label-width="150px" 
          class="project-form"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="项目审批文号" prop="approvalSN">
                <el-input 
                  v-model="approvalForm.approvalSN" 
                  placeholder="请输入项目审批文号，最多20个字符"
                  maxlength="20"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目审批单位" prop="approvalName">
                <el-input 
                  v-model="approvalForm.approvalName" 
                  placeholder="请输入项目审批单位，最多50个字符"
                  maxlength="50"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-form-item label="项目建议书" prop="projectProposal">
            <el-upload
              class="upload-demo"
              :action="uploadActionUrl"
              :on-preview="handleFilePreview"
              :on-remove="handleFileRemove"
              :before-remove="beforeFileRemove"
              :limit="1"
              :on-exceed="handleFileExceed"
              :file-list="approvalFiles.projectProposal"
              :data="{ fileType: 'projectProposal' }"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  支持word、pdf、jpg、png格式，单个文档大小不超过50M
                </div>
              </template>
            </el-upload>
          </el-form-item>
          
          <el-form-item label="可行性研究" prop="feasibilityStudy">
            <el-upload
              class="upload-demo"
              :action="uploadActionUrl"
              :on-preview="handleFilePreview"
              :on-remove="handleFileRemove"
              :before-remove="beforeFileRemove"
              :limit="1"
              :on-exceed="handleFileExceed"
              :file-list="approvalFiles.feasibilityStudy"
              :data="{ fileType: 'feasibilityStudy' }"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  支持word、pdf、jpg、png格式，单个文档大小不超过50M
                </div>
              </template>
            </el-upload>
          </el-form-item>
          
          <el-form-item label="初步设计" prop="preliminaryDesign">
            <el-upload
              class="upload-demo"
              :action="uploadActionUrl"
              :on-preview="handleFilePreview"
              :on-remove="handleFileRemove"
              :before-remove="beforeFileRemove"
              :limit="1"
              :on-exceed="handleFileExceed"
              :file-list="approvalFiles.preliminaryDesign"
              :data="{ fileType: 'preliminaryDesign' }"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  支持word、pdf、jpg、png格式，单个文档大小不超过50M
                </div>
              </template>
            </el-upload>
          </el-form-item>
          
          <el-form-item label="核准备案文件" prop="approvalDocument">
            <el-upload
              class="upload-demo"
              :action="uploadActionUrl"
              :on-preview="handleFilePreview"
              :on-remove="handleFileRemove"
              :before-remove="beforeFileRemove"
              :limit="1"
              :on-exceed="handleFileExceed"
              :file-list="approvalFiles.approvalDocument"
              :data="{ fileType: 'approvalDocument' }"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  支持word、pdf、jpg、png格式，单个文档大小不超过50M
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      
      <!-- 操作按钮区域 -->
      <div class="form-actions">
        <!-- <el-button type="primary" @click="saveProject">保存</el-button> -->
        <el-button type="primary" @click="submitProject">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
    
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
          <el-select v-model="fundForm.fundSource" placeholder="请选择资金来源">
            <el-option
              v-for="item in fundSourceOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="出资金额" prop="fundSourceSN">
          <el-input 
            v-model="fundForm.fundSourceSN" 
            placeholder="请输入出资金额"
          />
        </el-form-item>
        
        <el-form-item label="出资比例" prop="contributionScale">
          <el-input 
            v-model="fundForm.contributionScale" 
            placeholder="请输入出资比例"
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="fundDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitFundInfo">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { 
  saveBasicInfo, 
  saveLegalInfo, 
  saveFundInfo, 
  uploadApprovalFile, 
  submitProject as submitProjectApi,
  getHuanengOrgList,
  getFundList
} from '@/api/project/registration/fillProjectInfo.api'
import type { 
  BasicInfoForm, 
  LegalInfoForm, 
  FundInfoForm, 
  ApprovalInfoForm,
  OrgListItem,
  FundListItem
} from '@/api/project/registration/fillProjectInfo.api'

// 路由
const router = useRouter()
const route = useRoute()

// 动态上传路径（支持 Mock 与代理模式）
const uploadActionUrl = computed(() => {
  const useProxy = import.meta.env.VITE_USE_PROXY === 'true'
  const mockPrefix = useProxy ? '/mock' : '/api'
  return `${mockPrefix}/project/register/uploadApprovalFile`
})

// 表单引用
const basicFormRef = ref<FormInstance>()
const legalFormRef = ref<FormInstance>()
const approvalFormRef = ref<FormInstance>()
const fundFormRef = ref<FormInstance>()

// 表单数据
const basicForm = reactive<BasicInfoForm>({
  projectCode: 'HN' + new Date().getTime().toString(),
  annual: '',
  projectIndustriesType: '',
  projectAddress: [],
  projectName: '',
  projectScale: '',
  projectContent: '',
  projectType: 'capitalConstructionProject',
  projectRelate: 'no',

  organizationForm: 'openTendering',
})

// 法人信息表单数据
const legalForm = reactive<LegalInfoForm>({
  projectLegalPersonName: '',
  contactor: '',
  contactInformation: ''
})

// 审批信息表单数据
const approvalForm = reactive<ApprovalInfoForm>({
  approvalSN: '',
  approvalName: '',
  projectProposal: '',
  feasibilityStudy: '',
  preliminaryDesign: '',
  approvalDocument: ''
})

// 资金构成表单数据
const fundForm = reactive<FundInfoForm>({
  fundSource: '',
  fundSourceSN: '',
  contributionScale: ''
})

// 文件列表
const approvalFiles = reactive({
  projectProposal: [],
  feasibilityStudy: [],
  preliminaryDesign: [],
  approvalDocument: []
})

// 列表数据
const fundList = ref<FundListItem[]>([])
const orgList = ref<OrgListItem[]>([])

// 弹窗相关
const fundDialogVisible = ref(false)
const fundDialogTitle = ref('')
const fundDialogMode = ref<'add' | 'edit' | 'view'>('add')
const currentFundItem = ref<FundListItem | null>(null)

// 枚举选项
const yearOptions = ref<Array<{ label: string; value: string }>>([])
const industryTypeOptions = ref<string[]>([
  '火电', '风电', '水电', '核电', '光伏', '港口与航运',
  '煤矿', '页岩气', '煤化工', '工民建', '高速', '综合', '信息化'
])
// 项目类型枚举
const projectTypeOptions = ref<Array<{ value: string; label: string }>>([
  { value: 'capitalConstructionProject', label: '基本建设项目' },
  { value: 'productionOperationAndMaintenanceProject', label: '生产运维项目' }
])

// 项目类别枚举
const projectRelateOptions = ref<Array<{ value: string; label: string }>>([
  { value: 'no', label: '无' },
  { value: 'fixedAssetProject', label: '固定资产项目' }
])

// 组织形式枚举
const organizationFormOptions = ref<Array<{ value: string; label: string }>>([
  { value: 'openTendering', label: '公开招标' },
  { value: 'invitedTendering', label: '邀请招标' },
  { value: 'inquiryPurchase', label: '询比采购' },
  { value: 'negotiationPurchase', label: '谈判采购' },
  { value: 'competitiveBiddingPurchase', label: '竞价采购' },
  { value: 'directPurchase', label: '直接采购' }
])
const fundSourceOptions = ref<string[]>([
  '财政资金', '银行贷款', '企业自筹', '社会捐赠', '国际援助', 
  '专项资金', 'PPP模式融资', '资本市场融资', '民间资本', '其他'
])

// 省市区数据（示例）
const regionOptions = ref([
  {
    value: '北京市',
    label: '北京市',
    children: [
      {
        value: '北京市',
        label: '北京市',
        children: [
          { value: '东城区', label: '东城区' },
          { value: '西城区', label: '西城区' },
          { value: '朝阳区', label: '朝阳区' }
        ]
      }
    ]
  },
  {
    value: '上海市',
    label: '上海市',
    children: [
      {
        value: '上海市',
        label: '上海市',
        children: [
          { value: '黄浦区', label: '黄浦区' },
          { value: '静安区', label: '静安区' },
          { value: '徐汇区', label: '徐汇区' }
        ]
      }
    ]
  }
])

// 表单验证规则
const basicFormRules = reactive<FormRules>({
  year: [{ required: true, message: '请选择年度', trigger: 'change' }],
  industryType: [{ required: true, message: '请选择项目行业分类', trigger: 'change' }],
  projectLocation: [{ required: true, message: '请选择项目地点', trigger: 'change' }],
  projectName: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
    { min: 1, max: 100, message: '项目名称字符长度需在1 - 100之间', trigger: 'blur' }
  ],
  projectScale: [
    { required: true, message: '请输入项目规模', trigger: 'blur' },
    { min: 1, max: 500, message: '项目规模字符长度需在1 - 500之间', trigger: 'blur' }
  ],
  projectContent: [
    { min: 0, max: 500, message: '项目内容字符长度需在0 - 500之间', trigger: 'blur' }
  ],
  projectType: [{ required: true, message: '请选择项目类型', trigger: 'change' }],
  projectRelate: [{ required: true, message: '请选择项目类别', trigger: 'change' }],
  organizationForm: [{ required: true, message: '请选择组织形式', trigger: 'change' }],
  contactPerson: [
    { required: true, message: '请输入联系人', trigger: 'blur' },
    { min: 1, max: 10, message: '联系人字符长度需在1 - 10之间', trigger: 'blur' }
  ],
  contactInfo: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '联系方式格式不正确，需为11位且以1开头', trigger: 'blur' }
  ]
})

// 法人信息表单验证规则
const legalFormRules = reactive<FormRules>({
  projectLegalPersonName: [{ required: true, message: '请选择项目法人', trigger: 'change' }]
})

// 资金构成表单验证规则
const fundFormRules = reactive<FormRules>({
  fundSource: [{ required: true, message: '请选择资金来源', trigger: 'change' }],
  fundSourceSN: [
    { pattern: /^\d+(\.\d{1,2})?$/, message: '出资金额格式不正确', trigger: 'blur' }
  ],
  contributionScale: [
    { pattern: /^\d+(\.\d{1,2})?$/, message: '出资比例格式不正确', trigger: 'blur' }
  ]
})

// 初始化年份选项
const initYearOptions = () => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push({ label: `${i}年`, value: String(i) })
  }
  yearOptions.value = years
}

// 获取华能组织机构列表
const fetchOrgList = async () => {
  try {
    const res = await getHuanengOrgList()
    if (res.success) {
      orgList.value = res.data
    } else {
      ElMessage.error(res.msg || '获取组织机构列表失败')
    }
  } catch (error) {
    console.error('获取组织机构列表失败:', error)
    ElMessage.error('获取组织机构列表失败')
  }
}

// 获取项目资金构成列表
const fetchFundList = async () => {
  try {
    // 这里需要传入项目ID，暂时用mock数据
    const res = await getFundList('mock-project-id')
    if (res.success) {
      fundList.value = res.data
    } else {
      ElMessage.error(res.msg || '获取资金构成列表失败')
    }
  } catch (error) {
    console.error('获取资金构成列表失败:', error)
    ElMessage.error('获取资金构成列表失败')
  }
}

// 打开资金构成弹窗
const openFundDialog = (mode: 'add' | 'edit' | 'view', item?: FundListItem) => {
  fundDialogMode.value = mode
  fundDialogTitle.value = mode === 'add' ? '新增资金构成' : mode === 'edit' ? '编辑资金构成' : '查看资金构成'
  
  if (mode === 'add') {
    // 重置表单
    Object.assign(fundForm, {
      fundSource: '',
      fundSourceSN: '',
      contributionScale: ''
    })
  } else if (item) {
    // 编辑或查看模式，填充表单数据
    Object.assign(fundForm, item)
    currentFundItem.value = item
  }
  
  fundDialogVisible.value = true
}

// 保存资金构成信息
const submitFundInfo = async () => {
  if (!fundFormRef.value) return
  
  await fundFormRef.value.validate(async (valid) => {
    if (valid) {
      fundList.value.push(fundForm)
      fundDialogVisible.value = false
      // try {
      //   // 这里需要传入项目ID，暂时用mock数据
      //   const res = await saveFundInfo('mock-project-id', fundForm)
      //   if (res.success) {
      //     ElMessage.success('保存成功')
      //     fundDialogVisible.value = false
      //     // 重新获取资金构成列表
      //     await fetchFundList()
      //   } else {
      //     ElMessage.error(res.msg || '保存失败')
      //   }
      // } catch (error) {
      //   console.error('保存资金构成信息失败:', error)
      //   ElMessage.error('保存资金构成信息失败')
      // }
    }
  })
}

// 导入资金构成数据
const importFundData = () => {
  ElMessage.info('导入功能待实现')
}

// 文件上传相关处理函数
const handleFilePreview = (file: any) => {
  console.log('文件预览:', file)
}

const handleFileRemove = (file: any, fileList: any[]) => {
  console.log('文件移除:', file, fileList)
}

const beforeFileRemove = (file: any, fileList: any[]) => {
  return ElMessageBox.confirm(`确定移除 ${file.name}？`)
}

const handleFileExceed = (files: any[], fileList: any[]) => {
  ElMessage.warning('只能上传一个文件')
}

// 保存项目信息
const saveProject = async () => {
  if (!basicFormRef.value || !legalFormRef.value) return
  
  // 验证基本信息表单
  await basicFormRef.value.validate(async (valid) => {
    if (valid) {
      // 验证法人信息表单
      await legalFormRef.value!.validate(async (valid) => {
        if (valid) {
          try {
            // 保存基本信息
            const basicRes = await saveBasicInfo(basicForm)
            if (!basicRes.success) {
              ElMessage.error(basicRes.msg || '保存基本信息失败')
              return
            }
            
            // 保存法人信息
            const legalRes = await saveLegalInfo(legalForm)
            if (!legalRes.success) {
              ElMessage.error(legalRes.msg || '保存法人信息失败')
              return
            }
            
            ElMessage.success('保存成功')
          } catch (error) {
            console.error('保存项目信息失败:', error)
            ElMessage.error('保存项目信息失败')
          }
        }
      })
    }
  })
}

// 提交项目信息
/**
 * {
  "annual": "",
  "approval": [
    {
      "approvalName": "",
      "approvalSN": "",
      "approvalUrl": ""
    }
  ],
  "approvalAuthority": "",
  "approvalSN": "",
  "investProjectCode": "",
  "procurementMethods": "",
  "projectAddress": "",
  "projectCode": "",
  "projectContent": "",
  "projectIndustriesType": "",
  "projectInvestmentComposition": [
    {
      "contributionScale": "",
      "fundSource": "",
      "fundSourceSN": ""
    }
  ],
  "projectLegalPerson": [
    {
      "contactInformation": "",
      "contactor": "",
      "projectLegalPersonCode": "",
      "projectLegalPersonName": "",
      "projectLegalPersonSN": ""
    }
  ],
  "projectName": "",
  "projectRegion": "",
  "projectRegistrationApprovalRecord": [
    {
      "approvalContent": "",
      "approvalDepartment": "",
      "approvalOpinion": "",
      "approvalStatus": "",
      "approvalTime": "",
      "approver": ""
    }
  ],
  "projectRelate": "",
  "projectSN": "",
  "projectScale": "",
  "projectType": "",
  "totalProjectInvestment": 0,
  "totalProjectInvestmentCurrency": ""
}
 */
const submitProject = async () => {
  if (!basicFormRef.value || !legalFormRef.value) return
  
  // 验证基本信息表单
  await basicFormRef.value.validate(async (valid) => {
    if (valid) {
      // 验证法人信息表单
      await legalFormRef.value!.validate(async (valid) => {
        if (valid) {
          try {
            // 提交项目信息
            const res = await submitProjectApi({
              "annual": basicForm.annual,
              "projectApprovalDocumentNumber": approvalForm.approvalSN,
              "approval": [
                {
                  "approvalName": approvalForm.approvalName,
                  "approvalSN": approvalForm.approvalSN,
                  "approvalUrl": "测试"
                }
              ],
              "approvalAuthority": "PENDING",
              "approvalNumber": "测试",
              "approvalSN": "测试",
              "investProjectCode": "测试",
              "procurementMethods": "测试",
              "projectAddress": basicForm.projectAddress.join(','),
              "projectCode": basicForm.projectCode,
              "projectContent": basicForm.projectContent,
              "projectIndustriesType": basicForm.projectIndustriesType,
              "projectInvestmentComposition": fundList.value,
              "projectLegalPerson": [
                {
                  "contactInformation": legalForm.contactInformation,
                  "contactor": legalForm.contactor,
                  "projectLegalPersonCode": "测试",
                  "projectLegalPersonName": legalForm.projectLegalPersonName,
                  "projectLegalPersonSN": "测试"
                }
              ],
              "projectName": basicForm.projectName,
              "projectRegion": "测试",
              "projectRegistrationApprovalRecord": [
                {
                  "approvalContent": "测试",
                  "approvalDepartment": "测试",
                  "approvalOpinion": "测试",
                  "approvalStatus": "PENDING",
                  "approvalTime": "2025-09-17 00:00:00",
                  "approver": "测试"
                }
              ],
              "projectRelate": basicForm.projectRelate,
              "projectSN": new Date().getTime().toString(),
              "projectScale": basicForm.projectScale,
              "projectType": basicForm.projectType,
              "totalProjectInvestment": 0,
              "totalProjectInvestmentCurrency": "测试",
            })
            
            if (res.success) {
              ElMessage.success('提交成功')
              router.push('/project/registration/list')
            } else {
              ElMessage.error(res.msg || '提交失败')
            }
          } catch (error) {
            console.error('提交项目信息失败:', error)
            ElMessage.error('提交项目信息失败')
          }
        }
      })
    }
  })
}

// 取消操作
const cancel = () => {
  ElMessageBox.confirm('确定要取消吗？取消后填写的内容将不会保存。', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 返回上一页
    window.history.back()
  }).catch(() => {
    // 取消操作
  })
}

// 初始化数据
onMounted(() => {
  initYearOptions()
  fetchOrgList()
  // fetchFundList()
})
</script>

<style lang="scss" scoped>
.fill-project-info {
  padding: 20px;
  
  .project-card {
    .card-header {
      font-size: 18px;
      font-weight: 600;
      color: var(--el-text-color-primary);
    }
    
    .form-section {
      margin-top: 30px;
      
      .section-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--el-text-color-primary);
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--el-border-color-light);
      }
    }
    
    .fund-actions {
    text-align: right;
      margin-bottom: 20px;
      
      .el-button {
        margin-right: 10px;
      }
    }
    
    .fund-table {
      margin-top: 10px;
    }
    
    .form-actions {
      margin-top: 30px;
      text-align: center;
      
      .el-button {
        margin: 0 10px;
      }
    }
  }
  
  .project-form {
    :deep(.el-form-item) {
      margin-bottom: 20px;
    }
  }
}
</style>