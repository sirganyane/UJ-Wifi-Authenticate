import hashlib
import time
import hmac

# Security: Secret key shared only between Portal and SCEP Server [cite: 228]
SHARED_SECRET = b"UJ-WiFi-Deployment-2025-Secret"

def generate_scep_token(student_id):
    """Generates an authenticated token for BYOD enrollment [cite: 66, 82]"""
    timestamp = str(int(time.time())).encode()
    message = student_id.encode() + timestamp
    token = hmac.new(SHARED_SECRET, message, hashlib.sha256).hexdigest()
    
    # Format: studentID:timestamp:hash
    return f"{student_id}:{timestamp.decode()}:{token}"

# Example usage when a student logs into the portal [cite: 128]
print(f"Enrollment URL: https://scep.uj.ac.za/enroll?token={generate_scep_token('210012345')}")