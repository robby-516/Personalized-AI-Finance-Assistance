(function() {
    const DOM = {
      // Counters
      incomeCounter: null,
      expenseCounter: null,
      balanceCounter: null,
      balanceTrend: null,
      
      // Charts
      categoryChart: null,
      trendChart: null,
      
      // Transaction elements
      transactionList: null,
      transactionForm: null,
      transactionModal: null,
      
      // Filters
      dateFilter: null,
      categoryFilter: null,
      activeFiltersContainer: null,
      
      // FAB elements
      fabButton: null,
      fabOptions: null,
      
      // Message system
      messageForm: null,
      messageInput: null,
      messageList: null,
      
      // Initialize all references
      init() {
        this.incomeCounter = document.getElementById('income-counter');
        this.expenseCounter = document.getElementById('expense-counter');
        this.balanceCounter = document.getElementById('balance-counter');
        this.balanceTrend = document.getElementById('balance-trend');
        
        this.categoryChart = document.getElementById('categoryChart');
        this.trendChart = document.getElementById('trendChart');
        
        this.transactionList = document.getElementById('transaction-list');
        this.transactionForm = document.getElementById('add-transaction-form');
        this.transactionModal = document.getElementById('add-transaction-modal');
        
        this.dateFilter = document.getElementById('date-filter');
        this.categoryFilter = document.getElementById('category-filter');
        this.activeFiltersContainer = document.getElementById('activeFilters');
        
        this.fabButton = document.getElementById('fabButton');
        this.fabOptions = document.getElementById('fabOptions');
        
        this.messageForm = document.getElementById('message-form');
        this.messageInput = document.getElementById('message-input');
        this.messageList = document.getElementById('message-list');
      }
    };

    const ThemeManager = {
      init() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('dashboard-theme');
        
        if (savedTheme) {
          this.setTheme(savedTheme);
        } else if (prefersDark) {
          this.setTheme('dark');
        }
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
          themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
          });
        }
      },
      
      setTheme(theme) {
        if (theme === 'dark') {
          document.body.classList.add('dark-theme');
          localStorage.setItem('dashboard-theme', 'dark');
        } else {
          document.body.classList.remove('dark-theme');
          localStorage.setItem('dashboard-theme', 'light');
        }
        
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
          themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
      }
    };

    const AnimationManager = {
      animateCounter(element, targetValue, duration = 1000) {
        if (!element) return Promise.resolve();
        
        return new Promise(resolve => {
          const value = parseFloat(targetValue.toString().replace('₹', '').replace(/,/g, ''));
          const startTime = performance.now();
          const startValue = 0;
          
          const updateCounter = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeProgress = 1 - Math.pow(1 - progress, 2);
            const currentValue = Math.floor(startValue + (easeProgress * (value - startValue)));
            
            element.textContent = '₹' + currentValue.toLocaleString();
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              resolve();
            }
          };
          
          requestAnimationFrame(updateCounter);
        });
      },
      
      fadeIn(element, duration = 300) {
        if (!element) return;
        
        element.style.opacity = '0';
        element.style.display = 'block';
        
        const startTime = performance.now();
        
        const animate = (timestamp) => {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          element.style.opacity = progress.toString();
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      },
      
      fadeOut(element, duration = 300) {
        if (!element) return Promise.resolve();
        
        return new Promise(resolve => {
          const startOpacity = parseFloat(getComputedStyle(element).opacity);
          const startTime = performance.now();
          
          const animate = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = (startOpacity * (1 - progress)).toString();
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              element.style.display = 'none';
              resolve();
            }
          };
          
          requestAnimationFrame(animate);
        });
      }
    };

    const FilterManager = {
      activeFilters: {
        date: null,
        category: null,
        search: null
      },
      init() {
        this.setupFilterListeners();
        this.updateActiveFiltersDisplay();
      },
      
      setupFilterListeners() {
        if (DOM.dateFilter) {
          DOM.dateFilter.addEventListener('change', () => {
            this.activeFilters.date = DOM.dateFilter.value;
            this.applyFilters();
          });
        }
        
        if (DOM.categoryFilter) {
          DOM.categoryFilter.addEventListener('change', () => {
            this.activeFilters.category = DOM.categoryFilter.value;
            this.applyFilters();
          });
        }
        
        const searchInput = document.querySelector('input[name="search"]');
        if (searchInput) {
          let searchTimeout;
          searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
              this.activeFilters.search = searchInput.value.trim();
              this.applyFilters();
            }, 300);
          });
        }
        
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
          clearFiltersBtn.addEventListener('click', this.clearAllFilters.bind(this));
        }
      },
      
      applyFilters() {
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
          loadingIndicator.classList.remove('d-none');
        }
        
        TransactionManager.renderTransactions(this.activeFilters.category);
        
        DashboardManager.updateDashboardData(this.activeFilters.date, this.activeFilters.category);
        
        this.updateActiveFiltersDisplay();
        
        setTimeout(() => {
          if (loadingIndicator) {
            loadingIndicator.classList.add('d-none');
          }
        }, 400);
      },
      
      updateActiveFiltersDisplay() {
        if (!DOM.activeFiltersContainer) return;
        
        DOM.activeFiltersContainer.innerHTML = '';
        
        let hasActiveFilters = false;
        
        if (this.activeFilters.date) {
          this.createFilterPill('Date', this.formatFilterValue(this.activeFilters.date), 'date');
          hasActiveFilters = true;
        }
        
        if (this.activeFilters.category && this.activeFilters.category !== 'all') {
          this.createFilterPill('Category', this.formatFilterValue(this.activeFilters.category), 'category');
          hasActiveFilters = true;
        }
        
        if (this.activeFilters.search) {
          this.createFilterPill('Search', this.activeFilters.search, 'search');
          hasActiveFilters = true;
        }
        
        if (hasActiveFilters) {
          DOM.activeFiltersContainer.prepend(this.createElement('span', 'Active filters: ', 'me-2 fw-bold'));
          
          if (!document.getElementById('clear-filters')) {
            const clearBtn = this.createElement('button', 'Clear All', 'btn btn-sm btn-outline-secondary ms-2');
            clearBtn.id = 'clear-filters';
            clearBtn.addEventListener('click', this.clearAllFilters.bind(this));
            DOM.activeFiltersContainer.appendChild(clearBtn);
          }
        }
      },
      
      createFilterPill(label, value, param) {
        if (!DOM.activeFiltersContainer) return;
        
        const pill = this.createElement('span', '', 'badge bg-primary rounded-pill me-2 mb-2 p-2');
        
        pill.innerHTML = `${label}: ${value} <i class="fas fa-times-circle ms-1" style="cursor:pointer;" aria-label="Remove ${label} filter"></i>`;
        
        pill.querySelector('i').addEventListener('click', () => {
          this.activeFilters[param] = null;
          
          if (param === 'date' && DOM.dateFilter) {
            DOM.dateFilter.value = '';
          } else if (param === 'category' && DOM.categoryFilter) {
            DOM.categoryFilter.value = 'all';
          } else if (param === 'search') {
            const searchInput = document.querySelector('input[name="search"]');
            if (searchInput) searchInput.value = '';
          }
          
          this.applyFilters();
        });
        
        DOM.activeFiltersContainer.appendChild(pill);
      },
      
      clearAllFilters() {
        this.activeFilters = {
          date: null,
          category: null,
          search: null
        };
        
        if (DOM.dateFilter) DOM.dateFilter.value = '';
        if (DOM.categoryFilter) DOM.categoryFilter.value = 'all';
        
        const searchInput = document.querySelector('input[name="search"]');
        if (searchInput) searchInput.value = '';
        
        this.applyFilters();
      },
      
      formatFilterValue(value) {
        switch(value) {
          case 'this-month':
            return 'This Month';
          case 'last-month':
            return 'Last Month';
          case 'last-3-months':
            return 'Last 3 Months';
          default:
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
      },
      
      createElement(tag, text, classes) {
        const el = document.createElement(tag);
        el.textContent = text;
        if (classes) el.className = classes;
        return el;
      }
    };

    document.addEventListener('DOMContentLoaded', function() {
      const fabButton = document.getElementById('fabButton');
      const fabOptions = document.getElementById('fabOptions');
      
      if (fabButton) {
        fabButton.addEventListener('click', function() {
          fabOptions.classList.toggle('active');
        });
      }
    });

    // Chart.js logic and FAB download/refresh are
  })();