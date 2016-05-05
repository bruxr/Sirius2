export function humanFileSize(bytes) {
    let thresh = 1000;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    let units = ['KB', 'MB', 'GB', 'TB', 'PB']; // challenge accepted: download PB-sized files 
    let u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];  
}