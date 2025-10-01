function fetchReports() {
    const key = 'scr_reports_v1';
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function submitReport(report) {
    const key = 'scr_reports_v1';
    const reports = fetchReports();
    reports.unshift(report);
    localStorage.setItem(key, JSON.stringify(reports));
}

function clearReports() {
    const key = 'scr_reports_v1';
    localStorage.removeItem(key);
}

export { fetchReports, submitReport, clearReports };