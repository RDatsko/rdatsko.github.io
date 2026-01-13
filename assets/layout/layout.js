document.addEventListener("DOMContentLoaded", () => {
    const drive  = 'SamsungFit';
    const folder  = '/www/'
    let baseURL;

    let winPre = ['', 'X'];
    let linuxPre = './media/';
    let macosPre = ['', 'Drive'];

    let fullUrl = window.location.href;
    let url = fullUrl.replace(/^[a-zA-Z]+:\/\/\//, '');

    let parts = url.split('/');
    parts = parts.slice(0, parts.length - 3);
    url = parts.join('/');
    let win_url = url.replace(/\//g, '\\');

    if (window.location.protocol === 'file:') {
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        const macosPlatforms   = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
        const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
        const iosPlatforms     = ['iPhone', 'iPad', 'iPod'];

        if (windowsPlatforms.includes(platform)) {
            if (window.location.protocol === 'file:') {
                winPre = fullUrl.match(/^file:\/\/\/([A-Z]):/i);
            }
            baseURL = 'file:///' + winPre[1] + ':' + folder;
        } else if (macosPlatforms.includes(platform) || iosPlatforms.includes(platform)) {
            if (window.location.protocol === 'file:') {
                macosPre = fullUrl.match(/^file:\/\/\/Volumes\/([^\/]+)/i);
            }
            baseURL = 'file:///Volumes/' + macosPre[1] + folder;
        } else if (/Linux/.test(platform) || /Android/.test(userAgent)) {
            baseURL = 'file:///' + url + folder;
        }
    } else {
        baseURL = window.location.origin + '/';
    }

    // Fix relative/absolute URLs (e.g., "/assets/...") so they work from file:///
    const fix = (url) => {
        // Absolute HTTP/S URLs unchanged
        if (
            url.startsWith("http://") ||
            url.startsWith("https://") ||
            url.startsWith("file://") ||
            url.startsWith(baseURL)
        ) return url;

        // Convert root-based paths ("/assets/...") → baseURL + "assets/..."
        if (url.startsWith("/")) {
            let out = baseURL + url.substring(1);

            // If result ends in "/", add index.html
            if (out.endsWith("/")) out += "index.html";

            return out;
        }

        // Relative path → baseURL + url
        let out = baseURL + url;

        // Auto-add index.html if it ends in "/"
        if (out.endsWith("/")) out += "index.html";

        return out;
    };


    // Update all links in the page
    const updateLinks = () => {
        // Find all anchor links on the page
        const links = document.querySelectorAll("a");

        links.forEach(link => {
            let href = link.getAttribute("href");

            // Only modify links that are relative or local paths (i.e., file:// protocol)
            if (href && !href.startsWith("http://") && !href.startsWith("https://")) {
                // Fix the link URL and update the href attribute
                link.setAttribute("href", fix(href));
            }
        });
    };

    // Inject HEADER (already contains your current header HTML)
    document.querySelector("header").innerHTML = `
        <span>
            <input type="checkbox"/>
            <div>
                <a href="${fix("/")}" class="clear">
                    <img src="${fix("/assets/layout/image/logo.png")}">
                </a>
            </div>

            <nav>
                <ol>
                    <li><a href="${fix("/")}"">HOME</a></li>

                    <input type="radio" name="panel" id="nav-web">
                    <li>
                        <label for="nav-web">WEB</label>
                        <div class="submenu">

                            <a href="${fix("/cosmuic/")}" class="sub-item">
                                <img src="${fix("/assets/layout/image/css3-alt.svg")}" class="material-icons-outlined"/>
                                <div class="details">
                                    <div class="title" translate="no">COSMUIC</div>
                                    <div class="desc">Material UI like CSS for sites</div>
                                </div>
                            </a>

                            <a href="${fix("/html-tools/")}" class="sub-item">
                                <img src="${fix("/assets/layout/image/tools-fill.svg")}" class="material-icons-outlined"/>
                                <div class="details">
                                    <div class="title">HTML Stuff</div>
                                    <div class="desc">Some useful things for the web</div>
                                </div>
                            </a>

                            <a href="${fix("/apps/")}" class="sub-item">
                                <img src="${fix("/assets/layout/image/application_window.svg")}" class="material-icons-outlined"/>
                                <div class="details">
                                    <div class="title">Web Apps</div>
                                    <div class="desc">Various web based applications</div>
                                </div>
                            </a>

                            <a href="${fix("/games/")}" class="sub-item">
                                <img src="${fix("/assets/layout/image/game-line.svg")}" class="material-icons-outlined"/>
                                <div class="details">
                                    <div class="title">HTML Games</div>
                                    <div class="desc">Some web based HTML games</div>
                                </div>
                            </a>

                        </div>
                    </li>

                    <input type="radio" name="panel" id="nav-misc">
                    <li>
                        <label for="nav-misc">MISC</label>
                        <div class="submenu">

                            <a href="${fix("/books/")}" class="sub-item">
                                <img src="${fix("/assets/layout/image/book-half.svg")}" class="material-icons-outlined"/>
                                <div class="details">
                                    <div class="title">eBooks</div>
                                    <div class="desc">Custom eBooks using HTML & CSS</div>
                                </div>
                            </a>

                            <a href="${fix("/japanese/")}" class="sub-item">
                                <img src="${fix("/assets/layout/image/letter-japanese-a.svg")}" class="material-icons-outlined"/>
                                <div class="details">
                                    <div class="title">Japanese Study</div>
                                    <div class="desc">Tools for studying Japanese</div>
                                </div>
                            </a>

                        </div>
                    </li>

                    <li><a href="${fix("/about/")}">ABOUT</a></li>
                </ol>
            </nav>
        </span>
    `;

    // Update all the links on the page after content is loaded
    updateLinks();
});
