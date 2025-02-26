const pageNote = document.querySelector('.page-note');
const swipeBox = document.querySelector('.swipe-box');
let startY, currentY;
const swipeThreshold = 70; // Minimum swipe distance to avoid triggering on tap

// Initial state
pageNote.style.visibility = 'hidden';

// Utility functions
const showPageNote = () => {
    document.querySelectorAll('body *:not(.page-note):not(.page-note *)').forEach(el => {
        el.style.visibility = 'hidden';
    });
    Object.assign(pageNote.style, {
        visibility: 'visible',
        zIndex: '9999',
        position: 'absolute',
        top: '0',
        transition: 'transform 0.5s ease-in-out',
        transform: 'translateY(0)'
    });
};

const hidePageNote = () => {
    document.querySelectorAll('body *:not(.page-note):not(.page-note *)').forEach(el => {
        el.style.visibility = 'visible';
    });
    Object.assign(pageNote.style, {
        visibility: 'hidden',
        zIndex: '',
        position: '',
        top: '',
        transition: '',
        transform: ''
    });
};

// Event Listeners for Swipe Box
swipeBox.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

swipeBox.addEventListener('touchmove', (e) => {
    currentY = e.touches[0].clientY;
});

swipeBox.addEventListener('touchend', () => {
    if (startY > currentY + 170 && Math.abs(startY - currentY) > swipeThreshold) { 
        // Swipe up
        showPageNote();
        pageNote.style.height = '100vh';
        document.querySelector(".container-note").style.height = '100%';
        document.querySelector(".container-note").style.width = 'calc(100% - <sibling-width>)';
        document.querySelector(".container-note").style.left = '<sibling-width>';
        document.querySelector(".note-area").style.height = '60%';
    }
    startY = undefined;
});

// Event Listeners for Page Note
pageNote.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

pageNote.addEventListener('touchmove', (e) => {
    currentY = e.touches[0].clientY;
});

pageNote.addEventListener('touchend', () => {
    if (startY < currentY - 170 && Math.abs(startY - currentY) > swipeThreshold) { 
        // Swipe down
        hidePageNote();
    }
    startY = undefined;
});