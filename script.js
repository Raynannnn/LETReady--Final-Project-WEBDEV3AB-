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
  dragging = true;
  circle.style.transition = "transform 0.2s ease";
});

// DRAG MOVE
document.addEventListener("mousemove", (e)=>{
  if(!dragging) return;
  currentX = e.clientX;
  currentX = currentX;
  let diff = currentX - startX;
  circle.style.transform = `translate(calc(-50% + ${diff}px), -50%)`;
});

// DRAG END
document.addEventListener("mouseup", ()=>{
  if(!dragging) return;
  dragging = false;
  let diff = currentX - startX;

  // EXPAND FIRST BEFORE NAVIGATION
  if(diff < -120){
    // swipe left → login
    circle.classList.add("expand");
    document.getElementById("overlay").classList.add("active");

    circle.addEventListener("transitionend", ()=>{
      window.location.href = "login.html";
    }, { once: true });
  }
  else if(diff > 120){
    // swipe right → signup
    circle.classList.add("expand");
    document.getElementById("overlay").classList.add("active");

    circle.addEventListener("transitionend", ()=>{
      window.location.href = "signup.html";
    }, { once: true });
  }
  else{
    // snap back to center if di umabot sa threshold
    circle.style.transition = "transform 0.6s cubic-bezier(.25,.8,.25,1)";
    circle.style.transform = "translate(-50%, -50%)";
  }
});

// OPTIONAL: AUTH PAGE SWIPE BACK TO MAIN
window.addEventListener("mousemove", (e)=>{
  let path = window.location.pathname;
  if(!dragging) return;

  if(path.includes("login") && e.clientX > window.innerWidth * 0.3){
    circle.style.transform = `translate(-50%, -50%) scale(0.4)`;
    setTimeout(()=> window.location.href = "index.html", 400);
  }

  if(path.includes("signup") && e.clientX < window.innerWidth * 0.7){
    circle.style.transform = `translate(-50%, -50%) scale(0.4)`;
    setTimeout(()=> window.location.href = "index.html", 400);
  }
});
