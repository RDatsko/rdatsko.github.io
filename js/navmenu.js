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
            <div>Applications</div>
            <div>Games</div>
            <div>Tools</div>
        </div>
    </li>


    <input type="radio" name="panel" id="nav-webxr">
    <li>
    <label for="nav-xrml">XRML</label>
        <div class="accordion__content nav-xrml">
            <div><a-a href="/pages/xrml/about.html" a-title="About">About</a-a></div>
            <div"><a-a href="/pages/xrml/wiki.html" a-title="Wiki">Wiki</a-a></div>
        </div>
    </li>


</ul>
</nav>
`);
