import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import useAuth from "../auth/useAuth";

function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const [visibleMessage, setVisibleMessage] = useState(successMessage);

  useEffect(() => {
    if (visibleMessage) {
      const timer = setTimeout(() => setVisibleMessage(null), 5000); // sparisce dopo 5 secondi
      return () => clearTimeout(timer);
    }
  }, [visibleMessage]);
  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email obbligatoria";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email non valida";
    if (!form.password) e.password = "Password obbligatoria";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
    setServerError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    setLoading(true);
    setServerError(null);

    try {
      const res = await fetch("http://localhost:1313/public/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        login(payload.token);
        navigate("/home"); // redirect alla home
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
        <h2 className="text-2xl font-semibold text-white text-center mb-4">Accedi</h2>
        {visibleMessage && <div className="bg-green-600/90 text-white px-4 py-2 rounded mb-4">{visibleMessage}</div>}

        {serverError && <div className="bg-red-600/90 text-white px-4 py-2 rounded mb-4">{String(serverError)}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <label className="flex flex-col text-sm text-white/85 mb-3">
            <span className="mb-1">Email</span>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg bg-white/5 border ${errors.email ? "border-red-400" : "border-white/10"} text-black`}
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

          <label className="flex flex-col text-sm text-white/85 mb-4">
            <span className="mb-1">Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg bg-white/5 border ${errors.password ? "border-red-400" : "border-white/10"} text-black`}
              placeholder="Password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "err-password" : undefined}
            />
            {errors.password && (
              <small id="err-password" className="text-red-300 mt-1">
                {errors.password}
              </small>
            )}
          </label>

          <button type="submit" disabled={loading} className="w-full py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition">
            {loading ? "Accesso in corso..." : "Accedi"}
          </button>

          <div className="mt-4 text-center text-white/70 text-sm">
            Non hai un account?{" "}
            <a href="/register" className="underline">
              Registrati
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
