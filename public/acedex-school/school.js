(() => {
  const logoUrl = '/brand/acedex-international-school-approved.png?v=aa77e612';
  document.querySelectorAll('.brand-logo').forEach(image => {
    if (image.getAttribute('src') !== logoUrl) image.src = logoUrl;
  });
  const header = document.querySelector('header');
  const menu = document.getElementById('school-menu');
  const toggle = document.querySelector('.mobile-toggle');
  const items = [...document.querySelectorAll('.nav-item')];
  const desktop = window.matchMedia('(min-width: 1201px)');
  function setExpanded(item, open) {
    item.classList.toggle('expanded', open);
    item.querySelector('.submenu-toggle')?.setAttribute('aria-expanded', String(open));
  }
  function closeSubmenus(except) {
    items.forEach(item => { if (item !== except) setExpanded(item, false); });
  }
  function closeMenu() {
    menu?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation');
    closeSubmenus();
  }
  if (header && menu && toggle) header.classList.add('nav-enhanced');
  toggle?.addEventListener('click', () => {
    const open = !menu.classList.contains('is-open');
    closeSubmenus();
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  items.forEach(item => {
    const button = item.querySelector('.submenu-toggle');
    if (!button) return;
    button.addEventListener('click', () => {
      const open = !item.classList.contains('expanded');
      closeSubmenus(item); setExpanded(item, open);
    });
    button.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault(); closeSubmenus(item); setExpanded(item, true);
        item.querySelector('.dropdown a')?.focus();
      }
    });
    item.addEventListener('pointerenter', event => {
      if (desktop.matches && event.pointerType !== 'touch') {
        closeSubmenus(item); setExpanded(item, true);
      }
    });
    item.addEventListener('pointerleave', () => {
      if (desktop.matches && !item.contains(document.activeElement)) setExpanded(item, false);
    });
    item.addEventListener('focusout', () => {
      setTimeout(() => {
        if (!item.contains(document.activeElement)) setExpanded(item, false);
      }, 0);
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const openItem = items.find(item => item.classList.contains('expanded'));
    if (openItem) { event.preventDefault(); setExpanded(openItem, false); openItem.querySelector('.submenu-toggle')?.focus(); }
    else if (menu?.classList.contains('is-open')) { event.preventDefault(); closeMenu(); toggle?.focus(); }
  });
  document.addEventListener('click', event => { if (!event.target.closest('header')) closeMenu(); });
  desktop.addEventListener('change', closeMenu);
  document.querySelectorAll('[data-stage-switcher]').forEach(switcher => {
    const tabs = [...switcher.querySelectorAll('[role="tab"]')];
    const panels = [...switcher.querySelectorAll('[role="tabpanel"]')];
    function activate(index, focus = false) {
      tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
      panels.forEach((panel, i) => {
        panel.hidden = i !== index;
        panel.classList.toggle('is-entering', i === index);
      });
      if (focus) tabs[index].focus();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(index));
      tab.addEventListener('keydown', event => {
        const keys = {ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1};
        if (event.key in keys) { event.preventDefault(); activate(keys[event.key], true); }
      });
    });
    switcher.classList.add('enhanced'); activate(0);
  });
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('has-entered'); observer.unobserve(entry.target); }
    }), {threshold: 0.08});
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
  }
  window.addEventListener('pagehide', closeMenu);

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

