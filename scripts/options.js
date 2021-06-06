const enabled = document.getElementById('enabled');
const frequency = document.getElementById('frequency');
const duration = document.getElementById('duration');
const size = document.getElementById('size');
const sites = document.getElementById('sites');

function cleanSites(text) {
    const list = text.split('\n').map(a => a.trim())
                     .filter(site => site !== '');

    return list;
}

function save() {
    const config = {
        'enabled': enabled.checked,
        'frequency': frequency.value,
        'duration': duration.value,
        'size': size.value,
        'siteList': cleanSites(sites.value)
    };

    chrome.storage.sync.set({'crowwwww': config}, () => {
        const status = document.getElementById('status');
        status.textContent = 'Settings saved; refresh page to apply';
        setTimeout(() => {
            status.textContent = '';
        }, 4000);
    });
}

function onLoad() {
    enabled.onclick = save;
    frequency.addEventListener('focusout', save);
    duration.addEventListener('focusout', save);
    size.addEventListener("change", save);
    sites.addEventListener('focusout', save);

    chrome.storage.sync.get({
        'crowwwww': {
            'enabled': false,
            'frequency': '30',
            'duration': '20',
            'size': 'medium',
            'siteList': [
                'youtube.com',
                'facebook.com',
                'reddit.com',
                '9gag.com',
                'devrant.com'
            ]
        }
    }, (config) => {
        enabled.checked = config.crowwwww.enabled;
        frequency.value = config.crowwwww.frequency;
        duration.value = config.crowwwww.duration;
        size.value = config.crowwwww.size;
        sites.value = config.crowwwww.siteList.join('\n');
    });
}

onLoad();