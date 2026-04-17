"use client";

import { useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  ethnicity: string;
  countryOfResidence: string;
  currentCountry: string;
  mobile: string;
  primaryLanguage: string;
  otherLanguage: string;
  role: string;
  notes: string;
  instagramUrl: string;
  showreelUrl: string;
  agreedTerms: boolean;
};

type FormErrors = Partial<Record<keyof FormData | "photos", string>>;
type FormState = "idle" | "loading" | "success";

type UploadedPhoto = {
  file: File;
  previewUrl: string;
};

// ─── Design tokens ────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: 48,
  border: "1px solid #878787",
  background: "transparent",
  padding: "0 12px",
  fontSize: 13,
  fontFamily: "inherit",
  color: "#333",
  outline: "none",
  boxSizing: "border-box",
  textTransform: "uppercase" as const,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 400,
  color: "#898989",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  marginBottom: 6,
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none" as const,
  WebkitAppearance: "none" as const,
  cursor: "pointer",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23878787' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: 32,
};

// ─── Reusable field ───────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && (
        <p style={{ color: "red", fontSize: 11, marginTop: 4, textTransform: "uppercase" }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderTop: "1px solid #d8d8d8",
        borderBottom: "1px solid #d8d8d8",
        padding: "14px 0",
        marginBottom: 24,
        marginTop: 8,
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#333",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ─── Photo preview ────────────────────────────────────────────────────────────

function PhotoPreview({
  photo,
  index,
  onRemove,
}: {
  photo: UploadedPhoto;
  index: number;
  onRemove: () => void;
}) {
  return (
    <div style={{ position: "relative", width: 120 }}>
      <div
        style={{
          width: 120,
          height: 160,
          backgroundColor: "#ececec",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.previewUrl}
          alt={`Uploaded photo ${index + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          width: 22,
          height: 22,
          background: "#333",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: 14,
          lineHeight: "22px",
          textAlign: "center",
          padding: 0,
        }}
      >
        ×
      </button>
      <p
        style={{
          marginTop: 6,
          fontSize: 10,
          color: "#666",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={photo.file.name}
      >
        {photo.file.name}
      </p>
    </div>
  );
}

// ─── Countries list ───────────────────────────────────────────────────────────

const COUNTRIES = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Kuwait",
  "Qatar",
  "Bahrain",
  "Oman",
  "Jordan",
  "Lebanon",
  "Egypt",
  "United Kingdom",
  "United States",
  "France",
  "Brazil",
  "Other",
];

const LANGUAGES = [
  "Arabic",
  "English",
  "French",
  "Spanish",
  "Mandarin",
  "Hindi",
  "Urdu",
  "Russian",
  "Italian",
  "German",
  "Portuguese",
  "Other",
];

const ROLES = [
  { value: "MODEL", label: "Model" },
  { value: "LIFESTYLE", label: "Lifestyle" },
  { value: "CAST", label: "Cast" },
  { value: "STYLIST", label: "Stylist" },
  { value: "HAIR_MAKEUP", label: "Hair & Makeup" },
  { value: "PHOTOGRAPHERS", label: "Photographers" },
  { value: "INFLUENCERS", label: "Influencers" },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export function ApplyNowForm() {
  const [form, setForm] = useState<FormData>({
    email: "",
    confirmEmail: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    ethnicity: "",
    countryOfResidence: "",
    currentCountry: "",
    mobile: "",
    primaryLanguage: "",
    otherLanguage: "",
    role: "",
    notes: "",
    instagramUrl: "",
    showreelUrl: "",
    agreedTerms: false,
  });

  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const imageFiles = Array.from(files).filter((f) => {
      const byExt = /\.(jpg|jpeg|png)$/i.test(f.name);
      const byMime = ["image/jpeg", "image/png"].includes(f.type);
      return byExt || byMime;
    });
    const total = photos.length + imageFiles.length;
    const allowed = imageFiles.slice(0, Math.max(0, 4 - photos.length));
    const withPreview = allowed.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...withPreview]);
    if (total > 4) {
      alert("Only 4 photos accepted.");
    }
    if (errors.photos) setErrors((prev) => ({ ...prev, photos: undefined }));
  }

  function removePhoto(index: number) {
    setPhotos((prev) => {
      const toRemove = prev[index];
      if (toRemove) {
        URL.revokeObjectURL(toRemove.previewUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  }

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (form.email !== form.confirmEmail) e.confirmEmail = "Emails do not match";
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.gender) e.gender = "Required";
    if (!form.nationality) e.nationality = "Required";
    if (!form.countryOfResidence) e.countryOfResidence = "Required";
    if (!form.mobile.trim()) e.mobile = "Required";
    if (!form.primaryLanguage) e.primaryLanguage = "Required";
    if (!form.role) e.role = "Please select a role";
    if (photos.length === 0) e.photos = "Please upload at least one photo";
    if (!form.agreedTerms) e.agreedTerms = "You must agree to the Terms and Conditions";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setFormState("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setFormState("success");
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (formState === "success") {
    return (
      <div style={{ background: "#fff", padding: "64px 0", textAlign: "center" }}>
        <div
          style={{
            width: 56,
            height: 56,
            border: "1px solid #d8d8d8",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="#333" strokeWidth={1.5}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#333", marginBottom: 8 }}>
          Application Received
        </p>
        <p style={{ fontSize: 13, color: "#898989" }}>
          Our team will review your profile within 5–7 working days.
        </p>
        <button
          onClick={() => {
            setFormState("idle");
            photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
            setPhotos([]);
            setErrors({});
            setForm({
              email: "", confirmEmail: "", firstName: "", lastName: "", gender: "",
              dateOfBirth: "", nationality: "", ethnicity: "", countryOfResidence: "",
              currentCountry: "", mobile: "", primaryLanguage: "", otherLanguage: "",
              role: "", notes: "", instagramUrl: "", showreelUrl: "", agreedTerms: false,
            });
          }}
          style={{
            marginTop: 32,
            border: "1px solid #333",
            background: "transparent",
            padding: "10px 32px",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            color: "#333",
          }}
        >
          Apply Again
        </button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: "#fff", fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>

      {/* Under-18 notice */}
      <p style={{ fontSize: 12, color: "#898989", marginBottom: 24, lineHeight: 1.6 }}>
        IF YOU ARE UNDER <strong style={{ color: "#333" }}>18 YEARS</strong> OLD, PLEASE ENSURE THAT THE EMAIL REGISTERED IS YOUR PARENTS&apos; AND THEY WILL NEED TO SIGN THE TERMS AND CONDITIONS
      </p>

      {/* Error banner */}
      {Object.keys(errors).length > 0 && (
        <div style={{ background: "#fff3cd", border: "1px solid #ffc107", padding: "12px 16px", marginBottom: 24, fontSize: 12, color: "#333", textTransform: "uppercase" }}>
          Please correct the errors below before submitting.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>

        {/* ── PERSONAL DETAILS ───────────────────────────────────────────────── */}
        <SectionTitle>Personal Details</SectionTitle>

        <Field label="Email Address *" error={errors.email}>
          <input name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="EMAIL ADDRESS" style={inputStyle} />
        </Field>

        <Field label="Re-Enter Email Address *" error={errors.confirmEmail}>
          <input name="confirmEmail" type="email" value={form.confirmEmail} onChange={handleChange}
            placeholder="RE ENTER YOUR EMAIL ADDRESS FOR CONFIRMATION" style={inputStyle} />
        </Field>

        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          <Field label="First Name *" error={errors.firstName}>
            <input name="firstName" type="text" value={form.firstName} onChange={handleChange}
              placeholder="FIRST NAME" style={inputStyle} />
          </Field>
          <Field label="Last Name *" error={errors.lastName}>
            <input name="lastName" type="text" value={form.lastName} onChange={handleChange}
              placeholder="LAST NAME" style={inputStyle} />
          </Field>
          <Field label="Gender *" error={errors.gender}>
            <select name="gender" value={form.gender} onChange={handleChange} style={selectStyle}>
              <option value="" disabled>GENDER</option>
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
              <option value="NON_BINARY">Non-binary</option>
              <option value="PREFER_NOT">Prefer not to say</option>
            </select>
          </Field>
          <Field label="Date of Birth" error={errors.dateOfBirth}>
            <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange}
              style={{ ...inputStyle, colorScheme: "light" as const }} />
          </Field>
          <Field label="Nationality *" error={errors.nationality}>
            <select name="nationality" value={form.nationality} onChange={handleChange} style={selectStyle}>
              <option value="" disabled>NATIONALITY</option>
              <option>Emirati</option>
              <option>Saudi Arabian</option>
              <option>Kuwaiti</option>
              <option>Qatari</option>
              <option>Bahraini</option>
              <option>Omani</option>
              <option>Jordanian</option>
              <option>Lebanese</option>
              <option>Egyptian</option>
              <option>British</option>
              <option>American</option>
              <option>French</option>
              <option>Brazilian</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Ethnicity" error={errors.ethnicity}>
            <select name="ethnicity" value={form.ethnicity} onChange={handleChange} style={selectStyle}>
              <option value="" disabled>ETHNICITY</option>
              <option>Arab</option>
              <option>Asian</option>
              <option>Black</option>
              <option>Mediterranean</option>
              <option>Multi-ethnic</option>
              <option>White</option>
              <option>Other</option>
            </select>
          </Field>
        </div>

        {/* ── CONTACT DETAILS ────────────────────────────────────────────────── */}
        <SectionTitle>Contact Details</SectionTitle>

        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          <Field label="Country of Residence *" error={errors.countryOfResidence}>
            <select name="countryOfResidence" value={form.countryOfResidence} onChange={handleChange} style={selectStyle}>
              <option value="" disabled>COUNTRY OF RESIDENCE</option>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="WhatsApp Number *" error={errors.mobile}>
            <input name="mobile" type="tel" value={form.mobile} onChange={handleChange}
              placeholder="WHATSAPP NUMBER" style={inputStyle} />
          </Field>
          <Field label="Currently in Which Country?" error={errors.currentCountry}>
            <select name="currentCountry" value={form.currentCountry} onChange={handleChange} style={selectStyle}>
              <option value="" disabled>CURRENTLY IN WHICH COUNTRY?</option>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        {/* ── LANGUAGES ──────────────────────────────────────────────────────── */}
        <SectionTitle>Languages</SectionTitle>

        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          <Field label="My Primary Language *" error={errors.primaryLanguage}>
            <select name="primaryLanguage" value={form.primaryLanguage} onChange={handleChange} style={selectStyle}>
              <option value="" disabled>MY PRIMARY LANGUAGE</option>
              {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="Other Fluent Languages" error={errors.otherLanguage}>
            <select name="otherLanguage" value={form.otherLanguage} onChange={handleChange} style={selectStyle}>
              <option value="">OTHER FLUENT LANGUAGES</option>
              {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
            </select>
          </Field>
        </div>

        {/* ── ROLE SELECTION ─────────────────────────────────────────────────── */}
        <SectionTitle>Please Select Role</SectionTitle>

        {errors.role && (
          <p style={{ color: "red", fontSize: 11, textTransform: "uppercase", marginBottom: 12 }}>
            {errors.role}
          </p>
        )}

        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#898989", textTransform: "uppercase", marginBottom: 12 }}>
              SELECT YOUR FIRST PREFERENCE
            </p>
            {ROLES.map(({ value, label }) => (
              <label
                key={value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#333",
                  textTransform: "uppercase",
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value={value}
                  checked={form.role === value}
                  onChange={handleChange}
                  style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#333" }}
                />
                {label}
              </label>
            ))}
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#898989", textTransform: "uppercase", marginBottom: 12 }}>
              PLEASE COMMENT IF YOU FIT MORE THAN ONE ROLE
            </p>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={6}
              style={{
                width: "100%",
                border: "1px solid #878787",
                padding: "10px 12px",
                fontSize: 13,
                fontFamily: "inherit",
                color: "#333",
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* ── SOCIAL LINKS ───────────────────────────────────────────────────── */}
        <div style={{ borderTop: "1px solid #d8d8d8", marginTop: 24, paddingTop: 20 }} />

        <Field label="Instagram URL" error={errors.instagramUrl}>
          <input name="instagramUrl" type="url" value={form.instagramUrl} onChange={handleChange}
            placeholder="INSTAGRAM URL" style={inputStyle} />
        </Field>

        <Field label="Showreel URL (YouTube, Vimeo, etc.)" error={errors.showreelUrl}>
          <input name="showreelUrl" type="url" value={form.showreelUrl} onChange={handleChange}
            placeholder="SHOWREEL URL" style={inputStyle} />
        </Field>

        {/* ── PHOTO UPLOAD ───────────────────────────────────────────────────── */}
        <div style={{ borderTop: "1px solid #d8d8d8", marginTop: 8, paddingTop: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#333", textTransform: "uppercase", marginBottom: 8 }}>
            Upload Pictures
          </p>
          <p style={{ fontSize: 11, color: "#898989", textTransform: "uppercase", marginBottom: 16, lineHeight: 1.6 }}>
            PLEASE UPLOAD FOUR PHOTOS AS PER THE EXAMPLES BELOW.<br />
            ONLY UPLOAD HEADSHOTS AGAINST WHITE WALL, FULL BODY AND HALF BODY PHOTOS.<br />
            ONLY JPG, JPEG, AND PNG FILES ALLOWED — MAX 2 MB PER PHOTO. ONLY FOUR IMAGES ACCEPTED.
          </p>

          {errors.photos && (
            <p style={{ color: "red", fontSize: 11, textTransform: "uppercase", marginBottom: 12 }}>
              {errors.photos}
            </p>
          )}

          {/* Preview grid */}
          {photos.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
              {photos.map((photo, i) => (
                <PhotoPreview key={photo.previewUrl} photo={photo} index={i} onRemove={() => removePhoto(i)} />
              ))}
            </div>
          )}

          {/* Dropzone */}
          {photos.length < 4 && (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFiles(e.dataTransfer.files);
              }}
              style={{
                height: 140,
                background: "#ececec",
                color: "#898989",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 14,
                textTransform: "uppercase",
                userSelect: "none",
              }}
            >
              <span style={{ fontSize: 36, marginBottom: 8, lineHeight: 1 }}>+</span>
              Add Picture
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* ── TERMS ──────────────────────────────────────────────────────────── */}
        <div style={{ borderTop: "1px solid #d8d8d8", margin: "24px 0", paddingTop: 20 }}>
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              cursor: "pointer",
              fontSize: 12,
              color: "#333",
              textTransform: "uppercase",
            }}
          >
            <input
              type="checkbox"
              name="agreedTerms"
              checked={form.agreedTerms}
              onChange={handleChange}
              style={{ width: 16, height: 16, marginTop: 1, flexShrink: 0, cursor: "pointer", accentColor: "#333" }}
            />
            <span>
              Please select the check box if you agree to our{" "}
              <a
                href="http://www.bareface.com/terms-and-conditions/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#333", textDecoration: "underline" }}
              >
                Terms and Conditions
              </a>
              .
            </span>
          </label>
          {errors.agreedTerms && (
            <p style={{ color: "red", fontSize: 11, textTransform: "uppercase", marginTop: 8 }}>
              {errors.agreedTerms}
            </p>
          )}
        </div>

        {/* ── SUBMIT ─────────────────────────────────────────────────────────── */}
        <div style={{ paddingBottom: 48 }}>
          <input
            type="submit"
            disabled={formState === "loading"}
            value={formState === "loading" ? "SUBMITTING..." : "SUBMIT"}
            style={{
              background: "#333",
              color: "#fff",
              border: "none",
              padding: "14px 48px",
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: formState === "loading" ? "not-allowed" : "pointer",
              opacity: formState === "loading" ? 0.6 : 1,
              fontFamily: "inherit",
            }}
          />
        </div>

      </form>
    </div>
  );
}
