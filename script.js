const dusts = document.querySelectorAll('.dust');

dusts.forEach((dust) => {
  moveDust(dust);
});

function moveDust(dust) {
  const maxX = window.innerWidth - dust.offsetWidth;
  const maxY = window.innerHeight - dust.offsetHeight;
  let x = Math.floor(Math.random() * maxX);
  let y = Math.floor(Math.random() * maxY);
  let speedX = Math.random() * 0.9 - 0.4;
  let speedY = Math.random() * 0.9 - 0.5;
  let animationId;

  function animate() {
    x += speedX;
    y += speedY;
    if (x > maxX || x < 0) {
      speedX = -speedX;
    }
    if (y > maxY || y < 0) {
      speedY = -speedY;
    }
    dust.style.transform = `translate(${x}px, ${y}px)`;
    animationId = requestAnimationFrame(animate);
  }
  animate();

  function stopDust() {
    cancelAnimationFrame(animationId);
    dust.removeEventListener('click', stopDust);
    dust.addEventListener('click', resumeDust);
  }

  function resumeDust() {
    animate();
    dust.removeEventListener('click', resumeDust);
    dust.addEventListener('click', stopDust);
  }

  dust.addEventListener('click', stopDust);
}


const links = document.getElementsByTagName("a");

[...links].forEach(link => {
  link.addEventListener("mouseover", handleMouseOver);
  link.addEventListener("mousemove", handleMouseMove);
  link.addEventListener("mouseleave", handleMouseLeave);
});

function handlePosition(e) {
  const ID = e.target.getAttribute("data-hover-id");
  const wrapper = document.getElementById(ID);
  let top = "";
  if (
    !(e.target.getBoundingClientRect().top + wrapper.offsetHeight > innerHeight)
  ) {
    top = `${e.clientY + e.target.offsetHeight}px`;
  } else {
    top = `${e.clientY - (wrapper.offsetHeight + e.target.offsetHeight)}px`;
  }

  return `position: fixed; left: ${e.clientX -
    wrapper.offsetWidth / 2}px; top:${top}`;
}

function handleMouseOver(e) {
  const hoverContent = e.target.getAttribute("data-hover-content");
  const ID = Math.random()
    .toString(36)
    .substr(2, 9);
  const wrapper = document.createElement("DIV");
  e.target.setAttribute("data-hover-id", ID);
  wrapper.setAttribute("data-hover-wrapper", "");
  wrapper.setAttribute("id", ID);
  wrapper.setAttribute("style", "opacity: 0; transform: scale(.8)");
  wrapper.innerHTML = hoverContent;
  document.body.append(wrapper);
  wrapper.setAttribute("style", handlePosition(e));
  
  // You can remove this line when you are using. I had added for the demo.
  if (document.querySelector('.info')) document.querySelector('.info').remove();
  
}

function handleMouseLeave(e) {
  const ID = e.target.getAttribute("data-hover-id");
  document.getElementById(ID).style.opacity = 0;
  document.getElementById(ID).style.transform = "scale(.8)";
  setTimeout(() => {
    document.getElementById(ID).remove();
  }, 150);
}

function handleMouseMove(e) {
  const ID = e.target.getAttribute("data-hover-id");
  const wrapper = document.getElementById(ID);
  wrapper.setAttribute("style", handlePosition(e));
}

window.addEventListener('scroll', () => {
  const wrapper = document.querySelector('[data-hover-wrapper]');
  if (wrapper) wrapper.remove();
});


const figures = document.querySelectorAll('.pixel__figure');
let currentFigure = null;
let offsetX = 0;
let offsetY = 0;

figures.forEach((figure) => {
  figure.addEventListener('mousedown', onMouseDown);
});

function onMouseDown(e) {
  currentFigure = e.target.closest('.pixel__figure');
  if (!currentFigure) return;
  e.preventDefault();
  offsetX = e.clientX - currentFigure.offsetLeft;
  offsetY = e.clientY - currentFigure.offsetTop;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(e) {
  if (!currentFigure) return;
  e.preventDefault();
  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;
  currentFigure.style.left = `${x}px`;
  currentFigure.style.top = `${y}px`;
}

function onMouseUp(e) {
  if (!currentFigure) return;
  e.preventDefault();
  currentFigure = null;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}
