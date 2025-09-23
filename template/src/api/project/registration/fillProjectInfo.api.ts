import { http } from '@/api/http'
import type { ApiResult } from '@/api/types'

// 基本信息表单类型
export interface BasicInfoForm {
  projectCode?: string
  annual: string
  projectIndustriesType: string
  projectAddress: string[]
  projectName: string
  projectScale: string
  projectContent: string
  projectType: string
  projectCategory: string
  organizationForm: string
}

// 法人信息表单类型
export interface LegalInfoForm {
  projectLegalPersonName: string
  contactor: string
  contactInformation: string
}

// 资金构成表单类型
export interface FundInfoForm {
  fundSource: string
  fundSourceSN: string
  contributionScale: string
}

// 审批信息表单类型
export interface ApprovalInfoForm {
  approvalNumber: string
  approvalUnit: string
  projectProposal: string
  feasibilityStudy: string
  preliminaryDesign: string
  approvalDocument: string
}

// 组织机构列表项类型
export type OrgListItem = string

// 资金构成列表项类型
export interface FundListItem {
  index: number
  fundSource: string
  fundAmount: string
  fundRatio: string
}

// 提交项目信息类型
export interface SubmitProjectData {
  basicInfo: BasicInfoForm
  legalInfo: LegalInfoForm
  fundList: FundListItem[]
  approvalInfo: ApprovalInfoForm
}

// 获取华能组织机构列表
export function getHuanengOrgList(): Promise<ApiResult<OrgListItem[]>> {
  return http.get<OrgListItem[]>('/api/project/register/getHuanengOrgList')
}

// 保存项目基本信息
export function saveBasicInfo(data: BasicInfoForm): Promise<ApiResult<void>> {
  return http.post<void>('/api/project/register/saveBasicInfo', data)
}

// 保存项目法人信息
export function saveLegalInfo(data: LegalInfoForm): Promise<ApiResult<void>> {
  return http.post<void>('/api/project/register/saveLegalInfo', data)
}

// 获取项目资金构成列表
export function getFundList(projectId: string): Promise<ApiResult<FundListItem[]>> {
  return http.get<FundListItem[]>(`/api/project/register/getFundList?projectId=${projectId}`)
}

// 保存项目资金构成信息
export function saveFundInfo(projectId: string, data: FundInfoForm): Promise<ApiResult<void>> {
  return http.post<void>(`/api/project/register/saveFundInfo?projectId=${projectId}`, data)
}

// 导入项目资金构成模板
export function importFundTemplate(file: File): Promise<ApiResult<void>> {
  const formData = new FormData()
  formData.append('file', file)
  return http.post<void>('/api/project/register/importFundTemplate', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 上传项目审批文件
export function uploadApprovalFile(file: File, fileType: string): Promise<ApiResult<void>> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('fileType', fileType)
  return http.post<void>('/api/project/register/uploadApprovalFile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 提交项目登记
export function submitProject(data: SubmitProjectData): Promise<ApiResult<void>> {
  return http.post<void>('/api/projectregistration/registrationprojectbiz/registrationproject/registerProject', data)
}