import { useState, useMemo } from "react";
import {
  Store, ChevronLeft, ChevronRight, CheckCircle2, Upload,
  User, Briefcase, Layers, ClipboardCheck, X
} from "lucide-react";

const SHOP_CATEGORIES = [
  "Grocery", "Pharmacy", "Electronics", "Fashion", "Restaurant", "Bakery",
  "Hardware", "Furniture", "Mobile Store", "Salon", "Jewellery", "Stationery", "Other",
];

const SHOP_TYPES = ["Retail", "Wholesale", "Service-based", "Online-only", "Hybrid"];

const STAFF_RANGES = ["1–5", "6–20", "21–50", "50+"];

const STATES = ["California", "Texas", "New York", "Florida", "Illinois", "Other"];

const PLANS = [
  { name: "Starter", price: 19 },
  { name: "Business", price: 49, highlight: true },
  { name: "Professional", price: 99 },
  { name: "Enterprise", price: null },
];

const MODULES = [
  "Inventory Management",
  "Order Management",
  "Sales Reports & Analytics",
  "Staff Management",
  "Customer Management (CRM)",
  "Billing & Invoicing",
  "Online Store / Catalog",
  "Appointment / Booking",
  "Multi-branch Support",
];

const TEMPLATES = [
  { name: "Minimal", desc: "Clean, whitespace-led, content-first" },
  { name: "Modern", desc: "Bold type, vivid accents, card-based" },
  { name: "Classic", desc: "Traditional layout, warm and familiar" },
  { name: "Vibrant", desc: "Colorful, energetic, playful UI" },
];

const STEPS = [
  { id: 1, label: "Owner Details", icon: User },
  { id: 2, label: "Shop Details", icon: Briefcase },
  { id: 3, label: "Software Setup", icon: Layers },
  { id: 4, label: "Review & Submit", icon: ClipboardCheck },
];

const initialForm = {
  firstName: "", lastName: "", email: "", mobile: "", altMobile: "",
  addr1: "", addr2: "", city: "", state: "", pincode: "",
  shopName: "", shopCategory: "", shopType: "", staffCount: "",
  sameAsOwner: false, shopAddr1: "", shopAddr2: "", shopCity: "", shopState: "", shopPincode: "",
  shopContact: "", shopDesc: "", logoFile: null, photoFiles: [],
  plan: "", modules: [], template: "", branches: 1, goLiveDate: "", additionalNotes: "",
  agreeTerms: false,
};

function classNames(...c) { return c.filter(Boolean).join(" "); }

function Field({ label, required, error, children }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1.5" style={{ color: "#0F172A" }}>
        {label} {required && <span style={{ color: "#EF4444" }}>*</span>}
      </label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{error}</p>}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-slate-400 bg-white";

function inputStyle(hasError) {
  return {
    borderColor: hasError ? "#EF4444" : "#E2E8F0",
    borderRadius: 12,
  };
}

