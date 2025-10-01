function median(nums) {
    if (!nums.length) return null;
    const a = [...nums].sort((x, y) => x - y);
    const mid = Math.floor(a.length / 2);
    return (a.length % 2) ? a[mid] : Math.round((a[mid - 1] + a[mid]) / 2);
}

function render() {
    const list = getReports();
    const listEl = document.getElementById('list');
    const empty = document.getElementById('empty');
    listEl.innerHTML = '';

    if (!list.length) {
        empty.hidden = false;
        return;
    }
    empty.hidden = true;

    // KPIs
    document.getElementById('kTotal').textContent = list.length;
    document.getElementById('kHigh').textContent = list.filter(r => r.ai.sevLabel === 'High').length;
    const med = median(list.map(r => r.ai.sevScore));
    document.getElementById('kConf').textContent = med !== null ? med + '%' : '—';

    // Sort: High -> Medium -> Low, then newest first
    const order = { High: 0, Medium: 1, Low: 2 };
    list.sort((a, b) => {
        const o = order[a.ai.sevLabel] - order[b.ai.sevLabel];
        if (o !== 0) return o;
        return new Date(b.when) - new Date(a.when);
    });

    for (const r of list) {
        const row = document.createElement('div');
        row.className = 'row';
        row.innerHTML = `
            <div class="thumb">${r.img ? `<img src="${r.img}" alt="hazard"/>` : '<span style="color:#94a3b8">No image</span>'}</div>
            <div>
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
                    <div>
                        <strong>${r.ai.type}</strong> • <span class="sev ${r.ai.sevLabel}">${r.ai.sevLabel}</span>
                        <div class="meta">${new Date(r.when).toLocaleString()} • ${r.loc || 'Location: —'}</div>
                    </div>
                    <div style="color:#94a3b8;font-size:12px;">ID: ${r.id}</div>
                </div>
                <div class="report">${r.report}</div>
            </div>
        `;
        listEl.appendChild(row);
    }
}

document.addEventListener('DOMContentLoaded', render);