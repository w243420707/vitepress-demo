# GitHub 使用指南

## 01.1- 简介

GitHub 是全球最大的代码托管平台，为开发者提供了强大的版本控制、协作开发和项目管理功能。

## 01.2- 基础概念

### 01.21- 仓库（Repository）

仓库是项目的存储空间，包含项目的所有文件、文件夹和每个文件的修订历史。

### 01.22- 分支（Branch）

分支允许您在不影响主分支的情况下开发新功能或修复问题。

### 01.23- 提交（Commit）

提交是对文件所做的更改的记录，每次提交都会生成一个唯一的 ID。

### 01.24- Pull Request

Pull Request 是请求将您的更改合并到主分支的请求，便于代码审查和讨论。

## 01.3- 快速开始

### 01.31- 创建账户

访问 [GitHub 官网](https://github.com) 注册账户。

### 01.32- 创建仓库

1. 点击右上角的 "+" 按钮
2. 选择 "New repository"
3. 填写仓库名称和描述
4. 选择公开或私有
5. 点击 "Create repository"

### 01.33- 克隆仓库

```bash
git clone https://github.com/username/repository.git
```

### 01.34- 创建分支

```bash
git checkout -b feature-branch
```

### 01.35- 提交更改

```bash
git add .
git commit -m "添加新功能"
git push origin feature-branch
```

### 01.36- 创建 Pull Request

在 GitHub 网页上创建 Pull Request，等待审核和合并。

## 01.4- 常用操作

### 01.41- Fork 项目

Fork 允许您复制他人的项目到自己的账户下进行修改。

### 01.42- Star 项目

Star 表示您喜欢该项目，方便日后查找。

### 01.43- Watch 项目

Watch 可以让您接收到项目的更新通知。

### 01.44- Issues

Issues 用于报告问题、请求功能或讨论想法。

## 01.5- 最佳实践

1. **编写清晰的提交信息** - 让其他人了解每次提交的目的
2. **使用分支开发** - 不要直接在主分支上开发
3. **定期同步** - 保持本地仓库与远程仓库同步
4. **代码审查** - 通过 Pull Request 进行代码审查
5. **文档完善** - 为项目添加 README 和必要的文档

## 01.6- 相关资源

- [GitHub 官方文档](https://docs.github.com)
- [Git 基础教程](/91git)
- [全部资源概述](/全部资源概述)