export default function RequestShopForm({ onBack, onSubmitted }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleModule = (mod) => {
    setForm((f) => ({
      ...f,
      modules: f.modules.includes(mod) ? f.modules.filter((m) => m !== mod) : [...f.modules, mod],
    }));
  };

  const handleSameAsOwner = (checked) => {
    setForm((f) => ({
      ...f,
      sameAsOwner: checked,
      shopAddr1: checked ? f.addr1 : f.shopAddr1,
      shopAddr2: checked ? f.addr2 : f.shopAddr2,
      shopCity: checked ? f.city : f.shopCity,
      shopState: checked ? f.state : f.shopState,
      shopPincode: checked ? f.pincode : f.shopPincode,
    }));
  };

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.firstName.trim()) e.firstName = "First name is required";
      if (!form.lastName.trim()) e.lastName = "Last name is required";
      if (!form.email.trim()) e.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
      if (!form.mobile.trim()) e.mobile = "Mobile number is required";
      if (!form.addr1.trim()) e.addr1 = "Address is required";
      if (!form.city.trim()) e.city = "City is required";
      if (!form.state.trim()) e.state = "State is required";
      if (!form.pincode.trim()) e.pincode = "Pincode/ZIP is required";
    }
    if (s === 2) {
      if (!form.shopName.trim()) e.shopName = "Shop name is required";
      if (!form.shopCategory) e.shopCategory = "Select a category";
      if (!form.shopType) e.shopType = "Select a shop type";
      if (!form.staffCount) e.staffCount = "Select staff count";
      if (!form.shopAddr1.trim()) e.shopAddr1 = "Shop address is required";
      if (!form.shopContact.trim()) e.shopContact = "Shop contact number is required";
    }
    if (s === 3) {
      if (!form.plan) e.plan = "Select a plan";
      if (form.modules.length === 0) e.modules = "Select at least one module";
      if (!form.template) e.template = "Select a template style";
    }
    if (s === 4) {
      if (!form.agreeTerms) e.agreeTerms = "You must agree to continue";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 4));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    if (!validateStep(4)) return;
    setSubmitted(true);
    onSubmitted?.(form);
  };

  const progressPct = useMemo(() => ((step - 1) / (STEPS.length - 1)) * 100, [step]);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#F8FAFC" }}>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-10 max-w-md w-full text-center" style={{ borderRadius: 20 }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: "#10B981" }} />
          </div>
          <h2 className="text-xl font-extrabold mb-2" style={{ color: "#0F172A" }}>Request Submitted!</h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            Thanks, {form.firstName}! Our team will verify your details and reach out within 24 hours to get {form.shopName || "your shop"} set up.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 rounded-full font-semibold text-white text-sm"
            style={{ background: "#2563EB" }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#F8FAFC" }} className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button type="button" onClick={onBack} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2563EB,#10B981)" }}>
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight" style={{ color: "#0F172A" }}>ShopNest</span>
          </button>
          <button type="button" onClick={onBack} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-1" style={{ color: "#0F172A" }}>Request Your Shop</h1>
        <p className="text-slate-500 mb-8">Tell us about your business and we'll set up your shop management software.</p>

        {/* Progress / Step indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isActive = s.id === step;
              const isDone = s.id < step;
              return (
                <div key={s.id} className="flex-1 flex flex-col items-center text-center">
                  <div
                    className={classNames("w-9 h-9 rounded-full flex items-center justify-center mb-1.5 transition-colors")}
                    style={{
                      background: isDone ? "#10B981" : isActive ? "#2563EB" : "#E2E8F0",
                      color: isDone || isActive ? "white" : "#94A3B8",
                    }}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className="text-[11px] font-semibold hidden sm:block" style={{ color: isActive ? "#0F172A" : "#94A3B8" }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${progressPct}%`, background: "#2563EB" }} />
          </div>
          <p className="text-xs text-slate-400 mt-2">Step {step} of {STEPS.length}</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8" style={{ borderRadius: 20 }}>

          {/* STEP 1: Owner Details */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold mb-5" style={{ color: "#0F172A" }}>Owner Details</h2>
              <div className="grid sm:grid-cols-2 gap-x-4">
                <Field label="First Name" required error={errors.firstName}>
                  <input className={inputBase} style={inputStyle(errors.firstName)} value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="Jane" />
                </Field>
                <Field label="Last Name" required error={errors.lastName}>
                  <input className={inputBase} style={inputStyle(errors.lastName)} value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Doe" />
                </Field>
              </div>
              <Field label="Email Address" required error={errors.email}>
                <input type="email" className={inputBase} style={inputStyle(errors.email)} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@example.com" />
              </Field>
              <div className="grid sm:grid-cols-2 gap-x-4">
                <Field label="Mobile Number" required error={errors.mobile}>
                  <input className={inputBase} style={inputStyle(errors.mobile)} value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="+1 555 000 0000" />
                </Field>
                <Field label="Alternate Mobile Number" error={errors.altMobile}>
                  <input className={inputBase} style={inputStyle(errors.altMobile)} value={form.altMobile} onChange={(e) => update("altMobile", e.target.value)} placeholder="Optional" />
                </Field>
              </div>
              <Field label="Address Line 1" required error={errors.addr1}>
                <input className={inputBase} style={inputStyle(errors.addr1)} value={form.addr1} onChange={(e) => update("addr1", e.target.value)} placeholder="Street address" />
              </Field>
              <Field label="Address Line 2" error={errors.addr2}>
                <input className={inputBase} style={inputStyle(errors.addr2)} value={form.addr2} onChange={(e) => update("addr2", e.target.value)} placeholder="Apartment, suite, etc. (optional)" />
              </Field>
              <div className="grid sm:grid-cols-3 gap-x-4">
                <Field label="City" required error={errors.city}>
                  <input className={inputBase} style={inputStyle(errors.city)} value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" />
                </Field>
                <Field label="State" required error={errors.state}>
                  <select className={inputBase} style={inputStyle(errors.state)} value={form.state} onChange={(e) => update("state", e.target.value)}>
                    <option value="">Select state</option>
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Pincode / ZIP" required error={errors.pincode}>
                  <input className={inputBase} style={inputStyle(errors.pincode)} value={form.pincode} onChange={(e) => update("pincode", e.target.value)} placeholder="000000" />
                </Field>
              </div>
            </div>
          )}

          {/* STEP 2: Shop Details */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold mb-5" style={{ color: "#0F172A" }}>Shop Details</h2>
              <Field label="Shop Name" required error={errors.shopName}>
                <input className={inputBase} style={inputStyle(errors.shopName)} value={form.shopName} onChange={(e) => update("shopName", e.target.value)} placeholder="Greenfield Grocers" />
              </Field>
              <div className="grid sm:grid-cols-2 gap-x-4">
                <Field label="Shop Category" required error={errors.shopCategory}>
                  <select className={inputBase} style={inputStyle(errors.shopCategory)} value={form.shopCategory} onChange={(e) => update("shopCategory", e.target.value)}>
                    <option value="">Select category</option>
                    {SHOP_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Shop Type" required error={errors.shopType}>
                  <select className={inputBase} style={inputStyle(errors.shopType)} value={form.shopType} onChange={(e) => update("shopType", e.target.value)}>
                    <option value="">Select type</option>
                    {SHOP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Number of Staff" required error={errors.staffCount}>
                <select className={inputBase} style={inputStyle(errors.staffCount)} value={form.staffCount} onChange={(e) => update("staffCount", e.target.value)}>
                  <option value="">Select range</option>
                  {STAFF_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>

              <label className="flex items-center gap-2 mb-4 text-sm font-medium" style={{ color: "#1E293B" }}>
                <input type="checkbox" checked={form.sameAsOwner} onChange={(e) => handleSameAsOwner(e.target.checked)} className="w-4 h-4 rounded" />
                Same as owner address
              </label>

              <Field label="Shop Address Line 1" required error={errors.shopAddr1}>
                <input className={inputBase} style={inputStyle(errors.shopAddr1)} value={form.shopAddr1} onChange={(e) => update("shopAddr1", e.target.value)} placeholder="Street address" disabled={form.sameAsOwner} />
              </Field>
              <Field label="Shop Address Line 2" error={errors.shopAddr2}>
                <input className={inputBase} style={inputStyle(errors.shopAddr2)} value={form.shopAddr2} onChange={(e) => update("shopAddr2", e.target.value)} placeholder="Optional" disabled={form.sameAsOwner} />
              </Field>
              <div className="grid sm:grid-cols-3 gap-x-4">
                <Field label="City" error={errors.shopCity}>
                  <input className={inputBase} style={inputStyle(errors.shopCity)} value={form.shopCity} onChange={(e) => update("shopCity", e.target.value)} disabled={form.sameAsOwner} />
                </Field>
                <Field label="State" error={errors.shopState}>
                  <select className={inputBase} style={inputStyle(errors.shopState)} value={form.shopState} onChange={(e) => update("shopState", e.target.value)} disabled={form.sameAsOwner}>
                    <option value="">Select state</option>
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Pincode / ZIP" error={errors.shopPincode}>
                  <input className={inputBase} style={inputStyle(errors.shopPincode)} value={form.shopPincode} onChange={(e) => update("shopPincode", e.target.value)} disabled={form.sameAsOwner} />
                </Field>
              </div>

              <Field label="Shop Contact Number" required error={errors.shopContact}>
                <input className={inputBase} style={inputStyle(errors.shopContact)} value={form.shopContact} onChange={(e) => update("shopContact", e.target.value)} placeholder="+1 555 000 0000" />
              </Field>

              <Field label="Shop Description" error={errors.shopDesc}>
                <textarea
                  className={inputBase}
                  style={{ ...inputStyle(errors.shopDesc), resize: "vertical", minHeight: 80 }}
                  value={form.shopDesc}
                  onChange={(e) => update("shopDesc", e.target.value)}
                  placeholder="A short description of your shop..."
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-x-4">
                <Field label="Upload Shop Logo">
                  <label
                    className="flex items-center gap-2 justify-center border-2 border-dashed rounded-xl px-3 py-5 text-xs text-slate-500 cursor-pointer hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                    style={{ borderColor: "#E2E8F0", borderRadius: 12 }}
                  >
                    <Upload className="w-4 h-4" />
                    {form.logoFile ? form.logoFile.name : "Click to upload logo"}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => update("logoFile", e.target.files?.[0] || null)} />
                  </label>
                </Field>
                <Field label="Upload Shop Photos">
                  <label
                    className="flex items-center gap-2 justify-center border-2 border-dashed rounded-xl px-3 py-5 text-xs text-slate-500 cursor-pointer hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                    style={{ borderColor: "#E2E8F0", borderRadius: 12 }}
                  >
                    <Upload className="w-4 h-4" />
                    {form.photoFiles.length > 0 ? `${form.photoFiles.length} photo(s) selected` : "Click to upload photos"}
                    <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => update("photoFiles", Array.from(e.target.files || []))} />
                  </label>
                </Field>
              </div>
            </div>
          )}

          {/* STEP 3: Software / Template Setup */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold mb-5" style={{ color: "#0F172A" }}>Software / Template Setup</h2>

              <Field label="Select Plan" required error={errors.plan}>
                <div className="grid sm:grid-cols-4 gap-3">
                  {PLANS.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => update("plan", p.name)}
                      className={classNames(
                        "rounded-xl border-2 p-3 text-left transition-colors",
                        form.plan === p.name ? "border-[#2563EB] bg-blue-50" : "border-slate-200 hover:border-slate-300"
                      )}
                      style={{ borderRadius: 12 }}
                    >
                      <div className="text-sm font-bold" style={{ color: "#0F172A" }}>{p.name}</div>
                      <div className="text-xs text-slate-500">{p.price ? `$${p.price}/mo` : "Custom"}</div>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Select Modules Needed" required error={errors.modules}>
                <div className="grid sm:grid-cols-2 gap-2">
                  {MODULES.map((mod) => (
                    <label
                      key={mod}
                      className={classNames(
                        "flex items-center gap-2 text-sm rounded-xl border px-3 py-2.5 cursor-pointer transition-colors",
                        form.modules.includes(mod) ? "border-[#2563EB] bg-blue-50" : "border-slate-200 hover:border-slate-300"
                      )}
                      style={{ borderRadius: 12 }}
                    >
                      <input type="checkbox" className="w-4 h-4 rounded" checked={form.modules.includes(mod)} onChange={() => toggleModule(mod)} />
                      <span style={{ color: "#1E293B" }}>{mod}</span>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="Select Template Style" required error={errors.template}>
                <div className="grid sm:grid-cols-4 gap-3">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => update("template", t.name)}
                      className={classNames(
                        "rounded-xl border-2 p-3 text-left transition-colors",
                        form.template === t.name ? "border-[#2563EB] bg-blue-50" : "border-slate-200 hover:border-slate-300"
                      )}
                      style={{ borderRadius: 12 }}
                    >
                      <div className="text-sm font-bold" style={{ color: "#0F172A" }}>{t.name}</div>
                      <div className="text-[11px] text-slate-500 leading-snug mt-0.5">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </Field>

              <div className="grid sm:grid-cols-2 gap-x-4">
                <Field label="Number of Branches">
                  <input
                    type="number"
                    min={1}
                    className={inputBase}
                    style={inputStyle(false)}
                    value={form.branches}
                    onChange={(e) => update("branches", Math.max(1, parseInt(e.target.value, 10) || 1))}
                  />
                </Field>
                <Field label="Preferred Go-Live Date">
                  <input
                    type="date"
                    className={inputBase}
                    style={inputStyle(false)}
                    value={form.goLiveDate}
                    onChange={(e) => update("goLiveDate", e.target.value)}
                  />
                </Field>
              </div>

              <Field label="Additional Requirements">
                <textarea
                  className={inputBase}
                  style={{ ...inputStyle(false), resize: "vertical", minHeight: 80 }}
                  value={form.additionalNotes}
                  onChange={(e) => update("additionalNotes", e.target.value)}
                  placeholder="Anything else we should know? (optional)"
                />
              </Field>
            </div>
          )}

          {/* STEP 4: Review & Submit */}
          {step === 4 && (
            <div>
              <h2 className="text-lg font-bold mb-5" style={{ color: "#0F172A" }}>Review & Submit</h2>

              <div className="space-y-4">
                <SummaryBlock title="Owner Details">
                  <SummaryRow label="Name" value={`${form.firstName} ${form.lastName}`} />
                  <SummaryRow label="Email" value={form.email} />
                  <SummaryRow label="Mobile" value={form.mobile} />
                  <SummaryRow label="Address" value={[form.addr1, form.addr2, form.city, form.state, form.pincode].filter(Boolean).join(", ")} />
                </SummaryBlock>

                <SummaryBlock title="Shop Details">
                  <SummaryRow label="Shop Name" value={form.shopName} />
                  <SummaryRow label="Category" value={form.shopCategory} />
                  <SummaryRow label="Type" value={form.shopType} />
                  <SummaryRow label="Staff" value={form.staffCount} />
                  <SummaryRow label="Shop Address" value={[form.shopAddr1, form.shopAddr2, form.shopCity, form.shopState, form.shopPincode].filter(Boolean).join(", ")} />
                  <SummaryRow label="Contact" value={form.shopContact} />
                </SummaryBlock>

                <SummaryBlock title="Software Setup">
                  <SummaryRow label="Plan" value={form.plan} />
                  <SummaryRow label="Modules" value={form.modules.join(", ") || "—"} />
                  <SummaryRow label="Template" value={form.template} />
                  <SummaryRow label="Branches" value={String(form.branches)} />
                  <SummaryRow label="Go-Live Date" value={form.goLiveDate || "Not specified"} />
                </SummaryBlock>
              </div>

              <label className="flex items-start gap-2 mt-6 text-sm" style={{ color: "#1E293B" }}>
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded mt-0.5"
                  checked={form.agreeTerms}
                  onChange={(e) => update("agreeTerms", e.target.checked)}
                />
                <span>I agree to ShopNest's Terms &amp; Conditions and Privacy Policy</span>
              </label>
              {errors.agreeTerms && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.agreeTerms}</p>}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={step === 1 ? onBack : goBack}
              className="flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> {step === 1 ? "Cancel" : "Back"}
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={goNext}
                className="flex items-center gap-1.5 text-sm font-semibold px-6 py-2.5 rounded-full text-white hover:opacity-90 transition-opacity"
                style={{ background: "#2563EB" }}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-1.5 text-sm font-semibold px-6 py-2.5 rounded-full text-white hover:opacity-90 transition-opacity"
                style={{ background: "#10B981" }}
              >
                Submit Request <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryBlock({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4" style={{ borderRadius: 14, background: "#F8FAFC" }}>
      <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">{title}</div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-right" style={{ color: "#0F172A" }}>{value || "—"}</span>
    </div>
  );
}
