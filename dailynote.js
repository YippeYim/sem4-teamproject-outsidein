const showNoteForDate = (date) => {
    const noteArea = document.getElementById('pagenote');
    const dateKey = date.toISOString().split('T')[0];
    const savedNote = localStorage.getItem(dateKey);
    noteArea.innerHTML = savedNote || '';
};

const saveNoteForDate = (date) => {
    const noteArea = document.getElementById('pagenote');
    const dateKey = date.toISOString().split('T')[0];
    localStorage.setItem(dateKey, noteArea.innerHTML);
};

document.getElementById('pagenote').addEventListener('input', () => {
    saveNoteForDate(selectedDate);
});