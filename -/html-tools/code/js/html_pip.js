async function openPiP() {
    const pipWindow = await window.documentPictureInPicture.requestWindow({
        width: 320,
        height: 240,
    });

    pipWindow.document.body.style.margin = '0';
    pipWindow.document.body.innerHTML = `
        <div style="padding: 20px; font-family: sans-serif;">
            <h3>Hello from PiP!</h3>
            <p>This is real HTML inside a Picture-in-Picture window.</p>
            <button onclick="alert('Clicked inside PiP!')">Click Me</button>
        </div>
    `;
}