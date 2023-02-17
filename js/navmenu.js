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
            <div><a href="/pages/xrml/"">About</a-a></div>
            <div"><a href="/pages/xrml/wiki/">Wiki</a-a></div>
            <div"><a href="/pages/xrml/nehe/">NeHe based tutorials</a-a></div>
            <div"><a href="/pages/xrml/test.html">Wiki</a-a></div>
        </div>
    </li>


</ul>
</nav>
`);
