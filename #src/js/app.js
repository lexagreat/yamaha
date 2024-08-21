(function isWebP() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   testWebP(function (support) {
      if (support == true) {
         document.querySelector("html").classList.add("webp");
      } else {
         document.querySelector("html").classList.add("no-webp");
      }
   });
})();
const body = document.body;
document.addEventListener("DOMContentLoaded", () => {
   headerWork();
   initHomeHeroSlider();
   hoverOnCatalog();
   initProductSlider();
   productCardWork();
   accordion(".garanty-item__header", ".garanty-item__spoiler");
   homeCardsSectionHover();
   accordion(
      ".footer__mobile .footer__block .footer__title",
      ".footer__mobile .footer__block .footer__spoiler"
   );
   homeAboutParallax();
});

function headerWork() {
   const header = document.querySelector(".header");
   const hero = document.querySelector(".hero");
   let oldScrollTopPosition = 0;

   const animateHeaderOnScroll = () => {
      animateHeaderColor();
      animateHeaderDown();
   };
   const animateHeaderColor = () => {
      if (window.scrollY > hero.clientHeight) {
         header.classList.contains("dark") ? "" : header.classList.add("dark");
      } else {
         header.classList.remove("dark");
      }
   };
   const animateHeaderDown = () => {
      if (window.innerWidth > 992) {
         const scrollTopPosition = document.documentElement.scrollTop;
         if (scrollTopPosition <= 0) {
            return;
         }
         let scrollDown = oldScrollTopPosition < scrollTopPosition;
         if (scrollDown) {
            header.classList.add("hidden-down");
         } else {
            header.classList.remove("hidden-down");
         }

         oldScrollTopPosition = scrollTopPosition;
      }
   };

   const burgerHover = () => {
      const burger = document.querySelector(".header__burger");
      const fill = document.querySelector(".header__burger div");

      burger.onmouseenter = (event) => {
         fill.style.transform = `translate(${event.layerX}px, ${event.layerY}px)`;
         fill.style.width =
            2 *
               Math.sqrt(
                  burger.clientWidth * burger.clientWidth +
                     burger.clientHeight * burger.clientHeight
               ) +
            "px";
         fill.style.height =
            2 *
               Math.sqrt(
                  burger.clientWidth * burger.clientWidth +
                     burger.clientHeight * burger.clientHeight
               ) +
            "px";
      };
      burger.onmousemove = (event) => {
         fill.style.transform = `translate(${event.layerX}px, ${event.layerY}px)`;
      };
      burger.onmouseleave = (event) => {
         fill.style.transform = `translate(${event.layerX}px, ${event.layerY}px)`;
         fill.style.width = "";
         fill.style.height = "";
      };
   };

   window.addEventListener("scroll", animateHeaderOnScroll);
   animateHeaderOnScroll();
   burgerHover();
}

function initHomeHeroSlider() {
   const videos = document.querySelectorAll(".home-hero video");

   let slider = new Swiper(".home-hero .swiper", {
      navigation: {
         prevEl: ".home-hero .swiper-button-prev",
         nextEl: ".home-hero .swiper-button-next",
      },
      pagination: {
         el: ".home-hero .swiper-pagination",
      },
      effect: "fade",
      speed: 1000,
      mousewheel: {
         enabled: true,
         forceToAxis: true,
      },
      on: {
         slideChange(swiper) {
            // https://metanit.com/web/html5/7.3.php // тут можно взять методы
            videos.forEach((item) => {
               item.currentTime = 0;
               item.pause();
            });
            videos[swiper.activeIndex].play();
         },
      },
   });
   const soundBtn = document.querySelector(".home-hero__sound .btn");
   soundBtn.addEventListener("click", () => {
      let isMuted = videos[0].muted ? true : false;
      videos.forEach((video) => {
         if (isMuted) {
            video.muted = false;
            soundBtn.innerHTML = "Выключить звук";
         } else {
            video.muted = true;
            soundBtn.innerHTML = "Включить звук";
         }
      });
   });
}

function hoverOnCatalog() {
   const cards = document.querySelectorAll(".home-catalog__item");
   if (!cards.length) return;
   cards.forEach((item) => {
      item.onmouseenter = (event) => {
         console.log("mouseenter");
         item.classList.add("hover");
         const circle = item.querySelector(".catalog-card__bg");
         circle.style.transform = `translate(${event.layerX}px, ${event.layerY}px)`;
         circle.style.width =
            2 *
               Math.sqrt(
                  item.clientWidth * item.clientWidth +
                     item.clientHeight * item.clientHeight
               ) +
            "px";
         circle.style.height =
            2 *
               Math.sqrt(
                  item.clientWidth * item.clientWidth +
                     item.clientHeight * item.clientHeight
               ) +
            "px";
         console.log(item.clientWidth);
         console.log(item.clientHeight);
      };
      item.onmousemove = (event) => {
         console.log("mousemove");
         const circle = item.querySelector(".catalog-card__bg");
         circle.style.transform = `translate(${event.layerX}px, ${event.layerY}px)`;
      };
      item.onmouseleave = (event) => {
         console.log("mouseleave");
         item.classList.remove("hover");
         const circle = item.querySelector(".catalog-card__bg");
         circle.style.transform = `translate(${event.layerX}px, ${event.layerY}px)`;
         circle.style.width = "";
         circle.style.height = "";
      };
   });
}
function initProductSlider() {
   if (!document.querySelector(".product-section .swiper")) return;
   let swiper = new Swiper(".product-section .swiper", {
      slidesPerView: "auto",
      spaceBetween: 10,
      navigation: {
         prevEl: ".product-section .swiper-button-prev",
         nextEL: ".product-section .swiper-button-next",
      },
      breakpoints: {
         1025: {
            slidesPerView: 4,
         },
      },
      mousewheel: {
         enabled: true,
         forceToAxis: true,
      },
   });
}

