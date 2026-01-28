// backend/src/services/guest.service.js
const crypto = require('crypto');

// Mock database for active vouchers
const activeVouchers = new Map(); 

const generateVoucher = (days = 1) => {
    const code = crypto.randomBytes(3).toString('hex').toUpperCase(); // e.g., "A1B2C3"
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + days);
    
    activeVouchers.set(code, { expiry, used: false });
    return code;
};

const validateVoucher = (code) => {
    const voucher = activeVouchers.get(code);
    if (voucher && !voucher.used && voucher.expiry > new Date()) {
        voucher.used = true; // Mark as used for this session
        return true;
    }
    return false;
};

module.exports = { generateVoucher, validateVoucher };