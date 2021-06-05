function randomCrow() {
    return chrome.runtime.getURL("crows/crow_hd.jpg");
}

function onLoad() {
    /*const div = document.createElement('div');
    document.body.appendChild(div);

    var image = document.createElement("img");
    image.src = randomCrow();
    div.appendChild(image);*/

    document.currentScript.remove();
}

onLoad();