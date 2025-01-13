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
gsap.registerPlugin(ScrollTrigger);
const body = document.body;
document.addEventListener("DOMContentLoaded", () => {
   headerWork();
   initHomeHeroSlider();
   hoverOnCatalog();
   initProductSlider();
   accordion(".garanty-item__header", ".garanty-item__spoiler");
   homeCardsSectionHover();
   accordion(
      ".footer__mobile .footer__block .footer__title",
      ".footer__mobile .footer__block .footer__spoiler"
   );
   homeAboutParallax();
   productCardWork();
   makeCatalogFilters();
   productPage();
   animations();
   authModals();
   orderPage();
   orderSuccessPage();
   initSeriaSwiper();
   initSaleSwiper();
   profilePage();
   comparePage();
   catalogPage();
   tabs("[name='loyaltyTabs']", ".loyalty-tab");
});
function catalogPage() {
   const swiper = new Swiper(".catalog-hero__categories .swiper", {
      slidesPerView: "auto",
   });
}
function headerWork() {
   const header = document.querySelector(".header");
   const hero = document.querySelector(".hero");
   let oldScrollTopPosition = 0;

   const animateHeaderOnScroll = () => {
      animateHeaderColor();
      animateHeaderDown();
   };
   const animateHeaderColor = () => {
      if (!hero) return;
      if (window.scrollY > hero.clientHeight) {
         header.classList.remove("blur");
         header.classList.contains("fill") ? "" : header.classList.add("fill");
      } else if (window.scrollY < hero.clientHeight && window.scrollY > 0) {
         header.classList.remove("fill");
         header.classList.contains("blur") ? "" : header.classList.add("blur");
      } else if (window.scrollY <= 0) {
         header.classList.remove("fill");
         header.classList.remove("blur");
      }
      if (document.querySelector(".about-hero")) {
         header.classList.remove("fill");
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
            header.classList.contains("hidden-down")
               ? ""
               : header.classList.add("hidden-down");
         } else {
            header.classList.remove("hidden-down");
         }

         oldScrollTopPosition = scrollTopPosition;
      }
   };

   const burgerHover = () => {
      if (window.innerWidth <= 1024) return;
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

   const initColorTheme = () => {
      if (!hero) {
         header.classList.add("fill");
      }
   };
   const burger = document.querySelector(".header__burger");
   const menu = document.querySelector(".header-menu");
   const menuWork = () => {
      const toggleMenu = () => {
         if (menu.classList.contains("active")) {
            // bodyUnLock();
            lenis.start();
            burger.classList.remove("active");
            menu.classList.remove("active");
         } else {
            // bodyLock();
            lenis.stop();

            burger.classList.add("active");
            menu.classList.add("active");
            setTimeout(() => {
               header.classList.add("fill");
               header.classList.remove("blur");
            }, 300);
            makeActiveAssort(0);
            document
               .querySelectorAll(".menu-mobile__parent")
               .forEach((item) => {
                  item.classList.remove("active");
               });
         }
      };
      burger.addEventListener("click", () => {
         toggleMenu();
      });
      const assortLinks = document.querySelectorAll(".header-menu__side a");
      const assortItems = document.querySelectorAll(".header-assort");
      function makeActiveAssort(index) {
         assortItems.forEach((assort) => {
            assort.classList.remove("active");
         });
         assortLinks.forEach((link) => {
            link.classList.remove("active");
         });
         assortLinks[index].classList.add("active");
         assortItems[index].classList.add("active");
      }
      assortLinks.forEach((link, index) => {
         link.onmouseenter = (e) => {
            makeActiveAssort(index);
         };
         link.onmouseleave = (e) => {
            console.log(!e.relatedTarget.closest(".header-menu__main"));
            makeActiveAssort(index);
            if (
               !e.relatedTarget.closest(".parent-list") &&
               !e.relatedTarget.closest(".header-menu__main")
            ) {
               makeActiveAssort(0);
            }
         };
      });

      const buttons = document.querySelectorAll(".menu-mobile__parent button");
      buttons.forEach((item) => {
         item.addEventListener("click", () => {
            item.closest(".menu-mobile__parent").classList.add("active");
         });
      });
      const titles = document.querySelectorAll(".menu-mobile__title svg");
      titles.forEach((item) => {
         item.onclick = (e) => {
            console.log(e.target.closest(".menu-mobile__parent.active"));
            e.target
               .closest(".menu-mobile__parent.active")
               .classList.remove("active");
         };
      });
   };
   const searchWork = () => {
      const btn = document.querySelector("[data-search-open]");
      const close = document.querySelector("[data-search-close]");
      const search = document.querySelector(".header-search");
      btn.addEventListener("click", (e) => {
         e.preventDefault();
         search.classList.add("active");
         lenis.stop();
      });
      close.addEventListener("click", (e) => {
         e.preventDefault();
         search.classList.remove("active");
         lenis.start();
      });
   };
   window.addEventListener("scroll", animateHeaderOnScroll);
   animateHeaderOnScroll();
   burgerHover();
   initColorTheme();
   menuWork();
   searchWork();
}

