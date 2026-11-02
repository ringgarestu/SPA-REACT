import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/api";

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/login");
    }
  }

  return (
    <section className="register-page">
      <h2>Daftar Sekarang</h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        Kembali ke <Link to="/login">Masuk</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
