function saveReport(report) {
    const key = 'scr_reports_v1';
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.unshift(report);
    localStorage.setItem(key, JSON.stringify(list));
}

function getReports() {
    const key = 'scr_reports_v1';
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function clearReports() {
    const key = 'scr_reports_v1';
    localStorage.removeItem(key);
}
