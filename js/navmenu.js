document.writeln(`
<nav>
<ul>
    <li class="singleItem"><a href="/">Home</a></li>


    <input type="radio" name="panel" id="nav-hardware">
    <li>
        <label for="nav-hardware">Hardware</label>
        <div class="accordion__content">
            <div><a href="/pages/hardware/code.html">Code Editor</a></div>
        </div>
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


    <input type="radio" name="panel" id="nav-xrml">
    <li>
    <label for="nav-xrml">XRML</label>
        <div class="accordion__content">
            <div><a href="/pages/xrml/">About</a></div>
            <div><a href="/pages/xrml/wiki/">Wiki</a></div>
            <div><a href="/pages/xrml/nehe/">NeHe based tutorials</a></div>
            <div><a href="/pages/xrml/xrmlcoder.html">XRML Online Coder</a></div>
            <div><a href="/pages/xrml/xmlrsamplecoder.html">Sample Coder</a></div>
            <div><a href="/pages/xrml/test.html">Test Area</a></div>
        </div>
    </li>


</ul>
</nav>
`);
