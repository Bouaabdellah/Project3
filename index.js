window.onload = () =>{
    displaySettingsFirst();
};
// change the general setting of the bage
let parentSetting = document.querySelector(".box-settings");
let boxSettings = document.querySelector(".box-settings .box");
let symbol = document.querySelector(".box-settings .symbol");
let display = true;
// display them for the first time
let colors = document.createElement("div");
colors.className = "color";
let allColors = ["rgb(255, 215, 0)","rgb(233, 30, 97)","#2196f3","rgb(0, 150, 136)","rgb(255, 99, 71)"];
let currentActive = 2, previousActive = 2;

function displaySettingsFirst(){
    // displayColors
    let title = document.createElement("h3");
    title.innerHTML = "Colors";
    let colorsContainer = document.createElement("div");
    colorsContainer.className = "cont";
    for (let i = 0; i < allColors.length; i++){
        let span = document.createElement("span");
        span.style.backgroundColor = allColors[i];
        colorsContainer.appendChild(span);
    };
    colorsContainer.children[currentActive].classList.add("active");
    colors.appendChild(title);
    colors.appendChild(colorsContainer);
    boxSettings.appendChild(colors);
    // make the reset option
    let reset = document.createElement("button");
    reset.className = "reset";
    reset.innerHTML = "reset options";
    boxSettings.appendChild(reset);
    resetClick();
    // check if there is local storage
    checkStorage();
    // set colors
    setMainColor();
};
function resetClick(){
    let resetButton = document.querySelector(".box-settings .reset");
    resetButton.addEventListener("click",() =>{
        localStorage.clear();
        window.location.reload();
    });
}
function checkStorage(){
    if (window.localStorage.getItem("mainColor")){
        document.documentElement.style.setProperty("--main-color",window.localStorage.getItem("mainColor"));
            document.documentElement.style.
            setProperty("--alt-color",convertToRGBA(window.localStorage.getItem("mainColor"),0.8));
            currentActive = +window.localStorage.getItem("mainColorIndex");
            document.querySelectorAll(".box-settings .box .color .cont span")
            [previousActive].classList.remove("active");
            document.querySelectorAll(".box-settings .box .color .cont span")
            [currentActive].classList.add("active");
    }
};
// set the main color of your bage and store it in local storage
function convertToRGBA(color,opacity){
    let i = 4, r = "",g = "",b = "";
    for (; color[i] !== ","; i++)
        r += color[i];
    for (i = i+1; color[i] !== ","; i++)
        g += color[i];
    for (i = i+1; color[i] !== ")"; i++)
        b += color[i];
    return `rgba(${r},${g},${b},${opacity})`;
}
function setMainColor(){
    let myColors = document.querySelectorAll(".box-settings .box .color .cont span");
    myColors.forEach((col,index) => {
        col.addEventListener("click", () => {
            document.documentElement.style.setProperty("--main-color",col.style.backgroundColor);
            document.documentElement.style.
            setProperty("--alt-color",convertToRGBA(col.style.backgroundColor,0.8));
            // set local storage
            window.localStorage.setItem("mainColor",`${col.style.backgroundColor}`);
            window.localStorage.setItem("mainColorIndex",`${index}`);
            previousActive = currentActive;
            currentActive = index;
            col.classList.add("active");
            myColors[previousActive].classList.remove("active");
        });
    });
}
// display the settings
function displaySettings(){
    parentSetting.classList.add("display");
    parentSetting.classList.remove("heading");
    symbol.children[0].classList.add("rotate");
};
function headSettings(){
    parentSetting.classList.add("heading");
    parentSetting.classList.remove("display");
    symbol.children[0].classList.remove("rotate");
}
symbol.addEventListener("click", () => {
    if (display){
        displaySettings();
        display = false;
    }
    else{
        headSettings();
        display = true;
    }
});

// begin the value of skills from 0
let skillsSection = document.querySelector(".our-skills");
let skills = document.querySelectorAll(".our-skills .languages .box span");
let startedSkills = false;
function loadSkillsValue(){
    for (let i = 0; i < skills.length; i++){
        skills[i].style.width = skills[i].getAttribute("data-progress"); 
    }
}

