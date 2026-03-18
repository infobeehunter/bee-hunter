// ===========================
// DATA STORE
// ===========================

const appState = {
    currentPage: 'radar',
    currentCategory: 'all',
    searchQuery: '',
    selectedPOI: null,
    selectedCoupon: null,
    userLocation: null,
    map: null,
    markers: [],
    user: {
        name: 'Marco Rossi',
        email: 'marco@example.com',
        xpTotal: 2450,
        streakDays: 12,
        premiumUntil: null,
        createdAt: new Date('2024-01-15')
    },
    pois: [
        {
            id: 1,
            name: 'Basilica di San Nicola',
            description: 'Una delle chiese più importanti di Bari',
            category: 'Cultura',
            latitude: 41.1371,
            longitude: 16.8755,
            xpReward: 100,
            icon: '🏛️'
        },
        {
            id: 2,
            name: 'Lungomare di Bari',
            description: 'Bellissima passeggiata sul mare',
            category: 'Natura',
            latitude: 41.1285,
            longitude: 16.8795,
            xpReward: 75,
            icon: '🌿'
        },
        {
            id: 3,
            name: 'Bari Vecchia',
            description: 'Il centro storico affascinante',
            category: 'Cultura',
            latitude: 41.1340,
            longitude: 16.8740,
            xpReward: 150,
            icon: '🏛️'
        },
        {
            id: 4,
            name: 'Orecchiette al Ragù',
            description: 'Ristorante tradizionale barese',
            category: 'Food',
            latitude: 41.1350,
            longitude: 16.8770,
            xpReward: 50,
            icon: '🍽️'
        },
        {
            id: 5,
            name: 'Festa di San Nicola',
            description: 'Grande evento annuale di Bari',
            category: 'Eventi',
            latitude: 41.1371,
            longitude: 16.8755,
            xpReward: 200,
            icon: '🎉'
        },
        {
            id: 6,
            name: 'Grotta Segreta',
            description: 'Un luogo nascosto con storia',
            category: 'Segreto',
            latitude: 41.1400,
            longitude: 16.8800,
            xpReward: 300,
            icon: '🔐'
        }
    ],
    coupons: [
        {
            id: 1,
            title: 'Sconto Gelato',
            description: 'Sconto del 20% su gelati',
            discount: '-20%',
            code: 'GELATO20',
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        },
        {
            id: 2,
            title: 'Pizza Gratis',
            description: 'Compra una pizza, la seconda è gratis',
            discount: '-50%',
            code: 'PIZZA50',
            expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        },
        {
            id: 3,
            title: 'Caffè Sconto',
            description: 'Sconto del 30% su bevande',
            discount: '-30%',
            code: 'CAFFE30',
            expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
        }
    ],
    leaderboard: [
        { userId: 1, name: 'Alessandro', xp: 5200 },
        { userId: 2, name: 'Giulia', xp: 4800 },
        { userId: 3, name: 'Marco', xp: 2450 },
        { userId: 4, name: 'Sofia', xp: 3100 },
        { userId: 5, name: 'Luca', xp: 2800 },
        { userId: 6, name: 'Emma', xp: 2600 },
        { userId: 7, name: 'Andrea', xp: 2400 },
        { userId: 8, name: 'Chiara', xp: 2200 },
        { userId: 9, name: 'Matteo', xp: 2000 },
        { userId: 10, name: 'Lisa', xp: 1800 }
    ],
    badges: [
        { id: 1, name: 'Primo Check-in', icon: '🎯' },
        { id: 2, name: 'Explorer', icon: '🗺️' },
        { id: 3, name: 'Foodie', icon: '🍽️' }
    ],
    activityFeed: [
        { id: 1, user: 'Utente', action: 'ha completato un check-in', location: 'Bari Vecchia', xp: 100, time: '2 ore fa' },
        { id: 2, user: 'Utente', action: 'ha guadagnato un badge', badge: 'Explorer', xp: 50, time: '5 ore fa' },
        { id: 3, user: 'Utente', action: 'ha condiviso su Instagram', location: 'Lungomare', xp: 25, time: '1 giorno fa' }
    ]
};

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadUserLocation();
    renderLeaderboard();
    renderActivityFeed();
    updateProfilePage();
});

