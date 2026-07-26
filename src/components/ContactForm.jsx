import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

/**
 * Lead form for the contact section.
 *
 * Delivery: POSTs to VITE_CONTACT_ENDPOINT when one is configured (Formspree,
 * a serverless function, whatever). With no endpoint it falls back to opening
 * the visitor's mail client with the message pre-filled — the lead still
 * reaches us instead of vanishing into a button that does nothing.
 */

const CONTACT_EMAIL = 'hello@tbf.com';
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

const SERVICES = [
  { value: 'web', label: 'Web Development' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'app', label: 'Web Application' },
  { value: 'design', label: 'UI/UX Design' },
  { value: 'seo', label: 'SEO Optimization' },
];

const EMPTY = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

const inputClass = (invalid) =>
  `w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-secondary placeholder:text-secondary/35 transition-all focus:outline-none focus:ring-2 ${
    invalid
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
      : 'border-slate-200 focus:border-primary focus:ring-primary/20'
  }`;

function validate(values) {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = 'Please enter your first name.';
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'That email address doesn’t look right.';
  }
  if (!values.message.trim()) {
    errors.message = 'Tell us a little about your project.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'A sentence or two helps us prepare properly.';
  }
  return errors;
}

const Field = ({ id, label, error, optional, children }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-xs font-medium text-secondary/70">
      {label}
      {optional && <span className="text-secondary/40 font-normal"> (optional)</span>}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs text-red-600">
        <AlertCircle size={13} className="shrink-0" />
        {error}
      </p>
    )}
  </div>
);

const ContactForm = () => {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // has a submit been attempted?
  const [status, setStatus] = useState('idle'); // idle | sending | success | mail | error

  const update = (name) => (event) => {
    const next = { ...values, [name]: event.target.value };
    setValues(next);
    // Only re-validate live once they've tried to submit, so we don't nag
    // someone who is still typing their email for the first time.
    if (submitted) setErrors(validate(next));
  };

  const describedBy = (name) => (errors[name] ? `${name}-error` : undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      // move focus to the first problem so keyboard and screen reader users
      // aren't left guessing why nothing happened
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    if (!ENDPOINT) {
      const service = SERVICES.find((s) => s.value === values.service)?.label || 'General enquiry';
      const body = [
        `Name: ${values.firstName} ${values.lastName}`.trim(),
        `Email: ${values.email}`,
        values.phone && `Phone: ${values.phone}`,
        `Project type: ${service}`,
        '',
        values.message,
      ]
        .filter(Boolean)
        .join('\n');

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        `New project enquiry — ${values.firstName} ${values.lastName}`.trim()
      )}&body=${encodeURIComponent(body)}`;
      setStatus('mail');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus('success');
      setValues(EMPTY);
      setSubmitted(false);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success' || status === 'mail') {
    return (
      <div className="card p-8 md:p-10 rounded-3xl text-center" role="status">
        <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={22} />
        </div>
        <h3 className="text-lg font-semibold text-secondary mb-2 tracking-tight">
          {status === 'success' ? 'Message sent' : 'Almost there'}
        </h3>
        <p className="text-sm text-secondary/60 leading-relaxed max-w-sm mx-auto">
          {status === 'success'
            ? 'Thanks — we’ve got your details and will come back to you within 24 hours.'
            : `We’ve opened your email app with the message ready to send. If nothing happened, email us directly at ${CONTACT_EMAIL}.`}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <div className="card p-8 md:p-10 rounded-3xl">
      <h3 className="text-lg font-semibold text-secondary mb-8 tracking-tight">Send us a message</h3>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="firstName" label="First Name" error={errors.firstName}>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={values.firstName}
              onChange={update('firstName')}
              aria-invalid={!!errors.firstName}
              aria-describedby={describedBy('firstName')}
              className={inputClass(errors.firstName)}
              placeholder="John"
            />
          </Field>

          <Field id="lastName" label="Last Name" optional>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={values.lastName}
              onChange={update('lastName')}
              className={inputClass(false)}
              placeholder="Doe"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field id="email" label="Email Address" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={update('email')}
              aria-invalid={!!errors.email}
              aria-describedby={describedBy('email')}
              className={inputClass(errors.email)}
              placeholder="john@example.com"
            />
          </Field>

          <Field id="phone" label="Phone" optional>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={update('phone')}
              className={inputClass(false)}
              placeholder="+1 (555) 000-0000"
            />
          </Field>
        </div>

        <Field id="service" label="Project Type" optional>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={update('service')}
            className={`${inputClass(false)} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%2394a3b8%22 stroke-width=%222%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22M19 9l-7 7-7-7%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="">Select a service...</option>
            {SERVICES.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="message" label="Message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={values.message}
            onChange={update('message')}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy('message')}
            className={`${inputClass(errors.message)} resize-none`}
            placeholder="Tell us about your project..."
          />
        </Field>

        {status === 'error' && (
          <p role="alert" className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle size={15} className="shrink-0" />
            Something went wrong sending that. Please try again, or email {CONTACT_EMAIL}.
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="w-full py-3.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {sending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <ArrowRight size={16} />
            </>
          )}
        </button>

        <p className="text-xs text-secondary/45 text-center">
          We reply within 24 hours. No spam, ever.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
