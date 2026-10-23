(() => {
  const page = document.querySelector('.donation-layout');
  const form = document.querySelector('#donation-form');
  if (!page || !form) return;
  const custom = document.querySelector('#custom-amount');
  const status = document.querySelector('#payment-status');
  const radios = form.querySelectorAll('input[name="amount"]');
  radios.forEach(radio => radio.addEventListener('change', () => {
    const useCustom = radio.value === 'custom' && radio.checked;
    custom.disabled = !useCustom;
    if (useCustom) custom.focus();
  }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) return form.reportValidity();
    const selected = form.querySelector('input[name="amount"]:checked');
    const amount = selected.value === 'custom' ? Number(custom.value) : Number(selected.value);
    if (!Number.isFinite(amount) || amount < 1) { status.textContent = 'कृपया सही दान राशि भरें।'; custom.focus(); return; }
    const upiId = page.dataset.upiId.trim();
    if (!upiId || upiId.includes('YOUR-') || upiId.includes('example')) { status.textContent = 'भुगतान माध्यम अभी जोड़ा नहीं गया है। कृपया Dera Dham की सत्यापित UPI ID या payment link यहाँ सेट करें।'; return; }
    const beneficiary = page.dataset.beneficiary.trim() || 'Dera Dham';
    const note = `Daan - ${form.elements.name.value.trim()}`;
    const url = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(beneficiary)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(note)}`;
    status.textContent = 'आपका UPI app खोला जा रहा है। भुगतान से पहले लाभार्थी की जानकारी जाँच लें।';
    window.location.href = url;
  });
})();
