const modelschema = mongoose.model("category");
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
                        description: req.body.description,
                        categoryimage: req.body.categoryimage,
                    }).then((data) => {
                        res.status(200).json({
                            "status": true,
                            "message": "category update sucessfull..."
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
                            description: req.body.description,
                            categoryimage: req.body.categoryimage,
                            createdby:req.body.createdby
                        }).then((result) => {
                            return res.status(200).json({
                                "status": true,
                                "message": "category add sucessfull..."
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
                        "message": `${req.body.name}    already add this category...`
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

        modelschema.aggregate([{
            $match: {
                isdeleted: 0,
                isactive: true
            }
        }]).then((result) => {
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