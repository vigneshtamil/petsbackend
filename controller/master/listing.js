const modelschema = mongoose.model("listing");
module.exports = {
    insert(req, res) {
        if (req.body._id) {
            modelschema.find({
                "_id": req.body._id
            }).then((data) => {
                if (data.length == 0) {
                    res.status(200).json({
                        "status": false,
                        "message": "No Record Found......"
                    })
                } else {
                    data[0].update({
                        name: req.body.name,
                        listingtype: req.body.listingtype,
                        mypet: req.body.mypet,
                        breed: req.body.breed,
                        gender: req.body.gender,
                        city: req.body.city,
                        state: req.body.state,
                        pincode: req.body.pincode,
                        description: req.body.description,
                    }).then((data) => {
                        res.status(200).json({
                            "status": true,
                            "message": "listing update sucessfull..."
                        })
                    })
                }
            })
        }
        else {
            modelschema.find({
                name: req.body.name,
                isdeleted: 0,
                isactive: true
            }).then((result) => {

                if (result.length == 0) {
                    {
                        return modelschema.create({
                            name: req.body.name,
                            listingtype: req.body.listingtype,
                            mypet: req.body.mypet,
                            breed: req.body.breed,
                            gender: req.body.gender,
                            city: req.body.city,
                            state: req.body.state,
                            pincode: req.body.pincode,
                            description: req.body.description,
                            createdby: req.body.createdby
                        }).then((result) => {
                            return res.status(200).json({
                                "status": true,
                                "message": "listing add sucessfull..."
                            })
                        }).catch((err) => {
                            return res.status(200).json({
                                "status": false,
                                "message": err.message
                            })
                        });
                    }



                }
                else {
                    return res.status(200).json({
                        "status": false,
                        "message": `${req.body.name}    already add this listing...`
                    })
                }

            }).catch((err) => {
                return res.status(200).json({
                    "status": false,
                    "message": err.message
                })
            });
        }


    },
    list(req, res) {

        modelschema.aggregate([
            {
                $match: {
                    isdeleted: 0,
                    isactive: true
                }
            },

            {
                $lookup: {
                    from: "mypets",
                    let: { mypetid: "$mypet" },
                    pipeline: [{
                        $match: {
                            isdeleted: 0,
                            $expr: {
                                $and: [{ $eq: ["$_id", "$$mypetid"] }],
                            },
                        },
                    },],
                    as: "mypetiddetails",
                },
            },
            {
                $unwind: "$mypetiddetails",
            },
            {
                $project: {
                    _id:1,
                    isactive:1,
                    name:1,
                    listingtype:1,
                    mypet:"$mypetiddetails.name",
                    breed:1,
                    gender:1,
                    city:1,
                    state:1,
                    pincode:1,
                    description:1
                }
            }
        ]).then((result) => {
            if (result.length == 0) {
                return res.status(200).json({
                    "status": false,
                    "message": "No Record Found..."
                })
            }
            else {
                return res.status(200).json({
                    "status": true,
                    "list": result
                })
            }
        }).catch((err) => {
            return res.status(200).json({
                "status": false,
                "message": err.message
            })
        });
    },
    delete(req, res) {
        console.log(req.body);
        modelschema.find({
            "_id": req.body._id
        }).then((data) => {
            if (data.length == 0) {
                res.status(200).json({
                    "status": false,
                    "message": "No Record Found......"
                })
            } else {
                data[0].update({
                    isdeleted: 1,
                }).then((data) => {
                    res.status(200).json({
                        "status": true,
                        "message": "Deleted Sucessfully....."
                    })
                })
            }
        })
    }
}