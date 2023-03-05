document.addEventListener('DOMContentLoaded', () => {

    //slider
    
    const slider = document.querySelector('.slider'),
        sliderWrapper = document.querySelector('.slider__wrapper'),
        sliderItem = document.querySelectorAll('.slider__item'),
        btnNext = document.querySelector('.slider__btn-next'),
        btnPrev = document.querySelector('.slider__btn-prev'),
        connectionBtn = slider.querySelectorAll('.connection');

    let numberVisible = 4,
        activeSlide = 0,
        widthItem = 0;

    resizeInfo();   

    window.addEventListener('resize', ()=> {
        resizeInfo();
    });

    function resizeInfo()  { 
        if (slider.clientWidth >= 1304) {
            numberVisible = 4;
            if (activeSlide > 2) {
                activeSlide = 2;
            }
        }
        if ((slider.clientWidth < 1304) & (slider.clientWidth >= 904)) {
            numberVisible = 3;
            if (activeSlide > 3) {
                activeSlide = 3;
            }
        }
        if ((slider.clientWidth < 904) & (slider.clientWidth >= 704)) {
            numberVisible = 2;
            if (activeSlide > 4) {
                activeSlide = 4;
            }
        }
        if ((slider.clientWidth < 704) & (slider.clientWidth >= 300)) {
            numberVisible = 1;
            if (activeSlide > 5) {
                activeSlide = 5;
            }
        }
        widthItem = (slider.clientWidth - 
            window.getComputedStyle(sliderItem[0]).marginRight.replace(/[^0-9]/g,"")*numberVisible -
            window.getComputedStyle(sliderWrapper).paddingLeft.replace(/[^0-9]/g,"")*2)/numberVisible;
        sliderItem.forEach((item)=> {
            item.style.minWidth = `${widthItem}px`;
        });
        sliderWrapper.style.transform = `translate(-${((widthItem + 
        (window.getComputedStyle(sliderItem[0]).marginRight.replace(/[^0-9]/g,"")) / 1.4) * activeSlide)}px)`;
    
        showBtn();
    }

    function showBtn() {
        if (activeSlide === 0) {
            btnPrev.style.opacity = '0.22';
        } else if (activeSlide + numberVisible === sliderItem.length) {
            btnNext.style.opacity = '0.22';
        } else {
            btnPrev.style.opacity = '1';
            btnNext.style.opacity = '1';
        }
    }
    function nextSlide() {
        if ((activeSlide + numberVisible) !== sliderItem.length) {
            activeSlide++;
            sliderWrapper.style.transform = `translate(-${((widthItem + 
            (window.getComputedStyle(sliderItem[0]).marginRight.replace(/[^0-9]/g,"")) / 1.4) * activeSlide)}px)`;
        }
        showBtn();
    }
    function prevSlide() {
        if (activeSlide !== 0) {
            activeSlide--;
            sliderWrapper.style.transform = `translate(-${((widthItem + 
            (window.getComputedStyle(sliderItem[0]).marginRight.replace(/[^0-9]/g,"")) / 1.4) * activeSlide)}px)`;
        }
        showBtn();
    }

    function clickBtn() {
        btnNext.addEventListener('click', () => {
            nextSlide();
        });
        btnPrev.addEventListener('click', () => {
            prevSlide();
        });
    }

    showBtn();
    clickBtn();


    //sliderTouch

    sliderWrapper.addEventListener('touchstart', handleTouchStart, false);        
    sliderWrapper.addEventListener('touchmove', handleTouchMove, false);

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

    //forms

    function checkbox(item) {
        const checkbox =document.querySelector(`${item} input`),
            checkboxImg = document.querySelector(`${item} svg`);

        checkbox.addEventListener('click', () => {
            if (checkbox.checked) {
                // checkboxImg.style.fill = "#66FF00";
                checkboxImg.style.fill = "#213887";
            } else {
                checkboxImg.style.fill = "#989EB1";
            }
        });
    }


    


    checkbox('.callme__checkbox');
    checkbox('.application__checkbox');

    //HTTP

    const formStatus = document.querySelector('.HTTPstatus'),
        formStatusBtn = document.querySelector('.HTTPstatus-btn');

    formStatusBtn.addEventListener('click', ()=>{
        if (formStatus.classList.contains('HTTPstatus-active') == true){
            formStatus.classList.remove('HTTPstatus-active');
            document.querySelector('.HTTPstatus-img').remove();
        }
        if (application.classList.contains('application-active')) {
            application.classList.remove('application-active');
            body.classList.remove('stop__scrolling');
        }
    });
    

    //application

    const application = document.querySelector('.application'),
    applicationOpenBtn = document.querySelectorAll('.connection__form'),
    appcicationCloseBtn = document.querySelector('.application__close');
    
    applicationOpenBtn.forEach( (item) => {
        item.addEventListener('click', ()=> {
            if (application.classList.contains('application-active') == false){
                application.classList.add('application-active');
                body.classList.add('stop__scrolling');
            }
        });
    });
    appcicationCloseBtn.addEventListener('click', ()=> {
        if (application.classList.contains('application-active')) {
            application.classList.remove('application-active');
            body.classList.remove('stop__scrolling');
        }
    });

    const appcicationSwitch = document.querySelector('.application__switch-button'),
    applicationInput = document.querySelectorAll('.application__input'),
    appcicationTextarea = document.querySelector('.application__textarea'),
    appcicationFormBtn = document.querySelector('.connection__application');

    appcicationSwitch.addEventListener('click', ()=> {
        if (appcicationSwitch.classList.contains('application__switch-button-active')){
            appcicationSwitch.classList.remove('application__switch-button-active');
            applicationInput.forEach(item=>{
                item.classList.remove('application__input-urgent');
            });
            appcicationTextarea.classList.remove('application__textarea-urgent');
            appcicationFormBtn.classList.remove('connection-urgent');
        } else {
            appcicationSwitch.classList.add('application__switch-button-active');
            applicationInput.forEach(item=>{
                item.classList.add('application__input-urgent');
            });
            appcicationTextarea.classList.add('application__textarea-urgent');
            appcicationFormBtn.classList.add('connection-urgent');
        }
    });

    //mask
    $("input[name=phone]").mask("+7 (999) 999-99-99");

    //menu

    const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.header__menu'),
    link = document.querySelectorAll('.header__menu-item'),
    body = document.querySelector('body');

    hamburger.addEventListener('click', () => {
        if (hamburger.classList.contains('hamburger-active')){
            hamburger.classList.remove('hamburger-active');
            menu.classList.remove('header__menu-active');
            body.classList.remove('stop__scrolling');
        } else {
            hamburger.classList.add('hamburger-active');
            menu.classList.add('header__menu-active');
            body.classList.add('stop__scrolling');

        }
    });

    link.forEach((item)=> {
        item.addEventListener('click', ()=> {
            if (hamburger.classList.contains('hamburger-active')) {
                hamburger.classList.remove('hamburger-active');
                menu.classList.remove('header__menu-active');
                body.classList.remove('stop__scrolling');
            }
        });
    });

    window.addEventListener('resize', ()=> {
        if (getComputedStyle(hamburger).display == 'none') {
            hamburger.classList.remove('hamburger-active');
            menu.classList.remove('header__menu-active');
            body.classList.remove('stop__scrolling');
        }
    });


    //animate

    function addActiveClass(item, itemClass) {
        item.classList.add(`${itemClass}-active`);
    }

    
    //animatePromo

    const imgDots = document.querySelector('.promo__animate-dots'),
        imgWebsite = document.querySelector('.promo__animate-website'),
        imgFolder = document.querySelector('.promo__animate-folder'),
        imgPhone = document.querySelector('.promo__animate-phone'),
        promoTitle = document.querySelector('.promo__title'),
        promoSubtitle = document.querySelector('.promo__subtitle'),
        promoConnection = document.querySelector('.promo .connection'),
        animatePromoTimeout = setTimeout(animatePromo, 300);
 
    function animatePromo() {
        addActiveClass(imgDots,'promo__animate-dots');
        addActiveClass(imgWebsite, 'promo__animate-website');
        addActiveClass(imgFolder,'promo__animate-folder');
        addActiveClass(imgPhone,'promo__animate-phone');
        addActiveClass(promoTitle,'promo__title');
        addActiveClass(promoSubtitle,'promo__subtitle');
        addActiveClass(promoConnection, 'connection');

    }


    //animateWork
    
    const stage = document.querySelectorAll('.work__stage'),
        oneCard = document.querySelectorAll('.card-second'),
        secondCard = document.querySelectorAll('.card-three'),
        threeCard = document.querySelectorAll('.card-four'),
        page = document.documentElement;

    function getOffsetSum(elem) {
            let top = 0;
            while(elem) {
                top = top + parseFloat(elem.offsetTop);
                elem = elem.offsetParent;       
            }       
            return top ;
        }

          
        
    function animateWork() {

        const oneCardTimeout = setTimeout(animateCard, 50, 0, oneCard,'card-second-active'),
            secondCardTimeout = setTimeout(animateCard, 1000, 1, secondCard,'card-three-active'),
            threeCardTimeout = setTimeout(animateCard, 2000, 2, threeCard,'card-four-active');
        
        function animateCard(numberStage ,nameCard, activeClass) {
            stage[numberStage].style.left = '0';
            nameCard.forEach(i => {
                i.classList.add(activeClass);
            });
        }    
    }



    document.addEventListener('scroll', () => {
        if ((getOffsetSum(stage[1]) - window.innerHeight) <= page.scrollTop) {
            animateWork();
        }
    });

    if ((getOffsetSum(stage[1]) - window.innerHeight) <= page.scrollTop) {
        animateWork();
    }

});



