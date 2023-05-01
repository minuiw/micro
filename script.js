const dusts = document.querySelectorAll('.dust');

dusts.forEach((dust) => {
  moveDust(dust);
});

function moveDust(dust) {
  const maxX = window.innerWidth - dust.offsetWidth;
  const maxY = window.innerHeight - dust.offsetHeight;
  let x = Math.floor(Math.random() * maxX);
  let y = Math.floor(Math.random() * maxY);
  let speedX = Math.random() * 0.8 - 0.2;
  let speedY = Math.random() * 0.8 - 0.2;
  let animationId;

  function animate() {
    x += speedX;
    y += speedY;

    x = Math.max(Math.min(x, maxX), 0);
    y = Math.max(Math.min(y, maxY), 0);

    // x, y 값이 화면 가장자리에 닿으면 방향을 반대로 변경합니다.
    if (x <= 0 || x >= maxX) {
      speedX = -speedX;
    }
    if (y <= 0 || y >= maxY) {
      speedY = -speedY;
    }
    const menu = document.querySelector('.menu ul');
    if(menu.classList.contains('hide')) {
      dust.style.transform = `translate(${x}px, ${y}px)`;
    } else {
      dust.style.transform = `translate(${x*0.49}px, ${y}px)`;
    }

    animationId = requestAnimationFrame(animate);
    document.body.style.overflow = '';
  }

  animate();

  let isDragging = false;
  let prevX, prevY;

  function stopDust() {
    cancelAnimationFrame(animationId);
    document.body.style.overflow = 'hidden';
  }

  const toggleBtn = document.getElementById("toggle-btn");

  if (toggleBtn) {
    toggleBtn.addEventListener('change', () => {
      if (toggleBtn.checked) {
        stopDust();
      } else {
        animate();
      }
    });
  } else {
    console.error('toggle button not found');
  } 

  // dust가 마우스 드래그로 이동할 수 있도록 합니다.
  dust.addEventListener('mousedown', (e) => {
    e.preventDefault();
    cancelAnimationFrame(animationId);
    prevX = e.clientX;
    prevY = e.clientY;
    isDragging = true;
  });

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(e) {
    if (!isDragging) return;
    x += e.clientX - prevX;
    y += e.clientY - prevY;
    x = Math.max(Math.min(x, maxX), 0);
    y = Math.max(Math.min(y, maxY), 0);
    prevX = e.clientX;
    prevY = e.clientY;
    dust.style.transform = `translate(${x}px, ${y}px)`;
    cancelAnimationFrame(animationId);
  }

  function onMouseUp() {
    if (!isDragging) return;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    isDragging = false;
    animate();
  }

}

const menuItems = document.querySelectorAll('.menu li');
const sections = document.querySelectorAll('.section');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    const section = document.querySelector(`#${item.dataset.section}`);
    sections.forEach(section => section.classList.add('hide'));
    section.classList.remove('hide');
  });
});

function showContent() {
  const menu = document.querySelector('.menu ul');
  const sections = document.querySelectorAll('.section');
  // toggle button을 화면에서 숨깁니다.
  const toggleBtn = document.querySelectorAll('.switch');
  

  if (menu.classList.contains('hide')) {
    sections.forEach(section => section.classList.remove('hide'));
    toggleBtn.forEach(toggleBtn => toggleBtn.style.display = ' none');
  } else {
    sections.forEach(section => section.classList.add('hide'));
    toggleBtn.forEach(toggleBtn => toggleBtn.style.display = 'block');
  }
  
  menu.classList.toggle('hide');
  sections.forEach(section => section.classList.add('hide'));
  toggleBtn.style.display = 'block';

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
