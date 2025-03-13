import { useState, useContext } from "react";
import {AuthContext} from "../context/AuthContext";
import Link from "next/link";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-4" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
        <p>New User?</p>
        <Link href="/signup" className="text-blue-500"><button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Sign up</button></Link>
      </form>
    </div>
  );
}
