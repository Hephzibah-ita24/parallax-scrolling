const hero = document.querySelector('.background');
const content = document.querySelector('.content');

const rocks = [
    { selector: '.rock-1', speed: 0.08 }, // phone booth
    { selector: '.rock-2', speed: 0.12 }, // Big Ben
    { selector: '.rock-4', speed: 0.06 }, // flag
    { selector: '.rock-5', speed: 0.15 }, // soldiers
    { selector: '.rock-6', speed: 0.10 }  // London Eye
];

const rockElements = rocks
    .map(item => ({ ...item, element: document.querySelector(item.selector) }))
    .filter(item => item.element);

let ticking = false;

function parallaxScroll() {
    const scrolled = window.scrollY;

    // hero image drifts down slowly while the page scrolls up
    if (scrolled < hero.offsetHeight) {
        hero.style.setProperty('--bg-y', `${scrolled * 0.3}px`);
    }

    // 0 when the content section is centred in the viewport
    const offset = scrolled + window.innerHeight / 2
                 - (content.offsetTop + content.offsetHeight / 2);

    rockElements.forEach(item => {
        item.element.style.setProperty('--move-y', `${-offset * item.speed}px`);
    });

    ticking = false;
}

function onScroll() {
    if (!ticking) {
        requestAnimationFrame(parallaxScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
parallaxScroll();
const items = [...document.querySelectorAll('[data-s],[data-x]')];

function moveItems() {
    const vh = window.innerHeight;
    items.forEach(el => {
        const r = el.closest('.background, .content').getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const off = r.top + r.height / 2 - vh / 2;   // 0 when the section is centred
        const y = off * (parseFloat(el.dataset.s) || 0);
        const x = off * (parseFloat(el.dataset.x) || 0);
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
}

window.addEventListener('scroll', () => requestAnimationFrame(moveItems), { passive: true });
window.addEventListener('resize', moveItems);
moveItems();