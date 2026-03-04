# app.py - الملف الرئيسي
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from functools import wraps
import json
import os
from datetime import datetime
import uuid

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this-in-production'

# بيانات وهمية لعرض الموقع
DEMO_DATA = {
    'users': 15420,
    'revenue_monthly': 12500,
    'growth_rate': 34,
    'tasks_completed': 892000
}

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    return render_template('index.html', stats=DEMO_DATA)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['user_id'] = str(uuid.uuid4())
        session['user_email'] = request.form.get('email', 'demo@example.com')
        return redirect(url_for('dashboard'))
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        session['user_id'] = str(uuid.uuid4())
        session['user_email'] = request.form.get('email')
        return redirect(url_for('dashboard'))
    return render_template('register.html')

@app.route('/dashboard')
@login_required
def dashboard():
    tasks = [
        {'id': 1, 'title': 'Complete project proposal', 'status': 'pending', 'priority': 'high', 'date': '2024-03-05'},
        {'id': 2, 'title': 'Review team performance', 'status': 'completed', 'priority': 'medium', 'date': '2024-03-04'},
        {'id': 3, 'title': 'Client meeting preparation', 'status': 'in_progress', 'priority': 'high', 'date': '2024-03-06'},
        {'id': 4, 'title': 'Update documentation', 'status': 'pending', 'priority': 'low', 'date': '2024-03-07'},
    ]
    return render_template('dashboard.html', tasks=tasks, user=session.get('user_email'))

@app.route('/api/tasks', methods=['GET', 'POST'])
@login_required
def api_tasks():
    if request.method == 'POST':
        data = request.get_json()
        return jsonify({'success': True, 'task': data, 'id': str(uuid.uuid4())})
    return jsonify({'tasks': []})

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)