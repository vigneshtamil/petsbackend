const usermodel = mongoose.model("user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var env = require('dotenv').config()
var otpGenerator = require('otp-generator')
module.exports = {
    signup(req, res) {
        if (req.body.mobilenumber.toString().length != 10) {
            return res.status(200).json({
                "status": false,
                "message": "please enter 10 digit mobile number"
            })
        }
        return usermodel.aggregate([
            {
                $match: {
                    isactive: true,
                    isdeleted: 0,
                    mobilenumber: req.body.mobilenumber,
                }
            }
        ]).then((findresult) => {
            if (findresult.length == 0) {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        if (err) {
                            return res.status(200).json({
                                "status": false,
                                "message": err
                            })
                        }
                        else {
                            return usermodel.create(
                                {
                                    name: req.body.name,
                                    mobilenumber: req.body.mobilenumber,
                                    password: hash,
                                }
                            ).then((result) => {
                                return res.status(200).json({
                                    "status": true,
                                    "message": "signup sucessfull..."
                                })
                            }).catch((err) => {
                                return res.status(200).json({
                                    "status": false,
                                    "message": err.message
                                })
                            });
                        }

                    });
                });
            }
            else {
                return res.status(200).json({
                    "status": false,
                    "message": "your mobile number already register"
                })
            }
        }).catch((err) => {
            return res.status(200).json({
                "status": false,
                "message": err.message
            })
        });
    },
    login(req, res) {
        if (req.body.mobilenumber.toString().length != 10) {
            return res.status(200).json({
                "status": false,
                "message": "please enter 10 digit mobile number"
            })
        }
        usermodel.aggregate([
            {
                $match: {
                    isactive: true,
                    isdeleted: 0,
                    mobilenumber: req.body.mobilenumber,
                }
            }
        ]).then((findresult) => {
            console.log(findresult);
            if (findresult.length == 0) {
                return res.status(200).json({
                    "status": false,
                    "message": "please sign up and continue..."
                })
            }
            else {
                bcrypt.compare(req.body.password, findresult[0].password, function (err, result) {
                    if (err) {
                        return res.status(200).json({
                            "status": false,
                            "message": err
                        })
                    }
                    if (result == true) {
                        var jwttoken = jwt.sign(findresult[0], process.env.JWTSECKEY, { expiresIn: '1h' });

                        return res.status(200).json({
                            "status": true,
                            "message": "login sucess..",
                            "name": findresult[0].name,
                            "token": jwttoken,
                            "_id": findresult[0]._id
                        })
                    }
                    else {
                        return res.status(200).json({
                            "status": false,
                            "message": "wrong password..."
                        })
                    }

                });

            }
        }).catch((err) => {
            return res.status(200).json({
                "status": false,
                "message": err.message
            })
        });
    },
    forgotpasswordotpsend(req, res) {
        if (req.body.mobilenumber.toString().length != 10) {
            return res.status(200).json({
                "status": false,
                "message": "please enter 10 digit mobile number"
            })
        }
        usermodel.find(
            {
                isactive: true,
                isdeleted: 0,
                mobilenumber: req.body.mobilenumber,
            }
        ).then((result) => {
            if (result.length == 0) {
                return res.status(200).json({
                    "status": false,
                    "message": "please sign in and continue..."
                })
            }
            else {

                var otpnumber = otpGenerator.generate(4, { digits: true, alphabets: false, upperCase: false, specialChars: false })
                return result[0].update({
                    otp: otpnumber
                }).then((otpresult) => {
                    console.log(otpresult);
                    return res.status(200).json({
                        "status": true,
                        "message": "your otp is recevied...",
                        "otp": otpnumber
                    })
                }).catch((err) => {
                    return res.status(200).json({
                        "status": false,
                        "message": err.message
                    })
                });
            }


        }).catch((err) => {
            return res.status(200).json({
                "status": false,
                "message": err.message
            })
        });
    },
    forgotpasswordotpverified(req, res) {
        if (req.body.mobilenumber.toString().length != 10) {
            return res.status(200).json({
                "status": false,
                "message": "please enter 10 digit mobile number"
            })
        }

        return usermodel.find(
            {
                isactive: true,
                isdeleted: 0,
                mobilenumber: req.body.mobilenumber,
            }
        ).then((result) => {
            if (result.length == 0) {
                return res.status(200).json({
                    "status": false,
                    "message": "please sign in and continue..."
                })
            }
            else {

                usermodel.find(
                    {
                        isactive: true,
                        isdeleted: 0,
                        mobilenumber: req.body.mobilenumber,
                        otp: req.body.otp,

                    }
                ).then((result) => {
                    if (result.length == 0) {
                        return res.status(200).json({
                            "status": false,
                            "message": "otp is wrong..."
                        })
                    }
                    else {
                        return res.status(200).json({
                            "status": true,
                            "message": "otp verified sucessfull..."
                        })

                    }


                }).catch((err) => {
                    return res.status(200).json({
                        "status": false,
                        "message": err.message
                    })
                });
            }


        }).catch((err) => {
            return res.status(200).json({
                "status": false,
                "message": err.message
            })
        });

    },
    forgotpasswordchange(req, res) {
    
        if (req.body.mobilenumber.toString().length != 10) {
            return res.status(200).json({
                "status": false,
                "message": "please enter 10 digit mobile number"
            })
        }
        return usermodel.find(
            {
                isactive: true,
                isdeleted: 0,
                mobilenumber: req.body.mobilenumber,
            }
        ).then((result) => {
            if (result.length == 0) {
                return res.status(200).json({
                    "status": false,
                    "message": "please sign in and continue..."
                })
            }
            else {

                usermodel.find(
                    {
                        isactive: true,
                        isdeleted: 0,
                        mobilenumber: req.body.mobilenumber,
                        otp: req.body.otp,

                    }
                ).then((result) => {
                    if (result.length == 0) {
                        return res.status(200).json({
                            "status": false,
                            "message": "otp is wrong..."
                        })
                    }
                    else {
                        bcrypt.genSalt(saltRounds, function (err, salt) {
                            bcrypt.hash(req.body.password, salt, function (err, hash) {
                                if (err) {
                                    return res.status(200).json({
                                        "status": false,
                                        "message": err
                                    })
                                }
                                else {
                                    return result[0].update(
                                        {
                                            mobilenumber: req.body.mobilenumber,
                                            password: hash,
                                        }
                                    ).then((result) => {
                                        return res.status(200).json({
                                            "status": true,
                                            "message": "password changed..."
                                        })
                                    }).catch((err) => {
                                        return res.status(200).json({
                                            "status": false,
                                            "message": err.message
                                        })
                                    });
                                }

                            });
                        });

                    }


                }).catch((err) => {
                    return res.status(200).json({
                        "status": false,
                        "message": err.message
                    })
                });
            }


        }).catch((err) => {
            return res.status(200).json({
                "status": false,
                "message": err.message
            })
        });

    }

}