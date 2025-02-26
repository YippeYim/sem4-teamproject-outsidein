console.log("calendar.js loaded");
const calendarElement = document.querySelector('.calendar');
// calendarElement.style.overflowX = 'hidden';
// calendarElement.style.whiteSpace = 'nowrap';
calendarElement.style.display = 'flex';
calendarElement.style.justifyContent = 'center';
calendarElement.style.alignItems = 'center';

let currentDate = new Date();
let selectedDate = new Date();
let monthShift = 0;

// monthShift = 0;

const createCalendar = (currentDate, calendarElement) => {
    // create calendar header row
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);
    
    // create calendar days
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
                // create button element for each day
                const button = document.createElement('button');
                button.classList.add('date-button');
                const fullDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), date));
                fullDate.setHours(fullDate.getHours() + 7); // Adjust to Thailand timezone (UTC+7)
                button.setAttribute('data-date', fullDate.toISOString().split('T')[0]);
                button.textContent = date;
                button.addEventListener('click', () => {
                    // console.log(button.getAttribute('data-date'));
                    selectedDate = new Date(button.getAttribute('data-date'));
                    console.log(selectedDate);
                    document.querySelectorAll('.date-button').forEach(btn => btn.classList.remove('selected-date'));
                    button.classList.add('selected-date');
                    updateDateSelectedText();
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
        selectedDate.setMonth(selectedDate.getMonth() - 1);
        updateCalendar(0);
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.addEventListener('click', () => {
        selectedDate.setMonth(selectedDate.getMonth() + 1);
        updateCalendar(0);
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
        updateCalendar(0);
        updateDateSelectedText();

    });
    calendarContainer.appendChild(todayButton);

    calendarElement.appendChild(calendarContainer);
};

const updateDateSelectedText = () => {
    // update date selected text
    const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')} / ${(selectedDate.getMonth() + 1).toString().padStart(2, '0')} / ${selectedDate.getFullYear().toString().slice(-2)}`;
    document.querySelector('.date-selected').textContent = formattedDate;
    document.querySelector('#dateSelected').textContent = formattedDate;
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
    // nextMonth.setMonth(nextMonth.getMonth() + Shift - 1);
    // createCalendar(nextMonth, calendarElement);
    // nextMonth.setMonth(nextMonth.getMonth() + 1);
    // createCalendar(nextMonth, calendarElement);
    // nextMonth.setMonth(nextMonth.getMonth() + 1);
    // createCalendar(nextMonth, calendarElement);
    createCalendar(nextMonth, calendarElement);
    // Highlight today's date
    document.querySelectorAll('.date-button').forEach(btn => {
        if (btn.getAttribute('data-date') === new Date().toISOString().split('T')[0]) {
        btn.classList.add('selected-date');
        } else {
        btn.classList.remove('selected-date');
        }
    });
    arrangeCalendars();
}
// let startX = 0;
// let endX = 0;

// calendarElement.addEventListener('touchstart', (e) => {
//     startX = e.touches[0].clientX;
// });

// calendarElement.addEventListener('touchmove', (e) => {
//     endX = e.touches[0].clientX;
// });

// calendarElement.addEventListener('touchend', () => {
//     const diffX = startX - endX;
//     if (Math.abs(diffX) > 50) { // threshold for swipe
//         if (diffX > 0) {
//             monthShift++;
//         } else {
//             monthShift--;
//         }
//         updateCalendar(monthShift);
//         calendarElement.scrollTo({
//             left: calendarElement.scrollWidth / 3,
//             behavior: 'smooth'
//         });
//     }
// });
// calendarElement.style.overflowX = 'hidden';

updateDateSelectedText();
updateCalendar(0);