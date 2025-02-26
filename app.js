document.getElementById("dateSelected").addEventListener("click", function() {
    flatpickr(this, {
        dateFormat: "d/m/Y",
        defaultDate: "18/11/04",
        onClose: function(selectedDates, dateStr) {
            document.getElementById("dateSelected").textContent = dateStr;
        }
    }).open();
});

document.getElementById("menuToggle").addEventListener("click", function() {
    document.getElementById("sidebarMenu").classList.toggle("active");
});

// เปิด Sidebar
document.getElementById("menuToggle").addEventListener("click", function() {
    document.getElementById("sidebarMenu").classList.add("active");
});

// ปิด Sidebar
document.getElementById("closeSidebar").addEventListener("click", function() {
    document.getElementById("sidebarMenu").classList.remove("active");
});

