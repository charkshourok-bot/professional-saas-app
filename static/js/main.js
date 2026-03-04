<!-- templates/dashboard.html -->
{% extends "base.html" %}

{% block content %}
<div class="dashboard">
    <aside class="sidebar">
        <div class="sidebar-brand">
            <i class="fas fa-layer-group"></i>
            <span>TaskFlow</span>
        </div>
        <nav class="sidebar-nav">
            <a href="#" class="active"><i class="fas fa-home"></i> Dashboard</a>
            <a href="#"><i class="fas fa-tasks"></i> My Tasks</a>
            <a href="#"><i class="fas fa-project-diagram"></i> Projects</a>
            <a href="#"><i class="fas fa-chart-bar"></i> Analytics</a>
            <a href="#"><i class="fas fa-users"></i> Team</a>
            <a href="#"><i class="fas fa-cog"></i> Settings</a>
        </nav>
        <div class="sidebar-bottom">
            <a href="{{ url_for('logout') }}" class="logout-btn">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        </div>
    </aside>
    
    <main class="main-content">
        <header class="dashboard-header">
            <div class="search-bar">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search tasks, projects...">
            </div>
            <div class="header-actions">
                <button class="btn btn-icon"><i class="fas fa-bell"></i></button>
                <div class="user-menu">
                    <div class="user-avatar">{{ user[0] | upper }}</div>
                    <span>{{ user }}</span>
                </div>
            </div>
        </header>
        
        <div class="dashboard-body">
            <div class="page-header">
                <h1>Dashboard</h1>
                <button class="btn btn-primary" onclick="openModal()">
                    <i class="fas fa-plus"></i> New Task
                </button>
            </div>
            
            <div class="stats-row">
                <div class="stat-card">
                    <div class="stat-icon blue"><i class="fas fa-clock"></i></div>
                    <div class="stat-info">
                        <span class="stat-value">12</span>
                        <span class="stat-label">Pending Tasks</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon green"><i class="fas fa-check-circle"></i></div>
                    <div class="stat-info">
                        <span class="stat-value">48</span>
                        <span class="stat-label">Completed</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon purple"><i class="fas fa-fire"></i></div>
                    <div class="stat-info">
                        <span class="stat-value">85%</span>
                        <span class="stat-label">Productivity</span>
                    </div>
                </div>
            </div>
            
            <div class="tasks-section">
                <div class="section-header">
                    <h2>Recent Tasks</h2>
                    <div class="filter-tabs">
                        <button class="active">All</button>
                        <button>Pending</button>
                        <button>Completed</button>
                    </div>
                </div>
                
                <div class="tasks-list">
                    {% for task in tasks %}
                    <div class="task-item {{ task.status }}">
                        <div class="task-checkbox">
                            <input type="checkbox" {% if task.status == 'completed' %}checked{% endif %}>
                        </div>
                        <div class="task-content">
                            <h4>{{ task.title }}</h4>
                            <span class="task-date"><i class="fas fa-calendar"></i> {{ task.date }}</span>
                        </div>
                        <div class="task-meta">
                            <span class="badge badge-{{ task.priority }}">{{ task.priority }}</span>
                            <button class="btn btn-icon"><i class="fas fa-ellipsis-v"></i></button>
                        </div>
                    </div>
                    {% endfor %}
                </div>
            </div>
        </div>
    </main>
</div>

<div id="taskModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Create New Task</h3>
            <button class="btn btn-icon" onclick="closeModal()"><i class="fas fa-times"></i></button>
        </div>
        <form class="modal-form">
            <div class="form-group">
                <label>Task Title</label>
                <input type="text" placeholder="What needs to be done?">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Priority</label>
                    <select>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Due Date</label>
                    <input type="date">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea rows="3" placeholder="Add details..."></textarea>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Create Task</button>
            </div>
        </form>
    </div>
</div>
{% endblock %}