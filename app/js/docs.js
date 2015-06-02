;(function($){
  'use strict';

  if(document.cookie.indexOf('preload=ok') === -1){
    location.href = 'index.html';
  }

  var arrow = $('.arrow-next');

  // 数字随机变换
  var numScroll = function($o){
    var target = $o.attr('data-value') - 0,
        digit = target.toString().length,
        duration = 1500, count = 0, frequency = 60,
        total = Math.floor(duration / frequency);

    var interval = setInterval(function(){
      var numSeed = Math.floor(Math.random() * Math.pow(10, digit));
      if(count > total) {
        clearInterval(interval);
        $o.html(target);
      } else {
        count ++;
        if(numSeed < Math.pow(10, digit - 1)) {
          numSeed = Math.pow(10, digit - 1);
        }
        $o.html(numSeed);
      }
    }, frequency);
  };

  // 为对象添加animation动作
  var ba = function($o, action, callback){
    $o.removeClass('hide').addClass(action);
    if(callback) {
      $o.on('webkitAnimationEnd animationend', callback);
    }
    return $o;
  };

  // 第一帧三张横幅
  var s1Action = function(s){
    var copy = $('.s1-copy-writer'),
        dsnr = $('.s1-designer'),
        dvlp = $('.s1-developer');

    numScroll(copy.children('.num'));
    ba(copy, 'bounceInUp');
    ba(copy.children('img'), 'bounceInUp')
    .on('webkitAnimationEnd animationend', function(){
      setTimeout(function(){
        numScroll(dsnr.children('.num'));
        ba(copy, 'bounceOutUp');
        ba(dsnr, 'bounceInUp');
        ba(dsnr.children('img'), 'bounceInUp');
      }, 1800);
    });

    dsnr.children('img').on('webkitAnimationEnd animationend', function(){
      setTimeout(function(){
        numScroll(dvlp.children('.num'));
        ba(dsnr, 'bounceOutUp');
        ba(dvlp, 'bounceInUp');
        ba(dvlp.children('img'), 'bounceInUp');
      }, 1800);
    });
  };

  var swiper = new window.Swiper('.main-container', {
    direction: 'vertical',
    // hashnav: true,
    onInit: function(s){
      if(s.activeIndex === 0) {
        s1Action();
      }
    },
    onSlideChangeEnd: function(s){
      var curIndex = s.activeIndex;
      if(curIndex === 0) {
        s1Action();
      }
      if(curIndex === 1) {
        ba($('.text-release'), 'fadeInDown');
        ba($('.cup-left'), 'bounceInLeft');
        ba($('.cup-right'), 'bounceInRight');
        ba($('.beer-flower'), 'fadeInUp');
      }
      if(curIndex === 2) {
        ba($('.text-heard'), 'fadeInDown');
      }
      if(curIndex === 3) {
        ba($('.text-waiting'), 'fadeInDown')
        .on('webkitAnimationEnd animationend', function(){
          var $self = $(this);
          setTimeout(function(){
            $self.addClass('fadeOutUp');
            $('.green-head').addClass('move-in');
          }, 1800);
        });

        ba($('.text-waiting-2'), 'fadeInDown');
      }
      if(curIndex === 4) {
        ba($('.text-expect'), 'fadeInDown');
        ba($('.text-expect').next(), 'sunshine');
      }
      if(curIndex === 5) {
        ba($('.text-chequan'), 'fadeInDown');
        arrow.addClass('hide');
      }
    }
  });

  swiper
    .on('sliderMove', function(){
      arrow.addClass('hide');  
    })
    .on('touchEnd', function(s){
      if(!s.isEnd) {
        arrow.removeClass('hide');
      }
    });
})(Zepto);