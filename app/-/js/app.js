
// JavaScript code for resizing
const resizer = document.getElementById('resizer');
const panel = document.getElementById('panel');

resizer.addEventListener('mousedown', initResize, false);

function initResize(e) {
    window.addEventListener('mousemove', resize, false);
    window.addEventListener('mouseup', stopResize, false);
}

function resize(e) {
    panel.style.width = (window.innerWidth - e.clientX) + 'px';
}

function stopResize() {
    window.removeEventListener('mousemove', resize, false);
    window.removeEventListener('mouseup', stopResize, false);
}

















const menuItems = document.querySelectorAll('.can-hover > li');
let focusedItem = null;

function closeMainMenu() {
    menuItems.forEach(item => {
        item.addEventListener('blur', () => {
            focusedItem = null;
        });

        item.blur();
    });
}

menuItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        if (focusedItem) {
            focusedItem.blur();
            item.focus();
            focusedItem = item;
        }
    });

    item.addEventListener('focus', () => {
        focusedItem = item;
// console.log(`${focusedItem}`);
    });

    item.addEventListener('blur', () => {
        focusedItem = null;
    });

    item.addEventListener('mousedown', (event) => {
        // Check if the clicked element is an li inside a .can-hover > li
        const clickedLi = event.target.closest('.can-hover > li li');
        if (!clickedLi && item === focusedItem) {
            // Prevents the element from getting focus again
            // closeMainMenu();
            event.preventDefault();
            item.blur();
        }
    });
});






function OpenFile() {
    closeMainMenu();

    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
        // you can use this method to get file and perform respective operations
        let files =   Array.from(input.files);
        console.log(files);
    };
    input.click();
}

function SaveFile() {
    closeMainMenu();
}

function SaveAsFile() {
    closeMainMenu();
}

function Exit() {
    closeMainMenu();
}













// let contextMenu = null;
let contextMenu = document.querySelector(".context-menu");

document.addEventListener('contextmenu', event => {
    event.preventDefault();
});

document.querySelector('main').addEventListener('contextmenu', e => {

    e.preventDefault();

    // Remove existing context menu
    // if (contextMenu !== null) {
    if (contextMenu.style.display !== "none") {
        // document.body.removeChild(contextMenu);
        contextMenu.style.display = "none";
    }

    // Create new context menu
    // contextMenu = document.createElement('div');
    // contextMenu.classList.add('context-menu');
    // contextMenu.innerHTML = `
    // <div class="menu">
    //     <ul style="width: 200px">
    //         <li>
    //             <input type="radio" name="icon-size" id="example12">
    //             <label for="example12">Large icons</label>
    //         </li>
    //         <li>
    //             <input type="radio" name="icon-size" id="example13" checked>
    //             <label for="example13">Medium icons</label>
    //         </li>
    //         <li class="has-divider">
    //             <input type="radio" name="icon-size" id="example14">
    //             <label for="example14">Small icons</label>
    //         </li>
    //         <li>
    //             <input type="checkbox" id="example15">
    //             <label for="example15">Auto arrange icons</label>
    //         </li>
    //         <li>
    //             <input type="checkbox" id="example16" checked>
    //             <label for="example16">Align icons to grid</label>
    //         </li>
    //     </ul>
    // <div>
    // `;
    // document.body.appendChild(contextMenu);

    contextMenu.style.display = "block";

    // Set the position of the context menu
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const x = Math.min(mouseX, screenWidth - menuWidth);
    const y = Math.min(mouseY, screenHeight - menuHeight);
    contextMenu.style.top = `${y}px`;
    contextMenu.style.left = `${x}px`;

    // Left click on current location
    const evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y,
    });
    document.elementFromPoint(x, y).dispatchEvent(evt);
});

// Close context menu on click outside of it
document.addEventListener('click', e => {
    if (contextMenu !== null && !contextMenu.contains(e.target)) {
    // document.body.removeChild(contextMenu);
        contextMenu.style.display = "none";
    // contextMenu = null;
    }
});
