let homePage = document.querySelector(".home");
let colorsLi = document.querySelectorAll(".setting-box .colors li");
let backgroundOptionBtn = document.querySelectorAll(".random-background .btn span");
let bulletsParent = document.querySelector(".nav-bar .bullets");
let bulletsOption = document.querySelectorAll(".show-bullets .btn span");
let chngBackground;
// let chngBackground;
// import setting from local storage
// check if there is color option in local storage
if(localStorage["color-option"]) {
    // set color on root 
    document.documentElement.style.setProperty("--main-color",localStorage.getItem("color-option"));
    removeActive(colorsLi);
    // add active class on choosing color
    colorsLi.forEach(li =>{
      li.dataset.color == localStorage.getItem("color-option") ? li.classList.add("active"):"";
    })
}
if(localStorage["current-background"]) {
  homePage.style.background = localStorage["current-background"];
}
if(localStorage["random-background"]) {
  randomBckground();
  removeActive(backgroundOptionBtn);
  document.querySelector(".random-background .btn .yes").classList.add("active");

}
if(localStorage["show-bullets"] === "none") {
  bulletsParent.style.display = "none";
  removeActive(bulletsOption);
  document.querySelector(".show-bullets .btn .no").classList.add("active");
}
// Setting box
// get setting button
let settingBtn = document.querySelector(".icon");
settingBtn.onclick = () =>{
  // toggle rotate class on gear icon
  settingBtn.classList.toggle("rotate") ;
  // toggle active class on setting list
  settingBtn.parentElement.classList.toggle("active");
}

// switch colors
// loop on colors list
colorsLi.forEach(color =>{
  // add click event on colors element
  color.addEventListener("click",(e)=>{
    handleActive(e);
    // set color on root
    document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
    // set target color on local storage
    localStorage.setItem("color-option",e.target.dataset.color);
  })
}) 

// random background
// holding btn
backgroundOptionBtn.forEach((e) =>{
    e.addEventListener("click",(ele) =>{
    handleActive(ele);
    
      // check
      // backgroundOptionBtn.innerHTML == "No" ? clearInterval(chngBackground):"";
      // if(e.classList.contains("no")) {
      //   clearInterval(chngBackground);
      // } else {
      //   // Get random index due to length of imgsArray
      //   let i =  Math.ceil(Math.random() * 9) ;
      //   // Changing home background 
      //   homePage.style.background = `url(images/0${i}.jpg})`;
      //   // set url background in local storage
      //   localStorage.setItem("current-background",`url(images/${imgsArray[i]})`);
      // }
      // // e.classList.contains("no") ? clearInterval(chngBackground):"";
    if(e.classList.contains("yes")) {
      randomBckground();      
      localStorage.setItem("random-background",true);
    } else {      
      clearInterval(chngBackground);
      localStorage.setItem("random-background",false);
    }
  })
})

// show bullets
bulletsOption.forEach((btn) =>{
  btn.addEventListener("click",(ele) =>{
    handleActive(ele);
    if(ele.target.classList.contains("yes")) {
      bulletsParent.style.display = "block";
      localStorage.setItem("show-bullets","block");
    } else {
      bulletsParent.style.display = "none";
      localStorage.setItem("show-bullets","none");
    }
  })
})

// reset options
document.querySelector(".reset-option .btn span").addEventListener("click",()=>{
  window.localStorage.clear();
  window.location.reload();
})
// header element
// select links in header area
let links = document.querySelectorAll(".links li");
let menuBtn = document.querySelector(".toggle-menu i");
// let menuLinks = document.querySelector(".links");
// toggle active class on toggle-menu button
menuBtn.addEventListener("click",()=>{
  menuBtn.parentElement.classList.toggle("active");
})
document.addEventListener("click",(e)=>{
  if(e.target != document.querySelector(".links") && e.target != menuBtn) {
    menuBtn.parentElement.classList.remove("active");
  }
})
// document.addEventListener("click",(e)=>{
//   if(!e.target.classList.contains("toggle-menu")) {
//     menuBtn.classList.remove("active");
//   }
// })
// Get array of images
let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg","06.png","07.jpg","08.jpg","10.jpg","09.jpg"]


// select skills 
let skills = document.querySelector(".our-skills");

window.onscroll = () =>{
  if(this.scrollY > (skills.offsetTop + skills.offsetHeight - this.innerHeight)) {
    let allSkills = document.querySelectorAll(".our-skills .skill-box .skill-progress span");
    allSkills.forEach((skill)=>{
      skill.style.width = skill.dataset.progress;
    })
  }
}

// Create Popup Box With The Image
let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach(img =>{
  img.addEventListener("click",(e) => {
    // create overlay element
    let overlay = document.createElement("div");
    
    // add class to overlay 
    overlay.className = "popup-overlay";

    // append overlay to body
    document.body.appendChild(overlay);
    
    // create img popup
    let imgPopup = document.createElement("img");

    // add class to popup img
    imgPopup.className = "popup-img";

    // add src to popup img
    imgPopup.src = img.src;
    // append popup img to body;
    document.body.appendChild(imgPopup);

    // add blur event to popup img ///////////////////////////////// 
    document.querySelector(".popup-overlay").addEventListener("click",() =>{
      document.querySelector(".popup-img").remove();
      document.querySelector(".popup-overlay").remove();
    })

  })
})

// scroll to section 

let sectionNames = document.querySelectorAll(".section");
let sectionClasses = [];
sectionNames.forEach(section =>{
  sectionClasses.push(section.classList[0]);
})

initBullets(sectionClasses);

let bullets = document.querySelectorAll(".nav-bar .bullets li");

moveToSection(bullets);
moveToSection(links);

function randomBckground() {
  chngBackground = setInterval(() => {
    // Get random index due to length of imgsArray
    let i =  Math.ceil(Math.random() * 9) ;
    // Changing home background 
    homePage.style.background = `url(images/0${i}.jpg)`;
    // set url background in local storage
    localStorage.setItem("current-background",`url(images/0${i}.jpg)`);
    // check
    // backgroundOptionBtn.innerHTML == "No" ? clearInterval(chngBackground):"";
    // e.classList.contains("no") ? clearInterval(chngBackground):"";
  }, 3000);
}

function handleActive(e) {
  // remove active class from all lis
  e.target.parentElement.querySelectorAll(".active").forEach(child=>{
    child.classList.remove("active");
  });
  // add active class on target element
  e.target.classList.add("active");
}

// remove active class from group elements
function removeActive(e) {
  e.forEach((ele) =>{
    ele.classList.remove("active")
  })
}
function initBullets(sectionClasses) {
  sectionClasses.forEach(section =>{
    let li = document.createElement("li");
    li.setAttribute("data-section",section);
    let span = document.createElement("span");
    span.append(section);
    span.style.textTransform = "capitalize";
    li.appendChild(span);
    document.querySelector(".nav-bar .bullets").appendChild(li);
  })
}
function moveToSection(links) {
  links.forEach(link =>{
    link.addEventListener("click",(e)=>{
      e.preventDefault();
      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth"
      })
    })
  })
}