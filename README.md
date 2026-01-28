<<<<<<< HEAD
# UJ-Wifi-Authenticate
WIFI
=======
# UJ WiFi Authenticate (Captive Portal) 🚀

An enterprise-grade WiFi Captive Portal designed for the **University of Johannesburg**. This system handles secure Student/Staff authentication via LDAP and streamlined Guest onboarding.

## 🌟 Features
- **UJ Branded UI:** Custom CSS featuring Auckland Park campus visuals.
- **LDAP Integration:** Real-time credential validation against University Active Directory.
- **Guest Flow:** Time-limited sessions with Fair Use Policy acceptance.
- **ICT Admin Dashboard:** Live monitoring of connected MAC addresses and users.
- **Audit Logging:** Secure logging of all connection attempts for compliance.

## 🛠 Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
- **Backend:** Node.js, Express.js.
- **Security:** Express-Session, Dotenv, LDAPjs.
- **DevOps:** Docker, Docker-Compose.

## 🚀 Quick Start
1. **Configure Environment:**
   Create a `/backend/.env` file and add your `LDAP_URL` and `SESSION_SECRET`.
   
2. **Launch with Docker:**
   ```bash
   docker-compose up --build



   Since the Admin Dashboard is the final piece of our functional architecture, the next logical step is to **Finalize the Project Structure** and create the **Documentation (README)**. This ensures that anyone (including your lecturers or the ICT team) can understand, install, and run the system.

Here is the final structure and the guide to bring it all together.

---

### 📂 Final Project Directory Structure

 This clean separation is what makes it "Enterprise-grade."

```text
UJ_WiFi_Authenticate/
├── frontend/                # All Client-Side files
│   ├── styles.css           # Refined UJ branding
│   ├── landing.html         # Entry point
│   ├── login.html           # Student/Staff portal
│   ├── guest.html           # Guest T&Cs
│   ├── success.html         # Connection dashboard
│   └── admin.html           # ICT Management console
├── backend/                 # All Server-Side logic
│   ├── src/
│   │   ├── routes/          # API Endpoints
│   │   ├── controllers/     # Business Logic
│   │   ├── services/        # LDAP & Network integrations
│   │   ├── middleware/      # Auth & Audit guards
│   │   └── app.js           # Express configuration
│   ├── logs/                # Audit trails (access.log)
│   ├── .env                 # Secrets & Config
│   ├── server.js            # Entry point
│   └── Dockerfile           # Container instructions
├── docker-compose.yml       # Orchestration
└── README.md                # Documentation

```

---

### 📝 The Professional README



```markdown
# UJ WiFi Authenticate (Captive Portal) 🚀

An enterprise-grade WiFi Captive Portal designed for the **University of Johannesburg**. This system handles secure Student/Staff authentication via LDAP and streamlined Guest onboarding.

## 🌟 Features
- **UJ Branded UI:** Custom CSS featuring Auckland Park campus visuals.
- **LDAP Integration:** Real-time credential validation against University Active Directory.
- **Guest Flow:** Time-limited sessions with Fair Use Policy acceptance.
- **ICT Admin Dashboard:** Live monitoring of connected MAC addresses and users.
- **Audit Logging:** Secure logging of all connection attempts for compliance.

## 🛠 Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
- **Backend:** Node.js, Express.js.
- **Security:** Express-Session, Dotenv, LDAPjs.
- **DevOps:** Docker, Docker-Compose.

New-Item -Path . -Name "README.md" -ItemType "file" -Value "# UJ WiFi Authenticate Portal - Madibeng Campus 2026

## 🚀 Overview
A secure captive portal for UJ students featuring LDAP authentication and centralized SQL audit logging.

## 🛠 Features
* **LDAP Auth:** Validates student numbers against the `dc=uj,dc=ac,dc=za` directory.
* **Audit Logging:** Tracks IP, Device Model, and Status in MySQL (`uj_wifi_db`).
* **ICT Dashboard:** Live monitoring with CSV export functionality for reporting.
* **UJ Branding:** Custom landing and success pages with campus QR codes.

## 🚦 System Management
### Start System
`docker-compose up -d`

### Stop System (Keep Data)
`docker-compose stop`

### Factory Reset (Clear All Logs)
`docker-compose down -v`

## 📊 Access Points
* **Student Portal:** http://localhost:3000
* **Admin Dashboard:** http://localhost:3000/admin.html
* **Database Admin:** root / uj_admin_2026"


 



>>>>>>> bcbd82d (Initial commit)
