const config = {
    'frequency': 5,
    'duration': 2,
    'size': 3
};

function randomCrow() {
    return chrome.runtime.getURL("crows/crow_hd.jpg");
}

function showCrow(div, image, shouldLeave) {
    image.src = randomCrow();
    div.style.display = 'block';

    const windowSize = Math.min(window.innerWidth, window.innerHeight);
    const targetSize = Math.floor(windowSize / config.size);
    if (image.width > image.height) {
        image.width = `${targetSize}`;
    } else {
        image.height = `${targetSize}`;
    }

    div.style.top = '100px';
    div.style.left = '100px';

    if (shouldLeave) {
        setTimeout(() => hideCrow(div), config.duration * 1000);
    }
}

function hideCrow(div) {
    div.style.display = 'none';
}

function routine() {
    const div = document.createElement('div');
    div.style.display = 'none';
    div.style.position = 'fixed';
    div.style.zIndex = '6969';
    document.body.appendChild(div);

    const image = document.createElement("img");
    div.appendChild(image);

    const forever = config.duration >= config.frequency || config.duration === -1;
    showCrow(div, image, !forever);
    if (!forever) {
        setInterval(() => showCrow(div, image, true), config.frequency * 1000);
    }
}

function onLoad() {
    setTimeout(routine, 0);
}

onLoad();