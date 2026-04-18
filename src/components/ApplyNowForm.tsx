"use client";

import { useRef, useState } from "react";

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

const inputClass =
  "box-border h-12 w-full border border-border bg-background px-3 font-sans text-[13px] font-normal uppercase tracking-wide text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground";

const selectClass = `${inputClass} cursor-pointer appearance-none bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-8`;

const textareaClass =
  "box-border w-full resize-y border border-border bg-background px-3 py-2.5 font-sans text-[13px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground";

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
    <div className="mb-5">
      <label className="mb-1.5 block text-[11px] font-normal uppercase tracking-[0.05em] text-muted-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[11px] font-normal uppercase text-destructive">{error}</p>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 mt-2 border-y border-border py-3.5">
      <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-foreground">
        {children}
      </span>
    </div>
  );
}

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
    <div className="relative w-[120px]">
      <div className="h-40 w-[120px] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.previewUrl}
          alt={`Uploaded photo ${index + 1}`}
          className="block h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-1 top-1 flex h-[22px] w-[22px] cursor-pointer items-center justify-center border-0 bg-primary p-0 text-[14px] leading-[22px] text-primary-foreground transition-opacity hover:opacity-90"
        aria-label={`Remove photo ${index + 1}`}
      >
        ×
      </button>
      <p
        className="mt-1.5 truncate text-[10px] uppercase text-muted-foreground"
        title={photo.file.name}
      >
        {photo.file.name}
      </p>
    </div>
  );
}

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

