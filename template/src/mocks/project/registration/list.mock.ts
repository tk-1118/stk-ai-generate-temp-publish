import Mock from 'mockjs'
import { ok } from '@/api/types'
import { getMockPrefix } from '@/mocks/mock-utils'
import type { ProjectListItem } from '@/api/project/registration/list'

const mockPrefix = getMockPrefix();

// 模拟项目登记列表数据
const generateMockProjects = (size: number): ProjectListItem[] => {
  return Mock.mock({
    [`list|${size}`]: [
      {
        id: '@id',
        projectSN: '@id',  // 项目序列号
        projectCode: /^PROJ\d{4}\d{3}$/,
        projectName: '@ctitle(5, 10)项目',
        projectApprovalDocumentNumber: /^APPR\d{4}\d{3}$/,  // 批准文号
        annual: '@integer(2020, 2025)',  // 年度
        projectLegalPerson: '@cname',  // 项目法人
        creator: '@cname',
        creationTime: '@datetime',  // 创建时间
        projectApprovalUnit: () => {  // 项目审批单位
          const units = ['待提交', '待审核', '已完成', '审核驳回']
          return units[Math.floor(Math.random() * units.length)]
        }
      }
    ]
  }).list
}

// 模拟获取项目登记列表 - 匹配真实接口路径
Mock.mock(`${mockPrefix}/projectregistration/registrationprojectbiz/registrationproject/queryProjectRegistrationByPage`, 'post', (options: any) => {
  try {
    const body = JSON.parse(options.body || '{}')
    console.log('获取项目登记列表请求参数:', body)
    
    const page = parseInt(body.page || '1')
    const size = parseInt(body.size || '10')
    
    // 生成模拟数据
    const total = 47 // 模拟总条数
    const records = generateMockProjects(size)  // Vue 页面从 records 字段获取数据
    
    return ok({
      records,
      total
    })
  } catch (error) {
    console.error('获取项目登记列表失败:', error)
    return ok({ records: [], total: 0 })
  }
})

// 模拟删除项目登记 - 匹配真实接口路径
Mock.mock(`${mockPrefix}/projectregistration/registrationprojectbiz/registrationproject/deleteProjectRegistration`, 'post', (options: any) => {
  try {
    const body = JSON.parse(options.body || '{}')
    console.log('删除项目登记请求参数:', body)
    
    // 模拟删除成功
    return ok(null)
  } catch (error) {
    console.error('删除项目登记失败:', error)
    return ok(null)
  }
})