function initializeApp() {
    // Initialize map
    const mapElement = document.getElementById('map');
    if (mapElement && window.google) {
        appState.map = new google.maps.Map(mapElement, {
            center: { lat: 41.1371, lng: 16.8755 },
            zoom: 14,
            styles: [
                { featureType: 'all', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
                { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9c9c9' }] }
            ]
        });
    } else if (mapElement) {
        // Fallback: Show placeholder if Google Maps is not available
        mapElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 1.125rem; text-align: center; padding: 2rem;"><div><p style="margin-bottom: 1rem;">📍 Mappa non disponibile</p><p style="font-size: 0.875rem; opacity: 0.9;">Aggiungi una chiave API di Google Maps in index.html per abilitare la mappa interattiva</p></div></div>';
    }
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const page = e.currentTarget.dataset.page;
            navigateToPage(page);
        });
    });

    // Radar page
    document.getElementById('search-input')?.addEventListener('input', (e) => {
        appState.searchQuery = e.target.value.toLowerCase();
        filterAndRenderPOIs();
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            appState.currentCategory = e.currentTarget.dataset.category;
            filterAndRenderPOIs();
        });
    });

    document.getElementById('close-poi')?.addEventListener('click', () => {
        appState.selectedPOI = null;
        document.getElementById('poi-detail').classList.add('hidden');
    });

    document.getElementById('checkin-btn')?.addEventListener('click', () => {
        if (appState.selectedPOI) {
            handleCheckIn(appState.selectedPOI);
        }
    });

    // Shop page
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.currentTarget.dataset.tab;
            switchTab(tab);
        });
    });

    renderCoupons();

    // Social page
    document.querySelectorAll('.platform-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const platform = e.currentTarget.dataset.platform;
            handleShare(platform);
        });
    });

    // Profile page
    document.getElementById('logout-btn')?.addEventListener('click', () => {
        handleLogout();
    });

    // Modal
    document.getElementById('modal-close-btn')?.addEventListener('click', () => {
        document.getElementById('coupon-modal').classList.add('hidden');
    });

    document.getElementById('modal-redeem-btn')?.addEventListener('click', () => {
        if (appState.selectedCoupon) {
            handleRedeemCoupon(appState.selectedCoupon);
        }
    });
}

// ===========================
// NAVIGATION
// ===========================

function navigateToPage(page) {
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === page) {
            btn.classList.add('active');
        }
    });

    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    // Show selected page
    document.getElementById(`${page}-page`).classList.add('active');
    appState.currentPage = page;

    // Reinitialize map if navigating to radar
    if (page === 'radar') {
        setTimeout(() => {
            if (appState.map) {
                google.maps.event.trigger(appState.map, 'resize');
                appState.map.setCenter({ lat: appState.userLocation?.lat || 41.1371, lng: appState.userLocation?.lon || 16.8755 });
            }
            filterAndRenderPOIs();
        }, 100);
    }
}

// ===========================
// RADAR PAGE
// ===========================

function loadUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                appState.userLocation = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                if (appState.map) {
                    appState.map.setCenter({ lat: appState.userLocation.lat, lng: appState.userLocation.lon });
                    addUserMarker();
                }
            },
            () => {
                // Default to Bari
                appState.userLocation = { lat: 41.1371, lon: 16.8755 };
            }
        );
    }
}

function filterAndRenderPOIs() {
    let filtered = appState.pois;

    // Filter by category
    if (appState.currentCategory !== 'all') {
        filtered = filtered.filter(poi => poi.category === appState.currentCategory);
    }

    // Filter by search query
    if (appState.searchQuery) {
        filtered = filtered.filter(poi =>
            poi.name.toLowerCase().includes(appState.searchQuery) ||
            poi.description.toLowerCase().includes(appState.searchQuery)
        );
    }

    // Update map markers
    updateMapMarkers(filtered);

    // Render POI list
    renderPOIList(filtered);
}

function updateMapMarkers(pois) {
    // Clear existing markers
    appState.markers.forEach(marker => marker.setMap(null));
    appState.markers = [];

    // Add new markers
    pois.forEach(poi => {
        const marker = new google.maps.Marker({
            position: { lat: poi.latitude, lng: poi.longitude },
            map: appState.map,
            title: poi.name,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: getCategoryColor(poi.category),
                fillOpacity: 0.8,
                strokeColor: '#fff',
                strokeWeight: 2
            }
        });

        marker.addListener('click', () => {
            selectPOI(poi);
        });

        appState.markers.push(marker);
    });

    // Add user location marker
    if (appState.userLocation) {
        addUserMarker();
    }
}

