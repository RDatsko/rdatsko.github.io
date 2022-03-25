document.writeln(`
<nav>
<ul>
    <li class="singleItem">Home</li>
    <input type="radio" name="panel" id="nav-hardware">
    <li>
        <label for="nav-hardware">Hardware</label>
        <div class="accordion__content">Hardware</div>
    </li>
    <input type="radio" name="panel" id="nav-software">
    <li>
        <label for="nav-software">Software</label>
        <div class="accordion__content">Software</div>
    </li>
    <input type="radio" name="panel" id="nav-html">
    <li>
    <label for="nav-html">HTML</label>
        <div class="accordion__content">
            <div>
                <b><u>Web Apps</u></b><br>
                None<br>
            </div>                                
            <div>
                <b><u>Games</u></b><br>
                <a href="">Trivia</a><br>
                <a href="">The Wheel</a><br>
                <a href="">Clash</a><br>
            </div>                                
            <div>
                <b><u>Office</u></b><br>
                <a href="">Writer</a><br>
                <a href="">Sheets</a><br>
                <a href="">Presentation</a><br>
            </div>                                
            <div>
                <b><u>Tools</u></b><br>
                <a href="">HTML Coder</a><br>
            </div>                                
            <div>
                <b><u>Media</u></b><br>
                <a href="">Video Player</a><br>
                <a href="">OBS</a><br>
                <a href="">Interactive Book</a><br>
                </div>
        </div>
    </li>
    <input type="radio" name="panel" id="nav-webxr">
    <li>
    <label for="nav-webxr">WebXR3js</label>
        <div class="accordion__content nav-webxr">
            <div style="grid-column: span 3;">About</div>
            <div style="grid-column: span 3;">Wiki</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
        </div>
    </li>
</ul>
</nav>`);
