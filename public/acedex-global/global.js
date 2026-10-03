(() => {
  const form = document.querySelector('[data-campus-finder]');
  if (!form) return;
  const card = document.querySelector('[data-campus-result]');
  const count = document.querySelector('[data-result-count]');
  const empty = document.querySelector('[data-campus-empty]');
  const search = form.elements.namedItem('search');
  const country = form.elements.namedItem('country');
  const stage = form.elements.namedItem('stage');
  function applyFilters(updateUrl = true) {
    const term = search.value.trim().toLowerCase();
    const matches = (!term || term.split(/\s+/).every(word => card.dataset.search.includes(word))) && (!country.value || country.value === 'ng') && (!stage.value || card.dataset.stages.split(' ').includes(stage.value));
    card.hidden = !matches;
    empty.hidden = matches;
    count.textContent = matches ? '1 campus profile · Makurdi, Nigeria' : 'No campus profiles match your search.';
    if (updateUrl) {
      const url = new URL(window.location.href);
      for (const [name, value] of [['search', search.value.trim()], ['country', country.value], ['stage', stage.value]]) {
        if (value) url.searchParams.set(name, value); else url.searchParams.delete(name);
      }
      window.history.replaceState(null, '', url);
    }
  }
  const initial = new URLSearchParams(window.location.search);
  search.value = initial.get('search') || '';
  for (const field of [country, stage]) {
    const value = initial.get(field.name);
    if ([...field.options].some(option => option.value === value)) field.value = value;
  }
  form.addEventListener('submit', event => { event.preventDefault(); applyFilters(); });
  country.addEventListener('change', () => applyFilters());
  stage.addEventListener('change', () => applyFilters());
  document.querySelector('[data-clear-filters]')?.addEventListener('click', () => { form.reset(); applyFilters(); search.focus(); });
  applyFilters(false);
})();