//mailer

$("form").submit(function (e) {
    e.preventDefault();
    const formStatusImg = document.createElement('img'),
    formStatusWrapper = document.querySelector('.HTTPstatus .container'),
    formStatusTitle = document.querySelector('.HTTPstatus-title'),
    formStatusSubtitle = document.querySelector('.HTTPstatus-subtitle'),
    formStatusBtn = document.querySelector('.HTTPstatus-btn');
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize(),
        statusCode: {
            200: function() {
                document.querySelector('.HTTPstatus').classList.add('HTTPstatus-active');
                formStatusImg.src = ('icons/true.svg');
                formStatusImg.classList.add('HTTPstatus-img');
                formStatusTitle.innerHTML =  'Заявка отправлена!';
                formStatusSubtitle.innerHTML = 'Наш менеджер свяжется с вами в ближайшее время!';
                formStatusBtn.style.background = '#213887';
                formStatusWrapper.prepend(formStatusImg);
                $(this).find("input").val("");
                document.querySelector('.HTTPstatus').classList.add('HTTPstatus-active');
                $("form").trigger("reset");
                function checkbox(item) {
                    const checkbox =document.querySelector(`${item} input`),
                        checkboxImg = document.querySelector(`${item} svg`);
                        if (checkbox.checked) {
                            checkboxImg.style.fill = "#213887";
                        } else {
                            checkboxImg.style.fill = "#989EB1";
                        }
                }
                checkbox('.callme__checkbox');
                checkbox('.application__checkbox');
            },
            404: function() {
                document.querySelector('.HTTPstatus').classList.add('HTTPstatus-active');
                formStatusImg.src = ('icons/false.svg');
                formStatusImg.classList.add('HTTPstatus-img');
                formStatusTitle.innerHTML =  'Что-то пошло не так';
                formStatusSubtitle.innerHTML = 'Пожалуйста, перейдите на главную страницу сайта и попробуйте оставит заявку позже.';
                formStatusBtn.style.background = '#C11C2C';
                formStatusWrapper.prepend(formStatusImg);
                $(this).find("input").val("");
                $("form").trigger("reset");
                function checkbox(item) {
                    const checkbox =document.querySelector(`${item} input`),
                        checkboxImg = document.querySelector(`${item} svg`);
                        if (checkbox.checked) {
                            checkboxImg.style.fill = "#213887";
                        } else {
                            checkboxImg.style.fill = "#989EB1";
                        }
                }
                checkbox('.callme__checkbox');
                checkbox('.application__checkbox');
            },
            405: function() {
                document.querySelector('.HTTPstatus').classList.add('HTTPstatus-active');
                formStatusImg.src = ('icons/false.svg');
                formStatusImg.classList.add('HTTPstatus-img');
                formStatusTitle.innerHTML =  'Что-то пошло не так';
                formStatusSubtitle.innerHTML = 'Пожалуйста, перейдите на главную страницу сайта и попробуйте оставит заявку позже.';
                formStatusBtn.style.background = '#C11C2C';
                formStatusWrapper.prepend(formStatusImg);
                $(this).find("input").val("");
                $("form").trigger("reset");
                function checkbox(item) {
                    const checkbox =document.querySelector(`${item} input`),
                        checkboxImg = document.querySelector(`${item} svg`);
                        if (checkbox.checked) {
                            checkboxImg.style.fill = "#213887";
                        } else {
                            checkboxImg.style.fill = "#989EB1";
                        }
                }
                checkbox('.callme__checkbox');
                checkbox('.application__checkbox');
            }
        }
    });
    return false;
  });