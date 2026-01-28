// backend/src/services/auth.service.js

const authenticateUser = async (username, password) => {
    // Simulate network delay to UJ Servers
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock Logic: 
    // In production, this is where you'd use 'ldapjs' or 'node-radius'
    if (username.startsWith('uj_') && password === 'password123') {
        return {
            success: true,
            user: { username, role: 'student', id: '2024001' }
        };
    }

    return { success: false, message: 'Invalid UJ Credentials' };
};

module.exports = { authenticateUser };