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