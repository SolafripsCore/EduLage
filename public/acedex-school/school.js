(() => {
  document.querySelectorAll('.brand-logo').forEach(img => { img.src = '/brand/acedex-international-school-refined.svg'; });
  const menu = document.getElementById('school-menu');
  const toggle = document.querySelector('.mobile-toggle');
  function closeMenu() {
    menu?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation');
    document.querySelectorAll('.nav-item.expanded').forEach(item => {
      item.classList.remove('expanded');
      item.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', 'false');
    });
  }
  toggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  document.querySelectorAll('.submenu-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.nav-item');
      const open = item.classList.toggle('expanded');
      button.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { closeMenu(); toggle?.focus(); }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('header')) closeMenu();
  });
  document.querySelectorAll('form[data-draft]').forEach(form => {
    const key = 'acedex-preview-draft-v1-' + form.dataset.draft;
    const status = form.querySelector('.draft-status');
    const values = () => Object.fromEntries(new FormData(form).entries());
    try {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (saved && typeof saved === 'object') {
        for (const [name,value] of Object.entries(saved)) {
          const field = form.elements.namedItem(name);
          if (field && typeof value === 'string') field.value = value;
        }
        status.textContent = 'Your saved draft has been restored from this device. It has not been sent.';
      }
    } catch { status.textContent = 'Device storage is unavailable. You can still download a draft.'; }
    form.addEventListener('submit', event => {
      event.preventDefault();
      try {
        localStorage.setItem(key, JSON.stringify(values()));
        status.textContent = 'Draft saved on this device only. Nothing has been sent to the school.';
      } catch { status.textContent = 'This device could not save the draft. Use Download draft to keep a copy.'; }
    });
    form.querySelector('[data-download]').addEventListener('click', () => {
      if (!form.reportValidity()) return;
      const lines = ['ACEDEX INTERNATIONAL SCHOOL', 'Personal ' + form.dataset.draft + ' draft — not submitted', '', ...Object.entries(values()).map(([key,value]) => key + ': ' + value), '', 'This document is a planning draft. It does not create an account, reserve a place or submit an application.'];
      const blob = new Blob([lines.join('\n')], {type:'text/plain;charset=utf-8'});
      const link = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      link.href = objectUrl; link.download = 'acedex-' + form.dataset.draft + '-draft.txt';
      document.body.append(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      status.textContent = 'Draft download prepared. Nothing has been sent to the school.';
    });
    form.querySelector('[data-clear]').addEventListener('click', () => {
      form.reset();
      try { localStorage.removeItem(key); status.textContent = 'Draft cleared from this form and device storage.'; }
      catch { status.textContent = 'Form cleared. Device storage could not be accessed.'; }
    });
  });
  const messages = {
    'Parent / Guardian': 'Parent / Guardian access will use a verified family account.',
    'Student': 'Student access will be issued through the school after enrolment and verification.',
    'Staff': 'Staff accounts will be provisioned and verified by the school.',
    'School Administration': 'Administration access will be restricted to authorised school personnel.'
  };
  document.querySelectorAll('[data-role]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-role]').forEach(role => role.setAttribute('aria-pressed', String(role === button)));
      document.getElementById('role-info').textContent = messages[button.dataset.role] + ' Live sign-in is pending the SEMS connection.';
    });
  });
})();
