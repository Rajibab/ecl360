import React, { useState } from 'react';
import { 
  CheckSquare, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  User, 
  Calendar, 
  Paperclip, 
  Check, 
  AlertCircle, 
  X
} from 'lucide-react';

export default function TaskManagement({ tasks, setTasks, showToast }) {
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAssignee, setNewAssignee] = useState('John Doe (You)');
  const [newPriority, setNewPriority] = useState('medium');
  const [newDueDate, setNewDueDate] = useState('');

  // Column definitions
  const columns = [
    { key: 'todo', label: 'To Do', dotClass: 'todo' },
    { key: 'inprogress', label: 'In Progress', dotClass: 'inprogress' },
    { key: 'onhold', label: 'On Hold', dotClass: 'on-hold' },
    { key: 'completed', label: 'Completed', dotClass: 'completed' },
  ];

  // Stats counters
  const totalCount = tasks.length;
  const inprogressCount = tasks.filter(t => t.status === 'inprogress').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const onholdCount = tasks.filter(t => t.status === 'onhold').length;

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTitle('');
    setNewAssignee('John Doe (You)');
    setNewPriority('medium');
    setNewDueDate('');
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle || !newDueDate) return;

    const dateObj = new Date(newDueDate);
    const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const newTask = {
      id: 't_' + (tasks.length + 1),
      title: newTitle,
      assignee: newAssignee,
      priority: newPriority,
      dueDate: dateStr,
      status: 'todo',
      progress: 0,
      attachments: 0,
    };

    setTasks([...tasks, newTask]);
    showToast('success', 'Task Created', `"${newTitle}" added to To Do list.`);
    handleCloseModal();
  };

  const handleDeleteTask = (taskId, title, e) => {
    e.stopPropagation(); // Avoid triggering card movement
    setTasks(tasks.filter(t => t.id !== taskId));
    showToast('info', 'Task Deleted', `The task "${title}" has been removed.`);
  };

  // Move task to next state when clicked
  const handleMoveTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        let nextStatus = 'todo';
        let progress = 0;
        let priority = task.priority;
        let dueDate = task.dueDate;

        if (task.status === 'todo') {
          nextStatus = 'inprogress';
          progress = 30;
          showToast('info', 'Task Started', `"${task.title}" is now In Progress.`);
        } else if (task.status === 'inprogress') {
          nextStatus = 'completed';
          progress = 100;
          priority = 'done';
          dueDate = `Closed ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
          showToast('success', 'Task Completed!', `Great job closing "${task.title}".`);
        } else if (task.status === 'completed') {
          nextStatus = 'todo';
          progress = 0;
          priority = 'medium';
          dueDate = 'Recycled';
          showToast('info', 'Task Recycled', `"${task.title}" has been sent back to To Do.`);
        } else if (task.status === 'onhold') {
          nextStatus = 'todo';
          progress = 0;
          showToast('info', 'Task Resumed', `"${task.title}" was moved back to To Do.`);
        }

        return {
          ...task,
          status: nextStatus,
          progress,
          priority,
          dueDate,
          holdReason: undefined
        };
      }
      return task;
    }));
  };

  return (
    <div className="tasks-content" id="page-tasks">
      <div className="page-header">
        <div>
          <h1 className="page-title">Task Management</h1>
          <p className="page-subtitle">Manage operations, safety audits, and project tasks using Kanban board</p>
        </div>
      </div>

      {/* Task Stats Row using standard class */}
      <div className="cards-row-4" style={{ margin: '1.5rem 0 2rem' }}>
        <div className="card stat-card blue-stat">
          <div className="stat-icon-wrap blue"><CheckSquare className="icon-md" /></div>
          <div className="stat-info">
            <p className="stat-label">Total Assigned</p>
            <h2 className="stat-value" id="taskStatTotal">{totalCount}</h2>
            <p className="stat-sub">Tasks in board</p>
          </div>
        </div>
        <div className="card stat-card orange-stat">
          <div className="stat-icon-wrap orange"><Play className="icon-md" /></div>
          <div className="stat-info">
            <p className="stat-label">Active Work</p>
            <h2 className="stat-value" id="taskStatInProgress">{inprogressCount}</h2>
            <p className="stat-sub">In progress status</p>
          </div>
        </div>
        <div className="card stat-card green-stat">
          <div className="stat-icon-wrap green"><CheckCircle2 className="icon-md" /></div>
          <div className="stat-info">
            <p className="stat-label">Completed</p>
            <h2 className="stat-value" id="taskStatCompleted">{completedCount}</h2>
            <p className="stat-sub">Archived tasks</p>
          </div>
        </div>
        <div className="card stat-card" style={{ borderTop: '3px solid var(--purple)' }}>
          <div className="stat-icon-wrap" style={{ background: 'rgba(139,92,246,0.1)', color: 'var(--purple)' }}>
            <AlertTriangle className="icon-md" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Blocked / Hold</p>
            <h2 className="stat-value" id="taskStatOnHold">{onholdCount}</h2>
            <p className="stat-sub">Awaiting approvals</p>
          </div>
        </div>
      </div>

      {/* Kanban Board Layout controlled by CSS */}
      <div className="task-kanban full-kanban" style={{ alignItems: 'start' }}>
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.key);

          return (
            <div key={col.key} className="task-column" data-status={col.key}>
              <div className="task-col-header">
                <div className="col-title-wrap">
                  <span className={`col-dot ${col.dotClass}`}></span>
                  <h3 className="col-title">{col.label}</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="col-count" id={`${col.key}Count`}>
                    {colTasks.length}
                  </span>
                  {col.key === 'todo' && (
                    <button 
                      className="col-add-btn" 
                      onClick={handleOpenModal} 
                      aria-label="Add task"
                    >
                      <Plus className="icon-xs" />
                    </button>
                  )}
                </div>
              </div>

              <div className="task-cards-list" id={`${col.key}CardsList`}>
                {colTasks.map(task => {
                  const isDone = task.status === 'completed';
                  const isProgress = task.status === 'inprogress';
                  const isHold = task.status === 'onhold';

                  return (
                    <div 
                      key={task.id} 
                      className={`task-card ${isProgress ? 'active-task' : ''} ${isDone ? 'done-task' : ''} ${isHold ? 'hold-task' : ''}`}
                      onClick={() => handleMoveTask(task.id)}
                      data-task-id={task.id}
                    >
                      <div className="task-card-top">
                        <span className={`priority-badge ${task.priority}`}>
                          {task.priority === 'done' ? 'Done' : task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        <button 
                          className="task-menu-btn" 
                          onClick={(e) => handleDeleteTask(task.id, task.title, e)} 
                          title="Delete task"
                        >
                          <Trash2 className="icon-xs" />
                        </button>
                      </div>

                      <h4 className={`task-title ${isDone ? 'done-text' : ''}`}>{task.title}</h4>
                      
                      <p className="task-assigned">
                        <User className="icon-xs" style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '2px' }} /> {task.assignee}
                      </p>

                      {isHold && task.holdReason && (
                        <div className="task-hold-reason">
                          <AlertCircle className="icon-xs" /> {task.holdReason}
                        </div>
                      )}

                      {task.progress > 0 && (
                        <div style={{ marginBottom: '8px' }}>
                          <div className="task-progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ 
                                width: `${task.progress}%`, 
                                background: isDone ? 'var(--emerald)' : isHold ? 'var(--purple)' : '' 
                              }}
                            ></div>
                          </div>
                          <p className="task-progress-text">{task.progress}% Complete</p>
                        </div>
                      )}

                      <div className="task-card-footer">
                        <span className={`task-due ${isDone ? 'done-text' : ''}`}>
                          {isDone ? <Check className="icon-xs done-check" /> : <Calendar className="icon-xs" />}
                          {task.dueDate}
                        </span>
                        {task.attachments > 0 && (
                          <span className="task-attach">
                            <Paperclip className="icon-xs" /> {task.attachments}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div id="addTaskModal" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="card" style={{ width: '420px', padding: '1.5rem', background: 'var(--color-surface)', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
            <div className="card-header" style={{ marginBottom: '1.25rem', display: 'flex', justifyBetween: 'space-between', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="card-title">Add New Task</h2>
              <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-4)' }}>
                <X className="icon-sm" />
              </button>
            </div>
            <form id="addTaskForm" className="leave-form" onSubmit={handleCreateTask}>
              <div className="form-group">
                <label className="form-label">Task Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  required 
                  placeholder="e.g. Prepare Safety Audit Slides" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Assignee</label>
                <select 
                  className="form-input" 
                  value={newAssignee} 
                  onChange={(e) => setNewAssignee(e.target.value)}
                >
                  <option value="John Doe (You)">John Doe (You)</option>
                  <option value="Amit Kumar">Amit Kumar</option>
                  <option value="Priya Sharma">Priya Sharma</option>
                  <option value="Vikram Malhotra">Vikram Malhotra</option>
                  <option value="Sunita Rao">Sunita Rao</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select 
                    className="form-input" 
                    value={newPriority} 
                    onChange={(e) => setNewPriority(e.target.value)}
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={newDueDate} 
                    onChange={(e) => setNewDueDate(e.target.value)} 
                    required 
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Create Task</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
