$(document).ready(function () {

    var PageNum_Max = Get_PageNum_Max(); // 每页显示的数据
    // console.log($(".row").length)
    // 假设我们要遍历所有的row元素
    $(".row").each(function(index,Current_RowElements) {
        // 在这里处理每个row元素
        // console.log(Current_RowElements)
        var Current_RowElements_Num =  Current_RowElements.children.length; // 获取元素数量
        // console.log(Current_RowElements_Num); // 输出数量
        // console.log(element.textContent); // 打印每个row元素的内容
        if(Current_RowElements_Num<PageNum_Max + 1){
            // console.log($(Current_RowElements).siblings(".page_btn"))
            $(Current_RowElements).siblings(".page_btn").hide();
            // console.log("列表项少于最大的，不显示分页操作")
        }
        else{
            var Lex = (Current_RowElements_Num-PageNum_Max); // 第PageNum_Max个以后得元素隐藏
            $(Current_RowElements).children().slice(-Lex).hide(); //初始化，前面的数据显示，后面的隐藏
            var current_num = 1; // 当前页数
            var total_page = Math.ceil(Current_RowElements_Num / PageNum_Max); //总页数
            // console.log("总页数："+total_page)
            // console.log($(Current_RowElements).siblings(".page_btn"))
            $(Current_RowElements).siblings(".page_btn").find("span.total_Page").text(total_page); //显示总页数


            var PrePage = $(Current_RowElements).siblings(".page_btn").find("a.PrePage");
            var NextPage = $(Current_RowElements).siblings(".page_btn").find("a.NextPage");
            var TurnPage = $(Current_RowElements).siblings(".page_btn").find("a.TurnPage");

            $(Current_RowElements).siblings(".page_btn").find("span.current_page").text(current_num); //当前的页数

            // 下一页
            $(NextPage).click(function () {
                var PageNum_Max = Get_PageNum_Max(); // 每页显示的数据
                // console.log("点击下一页")
                var ClickCurrent_RowElements = $(this).parents(".page_btn").siblings(".row");
                // console.log(ClickCurrent_RowElements)
                var current_num = $(ClickCurrent_RowElements).siblings(".page_btn").find("span.current_page").text(); //当前的页数
                var total_page = $(ClickCurrent_RowElements).siblings(".page_btn").find("span.total_Page").text(); //当前的页数
                // console.log(current_num)
                current_num = parseInt(current_num);
                total_page = parseInt(total_page);
                if (current_num == total_page) {
                    return false;
                } else {
                    $(ClickCurrent_RowElements).siblings(".page_btn").find("span.current_page").text(++current_num); // 当前页数加1
                    $(ClickCurrent_RowElements).children().each(function (index, item) {
                        var start = PageNum_Max * (current_num - 1);
                        var end = PageNum_Max * current_num;
                        // console.log(item)
                        if (index >= start && index < end) {
                            $(item).show();
                        } else {
                            $(item).hide();
                        }
                    })
                }
            })

            // 上一页
            $(PrePage).click(function () {
                var PageNum_Max = Get_PageNum_Max(); // 每页显示的数据
                // console.log("点击上一页")
                var ClickCurrent_RowElements = $(this).parents(".page_btn").siblings(".row");
                // console.log(ClickCurrent_RowElements)
                var current_num = $(ClickCurrent_RowElements).siblings(".page_btn").find("span.current_page").text(); //当前的页数
                var total_page = $(ClickCurrent_RowElements).siblings(".page_btn").find("span.total_Page").text(); //当前的页数
                // console.log(current_num)
                current_num = parseInt(current_num);
                total_page = parseInt(total_page);
                if (current_num == 1) {
                    return false;
                } else {
                    $(ClickCurrent_RowElements).siblings(".page_btn").find("span.current_page").text(--current_num); // 当前页数加1
                    $(ClickCurrent_RowElements).children().each(function (index, item) {
                        var start = PageNum_Max * (current_num - 1);
                        var end = PageNum_Max * current_num;
                        // console.log(item)
                        if (index >= start && index < end) {
                            $(item).show();
                        } else {
                            $(item).hide();
                        }
                    })
                }
            })

            // 跳转到某一页
            $(TurnPage).click(function () {
                var PageNum_Max = Get_PageNum_Max(); // 每页显示的数据
                // console.log("跳转到某一页")
                var ClickCurrent_RowElements = $(this).parents(".page_btn").siblings(".row");
                // console.log(ClickCurrent_RowElements)
                var TurnPage_num = $(ClickCurrent_RowElements).siblings(".page_btn").find("input.PageInput")[0].value; //当前的页数
                TurnPage_num = parseInt(TurnPage_num);
                // 在控制台输出值
                // console.log(TurnPage_num)
                if(!Number.isInteger(TurnPage_num)){
                    return false;
                }
                var current_num = $(ClickCurrent_RowElements).siblings(".page_btn").find("span.current_page").text(); //当前的页数
                var total_page = $(ClickCurrent_RowElements).siblings(".page_btn").find("span.total_Page").text(); //总页数
                current_num = parseInt(current_num);
                total_page = parseInt(total_page);
                if (TurnPage_num > total_page) {
                    return false;
                } else if(TurnPage_num <1) {
                    return false;
                }
                else {
                    $(ClickCurrent_RowElements).siblings(".page_btn").find("span.current_page").text(TurnPage_num); // 当前页数加1
                    $(ClickCurrent_RowElements).children().each(function (index, item) {
                        var start = PageNum_Max * (TurnPage_num - 1);
                        var end = PageNum_Max * TurnPage_num;
                        // console.log(item)
                        if (index >= start && index < end) {
                            $(item).show();
                        } else {
                            $(item).hide();
                        }
                    })
                }
            })


            
        }
    });

})

    // 判断网页打开的设备
