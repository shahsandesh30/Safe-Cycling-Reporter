function fakeClassify(nameHint, noteText) {
    const text = (nameHint + ' ' + noteText).toLowerCase();
    let type = 'Pothole';
    if (text.includes('glass') || text.includes('debris')) type = 'Debris';
    else if (text.includes('crack')) type = 'Surface crack';
    else if (text.includes('grate')) type = 'Drain grate hazard';

    let sevScore = 0.5 + Math.random() * 0.5;
    if (text.includes('deep') || text.includes('large')) sevScore += 0.2;
    if (text.includes('lane') || text.includes('bike')) sevScore += 0.1;
    if (text.includes('small') || text.includes('minor')) sevScore -= 0.2;
    sevScore = Math.max(0, Math.min(1, sevScore));

    let sevLabel = 'Medium', sevClass = 'sev-mid';
    if (sevScore >= 0.75) { sevLabel = 'High'; sevClass = 'sev-high'; }
    else if (sevScore <= 0.45) { sevLabel = 'Low'; sevClass = 'sev-low'; }

    return { type, sevLabel, sevClass, sevScore: Math.round(sevScore * 100) };
}

function llmReport({ type, sevLabel, sevScore }, loc, notes) {
    const ts = new Date().toLocaleString();
    const noteStr = notes ? ` Notes: ${notes.trim()}` : '';
    const rec = (sevLabel === 'High') ? 'Urgent patch within 48 hours.'
        : (sevLabel === 'Medium') ? 'Schedule repair in next maintenance cycle.'
            : 'Monitor and include in routine maintenance.';
    return `Hazard Report — ${ts}
Location: ${loc || 'Location not provided'}
Hazard: ${type}
Risk: ${sevLabel} (${sevScore}% confidence)
Recommendation: ${rec}${noteStr}`;
}