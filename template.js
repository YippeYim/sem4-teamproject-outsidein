const prenote = {
    "3 Reflection":`<div>! Small win🏆:</div><div>I thank you for💖:</div><div>I learned that📖:</div>`,
    "Habit Track":"<div>- [ ]Make a bed🛏️</div><div>- [ ] Weight Training🏋️</div>",
    "Drinking Log":"<div>💧To day I drank:</div>"
}

let currentBackground = '';

document.querySelector("#btn-shortcut4").addEventListener("click",() => {
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
    overlay.style.zIndex = '2001'; // Place it below the popup
    overlay.addEventListener("click", () => {
        popup.remove();
        overlay.remove();
    })
    document.body.appendChild(overlay);

    // create popup
    popup.innerHTML = '<h1>Select Template</h1>';
    popup.innerHTML += `<h2>Prenote:</h2>
                        <button class="button-template prenote">3 Reflection</button>
                        <button class="button-template prenote">Habit Track</button>
                        <button class="button-template prenote">Drinking Log</button>
                        <br>
                        <h2>Note line:</h2>
                        <button class="button-template layout">Blank</button>
                        <button class="button-template layout">Line</button>
                        <button class="button-template layout">Grid</button>
                        <button class="button-template layout">Dot</button>
                        <button class="button-template layout">Stripes</button>
                        <button class="button-template layout">Polka dot</button>
                        `
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
    popup.style.zIndex = "2002";
    popup.style.overflowX = "hidden";
    popup.style.overflowY = "scroll";
    document.body.appendChild(popup);

    document.querySelectorAll(".button-template").forEach(button => {
        if (currentBackground == button.innerText){
            button.classList.add("active");
        }
        button.addEventListener("click",() => {
            templateOption(button.innerText, button);
        })
    });
})

const templateOption = (textOnButton, buttonElement) => {
    // line grid thing
    if (buttonElement.classList.contains("layout")){
        document.querySelectorAll(".button-template.layout").forEach(button => {
            button.classList.remove("active");
        });

        document.querySelector(".note-area").classList.remove('line-background','dots-background','grid-background', 'stripes-background', 'diagonal-stripes-background', 'polka-dots-background');

        if (textOnButton == "Blank"){
            buttonElement.classList.add("active");
            document.querySelector(".note-area").classList.add("blank");
            currentBackground = "Blank";
        }
        if (textOnButton == "Line"){
            buttonElement.classList.add("active");
            document.querySelector(".note-area").classList.add("line-background");
            currentBackground = "Line";
        }
        if (textOnButton == "Grid"){
            document.querySelector(".note-area").classList.add("grid-background");
            buttonElement.classList.add("active");
            currentBackground = "Grid";
        }
        if (textOnButton == "Dot"){
            document.querySelector(".note-area").classList.add("dots-background");
            buttonElement.classList.add("active");
            currentBackground = "Dot";
        }
        if (textOnButton == "Stripes"){
            buttonElement.classList.add("active");
            document.querySelector(".note-area").classList.add("diagonal-stripes-background");
            currentBackground = "Stripes";

        }
        if (textOnButton == "Polka dot"){
            buttonElement.classList.add("active");
            document.querySelector(".note-area").classList.add("polka-dots-background");
            currentBackground = "Polka dot";
        }
    }
    if (buttonElement.classList.contains("prenote")){
        const noteArea = document.querySelector(".note-area");
        noteArea.innerHTML = prenote[textOnButton] + noteArea.innerHTML;
    }
};