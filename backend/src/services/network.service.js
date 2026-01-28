/**
 * Authorizes a device on the UJ Network infrastructure
 * @param {string} macAddress - The hardware address of the user's device
 * @param {string} role - 'student', 'staff', or 'guest'
 */
const authorizeDevice = async (macAddress, role) => {
    console.log(`📡 Requesting network access for MAC: ${macAddress} with role: ${role}`);

    // In a real UJ deployment, you would call the WLC API or a RADIUS CoA
    // Example for Cisco/Aruba:
    // const response = await axios.post('https://wlc.uj.ac.za/api/v1/authorize', { mac: macAddress, vlan: role === 'staff' ? 10 : 20 });

    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`✅ Network Access GRANTED for ${macAddress}`);
            resolve({ success: true, vlan: role === 'staff' ? 'Staff_VLAN' : 'Student_VLAN' });
        }, 800);
    });
};

module.exports = { authorizeDevice };