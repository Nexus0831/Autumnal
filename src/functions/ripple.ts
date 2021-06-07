const rippleEffect = (event: MouseEvent, color: string) => {
  const el: HTMLElement = event.currentTarget as HTMLElement;

  let rippleEl: HTMLSpanElement = document.querySelector('span.ripple') as HTMLSpanElement;
  if (!rippleEl) {
    rippleEl = document.createElement('span');
  }
  el.appendChild(rippleEl);

  const max = Math.max(el.offsetWidth, el.offsetHeight);
  rippleEl.style.width = `${max}px`;
  rippleEl.style.height = `${max}px`;

  const rect = el.getBoundingClientRect();
  rippleEl.style.left = `${event.clientX - rect.left - (max / 2)}px`;
  rippleEl.style.top = `${event.clientY - rect.top - (max / 2)}px`;
  rippleEl.style.backgroundColor = color;

  rippleEl.classList.add('ripple');
};

export default rippleEffect;
