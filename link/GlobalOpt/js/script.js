document.addEventListener('DOMContentLoaded', () => {

  //menu

  const btn = document.querySelectorAll(".btn"),
        form = document.querySelector(".callme"),
        closeOver = document.querySelector(".callme__overlay"),
        closeElem = document.querySelector(".callme__close"),
        hamburger = document.querySelector(".nav__hamburger"),
        menu = document.querySelector(".menu"),
        menuOver = document.querySelector(".menu__overlay"),
        menuClose = document.querySelector(".menu__close");

  hamburger.addEventListener("click", () => {
    menu.classList.add("active");
  });

  menuOver.addEventListener("click", () => {
    menu.classList.remove("active");
  });
  menu.addEventListener("click", () => {
    menu.classList.remove("active");
  });
  function handleClick() {
    form.classList.add("active");
  }
  btn.forEach((btn) => {
    btn.addEventListener("click", handleClick);
  });

  closeOver.addEventListener("click", () => {
    form.classList.remove("active");
  });

  closeElem.addEventListener("click", () => {
    form.classList.remove("active");
  });

  //slider

  const windowSlider = document.querySelector('.reviews__slider'),
    slides = document.querySelectorAll('.reviews__item'),
    widthSlides = windowSlider.clientWidth,
    next = document.querySelector('.reviews__btn-next'),
    prev = document.querySelector('.reviews__btn-prev');


  let activeSlide = 0,
    checkedSlide = true;
    

  function createDots() {
    for (let i = 1; i <= slides.length; i++){
      let dots = document.createElement('div');
      dots.className = "slider__dot";
      document.querySelector('.slider__indicators').append(dots);
    }
  }
  
  createDots();

  

  slides.forEach(slide => slide.style.width = `${widthSlides}px`);
  
        
  window.addEventListener("resize", () => {
    const widthSlides = windowSlider.clientWidth;
    slides.forEach(slide => slide.style.width = `${widthSlides}px`);
  });


  showSlides('reviews__item-active', 'reviews__item-next', 'reviews__item-prev');


  function showSlides(activeClass, nextClass, prevClass) {
    const dots = document.querySelectorAll('.slider__dot');
    slides.forEach((slide, i) => {
      slide.classList.remove(activeClass, nextClass, prevClass);
      dots[i].style.backgroundColor = 'rgba(236, 100, 75, 0.2)';
    });
    slides[activeSlide].classList.add(activeClass);
    dots[activeSlide].style.backgroundColor = 'rgba(235, 100, 75, 1)';
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
        showSlides('reviews__item-active', 'reviews__item-next', 'reviews__item-prev');
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
      showSlides('reviews__item-active', 'reviews__item-next', 'reviews__item-prev');
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

  //mailing
  function submitForm(forma, formBtn) {

    $(forma).submit(function (e) {
      e.preventDefault();
      const consultationFormBtn = document.querySelector(formBtn);
      consultationFormBtn.innerHTML = 'Загрузка...';
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize(),
        statusCode: {
          200: function() {
            consultationFormBtn.innerHTML = 'Заявка отправлена';
            setTimeout(function() {consultationFormBtn.innerHTML = 'Отправить заявку';} , 5000);
          },
          404: function() {
            consultationFormBtn.innerHTML = 'Что-то пошло не так';
            setTimeout(function() {consultationFormBtn.innerHTML = 'Отправить заявку';} , 5000);
          },
          405: function() {
            consultationFormBtn.innerHTML = 'Что-то пошло не так';
            setTimeout(function() {consultationFormBtn.innerHTML = 'Отправить заявку';} , 5000);
          }
        }
      });
      return false;
    });
  }      

  submitForm('.consultation__form', '.consultation__btn');
  submitForm('.form__wrapper', '.form__btn');
  submitForm('.callme__form','.callme__btn');

});