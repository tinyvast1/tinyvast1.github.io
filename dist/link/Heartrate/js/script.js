//slider
const windowSlider = document.querySelector('.carousel__items'),
slides = document.querySelectorAll('.carousel__item'),
widthSlides = windowSlider.clientWidth,
next = document.querySelector('.carousel__btn-next'),
prev = document.querySelector('.carousel__btn-prev');


let activeSlide = 3,
checkedSlide = true;


function createDots() {
for (let i = 1; i <= slides.length; i++){
  let dots = document.createElement('div');
  dots.className = "carousel__dot";
  document.querySelector('.carousel__indicators').append(dots);
}
}

createDots();



slides.forEach(slide => slide.style.width = `${widthSlides}px`);

    
window.addEventListener("resize", () => {
const widthSlides = windowSlider.clientWidth;
slides.forEach((slide,i) => {
  slide.style.width = `${widthSlides}px`;
});
});


showSlides('carousel__item-active', 'carousel__item-next', 'carousel__item-prev');


function showSlides(activeClass, nextClass, prevClass) {
const dots = document.querySelectorAll('.carousel__dot');
slides.forEach((slide, i) => {
  slide.classList.remove(activeClass, nextClass, prevClass);
  dots[i].style.backgroundColor = 'rgba(199, 1, 1, 0.2)';
});
slides[activeSlide].classList.add(activeClass);
dots[activeSlide].style.backgroundColor = 'rgba(199, 1, 1, 1)';
if (activeSlide !== 0 && activeSlide !== slides.length - 1) {
  slides[activeSlide - 1].classList.add(nextClass);
  slides[activeSlide + 1].classList.add(prevClass);
} else if (activeSlide == 0) {
  slides[slides.length - 1].classList.add(nextClass);
  slides[activeSlide + 1].classList.add(prevClass);
} else {
  slides[0].classList.add(prevClass);
  slides[activeSlide - 1].classList.add(nextClass);
}
}

function nextSlide() {
  if (checkedSlide) {
    if (activeSlide < slides.length - 1) {
      activeSlide++;
    } else {
      activeSlide = 0;
    }
    showSlides('carousel__item-active', 'carousel__item-next', 'carousel__item-prev');
    checkedSlide = false;
    setTimeout(() => {
      checkedSlide = true;
    }, 500);
  }
}


function prevSlide() {
if (checkedSlide) {
  if (activeSlide > 0) {
    activeSlide--;
  } else {
    activeSlide = slides.length - 1;
  }
  showSlides('carousel__item-active', 'carousel__item-next', 'carousel__item-prev');
  checkedSlide = false;
  setTimeout(() => {
    checkedSlide = true;
  }, 500);
}
}

next.addEventListener('click', () => {
nextSlide();
});

prev.addEventListener('click', () => {
prevSlide();
});


//sliderTouch

windowSlider.addEventListener('touchstart', handleTouchStart, false);        
windowSlider.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

    function getTouches(evt) {
    return evt.touches ||             
            evt.originalEvent.touches;
    }                                                     
                                                                            
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                
                                                                            
    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
              nextSlide();
            } else {
              prevSlide();
            }                       
        }
        xDown = null;
        yDown = null;                                             
    };

//catalog    
$("ul.catalog__tabs").on("click", "li:not(.catalog__tab_active)", function () {
  $(this)
    .addClass("catalog__tab_active")
    .siblings()
    .removeClass("catalog__tab_active")
    .closest("div.container")
    .find("div.catalog__content")
    .removeClass("catalog__content_active")
    .eq($(this).index())
    .addClass("catalog__content_active");
});

$(".catalog-item__link").each(function (i) {
  $(this).on("click", function (e) {
    e.preventDefault();
    $(".catalog-item__content")
      .eq(i)
      .toggleClass("catalog-item__content_active");
    $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
  });
});
$(".catalog-item__back").each(function (i) {
  $(this).on("click", function (e) {
    e.preventDefault();
    $(".catalog-item__content")
      .eq(i)
      .toggleClass("catalog-item__content_active");
    $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
  });
});

function toggleSlide(item) {
  $(item).each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-item__content")
        .eq(i)
        .toggleClass("catalog-item__content_active");
      $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
    });
  });

  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");
};

// Modal
$("[data-modal=consultation]").on("click", function () {
  $(".overlay, #consultation").fadeIn();
});
$(".modal__close").on("click", function () {
  $(".overlay, #consultation, #thanks, #order").fadeOut();
});
$(".button_mini").on("click", function () {
  $(".overlay, #order").fadeIn();
});
$(".overlay").on("click", function () {
  $(".overlay, #consultation, #thanks, #order").fadeOut();
});
$(".button_mini").each(function (i) {
  $(this).on("click", function () {
    $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
    $(".overlay, #order").fadeIn();
  });
});

$("form").submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize(),
    statusCode: {
      200: function() {
        const subtitle = document.querySelector('#thanks .modal__subtitle');
        const descr = document.querySelector('#thanks .modal__descr');
        subtitle.innerHTML = 'Спасибо за вашу заявку!';
        descr.innerHTML = 'Наш менеджер свяжется с вами в ближайшее время!';
        $(this).find("input").val("");
        $("#consultation, #order").fadeOut();
        $(".overlay, #thanks").fadeIn();
        $("form").trigger("reset");
      },
      404: function() {
        const subtitle = document.querySelector('#thanks .modal__subtitle');
        const descr = document.querySelector('#thanks .modal__descr');
        subtitle.innerHTML = 'Что-то пошло не так';
        descr.innerHTML = 'Попробуйте оставит заявку позже.';
        $(this).find("input").val("");
        $("#consultation, #order").fadeOut();
        $(".overlay, #thanks").fadeIn();
        $("form").trigger("reset");
      },
      405: function() {
        const subtitle = document.querySelector('#thanks .modal__subtitle');
        const descr = document.querySelector('#thanks .modal__descr');
        subtitle.innerHTML = 'Что-то пошло не так';
        descr.innerHTML = 'Попробуйте оставит заявку позже.';
        $(this).find("input").val("");
        $("#consultation, #order").fadeOut();
        $(".overlay, #thanks").fadeIn();
        $("form").trigger("reset");
      }
    }
  });
  return false;
});

$("input[name=phone]").mask("+7 (999) 999-99-99");


$(window).scroll(function () {
  if ($(this).scrollTop() > 1600) {
    $(".pageup").fadeIn();
  } else {
    $(".pageup").fadeOut();
  }
});

$("a[href^='#']").click(function () {
  const _href = $(this).attr("href");
  $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
  return false;
});
new WOW().init();
