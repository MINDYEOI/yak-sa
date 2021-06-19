const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    user: { // 구매자 정보
        type: Array,
        default: []
    },
    data: { // 구매일자 정보
        type: Array,
        default: []
    },
    product: { // 상품 정보
        type: Array,
        default: []
    }


}, { timestamps: true })


const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment }