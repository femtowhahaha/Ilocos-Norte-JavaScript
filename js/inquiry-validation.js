document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('inquiry-form');
  if (!form) return;

  var fullName = form.querySelector('#full-name');
  var email = form.querySelector('#email-address');
  var contact = form.querySelector('#contact-number');
  var destination = form.querySelector('#destination');
  var travelDate = form.querySelector('#travel-date');
  var visitors = form.querySelector('#visitors');
  var message = form.querySelector('#inquiry-message');

  function showFieldMsg(field, ok, text) {
    field.classList.toggle('invalid', !ok);
    field.classList.toggle('valid', ok && field.value.trim().length > 0);
    var group = field.closest('.form-group');
    var msg = group ? group.querySelector('.field-msg') : null;
    if (msg) {
      msg.textContent = text;
      msg.style.color = ok ? '#2ecc71' : '#e74c3c';
    }
    return ok;
  }

  function validateFullName() {
    var value = fullName.value.trim();
    return showFieldMsg(fullName, value.length > 0, value.length > 0 ? 'Looks good.' : 'Full name is required.');
  }

  function validateEmail() {
    var value = email.value.trim();
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return showFieldMsg(email, ok, ok ? 'Valid email.' : 'Email must be valid.');
  }

  function validateContact() {
    var value = contact.value.trim();
    var ok = /^\d+$/.test(value);
    return showFieldMsg(contact, ok, ok ? 'Valid contact number.' : 'Contact number must contain numbers only.');
  }

  function validateDestination() {
    var ok = destination.value !== '';
    return showFieldMsg(destination, ok, ok ? 'Destination selected.' : 'Destination must be selected.');
  }

  function validateTravelDate() {
    var ok = travelDate.value.trim().length > 0;
    return showFieldMsg(travelDate, ok, ok ? 'Travel date selected.' : 'Travel date must not be empty.');
  }

  function validateVisitors() {
    var count = parseInt(visitors.value, 10);
    var ok = !isNaN(count) && count >= 1;
    return showFieldMsg(visitors, ok, ok ? 'Valid visitor count.' : 'Number of visitors must be at least 1.');
  }

  function validateMessage() {
    var value = message.value.trim();
    return showFieldMsg(message, value.length > 0, value.length > 0 ? 'Looks good.' : 'Message is required.');
  }

  function validateAll() {
    return [
      validateFullName(),
      validateEmail(),
      validateContact(),
      validateDestination(),
      validateTravelDate(),
      validateVisitors(),
      validateMessage()
    ].every(Boolean);
  }

  contact.addEventListener('input', function () {
    this.value = this.value.replace(/\D+/g, '');
    validateContact();
  });

  visitors.addEventListener('input', function () {
    if (this.value !== '' && parseInt(this.value, 10) < 1) this.value = '1';
    validateVisitors();
  });

  fullName.addEventListener('blur', validateFullName);
  email.addEventListener('input', validateEmail);
  destination.addEventListener('change', validateDestination);
  travelDate.addEventListener('change', validateTravelDate);
  message.addEventListener('blur', validateMessage);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateAll()) {
      if (typeof window.showToast === 'function') {
        window.showToast('Please complete all required fields correctly.', 'error');
      }
      var firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var btn = form.querySelector('[type="submit"]');
    var originalText = btn ? btn.textContent : '';
    if (btn) {
      btn.textContent = 'Sending...';
      btn.disabled = true;
    }

    setTimeout(function () {
      form.reset();
      form.querySelectorAll('.form-input').forEach(function (field) {
        field.classList.remove('valid', 'invalid');
      });
      form.querySelectorAll('.field-msg').forEach(function (msg) {
        msg.textContent = '';
      });
      if (btn) {
        btn.textContent = originalText;
        btn.disabled = false;
      }
      if (typeof window.showToast === 'function') {
        window.showToast('Inquiry sent successfully.', 'success');
      }
    }, 1000);
  });
});
