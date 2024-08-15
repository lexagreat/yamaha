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

      burger.addEventListener("mouseover", (e) => {
         fill.style.left = e.offsetX + "px";
         fill.style.top = e.offsetY + "px";
         fill.style.scale = 1;
      });
      burger.addEventListener("mouseout", (e) => {
         fill.style.left = e.offsetX + "px";
         fill.style.top = e.offsetY + "px";
         fill.style.scale = 0;
      });
   };

   window.addEventListener("scroll", animateHeaderOnScroll);
   animateHeaderOnScroll();
   burgerHover();
}

function initHomeHeroSlider() {
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
   });
}
