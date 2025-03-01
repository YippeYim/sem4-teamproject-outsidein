// get only first option
document.querySelector(".nav-links li").addEventListener('click',()=>{
    console.log("clicked");

    let overlay = document.createElement('div');
    let popup = document.createElement('div');
    popup.classList.add("popup");

    // Create an overlay
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black
    overlay.style.zIndex = '1000'; // Place it below the popup
    overlay.addEventListener("click", () => {
        popup.remove();
        overlay.remove();
    })
    document.body.appendChild(overlay);

    // create popup
    popup.innerHTML = '<h1>My Highlight</h1>';
    userHighlight.forEach(message => {
        popup.innerHTML += `<br>${message}`;
    });

    popup.style.position = 'fixed';
    // popup.style.backgroundColor = 'green';
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.width = '80%'; // Set width to 90% of the viewport
    popup.style.height = '60%'; // Set height to 90% of the viewport
    // popup.style.color = 'white';
    // popup.style.padding = '20px';
    popup.style.borderRadius = '10px';
    popup.style.zIndex = "1001";
    popup.style.overflowX = "hidden";
    popup.style.overflowY = "scroll";
    document.body.appendChild(popup);
})