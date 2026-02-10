/**
 * UJ WiFi Handshake Script
 * This script connects the Student Portal to the Backend Engine (Port 5001)
 */

const BACKEND_URL = "http://localhost:5001/api/system-status";

export const startHandshake = (updateCallback) => {
    const checkStatus = async () => {
        try {
            const response = await fetch(BACKEND_URL);
            if (!response.ok) throw new Error("Backend Offline");
            
            const data = await response.json();
            
            // Execute the callback with the new data
            // data.maintenance_mode and data.portal_message
            updateCallback(data);
            
        } catch (error) {
            console.error("Handshake failed: UJ Engine is unreachable.");
        }
    };

    // Run immediately on load, then every 10 seconds
    checkStatus();
    setInterval(checkStatus, 10000);
};