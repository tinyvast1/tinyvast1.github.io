document.addEventListener('DOMContentLoaded', () => {
  //Timer

  const deadline = '2040-06-23T00:00:00';

  function getClock() {
    const t = Date.parse(deadline) - Date.parse(new Date()),
      clock = {
        t: t,
        hours: Math.floor((t / (1000 * 60 * 60)) % 60),
        min: Math.floor((t / (1000 * 60)) % 60),
        seconds: Math.floor((t / (1000)) % 60)
      };

    return clock;
  }

  function addTimer() {
    const hours = document.querySelector('#hours'),
      minutes = document.querySelector('#minutes'),
      seconds = document.querySelector('#seconds'),
      timeInterval = setInterval(changeTimer, 1000);

    changeTimer();

    function changeTimer() {
      if (getClock().t >= 0) {
        hours.textContent = getClock().hours;
        minutes.textContent = getClock().min;
        seconds.textContent = getClock().seconds;
      } else {
        hours.textContent = 0;
        minutes.textContent = 0;
        seconds.textContent = 0;
      }

    }
  }

  addTimer();

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
      dots[i].style.backgroundColor = 'rgba(255, 255, 255, 0)';
    });
    slides[activeSlide].classList.add(activeClass);
    dots[activeSlide].style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
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


  //mailer
        
  $(".mailing__form").submit(function (e) {
    const mailingStatus = document.querySelector('.mailing__form-status'),
    mailingFormBtnImg = document.querySelector('.mailing__btn img'),
    mailingFormBtn = document.querySelector('.mailing__btn'),
    mailingFormBtnSpinner =document.createElement('img');
    e.preventDefault();
    mailingStatus.innerHTML = 'Looking for your mail';
    mailingFormBtnImg.style.display = 'none';
    mailingFormBtnSpinner.src = 'icons/spinner.gif';
    mailingFormBtn.appendChild(mailingFormBtnSpinner);
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
      statusCode: {
        200: function() {
          $(this).find("input").val("");
          mailingFormBtnSpinner.remove();
          mailingFormBtnImg.style.display = 'block';
          mailingStatus.innerHTML = 'You have successfully subscribed.';
          $("form").trigger("reset");
        },
        404: function() {
          mailingFormBtnSpinner.remove();
          mailingFormBtnImg.style.display = 'block';
          mailingStatus.innerHTML = 'Something went wrong.';
        },
        405: function() {
          mailingFormBtnSpinner.remove();
          mailingFormBtnImg.style.display = 'block';
          mailingStatus.innerHTML = 'Something went wrong.';
        }
      }
    });
    return false;
  });

});
