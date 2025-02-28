const saveNoteForDate = (date) => {
    const noteArea = document.getElementById('pagenote');
    const selectedEmotions = Array.from(document.querySelectorAll('.button-shortcut-emotion.selected-emotion img')).map(img => img.alt);
    const dateKey = date.toISOString().split('T')[0];
    const noteData = {
        note: noteArea.innerHTML,
        emotions: selectedEmotions
    };
    localStorage.setItem(dateKey, JSON.stringify(noteData));
};

const showNoteForDate = (date) => {
    const noteArea = document.getElementById('pagenote');
    const dateKey = date.toISOString().split('T')[0];
    const savedData = JSON.parse(localStorage.getItem(dateKey));
    if (savedData) {
        noteArea.innerHTML = savedData.note || '';
        const emotionButtons = document.querySelectorAll('.button-shortcut-emotion img');
        emotionButtons.forEach(button => {
            if (savedData.emotions.includes(button.alt)) {
                button.parentElement.classList.add('selected-emotion');
                button.parentElement.parentElement.style.order = 0;
            } else {
                button.parentElement.classList.remove('selected-emotion');
                button.parentElement.parentElement.style.order = 1;
            }
        });
    } else {
        noteArea.innerHTML = '';
        document.querySelectorAll('.button-shortcut-emotion').forEach(button => {
            button.classList.remove('selected-emotion');
        });
    }
};

document.getElementById('pagenote').addEventListener('input', () => {
    saveNoteForDate(selectedDate);
});

// document.querySelectorAll('.button-shortcut-emotion').forEach(button => {
//     button.addEventListener('click', () => {
//         button.classList.toggle('selected-emotion');
//         if (button.classList.contains('selected-emotion')) {
//             button.parentElement.style.order = 0;
//         } else {
//             button.parentElement.style.order = 1;
//         }
//         saveNoteForDate(selectedDate);
//         showNoteForDate(selectedDate);
//     });
// });

document.querySelectorAll('.button-shortcut-emotion').forEach(button => {
    button.addEventListener('click', () => {
        // Get all buttons for reordering
        const allButtons = Array.from(document.querySelectorAll('.button-shortcut-emotion'));
        const parentElements = allButtons.map(btn => btn.parentElement);

        // Get initial positions before order change
        const initialPositions = parentElements.map(el => el.getBoundingClientRect());

        // Toggle selected class and change order
        button.classList.toggle('selected-emotion');
        if (button.classList.contains('selected-emotion')) {
            button.parentElement.style.order = 0;
        } else {
            button.parentElement.style.order = 1;
        }

        // Get new positions after order change
        const newPositions = parentElements.map(el => el.getBoundingClientRect());

        // Apply transform to animate movement
        parentElements.forEach((el, index) => {
            const dx = initialPositions[index].left - newPositions[index].left;
            const dy = initialPositions[index].top - newPositions[index].top;
            el.style.transition = 'none';
            el.style.transform = `translate(${dx}px, ${dy}px)`;

            // Force reflow
            el.getBoundingClientRect();

            // Animate back to new position
            requestAnimationFrame(() => {
                el.style.transition = 'transform 0.5s ease';
                el.style.transform = '';
            });
        });

        // Save and reload the note data
        saveNoteForDate(selectedDate);
        showNoteForDate(selectedDate);
    });
});