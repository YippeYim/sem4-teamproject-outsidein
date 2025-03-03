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
    
    // เพิ่มกรอบสีชมพูอ่อนที่นี่
    const calendarContainer = document.createElement('div');
    calendarContainer.style.alignItems = 'center';
    calendarContainer.style.display = 'flex';
    calendarContainer.style.flexDirection = 'column';

    // เพิ่มกรอบสีชมพูอ่อนที่เติมเต็มด้านใน
    calendarContainer.style.border = '3px solidrgb(251, 188, 197)';  // สีชมพูอ่อน
    calendarContainer.style.borderRadius = '15px';  // มุมมน
    calendarContainer.style.padding = '10px';  // ระยะห่างจากขอบ
    calendarContainer.style.width = 'fit-content';  // ขนาดพอดีกับเนื้อหาภายใน
    calendarContainer.style.margin = '10px';  // เพิ่มช่องว่างรอบ ๆ ปฏิทิน
    calendarContainer.style.backgroundColor = '#FFCFCF';  // เติมสีชมพูอ่อนที่ด้านในของกรอบ

    const monthLabel = document.createElement('h2');
    monthLabel.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.addEventListener('click', () => {
        monthShift--;
        updateCalendar(monthShift);
    });
    // ✅ เพิ่มสไตล์ให้ปุ่ม prevButton
    prevButton.style.backgroundColor = '#D1E9F6'; // สีพื้นหลัง
    prevButton.style.color = 'rgb(61, 145, 254)'; // สีตัวอักษร
    prevButton.style.border = 'none';
    prevButton.style.padding = '10px 20px';
    prevButton.style.borderRadius = '5px';
    prevButton.style.cursor = 'pointer';
    prevButton.style.fontSize = '16px';

    // ✅ เพิ่มเอฟเฟกต์เมื่อโฮเวอร์
    prevButton.addEventListener('mouseover', () => {
        prevButton.style.backgroundColor = 'rgb(201, 211, 248)'; // สีเข้มขึ้น
    });
    prevButton.addEventListener('mouseout', () => {
        prevButton.style.backgroundColor = '#D1E9F6'; // กลับเป็นสีเดิม
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.addEventListener('click', () => {
        monthShift++;
        updateCalendar(monthShift);
    });
    // ✅ เพิ่มสไตล์ให้ปุ่ม prevButton
    nextButton.style.backgroundColor = '#D1E9F6'; // สีพื้นหลัง
    nextButton.style.color = 'rgb(61, 145, 254)'; // สีตัวอักษร
    nextButton.style.border = 'none';
    nextButton.style.padding = '10px 20px';
    nextButton.style.borderRadius = '5px';
    nextButton.style.cursor = 'pointer';
    nextButton.style.fontSize = '16px';

    // ✅ เพิ่มเอฟเฟกต์เมื่อโฮเวอร์
    nextButton.addEventListener('mouseover', () => {
        nextButton.style.backgroundColor = 'rgb(201, 211, 248)'; // สีเข้มขึ้น
    });
    nextButton.addEventListener('mouseout', () => {
        nextButton.style.backgroundColor = '#D1E9F6'; // กลับเป็นสีเดิม
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
    // ✅ เพิ่มสไตล์ให้ปุ่ม Today
    todayButton.style.backgroundColor = '#D1E9F6'; // สีพื้นหลัง
    todayButton.style.color = 'rgb(61, 145, 254)'; // สีตัวอักษร
    todayButton.style.border = 'none';
    todayButton.style.padding = '10px 20px';
    todayButton.style.borderRadius = '5px';
    todayButton.style.cursor = 'pointer';
    todayButton.style.fontSize = '16px';

    // ✅ เพิ่มเอฟเฟกต์เมื่อโฮเวอร์
    todayButton.addEventListener('mouseover', () => {
        todayButton.style.backgroundColor = 'rgb(201, 211, 248)'; // สีเข้มขึ้น
    });
    todayButton.addEventListener('mouseout', () => {
        todayButton.style.backgroundColor = '#D1E9F6'; // กลับเป็นสีเดิม
    });

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
    document.querySelector('#dateSelected').value = formattedDate;

    formattedDate = formattedDate[5]+formattedDate[6]+"/"+formattedDate[8]+formattedDate[9]+"/"+formattedDate[2]+formattedDate[3];
    document.querySelector('.date-selected').textContent = formattedDate;
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
            btn.classList.add('selected-date');
        } else {
            btn.classList.remove('selected-date');
        }
    });
    arrangeCalendars();
}

const extraOffset = -1 * window.innerHeight * 0.30; // Calculate 20% of the viewport height once
const limitElement = document.querySelector(".container-button-shortcut");

let isScrollingBack = false;  // Flag to handle scroll lock
let scrollTimeout;  // Variable to store the timeout

// Smooth scrolling needs to be turned off during programmatic scroll
document.body.style.scrollBehavior = "auto"; // Disable smooth scrolling globally

let lastScrollPosition = window.scrollY;

window.addEventListener("scroll", () => {
    // If there’s a pending timeout, we don't need to execute this logic again
    if (scrollTimeout) return;

    const limitBottom = limitElement.getBoundingClientRect().bottom + window.scrollY;
    const screenBottom = window.scrollY + window.innerHeight + extraOffset;

    if (screenBottom > limitBottom && !isScrollingBack) {
        console.log("is scrolling detect");

        // Prevent further execution while already handling scroll
        isScrollingBack = true;
        console.log("go back!");

        // Immediately scroll to the limit (no smooth scroll, instant)
        // This time using requestAnimationFrame to gradually scroll to the position
        function smoothScrollTo(targetPosition) {
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const scrollTo = startPosition + (distance * (progress / 300)); // Smooth over 300ms

                window.scrollTo(0, scrollTo);
                
                if (progress < 300) { // Continue scrolling until the target is reached
                    requestAnimationFrame(step);
                } else {
                    window.scrollTo(0, targetPosition); // Ensure the target position is exactly reached
                }
            }

            requestAnimationFrame(step);
        }

        // Scroll smoothly to the target position
        smoothScrollTo(limitBottom - window.innerHeight - extraOffset);

        // Disable scrolling temporarily
        document.body.style.overflowY = "hidden";

        // Set a timeout to re-enable scrolling after the animation is done
        scrollTimeout = setTimeout(() => {
            document.body.style.overflowY = ""; // Re-enable scroll after the animation
            isScrollingBack = false; // Allow scroll again
            scrollTimeout = null;  // Clear the timeout reference
        }, 340);  // Timeout duration should match smooth scroll duration
    }
});

updateDateSelectedText();
updateCalendar(monthShift);
