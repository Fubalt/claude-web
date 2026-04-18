"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setState("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
  }

  const inputClass =
    "w-full border-0 border-b border-border/40 bg-transparent py-3 font-sans text-[16px] font-[250] text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground";

  const labelClass =
    "mb-1 block font-sans text-[12px] font-[250] uppercase tracking-[0.1em] text-muted-foreground";

  const errorClass = "mt-1 font-sans text-[12px] text-destructive";

  if (state === "success") {
    return (
      <div className="px-0 py-16 text-center md:py-20">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border">
          <svg viewBox="0 0 24 24" width={28} height={28} fill="none" className="text-foreground" stroke="currentColor" strokeWidth={2}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="mb-4 font-heading text-[31px] font-bold uppercase text-foreground">Message Sent</h3>
        <p className="font-sans text-[16px] font-[250] text-muted-foreground">
          Thank you for reaching out. We&apos;ll be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setState("idle");
            setForm({ name: "", email: "", phone: "", subject: "", message: "" });
          }}
          className="mt-10 border border-border px-8 py-3.5 font-heading text-[15px] font-bold uppercase tracking-wide text-foreground transition-opacity hover:opacity-80"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={`${inputClass} ${errors.name ? "border-destructive" : ""}`}
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`${inputClass} ${errors.email ? "border-destructive" : ""}`}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+971 50 000 0000"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="subject" className={labelClass}>
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer appearance-none bg-[length:12px] bg-[right_4px_center] bg-no-repeat pr-7`}
            style={{ backgroundImage: "var(--bf-select-chevron)" }}
          >
            <option value="" className="bg-popover text-popover-foreground">
              Select a subject
            </option>
            <option value="booking" className="bg-popover text-popover-foreground">
              Talent Booking
            </option>
            <option value="models" className="bg-popover text-popover-foreground">
              Model Enquiry
            </option>
            <option value="influencers" className="bg-popover text-popover-foreground">
              Influencer Campaign
            </option>
            <option value="casting" className="bg-popover text-popover-foreground">
              Casting
            </option>
            <option value="other" className="bg-popover text-popover-foreground">
              Other
            </option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your project..."
            className={`${inputClass} resize-none ${errors.message ? "border-destructive" : ""}`}
          />
          {errors.message && <p className={errorClass}>{errors.message}</p>}
        </div>
      </div>

      <div className="mt-12">
        <button
          type="submit"
          disabled={state === "loading"}
          className="border-none bg-primary px-[52px] py-[22px] font-heading text-[20px] font-bold uppercase tracking-wide text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === "loading" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
