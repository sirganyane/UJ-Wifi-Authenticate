from flask import Flask, render_template, jsonify, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import subprocess, os, logging
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'uj_secret'
db = SQLAlchemy(app)

# Database Models
class ActiveSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20))
    ip = db.Column(db.String(15))
    mac = db.Column(db.String(17))

@app.route('/')
def index():
    return "<h1>UJ WiFi Portal Active</h1><p>Visit /admin for control panel.</p>"

@app.route('/api/active-sessions')
def get_sessions():
    sessions = ActiveSession.query.all()
    return jsonify([{'id': s.id, 'username': s.username, 'ip': s.ip, 'mac': s.mac} for s in sessions])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001)

from flask_admin import Admin, AdminIndexView, expose

# This class "hijacks" the default admin home to show your admin.html
class MyDashboardView(AdminIndexView):
    @expose('/')
    def index(self):
        # This renders the admin.html file you provided
        return self.render('admin.html')

# Initialize Admin with the custom index_view
admin = Admin(app, 
              name='UJ Admin', 
              index_view=MyDashboardView(), 
              template_mode='bootstrap4', 
              url='/admin')
