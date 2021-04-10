const user = require('./admin/user')
const category = require('./master/category')
const addbusiness = require('./master/addbusiness')
const event = require('./master/event')
const listing = require('./master/listing')
const mypets = require('./master/mypets')
const product = require('./master/product')
const recomentation = require('./master/recomentation')
module.exports = {
    user,
    category,
    event,
    addbusiness,
    listing,
    mypets,
    product,
    recomentation
}