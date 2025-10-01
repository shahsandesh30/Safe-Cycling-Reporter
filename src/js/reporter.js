const el = s => document.querySelector(s);
const photo = el('#photo'), preview = el('#preview'), previewImg = el('#previewImg');
const statusPill = el('#status'), aiBox = el('#aiBox');

photo.addEventListener('change', e => {
  const file = e.target.files?.[0]; 
  if (!file) return;
  const url = URL.createObjectURL(file);
  previewImg.src = url; 
  preview.hidden = false;
});

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
  if (sevScore >= 0.75) { 
    sevLabel = 'High'; 
    sevClass = 'sev-high'; 
  } else if (sevScore <= 0.45) { 
    sevLabel = 'Low'; 
    sevClass = 'sev-low'; 
  }

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

function saveReport(rec) {
  const key = 'scr_reports_v1';
  const list = JSON.parse(localStorage.getItem(key) || '[]');
  list.unshift(rec);
  localStorage.setItem(key, JSON.stringify(list));
}

el('#submit').addEventListener('click', async () => {
  statusPill.textContent = 'Processing…';
  const loc = el('#location').value.trim();
  const hint = el('#type').value.trim();
  const notes = el('#notes').value.trim();

  await new Promise(r => setTimeout(r, 600));
  const cls = fakeClassify(hint, notes);
  const report = llmReport(cls, loc, notes);

  aiBox.hidden = false;
  aiBox.className = `result ${cls.sevClass}`;
  aiBox.textContent = `AI: ${cls.type} · Severity: ${cls.sevLabel} (${cls.sevScore}%)\n\n${report}`;

  const file = photo.files?.[0];
  let imgData = null;
  if (file) {
    imgData = await new Promise(res => {
      const reader = new FileReader();
      reader.onload = e => res(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  saveReport({
    id: 'SCR-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    when: new Date().toISOString(),
    loc, notes,
    ai: cls, report,
    img: imgData
  });

  statusPill.textContent = 'Submitted ✓  (view in Dashboard)';
});