function addUserMarker() {
    const userMarker = new google.maps.Marker({
        position: { lat: appState.userLocation.lat, lng: appState.userLocation.lon },
        map: appState.map,
        title: 'La tua posizione',
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#4A90E2',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2
        }
    });
    appState.markers.push(userMarker);
}

function getCategoryColor(category) {
    const colors = {
        'Cultura': '#FF6B6B',
        'Natura': '#51CF66',
        'Food': '#FFD93D',
        'Eventi': '#6C5CE7',
        'Segreto': '#A29BFE'
    };
    return colors[category] || '#FF6B6B';
}

function renderPOIList(pois) {
    const poiList = document.getElementById('poi-list');
    poiList.innerHTML = '';

    if (pois.length === 0) {
        poiList.innerHTML = '<div class="text-center text-sm" style="padding: 1rem; color: var(--text-light);">Nessun POI trovato</div>';
        return;
    }

    pois.forEach(poi => {
        const distance = calculateDistance(
            appState.userLocation?.lat || 41.1371,
            appState.userLocation?.lon || 16.8755,
            poi.latitude,
            poi.longitude
        );

        const item = document.createElement('div');
        item.className = 'poi-item';
        item.innerHTML = `
            <div class="poi-item-header">
                <span class="poi-item-icon">${poi.icon}</span>
                <span class="poi-item-name">${poi.name}</span>
            </div>
            <p class="poi-item-desc">${poi.description}</p>
            <div class="poi-item-meta">
                <span>📍 ${distance} km</span>
                <span class="xp-badge">+${poi.xpReward} XP</span>
            </div>
        `;
        item.addEventListener('click', () => selectPOI(poi));
        poiList.appendChild(item);
    });
}

function selectPOI(poi) {
    appState.selectedPOI = poi;
    const distance = calculateDistance(
        appState.userLocation?.lat || 41.1371,
        appState.userLocation?.lon || 16.8755,
        poi.latitude,
        poi.longitude
    );

    document.getElementById('poi-icon').textContent = poi.icon;
    document.getElementById('poi-name').textContent = poi.name;
    document.getElementById('poi-description').textContent = poi.description;
    document.getElementById('poi-distance').textContent = `📍 ${distance} km`;
    document.getElementById('poi-xp').textContent = `+${poi.xpReward} XP`;

    document.getElementById('poi-detail').classList.remove('hidden');

    if (appState.map) {
        appState.map.panTo({ lat: poi.latitude, lng: poi.longitude });
        appState.map.setZoom(16);
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
}

function handleCheckIn(poi) {
    appState.user.xpTotal += poi.xpReward;
    showNotification(`✅ Check-in a ${poi.name}! +${poi.xpReward} XP`);
    appState.selectedPOI = null;
    document.getElementById('poi-detail').classList.add('hidden');
    updateProfilePage();
}

// ===========================
// SHOP PAGE
// ===========================

function renderCoupons() {
    const couponList = document.getElementById('coupon-list');
    couponList.innerHTML = '';

    appState.coupons.forEach(coupon => {
        const card = document.createElement('div');
        card.className = 'coupon-card';
        card.innerHTML = `
            <div class="coupon-header">
                <h4 class="coupon-title">${coupon.title}</h4>
                <span class="coupon-discount">${coupon.discount}</span>
            </div>
            <p class="coupon-desc">${coupon.description}</p>
            <div class="coupon-footer">
                <span class="coupon-expires">Scade: ${coupon.expiresAt.toLocaleDateString('it-IT')}</span>
                <button class="btn btn-primary" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;">Riscatta</button>
            </div>
        `;
        card.addEventListener('click', () => showCouponModal(coupon));
        couponList.appendChild(card);
    });
}

function showCouponModal(coupon) {
    appState.selectedCoupon = coupon;
    document.getElementById('modal-coupon-title').textContent = coupon.title;
    document.getElementById('modal-coupon-desc').textContent = coupon.description;
    document.getElementById('modal-coupon-discount').textContent = coupon.discount;
    document.getElementById('modal-coupon-code').textContent = coupon.code;
    document.getElementById('modal-coupon-expires').textContent = `Scade il ${coupon.expiresAt.toLocaleDateString('it-IT')}`;
    document.getElementById('coupon-modal').classList.remove('hidden');
}

function handleRedeemCoupon(coupon) {
    showNotification(`✅ Coupon riscattato! +50 XP bonus`);
    appState.user.xpTotal += 50;
    document.getElementById('coupon-modal').classList.add('hidden');
    updateProfilePage();
}

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
}