// incease the number of stats from 0
let statsSection = document.querySelector(".stats");
let statsSpan = document.querySelectorAll(".stats .box span:first-of-type");
let startedStats = false;
function increaseStats(){
    for (let i = 0; i < statsSpan.length; i++){
        let goal = statsSpan[i].getAttribute("data-goal");
        let j = 1;
        let countdown = setInterval(() => {
            statsSpan[i].innerHTML = j++;
            if (j > +goal)
                clearInterval(countdown);
        },Math.floor(3000 / goal))
    }
}
let galerySection = document.querySelector(".gallery");
function createArrowUp(){
    let arrowUp = document.createElement("i");
    arrowUp.classList.add("fa-solid","fa-angles-up","arrowUp");
    document.body.appendChild(arrowUp);
    // move you to the begining of bege
    arrowUp.addEventListener("click", () =>{
        window.scrollTo(0,0);
    });
    // remove it
    window.addEventListener("scroll",() =>{
        if (window.scrollY < galerySection.offsetTop)
            arrowUp.remove();
    });
}

window.onscroll = function(){
    if (window.scrollY >= skillsSection.offsetTop && !startedSkills){
        loadSkillsValue();
        startedSkills = true;
    }
    if (window.scrollY >= statsSection.offsetTop && !startedStats){
        increaseStats();
        startedStats = true;
    }
    // create arrow that return you to the header of page when you scroll much
    if (window.scrollY >= galerySection.offsetTop){
        createArrowUp();
    }
}

// generate the events timer
let now = new Date();
let currentYear = now.getFullYear();

// Create September 29th for current year
let eventDate = new Date(currentYear, 8, 29); // Month is 0-indexed, so 8 = September
    
// If September 29th has already passed this year, use next year
if (eventDate < now) {
    eventDate = new Date(currentYear + 1, 8, 29);
}

const h2 = document.querySelector('#latest-events .text h2');
if (h2) {
// Update the h2 text with the new year
h2.textContent = `tech masters events ${eventDate.getFullYear()}`;
}

let differanceTime = eventDate - now;
let date = document.querySelectorAll(".latest-events .box .date div span:first-of-type");
let eventTimer = setInterval(() => {
    let day = Math.floor(differanceTime / 1000 / 60 / 60 / 24),
    hours = Math.floor(differanceTime / 1000 / 60 / 60 % 24),
    minutes = Math.floor(differanceTime / 1000 / 60 % 60),
    seconds = Math.floor(differanceTime / 1000 % 60);
    if (day >= 10)
    date[0].innerHTML = day; 
    else
    date[0].innerHTML = `0${day}`;
    if (hours >= 10)
    date[1].innerHTML = hours;
    else
    date[1].innerHTML = `0${hours}`;
    if (minutes >= 10)
    date[2].innerHTML = minutes;
    else
    date[2].innerHTML = `0${minutes}`;
    if (seconds >= 10)
    date[3].innerHTML = seconds;
    else
    date[3].innerHTML = `0${seconds}`;
    differanceTime -= 1000;
    if (differanceTime < 0)
        clearInterval(eventTimer);
},1000);

// create Popup with galery images
let ourGallery = document.querySelectorAll(".gallery .box img");
function createPopup(ele){
    // create the element that make shaddow
    let shaddow = document.createElement("div");
    shaddow.className = "shaddow";
    document.body.appendChild(shaddow);
    // create overlay element
    let overlay = document.createElement("div");
    overlay.className = "overlayPopup";
    let header = document.createElement("div"),
    title = document.createElement("h3"),
    icon = document.createElement("i");
    title.innerHTML = ele.getAttribute("alt");
    icon.className = "fa-solid fa-x";
    header.className = "header";
    header.appendChild(title);
    header.appendChild(icon);
    let image = ele.cloneNode();
    overlay.appendChild(header);
    overlay.appendChild(image);
    document.body.appendChild(overlay);
}
function removePopup(){
    let removeIcon = document.querySelector(".overlayPopup .header i");
    removeIcon.addEventListener("click",() =>{
        document.querySelector(".shaddow").remove();
        document.querySelector(".overlayPopup").remove();
    });
}
ourGallery.forEach((ele) =>{
    ele.addEventListener("click",() => {
        createPopup(ele);
        removePopup();
    });
});
