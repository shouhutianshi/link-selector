var $btn = $('.btn')
var $modalBox = $('.modal-box')
var $modalClose = $('.modal-close')
var $tabs = $('.tabs')
var $modal = $('#modal-pagnation')

// 模态框的打开与关闭
function showAndHide(el) {
  el.on('click', function () {
    if ($modalBox.is(":hidden")) {
      $modalBox.show()
      $modal.page(url, defaultParams)
      return false
    } else {
      $modalBox.hide()
    }
  })
}

showAndHide($btn)
showAndHide($modalClose)

// 分页器
$tabs.on('click', 'li', function () {
  var params = $.extend({}, defaultParams, {
    category: $(this).text()
  })
  $(this).addClass('active-tab')
    .siblings().removeClass('active-tab')
  $modal.page(url, params)
})
$('.modal-search--btn').on('click', function () {
  var params = $.extend({}, defaultParams, {
    category: $(this).siblings('input').val()
  })
  if (params.category.length > 0) {
    $modal.page(url, params)
  }
})
// 刷新按钮
$('.modal-refresh').on('click', function () {
  $(this).siblings('input').val('')
  $modal.page(url, defaultParams)
})


$.fn.page = function (url, params) {
  $(this).pagination({
    dataSource: function (done) {
      var result = []
      for (var i = 1; i < defaultParams.pageNum; i++) {
        result.push(i)
      }
      done(result)
    },
    pageSize: 1,
    showPrevious: false,
    showGoInput: true,
    showGoButton: true,
    nextText: '下一页 >',
    goButtonText: '跳转',
    callback: function (data) {
      var html = template(data, url, params)
    }
  })
  return this
} 

function template(data, url, params) {
  var defaultParams = $.extend({}, params, {
    currentPageNo: data[0]
  })
  $.ajax({
    url:url,
    data: {
      currentPageNo: defaultParams.currentPageNo,
      category: defaultParams.category
    },
    success: function (res) {
      if (res.status === 200) {
        var $modalBody = $('.modal-table').find('tbody')
        var tdDom = ''
        var trDom = ''
        $.each(res.data, function (key, val) {
          tdDom = '<td><span class="is-green">' + val.title + '</span></td><td class="is-blue">选取</td>'
          trDom += '<tr>' + tdDom + '</tr>'
        })
        $modalBody.empty().append(trDom)
      }
    }
  })
}