function productCardWork() {
   const products = document.querySelectorAll(".product-card");
   if (!products.length) return;

   const hoverOnCart = () => {
      const carts = document.querySelectorAll(".product-card__cart");
      carts.forEach((item) => {
         const fill = item.querySelector("div");
         item.onmouseenter = (event) => {
            console.log("mouseenter");
            fill.style.transform = `translate(${event.layerX}px, ${event.layerY}px)`;
            fill.style.width =
               2 *
                  Math.sqrt(
                     item.clientWidth * item.clientWidth +
                        item.clientHeight * item.clientHeight
                  ) +
               "px";
            fill.style.height =
               2 *
                  Math.sqrt(
                     item.clientWidth * item.clientWidth +
                        item.clientHeight * item.clientHeight
                  ) +
               "px";
         };
         item.onmousemove = (event) => {
            console.log("mousemove");

            fill.style.transform = `translate(${event.layerX}px, ${event.layerY}px)`;
         };
         item.onmouseleave = (event) => {
            console.log("mouseleave");

            fill.style.transform = `translate(${event.layerX}px, ${event.layerY}px)`;
            fill.style.width = "";
            fill.style.height = "";
         };
      });
   };
   const toggleActions = () => {
      const showBtns = document.querySelectorAll(".product-card__show");
      showBtns.forEach((item) => {
         item.addEventListener("click", (e) => {
            e.preventDefault();
            e.target.closest(".product-card").classList.add("active");
         });
      });
   };
   const preventRouteChange = () => {
      document.querySelectorAll(".product-card__actions").forEach((item) => {
         item.addEventListener("click", (e) => {
            e.preventDefault();
         });
      });
      document
         .querySelectorAll(".product-card__colors button")
         .forEach((item) => {
            item.addEventListener("click", (e) => {
               e.preventDefault();
            });
         });
      document
         .querySelector(".product-card__cart")
         .addEventListener("click", (e) => {
            e.preventDefault();
         });
   };
   toggleActions();
   hoverOnCart();
   preventRouteChange();
}
function homeCardsSectionHover() {
   const cards = document.querySelectorAll(".home-cards__item");
   if (!cards.length) return;
   cards.forEach((item) => {
      let spoiler = item.querySelector(".collapse");
      item.onmouseenter = () => {
         slideShow(spoiler);
      };
      item.onmouseleave = () => {
         slideHide(spoiler);
      };
   });
}

function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`);
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`);
   if (openLinks.length > 0) {
      for (let i = 0; i < openLinks.length; i++) {
         let openLink = openLinks[i];
         openLink.addEventListener("click", () => {
            // все прячем
            for (let j = 0; j < contents.length; j++) {
               // если хоть один открывается - return
               if (contents[j].classList.contains("collapsing")) {
                  return;
               } // Иначе
               // все прячем
               slideHide(contents[j]);
            }
            for (let j = 0; j < openLinks.length; j++) {
               openLinks[j].classList.remove("active");
            }
            // записываем в переменную нужный таб
            let content = openLink.nextElementSibling;
            // работаем с классами линка
            if (content.classList.contains("collapsing")) {
               return;
            } else if (content.classList.contains("collapse_show")) {
               openLink.classList.remove("active");
            } else {
               openLink.classList.add("active");
            }
            // показываем нужный
            slideShow(content);
         });
      }
   }
}

function slideShow(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      el.classList.contains("collapse_show")
   ) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove("collapse");
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style["height"] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style["overflow"] = "hidden";
   // создание анимации скольжения с помощью CSS свойства transition
   el.style["transition"] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add("collapsing");
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style["height"] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим классы collapse и collapse_show
      el.classList.add("collapse");
      el.classList.add("collapse_show");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function slideHide(el, duration = 500) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      !el.classList.contains("collapse_show")
   ) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style["height"] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style["height"] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style["overflow"] = "hidden";
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style["transition"] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove("collapse");
   el.classList.remove("collapse_show");
   // добавим класс collapsing
   el.classList.add("collapsing");
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим класс collapsing
      el.classList.add("collapse");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}

function homeAboutParallax() {
   const section = document.querySelector(".home-about");
   if (!section) return;
   const image = section.querySelector(".home-about__image img");
   let headerHeight = document.querySelector(".header").clientHeight;
   window.addEventListener("scroll", (e) => {
      let start = section.getBoundingClientRect().top;
      let end =
         section.getBoundingClientRect().top +
         section.clientHeight -
         headerHeight;
      if (start > 0) {
         image.style.transform = `translate(0, 0px)`;
      }
      if (start < 0 && end > 0) {
         let value = -1 * start * 0.3;
         image.style.transform = `translate(0, ${value}px)`;
      }
   });
}
