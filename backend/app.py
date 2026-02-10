from flask import Flask, render_template
from flask_cors import CORS
from flask_admin import Admin, AdminIndexView, expose
import os

app = Flask(__name__, template_folder='templates')
CORS(app)
app.config['SECRET_KEY'] = 'uj_wifi_secret_key'

class MyAdminIndexView(AdminIndexView):
    @expose('/')
    def index(self):
        # This checks if the file exists before crashing
        template_path = os.path.join(app.template_folder, 'admin.html')
        if not os.path.exists(template_path):
            return f"ERROR: admin.html not found at {template_path}. Put your file in backend/templates/"
        return render_template('admin.html')

admin = Admin(app, name='UJ WIFI', template_mode='bootstrap4', index_view=MyAdminIndexView())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

from flask import Flask, render_template
from flask_cors import CORS
import os

app = Flask(__name__, template_folder='templates')
CORS(app)
app.config['SECRET_KEY'] = 'uj_wifi_secret_key'

# Direct route for the Admin Control Center
@app.route('/admin/')
def admin_dashboard():
    # This renders your UJ Root Authority file directly
    return render_template('admin.html')

@app.route('/')
def home():
    return "Backend Active. <a href='/admin/'>Access Root Authority</a>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)