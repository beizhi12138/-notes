# 什么是three.js
Three.js是一款运行在浏览器中的 3D 引擎（基于WebGL的API的封装）
# 什么是WebGL？

WebGL（英语：Web Graphics Library）是一种3D绘图协议，这种绘图技术标准允许把JavaScript和OpenGL ES 2.0结合在一起，通过增加OpenGL ES 2.0的一个JavaScript绑定，WebGL可以为HTML5 Canvas提供硬件3D加速渲染，这样Web开发人员就可以借助系统显卡来在浏览器里更流畅地展示3D场景和模型了，还能创建复杂的导航和数据视觉化。显然，WebGL技术标准免去了开发网页专用渲染插件的麻烦，可被用于创建具有复杂3D结构的网站页面，甚至可以用来设计3D网页游戏等等。


## three.js
 本地环境搭建，因为spring的官方文档是访问起来比较慢，所以我们在本地搭建起来three.js的官方文档和案例

首先访问https://github.com/mrdoob/three.js 通过 git或者压缩包把代码下载到本地

## 使用parcel搭建three.js开发环境

 为什么需要使用parcel 因为parcel不需要配置。webpack需要去进行配置。
 
## 第一个Three.js小demo

```JavaScript
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//创建场景

const scence=new THREE.Scene();

//创建相机

const camera=new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
)

//设置相机位置

camera.position.set(0,0,10);

//添加相机到场景
scence.add(camera);

//创建物体
 

//创建集合体
const geometry=new THREE.BoxGeometry(1,1,1);
//创建材质
const meterial=new THREE.MeshBasicMaterial({color:0x00ff00});

 
//根据几何体和材质，创建物体
const  cube=new THREE.Mesh(geometry,meterial);
  //控制物体移动
  let x=0,y=1,z=0;
  console.log(cube);
  //缩放
  cube.scale.set(.5,1,1.5);
  //旋转

//   cube.rotation.set(Math.PI/2,Math.PI*2,Math.PI/3,"YXZ");
cube.rotation.set(Math.PI/4,0,0,"YZX");
//将物体添加到场景中

scence.add(cube);

//初始化渲染器

const renderer=new THREE.WebGLRenderer();

//设置渲染器的尺寸大小

renderer.setSize(window.innerWidth,window.innerHeight);

//将webgl渲染的fcanvas内容添加到body

document.body.append(renderer.domElement);
//添加坐标轴辅助器

const axesHelper = new THREE.AxesHelper( 5 );
scence.add( axesHelper );

//添加控制器,只有添加了控制器才能拖动查看

const controller=new OrbitControls(camera,renderer.domElement);

//每一帧渲染一次
const render=()=>{
    x+=0.01;y+=0.01;z+=0.01;
    if(x >5|| y >5 || z>5){x=0;y=0;z=0;}
    cube.position.set(x,y,z);
    cube.rotation.x+=0.01;
    //使用渲染器，通过相机将场景渲染出来
    renderer.render(scence,camera);
    // requestAnimationFrame函数是浏览器提供了，浏览器每次请求一帧则执行一次回调
    requestAnimationFrame(render);
}
render();
```
## 应用requestAnimationFrame

```JavaScript
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const scence=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
)
camera.position.set(0,0,10);
scence.add(camera);
const geometry=new THREE.BoxGeometry(1,1,1);
const meterial=new THREE.MeshBasicMaterial({color:0x00ff00});
const  cube=new THREE.Mesh(geometry,meterial);
  let x=0,y=1,z=0;
  console.log(cube);
  cube.scale.set(.5,1,1.5);
cube.rotation.set(Math.PI/4,0,0,"YZX");
scence.add(cube);
const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.append(renderer.domElement);
const axesHelper = new THREE.AxesHelper( 5 );
scence.add( axesHelper );
const controller=new OrbitControls(camera,renderer.domElement);
const render=(time)=>{
    /**
     * time参数表示每一帧的时间
     * 
     * 
     * x+=0.01;y+=0.01;z+=0.01;
     * 
     * 像这样每次加0.1是不对的，因为电脑的性能问题，会导致物体运动的不一样。
     * 所以我们需要让物体有规律的运行
     * 
     * 
     */

    //比如设置1秒运动多少
    const t=time/1000 %5;
    cube.rotation.x=t*1;
    x=t*1,y=t*1,z=t*1;
    cube.position.set(x,y,z);
    renderer.render(scence,camera);
    requestAnimationFrame(render);
}
render();
```