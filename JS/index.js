 //封装一个document.getElementById
function byId(id){
     return typeof(id) === "string"?document.getElementById(id):id;
}

var index=0,
    timer=null,
    pics=byId("banner").getElementsByTagName("div"),
    dots=byId("dots").getElementsByTagName("span"),
    prev=byId("prev"),
    next=byId("next"),
    len=pics.length,
    menu=byId("menu-content"),
    subMenu=byId("sub-menu"),
    innerBox=subMenu.getElementsByClassName("inner-box"),
   menuItems=menu.getElementsByClassName("menu-item");

    



function slideImg(){
   
   var main=byId("main");
   main.onmouseover=function(){

   	//  当鼠标划过图片，清除定时器
    if(timer) clearInterval(timer);
   }
   main.onmouseout=function(){
   	//当鼠标离开图片,添加定时器
   	timer=setInterval(function(){
   		index++;
      if(index >= len){
         index=0;    
      }
      changeImg();
   	},3000)

   }
   //自动触发轮播图。添加一个onmouseout方法
   main.onmouseout();
   
 
   //遍历所有的圆点，绑定点击事件，点击小圆点，调到第几张图片
   for(var d=0;d<len;d++){
    //给span添加一个id属性，值为d，做为当前索引
     dots[d].id=d;
     dots[d].onclick=function(){
        index=this.id;
        
        //这里需要调用changeImg函数，切换图片
        changeImg();
     }
   }
     //下一张
     next.onclick=function(){
       index++
       if(index >= len) index=0;
       changeImg();
     }
     //上一张
     prev.onclick=function(){
      index--
      if(index<0) index=len-1;
      changeImg();
     }
     //导航菜单
     //遍历主菜单，绑定onmouseover事件
     for( var m=0;m<menuItems.length;m++){

         //给每一个menu-item自定义data-index属性，做为索引
         menuItems[m].setAttribute("data-index",m)
        menuItems[m].onmouseover=function(){
          
          //遍历所有子菜单，将它隐藏
           for(var j=0;j<innerBox.length;j++){
                  innerBox[j].style.display='none';
                  menuItems[j].style.background="none";
           }
           var idx=this.getAttribute("data-index");
           subMenu.className="sub-menu";
           innerBox[idx].style.display='block';
           menuItems[idx].style.background='rgba(0,0,0,0.2)';

        }
     }
   //划过主菜单，子菜单显示出来,离开主菜单，子菜单消失
   menu.onmouseover=function(){
      subMenu.className="sub-menu";
   }
   menu.onmouseout=function(){
      subMenu.className="sub-menu hide";
   }
   //划入子菜单，子菜单显示，离开子菜单，子菜单消失
   subMenu.onmouseover=function(){
     this.className="sub-menu";
   }
   subMenu.onmouseout=function(){
     this.className="sub-menu hide";
   }

}
//切换图片需要多次调用，所以需要封装一个函数切换图片
function changeImg(){
  //遍历banner下的div及dots下的span，将其清楚
  for(var i=0;i<len;i++){
      pics[i].style.display="none";
      dots[i].className="";
  }
  //根据index找到当前div的位置，将它显示出来
  pics[index].style.display="block";
  dots[index].className="active";
}


slideImg();