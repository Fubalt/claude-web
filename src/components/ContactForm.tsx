"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    // Simulate submission (replace with real API call)
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(232, 230, 227, 0.3)",
    color: "#e8e6e3",
    fontFamily: "Radikal, sans-serif",
    fontSize: 16,
    fontWeight: 250,
    padding: "12px 0",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "Radikal, sans-serif",
    fontSize: 12,
    fontWeight: 250,
    color: "rgba(232, 230, 227, 0.6)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 4,
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: "Radikal, sans-serif",
    fontSize: 12,
    color: "#ff6b6b",
    marginTop: 4,
  };

  if (state === "success") {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 24px",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: "1px solid #e8e6e3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="none"
            stroke="#e8e6e3"
            strokeWidth="2"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          style={{
            fontFamily: '"Cassannet Plus"',
            fontSize: 31,
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#e8e6e3",
            marginBottom: 16,
          }}
        >
          Message Sent
        </h3>
        <p
          style={{
            fontFamily: "Radikal, sans-serif",
            fontSize: 16,
            fontWeight: 250,
            color: "rgba(232, 230, 227, 0.7)",
          }}
        >
          Thank you for reaching out. We&apos;ll be in touch shortly.
        </p>
        <button
          onClick={() => {
            setState("idle");
            setForm({ name: "", email: "", phone: "", subject: "", message: "" });
          }}
          style={{
            marginTop: 40,
            fontFamily: '"Cassannet Plus"',
            fontSize: 15,
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#e8e6e3",
            backgroundColor: "transparent",
            border: "1px solid rgba(232, 230, 227, 0.4)",
            padding: "14px 32px",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div
        className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2"
      >
        <div>
          <label htmlFor="name" style={labelStyle}>
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            style={{
              ...inputStyle,
              borderBottomColor: errors.name
                ? "#ff6b6b"
                : "rgba(232, 230, 227, 0.3)",
            }}
            className="focus:border-b-[#e8e6e3]"
          />
          {errors.name && <p style={errorStyle}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" style={labelStyle}>
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            style={{
              ...inputStyle,
              borderBottomColor: errors.email
                ? "#ff6b6b"
                : "rgba(232, 230, 227, 0.3)",
            }}
            className="focus:border-b-[#e8e6e3]"
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" style={labelStyle}>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+971 50 000 0000"
            style={inputStyle}
            className="focus:border-b-[#e8e6e3]"
          />
        </div>

        <div>
          <label htmlFor="subject" style={labelStyle}>
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            style={{
              ...inputStyle,
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23e8e6e3' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 4px center",
              paddingRight: 24,
              cursor: "pointer",
            }}
            className="focus:border-b-[#e8e6e3]"
          >
            <option value="" style={{ backgroundColor: "#181a1b" }}>
              Select a subject
            </option>
            <option value="booking" style={{ backgroundColor: "#181a1b" }}>
              Talent Booking
            </option>
            <option value="models" style={{ backgroundColor: "#181a1b" }}>
              Model Enquiry
            </option>
            <option value="influencers" style={{ backgroundColor: "#181a1b" }}>
              Influencer Campaign
            </option>
            <option value="casting" style={{ backgroundColor: "#181a1b" }}>
              Casting
            </option>
            <option value="other" style={{ backgroundColor: "#181a1b" }}>
              Other
            </option>
          </select>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="message" style={labelStyle}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your project..."
            style={{
              ...inputStyle,
              resize: "none",
              borderBottomColor: errors.message
                ? "#ff6b6b"
                : "rgba(232, 230, 227, 0.3)",
            }}
            className="focus:border-b-[#e8e6e3]"
          />
          {errors.message && <p style={errorStyle}>{errors.message}</p>}
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <button
          type="submit"
          disabled={state === "loading"}
          style={{
            fontFamily: '"Cassannet Plus"',
            fontSize: 20,
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#e8e6e3",
            backgroundColor: state === "loading" ? "#282b2c" : "#000000",
            padding: "22px 52px",
            border: "none",
            cursor: state === "loading" ? "not-allowed" : "pointer",
            letterSpacing: "0.03em",
            transition: "background-color 0.2s ease",
            opacity: state === "loading" ? 0.7 : 1,
          }}
        >
          {state === "loading" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
