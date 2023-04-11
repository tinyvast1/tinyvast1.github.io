window.addEventListener('popstate', () => {
  console.log('URL Change');
});
const hamburger = document.querySelector(".hamburger"),
  menu = document.querySelector(".menu"),
  closeElem = document.querySelector(".menu__close"),
  closeOver = document.querySelector(".menu__overlay"),
  menuelem = document.querySelectorAll(".menu__elem");
hamburger.addEventListener("click", () => {
  menu.classList.add("active");
  closeOver.classList.add("active");
});
closeElem.addEventListener("click", () => {
  menu.classList.remove("active");
  closeOver.classList.remove("active");
});
closeOver.addEventListener("click", () => {
  menu.classList.remove("active");
  closeOver.classList.remove("active");
});


function handleClick() {
  menu.classList.remove("active");
  closeOver.classList.remove("active");
}
menuelem.forEach((menuelem) => {
  menuelem.addEventListener("click", handleClick);
});

const percent = document.querySelectorAll(".skills__rating-percent"),
  scale = document.querySelectorAll(".skills__rating-scale span");

percent.forEach((item, i) => {
  scale[i].style.width = item.innerHTML;
});

//form

$(".contacts__form").submit(function (e) {
  e.preventDefault();
  const ContactsBtn = document.querySelector('.contacts__btn');
  ContactsBtn.innerHTML = 'Отправляем сообщение...';
  $.ajax({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize(),
    statusCode: {
      200: function() {
        ContactsBtn.innerHTML = 'Сообщение отправлено';
        setTimeout(function(){ContactsBtn.innerHTML = 'Отправить сообщение';}, 5000);
      },
      404: function() {
        ContactsBtn.innerHTML = 'Что-то пошло не так';
        setTimeout(function(){ContactsBtn.innerHTML = 'Отправить сообщение';}, 5000);
      },
      405: function() {
        ContactsBtn.innerHTML = 'Что-то пошло не так';
        setTimeout(function(){ContactsBtn.innerHTML = 'Отправить сообщение';}, 5000);
      }
    }
  });
  return false;
});


