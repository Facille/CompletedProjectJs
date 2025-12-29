"use strict";

const slidesData = [
  {
    cityHtml: "Rostov-on-Don<br>LCD admiral",
    apartmentAreaHtml: "81 m<sup>2</sup>",
    repairTimeText: "3.5 months",
    repairCostText: "Upon request",
    linkText: "ROSTOV-ON-DON, ADMIRAL",
    imageUrl: "img/Rostov-on-Don, Admiral.png",
    imageAlt: "Rostov-on-Don, Admiral",
  },
  {
    cityHtml: "Sochi<br>Thieves",
    apartmentAreaHtml: "105 m<sup>2</sup>",
    repairTimeText: "4 months",
    repairCostText: "Upon request",
    linkText: "SOCHI THIEVES",
    imageUrl: "img/Sochi_Thieves.png",
    imageAlt: "Sochi Thieves",
  },
  {
    cityHtml: "Rostov-on-Don<br>Patriotic",
    apartmentAreaHtml: "93 m<sup>2</sup>",
    repairTimeText: "3 months",
    repairCostText: "Upon request",
    linkText: "ROSTOV-ON-DON PATRIOTIC",
    imageUrl: "img/Rostov-on-Don_Patriotic.png",
    imageAlt: "Rostov-on-Don Patriotic",
  },
];

// DOM
const slider = document.getElementById("slider");
const dotsContainer = document.getElementById("dots");
const linksContainer = document.getElementById("project-links");
const prevArrow = document.querySelector(".arrow-prev");
const nextArrow = document.querySelector(".arrow-next");

const currentSlideEl = document.getElementById("current-slide");
const totalSlidesEl = document.getElementById("total-slides");

// state
let currentIndex = 0;

function buildUI() {
  slidesData.forEach((slide, index) => {
    // slide
    const slideEl = document.createElement("div");
    slideEl.className = `slide ${index === 0 ? "active" : ""}`;
    slideEl.dataset.slideIndex = String(index);

    slideEl.innerHTML = `
      <div class="slide-info">
        <div class="info-header">
          <div>
            <h2>COMPLETED<br>PROJECTS</h2>
          </div>
          <div class="info-line-marker" aria-hidden="true"></div>
        </div>

        <p class="info-desc">
          Only a small part of the work performed by our company is presented on the site.
          For 14 years on in the construction market we have made happy more than 1000 families
        </p>

        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">CITY:</div>
            <div class="info-value" data-field="city"></div>
          </div>

          <div class="info-item">
            <div class="info-label">APARTMENT AREA:</div>
            <div class="info-value" data-field="area"></div>
          </div>

          <div class="info-item">
            <div class="info-label">REPAIR TIME:</div>
            <div class="info-value" data-field="time"></div>
          </div>

          <div class="info-item">
            <div class="info-label">REPAIR COST:</div>
            <div class="info-value" data-field="cost"></div>
          </div>
        </div>
      </div>

      <div class="slide-image">
        <img src="" alt="">
      </div>
    `;

    slider.appendChild(slideEl);

    // dot
    const dotEl = document.createElement("div");
    dotEl.className = `dot ${index === 0 ? "active" : ""}`;
    dotEl.dataset.slideIndex = String(index);
    dotsContainer.appendChild(dotEl);

    // link (tab)
    const linkEl = document.createElement("div");
    linkEl.className = `project-link ${index === 0 ? "active" : ""}`;
    linkEl.dataset.slideIndex = String(index);
    linkEl.textContent = slide.linkText;
    linksContainer.appendChild(linkEl);
  });
}

/** универсальная функция переключения */
function goToSlide(index) {
  const total = slidesData.length;

  // кольцо
  if (index < 0) index = total - 1;
  if (index >= total) index = 0;

  currentIndex = index;

  const slideEls = Array.from(document.querySelectorAll(".slide"));
  const dotEls = Array.from(document.querySelectorAll(".dot"));
  const linkEls = Array.from(document.querySelectorAll(".project-link"));

  slideEls.forEach((el, i) => el.classList.toggle("active", i === currentIndex));
  dotEls.forEach((el, i) => el.classList.toggle("active", i === currentIndex));
  linkEls.forEach((el, i) => el.classList.toggle("active", i === currentIndex));

  // обновляем контент активного слайда
  const activeSlideEl = slideEls[currentIndex];
  const s = slidesData[currentIndex];

  const img = activeSlideEl.querySelector(".slide-image img");
  img.src = s.imageUrl;
  img.alt = s.imageAlt;

  activeSlideEl.querySelector('[data-field="city"]').innerHTML = s.cityHtml;
  activeSlideEl.querySelector('[data-field="area"]').innerHTML = s.apartmentAreaHtml;
  activeSlideEl.querySelector('[data-field="time"]').textContent = s.repairTimeText;
  activeSlideEl.querySelector('[data-field="cost"]').textContent = s.repairCostText;

  // нумерация
  currentSlideEl.textContent = String(currentIndex + 1).padStart(2, "0");
}

function bindEvents() {
  dotsContainer.addEventListener("click", (e) => {
    const target = e.target.closest(".dot");
    if (!target) return;
    goToSlide(Number(target.dataset.slideIndex));
  });

  linksContainer.addEventListener("click", (e) => {
    const target = e.target.closest(".project-link");
    if (!target) return;
    goToSlide(Number(target.dataset.slideIndex));
  });

  prevArrow.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextArrow.addEventListener("click", () => goToSlide(currentIndex + 1));
}

document.addEventListener("DOMContentLoaded", () => {
  buildUI();
  bindEvents();

  totalSlidesEl.textContent = String(slidesData.length).padStart(2, "0");
  goToSlide(0);
});
