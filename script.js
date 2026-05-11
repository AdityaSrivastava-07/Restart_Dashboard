/**
 * ऋStart - Learning Momentum Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Loader & Initialization ---
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    initAnimations();
  }, 1500);

  // --- 2. Sidebar & Navigation Logic ---
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const navItems = document.querySelectorAll('.nav-item');

  // Desktop Toggle
  sidebarToggle.addEventListener('click', () => {
    if (window.innerWidth > 768) {
      document.body.classList.toggle('sidebar-collapsed');
    } else {
      document.body.classList.add('sidebar-open');
    }
  });

  // Mobile Close
  const closeSidebar = () => {
    document.body.classList.remove('sidebar-open');
  };

  sidebarClose.addEventListener('click', closeSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Active Nav Item
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // --- 3. Theme Toggle ---
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);

    if (newTheme === 'light') {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }

    // Re-render charts to match theme
    initCharts(newTheme);
  });

  // --- 4. Notifications Panel ---
  const notifBtn = document.getElementById('notifBtn');
  const notifPanel = document.getElementById('notifPanel');
  const notifList = document.getElementById('notifList');

  // Mock Notifications
  const notifications = [
    { title: "Streak Saved!", desc: "You completed a lesson just in time.", time: "10m ago", read: false },
    { title: "Level Up!", desc: "You've reached Level 12. Keep it up!", time: "2h ago", read: false },
    { title: "New Course", desc: "Advanced System Design is now available.", time: "1d ago", read: true }
  ];

  function renderNotifs() {
    notifList.innerHTML = notifications.map(n => `
      <div class="notif-item ${n.read ? '' : 'unread'}">
        <div class="feed-icon achieve"><i class="fa-solid fa-bell"></i></div>
        <div class="feed-content">
          <div class="feed-text"><strong>${n.title}</strong><br>${n.desc}</div>
          <div class="feed-time">${n.time}</div>
        </div>
      </div>
    `).join('');
  }

  notifBtn.addEventListener('click', () => {
    notifPanel.classList.toggle('hidden');
    renderNotifs();
  });

  // Close notif panel on outside click
  document.addEventListener('click', (e) => {
    if (!notifBtn.contains(e.target) && !notifPanel.contains(e.target)) {
      notifPanel.classList.add('hidden');
    }
  });


  // --- 5. Data Injection (Mock Data) ---

  // Learning Heatmap
  const heatmapGrid = document.getElementById('learningHeatmap');
  if (heatmapGrid) {
    // Generate 210 cells (30 weeks * 7 days)
    for (let i = 0; i < 210; i++) {
      const rand = Math.random();
      let level = 0;
      if (rand > 0.95) level = 4;
      else if (rand > 0.85) level = 3;
      else if (rand > 0.65) level = 2;
      else if (rand > 0.4) level = 1;
      
      heatmapGrid.innerHTML += `<div class="heatmap-cell" data-level="${level}"></div>`;
    }
  }

  // Continue Learning
  const courses = [
    { title: "Advanced React Patterns", duration: "2h 15m left", progress: 75, icon: "fa-react", color: "#61dafb" },
    { title: "Data Structures & Algorithms", duration: "4h 30m left", progress: 40, icon: "fa-code", color: "#10b981" },
    { title: "System Design Fundamentals", duration: "1h 10m left", progress: 90, icon: "fa-server", color: "#a855f7" }
  ];

  const courseList = document.getElementById('courseList');
  if (courseList) {
    courses.forEach(c => {
      courseList.innerHTML += `
        <div class="course-item">
          <div class="course-thumb">
            <i class="fa-brands ${c.icon}" style="color: ${c.color}"></i>
          </div>
          <div class="course-info">
            <div class="course-title">${c.title}</div>
            <div class="course-meta">
              <span><i class="fa-regular fa-clock"></i> ${c.duration}</span>
              <span>${c.progress}% Completed</span>
            </div>
            <div class="progress-container">
              <div class="progress-bar" style="width: 0%" data-target="${c.progress}"></div>
            </div>
          </div>
        </div>
      `;
    });
  }

  // Live Activity
  const activities = [
    { text: "<strong>Alex</strong> started <em>Full Stack Roadmap</em>", time: "2m ago", type: "course", icon: "fa-rocket" },
    { text: "<strong>Sarah</strong> reached a <strong>30-day streak!</strong>", time: "15m ago", type: "streak", icon: "fa-fire" },
    { text: "<strong>You</strong> unlocked <em>Fast Learner</em> badge", time: "1h ago", type: "achieve", icon: "fa-trophy" },
    { text: "<strong>David</strong> completed <em>React Basics</em>", time: "2h ago", type: "course", icon: "fa-check" }
  ];

  const activityFeed = document.getElementById('activityFeed');
  if (activityFeed) {
    activities.forEach(a => {
      activityFeed.innerHTML += `
        <div class="feed-item">
          <div class="feed-icon ${a.type}"><i class="fa-solid ${a.icon}"></i></div>
          <div class="feed-content">
            <div class="feed-text">${a.text}</div>
            <div class="feed-time">${a.time}</div>
          </div>
        </div>
      `;
    });
  }

  // Roadmaps
  const roadmaps = [
    { title: "Full Stack Engineer", difficulty: "Intermediate", duration: "6 Months", progress: 45, icon: "fa-layer-group", color: "#3b82f6" },
    { title: "AI/ML Developer", difficulty: "Advanced", duration: "8 Months", progress: 12, icon: "fa-brain", color: "#a855f7" },
    { title: "Frontend Master", difficulty: "Beginner", duration: "3 Months", progress: 85, icon: "fa-window-maximize", color: "#f97316" },
    { title: "DevOps Engineer", difficulty: "Advanced", duration: "5 Months", progress: 0, icon: "fa-server", color: "#10b981" }
  ];

  const roadmapTrack = document.getElementById('roadmapTrack');
  if (roadmapTrack) {
    roadmaps.forEach(r => {
      roadmapTrack.innerHTML += `
        <div class="roadmap-card" style="--accent: ${r.color};">
          <div class="rm-header">
            <div class="rm-icon"><i class="fa-solid ${r.icon}"></i></div>
            <span class="rm-difficulty">${r.difficulty}</span>
          </div>
          <div class="rm-title">${r.title}</div>
          <div class="rm-meta">
            <span><i class="fa-regular fa-clock"></i> ${r.duration}</span>
          </div>
          <div class="rm-progress">
            <div class="rm-progress-text">
              <span>Overall Progress</span>
              <span>${r.progress}%</span>
            </div>
            <div class="progress-container">
              <div class="progress-bar" style="width: 0%; background: ${r.color}" data-target="${r.progress}"></div>
            </div>
          </div>
        </div>
      `;
    });
  }

  // AI Suggestions
  const suggestions = ["Explain closures", "System Design tips", "Mock Interview", "Project Ideas"];
  const aiSuggestions = document.getElementById('aiSuggestions');
  if (aiSuggestions) {
    suggestions.forEach(s => {
      aiSuggestions.innerHTML += `<button class="ai-sugg-btn">${s}</button>`;
    });
  }

  // Achievements
  const achievements = [
    { title: "7-Day Streak", desc: "Maintained momentum for a week", icon: "fa-fire", locked: false, color: "#f97316" },
    { title: "Fast Learner", desc: "Completed 3 courses in a month", icon: "fa-bolt", locked: false, color: "#eab308" },
    { title: "Consistency Master", desc: "Log in 30 days in a row", icon: "fa-calendar-check", locked: true, color: "#3b82f6" },
    { title: "Project Builder", desc: "Deploy 5 portfolio projects", icon: "fa-hammer", locked: true, color: "#10b981" }
  ];

  const achievementsGrid = document.getElementById('achievementsGrid');
  if (achievementsGrid) {
    achievements.forEach(a => {
      achievementsGrid.innerHTML += `
        <div class="achieve-badge ${a.locked ? 'locked' : ''}">
          <div class="achieve-icon" style="--accent: ${a.color}"><i class="fa-solid ${a.icon}"></i></div>
          <div class="achieve-info">
            <h4>${a.title}</h4>
            <p>${a.desc}</p>
          </div>
        </div>
      `;
    });
  }

  // --- 6. AI Chat Interaction ---
  const aiInput = document.getElementById('aiInput');
  const aiSendBtn = document.getElementById('aiSendBtn');
  const aiChatArea = document.getElementById('aiChatArea');

  if (aiInput && aiSendBtn && aiChatArea) {
    function sendAiMessage() {
      const text = aiInput.value.trim();
      if (!text) return;

      // Add user message
      aiChatArea.innerHTML += `<div class="user-msg">${text}</div>`;
      aiInput.value = '';
      aiChatArea.scrollTop = aiChatArea.scrollHeight;

      // Simulate AI thinking & response
      setTimeout(() => {
        aiChatArea.innerHTML += `
          <div class="ai-msg">
            <div class="ai-avatar-lg" style="width: 30px; height: 30px; font-size: 0.9rem;"><i class="fa-solid fa-robot"></i></div>
            <div>Processing your request about "${text}". As your AI mentor, I recommend we focus on building a small project to solidify this concept.</div>
          </div>
        `;
        aiChatArea.scrollTop = aiChatArea.scrollHeight;
      }, 1000);
    }

    aiSendBtn.addEventListener('click', sendAiMessage);
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendAiMessage();
    });

    // Click on suggestions auto-fills and sends
    document.querySelectorAll('.ai-sugg-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        aiInput.value = e.target.textContent;
        sendAiMessage();
      });
    });
  }


  // --- 7. Animations & Counters ---
  function initAnimations() {
    // Number Counters
    const counters = document.querySelectorAll('[data-target]');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');

      // If it's a progress bar, animate width instead of text
      if (counter.classList.contains('progress-bar') || counter.classList.contains('xp-fill')) {
        setTimeout(() => {
          counter.style.width = target + '%';
        }, 500);
        return;
      }

      // Otherwise animate number
      const duration = 2000;
      const step = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          // Format with commas if large number
          counter.innerText = target > 1000 ? Math.ceil(current).toLocaleString() : Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target > 1000 ? target.toLocaleString() : target;
        }
      };
      updateCounter();
    });

    // Init Charts
    initCharts('dark');
  }


  // --- 8. Chart.js Implementations ---
  let charts = [];

  function initCharts(theme) {
    // Destroy existing charts if re-rendering for theme change
    charts.forEach(c => c.destroy());
    charts = [];

    const textColor = theme === 'dark' ? '#94a3b8' : '#475569';
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

    // Common Chart Options
    Chart.defaults.color = textColor;
    Chart.defaults.font.family = "'Inter', sans-serif";

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false, drawBorder: false } },
        y: { grid: { color: gridColor, drawBorder: false }, beginAtZero: true }
      }
    };

    // 1. Learning Activity (Bar Chart)
    const ctxActivity = document.getElementById('activityChart');
    if (ctxActivity) {
      // Create gradient
      const gradient = ctxActivity.getContext('2d').createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.8)');

      charts.push(new Chart(ctxActivity, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Hours Learned',
            data: [2, 3.5, 1.5, 4, 2.5, 5, 4.5],
            backgroundColor: gradient,
            borderRadius: 6,
            borderSkipped: false
          }]
        },
        options: commonOptions
      }));
    }

    // 2. Consistency (Line Chart)
    const ctxConsistency = document.getElementById('consistencyChart');
    if (ctxConsistency) {
      const gradientLine = ctxConsistency.getContext('2d').createLinearGradient(0, 0, 0, 300);
      gradientLine.addColorStop(0, 'rgba(16, 185, 129, 0.5)'); // Emerald
      gradientLine.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

      charts.push(new Chart(ctxConsistency, {
        type: 'line',
        data: {
          labels: ['W1', 'W2', 'W3', 'W4'],
          datasets: [{
            label: 'Score',
            data: [65, 78, 70, 92],
            borderColor: '#10b981',
            backgroundColor: gradientLine,
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#050816',
            pointBorderColor: '#10b981',
            pointBorderWidth: 2,
            pointRadius: 4
          }]
        },
        options: commonOptions
      }));
    }

    // 3. Focus Score (Doughnut Chart)
    const ctxFocus = document.getElementById('focusChart');
    if (ctxFocus) {
      charts.push(new Chart(ctxFocus, {
        type: 'doughnut',
        data: {
          labels: ['Deep Work', 'Distracted'],
          datasets: [{
            data: [85, 15],
            backgroundColor: ['#f97316', 'rgba(255,255,255,0.05)'],
            borderWidth: 0,
            cutout: '80%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } }
        }
      }));
    }

    // 4. Productivity Trend (Radar Chart)
    const ctxProd = document.getElementById('productivityChart');
    if (ctxProd) {
      charts.push(new Chart(ctxProd, {
        type: 'radar',
        data: {
          labels: ['Code', 'Theory', 'Projects', 'Review', 'Quizzes'],
          datasets: [{
            label: 'Current Week',
            data: [90, 70, 85, 60, 75],
            backgroundColor: 'rgba(236, 72, 153, 0.2)', // Pink
            borderColor: '#ec4899',
            pointBackgroundColor: '#ec4899',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            r: {
              angleLines: { color: gridColor },
              grid: { color: gridColor },
              pointLabels: { color: textColor, font: { size: 10 } },
              ticks: { display: false }
            }
          }
        }
      }));
    }

    /* =========================================
       ANALYTICS PAGE CHARTS
       ========================================= */
    const ctxWeekly = document.getElementById('weeklyLearningChart');
    if (ctxWeekly) {
      const gradientBar = ctxWeekly.getContext('2d').createLinearGradient(0, 0, 0, 400);
      gradientBar.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
      gradientBar.addColorStop(1, 'rgba(168, 85, 247, 0.1)');

      charts.push(new Chart(ctxWeekly, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Hours Learned',
            data: [2.5, 3.8, 1.2, 4.5, 3.0, 5.5, 4.0],
            backgroundColor: gradientBar,
            borderRadius: 4,
            borderSkipped: false
          }]
        },
        options: commonOptions
      }));
    }

    // 2. Skill Radar Chart
    const ctxRadar = document.getElementById('skillRadarChart');
    if (ctxRadar) {
      charts.push(new Chart(ctxRadar, {
        type: 'radar',
        data: {
          labels: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Databases', 'DevOps'],
          datasets: [{
            label: 'Proficiency',
            data: [95, 85, 70, 60, 50, 30],
            backgroundColor: 'rgba(59, 130, 246, 0.2)', // Blue
            borderColor: '#3b82f6',
            pointBackgroundColor: '#3b82f6',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            r: {
              angleLines: { color: gridColor },
              grid: { color: gridColor },
              pointLabels: { color: textColor, font: { size: 10 } },
              ticks: { display: false }
            }
          }
        }
      }));
    }

    // 3. Focus Analytics Chart (Doughnut)
    const ctxFocusAnal = document.getElementById('focusAnalyticsChart');
    if (ctxFocusAnal) {
      charts.push(new Chart(ctxFocusAnal, {
        type: 'doughnut',
        data: {
          labels: ['Deep Work', 'Light Study', 'Distracted'],
          datasets: [{
            data: [65, 25, 10],
            backgroundColor: ['#f97316', '#a855f7', 'rgba(255,255,255,0.05)'],
            borderWidth: 0,
            cutout: '75%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { color: textColor } } }
        }
      }));
    }
  }

  /* =========================================
     AI MENTOR CHAT INTERACTIONS
     ========================================= */
  const chatInput = document.getElementById('mentorInputText');
  const chatSendBtn = document.getElementById('mentorSendBtnText');
  const chatMessages = document.getElementById('mentorChatMessages');

  if (chatInput && chatSendBtn && chatMessages) {
    const sendMessage = () => {
      const text = chatInput.value.trim();
      if (!text) return;

      // Add user message
      const userMsgHtml = `
        <div class="user-msg fade-in" style="display: flex; gap: 1rem; align-items: flex-start; flex-direction: row-reverse;">
          <div class="user-avatar-sm" style="width: 30px; height: 30px; border-radius: 50%; background: var(--accent-blue); display: flex; justify-content: center; align-items: center; font-size: 0.9rem; flex-shrink: 0; font-weight: 600;">
            ME
          </div>
          <div class="msg-content" style="font-size: 0.95rem; line-height: 1.6; background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: var(--radius-md); border: 1px solid rgba(59, 130, 246, 0.2);">
            <p>${text}</p>
          </div>
        </div>
      `;
      chatMessages.insertAdjacentHTML('beforeend', userMsgHtml);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate AI response
      setTimeout(() => {
        const aiMsgHtml = `
          <div class="ai-msg fade-in" style="display: flex; gap: 1rem; align-items: flex-start; background: rgba(168, 85, 247, 0.05); padding: 1rem; border-radius: var(--radius-md);">
            <div class="ai-avatar-sm" style="width: 30px; height: 30px; border-radius: 50%; background: var(--accent-purple); display: flex; justify-content: center; align-items: center; font-size: 0.9rem; flex-shrink: 0;">
              <i class="fa-solid fa-robot"></i>
            </div>
            <div class="msg-content" style="font-size: 0.95rem; line-height: 1.6;">
              <p>That's an interesting point! Since I am an AI Mentor, I can help you understand this deeper. Here is a simulated response to your message: "${text}". Would you like me to elaborate?</p>
            </div>
          </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', aiMsgHtml);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    };

    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  /* =========================================
     GENERIC BUTTON & TAB LOGIC
     ========================================= */

  // 1. Simple Toast Notification System
  const showToast = (message, type = 'success') => {
    return; // User requested to disable pop-up messages
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const color = type === 'success' ? 'var(--accent-green)' : 'var(--accent-blue)';
    toast.style.cssText = `background: var(--bg-glass); border: 1px solid ${color}; padding: 1rem; border-radius: var(--radius-md); color: white; display: flex; align-items: center; gap: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); transform: translateX(120%); transition: transform 0.3s ease-out; font-family: var(--font-body); font-size: 0.9rem; z-index: 10000;`;
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}" style="color: ${color}"></i> <span>${message}</span>`;
    
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => { toast.style.transform = 'translateX(0)'; }, 10);
    
    // Animate out
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // 2. Tab Buttons Logic
  const setupTabs = (selector) => {
    const tabs = document.querySelectorAll(selector);
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        // Find siblings
        const parent = tab.parentElement;
        parent.querySelectorAll(selector).forEach(sibling => sibling.classList.remove('active'));
        tab.classList.add('active');
        
        // Handle Pane Switching
        const targetId = tab.getAttribute('data-tab');
        if (targetId) {
          const targetPane = document.getElementById(`tab-${targetId}`);
          if (targetPane) {
            const contentContainer = targetPane.closest('.tab-content');
            if (contentContainer) {
              contentContainer.querySelectorAll('.learning-pane').forEach(pane => {
                pane.style.display = 'none';
              });
              targetPane.style.display = targetPane.id === 'tab-ai-doubt' ? 'flex' : 'block';
            }
          }
        }
        
        // Show mock toast if it's a filter tab
        if (selector === '.tf-btn') {
          showToast(`Filter applied: ${tab.innerText}`, 'info');
        }
      });
    });
  };

  setupTabs('.tab-btn');
  setupTabs('.tf-btn');
  
  // Custom click for lesson items
  document.querySelectorAll('.lesson-item').forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('locked')) {
        showToast('This lesson is currently locked.', 'info');
        return;
      }
      document.querySelectorAll('.lesson-item').forEach(sibling => sibling.classList.remove('active'));
      item.classList.add('active');
      showToast('Loading lesson video...', 'success');
    });
  });

  // Custom click for AI suggested prompts
  document.querySelectorAll('.ai-suggestions .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (document.getElementById('mentorInputText')) {
        document.getElementById('mentorInputText').value = btn.innerText;
        document.getElementById('mentorSendBtnText').click();
      } else {
        showToast(`AI Prompt selected: ${btn.innerText}`);
      }
    });
  });

  // 3. Interactive Buttons Logic
  const bindInteractiveButton = (btn) => {
    // Skip if it's a specific nav button handled elsewhere
    if (btn.id === 'sidebarToggle' || btn.id === 'sidebarClose' || btn.id === 'themeToggle' || btn.id === 'notifBtn' || btn.id === 'mentorSendBtnText' || btn.id === 'communityPostBtn' || btn.id === 'startTimerBtn' || btn.id === 'learningAiBtn' || btn.id === 'quizSubmitBtn' || btn.id === 'quizBackBtn' || btn.id === 'quizNextBtn' || btn.id === 'matchBackBtn' || btn.id === 'matchNextBtn') return;
    if (btn.classList.contains('tab-btn') || btn.classList.contains('tf-btn') || btn.parentElement.classList.contains('ai-suggestions') || btn.classList.contains('preset-btn') || btn.classList.contains('post-comment-btn')) return;

    // Prevent binding twice
    if (btn.dataset.bound) return;
    btn.dataset.bound = "true";

    btn.addEventListener('click', (e) => {
      const text = btn.innerText.trim();
      const iconHtml = btn.innerHTML;

      // Handle specific like buttons
      if (iconHtml.includes('fa-heart')) {
        const icon = btn.querySelector('.fa-heart');
        if (icon) {
          let countTextNode = Array.from(btn.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== '');
          let currentCount = countTextNode ? parseInt(countTextNode.textContent.trim()) : 0;
          if (isNaN(currentCount)) currentCount = 0;

          icon.classList.toggle('fa-regular');
          icon.classList.toggle('fa-solid');
          
          if (icon.classList.contains('fa-solid')) {
            btn.style.color = 'var(--accent-pink)';
            if (countTextNode) countTextNode.textContent = ` ${currentCount + 1}`;
            showToast('Post Liked!');
          } else {
            btn.style.color = 'var(--text-secondary)';
            if (countTextNode) countTextNode.textContent = ` ${currentCount - 1}`;
          }
        }
        return;
      }

      if (iconHtml.includes('fa-comment')) {
        const postCard = btn.closest('.post-card');
        if (postCard) {
          let commentSection = postCard.querySelector('.comments-section');
          if (!commentSection) {
            commentSection = document.createElement('div');
            commentSection.className = 'comments-section';
            commentSection.style.cssText = 'margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-glass);';
            commentSection.innerHTML = `
              <div class="comments-list" style="display:flex; flex-direction:column; gap:0.8rem; margin-bottom: 1rem;"></div>
              <div style="display:flex; gap:0.5rem;">
                <input type="text" placeholder="Write a reply..." style="flex:1; background:rgba(255,255,255,0.05); border:1px solid var(--border-glass); padding:0.4rem 0.8rem; border-radius:var(--radius-sm); color:white; outline:none; font-family:var(--font-body); font-size:0.85rem;" class="comment-input">
                <button class="btn btn-primary btn-sm post-comment-btn" style="padding:0.4rem 0.8rem;">Reply</button>
              </div>
            `;
            postCard.appendChild(commentSection);
            
            const replyBtn = commentSection.querySelector('.post-comment-btn');
            const input = commentSection.querySelector('.comment-input');
            const list = commentSection.querySelector('.comments-list');
            
            replyBtn.addEventListener('click', (ev) => {
              ev.stopPropagation();
              if (input.value.trim()) {
                const c = document.createElement('div');
                c.style.cssText = 'font-size:0.85rem; padding:0.5rem; background:rgba(255,255,255,0.02); border-radius:var(--radius-sm); border: 1px solid var(--border-glass);';
                c.innerHTML = `<div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.3rem;"><strong style="color:var(--accent-purple);">Aditya S.</strong> <span style="color:var(--text-muted); font-size:0.75rem;">Just now</span></div><p style="margin:0; color:var(--text-secondary);">${input.value}</p>`;
                list.appendChild(c);
                input.value = '';
                
                let countNode = Array.from(btn.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().includes('Replies'));
                if (countNode) {
                   const num = parseInt(countNode.textContent.trim()) || 0;
                   countNode.textContent = ` ${num + 1} Replies`;
                }
              }
            });
            input.addEventListener('keypress', (e) => {
              if (e.key === 'Enter') replyBtn.click();
            });
            input.focus();
          } else {
            commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
            if (commentSection.style.display === 'block') {
              commentSection.querySelector('.comment-input').focus();
            }
          }
        }
        return;
      }

      // Start session button on dashboard
      if (text === 'Start Session' || text === 'Pause Session') {
        if (btn.innerText.includes('Start Session')) {
          btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Session';
          btn.style.background = 'var(--accent-orange)';
          showToast('Focus session started!', 'success');
        } else {
          btn.innerHTML = '<i class="fa-solid fa-play"></i> Start Session';
          btn.style.background = 'var(--accent-blue)';
          showToast('Focus session paused.', 'info');
        }
        return;
      }

      // Checkboxes masquerading as milestones
      if (btn.classList.contains('mark-read')) {
        document.querySelectorAll('.notif-item').forEach(n => n.classList.remove('unread'));
        showToast('All notifications marked as read.');
        return;
      }

      // Generic fallback
      if (text) {
        showToast(`Action triggered: ${text}`);
      } else {
        showToast('Action successful!');
      }
    });
  };

  document.querySelectorAll('button').forEach(bindInteractiveButton);

  /* =========================================
     FOCUS TIMER LOGIC
     ========================================= */
  const timerTimeDisplay = document.getElementById('timerTime');
  const timerRing = document.getElementById('timerRing');
  const startTimerBtn = document.getElementById('startTimerBtn');
  const presetBtns = document.querySelectorAll('.preset-btn');
  
  if (timerTimeDisplay && timerRing && startTimerBtn) {
    let focusInterval;
    let totalSeconds = 30 * 60;
    let remainingSeconds = totalSeconds;
    let isRunning = false;

    const updateTimerDisplay = () => {
      const m = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
      const s = (remainingSeconds % 60).toString().padStart(2, '0');
      timerTimeDisplay.innerText = `${m}:${s}`;

      // Update ring: dashoffset from 0 to 339
      const progress = 1 - (remainingSeconds / totalSeconds);
      timerRing.style.strokeDashoffset = progress * 339;
    };

    const toggleTimer = () => {
      if (isRunning) {
        clearInterval(focusInterval);
        startTimerBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
        startTimerBtn.classList.replace('btn-warning', 'btn-primary');
      } else {
        if (remainingSeconds === 0) remainingSeconds = totalSeconds; // Reset if finished
        focusInterval = setInterval(() => {
          remainingSeconds--;
          updateTimerDisplay();
          
          if (remainingSeconds <= 0) {
            clearInterval(focusInterval);
            isRunning = false;
            startTimerBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Restart';
            startTimerBtn.classList.replace('btn-warning', 'btn-primary');
          }
        }, 1000);
        startTimerBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
        // Add class replacement safely if it has primary or other class
        if (startTimerBtn.classList.contains('btn-primary')) {
          startTimerBtn.classList.replace('btn-primary', 'btn-warning');
        }
      }
      isRunning = !isRunning;
    };

    startTimerBtn.addEventListener('click', toggleTimer);

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (isRunning) return; // Prevent changing time while running
        
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const minutes = parseInt(btn.getAttribute('data-time'));
        totalSeconds = minutes * 60;
        remainingSeconds = totalSeconds;
        updateTimerDisplay();
        startTimerBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start Focus';
      });
    });

    // Initialize display
    updateTimerDisplay();
  }

  /* =========================================
     COMMUNITY FEED LOGIC
     ========================================= */
  const commPostInput = document.getElementById('communityPostInput');
  const commPostBtn = document.getElementById('communityPostBtn');
  if (commPostInput && commPostBtn) {
    const postFeed = document.querySelector('.feed-posts');
    commPostBtn.addEventListener('click', () => {
      const text = commPostInput.value.trim();
      if (!text || !postFeed) return;
      
      const newPost = document.createElement('div');
      newPost.className = 'post-card fade-in';
      newPost.style.cssText = 'background: rgba(255,255,255,0.02); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 1rem;';
      newPost.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
          <div class="user-avatar-sm" style="background: var(--accent-purple); width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; border-radius: 50%; font-weight: 600;">AS</div>
          <div>
            <div style="font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">Aditya S. <span style="font-size: 0.65rem; color: var(--accent-orange); background: rgba(249,115,22,0.1); padding: 0.1rem 0.4rem; border-radius: 4px;">Level 12</span></div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Just now</div>
          </div>
        </div>
        <p style="font-size: 0.95rem; margin-bottom: 1rem; line-height: 1.5;">${text}</p>
        
        <div style="display: flex; gap: 1rem; border-top: 1px solid var(--border-glass); padding-top: 0.8rem;">
          <button class="btn-ghost-sm" style="color: var(--text-secondary);"><i class="fa-regular fa-heart"></i> 0</button>
          <button class="btn-ghost-sm" style="color: var(--text-secondary);"><i class="fa-regular fa-comment"></i> 0 Replies</button>
        </div>
      `;
      postFeed.insertBefore(newPost, postFeed.firstChild);
      
      // Bind interactive events to new buttons
      newPost.querySelectorAll('button').forEach(bindInteractiveButton);
      
      commPostInput.value = '';
    });
    
    commPostInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        commPostBtn.click();
      }
    });
  }

  /* =========================================
     ROADMAP DYNAMIC LOGIC
     ========================================= */
  const roadmapSelect = document.getElementById('roadmapSelect');
  if (roadmapSelect) {
    const rmTime = document.getElementById('rmTime');
    const rmProgressVal = document.getElementById('rmProgressVal');
    const rmProgressBar = document.getElementById('rmProgressBar');
    const rmAiSuggestionText = document.getElementById('rmAiSuggestionText');
    const rmAiSuggestionBtn = document.getElementById('rmAiSuggestionBtn');
    const rmMilestones = document.getElementById('rmMilestones');
    const rmGraph = document.getElementById('rmGraph');

    const roadmapData = {
      fullstack: {
        time: '6 Months',
        progress: 45,
        aiText: 'Based on your recent activity, you should focus on <strong>React Router</strong> before jumping into State Management.',
        aiBtn: 'Focus on React Router',
        milestones: `
          <li class="milestone completed"><i class="fa-solid fa-circle-check"></i> Internet Basics</li>
          <li class="milestone completed"><i class="fa-solid fa-circle-check"></i> HTML/CSS Foundation</li>
          <li class="milestone completed"><i class="fa-solid fa-circle-check"></i> JS Fundamentals</li>
          <li class="milestone active"><div class="pulse-dot"></div> React Core</li>
          <li class="milestone locked"><i class="fa-solid fa-lock"></i> Advanced React</li>
          <li class="milestone locked"><i class="fa-solid fa-lock"></i> Node.js Backend</li>
          <li class="milestone locked"><i class="fa-solid fa-lock"></i> Database Design</li>
        `,
        graph: `
          <svg class="graph-lines" width="800" height="400">
            <path d="M 100 200 L 250 200" class="path-completed" />
            <path d="M 250 200 L 400 120" class="path-completed" />
            <path d="M 250 200 L 400 280" class="path-active" />
            <path d="M 400 120 L 550 200" class="path-locked" />
            <path d="M 400 280 L 550 200" class="path-locked" />
            <path d="M 550 200 L 700 200" class="path-locked" />
          </svg>
          <div class="node completed" style="top: 180px; left: 80px;">
            <div class="node-icon"><i class="fa-brands fa-html5"></i></div>
            <span class="node-label">HTML/CSS</span>
          </div>
          <div class="node completed" style="top: 180px; left: 230px;">
            <div class="node-icon"><i class="fa-brands fa-js"></i></div>
            <span class="node-label">JavaScript</span>
          </div>
          <div class="node completed" style="top: 100px; left: 380px;">
            <div class="node-icon"><i class="fa-solid fa-server"></i></div>
            <span class="node-label">APIs & Async</span>
          </div>
          <div class="node active" style="top: 260px; left: 380px;">
            <div class="node-icon"><i class="fa-brands fa-react"></i></div>
            <span class="node-label">React</span>
            <div class="node-glow"></div>
          </div>
          <div class="node locked" style="top: 180px; left: 530px;">
            <div class="node-icon"><i class="fa-brands fa-node-js"></i></div>
            <span class="node-label">Node.js</span>
          </div>
          <div class="node locked" style="top: 180px; left: 680px;">
            <div class="node-icon"><i class="fa-solid fa-database"></i></div>
            <span class="node-label">Databases</span>
          </div>
        `
      },
      ai: {
        time: '8 Months',
        progress: 20,
        aiText: 'You are crushing Python! Dive into <strong>Numpy & Pandas</strong> to master data manipulation next.',
        aiBtn: 'Start Data Manipulation',
        milestones: `
          <li class="milestone completed"><i class="fa-solid fa-circle-check"></i> Python Basics</li>
          <li class="milestone completed"><i class="fa-solid fa-circle-check"></i> OOP in Python</li>
          <li class="milestone active"><div class="pulse-dot"></div> Data Analysis</li>
          <li class="milestone locked"><i class="fa-solid fa-lock"></i> Machine Learning Core</li>
          <li class="milestone locked"><i class="fa-solid fa-lock"></i> Neural Networks</li>
          <li class="milestone locked"><i class="fa-solid fa-lock"></i> Deep Learning</li>
        `,
        graph: `
          <svg class="graph-lines" width="800" height="400">
            <path d="M 100 200 L 250 200" class="path-completed" />
            <path d="M 250 200 L 400 200" class="path-active" />
            <path d="M 400 200 L 550 120" class="path-locked" />
            <path d="M 400 200 L 550 280" class="path-locked" />
            <path d="M 550 120 L 700 200" class="path-locked" />
            <path d="M 550 280 L 700 200" class="path-locked" />
          </svg>
          <div class="node completed" style="top: 180px; left: 80px;">
            <div class="node-icon"><i class="fa-brands fa-python"></i></div>
            <span class="node-label">Python Core</span>
          </div>
          <div class="node completed" style="top: 180px; left: 230px;">
            <div class="node-icon"><i class="fa-solid fa-cube"></i></div>
            <span class="node-label">OOP</span>
          </div>
          <div class="node active" style="top: 180px; left: 380px;">
            <div class="node-icon"><i class="fa-solid fa-table"></i></div>
            <span class="node-label">Data Analysis</span>
            <div class="node-glow"></div>
          </div>
          <div class="node locked" style="top: 100px; left: 530px;">
            <div class="node-icon"><i class="fa-solid fa-brain"></i></div>
            <span class="node-label">ML Core</span>
          </div>
          <div class="node locked" style="top: 260px; left: 530px;">
            <div class="node-icon"><i class="fa-solid fa-network-wired"></i></div>
            <span class="node-label">Neural Nets</span>
          </div>
          <div class="node locked" style="top: 180px; left: 680px;">
            <div class="node-icon"><i class="fa-solid fa-microchip"></i></div>
            <span class="node-label">Deep Learning</span>
          </div>
        `
      },
      cyber: {
        time: '7 Months',
        progress: 10,
        aiText: 'You\'ve set up your Kali Linux environment. Next up: <strong>Networking Fundamentals</strong>.',
        aiBtn: 'Learn Networking',
        milestones: `
          <li class="milestone completed"><i class="fa-solid fa-circle-check"></i> OS Basics (Linux)</li>
          <li class="milestone active"><div class="pulse-dot"></div> Networking Concepts</li>
          <li class="milestone locked"><i class="fa-solid fa-lock"></i> Scripting</li>
          <li class="milestone locked"><i class="fa-solid fa-lock"></i> Web Vulnerabilities</li>
          <li class="milestone locked"><i class="fa-solid fa-lock"></i> Penetration Testing</li>
        `,
        graph: `
          <svg class="graph-lines" width="800" height="400">
            <path d="M 100 200 L 250 200" class="path-completed" />
            <path d="M 250 200 L 400 200" class="path-active" />
            <path d="M 400 200 L 550 200" class="path-locked" />
            <path d="M 550 200 L 700 200" class="path-locked" />
          </svg>
          <div class="node completed" style="top: 180px; left: 80px;">
            <div class="node-icon"><i class="fa-brands fa-linux"></i></div>
            <span class="node-label">Linux Basics</span>
          </div>
          <div class="node active" style="top: 180px; left: 230px;">
            <div class="node-icon"><i class="fa-solid fa-network-wired"></i></div>
            <span class="node-label">Networking</span>
            <div class="node-glow"></div>
          </div>
          <div class="node locked" style="top: 180px; left: 380px;">
            <div class="node-icon"><i class="fa-solid fa-code"></i></div>
            <span class="node-label">Scripting</span>
          </div>
          <div class="node locked" style="top: 180px; left: 530px;">
            <div class="node-icon"><i class="fa-solid fa-bug"></i></div>
            <span class="node-label">Web Vulns</span>
          </div>
          <div class="node locked" style="top: 180px; left: 680px;">
            <div class="node-icon"><i class="fa-solid fa-shield-halved"></i></div>
            <span class="node-label">Pen Testing</span>
          </div>
        `
      },
      devops: {
        time: '5 Months',
        progress: 60,
        aiText: 'Docker and CI/CD mastered! Time to tackle <strong>Kubernetes Orchestration</strong>.',
        aiBtn: 'Master Kubernetes',
        milestones: `
          <li class="milestone completed"><i class="fa-solid fa-circle-check"></i> Linux/Scripting</li>
          <li class="milestone completed"><i class="fa-solid fa-circle-check"></i> Git & Version Control</li>
          <li class="milestone completed"><i class="fa-solid fa-circle-check"></i> Docker Containers</li>
          <li class="milestone completed"><i class="fa-solid fa-circle-check"></i> CI/CD Pipelines</li>
          <li class="milestone active"><div class="pulse-dot"></div> Kubernetes</li>
          <li class="milestone locked"><i class="fa-solid fa-lock"></i> Cloud Providers (AWS/GCP)</li>
          <li class="milestone locked"><i class="fa-solid fa-lock"></i> Infrastructure as Code</li>
        `,
        graph: `
          <svg class="graph-lines" width="800" height="400">
            <path d="M 100 200 L 250 120" class="path-completed" />
            <path d="M 100 200 L 250 280" class="path-completed" />
            <path d="M 250 120 L 400 200" class="path-active" />
            <path d="M 250 280 L 400 200" class="path-active" />
            <path d="M 400 200 L 550 120" class="path-locked" />
            <path d="M 400 200 L 550 280" class="path-locked" />
          </svg>
          <div class="node completed" style="top: 180px; left: 80px;">
            <div class="node-icon"><i class="fa-brands fa-linux"></i></div>
            <span class="node-label">Linux/Git</span>
          </div>
          <div class="node completed" style="top: 100px; left: 230px;">
            <div class="node-icon"><i class="fa-brands fa-docker"></i></div>
            <span class="node-label">Docker</span>
          </div>
          <div class="node completed" style="top: 260px; left: 230px;">
            <div class="node-icon"><i class="fa-solid fa-code-branch"></i></div>
            <span class="node-label">CI/CD</span>
          </div>
          <div class="node active" style="top: 180px; left: 380px;">
            <div class="node-icon"><i class="fa-solid fa-dharmachakra"></i></div>
            <span class="node-label">Kubernetes</span>
            <div class="node-glow"></div>
          </div>
          <div class="node locked" style="top: 100px; left: 530px;">
            <div class="node-icon"><i class="fa-brands fa-aws"></i></div>
            <span class="node-label">Cloud (AWS)</span>
          </div>
          <div class="node locked" style="top: 260px; left: 530px;">
            <div class="node-icon"><i class="fa-solid fa-cubes"></i></div>
            <span class="node-label">IaC</span>
          </div>
        `
      }
    };

    roadmapSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      const data = roadmapData[val];
      if (data) {
        rmTime.innerText = data.time;
        rmProgressVal.innerText = data.progress + '%';
        rmProgressBar.style.width = data.progress + '%';
        rmAiSuggestionText.innerHTML = data.aiText;
        rmAiSuggestionBtn.innerText = data.aiBtn;
        
        // Add fade animation
        [rmMilestones, rmGraph].forEach(el => {
          el.style.opacity = '0';
          setTimeout(() => {
            if (el === rmMilestones) el.innerHTML = data.milestones;
            if (el === rmGraph) el.innerHTML = data.graph;
            el.style.opacity = '1';
            el.style.transition = 'opacity 0.3s ease';
          }, 300);
        });
      }
    });
  }

  /* =========================================
     LEARNING PAGE AI ASSISTANT LOGIC
     ========================================= */
  const learningAiInput = document.getElementById('learningAiInput');
  const learningAiBtn = document.getElementById('learningAiBtn');
  if (learningAiInput && learningAiBtn) {
    const aiChat = document.getElementById('learningAiChat');
    
    const sendAiMessage = () => {
      const text = learningAiInput.value.trim();
      if (!text || !aiChat) return;

      // Append user message
      const userMsg = document.createElement('div');
      userMsg.style.cssText = 'display: flex; gap: 0.8rem; margin-bottom: 1rem; flex-direction: row-reverse;';
      userMsg.innerHTML = `
        <div style="width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold;">AS</div>
        <div style="background: rgba(255,255,255,0.05); padding: 0.8rem; border-radius: var(--radius-sm) 0 var(--radius-sm) var(--radius-sm); font-size: 0.9rem;">${text}</div>
      `;
      aiChat.appendChild(userMsg);
      learningAiInput.value = '';
      aiChat.scrollTop = aiChat.scrollHeight;

      // Mock AI response
      setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.style.cssText = 'display: flex; gap: 0.8rem; margin-bottom: 1rem;';
        aiMsg.innerHTML = `
          <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--accent-purple); display: flex; align-items: center; justify-content: center; font-size: 0.7rem;"><i class="fa-solid fa-robot"></i></div>
          <div style="background: rgba(168, 85, 247, 0.1); padding: 0.8rem; border-radius: 0 var(--radius-sm) var(--radius-sm) var(--radius-sm); font-size: 0.9rem;">I'd be happy to help with that! In React, \`useEffect\` is used for side effects like fetching data or subscribing to events. Make sure to include your dependencies in the array!</div>
        `;
        aiChat.appendChild(aiMsg);
        aiChat.scrollTop = aiChat.scrollHeight;
      }, 1000);
    };

    learningAiBtn.addEventListener('click', sendAiMessage);
    learningAiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendAiMessage();
      }
    });
  }

  /* =========================================
     LEARNING PAGE QUIZ LOGIC
     ========================================= */
  let currentQuizQ = 1;
  const totalQuizQ = 10;
  const quizSubmitBtn = document.getElementById('quizSubmitBtn');
  const quizBackBtn = document.getElementById('quizBackBtn');
  const quizNextBtn = document.getElementById('quizNextBtn');
  const quizCurrentQText = document.getElementById('quizCurrentQ');
  
  const updateQuizUI = () => {
    // Show correct question
    document.querySelectorAll('.quiz-question').forEach(q => {
      if (parseInt(q.getAttribute('data-q')) === currentQuizQ) {
        q.style.display = 'block';
        q.classList.add('active-q');
      } else {
        q.style.display = 'none';
        q.classList.remove('active-q');
      }
    });
    
    // Update text
    if (quizCurrentQText) quizCurrentQText.innerText = currentQuizQ;
    
    // Update button states
    if (quizBackBtn) quizBackBtn.disabled = currentQuizQ === 1;
    if (quizNextBtn) quizNextBtn.disabled = currentQuizQ === totalQuizQ;
  };

  if (quizBackBtn) {
    quizBackBtn.addEventListener('click', () => {
      if (currentQuizQ > 1) {
        currentQuizQ--;
        updateQuizUI();
      }
    });
  }

  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      if (currentQuizQ < totalQuizQ) {
        currentQuizQ++;
        updateQuizUI();
      }
    });
  }

  if (quizSubmitBtn) {
    quizSubmitBtn.addEventListener('click', () => {
      const activeQ = document.querySelector('.quiz-question.active-q');
      if (!activeQ) return;
      
      const selected = activeQ.querySelector('input[type="radio"]:checked');
      if (!selected) {
        showToast('Please select an answer first.', 'info');
        return;
      }
      
      // Clear previous styles
      activeQ.querySelectorAll('.quiz-label').forEach(label => {
        label.style.borderColor = 'transparent';
      });

      const parentLabel = selected.closest('.quiz-label');
      if (selected.value === 'correct') {
        parentLabel.style.borderColor = 'var(--accent-green)';
        showToast('Correct! Great job.', 'success');
      } else {
        parentLabel.style.borderColor = 'var(--accent-orange)';
        showToast('Incorrect. Review the lesson material and try again.', 'info');
      }
    });
  }

  /* =========================================
     LEARNING PAGE MATCH LOGIC
     ========================================= */
  let currentMatchQ = 1;
  const totalMatchQ = 5;
  const matchBackBtn = document.getElementById('matchBackBtn');
  const matchNextBtn = document.getElementById('matchNextBtn');
  const matchCurrentQText = document.getElementById('matchCurrentQ');
  const matchScoreEl = document.getElementById('matchScore');
  let selectedMatchHook = null;

  // Track scores per match block
  const matchScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  const updateMatchUI = () => {
    // Show correct question
    document.querySelectorAll('.match-question').forEach(q => {
      if (parseInt(q.getAttribute('data-m')) === currentMatchQ) {
        q.style.display = 'block';
        q.classList.add('active-m');
      } else {
        q.style.display = 'none';
        q.classList.remove('active-m');
      }
    });
    
    // Update text and score for current block
    if (matchCurrentQText) matchCurrentQText.innerText = currentMatchQ;
    if (matchScoreEl) matchScoreEl.innerText = `${matchScores[currentMatchQ]}/3`;
    
    // Update button states
    if (matchBackBtn) matchBackBtn.disabled = currentMatchQ === 1;
    if (matchNextBtn) matchNextBtn.disabled = currentMatchQ === totalMatchQ;
    
    // Reset selection
    selectedMatchHook = null;
    document.querySelectorAll('.match-hook:not(.matched)').forEach(h => {
      h.style.borderColor = 'var(--border-glass)';
    });
  };

  if (matchBackBtn) {
    matchBackBtn.addEventListener('click', () => {
      if (currentMatchQ > 1) {
        currentMatchQ--;
        updateMatchUI();
      }
    });
  }

  if (matchNextBtn) {
    matchNextBtn.addEventListener('click', () => {
      if (currentMatchQ < totalMatchQ) {
        currentMatchQ++;
        updateMatchUI();
      }
    });
  }

  const matchHooks = document.querySelectorAll('.match-hook');
  const matchDescs = document.querySelectorAll('.match-desc');

  if (matchHooks.length > 0) {
    matchHooks.forEach(hook => {
      hook.addEventListener('click', () => {
        // Only allow clicking in the active block
        if (!hook.closest('.match-question.active-m')) return;
        if (hook.classList.contains('matched')) return;
        
        // Deselect others in THIS block
        const activeBlock = hook.closest('.match-question');
        activeBlock.querySelectorAll('.match-hook').forEach(h => {
          if (!h.classList.contains('matched')) h.style.borderColor = 'var(--border-glass)';
        });
        
        selectedMatchHook = hook;
        hook.style.borderColor = 'var(--accent-blue)';
      });
    });

    matchDescs.forEach(desc => {
      desc.addEventListener('click', () => {
        // Only allow clicking in the active block
        if (!desc.closest('.match-question.active-m')) return;
        if (desc.classList.contains('matched')) return;
        
        if (!selectedMatchHook) {
          showToast('Select an item on the left first!', 'info');
          return;
        }

        const hookKey = selectedMatchHook.getAttribute('data-match');
        const descKey = desc.getAttribute('data-match');

        if (hookKey === descKey) {
          // Success
          selectedMatchHook.classList.add('matched');
          desc.classList.add('matched');
          
          selectedMatchHook.style.borderColor = 'var(--accent-green)';
          desc.style.borderColor = 'var(--accent-green)';
          selectedMatchHook.style.background = 'rgba(16, 185, 129, 0.1)';
          desc.style.background = 'rgba(16, 185, 129, 0.1)';
          
          matchScores[currentMatchQ]++;
          if (matchScoreEl) matchScoreEl.innerText = `${matchScores[currentMatchQ]}/3`;
          showToast('Perfect match!', 'success');
          
          selectedMatchHook = null;
        } else {
          // Failure
          selectedMatchHook.style.borderColor = 'var(--accent-orange)';
          desc.style.borderColor = 'var(--accent-orange)';
          showToast('Not quite! Try again.', 'info');
          
          const storedHook = selectedMatchHook;
          setTimeout(() => {
            if (storedHook && !storedHook.classList.contains('matched')) {
              storedHook.style.borderColor = 'var(--border-glass)';
            }
            if (!desc.classList.contains('matched')) {
              desc.style.borderColor = 'var(--border-glass)';
            }
          }, 1000);
          
          selectedMatchHook = null;
        }
      });
    });
  }

});
