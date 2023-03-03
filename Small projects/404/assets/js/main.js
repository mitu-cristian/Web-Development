// Show menu 
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

// Menu show
if (navToggle)
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })

// Menu hidden
if (navClose)
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })

// Remove Menu Mobile
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// Change background header
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 50vh, add the scroll-header class to the header tag
    if (this.scrollY >= 50)
        header.classList.add('scroll-header')
    else
        header.classList.remove('scroll-header')
}

window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    distance: '90px',
    duration: 3000
})

sr.reveal(`.home__data`, { origin: 'top', delay: 400 })
sr.reveal(`.home__img`, { origin: 'bottom', delay: 600 })
sr.reveal(`.home__footer`, { origin: 'bottom', delay: 600 })