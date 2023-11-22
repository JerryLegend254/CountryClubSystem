const express = require("express")
const { httpAddPayment, httpGetAllPayments, httpGetOnePayment } = require("./payment.controller")
const PaymentRouter = express.Router()

PaymentRouter.post("/", httpAddPayment)
PaymentRouter.get("/:id", httpGetOnePayment)
PaymentRouter.get("/", httpGetAllPayments)



module.exports = PaymentRouter