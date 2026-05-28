import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Handle Input Change

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // Handle Login

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      // Save Token

      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save User

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      alert("Login Successful");

      // Redirect to Dashboard

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Student Login
        </h1>

        {/* Email */}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Password */}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Login Button */}

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white w-full py-3 rounded-lg font-semibold"
        >
          Login
        </button>

        {/* Register Redirect */}

        <p className="text-center mt-5 text-gray-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;