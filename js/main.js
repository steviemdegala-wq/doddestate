/* ═══════════════════════════════════════
   THE DODD ESTATE — Main JS
   ═══════════════════════════════════════ */

// Package card accordion toggle
function toggleCard(id) {
  const card = document.getElementById(id);
  if (card) {
    card.classList.toggle('open');
    const btn = card.querySelector('.secondary');
    if (btn) {
      btn.textContent = card.classList.contains('open') ? 'Hide Details' : 'View Details';
    }
  }
}

// Mobile nav toggle (future use)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('nav.top ul');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }
});
