Check-pre-push
-----

> git是现在市面上最流行的版本控制工具，书写良好的commit message能大大提高代码维护的效率。但是在日常开发中由于缺少对于commit message的约束，导致填写内容随意、质量参差不齐，可读性低亦难以维护。在项目中引入commit message规范已是迫在眉睫。
此插件旨在解决git commit 不规范，推送分支不规范等问题。插件基于husky 来进行git hooks操作，主要用到pre-commit、commit-msg、pre-push等hooks。

### 功能
- commit时对commit message进行校验，校验失败则不发起commit。
- 在commit前对暂存区文件进行lint校验，lint失败则退出commit。
- 在push之前对分支名进行校验，校验失败推出push。
### Install
```json
# 安装相关依赖
npm install --save-dev check-pre-push husky lint-staged
# 初始化
npx husky install
# 设置prepare自动初始化
npm set-script prepare "husky install"
# 安装hooks，写入执行命令
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg "npm run check-msg"
npx husky add .husky/pre-push "npm run check-branch"
```

### Usage
在package添加
```json
...
"script": {
	"check-branch": "check-pre-push --branch",
  "check-msg": "check-pre-push --msg"
},
"lint-staged": {
  "*.{vue,js,ts}": "eslint --fix"
},
"check-pre-push": {
  "pattern": "^(master|develop){1}$|^(feature|fix|hotfix|release)/.+$",
  "errorMsg": "分支命名不规范。",
  "commitTag": [
    "feat",
    "fix",
    "docs",
    "style",
    "ref",
    "test",
    "chore"
  ]
},
...
```
除了在package.json中定义，还能以文件 .check-pre-push、.check-pre-push.json 或 .check-pre-push.js 的形式配置check-pre-push。

check-pre-push 内pattern为分支命名约束正则， errorMsg为分支报错提示，commitTag为commit匹配tag。

### Commit 规范
commit标准格式遵守Angular提交准则，格式如下：
```html
<类型>(可选的涉及文件范围): <描述>
 
[可选的正文]
 
[可选的脚注]
```

本工具只对<类型>(范围-可选):<描述>进行限制，如 feat(数据详情): 新增弹窗。
type内容可配置，默认为下：
```json
# 主要type
feat:     增加新功能
fix:      修复bug
# 特殊type
docs:     只改动了文档相关的内容
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动，例如webpack，npm
ref:      代码重构时使用
revert:   执行git revert打印的message
# 不常用
test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
```

当一次改动包括主要type与特殊type时，统一采用主要type。

### 分支命名规范
除标准的devlop和master外，支持feature、fix、hotfix、release功能分支，例如feature/test1。
