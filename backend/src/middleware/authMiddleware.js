const jwt = require('jsonwebtoken');

const User = require('../models/User');


const protect = async (req, res, next) => {

    let token;

    // Check Authorization Header

    if (

        req.headers.authorization &&

        req.headers.authorization.startsWith('Bearer')

    ) {

        try {

            // Get Token

            token =
                req.headers.authorization.split(' ')[1];


            // Verify Token

            const decoded = jwt.verify(

                token,

                process.env.JWT_SECRET

            );


            // Get User Data

            req.user = await User.findById(decoded.id)

                .select('-password');


            next();

        } catch (error) {

            res.status(401).json({

                message: 'Not Authorized'

            });

        }

    }


    // No Token

    if (!token) {

        res.status(401).json({

            message: 'No Token Found'

        });

    }

};


module.exports = {
    protect
};