import axios from "axios";
import React, {useEffect, useState} from "react";

function Slider() {
  //API is open, no authentication required
  const [val, setVal] = useState();

  const url = "http://acnhapi.com/v1/villagers";

  const villagerContainer = document.querySelector(".villager-container");
  const gallery = document.querySelector(".gallery");
  const leftBtn = document.querySelector(".left");
  const rightBtn = document.querySelector(".right");

  async function displayUI(dataObj) {
    for (const villager in dataObj) {
      console.log(dataObj[villager]["name"]["name-USen"]);

      let htmlTemplate = `
    <div class="villager-card">
      <h2>${dataObj[villager]["name"]["name-USen"]}</h2>
      <div class="gen-info" >
        <p>Species: ${dataObj[villager]["species"]}</p>
        <p>Personality: ${dataObj[villager]["personality"]}</p>
        <p>Catchphrase: "${dataObj[villager]["catch-phrase"]}"</p>
      </div>

      <img src="${dataObj[villager]["image_uri"]}" alt="${dataObj[villager]["name"]["name-USen"]}" width="250" height="250">

    </div>
  `;

      gallery.insertAdjacentHTML("beforeend", htmlTemplate);
    }
  }

  async function fetchChars() {
    const response = await axios(url);
    setVal(response.data);
    displayUI(val);
    blockSwipe();
    leftBtn.addEventListener("click", slideLeft);
    rightBtn.addEventListener("click", slideRight);
    compareValue();
  }

  useEffect(() => {
    fetchChars();
  }, [val]);

  let currentSlide = 0;

  function slideRight() {
    const galleryItems = villagerContainer.querySelectorAll(".villager-card");
    const slideCount = galleryItems.length;
    const width = galleryItems[0].clientWidth;
    console.log(currentSlide);

    if (currentSlide < slideCount - 1) {
      console.log("Right Slide");
      currentSlide += 1;
      gallery.style.transform = `translateX(-${width * currentSlide}px)`;
      console.log(currentSlide);
      console.log(gallery.style.transform);
    } else {
      gallery.style.transform = `tranlsateX(0)`;
      console.log("Reset");
      currentSlide = 0;
    }
  }

  function slideLeft() {
    const galleryItems = villagerContainer.querySelectorAll(".villager-card");
    const slideCount = galleryItems.length;
    const width = galleryItems[0].clientWidth;
    console.log(currentSlide);
    if (currentSlide < slideCount && currentSlide >= 0) {
      console.log("Left Slide");
      currentSlide--;
      gallery.style.transform = `translateX(-${width * currentSlide}px)`;
      console.log(currentSlide);
    } else {
      gallery.style.transform = `tranlsateX(0)`;
      currentSlide = 0;
    }
  }
  function compareValue() {
    let form = document.querySelector(".search-form");
    let villagers = document.querySelectorAll(".villager-card");

    form.addEventListener("submit", function (e) {
      console.log(e.target[0].value);
      e.preventDefault();
      console.log(currentSlide + "Submit");
      let response = e.target[0].value;

      villagers.forEach((villager, index) => {
        if (response === villager.firstElementChild.innerText) {
          currentSlide = index;
          console.log(currentSlide + " before Transform");
          gallery.style.transform = `translateX(-${1000 * index}px)`;
          console.log(index);
          //filter thru villagers , if villager == response then grab the index (indexOf) of that specific villager
          console.log(gallery.style.transform);
          console.log(currentSlide + " After Transform");
          console.log(index);
          e.target.elements.search.value = "";
          //replace current card with specific villager (track by name or other)
        }
      });
    });
  }

  function blockSwipe() {
    const element = document.querySelector(".gallery");

    element.addEventListener("touchstart", (e) => {
      // is not near edge of view, exit
      if (e.pageX > 10 && e.pageX < window.innerWidth - 10) return;

      // prevent swipe to navigate gesture
      e.preventDefault();
    });
  }

  return (
    <div class="villager-container">
      <div class="gallery"></div>
      <button class="btn left">-</button>
      <button class="btn right">+</button>
    </div>
  );
}

export default Slider;
