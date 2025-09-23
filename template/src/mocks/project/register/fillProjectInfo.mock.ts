import Mock from 'mockjs'
import { mockSuccess, mockError, getMockPrefix } from '@/mocks/mock-utils'

const mockPrefix = getMockPrefix();

// 注意：以下接口路径保持原样，因为真实后端接口路径可能不同或尚未确定
// 如果后端提供了对应的真实接口，请相应更新这些路径

// 获取华能组织机构列表
Mock.mock(`${mockPrefix}/project/register/getHuanengOrgList`, 'get', (options: any) => {
  return mockSuccess([
    '华能国际电力股份有限公司',
    '华能新能源股份有限公司',
    '华能澜沧江水电股份有限公司',
    '华能国际电力开发公司',
    '华能国际电力燃料有限公司'
  ], '获取成功', options)
})

// 保存项目基本信息
Mock.mock(`${mockPrefix}/project/register/saveBasicInfo`, 'post', (options: any) => {
  try {
    const body = JSON.parse(options.body || '{}')
    console.log('保存项目基本信息:', body)
    return mockSuccess(null, '保存成功', options)
  } catch (error) {
    return mockError('SAVE_BASIC_INFO_ERROR', '保存项目基本信息失败', 500, options)
  }
})

// 保存项目法人信息
Mock.mock(`${mockPrefix}/project/register/saveLegalInfo`, 'post', (options: any) => {
  try {
    const body = JSON.parse(options.body || '{}')
    console.log('保存项目法人信息:', body)
    return mockSuccess(null, '保存成功', options)
  } catch (error) {
    return mockError('SAVE_LEGAL_INFO_ERROR', '保存项目法人信息失败', 500, options)
  }
})

// 获取项目资金构成列表
Mock.mock(`${mockPrefix}/project/register/getFundList`, 'get', (options: any) => {
  try {
    // 解析查询参数
    const url = new URL(options.url, 'http://localhost')
    const projectId = url.searchParams.get('projectId')
    console.log('获取项目资金构成列表:', { projectId })
    
    return mockSuccess([
      {
        index: 1,
        fundSource: '财政资金',
        fundAmount: '1000000',
        fundRatio: '40'
      },
      {
        index: 2,
        fundSource: '银行贷款',
        fundAmount: '1500000',
        fundRatio: '60'
      }
    ], '获取成功', options)
  } catch (error) {
    return mockError('GET_FUND_LIST_ERROR', '获取项目资金构成列表失败', 500, options)
  }
})

// 保存项目资金构成信息
Mock.mock(`${mockPrefix}/project/register/saveFundInfo`, 'post', (options: any) => {
  try {
    const body = JSON.parse(options.body || '{}')
    // 解析查询参数
    const url = new URL(options.url, 'http://localhost')
    const projectId = url.searchParams.get('projectId')
    console.log('保存项目资金构成信息:', { projectId, body })
    return mockSuccess(null, '保存成功', options)
  } catch (error) {
    return mockError('SAVE_FUND_INFO_ERROR', '保存项目资金构成信息失败', 500, options)
  }
})

// 导入项目资金构成模板
Mock.mock(`${mockPrefix}/project/register/importFundTemplate`, 'post', (options: any) => {
  try {
    console.log('导入项目资金构成模板:', options)
    return mockSuccess(null, '导入成功', options)
  } catch (error) {
    return mockError('IMPORT_FUND_TEMPLATE_ERROR', '导入项目资金构成模板失败', 500, options)
  }
})

// 上传项目审批文件
Mock.mock(`${mockPrefix}/project/register/uploadApprovalFile`, 'post', (options: any) => {
  try {
    console.log('上传项目审批文件:', options)
    return mockSuccess(null, '上传成功', options)
  } catch (error) {
    return mockError('UPLOAD_APPROVAL_FILE_ERROR', '上传项目审批文件失败', 500, options)
  }
})

// 提交项目登记 - 匹配真实接口路径
Mock.mock(`${mockPrefix}/projectregistration/registrationprojectbiz/registrationproject/registerProject`, 'post', (options: any) => {
  try {
    const body = JSON.parse(options.body || '{}')
    console.log('提交项目登记:', body)
    return mockSuccess(null, '提交成功', options)
  } catch (error) {
    return mockError('SUBMIT_PROJECT_ERROR', '提交项目登记失败', 500, options)
  }
})