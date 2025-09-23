import { http } from '@/api/http'
import type { ApiResult } from '@/api/types'

// 项目基本信息类型
export interface ProjectBasicInfo {
  projectCode: string        // 项目编码
  projectName: string        // 项目名称
  approvalNumber: string     // 项目审批文号
  approvalUnit: string       // 项目审批单位
  projectType: string        // 项目类型
  projectCategory: string    // 项目类别
  projectScale: string       // 项目规模
  industryType: string       // 项目行业分类
  projectLocation: string    // 项目地点
  legalPerson: string        // 项目法人
  contactPerson: string      // 联系人
  contactNumber: string      // 联系方式
  projectContent: string     // 项目内容
}

// 项目法人信息类型
export interface ProjectLegalInfo {
  legalPersonName: string    // 项目法人名称
  contactName: string        // 联系人姓名
  contactPhone: string       // 联系人电话
}

// 项目资金构成类型
export interface ProjectFundItem {
  id: string                 // 资金构成ID
  fundSource: string         // 资金来源
  fundAmount: string         // 出资金额
  fundRatio: string          // 出资比例
}

// 项目审批信息类型
export interface ProjectApprovalInfo {
  approvalDocNumber: string  // 项目审批文号
  approvalUnitName: string   // 项目审批单位
  projectProposal: string    // 项目建议书文件
  feasibilityStudy: string   // 可行性研究文件
  preliminaryDesign: string  // 初步设计文件
  approvalDocument: string   // 核准备案文件
  otherDocuments: string     // 其他文件
}

// 采购需求清单类型
export interface ProcurementItem {
  id: string                 // 采购项ID
  itemName: string           // 采购项名称
  specification: string      // 规格型号
  quantity: string           // 数量
  unit: string               // 单位
  budgetAmount: string       // 预算金额
}

// 审批进度状态类型
export interface ApprovalStatus {
  status: string             // 审批状态
  updateTime: string         // 更新时间
  description: string        // 状态描述
}

// 项目详情响应数据类型 - 匹配 Vue 页面数据结构
export interface ProjectDetailResponse {
  projectList: ProjectDetailItem[]  // Vue 页面从 res.data.projectList[0] 获取数据
}

// 单个项目详情项类型
export interface ProjectDetailItem {
  projectCode: string
  projectName: string
  projectApprovalDocumentNumber: string
  projectApprovalUnit: string
  projectType: string
  projectRelate: string  // 项目类别
  projectScale: string
  projectIndustriesType: string  // 项目行业分类
  projectAddress: string
  projectContent: string
  projectLegalPerson: ProjectLegalPersonItem[]  // 数组形式的法人信息
  // 其他字段根据需要添加
}

// 项目法人信息项
export interface ProjectLegalPersonItem {
  projectLegalPersonName: string
  contactor: string
  contactInformation: string
}

// 项目详情请求数据类型
export interface projectDetailBody{
 projectSNList: string[]
}

// 获取项目详情
export function getProjectDetail(data: projectDetailBody): Promise<ApiResult<ProjectDetailResponse>> {
  return http.post<ProjectDetailResponse>(`/api/projectregistration/registrationprojectbiz/registrationproject/queryProjectRegistration`, data)
}

// 更新项目详情
export function updateProjectDetail(id: string, data: Partial<ProjectDetailResponse>): Promise<ApiResult<void>> {
  return http.put<void>(`/api/project/detail/${id}`, data)
}