function toggleMenu(){
  let m = document.getElementById("menu");
  m.style.display = m.style.display === "flex" ? "none" : "flex";
}

let circle = document.getElementById("circle");
let startX = 0;
let currentX = 0;
let dragging = false;

// DRAG START
circle.addEventListener("mousedown", (e)=>{
  startX = e.clientX;
  currentX = 0;
  dragging = true;
  circle.style.transition = "transform 0.2s ease";
});

// DRAG MOVE
document.addEventListener("mousemove", (e)=>{
  if(!dragging) return;
  let diff = e.clientX - startX;
  currentX = diff;
  circle.style.transform = `translate(calc(-50% + ${diff}px), -50%)`;
});

// DRAG END
document.addEventListener("mouseup", ()=>{
  if(!dragging) return;
  dragging = false;

  // EXPAND + NAVIGATE
  if(currentX < -120){
    circle.classList.add("expand");
    document.getElementById("overlay").classList.add("active");
    setTimeout(()=> window.location.href="login.html", 300);
  }
  else if(currentX > 120){
    circle.classList.add("expand");
    document.getElementById("overlay").classList.add("active");
    setTimeout(()=> window.location.href="signup.html", 300);
  }
  else{
    // SNAP BACK CENTER
    circle.style.transition = "transform 0.6s cubic-bezier(.25,.8,.25,1)";
    circle.style.transform = "translate(-50%, -50%)";
  }
});

// RESET WHEN BACK TO MAIN PAGE
window.addEventListener("load", ()=>{
  let o = document.getElementById("overlay");
  if(o) o.classList.remove("active");

  circle.classList.remove("expand");
  circle.style.transition = "transform 0.3s ease";
  circle.style.transform = "translate(-50%, -50%)";
  circle.style.opacity = 1;
});

function openPanel(id){
  document.body.classList.add("main-hide");

  document.querySelectorAll(".info-panel").forEach(p=>{
    p.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
  toggleMenu();
}


// CLICK OUTSIDE TO CLOSE
document.addEventListener("click",(e)=>{
  if(!e.target.closest(".info-panel") && !e.target.closest(".menu") && !e.target.closest(".menu-btn")){
    document.querySelectorAll(".info-panel").forEach(p=>{
      p.classList.remove("active");
    });
  }
});

/* PARTICLES GENERATOR */
let particles = document.getElementById("particles");

for(let i=0;i<40;i++){
  let p = document.createElement("div");
  p.className = "particle";
  p.style.left = Math.random()*100+"%";
  p.style.animationDuration = 4 + Math.random()*6 + "s";
  p.style.opacity = Math.random();
  particles.appendChild(p);
}

function backToMain(){
  document.body.classList.remove("main-hide");

  document.querySelectorAll(".info-panel").forEach(p=>{
    p.classList.remove("active");
  });
}
