const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// 1. Define Paths
const outputDir = path.join(__dirname, 'public', 'images');

// 2. Create the images folder if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 3. QR Configuration (Update the IP to your server's IP)
const serverIP = 'http://localhost:3000'; 

const codes = [
    { name: 'UJ_WiFi_Login', url: `${serverIP}/login.html` },
    { name: 'UJ_Admin_Dashboard', url: `${serverIP}/admin.html` }
];

// 4. Generate the files
codes.forEach(item => {
    const outputPath = path.join(outputDir, `${item.name}.png`);
    
    QRCode.toFile(outputPath, item.url, {
        color: {
            dark: '#00467F',  // UJ Blue
            light: '#FFFFFF' // White background
        },
        width: 1000,
        margin: 2
    }, (err) => {
        if (err) console.error(`Error generating ${item.name}:`, err);
        else console.log(`✔ Success: ${item.name}.png saved to /public/images`);
    });
});