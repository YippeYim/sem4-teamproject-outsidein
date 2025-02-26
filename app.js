document.getElementById("dateSelected").addEventListener("click", function() {
    flatpickr(this, {
        dateFormat: "d/m/Y",
        defaultDate: "18/11/04",
        onClose: function(selectedDates, dateStr) {
            document.getElementById("dateSelected").textContent = dateStr;
        }
    }).open();
});