function initHomeHeroSlider() {
   const videos = document.querySelectorAll(".home-hero video");
   if (!document.querySelector(".home-hero .swiper")) return;
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
   const soundWave = document.querySelector(".home-hero .sound-wave");
   soundBtn.addEventListener("click", () => {
      let isMuted = videos[0].muted ? true : false;
      videos.forEach((video) => {
         if (isMuted) {
            video.muted = false;
            soundBtn.innerHTML = "Выключить звук";
            soundWave.classList.add("play");
         } else {
            video.muted = true;
            soundBtn.innerHTML = "Включить звук";
            soundWave.classList.remove("play");
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
function homeAboutParallax() {
   const section = document.querySelector(".home-about");
   let ratio = 0.3;
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
         let value = -1 * start * ratio;
         image.style.transform = `translate(0, ${value}px)`;
      }
   });
}
function makeCatalogFilters() {
   const filter = document.querySelector(".catalog-filter");
   if (!filter) return;
   makeRange("#priceRange", 4000000, 100000);
   makeRange("#lengthRange", 2000, 10);
   makeRange("#widthRange", 200, 10);
   makeRange("#heightRange", 500, 10);
   makeRange("#weigthRange", 200, 5);
   const openBtn = document.querySelector(".catalog-filter__open");
   const closeBtn = document.querySelector(".catalog-filter__close");
   const spoilers = () => {
      const headers = document.querySelectorAll(".filter-spoiler");
      headers.forEach((item) => {
         item.addEventListener("click", (e) => {
            const spoiler = item.nextElementSibling;
            if (spoiler.classList.contains("collapsing")) return;
            if (spoiler.classList.contains("collapse_show")) {
               slideHide(spoiler);
               item.classList.remove("active");
            } else {
               slideShow(spoiler);
               item.classList.add("active");
            }
         });
      });
   };
   const open = () => {
      filter.classList.add("open");
      body.classList.add("lock");
   };
   const close = () => {
      filter.classList.remove("open");
      body.classList.remove("lock");
   };

   spoilers();
   openBtn.addEventListener("click", open);
   closeBtn.addEventListener("click", close);
}

function makeRange(blockSelector, max = 10000, gap = 500) {
   //  Script.js
   const rangevalue = document.querySelector(
      blockSelector + " " + ".slider-container .price-slider"
   );
   if (
      !document.querySelector(
         blockSelector + " " + ".slider-container .price-slider"
      )
   )
      return;
   const rangeInputvalue = document.querySelectorAll(
      blockSelector + " " + ".range-input input"
   );

   // Set the price gap
   let priceGap = gap;

   // Adding event listners to price input elements
   const priceInputvalue = document.querySelectorAll(
      blockSelector + " " + ".price-input input"
   );
   for (let i = 0; i < priceInputvalue.length; i++) {
      priceInputvalue[i].addEventListener("input", (e) => {
         // Parse min and max values of the range input
         let minp = parseInt(priceInputvalue[0].value);
         let maxp = parseInt(priceInputvalue[1].value);
         let diff = maxp - minp;

         if (minp < 0) {
            alert("minimum price cannot be less than 0");
            priceInputvalue[0].value = 0;
            minp = 0;
         }

         // Validate the input values
         if (maxp > max) {
            alert("maximum price cannot be greater than " + max);
            priceInputvalue[1].value = max;
            maxp = max;
         }

         if (minp > maxp - priceGap) {
            priceInputvalue[0].value = maxp - priceGap;
            minp = maxp - priceGap;

            if (minp < 0) {
               priceInputvalue[0].value = 0;
               minp = 0;
            }
         }

         // Check if the price gap is met
         // and max price is within the range
         if (diff >= priceGap && maxp <= rangeInputvalue[1].max) {
            if (e.target.className === "min-input") {
               rangeInputvalue[0].value = minp;
               let value1 = rangeInputvalue[0].max;
               rangevalue.style.left = `${(minp / value1) * 100}%`;
            } else {
               rangeInputvalue[1].value = maxp;
               let value2 = rangeInputvalue[1].max;
               rangevalue.style.right = `${100 - (maxp / value2) * 100}%`;
            }
         }
      });

      // Add event listeners to range input elements
      for (let i = 0; i < rangeInputvalue.length; i++) {
         rangeInputvalue[i].addEventListener("input", (e) => {
            let minVal = parseInt(rangeInputvalue[0].value);
            let maxVal = parseInt(rangeInputvalue[1].value);

            let diff = maxVal - minVal;

            // Check if the price gap is exceeded
            if (diff < priceGap) {
               // Check if the input is the min range input
               if (e.target.className === "min-range") {
                  rangeInputvalue[0].value = maxVal - priceGap;
               } else {
                  rangeInputvalue[1].value = minVal + priceGap;
               }
            } else {
               // Update price inputs and range progress
               priceInputvalue[0].value = minVal;
               priceInputvalue[1].value = maxVal;
               rangevalue.style.left = `${
                  (minVal / rangeInputvalue[0].max) * 100
               }%`;
               rangevalue.style.right = `${
                  100 - (maxVal / rangeInputvalue[1].max) * 100
               }%`;
            }
         });
      }
   }
}

function devideNumber(start) {
   let int = String(start);
   if (int.length <= 3) return int;
   let space = 0;
   let number = "";

   for (let i = int.length - 1; i >= 0; i--) {
      if (space == 3) {
         number = " " + number;
         space = 0;
      }
      number = int.charAt(i) + number;
      space++;
   }

   return number;
}
function productPage() {
   function initProductPageSlider() {
      if (!document.querySelector(".product-hero__gallery .swiper")) return;
      const swiper = new Swiper(".product-hero__gallery .swiper", {
         slidesPerView: 1,
         speed: 700,
         loop: true,
         pagination: {
            el: ".product-hero__gallery .swiper .swiper-pagination",
         },
      });
   }

   function initProductPageFeaturesSlider() {
      if (!document.querySelector(".product-features__textslider")) return;
      let imageSlider = new Swiper(".product-features__imageslider", {
         watchSlidesProgress: true,
         speed: 700,
         effect: "creative",
         creativeEffect: {
            prev: {
               shadow: true,
               translate: ["-20%", 0, -1],
            },
            next: {
               translate: ["100%", 0, 0],
            },
         },
      });
      let textSlider = new Swiper(".product-features__textslider", {
         parallax: true,
         slidesPerView: 1,
         speed: 700,
         mousewheel: {
            enabled: true,
            forceToAxis: true,
         },
         effect: "fade",
         thumbs: {
            swiper: imageSlider,
         },
         pagination: {
            el: ".product-features__pagination",
         },
         navigation: {
            nextEl: ".product-features__footer .swiper-button-next",
            prevEl: ".product-features__footer .swiper-button-prev",
         },
      });
   }
   const hoverOnDocuments = () => {
      const items = document.querySelectorAll(".product-document");
      if (!items.length) return;
      items.forEach((item, i) => {
         const bg = item.querySelector(".product-document__bg");
         item.onmouseenter = (e) => {
            if (i > 0) {
               items[i - 1].style.borderBottomColor = "transparent";
            }
            let h = item.offsetHeight;

            if (e.layerY > h / 2) {
               // bg.style.color = "100% 0%;";
               bg.style.transformOrigin = "100% 0%";
            } else {
               bg.style.transformOrigin = "0 100%";
            }
            bg.style.translate = "0 0 ";
         };
         item.onmouseleave = (e) => {
            if (i > 0) {
               items[i - 1].style.borderBottomColor = "";
            }
            let h = item.offsetHeight;

            if (e.layerY > h / 2) {
               // bg.style.color = "100% 0%;";
               bg.style.transformOrigin = "100% 0%";
               bg.style.translate = "0 100%";
            } else {
               bg.style.translate = "0 -100%";
               bg.style.transformOrigin = "0 100%";
            }
         };
         item.onmousemove = (e) => {};
      });
   };
   hoverOnDocuments();
   initProductPageSlider();
   initProductPageFeaturesSlider();
   tabs("[name='productPageTabs']", ".product-page__tab");
   tabs("[name='bonusModalTabs']", ".bonus-modal__item");
   tabs("[name='installmentModalTabs']", ".installment-modal__item");

   const shutter = document.querySelector(".product-actions__main");
   const mobileShutter = () => {
      const footer = document.querySelector(".footer");
      if (window.innerWidth >= 1024) {
         shutter.classList.remove("hidden");
         return;
      }
      if (window.innerHeight - footer.getBoundingClientRect().top > 0) {
         shutter.classList.contains("hidden")
            ? ""
            : shutter.classList.add("hidden");
      } else {
         shutter.classList.remove("hidden");
      }
   };
   if (shutter) {
      mobileShutter();
      window.addEventListener("scroll", mobileShutter);
      window.addEventListener("resize", mobileShutter);
   }
   function initPlayer() {
      if (!document.querySelector("#productPagePlayer")) return;
      let player = new Player("#productPagePlayer", {
         data: [
            {
               src: "files/1.mp3",
            },
            {
               src: "files/2.mp3",
            },
         ],
         onPause() {
            btn.classList.remove("playing");
         },
         onPlay() {
            btn.classList.add("playing");
         },
      });
      const btn = document.querySelector(".product-hero__play");
      const close = document.querySelector(".my-player__close");
      btn.addEventListener("click", () => {
         if (player.isPausedCurrent()) {
            player.play();
         } else {
            player.pauseCurrent();
         }
         player.$el.classList.add("show");
      });
      close.addEventListener("click", () => {
         player.$el.classList.remove("show");
         player.stop();
      });
   }
   initPlayer();
}
function initSeriaSwiper() {
   if (!document.querySelector(".seria-more .swiper")) return;
   let slider = new Swiper(".seria-more .swiper", {
      slidesPerView: "auto",
      spaceBetween: 8,
      speed: 800,
      breakpoints: {
         569: {
            slidesPerView: 3,
            spaceBetween: 10,
         },
      },
   });
}
function animations() {
   const animateProductPleasure = () => {
      const items = document.querySelectorAll(".product-pleasure__list li");
      if (!items.length) return;
      const borders = document.querySelectorAll(
         ".product-pleasure__list li .b"
      );
      items.forEach((item) => {
         gsap.from(item, {
            scrollTrigger: {
               trigger: item, // элемент, который должен запускать анимацию
               start: "top 90%", // когда верх элемента достигает 80% высоты экрана
               end: "top 80%", // когда низ элемента достигает 20% высоты экрана
               // markers: true, // включить маркеры для визуальной отладки
               scrub: 1.5,
            },
            x: -30,
            color: "#fff",
            duration: 1,
         });
      });
      borders.forEach((item) => {
         gsap.from(item, {
            scrollTrigger: {
               trigger: item, // элемент, который должен запускать анимацию
               start: "top 90%", // когда верх элемента достигает 80% высоты экрана
               end: "top 80%", // когда низ элемента достигает 20% высоты экрана
               // markers: true, // включить маркеры для визуальной отладки
               scrub: 1.5,
            },
            scaleX: 0,
            duration: 1,
         });
      });
   };
   const animateAboutPage = () => {
      const hero = document.querySelector(".about-hero");
      const panel = document.querySelector(".about-hero__row");
      const years = document.querySelectorAll(".about-year");
      const yearsLists = document.querySelectorAll(".about-hero__list li");
      // const main = document.querySelector(".about-main");
      if (!panel) return;
      gsap.to(panel, {
         scrollTrigger: {
            trigger: hero, // элемент, который должен запускать анимацию
            start: "top -5%", // когда верх элемента достигает 80% высоты экрана
            end: "bottom -1000%", // когда низ элемента достигает 20% высоты экрана
            // markers: true, // включить маркеры для визуальной отладки
            scrub: 1.5,
            onEnter: () => {
               panel.classList.add("sticky");
               hero.classList.add("sticky");
               // main.classList.add("sticky");
            },
            onLeave: () => {
               panel.classList.remove("sticky");
               hero.classList.remove("sticky");
               // main.classList.remove("sticky");
            },
            onEnterBack: () => {
               panel.classList.add("sticky");
               hero.classList.add("sticky");
               // main.classList.add("sticky");
            },
            onLeaveBack: () => {
               panel.classList.remove("sticky");
               hero.classList.remove("sticky");
               // main.classList.remove("sticky");
            },
         },
      });
      gsap.to(hero, {
         scrollTrigger: {
            trigger: hero, // элемент, который должен запускать анимацию
            start: "top top", // когда верхняя часть panel достигает верхней части экрана
            end: "bottom -1000%", // когда нижняя часть panel достигает верхней части экрана
            // markers: true, // включить маркеры для визуальной отладки
            scrub: 1.5,
            pin: true, // Фиксирует элемент
            pinSpacing: false, // Убирает отступ после окончания анимации
            // onEnter: () => {
            //    console.log("onEnter");
            // },
            // onLeave: () => {
            //    console.log("onLeave");
            // },
            // onEnterBack: () => {
            //    console.log("onEnterBack");
            // },
            // onLeaveBack: () => {
            //    console.log("onLeaveBack");
            // },
         },
      });
      years.forEach((year, index) => {
         gsap.to(year, {
            scrollTrigger: {
               trigger: year, // элемент, который должен запускать анимацию
               start: "top 300px", // когда верх элемента достигает 80% высоты экрана
               end: "bottom +=300px", // когда низ элемента достигает 20% высоты экрана
               // markers: true, // включить маркеры для визуальной отладки
               scrub: 1.5,
               onEnter: () => {
                  // console.log("onEnter", index);
                  yearsLists.forEach((item) => {
                     item.classList.remove("active");
                     item.style.translate = `0 -${
                        (item.offsetHeight + 10) * index
                     }px`;
                  });
                  yearsLists[index].classList.add("active");
               },
               onLeave: () => {
                  // console.log("onLeave", index);
               },
               onEnterBack: () => {
                  // console.log("onEnterBack", index);
                  yearsLists.forEach((item) => {
                     item.classList.remove("active");
                     item.style.translate = `0 -${
                        (item.offsetHeight + 10) * index
                     }px`;
                  });
                  yearsLists[index].classList.add("active");
               },
               onLeaveBack: () => {
                  // console.log("onLeaveBack", index);
               },
            },
         });
      });
      gsap.utils.toArray(years).forEach((section, index) => {
         // Скроллим каждую секцию
         gsap.fromTo(
            section,
            { y: 0, zIndex: index }, // Исходная позиция
            {
               ease: "none",
               scrollTrigger: {
                  trigger: section,
                  start: "top top", // Когда верх секции достигает верха окна
                  end: "bottom top", // Когда низ секции достигает верха окна
                  scrub: true, // Анимация связана со скроллом
                  pin: true, // Можно выключить pin для плавности
                  onEnter: () => {
                     console.log("onEnter");
                  },
                  onLeave: () => {
                     console.log("onLeave");
                  },
                  onEnterBack: () => {
                     console.log("onEnterBack");
                  },
                  onLeaveBack: () => {
                     console.log("onLeaveBack");
                  },
                  onUpdate: (self) => {
                     if (
                        section.offsetHeight * (1 - self.progress) <=
                        window.innerHeight - 30
                     )
                        return;
                     section.style.translate = `0px ${self.progress * -100}%`;
                  },
               },
            }
         );
      });
   };
   animateProductPleasure();
   animateAboutPage();
}

function authModals() {
   const modal = document.querySelector("#authModal");
   if (!modal) return;
   tabs("[name='authModalTabs']", ".auth-modal__tab");

   const validateTel = () => {
      const input = document.querySelector("#authPhone");
      const btn = document.querySelector("#regBtn");
      input.addEventListener("input", (e) => {
         if (e.target.value.length == 16) {
            btn.classList.remove("disabled");
         } else {
            btn.classList.add("disabled");
         }
      });
   };

   const validateConfirmTel = () => {
      const input = document.querySelector("#confirmNumberInput");
      const btn = document.querySelector("#confirmNumberBtn");
      const span = document.querySelector("#confirmTelOneMore");
      const send = document.querySelector("#confirmTelOneMoreSend");
      const spanTimer = span.querySelector("span");
      let isSend = false;

      const sendMessage = () => {
         let timer = setInterval(() => {
            spanTimer.innerHTML = spanTimer.innerHTML - 1;
            if (spanTimer.innerHTML == 0) {
               clearInterval(timer);
               isSend = false;
               spanTimer.innerHTML = 30;
               send.style.display = "block";
               span.style.display = "none";
            }
         }, 1000);
      };

      input.addEventListener("input", (e) => {
         if (e.target.value) {
            btn.classList.remove("disabled");
         } else {
            btn.classList.add("disabled");
         }
      });
      btn.addEventListener("click", () => {
         if (isSend) return;
         isSend = true;

         sendMessage();
      });
      send.addEventListener("click", (e) => {
         send.style.display = "none";
         span.style.display = "block";
         sendMessage();
      });
   };

   validateTel();
   validateConfirmTel();
}
function orderPage() {
   if (!document.querySelector("#orderAddressSelect")) return;
   const orderAddressSelect = new Select("#orderAddressSelect", {
      placeholder: "Город",
      // selectedId: "volg",
      data: [
         {
            id: "Москва",
            value: "Москва",
         },
         {
            id: "Волгоград",
            value: "Волгоград",
         },
         {
            id: "Батуми",
            value: "Батуми",
         },
      ],
      onSelect(item, select) {
         select.classList.add("filled");
      },
   });
   tabs("[name='orderTabs']", ".order-tab");
}
function orderSuccessPage() {
   // const swiper = new Swiper(".order-news .swiper", {
   //    slidesPerView: 2,
   //    spaceBetween: 10,
   //    breakpoints: {
   //       1440: {
   //          slidesPerView: 4,
   //       },
   //       1200: {
   //          slidesPerView: 3,
   //       },
   //    },
   // });
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
            let content = contents[i];
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

function tabs(linkSelector, contentSelector) {
   const inputs = document.querySelectorAll(linkSelector);
   const contents = document.querySelectorAll(contentSelector);
   let value;
   if (inputs.length) {
      inputs.forEach((item) => {
         item.addEventListener("change", () => {
            if (item.checked) {
               value = item.value;
            }
            contents.forEach((item) => {
               item.classList.remove("active");
               if (item.getAttribute("data-tab") == value) {
                  item.classList.add("active");
               }
            });
         });
      });
   }
}

// Popup
const popupLinks = document.querySelectorAll(".modal__link");
const lockPadding = document.querySelectorAll(".lock-padding");
const popupCloseIcon = document.querySelectorAll(".modal__close");

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute("href").replace("#", "");
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}

if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
         popupClose(el.closest(".modal"));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector(".modal.open");
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add("open");
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest(".modal__content")) {
            popupClose(e.target.closest(".modal"));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   // body.classList.add("lock");
   lenis.stop();

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
         }
      }
      body.style.paddingRight = "0px";
      // body.classList.remove("lock");
      lenis.start();
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener("keydown", function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector(".modal.open");
      popupClose(popupActive);
   }
});

