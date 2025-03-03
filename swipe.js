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
        zIndex: '2000',
        position: 'absolute',
        top: '0',
        transition: 'transform 0.5s ease-in-out',
        transform: 'translateY(0)'
    });
    document.querySelector(".container-emotion").style.bottom = "15px";
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
    document.querySelector(".container-emotion").style.bottom = "-100%";
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

const noteContainer = document.querySelector(".arrow-down");

// Event Listeners for Page Note
noteContainer.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

noteContainer.addEventListener('touchmove', (e) => {
    currentY = e.touches[0].clientY;
});

noteContainer.addEventListener('touchend', () => {
    if (startY < currentY - 150 && Math.abs(startY - currentY) > swipeThreshold) { 
        // Swipe down
        hidePageNote();
    }
    startY = undefined;
});