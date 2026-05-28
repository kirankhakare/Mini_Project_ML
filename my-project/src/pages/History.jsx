import { useEffect, useState } from "react";

import API from "../services/api";


function History() {

  const [history, setHistory] = useState([]);


  useEffect(() => {

    fetchHistory();

  }, []);


  // Fetch History

  const fetchHistory = async () => {

    try {

      const token = localStorage.getItem("token");


      const response = await API.get(

        "/history",

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );


      setHistory(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-10">

      {/* Heading */}

      <div className="text-center mb-12">

        <h1 className="text-4xl md:text-5xl font-bold text-indigo-600">

          Prediction History

        </h1>

        <p className="text-gray-500 mt-3 text-lg">

          Track all your previous student performance predictions.

        </p>

      </div>


      {/* Empty State */}

      {
        history.length === 0 ? (

          <div className="flex justify-center items-center">

            <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">

              <h2 className="text-2xl font-bold text-gray-700 mb-3">

                No History Found

              </h2>

              <p className="text-gray-500">

                Your prediction history will appear here after making predictions.

              </p>

            </div>

          </div>

        ) : (

          /* History Cards */

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {
              history.map((item) => (

                <div

                  key={item._id}

                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100"

                >

                  {/* Top Status */}

                  <div

                    className={`p-5 text-white ${

                      item.prediction === "Pass"

                        ? "bg-green-500"

                        : "bg-red-500"

                    }`}

                  >

                    <h2 className="text-3xl font-bold">

                      {item.prediction}

                    </h2>

                    <p className="text-sm mt-1 opacity-90">

                      Student Performance Prediction

                    </p>

                  </div>


                  {/* Content */}

                  <div className="p-6 space-y-4">


                    {/* Scores */}

                    <div className="grid grid-cols-2 gap-4">

                      <div className="bg-indigo-50 p-4 rounded-xl">

                        <p className="text-sm text-gray-500">

                          Study Hours

                        </p>

                        <h3 className="text-2xl font-bold text-indigo-600">

                          {item.study_hours}

                        </h3>

                      </div>


                      <div className="bg-purple-50 p-4 rounded-xl">

                        <p className="text-sm text-gray-500">

                          Attendance

                        </p>

                        <h3 className="text-2xl font-bold text-purple-600">

                          {item.attendance}%

                        </h3>

                      </div>


                      <div className="bg-pink-50 p-4 rounded-xl">

                        <p className="text-sm text-gray-500">

                          Assignment

                        </p>

                        <h3 className="text-2xl font-bold text-pink-600">

                          {item.assignment_score}

                        </h3>

                      </div>


                      <div className="bg-yellow-50 p-4 rounded-xl">

                        <p className="text-sm text-gray-500">

                          Internal Marks

                        </p>

                        <h3 className="text-2xl font-bold text-yellow-600">

                          {item.internal_marks}

                        </h3>

                      </div>

                    </div>


                    {/* Recommendation */}

                    <div className="bg-gray-50 p-4 rounded-xl">

                      <h3 className="font-semibold text-gray-700 mb-2">

                        Recommendation

                      </h3>

                      <p className="text-gray-600 leading-relaxed">

                        {item.recommendation}

                      </p>

                    </div>


                    {/* Date */}

                    <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">

                      <span>

                        Prediction Date

                      </span>

                      <span className="font-medium">

                        {
                          new Date(
                            item.createdAt
                          ).toLocaleString()
                        }

                      </span>

                    </div>

                  </div>

                </div>

              ))
            }

          </div>

        )
      }

    </div>
  );
}

export default History;