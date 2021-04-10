var express = require('express');
var router = express.Router();

//------------------------------------------category--------------------------------------//
const category = require('../controller').category
router.post('/category/add', verifytoken, category.insert)
router.get('/category/list', verifytoken, category.list)
router.post('/category/delete', verifytoken, category.delete)

//------------------------------------------business--------------------------------------//


const addbusiness = require('../controller').addbusiness
router.post('/addbusiness/add', verifytoken, addbusiness.insert)
router.get('/addbusiness/list', verifytoken, addbusiness.list)
router.post('/addbusiness/delete', verifytoken, addbusiness.delete)


//------------------------------------------event--------------------------------------//

const event = require('../controller').event
router.post('/event/add', verifytoken, event.insert)
router.get('/event/list', verifytoken, event.list)
router.post('/event/delete', verifytoken, event.delete)


//------------------------------------------listinng--------------------------------------//


const listing = require('../controller').listing
router.post('/listing/add', verifytoken, listing.insert)
router.get('/listing/list', verifytoken, listing.list)
router.post('/listing/delete', verifytoken, listing.delete)


//------------------------------------------mypets--------------------------------------//


const mypets = require('../controller').mypets
router.post('/mypets/add', verifytoken, mypets.insert)
router.get('/mypets/list', verifytoken, mypets.list)
router.post('/mypets/delete', verifytoken, mypets.delete)
router.post('/mypetsfind', verifytoken, mypets.mypetsfind)



//------------------------------------------mypets--------------------------------------//


const product = require('../controller').product
router.post('/product/add', verifytoken, product.insert)
router.get('/product/list', verifytoken, product.list)
router.post('/product/delete', verifytoken, product.delete)


//------------------------------------------recomentation--------------------------------------//


const recomentation = require('../controller').recomentation
router.post('/recomentation/add', verifytoken, recomentation.insert)
router.get('/recomentation/list', verifytoken, recomentation.list)
router.post('/recomentation/delete', verifytoken, recomentation.delete)



// ---------------------------with token verify-------------------------------//


// function verifytoken(req, res, next) {
//     try {
//         var token = req.headers.authorization
//         if (token == undefined) {
//             return res.status(200).json({
//                 "status": false,
//                 "message": `Please Send Token...`
//             })
//         }
//         jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
//             if (decoded == undefined) {
//                 return res.status(200).json({
//                     "status": false,
//                     "message": `Invalid Token....`
//                 })
//             } else {
//                 next()
//             }
//         });
//     } catch (error) {
//         return res.status(200).json({
//             "status": false,
//             "message": error.message
//         })
//     }

// }

// ---------------------------with out token verify-------------------------------//

function verifytoken(req, res, next) {
    next()

}

module.exports = router;