const maskOptions = {
   mask: "+{7} 000 000 00 00",
   // lazy: false,  // make placeholder always visible
   // placeholderChar: '0'     // defaults to '_'
};
if (document.querySelectorAll("[data-phone]").length) {
   document.querySelectorAll("[data-phone]").forEach((item) => {
      const mask = IMask(item, maskOptions);
   });
}
class Select {
   constructor(selector, options) {
      this.$el = document.querySelector(selector);
      this.options = options;
      this.selectedId = options.selectedId;

      this.#render();
      this.#setup();
   }
   #render() {
      this.$el.classList.add("select");
      const { placeholder, data, selectedId } = this.options;
      this.$el.innerHTML = this.getTemplate(data, placeholder, selectedId);
      if (placeholder) {
         this.$el
            .querySelector(`[data-type="input"]`)
            .classList.add("placeholder");
      }
   }
   #setup() {
      this.clickHandler = this.clickHandler.bind(this);
      this.$el.addEventListener("click", this.clickHandler);
      this.$value = this.$el.querySelector(`[data-type="input"] span`);
   }
   clickHandler(event) {
      const { type } = event.target.dataset;
      if (type === "input") {
         this.toggle();
      } else if (type === "item") {
         const { id } = event.target.dataset;
         this.select(id);
      } else if (type === "back") {
         this.toggle();
      } else if (type === "header") {
         this.toggle();
      } else if (event.target.closest(".select__header")) [this.toggle()];
   }
   get current() {
      return this.options.data.find((item) => item.id === this.selectedId);
   }
   select(id) {
      this.$el
         .querySelector(`[data-type="input"]`)
         .classList.remove("placeholder");
      this.selectedId = id;
      this.$value.innerHTML = this.current.value;
      this.$el.querySelectorAll(`[data-type="item"]`).forEach((item) => {
         item.classList.remove("selected");
      });
      this.$el
         .querySelector(`[data-id =${this.current.id}]`)
         .classList.add("selected");
      this.close();

      if (this.options.onSelect) {
         this.options.onSelect(this.current, this.$el);
      }
   }
   open() {
      this.$el.classList.add("open");
   }
   close() {
      this.$el.classList.remove("open");
   }
   toggle() {
      if (this.$el.classList.contains("open")) {
         this.close();
      } else {
         this.open();
      }
   }
   getTemplate(data, placeholder = `<span></span>`, selectedId) {
      const items = data.map((item) => {
         let cls = "";
         if (item.id === selectedId) {
            placeholder = item.value;
            cls = "selected";
         }
         return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>`;
      });
      return `
      <div class="select__header" data-type="header">
      <div class="select__back" data-type="back"></div>
      <div class="select__title" data-type="input">
         <span>${placeholder}</span>
         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="#0E0E0E" stroke-linecap="round"/>
         </svg>
    </div>
      </div>
      <div class="select__content">
         <ul class="select__list">
            ${items.join("")}
         </ul>
      </div>
      `;
   }
}
class Player {
   $el;
   $selector;
   options;
   currentSongIndex;
   items;
   contents;
   progressBar;
   duration;
   timer;
   constructor(selector, options) {
      this.$el = document.querySelector(selector);
      this.$selector = selector;
      this.options = options;
      this.currentSongIndex = options?.current || 0;
      this.#render();
      this.items = this.$el.querySelectorAll(".player__songs li audio");
      this.contents = this.$el.querySelectorAll(".player__item");
      this.initProgressBar();
      this.progressBar = this.$el.querySelector(".player__progress");
      this.#setup();
      this.setTime();
   }
   #render() {
      this.$el.classList.add("player");
      const { data } = this.options;
      this.$el.insertAdjacentHTML("beforeend", this.getTemplate(data));
   }
   #setup() {
      this.clickHandler = this.clickHandler.bind(this);
      this.$el.addEventListener("click", this.clickHandler);
   }

   initProgressBar() {
      const range = this.$el.querySelector('input[type="range"]');

      range.addEventListener("input", (e) => {
         clearInterval(this.timer);
         this.setTime();
         this.pauseCurrent();
         range.style.setProperty("--value", `${e.target.value}%`);
         this.items[this.currentSongIndex].currentTime =
            (e.target.value / 100) * this.duration;
      });
      range.addEventListener("change", (e) => {
         this.playCurrent();
      });
   }
   getTemplate(data) {
      const items = data.map((item) => {
         return `<li><audio src="${item.src}"></audio></li>`;
      });
      return `
         <ul class="player__songs">
            ${items.join("")}
         </ul>
      `;
   }
   playCurrent() {
      this.items[this.currentSongIndex].play();
      this.$el.classList.add("playing");
      clearInterval(this.timer);
      this.setTime();
      if (this.options.onPlay) {
         this.options.onPlay(this);
      }
   }
   play(index) {
      if (index) {
         this.currentSongIndex = index;
      }
      this.playCurrent();
   }
   pauseCurrent() {
      this.items[this.currentSongIndex].pause();
      this.$el.classList.remove("playing");
      if (this.options.onPause) {
         this.options.onPause(this);
      }
      clearInterval(this.timer);
      this.setTime();
   }
   isPausedCurrent() {
      return this.items[this.currentSongIndex].paused;
   }
   toggleSwitch() {
      if (this.isPausedCurrent()) {
         this.playCurrent();
      } else {
         this.pauseCurrent();
      }
   }
   onNextSong() {
      if (this.currentSongIndex == this.options.data.length - 1) return;
      this.pauseCurrent();
      this.items[this.currentSongIndex].currentTime = 0.0;
      this.currentSongIndex++;
      this.playCurrent();
      this.setTime();
      this.makeActiveContent();
      if (this.options.onNext) {
         this.options.onNext(this);
      }
   }
   onPrevSong() {
      if (this.currentSongIndex <= 0) return;
      this.pauseCurrent();
      this.items[this.currentSongIndex].currentTime = 0.0;
      this.currentSongIndex--;
      this.playCurrent();
      this.setTime();
      this.makeActiveContent();
      if (this.options.onPrev) {
         this.options.onPrev(this);
      }
   }
   makeActiveContent() {
      this.contents.forEach((item) => {
         item.classList.remove("active");
      });
      this.contents[this.currentSongIndex].classList.add("active");
   }
   clickHandler(event) {
      let target = event.target;
      if (target.closest(".player__switch")) {
         this.toggleSwitch();
      } else if (target.closest(".player__prev")) {
         this.onPrevSong();
      } else if (target.closest(".player__next")) {
         this.onNextSong();
      }
   }
   formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      // Добавляем 0 перед числом секунд, если оно меньше 10
      return `${minutes}:${
         remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
   }
   setTime() {
      this.duration = this.items[this.currentSongIndex].duration;
      const all = this.$el.querySelector(".player__time_all");
      const current = this.$el.querySelector(".player__time_current");
      all.innerHTML = this.formatTime(this.duration);
      if (this.isPausedCurrent()) return;
      this.timer = setInterval(() => {
         this.setProgress();
         current.innerHTML = this.formatTime(
            this.items[this.currentSongIndex].currentTime
         );
         if (
            this.duration - this.items[this.currentSongIndex].currentTime <
            1
         ) {
            this.onNextSong();
            clearInterval(this.timer);
         }
      }, 1000);
   }
   getProgress() {
      return (
         (this.items[this.currentSongIndex].currentTime / this.duration) * 100
      );
   }
   setProgress() {
      this.progressBar.value = this.getProgress();
      this.progressBar.style.setProperty("--value", `${this.getProgress()}%`);
   }
   stop() {
      this.pauseCurrent();
      this.items[this.currentSongIndex].currentTime = 0.0;
   }
}

const lenis = new Lenis({
   duration: 2,
   smooth: true,
   direction: "vertical",
   // lerp: 0.05,
});
window.lenis = lenis;

function raf(time) {
   lenis.raf(time);
   requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
   anchor.addEventListener("click", function (e) {
      e.preventDefault();
      lenis.scrollTo(this.getAttribute("href"));
   });
});

function initSaleSwiper() {
   if (!document.querySelector(".sale-products .swiper")) return;
   const swiper = new Swiper(".sale-products .swiper", {
      slidesPerView: "auto",
      spaceBetween: 10,
      breakpoints: {
         993: {
            slidesPerView: 2,
         },
      },
   });
}
function profilePage() {
   if (!document.querySelector("#accountAddressSelect")) return;
   const orderAddressSelect = new Select("#accountAddressSelect", {
      placeholder: "Город",
      // selectedId: "volg",
      data: [
         {
            id: "Москва",
            value: "Москва",
         },
         {
            id: "Волгоград",
            value: "Волгоград",
         },
         {
            id: "Батуми",
            value: "Батуми",
         },
      ],
      onSelect(item, select) {
         select.classList.add("filled");
      },
   });
   tabs("[name='profileTabs']", ".account-tab");
   accordion(".account-order__header button", ".account-order__spoiler");
}

function comparePage() {
   const productSlide = new Swiper(".compare-page__slider .swiper", {
      slidesPerView: "auto",
      breakpoints: {
         1025: {
            slidesPerView: 3,
         },
         569: {
            slidesPerView: 2,
         },
      },
      on: {
         slideChange(s) {
            let index = s.activeIndex;
            diffSliders.forEach((slider) => {
               slider.slideTo(index);
            });
         },
      },
   });
   let diffSliders = [];
   document.querySelectorAll("[data-compare-slider]").forEach((item) => {
      let diffSlider = new Swiper(item, {
         slidesPerView: "auto",
         breakpoints: {
            1025: {
               slidesPerView: 3,
            },
            569: {
               slidesPerView: 2,
            },
         },
         // cssMode: true,
      });
      diffSliders.push(diffSlider);
   });
}
