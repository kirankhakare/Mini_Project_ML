import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/register",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      alert("Registration Successful");

      window.location.reload();

      navigate("/predict");

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Student Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full border p-3 mb-6 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white w-full py-3 rounded-lg font-semibold"
        >
          Register
        </button>

        {/* Login Redirect */}

        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}

          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;