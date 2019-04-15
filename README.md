# 前端架构总揽

整个前端的架构我会使用vue、vue-router、vuex 等类库，做为前端开发的主基调。完成整个网站的搭建。

###### 模块拆解与技术架构模型说明：

## 1、模块拆解：

#### 用户认证模块：

​	用户注册，用户登录，分配权限，翻译项目从属关系。

#### 内容展示模块：

##### 	英文->中文：

##### 		翻以前

​				新建任务，定义文档和任务的属性模型（增、删、改、查）

​				上传文件（增、删、改、查）

​				分配任务功能

​				读取office的文档内容。

​				分析office的格式，保留一部分必要的格式。

​				前端保留解析格式模型

​				翻译数据的常量定义（特有行业或名词解释与定义）

##### 		翻译中

​				翻译内容格式定义与切换

​				翻译数据的数据统计

​				翻译数据的定义

​				推荐翻译数据列表

##### 		校对翻译

​				指正问题（问题类型？）

​				数据统计

​				提交完成

##### 		完成翻译

​				文章标志位

​				所有的历史数据汇总

​				

##### 	中文->英文：

​		翻以前

​			（同上定义）

​		翻译中

​			（同上定义）

​		校对翻译

​			（同上定义）

​		完成翻译

​			（同上定义）

​			

内容处理模块：

​	历史信息记录与恢复

​	

## 2、技术架构说明：

​	使用VUE+VUEX+VUE-ROUTER完成。整个前端的架构。保证chrome version 72 + 版本，无问题。

​        技术难点与重点分析：

​		1、UBB代码解析。用于存储和展现页面与word等文档的格式。

​		2、使用Echart做图表分析工具

​		3、使用drawTable的技术方式，实现table内容的展示与编辑

​                4、架构说明图，详见translation_systems_mind.xmind