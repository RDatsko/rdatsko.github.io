document.writeln(`
<nav>
<ul>
    <li class="singleItem">Home</li>
    <li><input type="radio" name="panel" id="nav-hardware"><label for="nav-hardware">Hardware</label></li>
    <li><input type="radio" name="panel" id="nav-software"><label for="nav-software">Software</label></li>
    <li>
    <input type="radio" name="panel" id="nav-html">
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
    <li>
    <input type="radio" name="panel" id="nav-webxr">
    <label for="nav-webxr">WebXR</label>
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
