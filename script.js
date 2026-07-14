/* ==========================================
   MELCHOR PORTFOLIO V2
========================================== */

const typing = document.getElementById("typing");

const words = [
    "Administrative Support",
    "Document Controller",
    "AI Data Specialist",
    "Virtual Assistant"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    if(!typing) return;

    const current = words[wordIndex];

    if(!deleting){

        typing.textContent = current.substring(0,charIndex);

        charIndex++;

        if(charIndex > current.length){

            deleting = true;

            setTimeout(typeEffect,1500);

            return;

        }

    }else{

        typing.textContent = current.substring(0,charIndex);

        charIndex--;

        if(charIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= words.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,deleting ? 45 : 90);

}

typeEffect();



/* ===============================
   Fade Animation
=============================== */

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".card").forEach(card=>{

card.classList.add("hidden");

observer.observe(card);

});



/* ===============================
   Navbar Active Link
=============================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-120;

if(pageYOffset>=sectionTop){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});



/* ===============================
   Stats Counter
=============================== */

const counters=document.querySelectorAll(".stats-grid h2");

let started=false;

window.addEventListener("scroll",()=>{

const stats=document.querySelector(".stats");

if(!stats) return;

if(window.scrollY>stats.offsetTop-500 && !started){

started=true;

counters.forEach(counter=>{

let target=parseInt(counter.innerText);

if(isNaN(target)) return;

let count=0;

let speed=target/60;

const update=()=>{

count+=speed;

if(count<target){

counter.innerText=Math.floor(count)+"+";

requestAnimationFrame(update);

}else{

counter.innerText=target+"+";

}

};

update();

});

}

});



console.log("Melchor Portfolio Loaded Successfully");
