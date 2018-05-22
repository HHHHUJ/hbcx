## 航班查询接口文档 ##
[TOC]

### HTTP
#### HEADER
- **参数**

> | 参数名 | 参数类型 | 参数说明 |
> | :-------- | :--------| :------ |
> | app_token | String | token |
> | app_auth | String | 权限验证 |
> | app_auth_iv | String | 权限验证 |
> | app_version | String | 版本 |
> | lang | String | 语言 |

- **备注**
> 需要登录之后才能访问的页面，接口需要添加以上头信息。

### 公共接口


### 登录注册

#### 接口说明 **1、**登录--验证密码

- **请求URL**
> [user/login](#)

- **请求方式** 
>**GET**

- **请求参数**
> | 请求参数 | 参数类型 | 参数说明 |
> | :-------- | :--------| :------ |
> | mobile| <mark>String,**不可为空**</mark> | 手机号 |
> | password| <mark>String,**不可为空**</mark> | 登录密码 |

- **返回参数** 
> | 返回参数 | 参数类型 | 参数说明 |
> | :-------- | :--------| :------ |
> | code | Integer | 执行结果code |
> | msg | String | 执行结果消息 |
> | data | obj() | 返回数据 |

- **返回示例**

```json 
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "user_name": "name",
    "app_token": "app_token"
  }
}
```

#### 接口说明 **2、**注册

- **请求URL**
> [user/register](#)

- **请求方式** 
>**GET**

- **请求参数**
> | 请求参数 | 参数类型 | 参数说明 |
> | :-------- | :--------| :------ |
> | mobile | <mark>String,**不可为空**</mark> | 手机号 |
> | code | <mark>String,**不可为空**</mark> | 短信验证码 |
> | password |  <mark>String,**不可为空**</mark>  | 密码 |

- **返回参数** 
> | 返回参数 | 参数类型 | 参数说明 |
> | :-------- | :--------| :------ |
> | code | Integer | 执行结果code |
> | msg | String | 执行结果消息 |
> | data | obj() | 返回数据 |

- **返回示例**

```json 
{
  "code": 200,
  "msg": "操作成功",
  "data": {}
}
```

#### 接口说明 **3、**忘记密码

- **请求URL**
> [user/reset_password](#)

- **请求方式** 
>**GET**

- **请求参数**
> | 请求参数 | 参数类型 | 参数说明 |
> | :-------- | :--------| :------ |
> | mobile | <mark>String,**不可为空**</mark> | 手机号 |
> | code | <mark>String,**不可为空**</mark> | 短信验证码 |
> | password |  <mark>String,**不可为空**</mark>  | 密码 |

- **返回参数** 
> | 返回参数 | 参数类型 | 参数说明 |
> | :-------- | :--------| :------ |
> | code | Integer | 执行结果code |
> | msg | String | 执行结果消息 |
> | data | obj() | 返回数据 |

- **返回示例**

```json 
{
  "code": 200,
  "msg": "操作成功",
  "data": {}
}

```
#### 接口说明 **3、**任务列表

- **请求URL**
> [task/currenttask](#)

- **请求方式** 
>**GET**

- **请求参数**
无

- **返回参数** 
> | 返回参数 | 参数类型 | 参数说明 |
> | :-------- | :--------| :------ |
> | code | Integer | 执行结果code |
> | msg | String | 执行结果消息 |
> | data | obj() | 返回数据 |

- **返回示例**

```json 
{
  "code": 200,
  "msg": "操作成功",
  "data": {
      "id_task":"任务id",
      "go_off":"出发日期",
      "is_delete":"是否删除",
      "from_place":"出发地",
      "to_place":"目的地" 
  }
}



```
#### 接口说明 **3、**监视记录

- **请求URL**
> [task/record](#)

- **请求方式** 
>**GET**

- **请求参数**
> | 请求参数 | 参数类型 | 参数说明 |
> | :-------- | :--------| :------ |
> | id_task | <mark>Integer,**不可为空**</mark> | 任务id |

- **返回参数** 
> | 返回参数 | 参数类型 | 参数说明 |
> | :-------- | :--------| :------ |
> | code | Integer | 执行结果code |
> | msg | String | 执行结果消息 |
> | data | obj() | 返回数据 |

- **返回示例**

```json 
{
  "code": 200,
  "msg": "操作成功",
  "data": {
      "go_off":"出发日期",
      "price":"价格"
  }
}