function isMobileDevice() {  
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}   

function Get_PageNum_Max() {  
    if (isMobileDevice()) {
        // console.log("Mobile device detected");
        // 手机端处理
        return 10; // 每页显示的数据
      } else {
        // console.log("Desktop device detected");
        // PC端处理
        return 20; // 每页显示的数据
      }

}

// 输入框按下回车
function handleEnter_TurnPage(event, inputElement) {
    // 检查按下的键是否是回车键
    if(event.key === "Enter") {
        // 阻止表单提交
        event.preventDefault();
        // 获取输入框的值
        var TurnPage_num = inputElement.value;
        TurnPage_num = parseInt(TurnPage_num);
        // 在控制台输出值
        // console.log(TurnPage_num)
        if(!Number.isInteger(TurnPage_num)){
            return false;
        }
        var PageNum_Max = Get_PageNum_Max(); // 每页显示的数据
        // console.log("输入框按下回车")
        var ClickCurrent_RowElements = $(inputElement).parents(".page_btn").siblings(".row");
        // console.log(ClickCurrent_RowElements)
        var current_num = $(ClickCurrent_RowElements).siblings(".page_btn").find("span.current_page").text(); //当前的页数
        var total_page = $(ClickCurrent_RowElements).siblings(".page_btn").find("span.total_Page").text(); //总页数
        current_num = parseInt(current_num);
        total_page = parseInt(total_page);
        if (TurnPage_num > total_page) {
            return false;
        } else if(TurnPage_num <1) {
            return false;
        }
        else {
            $(ClickCurrent_RowElements).siblings(".page_btn").find("span.current_page").text(TurnPage_num); // 当前页数加1
            $(ClickCurrent_RowElements).children().each(function (index, item) {
                var start = PageNum_Max * (TurnPage_num - 1);
                var end = PageNum_Max * TurnPage_num;
                // console.log(item)
                if (index >= start && index < end) {
                    $(item).show();
                } else {
                    $(item).hide();
                }
            })
        }


    }
}



function scrollToSubMenu(elementId) {
    document.getElementById(elementId).scrollIntoView({ behavior: 'smooth' });
}

// document.getElementById('SideMenu').addEventListener('scroll', function() {
//     console.log(1111)
//     document.getElementById('MainContentDiv').style.overflowY = 'hidden'; // 禁用内容区域的滚动
// });

// // 监听内容区域的滚动事件
// document.getElementById('MainContentDiv').addEventListener('scroll', function() {
//     console.log(22222)
//     document.getElementById('SideMenu').style.overflowY = 'hidden'; // 禁用导航栏的滚动
// });
