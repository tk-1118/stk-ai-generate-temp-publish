import { http } from '@/api/http'
import type { ApiResult } from '@/api/types'

// 项目登记列表项类型定义
export interface ProjectListItem {
  id: string
  projectSN: string  // 项目序列号，用于删除等操作
  projectCode: string
  projectName: string
  projectApprovalDocumentNumber: string  // 批准文号
  annual: string  // 年度
  projectLegalPerson: string  // 项目法人
  creator: string
  creationTime: string  // 创建时间
  projectApprovalUnit: string  // 项目审批单位，在页面中用作状态显示
}

// 项目登记列表响应数据类型定义
export interface ProjectListResponse {
  records: ProjectListItem[]  // Vue 页面从 res.data.records 获取数据
  total: number
}

// 项目登记列表请求参数类型定义
export interface ProjectListParams {
  page: number
  size: number
  sortField: string
  sortOrder: "ASC" | "DESC"
  filters?: {
    simpleSearch?: string
    projectCode?: string
    projectName?: string
    creator?: string
    year?: string
    legalPerson?: string
    status?: string
  }

}

// 删除项目登记参数类型定义
export interface deleteProjectBody{
 projectSNList: string[]
}

// 获取项目登记列表
export function getProjectList(
  data: ProjectListParams
): Promise<ApiResult<ProjectListResponse>> {
  return http.post<ProjectListResponse>('/api/projectregistration/registrationprojectbiz/registrationproject/queryProjectRegistrationByPage', data)
}

// 删除项目登记
export function deleteProject(data: deleteProjectBody): Promise<ApiResult<null>> {
  return http.post(`/api/projectregistration/registrationprojectbiz/registrationproject/deleteProjectRegistration`, data)
}