import Mock from 'mockjs'
import { mockSuccess, getMockPrefix } from '@/mocks/mock-utils'
import type { ProjectDetailResponse, ProjectDetailItem } from '@/api/project/registration/detail'

const mockPrefix = getMockPrefix();

// 模拟获取项目详情 - 匹配真实接口路径
Mock.mock(`${mockPrefix}/projectregistration/registrationprojectbiz/registrationproject/queryProjectRegistration`, 'post', (options: any) => {
  try {
    const body = JSON.parse(options.body || '{}')
    console.log('获取项目详情请求参数:', body)
    
    const projectSNList = body.projectSNList || []
    const projectSN = projectSNList[0] || 'default'
  
    // 生成单个项目详情数据
    const projectDetail: ProjectDetailItem = {
      projectCode: `PROJ${Mock.mock('@integer(2020, 2025)')}${Mock.mock('@integer(100, 999)')}`,
      projectName: Mock.mock('@ctitle(5, 15)项目'),
      projectApprovalDocumentNumber: `APPR${Mock.mock('@integer(2020, 2025)')}${Mock.mock('@integer(1000, 9999)')}`,
      projectApprovalUnit: Mock.mock('@cword(5, 10)审批单位'),
      projectType: Mock.mock('@pick(["基本建设项目", "技术改造项目", "其他"])'),
      projectRelate: Mock.mock('@pick(["无", "一类", "二类", "三类"])'),  // 项目类别
      projectScale: Mock.mock('@cparagraph(1, 3)'),
      projectIndustriesType: Mock.mock('@pick(["火电", "风电", "水电", "核电", "光伏", "港口与航运", "煤矿", "页岩气", "煤化工", "工民建", "高速", "综合", "信息化"])'),
      projectAddress: Mock.mock('@province') + Mock.mock('@city'),
      projectContent: Mock.mock('@cparagraph(3, 8)'),
      projectLegalPerson: [
        {
          projectLegalPersonName: Mock.mock('@cname'),
          contactor: Mock.mock('@cname'),
          contactInformation: Mock.mock('1') + Mock.mock('@integer(3, 9)') + Mock.mock('@integer(100000000, 999999999)')
        }
      ]
    }

    // Vue 页面从 res.data.projectList[0] 获取数据
    const response: ProjectDetailResponse = {
      projectList: [projectDetail]
    }
  
  return mockSuccess(response, '获取项目详情成功', options)
  } catch (error) {
    console.error('获取项目详情失败:', error)
    return mockSuccess(null, '获取项目详情失败', options)
  }
})

// 模拟更新项目详情 - 保留原有路径（真实接口中暂无对应路径）
Mock.mock(new RegExp(`${mockPrefix.replace('/', '\\/')}\\/project\\/detail\\/\\d+`), 'put', (options: any) => {
  try {
    const body = JSON.parse(options.body || '{}')
    console.log('更新项目详情请求参数:', body)
    return mockSuccess(null, '更新项目详情成功', options)
  } catch (error) {
    console.error('更新项目详情失败:', error)
    return mockSuccess(null, '更新项目详情失败', options)
  }
})