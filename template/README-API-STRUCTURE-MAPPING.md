# 接口数据结构对照表

本文档说明了项目中 API 接口与 Vue 页面数据结构的对应关系，以及 Mock 数据的结构。

## 📋 项目列表接口

### API 路径
- **真实接口**: `POST /api/projectregistration/registrationprojectbiz/registrationproject/queryProjectRegistrationByPage`
- **Mock 接口**: `POST /mock/projectregistration/registrationprojectbiz/registrationproject/queryProjectRegistrationByPage`

### Vue 页面数据获取
```javascript
const res = await getProjectList(params)
if (res.success) {
  projectList.value = res.data.records  // 从 records 字段获取列表数据
  pagination.total = res.data.total     // 从 total 字段获取总数
}
```

### 数据结构
```typescript
// 响应数据结构
interface ProjectListResponse {
  records: ProjectListItem[]  // 列表数据
  total: number              // 总数
}

// 列表项数据结构
interface ProjectListItem {
  id: string
  projectSN: string                      // 项目序列号（用于删除操作）
  projectCode: string                    // 项目编号
  projectName: string                    // 项目名称
  projectApprovalDocumentNumber: string  // 批准文号
  annual: string                         // 年度
  projectLegalPerson: string             // 项目法人
  creator: string                        // 创建人
  creationTime: string                   // 创建时间
  projectApprovalUnit: string            // 项目审批单位（页面中显示为状态）
}
```

### Vue 页面字段使用
| 表格列 | 字段名 | 说明 |
|--------|--------|------|
| 项目编号 | `projectCode` | |
| 项目名称 | `projectName` | |
| 批准文号 | `projectApprovalDocumentNumber` | |
| 年度 | `annual` | |
| 项目法人 | `projectLegalPerson` | |
| 创建人 | `creator` | |
| 创建时间 | `creationTime` | |
| 状态 | `projectApprovalUnit` | 实际显示审批单位，在页面中作为状态显示 |

---

## 📋 项目删除接口

### API 路径
- **真实接口**: `POST /api/projectregistration/registrationprojectbiz/registrationproject/deleteProjectRegistration`
- **Mock 接口**: `POST /mock/projectregistration/registrationprojectbiz/registrationproject/deleteProjectRegistration`

### 请求参数
```typescript
interface deleteProjectBody {
  projectSNList: string[]  // 项目序列号数组
}
```

---

## 📋 项目详情接口

### API 路径
- **真实接口**: `POST /api/projectregistration/registrationprojectbiz/registrationproject/queryProjectRegistration`
- **Mock 接口**: `POST /mock/projectregistration/registrationprojectbiz/registrationproject/queryProjectRegistration`

### Vue 页面数据获取
```javascript
const res = await getProjectDetail({
  projectSNList: [ projectSN ]
})
if (res.success) {
  projectDetail.value = res.data.projectList[0] || {}  // 从 projectList[0] 获取详情数据
}
```

### 数据结构
```typescript
// 响应数据结构
interface ProjectDetailResponse {
  projectList: ProjectDetailItem[]  // 项目详情数组
}

// 项目详情项结构
interface ProjectDetailItem {
  projectCode: string                    // 项目编码
  projectName: string                    // 项目名称
  projectApprovalDocumentNumber: string  // 项目审批文号
  projectApprovalUnit: string            // 项目审批单位
  projectType: string                    // 项目类型
  projectRelate: string                  // 项目类别
  projectScale: string                   // 项目规模
  projectIndustriesType: string          // 项目行业分类
  projectAddress: string                 // 项目地点
  projectContent: string                 // 项目内容
  projectLegalPerson: ProjectLegalPersonItem[]  // 项目法人信息数组
}

// 项目法人信息结构
interface ProjectLegalPersonItem {
  projectLegalPersonName: string  // 项目法人名称
  contactor: string              // 联系人
  contactInformation: string     // 联系方式
}
```

### Vue 页面字段使用
| 显示标签 | 字段名 | 说明 |
|----------|--------|------|
| 项目编码 | `projectDetail?.projectCode` | |
| 项目名称 | `projectDetail?.projectName` | |
| 项目审批文号 | `projectDetail?.projectApprovalDocumentNumber` | |
| 项目审批单位 | `projectDetail?.projectApprovalUnit` | |
| 项目类型 | `projectDetail?.projectType` | |
| 项目类别 | `projectDetail?.projectRelate` | |
| 项目规模 | `projectDetail?.projectScale` | |
| 项目行业分类 | `projectDetail?.projectIndustriesType` | |
| 项目地点 | `projectDetail?.projectAddress` | |
| 项目法人 | `projectDetail?.projectLegalPerson[0]?.projectLegalPersonName` | 取数组第一项 |
| 联系人 | `projectDetail?.projectLegalPerson[0]?.contactor` | 取数组第一项 |
| 联系方式 | `projectDetail?.projectLegalPerson[0]?.contactInformation` | 取数组第一项 |
| 项目内容 | `projectDetail?.projectContent` | |

---

## 📋 项目注册相关接口

以下接口路径保持原样，因为真实后端接口路径可能不同或尚未确定：

### 组织机构接口
- **路径**: `/api/project/register/getHuanengOrgList`
- **方法**: `GET`
- **返回**: `string[]` 组织机构名称数组

### 项目信息保存接口
- **基本信息**: `POST /api/project/register/saveBasicInfo`
- **法人信息**: `POST /api/project/register/saveLegalInfo`
- **资金信息**: `POST /api/project/register/saveFundInfo`

### 文件上传接口
- **资金模板**: `POST /api/project/register/importFundTemplate`
- **审批文件**: `POST /api/project/register/uploadApprovalFile`

### 项目提交接口
- **真实接口**: `POST /api/projectregistration/registrationprojectbiz/registrationproject/registerProject`
- **Mock 接口**: `POST /mock/projectregistration/registrationprojectbiz/registrationproject/registerProject`

---

## 🔄 Mock 与代理模式

### 环境变量控制
- `VITE_USE_PROXY=false`: 纯 Mock 模式，所有接口使用 `/api` 前缀
- `VITE_USE_PROXY=true`: 代理模式，真实接口使用 `/api` 前缀，Mock 接口使用 `/mock` 前缀

### 数据一致性保证
1. **类型定义**: API 类型定义与 Vue 页面使用的数据结构完全一致
2. **字段映射**: Mock 数据字段名与真实接口返回字段名保持一致
3. **数据格式**: 所有日期、数字等格式与真实接口保持一致

---

## ⚠️ 注意事项

1. **字段命名**: 严格按照后端接口文档的字段名命名，不要随意更改
2. **数据结构**: Mock 数据结构必须与真实接口完全一致
3. **类型安全**: 使用 TypeScript 类型定义确保数据结构的一致性
4. **测试验证**: 切换 Mock/代理模式时，确保页面功能正常

---

## 🔧 开发建议

1. **新增接口时**: 
   - 先定义 TypeScript 类型
   - 创建对应的 Mock 数据
   - 确保与 Vue 页面使用方式一致

2. **修改接口时**:
   - 同时更新 API 类型定义和 Mock 数据
   - 检查 Vue 页面中的字段使用是否需要调整

3. **调试技巧**:
   - 使用浏览器控制台查看接口返回数据
   - 对比 Mock 数据和真实接口数据的差异
