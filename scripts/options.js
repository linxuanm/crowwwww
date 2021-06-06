const enabled = document.getElementById('enabled');
const frequency = document.getElementById('frequency');
const duration = document.getElementById('duration');
const size = document.getElementById('size');

function save() {
    const config = {
        'enabled': enabled.checked,
        'frequency': frequency.value,
        'duration': duration.value,
        'size': size.value
    };

    chrome.storage.sync.set({'crowwwww': config}, () => {
        var status = document.getElementById('status');
        status.textContent = 'Settings Saved';
        setTimeout(() => {
            status.textContent = ''
        }, 1000);
    });
}

function onLoad() {
    enabled.onclick = save;
    frequency.addEventListener('focusout', save);
    duration.addEventListener('focusout', save);

    chrome.storage.sync.get({
        'crowwwww': {
            'enabled': false,
            'frequency': '30',
            'duration': '20',
            'size': 'medium'
        }
    }, (config) => {
        enabled.checked = config.crowwwww.enabled;
        frequency.value = config.crowwwww.frequency;
        duration.value = config.crowwwww.duration;
        size.value = config.crowwwww.size;
    });
}

onLoad();