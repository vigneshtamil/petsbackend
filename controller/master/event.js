const modelschema = mongoose.model("event");
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
                        venue: req.body.venue,
                        description: req.body.description,
                        eventstartdt: req.body.eventstartdt,
                        eventenddt: req.body.eventenddt,
                        city: req.body.city,
                        state: req.body.state,
                        pincode: req.body.pincode,
                        eventstime: req.body.eventstime,
                        eventetime: req.body.eventetime,
           
                    }).then((data) => {
                        res.status(200).json({
                            "status": true,
                            "message": "event update sucessfull..."
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
                            venue: req.body.venue,
                            description: req.body.description,
                            eventstartdt: req.body.eventstartdt,
                            eventenddt: req.body.eventenddt,
                            city: req.body.city,
                            state: req.body.state,
                            pincode: req.body.pincode,
                            eventstime: req.body.eventstime,
                            eventetime: req.body.eventetime,
                            createdby:req.body.createdby
                        }).then((result) => {
                            return res.status(200).json({
                                "status": true,
                                "message": "event add sucessfull..."
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
                        "message": `${req.body.name}    already add this event...`
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