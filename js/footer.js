
$(document).ready(function () {
  //img lazy loaded
  const observer = lozad();
  observer.observe();

  $(document).on('click', '.has-sub', function () {
    var _this = $(this)

    if (!$(this).hasClass('expanded')) {
      setTimeout(function () {
        _this.find('ul').attr("style", "")
      }, 300);

    } else {
      $('.has-sub ul').each(function (id, ele) {
        var _that = $(this)
        if (_this.find('ul')[0] != ele && !expandAll) {
          setTimeout(function () {
            _that.attr("style", "")
          }, 300);
        }
      })
    }
  })
  $('.user-info-menu .hidden-sm').click(function () {  // 菜单栏缩小放大的按钮

    if ($('.sidebar-menu').hasClass('collapsed')) {
      $('.has-sub.expanded > ul').attr("style", "")
      $('.main-menu > li').addClass("IsMenuFoldLi");
      
      console.log($('.main-menu > span > a'))

      // 菜单栏缩小 时候的悬浮信息 显示
      $('.IsMenuFoldLi').attr("data-toggle", "tooltip")
      $('.IsMenuFoldLi').attr("data-placement", "right")
      $('.IsMenuFoldLi').attr("title", "right")
      $('.IsMenuFoldLi').mouseover(function(ev){       // 菜单折叠时候，鼠标悬浮动态设置
        // var content = $(this).html
        // console.log(ev)
      $('.IsMenuFoldLi').attr("title", ev.currentTarget.firstElementChild.children[1].innerHTML)
        // console.log(ev.currentTarget.firstElementChild.children[1].innerHTML)

    })

      // console.log(1111)
    } else {
      $('.has-sub.expanded > ul').show()

      $('.IsMenuFoldLi').removeAttr("data-toggle")
      $('.IsMenuFoldLi').removeAttr("data-placement")
      $('.IsMenuFoldLi').removeAttr("title")

      $('.main-menu > li').removeClass("IsMenuFoldLi");


      // console.log(2222)
    }
  })

  $("#main-menu li ul li").click(function () {       // 左侧菜单点击响应
    $(this).siblings('li').removeClass('active');   // 删除其他兄弟元素的样式
    $(this).addClass('active');                     // 添加当前元素的样式
  });
  $("a.smooth").click(function (ev) {
    ev.preventDefault();

    public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass('mobile-is-visible');
    ps_destroy();
    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top - 30
    }, {
      duration: 300,
      easing: "swing"
    });
  });
  return false;
});

var href = "";
var pos = 0;
$("a.smooth").click(function (e) {
  $("#main-menu li").each(function () {
    $(this).removeClass("active");
  });
  $(this).parent("li").addClass("active");
  e.preventDefault();
  href = $(this).attr("href");
  pos = $(href).position().top - 30;
});
(function () {
  if (document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '') {
    if (new Date().getHours() > 22 || new Date().getHours() < 6) {
      // document.body.classList.add('night');
      document.cookie = "night=1;path=/";
      // console.log('夜间模式开启');
    } else {
      // document.body.classList.remove('night');
      document.cookie = "night=0;path=/";
      // console.log('夜间模式关闭');
    }
  } else {
    var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
    if (night == '0') {
      // document.body.classList.remove('night');
    } else if (night == '1') {
      // document.body.classList.add('night');
    }
  }
})();
