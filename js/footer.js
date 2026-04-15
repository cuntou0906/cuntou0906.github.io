$(document).ready(function () {
  // ========== 站内搜索功能 ==========
  
  // 搜索切换按钮点击事件
  $('#searchToggleBtn').on('click', function(e) {
    e.preventDefault();
    toggleSearchPanel();
  });
  
  // 关闭搜索结果面板
  $('#searchResultsClose').on('click', function() {
    hideSearchPanel();
  });
  
  // 搜索按钮点击事件
  $('#searchSubmitBtn').on('click', function() {
    var keyword = $('#sidebar-search-input').val();
    if (keyword.trim()) {
      var results = searchItems(keyword);
      displaySearchResults(results);
    }
  });
  
  // 搜索输入框回车事件
  $('#sidebar-search-input').on('keypress', function(e) {
    if (e.which === 13) {
      var keyword = $(this).val();
      if (keyword.trim()) {
        var results = searchItems(keyword);
        displaySearchResults(results);
      }
    }
  });
  
  // 切换搜索面板显示/隐藏
  function toggleSearchPanel() {
    var $panel = $('#searchResultsPanel');
    if ($panel.is(':visible')) {
      hideSearchPanel();
    } else {
      showSearchPanel();
    }
  }
  
  function showSearchPanel() {
    var $panel = $('#searchResultsPanel');
    $panel.slideDown(300);
    // 自动聚焦到搜索框
    setTimeout(function() {
      $panel.find('input').first().focus();
    }, 300);
  }
  
  function hideSearchPanel() {
    var $panel = $('#searchResultsPanel');
    $panel.slideUp(300);
    // 清空搜索结果
    setTimeout(function() {
      $('#searchResultsContent').html('');
      $('#searchResultsCount').text('');
    }, 300);
  }
  
  // 站内搜索功能 - 基于配置数据搜索
  function searchItems(keyword) {
    var results = [];
    
    if (keyword === '') {
      return { items: [], count: 0 };
    }
    
    keyword = keyword.toLowerCase().trim();
    
    // 从页面数据容器获取所有项目数据
    var $dataContainer = $('#siteSearchData');
    if ($dataContainer.length === 0) {
      return { items: [], count: 0 };
    }

    // ResultStr = $dataContainer.text()
    // ResultStr = ResultStr.replace(/&#34;/g, '"');
    // console.log('搜索数据容器内容:', ResultStr);
    
    var allItems = null;
    try {
      allItems = JSON.parse($dataContainer.text().replace(/&#34;/g, '"'));
    } catch (e) {
      console.error('解析搜索数据失败:', e);
      return { items: [], count: 0 };
    }
    
    // 搜索匹配
    allItems.forEach(function(item) {
      var name = (item.name || '').toLowerCase();
      var description = (item.description || '').toLowerCase();
      
      if (name.indexOf(keyword) !== -1 || description.indexOf(keyword) !== -1) {
        results.push({
          name: item.name || '',
          description: item.description || '',
          url: item.url || '',
          icon: item.img || '',
          element: null
        });
      }
    });
    
    return { items: results, count: results.length };
  }
  
  // 显示搜索结果 - 使用与网站相同的卡片样式
  function displaySearchResults(results) {
    var $content = $('#searchResultsContent');
    var $count = $('#searchResultsCount');
    
    if (results.count === 0) {
      $content.html('<div class="search-no-results"><i class="fas fa-search"></i><br>未找到匹配的结果</div>');
      $count.text('');
      return;
    }
    
    $count.text('共 ' + results.count + ' 个结果');
    
    var html = '<div class="row search-results-list">';
    results.items.forEach(function(item) {
      var imgSrc = item.icon || '';
      // 如果是相对路径，添加前导斜杠
      if (imgSrc && !imgSrc.startsWith('http') && !imgSrc.startsWith('/') && !imgSrc.startsWith('url(')) {
        imgSrc = '/' + imgSrc;
      }
      
      html += '<div class="col-sm-3 search-item">';
      html += '<div style="border-radius: 25px;" class="xe-widget xe-conversations box2 label-info" onclick="window.open(\'' + item.url + '\', \'_blank\'); return false;">';
      html += '<div class="xe-comment-entry">';
      html += '<a href="' + item.url + '" class="xe-user-img">';
      if (imgSrc) {
        html += '<img src="' + imgSrc + '" class="lozad img-circle" loading="lazy" width="40" onerror="this.style.display=\'none\'">';
      }
      html += '</a>';
      html += '<div class="xe-comment">';
      html += '<a href="' + item.url + '" class="xe-user-name overflowClip_1"><strong>' + item.name + '</strong></a>';
      html += '<a href="' + item.url + '"><p class="overflowClip_2">' + (item.description || '') + '</p></a>';
      html += '</div></div></div></div>';
    });
    html += '</div>';
    
    $content.html(html);
  }
  
  // 滚动到匹配项
  function scrollToFirstMatch() {
    var $visibleItems = $('.search-item:visible').first();
    if ($visibleItems.length > 0) {
      $visibleItems[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

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
      $('.IsMenuFoldLi').attr("title", ev.currentTarget.firstElementChild.children[1].innerHTML)
    })

    } else {
      $('.has-sub.expanded > ul').show()

      $('.IsMenuFoldLi').removeAttr("data-toggle")
      $('.IsMenuFoldLi').removeAttr("data-placement")
      $('.IsMenuFoldLi').removeAttr("title")

      $('.main-menu > li').removeClass("IsMenuFoldLi");

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
      document.cookie = "night=1;path=/";
    } else {
      document.cookie = "night=0;path=/";
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
