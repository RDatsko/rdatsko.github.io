function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

document.addEventListener("DOMContentLoaded", function () {
  const $ = (selector) => document.querySelector(selector);

  $("#circle").addEventListener("click", function () {
    $("#input").value = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">\r\n  <circle cx="20" cy="20" r="20" fill="none" stroke="#aaa" stroke-width="2" />\r\n</svg>`;
  });

  $("#use").addEventListener("click", function () {
    $("#input").value = `<svg viewBox="0 0 96 64" width="96" height="64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\r\n  <defs>\r\n    <symbol id="c">\r\n      <path fill="inherit" d="M0 0v32h32V0H0zm24 9.6c1 0 2 1.4 1 2.4L15 22c-.6.5-1.4.5-2 0l-4-4c-1.2-1.3.7-3.2 2-2l3 3 9-9c.4-.3.7-.4 1-.4z"/>\r\n    </symbol>\r\n  </defs>\r\n  <use x="0" y="0" xlink:href="#c" fill="olive" />\r\n  <use x="32" y="0" xlink:href="#c" fill="green" />\r\n  <use x="64" y="0" xlink:href="#c" fill="forestgreen" />\r\n  <use x="0" y="32" xlink:href="#c" fill="seagreen" />\r\n  <use x="32" y="32" xlink:href="#c" fill="darkolivegreen" />\r\n  <use x="64" y="32" xlink:href="#c" fill="olivedrab" />\r\n</svg>`;
  });

  $("#animate").addEventListener("click", function () {
    $("#input").value = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">\r\n<style type="text/css">\r\n  #c {animation: x 5s alternate infinite;}\r\n  @keyframes x { from { fill: gold; } to { fill: purple} }\r\n</style>\r\n<circle id="c" cx="20" cy="20" r="20" fill="gold"/>\r\n<!-- works in chrome ... not in IE and others -->\r\n</svg>`;
  });

  $("#trans").addEventListener("click", function () {
    $("#input").value = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">\r\n    <path fill="#ddd" d="m0 0h16v32h16V16H0z" />\r\n</svg>`;
  });

  $("#marker").addEventListener("click", function () {
    $("#input").value = `<svg viewBox="0 0 22 41" width="22" height="41" xmlns="http://www.w3.org/2000/svg">\r\n  <path d="M11 41 c-2-20-10-22-10-30 a10 10 0 1 1 20 0c0 8-8 10-10 30z" fill="tomato" stroke="#000" stroke-width="1.5"/>\r\n  <circle cx="11" cy="11" r="3"/>\r\n</svg>`;
  });

  $("#fenders").addEventListener("click", function () {
    $("#input").value = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="58" viewBox="0 0 200 58">[...]</svg>`; // Truncated for brevity
  });

  $("#copy").addEventListener("click", function () {
    const output = $("#output");
    output.focus();
    output.select();
    try {
      const successful = document.execCommand("copy");
      console.log("Copying text command was " + (successful ? "successful" : "unsuccessful"));
    } catch (err) {
      console.log("Oops, unable to copy");
    }
  });

  $("#convert").addEventListener("click", function () {
    let raw = $("#input").value;
    let encoded = raw.replace(/\s+/g, " ");
    encoded = replaceAll(encoded, "%", "%25");
    encoded = replaceAll(encoded, "> <", "><");
    encoded = replaceAll(encoded, "; }", ";}");
    encoded = replaceAll(encoded, "<", "%3c");
    encoded = replaceAll(encoded, ">", "%3e");
    encoded = replaceAll(encoded, "\"", "'");
    encoded = replaceAll(encoded, "#", "%23");
    encoded = replaceAll(encoded, "{", "%7b");
    encoded = replaceAll(encoded, "}", "%7d");
    encoded = replaceAll(encoded, "|", "%7c");
    encoded = replaceAll(encoded, "^", "%5e");
    encoded = replaceAll(encoded, "`", "%60");
    encoded = replaceAll(encoded, "@", "%40");

    const uri = 'url("data:image/svg+xml;charset=UTF-8,' + encoded + '")';
    const style = 'background-image: ' + uri + ';';

    $("#output").value = style;
    // document.body.style.backgroundImage = uri;
    // document.body.style.backgroundColor = $("#background-colour").value;
  });

//   $("#background-colour").addEventListener("change", function () {
//     document.body.style.backgroundColor = $("#background-colour").value;
//   });
});
