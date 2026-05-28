import React from "react";

function HeroSection() {
  return (
    <div className="min-h-[90vh] bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white px-5">

      <div className="text-center">

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Student Performance Prediction
        </h1>

        <p className="text-lg md:text-xl mb-8">
          Predict student success using Hybrid Machine Learning Algorithms
        </p>

        <a
          href="/predict"
          className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Start Prediction
        </a>

      </div>

    </div>
  );
}

export default HeroSection;