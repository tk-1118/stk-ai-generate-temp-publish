#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// 获取用户输入的项目名（命令行参数）
const projectName = process.argv[2];
if (!projectName) {
  console.error('请提供项目名称！');
  process.exit(1);
}

// 模板路径
const templateDir = path.join(__dirname, '../template');
const targetDir = path.join(process.cwd(), projectName);

// 复制模板到目标目录
fs.copySync(templateDir, targetDir);

// 修改目标目录的 package.json
const pkgPath = path.join(targetDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.name = projectName; // 更新包名
pkg.version = '1.0.0'; // 重置版本号
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

// 安装依赖
console.log(`正在安装依赖...`);
execSync('npm install', { cwd: targetDir, stdio: 'inherit' });

console.log(`✅ 项目 ${projectName} 创建成功！`);
console.log(`📁 进入项目: cd ${projectName}`);
