// document.getElementById("dateSelected").addEventListener("click", function() {
//     // 2025-02-28
//     let formattedDate = selectedDate.toISOString().split("T")[0];
//     formattedDate = formattedDate[8]+formattedDate[9]+"/"+formattedDate[5]+formattedDate[6]+"/"+formattedDate[2]+formattedDate[3];
//     console.log(formattedDate);
//     flatpickr(this, {
//         dateFormat: "d/m/y",
//         defaultDate: formattedDate,
//         onClose: function(selectedDates, dateStr) {
//             // document.getElementById("dateSelected").textContent = dateStr;
//             // console.log(selectedDate.toISOString());
//             let str = dateStr.split("/");
//             // console.log(str[1]+"/"+str[0]+"/"+str[2]);
//             selectedDate = new Date(str[1]+"/"+str[0]+"/"+str[2]);
//             // console.log(selectedDate);
//             document.querySelectorAll('.')
//         }
//     }).open();
// });


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

