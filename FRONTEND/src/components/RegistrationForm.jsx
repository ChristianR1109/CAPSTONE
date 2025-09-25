import React, { useState } from "react";

export default function RegistrationForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [serverError, setServerError] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Nome obbligatorio";
    if (!form.lastName.trim()) e.lastName = "Cognome obbligatorio";
    if (!form.email) e.email = "Email obbligatoria";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email non valida";
    if (!form.password) e.password = "Password obbligatoria";
    else if (form.password.length < 8) e.password = "La password deve avere almeno 8 caratteri";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Le password non coincidono";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
    setServerError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    setLoading(true);
    setServerError(null);
    try {
      const res = await fetch("http://localhost:1313/public/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        const message = (payload && (payload.message || payload.error || payload.errors)) || `Errore: ${res.status}`;
        setServerError(message);
      } else {
        const payload = await res.json().catch(() => null);
        setSuccess(payload?.message || "Registrazione avvenuta con successo. Controlla la tua email.");
        setForm({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
      }
    } catch {
      setServerError("Impossibile contattare il server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 to-indigo-800 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-white text-center mb-4">Crea il tuo account</h2>

        {serverError && <div className="bg-red-600/90 text-white px-4 py-2 rounded mb-4">{String(serverError)}</div>}

        {success && <div className="bg-green-600/90 text-white px-4 py-2 rounded mb-4">{success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <label className="flex flex-col text-sm text-white/85">
              <span className="mb-1">Nome</span>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className={`px-3 py-2 rounded-lg bg-white/5 border ${errors.firstName ? "border-red-400" : "border-white/10"} text-white`}
                placeholder="Mario"
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "err-firstName" : undefined}
              />
              {errors.firstName && (
                <small id="err-firstName" className="text-red-300 mt-1">
                  {errors.firstName}
                </small>
              )}
            </label>

            <label className="flex flex-col text-sm text-white/85">
              <span className="mb-1">Cognome</span>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className={`px-3 py-2 rounded-lg bg-white/5 border ${errors.lastName ? "border-red-400" : "border-white/10"} text-white`}
                placeholder="Rossi"
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "err-lastName" : undefined}
              />
              {errors.lastName && (
                <small id="err-lastName" className="text-red-300 mt-1">
                  {errors.lastName}
                </small>
              )}
            </label>
          </div>

          <label className="flex flex-col text-sm text-white/85 mb-3">
            <span className="mb-1">Email</span>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg bg-white/5 border ${errors.email ? "border-red-400" : "border-white/10"} text-white`}
              placeholder="mario@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            {errors.email && (
              <small id="err-email" className="text-red-300 mt-1">
                {errors.email}
              </small>
            )}
          </label>

          <label className="flex flex-col text-sm text-white/85 mb-3">
            <span className="mb-1">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg bg-white/5 border ${errors.password ? "border-red-400" : "border-white/10"} text-white`}
              placeholder="Almeno 8 caratteri"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "err-password" : undefined}
            />
            {errors.password && (
              <small id="err-password" className="text-red-300 mt-1">
                {errors.password}
              </small>
            )}
          </label>

          <label className="flex flex-col text-sm text-white/85 mb-4">
            <span className="mb-1">Conferma password</span>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg bg-white/5 border ${errors.confirmPassword ? "border-red-400" : "border-white/10"} text-white`}
              placeholder="Ripeti la password"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "err-confirmPassword" : undefined}
            />
            {errors.confirmPassword && (
              <small id="err-confirmPassword" className="text-red-300 mt-1">
                {errors.confirmPassword}
              </small>
            )}
          </label>

          <button type="submit" disabled={loading} className="w-full py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition">
            {loading ? "Registrazione in corso..." : "Registrati"}
          </button>

          <div className="text-xs text-white/60 mt-3">Password sicura, non condividere i dati con nessuno.</div>
        </form>

        <div className="mt-4 text-center text-white/70 text-sm">
          Hai già un account?{" "}
          <a href="/login" className="underline">
            Accedi
          </a>
        </div>
      </div>
    </div>
  );
}