// ===========================
// SOCIAL PAGE
// ===========================

function handleShare(platform) {
    const content = document.getElementById('share-content').value || 'Sto esplorando Bari con BeeHunter! #BeeHunter';
    showNotification(`✅ Condiviso su ${platform}! +25 XP`);
    appState.user.xpTotal += 25;
    document.getElementById('share-content').value = '';
    updateProfilePage();
}

function renderLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '';

    appState.leaderboard.forEach((entry, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        if (entry.userId === 3) {
            item.classList.add('current');
        }

        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1;

        item.innerHTML = `
            <div class="leaderboard-rank">${medal}</div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${entry.name}</div>
                ${entry.userId === 3 ? '<div class="leaderboard-label">Tu</div>' : ''}
            </div>
            <div class="leaderboard-xp">${entry.xp} XP</div>
        `;
        leaderboard.appendChild(item);
    });
}

function renderActivityFeed() {
    const feed = document.getElementById('activity-feed');
    feed.innerHTML = '';

    appState.activityFeed.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-content">
                <div class="activity-title">${activity.user} ${activity.action}</div>
                <div class="activity-time">${activity.location || activity.badge} • ${activity.time}</div>
            </div>
            <div class="activity-xp">+${activity.xp} XP</div>
        `;
        feed.appendChild(item);
    });
}

// ===========================
// PROFILE PAGE
// ===========================

function updateProfilePage() {
    document.getElementById('user-name').textContent = appState.user.name;
    document.getElementById('user-email').textContent = appState.user.email;
    document.getElementById('stat-xp').textContent = appState.user.xpTotal;
    document.getElementById('stat-streak').textContent = appState.user.streakDays;
    document.getElementById('stat-badges').textContent = appState.badges.length;
    document.getElementById('stat-bookings').textContent = '5';
    document.getElementById('stat-checkins').textContent = '12';
    document.getElementById('stat-joined').textContent = appState.user.createdAt.toLocaleDateString('it-IT');

    if (appState.user.premiumUntil) {
        document.getElementById('premium-badge').classList.remove('hidden');
    }

    // Render badges
    if (appState.badges.length > 0) {
        document.getElementById('badges-section').classList.remove('hidden');
        const badgesGrid = document.getElementById('badges-grid');
        badgesGrid.innerHTML = '';
        appState.badges.forEach(badge => {
            const badgeItem = document.createElement('div');
            badgeItem.className = 'badge-item';
            badgeItem.innerHTML = `
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
            `;
            badgesGrid.appendChild(badgeItem);
        });
    }

    // Render notifications
    if (appState.activityFeed.length > 0) {
        document.getElementById('notifications-section').classList.remove('hidden');
        const notifList = document.getElementById('notifications-list');
        notifList.innerHTML = '';
        appState.activityFeed.slice(0, 3).forEach(activity => {
            const notif = document.createElement('div');
            notif.className = 'notification-item';
            notif.innerHTML = `
                <div class="notification-title">${activity.user} ${activity.action}</div>
                <div class="notification-message">${activity.location || activity.badge}</div>
            `;
            notifList.appendChild(notif);
        });
    }
}

function handleLogout() {
    showNotification('Logout effettuato');
    setTimeout(() => {
        alert('Logout completato! Reindirizzamento alla pagina di login...');
    }, 500);
}

// ===========================
// UTILITIES
// ===========================

function showNotification(message) {
    // Simple notification using alert for now
    // In a real app, you'd use a toast library
    console.log('Notification:', message);
    
    // Create a simple toast-like notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        z-index: 9999;
        animation: slideUp 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Add slideDown animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
