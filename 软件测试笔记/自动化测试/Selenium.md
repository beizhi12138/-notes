# UI自动化
 现在的Ui自动化Selenium是首选的

 Selenium是一种开源的工具，用于在web浏览器上执行自动化测试

 Selenium 的优势，开源的，可以使用java,python,c#,php,ruby等语言编写测试脚本，可以支持多系统

 可以使用任何浏览器进行测试

 可以与maven Jenkins以及Docker继承以实现持续测试



 ## 功能测试和自动化测试的区别

 功能测试就是满足产品的需求，然后找bug

 自动化测试就是编写脚本，让程序自动运行，减少人工投入，提高效率，回归测试，系统监控。

 ## 自动化测试流程

   常见的自动化测试流程

      1.分析测试需求(根据需求确认哪些功能需要功能需要自动化测试)
           
      2.选择方案

      3.制定测试计划

      4.搭建测试环境

      5.测试用例准备

      6.编写测试脚本

      7.分析结果

## 自动化测试用例和手工用例的区别
  步骤的不同

  测试精度不一样

## 自动化测试用例的要点

     ID log-1

     模块  要测试的模块(比如:登录)

     测试点 

     前提条件 系统运行正常

     步骤 测试步骤

     预期结果

     实际结果
## Selenium的工作原理

   1.脚本

   2.创建Driver

   3.启动浏览器，绑定浏览器在特定端口

   4.发送请求到浏览器

   5.执行响应的操作

   6.响应

# 环境安装及配置

  安装javaIDE
  
  安装java jdk

  安装Selenium-java(是java的一个包使用在这个包内置的API进行自动化测试)

  安装web-driver(浏览器驱动)  浏览器驱动需要去淘宝镜像/其他镜像网站进行下载




```java
/**
  初始化使用
 */
 public class test {
    public static void main(String[] args) {
        //如果是chrome新版本的话需要设置参数
        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.addArguments("--remote-allow-origins=*");//解决 403 出错问题
//        chromeOptions.setExperimentalOption("prefs", chromePreferences);

        /**
          第一个参数需要根据浏览器比如火狐就要写forfix
          第二个参数是浏览器驱动需要的路径，需要自己下载
         */
        System.setProperty("webdriver.chrome.marionette", "D:\\learnANDstudy\\web_auto_test\\chromedriver_win32\\chromedriver.exe");
        WebDriver driver;
        driver=new ChromeDriver(chromeOptions);
        driver.get("http://www.baidu.com");
    }
}
```
# 元素处理
## HTML元素定位基础
   就是使用浏览器开发者工具选中标签，然后对于元素定位就是根据标签，class，id去进行定位元素

   selenium里提供了findElement方法用来获取Dom，findElement方法里只接受By类型的参数By类型主要是通过className/id的方式来进行获取到Dom元素

    By方法
      className class名称
      tagName 标签名
      id id值

```java
/**
 获取元素demo
 */

//如果是chrome新版本的话需要设置参数
        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.addArguments("--remote-allow-origins=*");//解决 403 出错问题
//        chromeOptions.setExperimentalOption("prefs", chromePreferences);

        System.setProperty("webdriver.chrome.marionette","D:\\learnANDstudy\\web_auto_test\\chromedriver_win32\\chromedriver.exe");
        WebDriver driver;
        driver=new ChromeDriver(chromeOptions);

        driver.get("https://www.imooc.com/user/newlogin");
        //tagName 标签名
        driver.findElement(By.tagName("input")).sendKeys("2603666984@qq.com");
        driver.findElement(By.name("password")).sendKeys("1111111");
        //class Name class名称
        driver.findElement(By.className("moco-btn")).click();
        driver.findElement(By.className("xa-showSignup")).click();
//        文本匹配标签
//        driver.findElement(By.partialLinkText("快速注册")).click();
        driver.findElement(By.className("ipt-phone")).sendKeys("13718938362");
//        driver.findElement(By.partialLinkText("同意")).click();
        driver.findElement(By.className("auto-cbx")).click();
        driver.findElement(By.className("reSend")).click();
       //windows对象
        driver.manage().window().maximize();
        driver.get("http://www.imooc.com/");
        driver.findElement(By.className("search-input")).sendKeys("实战");
        driver.findElement(By.className("showhide-search")).click();
       //通过获取父元素，拿到子元素集合
        WebElement ele_nav=driver.findElement(By.className("tab_con"));
        List<WebElement> list=ele_nav.findElements(By.tagName("a"));
        list.get(3).click();
```
     
## 常见元素处理及函数
  其实对于元素处理的话，无非就是找到元素，找到元素之后开始进行点击事件测试。

  如果是隐藏元素的话可以通过执行js进行修改元素(执行js修改元素的话一定要使进程等待几秒等待js执行完成之后再执行测试代码)

  对于className一样的元素可以通过xpath进行查找元素
 ### 单选框
   
   click  
   
   isSelected 是否被选中

  ###  文本框
   sendKys 输入内容

   clear 清空内容

  ### 多选框
    
    click

    isSelected

    isEnabled 多选框是否有效
### 按钮

   click

   isEnabled

### 下拉框元素

  #### 下拉框操作(select标签)
    getAllSelectedoptions  获取所有选中的options

    getFristSelectedOption().getText()
     获取选中的元素的文本

  
  适用于多选下拉列表
  
     deselectAll  不选择所有元素

     deselectByValue 不选择对应value的元素

     deselectByVisibleText  不选择对应text的元素

