import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [form, setForm] = useState({
    username: "",
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
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "Username obbligatorio";
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
      const res = await fetch("http://localhost:1313/public/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          name: form.firstName,
          surname: form.lastName,
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        const message = (payload && (payload.message || payload.error || payload.errors)) || `Errore: ${res.status}`;
        setServerError(message);
      } else {
        const payload = await res.json().catch(() => null);
        setSuccess(payload?.message || "Registrazione avvenuta con successo!");
        setForm({ username: "", firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
        navigate("/login", { state: { successMessage: payload?.message || "Registrazione avvenuta con successo, effettua il login!" } });
      }
    } catch {
      setServerError("Impossibile contattare il server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="page-container-registration my-5">
      <div className="    rounded-5 card-box-shadoww  " style={{ border: "2px solid #ffffffff" }}>
        <h2 className="text-2xl font-semibold text-white text-center mb-4">Crea il tuo account</h2>

        {serverError && <div className="bg-red-600/90 text-white px-4 py-2 rounded mb-4">{String(serverError)}</div>}
        {success && <div className="bg-green-600/90 text-white px-4 py-2 rounded mb-4">{success}</div>}

        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit} noValidate>
            <Row className="d-flex ">
              <Col xs={6} className="p-0 d-flex justify-content-center">
                <label className="text-white mb-3 text-center mx-5">
                  <h5 className="mb-1 ">Username</h5>
                  <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className={`rounded py-2 rounded-lg bg-white/5 border ${errors.username ? "border-red-400" : "border-white"} text-black`}
                    placeholder="mario.rossi"
                    aria-invalid={!!errors.username}
                    aria-describedby={errors.username ? "err-username" : undefined}
                  />
                  {errors.username && (
                    <small id="err-username" className="text-red-300 mt-1">
                      {errors.username}
                    </small>
                  )}
                </label>{" "}
              </Col>
              <Col xs={6} className="p-0 d-flex justify-content-center">
                <label className=" text-white mb-3 text-center mx-5">
                  <h5 className="mb-1">Email</h5>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`rounded py-2 rounded bg-white/5 border ${errors.email ? "border-red-400" : "border-white/10"} text-black`}
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
              </Col>
            </Row>

            <Row>
              <Col xs={6} className="p-0 d-flex justify-content-center">
                <label className="text-white mb-3 text-center mx-5">
                  <h5 className="mb-1 ">Nome</h5>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className={` py-2 rounded bg-white/5 border ${errors.firstName ? "border-red-400" : "border-white"} text-black`}
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
              </Col>
              <Col xs={6} className="p-0 d-flex justify-content-center">
                <label className="text-white mb-3 text-center mx-5">
                  <h5 className="mb-1 ">Cognome</h5>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className={` py-2 rounded bg-white/5 border ${errors.lastName ? "border-red-400" : "border-white/10"} text-black`}
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
              </Col>
            </Row>

            <Row>
              <Col xs={6} className="p-0 d-flex justify-content-center">
                <label className=" text-white mb-3 mx-5">
                  <h5 className="mb-1">Password</h5>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className={` py-2 rounded bg-white/5 border ${errors.password ? "border-red-400" : "border-white/10"} text-black`}
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
              </Col>

              <Col xs={6} className="p-0 d-flex justify-content-center">
                <label className=" text-white mb-3 mx-5">
                  <h5 className="mb-1">Conferma Password</h5>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`rounded py-2 rounded-lg bg-white/5 border ${errors.confirmPassword ? "border-red-400" : "border-white/10"} text-black`}
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
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs={2} className="px-0 d-flex justify-content-center">
                <button type="submit" disabled={loading} className="rounded py-2  bg-white hover:bg-white/20 text-black text-center">
                  {loading ? "Registrazione in corso..." : "Registrati"}
                </button>
              </Col>
            </Row>
            <div className="text-white mt-3 text-center">Password sicura, non condividere i dati con nessuno.</div>
          </form>
        </div>

        <div className="mt-4 text-center text-white mb-3">
          Hai già un account?{" "}
          <a href="/login" className=" text-white">
            Accedi
          </a>
        </div>
      </div>
    </Container>
  );
}

export default RegistrationForm;
