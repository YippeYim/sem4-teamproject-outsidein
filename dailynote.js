const saveNoteForDate = (date) => {
    const noteArea = document.getElementById('pagenote');
    const selectedEmotions = Array.from(document.querySelectorAll('.button-shortcut-emotion.selected-emotion img')).map(img => img.alt);
    const dateKey = date.toISOString().split('T')[0];
    const noteData = {
        note: noteArea.innerHTML,
        emotions: selectedEmotions
    };
    // localStorage.setItem(dateKey, JSON.stringify(noteData));
    myData[dateKey] = JSON.stringify(noteData);
    
    // extract highlight text from note
    const matches = [...noteArea.innerHTML.matchAll(/<div>\s*!\s*(.*?)<\/div>/g)];
    const extractedTexts = matches.map(match => match[1]); // Get only the captured text
    // Save highlights
    // const savedData = JSON.parse(localStorage.getItem('highlights'));
    const savedData = JSON.parse(myData.highlights);
    if (savedData) {
        savedData[dateKey] = extractedTexts;
        // localStorage.setItem("highlights", JSON.stringify(savedData));
        myData.highlights = JSON.stringify(savedData);
    }else{
        const dataToSave = {};
        dataToSave[dateKey] = extractedTexts;
        // localStorage.setItem("highlights", JSON.stringify(dataToSave));
        myData.highlights = JSON.stringify(savedData);
    }
    updateHighlight();
};

const closeEmotionMenu = () => {
    document.querySelector(".container-emotion").style.backgroundColor = "rgba(255, 255, 255, 0)";
    document.querySelector(".container-emotion").style.width = "10%";
    document.querySelector(".container-emotion").style.transform = "translateX(-230%)";
    document.querySelector(".container-button-emotion").style.visibility = "hidden";
    document.querySelector(".container-button-emotion").style.height = 0;

    document.querySelector(".emotion-menu").style.visibility = "visible";
    document.querySelector(".emotion-menu").style.height = '';
    document.querySelector(".emotion-menu").style.padding = '10px';
    
    document.querySelector(".text-emotion-ask").style.padding = "10px";
    document.querySelector(".text-emotion-ask span").style.padding = "10px";
    document.querySelector(".text-emotion-ask span").style.backgroundColor = "white";
    document.querySelector(".text-emotion-ask span").style.borderRadius = "10%";
    document.querySelector(".text-emotion-ask span").style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    document.querySelector(".text-emotion-ask span").style.transition = "0.5s";

}

const openEmotionMenu = () => {
    document.querySelector(".container-emotion").style.backgroundColor = "#D1E9F6";
    document.querySelector(".container-button-emotion").style.visibility = "visible";
    document.querySelector(".container-button-emotion").style.height = '';
    document.querySelector(".container-emotion").style.width = "";
    document.querySelector(".container-emotion").style.transform = "";

    document.querySelector(".emotion-menu").style.visibility = "hidden";
    document.querySelector(".emotion-menu").style.height = 0;
    document.querySelector(".emotion-menu").style.padding = 0;
    document.querySelector(".text-emotion-ask").style.padding = "";
    document.querySelector(".text-emotion-ask span").style.padding = "";
    document.querySelector(".text-emotion-ask span").style.margin = "";
    document.querySelector(".text-emotion-ask span").style.backgroundColor = "rgba(255, 255, 255, 0)";
    document.querySelector(".text-emotion-ask span").style.boxShadow = "";

}

const showNoteForDate = (date) => {
    const noteArea = document.getElementById('pagenote');
    const dateKey = date.toISOString().split('T')[0];
    // const savedData = JSON.parse(localStorage.getItem(dateKey));
    const savedData = JSON.parse(myData[dateKey]) || {emotions:[]};
    if (savedData) {
        console.log(savedData);
        if (savedData.emotions.length == 0) {
            // console.log("No emotions selected");
            closeEmotionMenu();           
        }else{
            openEmotionMenu();
        }
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
        closeEmotionMenu();
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
showNoteForDate(selectedDate);


document.querySelector(".emotion-menu").addEventListener("click", function() {
    openEmotionMenu();
});

document.querySelector(".date-selected-notepage").addEventListener("input", function() {
    console.log(document.querySelector(".date-selected-notepage").value);
    selectedDate = new Date(document.querySelector(".date-selected-notepage").value);
    updateDateSelectedText();
    showNoteForDate(selectedDate);
    updateCalendar(0);
});