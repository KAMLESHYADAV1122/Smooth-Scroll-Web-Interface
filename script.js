const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true,
});

let xscale = 1;
let yscale = 1;
let xprev = 0;
let yprev = 0;

// Circle squish effect
function circleChaptaKaro() {
  window.addEventListener("mousemove", function (dets) {
    let xdiff = dets.clientX - xprev;
    let ydiff = dets.clientY - yprev;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff / 10);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff / 10);

    xprev = dets.clientX;
    yprev = dets.clientY;
  });
}

// Circle follows and scales
function circleMouseFollower() {
  const circle = document.querySelector('#minicircle');
  window.addEventListener('mousemove', function (e) {
    circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

// First Page Animation
function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: -10,
    opacity: 0,
    ease: "expo.inOut",
    duration: 2,
  });

  tl.from(".boundingelem", {
    y: 40,
    opacity: 0,
    ease: "expo.inOut",
    duration: 2,
    delay: -1.5,
    stagger: 0.2,
  });

  tl.from(".herofooter", {
    y: 20,
    opacity: 0,
    ease: "expo.inOut",
    duration: 1.5,
    delay: -1,
  });
}

// Call functions
circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

// Hover animation for each element
document.querySelectorAll(".elem").forEach(function (elem) {
  let rotate = 0;
  let diffrot = 0;

  elem.addEventListener("mouseleave", function () {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: "power3.out",
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    const img = elem.querySelector("img");

    let diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(img, {
      opacity: 1,
      ease: "power3.out",
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});
