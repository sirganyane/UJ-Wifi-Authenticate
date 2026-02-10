FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for database support
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Copy requirements first for faster building
COPY requirements.txt .

# Bypass SSL errors for local network restrictions
RUN pip install --no-cache-dir \
    --trusted-host pypi.org \
    --trusted-host pypi.python.org \
    --trusted-host files.pythonhosted.org \
    -r requirements.txt

# Copy the rest of the backend code
COPY . .

EXPOSE 5001
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy the entire backend folder (including templates/)
COPY . .
EXPOSE 5001
CMD ["python", "app.py"]