const Prediction = require('../models/Prediction');


// ==========================================
// GET USER PREDICTION HISTORY
// ==========================================

const getHistory = async (req, res) => {

    try {

        // Get Logged-in User Predictions

        const history = await Prediction.find({

            userId: req.user._id

        }).sort({

            createdAt: -1

        });


        // Send Response

        res.json(history);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};


// ==========================================
// GET DASHBOARD STATS
// ==========================================

const getDashboardStats = async (req, res) => {

    try {

        // Get All Predictions

        const predictions = await Prediction.find({

            userId: req.user._id

        }).sort({

            createdAt: -1

        });


        // Total Predictions

        const totalPredictions =
            predictions.length;


        // Latest Prediction

        const latestPrediction =
            predictions[0];


        // Pass Count

        const passCount =
            predictions.filter(

                item =>

                    item.prediction === 'Pass'

            ).length;


        // Fail Count

        const failCount =
            predictions.filter(

                item =>

                    item.prediction === 'Fail'

            ).length;


        // Accuracy Calculation

        const accuracy =

            totalPredictions > 0

                ? (

                    (passCount / totalPredictions) * 100

                ).toFixed(0)

                : 0;


        // Response

        res.json({

            totalPredictions,

            latestResult:

                latestPrediction?.prediction || 'N/A',

            accuracy,

            passCount,

            failCount,

            predictions

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};


// ==========================================
// EXPORTS
// ==========================================

module.exports = {

    getHistory,

    getDashboardStats

};