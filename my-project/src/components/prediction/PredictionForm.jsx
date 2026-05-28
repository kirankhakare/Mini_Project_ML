import { useState } from "react";

import API from "../../services/api";


function PredictionForm() {

  const [formData, setFormData] = useState({

    study_hours: "",

    attendance: "",

    assignment_score: "",

    internal_marks: ""

  });


  const [result, setResult] = useState(null);


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  const handlePredict = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await API.post(

        "/predict",

        formData,

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );


      setResult(response.data);

    } catch (error) {

      console.log(error);

      alert("Prediction Failed");

    }

  };


  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10">

        {/* Form Section */}

        <form
          onSubmit={handlePredict}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >

          <h1 className="text-3xl font-bold mb-6 text-indigo-600">

            Student Performance Prediction

          </h1>


          <input
            type="number"
            name="study_hours"
            placeholder="Study Hours"
            onChange={handleChange}
            required
            className="w-full border p-3 mb-4 rounded-lg"
          />


          <input
            type="number"
            name="attendance"
            placeholder="Attendance %"
            onChange={handleChange}
            required
            className="w-full border p-3 mb-4 rounded-lg"
          />


          <input
            type="number"
            name="assignment_score"
            placeholder="Assignment Score"
            onChange={handleChange}
            required
            className="w-full border p-3 mb-4 rounded-lg"
          />


          <input
            type="number"
            name="internal_marks"
            placeholder="Internal Marks"
            onChange={handleChange}
            required
            className="w-full border p-3 mb-6 rounded-lg"
          />


          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 transition text-white w-full py-3 rounded-lg font-semibold"
          >

            Predict Performance

          </button>

        </form>


        {/* Result Section */}

        <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-6 text-indigo-600">

            Prediction Result

          </h2>


          {
            result ? (

              <>

                <div className="mb-5">

                  <h3 className="text-xl font-semibold">
                    Final Prediction
                  </h3>

                  <p className="text-3xl font-bold text-green-600 mt-2">

                    {result.prediction}

                  </p>

                </div>


                <div className="mb-5">

                  <h3 className="text-xl font-semibold">
                    Recommendation
                  </h3>

                  <p className="text-gray-700 mt-2">

                    {result.recommendation}

                  </p>

                </div>


                <div>

                  <h3 className="text-xl font-semibold">
                    Date & Time
                  </h3>

                  <p className="text-gray-700 mt-2">

                    {
                      new Date(
                        result.createdAt
                      ).toLocaleString()
                    }

                  </p>

                </div>

              </>

            ) : (

              <p className="text-gray-500">

                No prediction yet.

              </p>

            )
          }

        </div>

      </div>

    </div>
  );
}

export default PredictionForm;