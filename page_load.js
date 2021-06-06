const crows = [
    chrome.runtime.getURL("crows/crow_hd.jpg"),
    chrome.runtime.getURL('crows/crow.jpg')
];

const sizes = {
    'small': 3,
    'medium': 2,
    'large': 1.5
};

// default config
var config = {
    'enabled': true,
    'frequency': 30,
    'duration': 20,
    'size': 3,
    'siteList': [
        'youtube.com',
        'facebook.com',
        'reddit.com',
        '9gag.com',
        'devrant.com'
    ]
};

function randomCrow() {
    return crows[Math.floor(Math.random() * crows.length)];
}

function getHostname(url) {
    var host = url.indexOf("//") > -1 ? url.split('/')[2] : url.split('/')[0];
    host = host.split(':')[0].split('?')[0];

    if (host.startsWith('www.')) {
        host = host.substring(4);
    }

    return host;
}

function showCrow(div, image, shouldLeave) {
    image.src = randomCrow();
    div.style.display = 'block';

    const windowSize = Math.min(window.innerWidth, window.innerHeight);
    const targetSize = Math.floor(windowSize / sizes[config.size]);
    image.width = targetSize;

    const positionScale = Math.random();
    const heightMaybe = image.height === 0 ? targetSize : image.height;
    const posX = Math.floor((window.innerHeight - heightMaybe) * positionScale);
    const posY = Math.floor((window.innerWidth - image.width) * positionScale);

    div.style.top = `${posX}px`;
    div.style.left = `${posY}px`;

    if (shouldLeave) {
        setTimeout(() => hideCrow(div), config.duration * 1000);
    }
}

function hideCrow(div) {
    div.style.display = 'none';
}

function routine() {
    if (!config.siteList.includes(getHostname(window.location.href)) || !config.enabled) {
        return;
    }

    const div = document.createElement('div');
    div.style.display = 'none';
    div.style.position = 'fixed';
    div.style.zIndex = '69696969';
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
    chrome.storage.sync.get({
        'crowwwww': config
    }, (settings) => {
        config = settings.crowwwww;
        setTimeout(routine, 1000);
    });
}

onLoad();