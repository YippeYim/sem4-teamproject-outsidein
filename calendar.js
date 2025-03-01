console.log("calendar.js loaded");
const calendarElement = document.querySelector('.calendar');
calendarElement.style.display = 'flex';
calendarElement.style.justifyContent = 'center';
calendarElement.style.alignItems = 'center';

let currentDate = new Date();
let selectedDate = new Date();
let monthShift = 0;

const createCalendar = (currentDate, calendarElement) => {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);
    
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDayOfMonth) {
                cell.textContent = '';
            } else if (date > daysInMonth) {
                break;
            } else {
                const button = document.createElement('button');
                button.classList.add('date-button');
                const fullDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), date));
                fullDate.setHours(fullDate.getHours() + 7); // Adjust to Thailand timezone (UTC+7)
                button.setAttribute('data-date', fullDate.toISOString().split('T')[0]);
                button.textContent = date;
                button.addEventListener('click', () => {
                    selectedDate = new Date(button.getAttribute('data-date'));
                    monthShift = 0;
                    document.querySelectorAll('.date-button').forEach(btn => btn.classList.remove('selected-date'));
                    button.classList.add('selected-date');
                    updateDateSelectedText();
                    showNoteForDate(selectedDate);
                });
                cell.appendChild(button);
                date++;
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    
    const calendarContainer = document.createElement('div');
    calendarContainer.style.alignItems = 'center';
    calendarContainer.style.display = 'flex';
    calendarContainer.style.flexDirection = 'column';

    const monthLabel = document.createElement('h2');
    monthLabel.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.addEventListener('click', () => {
        // selectedDate.setMonth(selectedDate.getMonth() - 1);
        // updateCalendar(0);
        monthShift--;
        updateCalendar(monthShift);
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.addEventListener('click', () => {
        // selectedDate.setMonth(selectedDate.getMonth() + 1);
        // updateCalendar(0);
        monthShift++;
        updateCalendar(monthShift);
    });

    const headerContainer = document.createElement('div');
    headerContainer.style.display = 'flex';
    headerContainer.style.alignItems = 'center';
    headerContainer.style.justifyContent = 'space-between';
    headerContainer.style.width = '100%';

    headerContainer.appendChild(prevButton);
    headerContainer.appendChild(monthLabel);
    headerContainer.appendChild(nextButton);

    calendarContainer.appendChild(headerContainer);
    calendarContainer.appendChild(table);
    
    const todayButton = document.createElement('button');
    todayButton.textContent = 'Today';
    todayButton.addEventListener('click', () => {
        selectedDate = new Date();
        monthShift = 0;
        updateCalendar(monthShift);
        updateDateSelectedText();
        showNoteForDate(selectedDate);
    });
    calendarContainer.appendChild(todayButton);

    calendarElement.appendChild(calendarContainer);
};

const updateDateSelectedText = () => {
    let formattedDate = selectedDate.toISOString().split("T")[0];
    // console.log(formattedDate);
    document.querySelector('#dateSelected').value = formattedDate;

    formattedDate = formattedDate[8]+formattedDate[9]+"/"+formattedDate[5]+formattedDate[6]+"/"+formattedDate[2]+formattedDate[3];
    document.querySelector('.date-selected').textContent = formattedDate;
    // console.log(formattedDate);
};

const arrangeCalendars = () => {
    const calendars = document.querySelectorAll('.calendar > div');
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '20px';

    calendars.forEach(calendar => {
        container.appendChild(calendar);
    });

    calendarElement.innerHTML = '';
    calendarElement.appendChild(container);
};

const clearCalendar = () => {
    calendarElement.innerHTML = '';
};

const updateCalendar = (Shift) => {
    clearCalendar();
    const nextMonth = new Date(selectedDate);
    nextMonth.setMonth(nextMonth.getMonth() + Shift);
    createCalendar(nextMonth, calendarElement);
    document.querySelectorAll('.date-button').forEach(btn => {
        if (btn.getAttribute('data-date') === selectedDate.toISOString().split('T')[0]) {
            // console.log(btn.getAttribute('data-date'));
            // console.log(selectedDate.toISOString().split('T')[0]);
            btn.classList.add('selected-date');
        } else {
            btn.classList.remove('selected-date');
        }
    });
    arrangeCalendars();
}


updateDateSelectedText();
updateCalendar(monthShift);