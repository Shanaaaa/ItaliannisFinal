"use strict";

(function() {
  // home-youtube init
  $('#home-youtube').YTPlayer({
      fitToBackground: true,
      videoId: 'Rt0oX-4Hbxc',
      pauseOnScroll: true,
      callback: function() {
        videoCallbackEvents();
      }
  });

  // control settings
  var videoCallbackEvents = function() {
    var player = $('#home-youtube').data('ytPlayer').player;
    player.setVolume(20);
    $(".sound-control").on('click', function() {
      if (player.isMuted()) {
            player.unMute();
            $('.sound-control').css({'opacity': '1'});
        }
        else {
            player.mute();
            $('.sound-control').css({'opacity': '0.3'});
        }
    })

    player.addEventListener('onStateChange', function(event){
        if (event.data === 2) {
                  $('.status-control i').removeClass('ion-pause');
                  $('.status-control i').addClass('ion-play');
              }
              else if (event.data === 1) {
                  $('.status-control i').removeClass('ion-play');
                  $('.status-control i').addClass('ion-pause');
              }
        $(".status-control").on('click', function() {
          if (event.data === 1) {
                player.pauseVideo();
            }
            else if (event.data === 2) {
                player.playVideo();
            }
        })
    });
  }
})();

(function() {
  // jumbotron to center
  var h=$(window).height();
  var jumbotronHeight = $('.jumbotron').height();
  $('.jumbotron').css({'padding-top' : h/2 - jumbotronHeight/2 - 50 + "px"});

  // home-slider fix
  $("#home-slider .item").height(h);
})();

// carousels init
$("#home-slider, #testimonials", "#feature-slider").carousel({
  interval: 5000
});


$(document).ready(function() {
  // loading window remove after load js
  $(".load").animate({opacity: 0}, 1000, function() {
    $(this).remove();
  });

  // Smooth scrolling
  $('a[class*="scrollable"]').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
  });

  // subheader animations on scroll
  $('.subheader-1 h1').waypoint(function() {
      $('.subheader-1 h1').addClass('fadeInLeft');
  }, { offset: '100%' });

  $('.subheader-1 h2').waypoint(function() {
      $('.subheader-1 h2').addClass('fadeInRight');
  }, { offset: '100%' });

  // Lightbox icons
  $(".lb-close").append("<i class='icon ion-ios-close-empty'></i>");
  $(".lb-prev").append("<i class='icon ion-ios-arrow-left'></i>");
  $(".lb-next").append("<i class='icon ion-ios-arrow-right'></i>");
  $(".lb-cancel").append("<i class='icon ion-ios-loop'></i>");

  // all elements for fadeIn animation on scroll
  $(".menu-simple .animated, .menu-classic .animated, .menu-thumbnails .animated, .call-to-action div, #services .animated, .chefs .animated, #chefs-choice .animated, .gallery .animated").waypoint(function() {
      $(this.element).addClass('fadeIn');
  }, { offset: '100%' });

  // animate home page
  setTimeout(function() {$('.jumbotron .animated:nth-child(1)').addClass('fadeInDown');}, 1000);
  setTimeout(function() {$('.jumbotron .animated:nth-child(2)').addClass('fadeIn');}, 1700);
  setTimeout(function() {$('.jumbotron .animated:nth-child(3)').addClass('fadeInUp');}, 2400);


  // scroll button show/hide
  $(document).on('scroll', function() {
    setTimeout(showScrollBtn(), 300);
  })

  function showScrollBtn() {
    var screenTop = $(document).scrollTop();
    var h = $(window).height();
    if (screenTop > h/2) {
      $('.scroll-btn').css({opacity: '1'});
    } else {
      $('.scroll-btn').css({opacity: '0'});
    }
  }

  $(document).on('scroll', function() {
    var screenTop = $(document).scrollTop();
    if (screenTop > 0) {
      $("nav.navbar").addClass('navbar-fixed-top');
    } else {
      $("nav.navbar").removeClass('navbar-fixed-top');
    }
  })

  // about img height settings
  $('.about').each(function() {
    var h=$(this).find('.content').height();
    $(this).find('img').css({'height' : 140+h+'px'});
  });

  //gallery overlay height settings
  $('.gallery .item').each(function() {
    var h=$(this).find('img').height();
    $(this).find('.overlay').css({'height' : h +'px'});
  })

  // AJAX contact form
  $(function() {
      var form = $('#ajax-form');
      var formMessages = $('#form-messages');
      $(form).submit(function(event) {
          event.preventDefault();
          var formData = $(form).serialize();
          $.ajax({
              type: 'POST',
              url: $(form).attr('action'),
              data: formData
          })
          .done(function(response) {
              $(formMessages).removeClass('alert-danger');
              $(formMessages).addClass('alert-success');
              $(formMessages).text(response);

              $('#name').val('');
              $('#email').val('');
              $('#message').val('');
          })
          .fail(function(data) {
              $(formMessages).removeClass('alert-success');
              $(formMessages).addClass('alert-danger');

              if (data.responseText !== '') {
                  $(formMessages).text(data.responseText);
              } else {
                  $(formMessages).text('Oops! An error occured and your message could not be sent.');
              }
          });
      });
  });

  // AJAX reservation form
  $(function() {
      var form = $('#reservation-form');
      var formMessages = $('#reservation-messages');
      $(form).submit(function(event) {
          event.preventDefault();
          var formData = $(form).serialize();
          $.ajax({
              type: 'POST',
              url: $(form).attr('action'),
              data: formData
          })
          .done(function(response) {
              $(formMessages).removeClass('alert-danger');
              $(formMessages).addClass('alert-success');
              $(formMessages).text(response);

              $('#first_name').val('');
              $('#last_name').val('');
              $('#email_reservation').val('');
              $('#phone').val('');
              $('#date').val('');
              $('#time').val('');
              $('#seats').val('');
          })
          .fail(function(data) {
              $(formMessages).removeClass('alert-success');
              $(formMessages).addClass('alert-danger');

              if (data.responseText !== '') {
                  $(formMessages).text(data.responseText);
              } else {
                  $(formMessages).text('Oops! An error occured and your reservation could not be sent.');
              }
          });
      });
  });

  // Color picker
  $(".toggler").on('click', function() {
    if ($(".color-picker").css("left") != "0px") {
      $(".color-picker").css({'left': '0'});
    } else {
      $(".color-picker").css({'left': '-174' + "px"});
    }
  })

  $(".color-picker a").each(function(index) {
    //add class to colors
    index+=1;
    $(this).addClass('color-' + index);
    //append css file
    $(this).on('click', function() {
      if ($("link").length < 3) {
        $('head').append("<link rel='stylesheet' href='css/"+'style-'+index+".css'>");
      } else {
        $("link[href*='css/style-']").attr('href','css/style-' + index +'.css');
      }
    })
  })

})
