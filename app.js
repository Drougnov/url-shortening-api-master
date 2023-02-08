const nav = document.querySelector('nav');
const toggleMenu = document.querySelector('.nav__menu');

toggleMenu.addEventListener('click',()=>{
    nav.classList.toggle('active');
})