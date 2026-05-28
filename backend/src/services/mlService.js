const axios = require('axios');

const getPrediction = async (data) => {

    try {

        const response = await axios.post(

            'http://127.0.0.1:5001/predict',

            data

        );

        return response.data;

    } catch (error) {

        console.log(error.message);

    }

};

module.exports = {
    getPrediction
};