### 元素进阶操作
```java

  //左击事件
  Actions action =new Actions()
  acrion.click(WebElement).perform()

  //右击 事件
   action.contentClick(WebElement).perform()
  //双击事件
    action.doubleClick(WebElement).perform()
  //悬停事件(hover)
     action.moveToElement(WebElement).perform()

     /**
       perform是提交
      */
  ```

  ### 特殊窗体切换处理

 ####  iframe 处理
      switchTo

      getWindowHandles


#### 弹窗处理

      switchTo

      getWindowHandle  获取当前页面的窗口

      getWindowHandles 获取窗口集合

 ```java
driver.switchTo.frame(By) //选择到ifrmae标签，将driver切换到iframe里的element

Set<String> handels=driver.getWindowHandles();

//getWindowHandles 获取所有的tab切换的窗口


driver.switchTo.window(handel_item);//切换tab窗口
 ```     
  ```java

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class Ele_driverUtil {
    private WebDriver driver;
    public void initDriver(){
        //注册驱动
        System.setProperty("webdriver.chrome.marionette","D:\\learnANDstudy\\web_auto_test\\chromedriver_win32\\chromedriver.exe");
         ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.addArguments("--remote-allow-origins=*");
        this.driver=new ChromeDriver(chromeOptions);
    }

    /**
     * 输入框
     */
    public void inpuBox(){
        driver.get("https://www.imooc.com/user/newlogin");
        driver.manage().window().maximize();
       WebElement login_input=driver.findElement(By.name("email"));
       login_input.sendKeys("12345678911");
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        login_input.clear();
        String s=login_input.getAttribute("placeholder");
        System.out.println(s);

    }

    /**
     * 单选框
     */
    public void radioBox(){
        driver.get("https://juejin.cn/user/settings/message");
        /**
         * 找到input的id包含kw的，
         *
         * xpath是通过元素的路径来找到元素，就是div/div/input这种方式，这种方式的效率很慢
         * xpth的路径可以直接在控制台的copy 的copy xpath
         */
        WebElement label= driver.findElement(By.xpath("//*[@id=\"juejin\"]/div[1]/main/div[3]/div[2]/div/div/div/div/label[1]/span[1]/span"));
       if(label.isSelected()){
           label.click();
       }else{
           System.out.println("未被选中");
       }
    }
}


/***执行js */
String js_code="document.getElement("id")"
JavascriptExecutor js=(JavascriptExecutor) driver;
js.exevuteScript(js_code);


/**
 下拉框操作
 */

WebElement job= driver.findElement(By.id("select"));
Select list=new Select(job);
//选中元素
 list.SelectByIndex / list.SelectByValue 
  ```

  ### 等待函数

  #### 强制等待

    Thread.sleep(2000)

  #### 显式等待
  在10秒内找元素，找不到就会报错
   WebDriverWait wait=new WebDriverWait(driver,10);

   wait.until(ExpectedConditios.preseneceOfElementLocated(By));
  #### 隐式等待

  在20秒内找元素，如果没找到会报错
  driver.manage.timeouts.imlicitlywait(20,TimeUnit.SECONDS)  
### 读取配置文件进行自动化测试
    如果想让自动化脚本进行一个通用的方式，那么就是进行读取配置文件来进行测试
## 基础面试

 1、如何使用自动化测试工具

    webpc端使用selenium 结合 xxxx左的自动化测试框架

  2、使用自动化测试工具中遇见的问题

       定位不到元素 原因:dom树没有被加载出来 解决方式:分析问题出现的原因，使用重试或者等待函数

  3、selenium的工作原理

     参考上面写的     
          
  4、常用的元素定位方式
    xpath / class / id 定位

   5、上传图片有几种方式
     input的话使用sendKeys()

     非input的话使用第三方工具比如:auto it

    6、如何定位动态元素
       使用xpath  
            
```java
  //登录脚本
  package mooc;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;

import javax.swing.*;

public class Test {
    private static WebDriver driver;

    static {
        System.setProperty("webdriver.chrome.marionette", "D:\\learnANDstudy\\web_auto_test\\chromedriver_win32\\chromedriver.exe");
        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(chromeOptions);
        driver.get("http://www.imooc.com");
        driver.manage().window().maximize();
    }

    public void loginScript() throws InterruptedException {
        WebElement login=this.find_ele("id","js-signin-btn");
        login.isDisplayed();
        login.click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        WebElement userName=this.find_ele("name","email");
        userName.isDisplayed();

        /**
         * 进行登录操作
         */
        WebElement password=this.find_ele("name","password");
        password.isDisplayed();
        WebElement submit=this.find_ele("class","xa-login");
        userName.sendKeys("15538528773");
        password.sendKeys("200212aa");
        submit.isDisplayed();
        submit.click();
        //登录完成之后等待3秒请求响应
        Thread.sleep(3000);
        WebElement header=this.find_ele("id","header-user-card");
        Actions heade_action=new Actions(driver);
        heade_action.moveToElement(header);
        String login_userName=this.find_ele("class","text-ellipsis").getTagName();
        System.out.println("登录账户为"+login_userName);
    }

    public WebElement find_ele(String by,String value){
        if(by.equals("id")){
            return driver.findElement(By.id(value));
        }else if(by.equals("name")){
            return driver.findElement(By.name(value));
        }else if(by.equals("class")){
            return driver.findElement(By.className(value));
        }else{
            return driver.findElement(By.xpath(value));
        }
    }
}


```

## Testng
  
 ### 通过监听事件登录脚本失败，自动截图

   继承testng提供的TestListenerAdapter类


 ~~~!!!!!!!!!!!!!!!!后续会进行更新  