const optionClass = "bg-popover text-popover-foreground";

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

    try {
      // Convert photos to base64
      const photosBase64: string[] = [];
      for (const photo of photos) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(photo.file);
        });
        photosBase64.push(base64);
      }

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          photos: photosBase64,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrors({ email: error.error || "Submission failed" });
        setFormState("idle");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      setFormState("success");
    } catch (error) {
      console.error("Submit error:", error);
      setErrors({ email: "Network error. Please try again." });
      setFormState("idle");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const selectChevronStyle = { backgroundImage: "var(--bf-select-chevron)" } as const;

  if (formState === "success") {
    return (
      <div className="border border-border bg-card px-6 py-16 text-center text-card-foreground md:px-10">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border">
          <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.5} className="text-foreground">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.15em] text-foreground">
          Application Received
        </p>
        <p className="text-[13px] text-muted-foreground">
          Our team will review your profile within 5–7 working days.
        </p>
        <button
          type="button"
          onClick={() => {
            setFormState("idle");
            photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
            setPhotos([]);
            setErrors({});
            setForm({
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
          }}
          className="mt-8 border border-border bg-transparent px-8 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground transition-opacity hover:opacity-80"
        >
          Apply Again
        </button>
      </div>
    );
  }

  return (
    <div className="border border-border bg-card p-6 text-card-foreground md:p-10" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <p className="mb-6 text-[12px] leading-relaxed text-muted-foreground">
        IF YOU ARE UNDER <strong className="font-semibold text-foreground">18 YEARS</strong> OLD, PLEASE ENSURE THAT THE
        EMAIL REGISTERED IS YOUR PARENTS&apos; AND THEY WILL NEED TO SIGN THE TERMS AND CONDITIONS
      </p>

      {Object.keys(errors).length > 0 && (
        <div className="mb-6 border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-[12px] uppercase text-foreground">
          Please correct the errors below before submitting.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <SectionTitle>Personal Details</SectionTitle>

        <Field label="Email Address *" error={errors.email}>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="EMAIL ADDRESS" className={inputClass} />
        </Field>

        <Field label="Re-Enter Email Address *" error={errors.confirmEmail}>
          <input
            name="confirmEmail"
            type="email"
            value={form.confirmEmail}
            onChange={handleChange}
            placeholder="RE ENTER YOUR EMAIL ADDRESS FOR CONFIRMATION"
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          <Field label="First Name *" error={errors.firstName}>
            <input name="firstName" type="text" value={form.firstName} onChange={handleChange} placeholder="FIRST NAME" className={inputClass} />
          </Field>
          <Field label="Last Name *" error={errors.lastName}>
            <input name="lastName" type="text" value={form.lastName} onChange={handleChange} placeholder="LAST NAME" className={inputClass} />
          </Field>
          <Field label="Gender *" error={errors.gender}>
            <select name="gender" value={form.gender} onChange={handleChange} className={selectClass} style={selectChevronStyle}>
              <option value="" disabled className={optionClass}>
                GENDER
              </option>
              <option value="FEMALE" className={optionClass}>
                Female
              </option>
              <option value="MALE" className={optionClass}>
                Male
              </option>
              <option value="NON_BINARY" className={optionClass}>
                Non-binary
              </option>
              <option value="PREFER_NOT" className={optionClass}>
                Prefer not to say
              </option>
            </select>
          </Field>
          <Field label="Date of Birth" error={errors.dateOfBirth}>
            <input
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              className={`${inputClass} [color-scheme:light] dark:[color-scheme:dark]`}
            />
          </Field>
          <Field label="Nationality *" error={errors.nationality}>
            <select name="nationality" value={form.nationality} onChange={handleChange} className={selectClass} style={selectChevronStyle}>
              <option value="" disabled className={optionClass}>
                NATIONALITY
              </option>
              <option className={optionClass}>Emirati</option>
              <option className={optionClass}>Saudi Arabian</option>
              <option className={optionClass}>Kuwaiti</option>
              <option className={optionClass}>Qatari</option>
              <option className={optionClass}>Bahraini</option>
              <option className={optionClass}>Omani</option>
              <option className={optionClass}>Jordanian</option>
              <option className={optionClass}>Lebanese</option>
              <option className={optionClass}>Egyptian</option>
              <option className={optionClass}>British</option>
              <option className={optionClass}>American</option>
              <option className={optionClass}>French</option>
              <option className={optionClass}>Brazilian</option>
              <option className={optionClass}>Other</option>
            </select>
          </Field>
          <Field label="Ethnicity" error={errors.ethnicity}>
            <select name="ethnicity" value={form.ethnicity} onChange={handleChange} className={selectClass} style={selectChevronStyle}>
              <option value="" disabled className={optionClass}>
                ETHNICITY
              </option>
              <option className={optionClass}>Arab</option>
              <option className={optionClass}>Asian</option>
              <option className={optionClass}>Black</option>
              <option className={optionClass}>Mediterranean</option>
              <option className={optionClass}>Multi-ethnic</option>
              <option className={optionClass}>White</option>
              <option className={optionClass}>Other</option>
            </select>
          </Field>
        </div>

        <SectionTitle>Contact Details</SectionTitle>

        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          <Field label="Country of Residence *" error={errors.countryOfResidence}>
            <select name="countryOfResidence" value={form.countryOfResidence} onChange={handleChange} className={selectClass} style={selectChevronStyle}>
              <option value="" disabled className={optionClass}>
                COUNTRY OF RESIDENCE
              </option>
              {COUNTRIES.map((c) => (
                <option key={c} className={optionClass}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="WhatsApp Number *" error={errors.mobile}>
            <input name="mobile" type="tel" value={form.mobile} onChange={handleChange} placeholder="WHATSAPP NUMBER" className={inputClass} />
          </Field>
          <Field label="Currently in Which Country?" error={errors.currentCountry}>
            <select name="currentCountry" value={form.currentCountry} onChange={handleChange} className={selectClass} style={selectChevronStyle}>
              <option value="" disabled className={optionClass}>
                CURRENTLY IN WHICH COUNTRY?
              </option>
              {COUNTRIES.map((c) => (
                <option key={c} className={optionClass}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <SectionTitle>Languages</SectionTitle>

        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          <Field label="My Primary Language *" error={errors.primaryLanguage}>
            <select name="primaryLanguage" value={form.primaryLanguage} onChange={handleChange} className={selectClass} style={selectChevronStyle}>
              <option value="" disabled className={optionClass}>
                MY PRIMARY LANGUAGE
              </option>
              {LANGUAGES.map((l) => (
                <option key={l} className={optionClass}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Other Fluent Languages" error={errors.otherLanguage}>
            <select name="otherLanguage" value={form.otherLanguage} onChange={handleChange} className={selectClass} style={selectChevronStyle}>
              <option value="" className={optionClass}>
                OTHER FLUENT LANGUAGES
              </option>
              {LANGUAGES.map((l) => (
                <option key={l} className={optionClass}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <SectionTitle>Please Select Role</SectionTitle>

        {errors.role && (
          <p className="mb-3 text-[11px] font-normal uppercase text-destructive">{errors.role}</p>
        )}

        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase text-muted-foreground">SELECT YOUR FIRST PREFERENCE</p>
            {ROLES.map(({ value, label }) => (
              <label key={value} className="mb-3 flex cursor-pointer items-center gap-2.5 text-[13px] uppercase text-foreground">
                <input
                  type="radio"
                  name="role"
                  value={value}
                  checked={form.role === value}
                  onChange={handleChange}
                  className="h-4 w-4 shrink-0 cursor-pointer accent-primary"
                />
                {label}
              </label>
            ))}
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase text-muted-foreground">
              PLEASE COMMENT IF YOU FIT MORE THAN ONE ROLE
            </p>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={6} className={textareaClass} />
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-5" />

        <Field label="Instagram URL" error={errors.instagramUrl}>
          <input name="instagramUrl" type="url" value={form.instagramUrl} onChange={handleChange} placeholder="INSTAGRAM URL" className={inputClass} />
        </Field>

        <Field label="Showreel URL (YouTube, Vimeo, etc.)" error={errors.showreelUrl}>
          <input name="showreelUrl" type="url" value={form.showreelUrl} onChange={handleChange} placeholder="SHOWREEL URL" className={inputClass} />
        </Field>

        <div className="mt-2 border-t border-border pt-5">
          <p className="mb-2 text-[13px] font-semibold uppercase text-foreground">Upload Pictures</p>
          <p className="mb-4 text-[11px] uppercase leading-relaxed text-muted-foreground">
            PLEASE UPLOAD FOUR PHOTOS AS PER THE EXAMPLES BELOW.
            <br />
            ONLY UPLOAD HEADSHOTS AGAINST WHITE WALL, FULL BODY AND HALF BODY PHOTOS.
            <br />
            ONLY JPG, JPEG, AND PNG FILES ALLOWED — MAX 2 MB PER PHOTO. ONLY FOUR IMAGES ACCEPTED.
          </p>

          {errors.photos && <p className="mb-3 text-[11px] uppercase text-destructive">{errors.photos}</p>}

          {photos.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-3">
              {photos.map((photo, i) => (
                <PhotoPreview key={photo.previewUrl} photo={photo} index={i} onRemove={() => removePhoto(i)} />
              ))}
            </div>
          )}

          {photos.length < 4 && (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFiles(e.dataTransfer.files);
              }}
              className="flex h-[140px] cursor-pointer select-none flex-col items-center justify-center bg-muted text-[14px] uppercase text-muted-foreground transition-colors hover:bg-muted/80"
            >
              <span className="mb-2 text-[36px] leading-none">+</span>
              Add Picture
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        <div className="my-6 border-t border-border pt-5">
          <label className="flex cursor-pointer items-start gap-2.5 text-[12px] uppercase text-foreground">
            <input
              type="checkbox"
              name="agreedTerms"
              checked={form.agreedTerms}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
            />
            <span>
              Please select the check box if you agree to our{" "}
              <a
                href="http://www.bareface.com/terms-and-conditions/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                Terms and Conditions
              </a>
              .
            </span>
          </label>
          {errors.agreedTerms && (
            <p className="mt-2 text-[11px] uppercase text-destructive">{errors.agreedTerms}</p>
          )}
        </div>

        <div className="pb-12">
          <input
            type="submit"
            disabled={formState === "loading"}
            value={formState === "loading" ? "SUBMITTING..." : "SUBMIT"}
            className="cursor-pointer border-0 bg-primary px-12 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </form>
    </div>
  );
}
