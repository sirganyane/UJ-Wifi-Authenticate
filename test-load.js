const axios = require('axios');

const simulateLogins = async () => {
    console.log("🚀 Starting Load Test: 50 Concurrent Authentications...");
    
    const attempts = Array.from({ length: 50 }).map((_, i) => {
        return axios.post('http://localhost:3000/auth/login', {
            username: `uj_student_${i}`,
            password: 'password123'
        }).catch(err => console.log(`❌ Request ${i} failed`));
    });

    const results = await Promise.all(attempts);
    console.log(`✅ Finished. Successfully handled ${results.length} requests.`);
};

simulateLogins();