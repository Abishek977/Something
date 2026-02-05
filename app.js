// ===============================================
// MOBILE MENU CONTROLS - ADD TO TOP OF APP.JS
// ===============================================

// --- Mobile Menu Controls ---
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const menuPanel = document.getElementById('menu-panel');
    const menuOverlay = document.getElementById('menu-overlay');
    const legendToggle = document.querySelector('.legend-toggle');
    const legendContent = document.querySelector('.legend-content');
    
    // Open menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuPanel.classList.add('open');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close menu
    function closeMenu() {
        menuPanel.classList.remove('open');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Close menu when filter is selected
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn') || 
            e.target.classList.contains('action-btn') ||
            e.target.closest('.filter-btn') ||
            e.target.closest('.action-btn')) {
            setTimeout(closeMenu, 300);
        }
    });
    
    // Legend toggle
    if (legendToggle && legendContent) {
        legendToggle.addEventListener('click', function() {
            legendContent.classList.toggle('active');
        });
    }
});

// Update stats function to work with both menu and mobile header
function updateAllStats() {
    const totalBooths = pollingStationsData.length;
    const totalVoters = pollingStationsData.reduce((sum, booth) => sum + parseInt(booth.voters), 0);
    const criticalBooths = pollingStationsData.filter(b => calculatePriority(b.voters, b.visits, b.party, b.demographics.rspVoterPercent) === 'critical').length;
    
    // Update mobile header
    const mobileBoothsEl = document.getElementById('total-booths-mobile');
    const mobileVotersEl = document.getElementById('total-voters-mobile');
    if (mobileBoothsEl) mobileBoothsEl.textContent = totalBooths;
    if (mobileVotersEl) mobileVotersEl.textContent = (totalVoters / 1000).toFixed(0) + 'k';
    
    // Update menu stats
    const menuBoothsEl = document.getElementById('total-booths');
    const menuVotersEl = document.getElementById('total-voters');
    const criticalEl = document.getElementById('critical-count');
    if (menuBoothsEl) menuBoothsEl.textContent = totalBooths;
    if (menuVotersEl) menuVotersEl.textContent = (totalVoters / 1000).toFixed(0) + 'k';
    if (criticalEl) criticalEl.textContent = criticalBooths;
}

// ===============================================
// ELECTION CAMPAIGN MANAGEMENT SYSTEM  
// UPDATED WITH COMPREHENSIVE BOOTH DATA
// ===============================================

// --- Map Initialization ---
const map = L.map('map', {
    center: [28.07, 83.87],
    zoom: 11,
    maxZoom: 18,
    minZoom: 9,
    scrollWheelZoom: true,
    zoomControl: true
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

// --- Municipality Colors ---
const municipalityColors = {
    'Arjunchaupari': '#FF6B6B',
    'Aandhikhola': '#4ECDC4',
    'Putalibazar': '#45B7D1',
    'Waling': '#F7B731',
    'Phedikhola': '#A55EEA',
    'Bhirkot': '#26DE81',
    'Biruwa': '#FD79A8',
    'Harinas': '#FC5C65'
};

// --- Create Map Icons ---
function createIcon(municipality, party, visits, priority) {
    const color = municipalityColors[municipality] || '#95A5A6';
    let size = visits >= 3 ? 18 : visits >= 1 ? 15 : 12;
    const border = priority === 'critical' ? '3px solid #e74c3c' : '2px solid white';
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style='background-color:${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: ${border}; box-shadow: 0 2px 5px rgba(0,0,0,0.3);'></div>`,
        iconSize: [size + 6, size + 6],
        iconAnchor: [(size + 6) / 2, (size + 6) / 2]
    });
}

// --- Helper Functions ---
function calculatePriority(voters, visits, party, rspVoterPercent) {
    const v = parseInt(voters);
    const rspPercent = parseFloat(rspVoterPercent);
    
    // Critical: High voter count, low visits, and low RSP support
    if (v > 800 && visits <= 1 && rspPercent < 20) return 'critical';
    if (v > 600 && visits <= 2 && rspPercent < 25) return 'high';
    if (v > 400 && visits <= 2 && rspPercent < 30) return 'medium';
    return 'low';
}

function calculateOppositionStrength(party, voters, rspVoterPercent) {
    const rspPercent = parseFloat(rspVoterPercent);
    const v = parseInt(voters);
    
    // If RSP voter percentage is high, opposition is low
    if (rspPercent > 50) return 'low';
    if (rspPercent > 40) return 'medium';
    if (rspPercent > 30 && v < 600) return 'medium';
    if (rspPercent > 30 && v >= 600) return 'high';
    if (v > 800) return 'very_high';
    if (v > 600) return 'high';
    return 'medium';
}

// ===============================================
// COMPREHENSIVE BOOTH DATA - ALL 171 BOOTHS
// WITH DEMOGRAPHICS & KEY PEOPLE
// ===============================================
// ===============================================
// COMPLETE DATA TEMPLATE - ALL 171 BOOTHS
// Easy Data Entry Format
// ===============================================

const pollingStationsData = [
    // ===== BOOTH #1 - COMPLETED EXAMPLE =====
    {
        "municipality": "Arjunchaupari",
        "ward": "1",
        "station": "Parkanya Ma.Vi., Ajayameru Shree (Ka)",
        "code": "3109",
        "voters": "1064",
        "range": "S.No. 1 to 1064",
        "lat": 28.088265,
        "lng": 83.744582,
        "party": "RSP",  // UPDATE: Surya/Congress/RSP
        "visits": 1,  // UPDATE: 0-5+
        "demographics": {
            "maleVoters": 521,  // UPDATE
            "femaleVoters": 542,  // UPDATE
            "youngVoters": 287,  // UPDATE
            "rspVoterPercent": 33  // UPDATE: 0-100
        },
        "boothRepresentatives": [
            {
                "name": "UPDATE_REP_1",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        "localKeyPeople": [
            {
                "name": "UPDATE_KEY_PERSON_1",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "High",  // High/Medium/Low
                "support": "RSP"  // RSP/Neutral/Opposition
            },
            {
                "name": "UPDATE_KEY_PERSON_2",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "Medium",
                "support": "Neutral"
            },
            {
                "name": "UPDATE_KEY_PERSON_3",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "High",
                "support": "RSP"
            }
        ]
    },

    // ===== BOOTH #2 - COMPLETED EXAMPLE =====
    {
        "municipality": "Arjunchaupari",
        "ward": "1",
        "station": "Parkanya Ma.Vi., Ajayameru Shree (Kha)",
        "code": "",
        "voters": "1064",
        "range": "S.No. 1065 to 2128",
        "lat": 28.089678,
        "lng": 83.744219,
        "party": "RSP",  // UPDATE: Surya/Congress/RSP
        "visits": 2,  // UPDATE: 0-5+
        "demographics": {
            "maleVoters": 521,  // UPDATE
            "femaleVoters": 542,  // UPDATE
            "youngVoters": 287,  // UPDATE
            "rspVoterPercent": 36  // UPDATE: 0-100
        },
        "boothRepresentatives": [
            {
                "name": "UPDATE_LEADER_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        "localKeyPeople": [
            {
                "name": "UPDATE_KEY_PERSON",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "High",  // High/Medium/Low
                "support": "RSP"  // RSP/Neutral/Opposition
            },
            {
                "name": "UPDATE_KEY_PERSON_2",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "Medium",
                "support": "Neutral"
            },
            {
                "name": "UPDATE_KEY_PERSON_3",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "High",
                "support": "RSP"
            }
        ]
    },

    // ===== BOOTH #3 - COMPLETED EXAMPLE =====
    {
        "municipality": "Arjunchaupari",
        "ward": "1",
        "station": "Parkanya Ma.Vi., Ajayameru Shree (Ga)",
        "code": "",
        "voters": "1079",
        "range": "S.No. 2129 to 3207",
        "lat": 28.08868,
        "lng": 83.745727,
        "party": "RSP",  // UPDATE: Surya/Congress/RSP
        "visits": 3,  // UPDATE: 0-5+
        "demographics": {
            "maleVoters": 528,  // UPDATE
            "femaleVoters": 550,  // UPDATE
            "youngVoters": 291,  // UPDATE
            "rspVoterPercent": 39  // UPDATE: 0-100
        },
        "boothRepresentatives": [
            {
                "name": "UPDATE_LEADER_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        "localKeyPeople": [
            {
                "name": "UPDATE_KEY_PERSON",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "High",  // High/Medium/Low
                "support": "RSP"  // RSP/Neutral/Opposition
            },
            {
                "name": "UPDATE_KEY_PERSON_2",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "Medium",
                "support": "Neutral"
            },
            {
                "name": "UPDATE_KEY_PERSON_3",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "High",
                "support": "RSP"
            }
        ]
    },

    // ===== BOOTH #4 - COMPLETED EXAMPLE =====
    {
        "municipality": "Arjunchaupari",
        "ward": "2",
        "station": "Ranicharri Basic School, Khate (Ka)",
        "code": "3113",
        "voters": "1064",
        "range": "S.No. 1 to 1064",
        "lat": 28.084101,
        "lng": 83.773558,
        "party": "RSP",  // UPDATE: Surya/Congress/RSP
        "visits": 4,  // UPDATE: 0-5+
        "demographics": {
            "maleVoters": 521,  // UPDATE
            "femaleVoters": 542,  // UPDATE
            "youngVoters": 287,  // UPDATE
            "rspVoterPercent": 42  // UPDATE: 0-100
        },
        "boothRepresentatives": [
            {
                "name": "UPDATE_LEADER_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        "localKeyPeople": [
            {
                "name": "UPDATE_KEY_PERSON",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "High",  // High/Medium/Low
                "support": "RSP"  // RSP/Neutral/Opposition
            },
            {
                "name": "UPDATE_KEY_PERSON_2",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "Medium",
                "support": "Neutral"
            },
            {
                "name": "UPDATE_KEY_PERSON_3",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "High",
                "support": "RSP"
            }
        ]
    },

    // ===== BOOTH #5 - COMPLETED EXAMPLE =====
    {
        "municipality": "Arjunchaupari",
        "ward": "2",
        "station": "Ranicharri Basic School, Khate (Kha)",
        "code": "",
        "voters": "1075",
        "range": "S.No. 1065 to 2139",
        "lat": 28.083686,
        "lng": 83.772998,
        "party": "RSP",  // UPDATE: Surya/Congress/RSP
        "visits": 5,  // UPDATE: 0-5+
        "demographics": {
            "maleVoters": 526,  // UPDATE
            "femaleVoters": 548,  // UPDATE
            "youngVoters": 290,  // UPDATE
            "rspVoterPercent": 45  // UPDATE: 0-100
        },
        "boothRepresentatives": [
            {
                "name": "UPDATE_LEADER_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        "localKeyPeople": [
            {
                "name": "UPDATE_KEY_PERSON",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "High",  // High/Medium/Low
                "support": "RSP"  // RSP/Neutral/Opposition
            },
            {
                "name": "UPDATE_KEY_PERSON_2",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "Medium",
                "support": "Neutral"
            },
            {
                "name": "UPDATE_KEY_PERSON_3",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "High",
                "support": "RSP"
            }
        ]
    },

    // ===== BOOTH #6 - COMPLETED EXAMPLE =====
    {
        "municipality": "Arjunchaupari",
        "ward": "3",
        "station": "Saraswati Basic School, Adhikharka",
        "code": "3120",
        "voters": "517",
        "range": "S.No. 1 to 517",
        "lat": 28.098717,
        "lng": 83.725123,
        "party": "RSP",  // UPDATE: Surya/Congress/RSP
        "visits": 0,  // UPDATE: 0-5+
        "demographics": {
            "maleVoters": 253,  // UPDATE
            "femaleVoters": 263,  // UPDATE
            "youngVoters": 139,  // UPDATE
            "rspVoterPercent": 48  // UPDATE: 0-100
        },
        "boothRepresentatives": [
            {
                "name": "UPDATE_LEADER_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        "localKeyPeople": [
            {
                "name": "UPDATE_KEY_PERSON",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "High",  // High/Medium/Low
                "support": "RSP"  // RSP/Neutral/Opposition
            },
            {
                "name": "UPDATE_KEY_PERSON_2",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "Medium",
                "support": "Neutral"
            },
            {
                "name": "UPDATE_KEY_PERSON_3",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "High",
                "support": "RSP"
            }
        ]
    },

    // ===== BOOTH #7 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "3",
        "station": "Ward No. 3 Office, Simalchaur (Ka)",
        "code": "11673",
        "voters": "728",
        "range": "S.No. 1 to 728",
        "lat": 28.099719,
        "lng": 83.761239,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #8 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "3",
        "station": "Ward No. 3 Office, Simalchaur (Kha)",
        "code": "",
        "voters": "755",
        "range": "S.No. 729 to 1483",
        "lat": 28.101285,
        "lng": 83.760048,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #9 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "4",
        "station": "Jan Ma.Vi., Rapakot (Ka)",
        "code": "3117",
        "voters": "756",
        "range": "S.No. 1 to 756",
        "lat": 28.115341,
        "lng": 83.74965,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #10 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "4",
        "station": "Jan Ma.Vi., Rapakot (Kha)",
        "code": "",
        "voters": "760",
        "range": "S.No. 757 to 1516",
        "lat": 28.114564,
        "lng": 83.749628,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #11 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "4",
        "station": "Shahid A.Vi., Khor",
        "code": "10233",
        "voters": "287",
        "range": "S.No. 1 to 287",
        "lat": 28.123414,
        "lng": 83.737983,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #12 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "5",
        "station": "Sarvodaya Ma.Vi., Talpokhari",
        "code": "2862",
        "voters": "929",
        "range": "S.No. 1 to 929",
        "lat": 28.134957,
        "lng": 83.717233,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #13 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "5",
        "station": "5 No. Ward Office, Pipaldanda",
        "code": "2865",
        "voters": "695",
        "range": "S.No. 1 to 695",
        "lat": 28.133647,
        "lng": 83.741975,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #14 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "5",
        "station": "Kalika Basic School, Mulabari",
        "code": "2869",
        "voters": "872",
        "range": "S.No. 1 to 872",
        "lat": 28.122233,
        "lng": 83.721162,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #15 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "6",
        "station": "Gaunpharka Janhit Basic School, Kulebari",
        "code": "2845",
        "voters": "869",
        "range": "S.No. 1 to 869",
        "lat": 28.123345,
        "lng": 83.780695,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #16 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "6",
        "station": "Jan Vikas Basic School, Siudbari",
        "code": "2849",
        "voters": "782",
        "range": "S.No. 1 to 782",
        "lat": 28.126588,
        "lng": 83.806689,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #17 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "6",
        "station": "Darau Ma.Vi., Darau",
        "code": "2852",
        "voters": "589",
        "range": "S.No. 1 to 589",
        "lat": 28.109425,
        "lng": 83.787657,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #18 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "6",
        "station": "Rashtriya A.Vi., Tamakhabari",
        "code": "10234",
        "voters": "434",
        "range": "S.No. 1 to 434",
        "lat": 28.112029,
        "lng": 83.803119,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #19 =====
    {
        "municipality": "Aandhikhola",
        "ward": "1",
        "station": "Trishahid Ma.Vi., Panchhmul (Ka)",
        "code": "2853",
        "voters": "868",
        "range": "S.No. 1 to 868",
        "lat": 28.144095,
        "lng": 83.756005,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #20 =====
    {
        "municipality": "Aandhikhola",
        "ward": "1",
        "station": "Trishahid Ma.Vi., Panchhmul (Kha)",
        "code": "",
        "voters": "920",
        "range": "S.No. 869 to 1788",
        "lat": 28.144508,
        "lng": 83.755026,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #21 =====
    {
        "municipality": "Aandhikhola",
        "ward": "1",
        "station": "Gaunpharka Basic School, Dhadhu (Ka)",
        "code": "2854",
        "voters": "532",
        "range": "S.No. 1 to 532",
        "lat": 28.138416,
        "lng": 83.762478,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #22 =====
    {
        "municipality": "Aandhikhola",
        "ward": "1",
        "station": "Gaunpharka Basic School, Dhadhu (Kha)",
        "code": "",
        "voters": "581",
        "range": "S.No. 533 to 1113",
        "lat": 28.140343,
        "lng": 83.762535,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #23 =====
    {
        "municipality": "Aandhikhola",
        "ward": "1",
        "station": "Janhit Ma.Vi., Majhakateri",
        "code": "2859",
        "voters": "740",
        "range": "S.No. 1 to 740",
        "lat": 28.131297,
        "lng": 83.768391,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #24 =====
    {
        "municipality": "Aandhikhola",
        "ward": "2",
        "station": "Jana Pradip Ma.Vi., Duipiple (Ka)",
        "code": "2565",
        "voters": "672",
        "range": "S.No. 1 to 672",
        "lat": 28.16737,
        "lng": 83.7844,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #25 =====
    {
        "municipality": "Aandhikhola",
        "ward": "2",
        "station": "Jana Pradip Ma.Vi., Duipiple (Kha)",
        "code": "",
        "voters": "709",
        "range": "S.No. 673 to 1381",
        "lat": 28.168654,
        "lng": 83.783601,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #26 =====
    {
        "municipality": "Aandhikhola",
        "ward": "2",
        "station": "Dahare Basic School, Ukhabari",
        "code": "2569",
        "voters": "698",
        "range": "S.No. 1 to 698",
        "lat": 28.159733,
        "lng": 83.80296,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #27 =====
    {
        "municipality": "Aandhikhola",
        "ward": "2",
        "station": "Chilaunebas Health Post, Chilaunebas",
        "code": "11674",
        "voters": "875",
        "range": "S.No. 1 to 875",
        "lat": 28.160531,
        "lng": 83.771283,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #28 =====
    {
        "municipality": "Aandhikhola",
        "ward": "3",
        "station": "Rashtriya Ma.Vi., Puwadanda (Ka)",
        "code": "2557",
        "voters": "840",
        "range": "S.No. 1 to 840",
        "lat": 28.18646,
        "lng": 83.771844,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #29 =====
    {
        "municipality": "Aandhikhola",
        "ward": "3",
        "station": "Rashtriya Ma.Vi., Puwadanda (Kha)",
        "code": "",
        "voters": "841",
        "range": "S.No. 841 to 1681",
        "lat": 28.186979,
        "lng": 83.772621,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #30 =====
    {
        "municipality": "Aandhikhola",
        "ward": "3",
        "station": "Andhadhi Prakash Ma.Vi., Athgaure",
        "code": "2563",
        "voters": "836",
        "range": "S.No. 1 to 836",
        "lat": 28.195115,
        "lng": 83.776567,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #31 =====
    {
        "municipality": "Aandhikhola",
        "ward": "4",
        "station": "Sepat Siranchaur Ma.Vi., Sepat",
        "code": "2586",
        "voters": "1009",
        "range": "S.No. 1 to 1009",
        "lat": 28.181741,
        "lng": 83.78968,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #32 =====
    {
        "municipality": "Aandhikhola",
        "ward": "4",
        "station": "Shrawan Ma.Vi., Wangsing Deurali (Ka)",
        "code": "2589",
        "voters": "756",
        "range": "S.No. 1 to 756",
        "lat": 28.205621,
        "lng": 83.801511,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #33 =====
    {
        "municipality": "Aandhikhola",
        "ward": "4",
        "station": "Shrawan Ma.Vi., Wangsing Deurali (Kha)",
        "code": "",
        "voters": "803",
        "range": "S.No. 757 to 1559",
        "lat": 28.203908,
        "lng": 83.799922,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #34 =====
    {
        "municipality": "Aandhikhola",
        "ward": "5",
        "station": "Saraswati Basic School, Setidabhan",
        "code": "2797",
        "voters": "858",
        "range": "S.No. 1 to 858",
        "lat": 28.170102,
        "lng": 83.812307,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #35 =====
    {
        "municipality": "Aandhikhola",
        "ward": "5",
        "station": "Pradhan Paneru Ma.Vi., Rangthethati (Ka)",
        "code": "2801",
        "voters": "1008",
        "range": "S.No. 1 to 1008",
        "lat": 28.157591,
        "lng": 83.833709,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #36 =====
    {
        "municipality": "Aandhikhola",
        "ward": "5",
        "station": "Pradhan Paneru Ma.Vi., Rangthethati (Kha)",
        "code": "",
        "voters": "1031",
        "range": "S.No. 1009 to 2039",
        "lat": 28.159098,
        "lng": 83.834137,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #37 =====
    {
        "municipality": "Aandhikhola",
        "ward": "6",
        "station": "Laxmi Basic School, Dhakaldanda",
        "code": "2802",
        "voters": "610",
        "range": "S.No. 1 to 610",
        "lat": 28.149735,
        "lng": 83.819957,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #38 =====
    {
        "municipality": "Aandhikhola",
        "ward": "6",
        "station": "Bhagwati Ma.Vi., Lamiswara Ninuwabot (Ka)",
        "code": "2832",
        "voters": "588",
        "range": "S.No. 1 to 588",
        "lat": 28.134582,
        "lng": 83.842051,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #39 =====
    {
        "municipality": "Aandhikhola",
        "ward": "6",
        "station": "Bhagwati Ma.Vi., Lamiswara Ninuwabot (Kha)",
        "code": "",
        "voters": "605",
        "range": "S.No. 589 to 1193",
        "lat": 28.132812,
        "lng": 83.842626,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #40 =====
    {
        "municipality": "Aandhikhola",
        "ward": "6",
        "station": "Sharada Temple Ma.Vi., Tikaja (Ka)",
        "code": "2835",
        "voters": "588",
        "range": "S.No. 1 to 588",
        "lat": 28.13742,
        "lng": 83.810272,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #41 =====
    {
        "municipality": "Aandhikhola",
        "ward": "6",
        "station": "Sharada Temple Ma.Vi., Tikaja (Kha)",
        "code": "",
        "voters": "619",
        "range": "S.No. 589 to 1207",
        "lat": 28.138409,
        "lng": 83.810297,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #42 =====
    {
        "municipality": "Putalibazar",
        "ward": "1",
        "station": "Tribhuwan Adarsh Ma.Vi. Syanjabazar (Ka)",
        "code": "2745",
        "voters": "840",
        "range": "S.No. 1 to 840",
        "lat": 28.069215,
        "lng": 83.818768,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            },{
                "name": "UPDATE_KEY_PERSON_2",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "Medium",
                "support": "Neutral"
            },{
                "name": "UPDATE_KEY_PERSON_2",
                "role": "UPDATE_ROLE",
                "phone": "98XXXXXXXX",
                "influence": "Medium",
                "support": "Neutral"
            },
        ]
    },

    // ===== BOOTH #43 =====
    {
        "municipality": "Putalibazar",
        "ward": "1",
        "station": "Tribhuwan Adarsh Ma.Vi. Syanjabazar (Kha)",
        "code": "",
        "voters": "868",
        "range": "S.No. 841 to 1708",
        "lat": 28.070144,
        "lng": 83.818302,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #44 =====
    {
        "municipality": "Putalibazar",
        "ward": "1",
        "station": "Tribhuwan Adarsh Ma.Vi. Syanjabazar (Ga)",
        "code": "",
        "voters": "891",
        "range": "S.No. 1709 to 2599",
        "lat": 28.069422,
        "lng": 83.818149,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #45 =====
    {
        "municipality": "Putalibazar",
        "ward": "2",
        "station": "Barahaguthi Basic School, Chidwa",
        "code": "2732",
        "voters": "967",
        "range": "S.No. 1 to 967",
        "lat": 28.092325,
        "lng": 83.886789,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #46 =====
    {
        "municipality": "Putalibazar",
        "ward": "2",
        "station": "Thumkidanda Temple, Kusunde (Ka)",
        "code": "2749",
        "voters": "672",
        "range": "S.No. 1 to 672",
        "lat": 28.078791,
        "lng": 83.895022,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #47 =====
    {
        "municipality": "Putalibazar",
        "ward": "2",
        "station": "Thumkidanda Temple, Kusunde (Kha)",
        "code": "",
        "voters": "687",
        "range": "S.No. 673 to 1359",
        "lat": 28.07977,
        "lng": 83.894933,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #48 =====
    {
        "municipality": "Putalibazar",
        "ward": "3",
        "station": "Punyashila Basic School, Nirabire (Ka)",
        "code": "2752",
        "voters": "728",
        "range": "S.No. 1 to 728",
        "lat": 28.125526,
        "lng": 83.888342,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #49 =====
    {
        "municipality": "Putalibazar",
        "ward": "3",
        "station": "Punyashila Basic School, Nirabire (Kha)",
        "code": "",
        "voters": "765",
        "range": "S.No. 729 to 1493",
        "lat": 28.124908,
        "lng": 83.889052,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #50 =====
    {
        "municipality": "Putalibazar",
        "ward": "3",
        "station": "Saraswati Ma.Vi., Gairikhet (Ka)",
        "code": "2757",
        "voters": "868",
        "range": "S.No. 1 to 868",
        "lat": 28.098697,
        "lng": 83.875998,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #51 =====
    {
        "municipality": "Putalibazar",
        "ward": "3",
        "station": "Saraswati Ma.Vi., Gairikhet (Kha)",
        "code": "",
        "voters": "870",
        "range": "S.No. 869 to 1738",
        "lat": 28.098861,
        "lng": 83.875697,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #52 =====
    {
        "municipality": "Putalibazar",
        "ward": "3",
        "station": "Kajiman Haritika Ma.Vi., Putalikhet",
        "code": "2759",
        "voters": "951",
        "range": "S.No. 1 to 951",
        "lat": 28.090572,
        "lng": 83.862788,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #53 =====
    {
        "municipality": "Putalibazar",
        "ward": "4",
        "station": "Ramkosh Phulbari Ma.Vi., Ramkosh (Ka)",
        "code": "2763",
        "voters": "672",
        "range": "S.No. 1 to 672",
        "lat": 28.121956,
        "lng": 83.857272,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #54 =====
    {
        "municipality": "Putalibazar",
        "ward": "4",
        "station": "Ramkosh Phulbari Ma.Vi., Ramkosh (Kha)",
        "code": "",
        "voters": "708",
        "range": "S.No. 673 to 1380",
        "lat": 28.121252,
        "lng": 83.858571,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #55 =====
    {
        "municipality": "Putalibazar",
        "ward": "4",
        "station": "Saraswati Ma.Vi., Nagdanda (Ka)",
        "code": "2769",
        "voters": "812",
        "range": "S.No. 1 to 812",
        "lat": 28.141174,
        "lng": 83.871133,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #56 =====
    {
        "municipality": "Putalibazar",
        "ward": "4",
        "station": "Saraswati Ma.Vi., Nagdanda (Kha)",
        "code": "",
        "voters": "830",
        "range": "S.No. 813 to 1642",
        "lat": 28.140759,
        "lng": 83.870952,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #57 =====
    {
        "municipality": "Putalibazar",
        "ward": "5",
        "station": "Shitala Ma.Vi., Gaude (Ka)",
        "code": "2649",
        "voters": "812",
        "range": "S.No. 1 to 812",
        "lat": 28.141526,
        "lng": 83.931513,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #58 =====
    {
        "municipality": "Putalibazar",
        "ward": "5",
        "station": "Shitala Ma.Vi., Gaude (Kha)",
        "code": "",
        "voters": "826",
        "range": "S.No. 813 to 1638",
        "lat": 28.140568,
        "lng": 83.932692,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #59 =====
    {
        "municipality": "Putalibazar",
        "ward": "5",
        "station": "Jana Jyoti Basic School, Bhrikuna",
        "code": "2651",
        "voters": "700",
        "range": "S.No. 1 to 700",
        "lat": 28.137482,
        "lng": 83.901919,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #60 =====
    {
        "municipality": "Putalibazar",
        "ward": "5",
        "station": "Saraswati Basic School, Katuyechaur",
        "code": "2653",
        "voters": "661",
        "range": "S.No. 1 to 661",
        "lat": 28.124474,
        "lng": 83.91052,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #61 =====
    {
        "municipality": "Putalibazar",
        "ward": "6",
        "station": "Shishu Kalyan Jana Priya Secondary School, Dangling Kaule",
        "code": "2662",
        "voters": "730",
        "range": "S.No. 1 to 730",
        "lat": 28.124664,
        "lng": 83.950018,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #62 =====
    {
        "municipality": "Putalibazar",
        "ward": "6",
        "station": "Himalaya Ma.Vi. Khalanga",
        "code": "2663",
        "voters": "940",
        "range": "S.No. 1 to 940",
        "lat": 28.140746,
        "lng": 83.976251,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #63 =====
    {
        "municipality": "Putalibazar",
        "ward": "6",
        "station": "Durga Bhagwati Basic School, Rayale",
        "code": "2669",
        "voters": "644",
        "range": "S.No. 1 to 644",
        "lat": 28.118982,
        "lng": 83.984767,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #64 =====
    {
        "municipality": "Putalibazar",
        "ward": "7",
        "station": "Janata Ma.Vi., Thuladihi (Ka)",
        "code": "2674",
        "voters": "784",
        "range": "S.No. 1 to 784",
        "lat": 28.107742,
        "lng": 83.925471,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #65 =====
    {
        "municipality": "Putalibazar",
        "ward": "7",
        "station": "Janata Ma.Vi., Thuladihi (Kha)",
        "code": "",
        "voters": "812",
        "range": "S.No. 785 to 1596",
        "lat": 28.106988,
        "lng": 83.924811,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #66 =====
    {
        "municipality": "Putalibazar",
        "ward": "7",
        "station": "Janata Ma.Vi., Thuladihi (Ga)",
        "code": "",
        "voters": "812",
        "range": "S.No. 1597 to 2408",
        "lat": 28.108206,
        "lng": 83.923906,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #67 =====
    {
        "municipality": "Putalibazar",
        "ward": "7",
        "station": "Sharada Ma.Vi., Lumchak Chapkhor Danda",
        "code": "2677",
        "voters": "1040",
        "range": "S.No. 1 to 1040",
        "lat": 28.101659,
        "lng": 83.961083,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #68 =====
    {
        "municipality": "Putalibazar",
        "ward": "8",
        "station": "Janata Basic School, Ramaniya Danda",
        "code": "2682",
        "voters": "716",
        "range": "S.No. 1 to 716",
        "lat": 28.088529,
        "lng": 83.903301,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #69 =====
    {
        "municipality": "Putalibazar",
        "ward": "8",
        "station": "Nuwakot Ma.Vi., Bhandyang (Ka)",
        "code": "2684",
        "voters": "644",
        "range": "S.No. 1 to 644",
        "lat": 28.097846,
        "lng": 83.928965,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #70 =====
    {
        "municipality": "Putalibazar",
        "ward": "8",
        "station": "Nuwakot Ma.Vi., Bhandyang (Kha)",
        "code": "",
        "voters": "696",
        "range": "S.No. 645 to 1340",
        "lat": 28.097117,
        "lng": 83.92981,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #71 =====
    {
        "municipality": "Putalibazar",
        "ward": "9",
        "station": "Jana Vikas Basic School, Naunche",
        "code": "2688",
        "voters": "849",
        "range": "S.No. 1 to 849",
        "lat": 28.083939,
        "lng": 83.925287,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #72 =====
    {
        "municipality": "Putalibazar",
        "ward": "9",
        "station": "Kolma Barahchaur Ma.Vi., Kolma Barahchaur",
        "code": "2689",
        "voters": "1052",
        "range": "S.No. 1 to 1052",
        "lat": 28.079815,
        "lng": 83.952568,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #73 =====
    {
        "municipality": "Putalibazar",
        "ward": "10",
        "station": "Chakramala Basic School, Rangkhola Bazar (Ka)",
        "code": "2790",
        "voters": "784",
        "range": "S.No. 1 to 784",
        "lat": 28.079429,
        "lng": 83.853588,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #74 =====
    {
        "municipality": "Putalibazar",
        "ward": "10",
        "station": "Chakramala Basic School, Rangkhola Bazar (Kha)",
        "code": "",
        "voters": "812",
        "range": "S.No. 785 to 1596",
        "lat": 28.079694,
        "lng": 83.852544,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #75 =====
    {
        "municipality": "Putalibazar",
        "ward": "10",
        "station": "Chakramala Basic School, Rangkhola Bazar (Ga)",
        "code": "",
        "voters": "816",
        "range": "S.No. 1597 to 2412",
        "lat": 28.079883,
        "lng": 83.85346,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #76 =====
    {
        "municipality": "Putalibazar",
        "ward": "11",
        "station": "Divya Gyan Community Basic School, Uniyachaur (Ka)",
        "code": "2794",
        "voters": "784",
        "range": "S.No. 1 to 784",
        "lat": 28.078557,
        "lng": 83.839413,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #77 =====
    {
        "municipality": "Putalibazar",
        "ward": "11",
        "station": "Divya Gyan Community Basic School, Uniyachaur (Kha)",
        "code": "",
        "voters": "784",
        "range": "S.No. 785 to 1568",
        "lat": 28.07982,
        "lng": 83.83933,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #78 =====
    {
        "municipality": "Putalibazar",
        "ward": "11",
        "station": "Divya Gyan Community Basic School, Uniyachaur (Ga)",
        "code": "",
        "voters": "786",
        "range": "S.No. 1569 to 2354",
        "lat": 28.079843,
        "lng": 83.839219,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #79 =====
    {
        "municipality": "Putalibazar",
        "ward": "12",
        "station": "Manakamana Ma.Vi., Pelkachaur (Ka)",
        "code": "2883",
        "voters": "644",
        "range": "S.No. 1 to 644",
        "lat": 28.054887,
        "lng": 83.835494,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #80 =====
    {
        "municipality": "Putalibazar",
        "ward": "12",
        "station": "Manakamana Ma.Vi., Pelkachaur (Kha)",
        "code": "",
        "voters": "677",
        "range": "S.No. 645 to 1321",
        "lat": 28.054999,
        "lng": 83.835567,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #81 =====
    {
        "municipality": "Putalibazar",
        "ward": "12",
        "station": "Janata Basic School, Simle",
        "code": "2890",
        "voters": "304",
        "range": "S.No. 1 to 304",
        "lat": 28.046272,
        "lng": 83.846498,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #82 =====
    {
        "municipality": "Putalibazar",
        "ward": "13",
        "station": "Jana Priya Basic School, Karabuje (Ka)",
        "code": "2780",
        "voters": "588",
        "range": "S.No. 1 to 588",
        "lat": 28.093129,
        "lng": 83.80004,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #83 =====
    {
        "municipality": "Putalibazar",
        "ward": "13",
        "station": "Jana Priya Basic School, Karabuje (Kha)",
        "code": "",
        "voters": "631",
        "range": "S.No. 589 to 1219",
        "lat": 28.091455,
        "lng": 83.80051,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #84 =====
    {
        "municipality": "Putalibazar",
        "ward": "13",
        "station": "Matribhumi Ma.Vi., Sataha Hatiya (Ka)",
        "code": "2786",
        "voters": "840",
        "range": "S.No. 1 to 840",
        "lat": 28.099994,
        "lng": 83.834051,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #85 =====
    {
        "municipality": "Putalibazar",
        "ward": "13",
        "station": "Matribhumi Ma.Vi., Sataha Hatiya (Kha)",
        "code": "",
        "voters": "868",
        "range": "S.No. 841 to 1708",
        "lat": 28.100432,
        "lng": 83.833757,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #86 =====
    {
        "municipality": "Putalibazar",
        "ward": "13",
        "station": "Matribhumi Ma.Vi., Sataha Hatiya (Ga)",
        "code": "",
        "voters": "868",
        "range": "S.No. 1709 to 2576",
        "lat": 28.100796,
        "lng": 83.834182,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #87 =====
    {
        "municipality": "Putalibazar",
        "ward": "13",
        "station": "Shanti Priya Basic School Gairi Pokhari (Ka)",
        "code": "9928",
        "voters": "672",
        "range": "S.No. 1 to 672",
        "lat": 28.103492,
        "lng": 83.810551,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #88 =====
    {
        "municipality": "Putalibazar",
        "ward": "13",
        "station": "Shanti Priya Basic School Gairi Pokhari (Kha)",
        "code": "",
        "voters": "679",
        "range": "S.No. 673 to 1351",
        "lat": 28.104051,
        "lng": 83.809315,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #89 =====
    {
        "municipality": "Putalibazar",
        "ward": "14",
        "station": "Rajasthal Ma.Vi., Satau (Ka)",
        "code": "2771",
        "voters": "980",
        "range": "S.No. 1 to 980",
        "lat": 28.121456,
        "lng": 83.828981,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #90 =====
    {
        "municipality": "Putalibazar",
        "ward": "14",
        "station": "Rajasthal Ma.Vi., Satau (Kha)",
        "code": "",
        "voters": "1006",
        "range": "S.No. 981 to 1986",
        "lat": 28.122139,
        "lng": 83.829451,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #91 =====
    {
        "municipality": "Putalibazar",
        "ward": "14",
        "station": "Shrawan Ma.Vi. Lamage (Ka)",
        "code": "2776",
        "voters": "812",
        "range": "S.No. 1 to 812",
        "lat": 28.105982,
        "lng": 83.855142,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #92 =====
    {
        "municipality": "Putalibazar",
        "ward": "14",
        "station": "Shrawan Ma.Vi. Lamage (Kha)",
        "code": "",
        "voters": "840",
        "range": "S.No. 813 to 1652",
        "lat": 28.105686,
        "lng": 83.855425,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #93 =====
    {
        "municipality": "Putalibazar",
        "ward": "14",
        "station": "Shrawan Ma.Vi. Lamage (Ga)",
        "code": "",
        "voters": "844",
        "range": "S.No. 1653 to 2496",
        "lat": 28.104876,
        "lng": 83.854584,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #94 =====
    {
        "municipality": "Phedikhola",
        "ward": "1",
        "station": "Damgade Ma.Vi., Damgade (Ka)",
        "code": "2647",
        "voters": "812",
        "range": "S.No. 1 to 812",
        "lat": 28.172406,
        "lng": 83.89726,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #95 =====
    {
        "municipality": "Phedikhola",
        "ward": "1",
        "station": "Damgade Ma.Vi., Damgade (Kha)",
        "code": "",
        "voters": "812",
        "range": "S.No. 813 to 1624",
        "lat": 28.171626,
        "lng": 83.898628,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #96 =====
    {
        "municipality": "Phedikhola",
        "ward": "1",
        "station": "Damgade Ma.Vi., Damgade (Ga)",
        "code": "",
        "voters": "862",
        "range": "S.No. 1625 to 2486",
        "lat": 28.171145,
        "lng": 83.897564,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #97 =====
    {
        "municipality": "Phedikhola",
        "ward": "2",
        "station": "Jana Sahayog Community Basic School, Syanchaur",
        "code": "2645",
        "voters": "541",
        "range": "S.No. 1 to 541",
        "lat": 28.17442,
        "lng": 83.879304,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #98 =====
    {
        "municipality": "Phedikhola",
        "ward": "2",
        "station": "Siddhartha Ma.Vi., Phedikhola (Ka)",
        "code": "2646",
        "voters": "868",
        "range": "S.No. 1 to 868",
        "lat": 28.150302,
        "lng": 83.884758,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #99 =====
    {
        "municipality": "Phedikhola",
        "ward": "2",
        "station": "Siddhartha Ma.Vi., Phedikhola (Kha)",
        "code": "",
        "voters": "868",
        "range": "S.No. 869 to 1736",
        "lat": 28.14927,
        "lng": 83.883122,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #100 =====
    {
        "municipality": "Phedikhola",
        "ward": "2",
        "station": "Siddhartha Ma.Vi., Phedikhola (Ga)",
        "code": "",
        "voters": "896",
        "range": "S.No. 1737 to 2632",
        "lat": 28.150407,
        "lng": 83.883795,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #101 =====
    {
        "municipality": "Phedikhola",
        "ward": "2",
        "station": "Siddhartha Ma.Vi., Phedikhola (Gha)",
        "code": "",
        "voters": "896",
        "range": "S.No. 2633 to 3528",
        "lat": 28.149483,
        "lng": 83.883146,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #102 =====
    {
        "municipality": "Phedikhola",
        "ward": "3",
        "station": "Sharada Ramaniya Danda Basic School, Pulakomukh",
        "code": "2603",
        "voters": "836",
        "range": "S.No. 1 to 836",
        "lat": 28.17177,
        "lng": 83.843565,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #103 =====
    {
        "municipality": "Phedikhola",
        "ward": "3",
        "station": "Jana Priya Ma.Vi., Parikabari (Ka)",
        "code": "2607",
        "voters": "588",
        "range": "S.No. 1 to 588",
        "lat": 28.160607,
        "lng": 83.857553,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #104 =====
    {
        "municipality": "Phedikhola",
        "ward": "3",
        "station": "Jana Priya Ma.Vi., Parikabari (Kha)",
        "code": "",
        "voters": "606",
        "range": "S.No. 589 to 1194",
        "lat": 28.160006,
        "lng": 83.858325,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #105 =====
    {
        "municipality": "Phedikhola",
        "ward": "4",
        "station": "Sitala Ma.Vi., Galem",
        "code": "2639",
        "voters": "865",
        "range": "S.No. 1 to 865",
        "lat": 28.20214,
        "lng": 83.841313,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #106 =====
    {
        "municipality": "Phedikhola",
        "ward": "4",
        "station": "Jana Adarsha Ma.Vi., Sherbazar (Ka)",
        "code": "2640",
        "voters": "812",
        "range": "S.No. 1 to 812",
        "lat": 28.182897,
        "lng": 83.855091,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #107 =====
    {
        "municipality": "Phedikhola",
        "ward": "4",
        "station": "Jana Adarsha Ma.Vi., Sherbazar (Kha)",
        "code": "",
        "voters": "829",
        "range": "S.No. 813 to 1641",
        "lat": 28.183179,
        "lng": 83.855154,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #108 =====
    {
        "municipality": "Phedikhola",
        "ward": "4",
        "station": "Adhkharka Basic School, Tokre",
        "code": "2642",
        "voters": "637",
        "range": "S.No. 1 to 637",
        "lat": 28.19699,
        "lng": 83.870687,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #109 =====
    {
        "municipality": "Phedikhola",
        "ward": "5",
        "station": "Barahi Basic School, Samaresh",
        "code": "2595",
        "voters": "324",
        "range": "S.No. 1 to 324",
        "lat": 28.187614,
        "lng": 83.830517,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #110 =====
    {
        "municipality": "Phedikhola",
        "ward": "5",
        "station": "Maidan Ma.Vi., Maidan",
        "code": "2598",
        "voters": "897",
        "range": "S.No. 1 to 897",
        "lat": 28.192858,
        "lng": 83.813414,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #111 =====
    {
        "municipality": "Bhirkot",
        "ward": "1",
        "station": "Raniraha Basic School, Lamachaur",
        "code": "3079",
        "voters": "819",
        "range": "S.No. 1 to 819",
        "lat": 28.056078,
        "lng": 83.806038,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #112 =====
    {
        "municipality": "Bhirkot",
        "ward": "1",
        "station": "Bhirkot Municipality Ward No. 1 Office, Bayarghari (Ka)",
        "code": "10229",
        "voters": "672",
        "range": "S.No. 1 to 672",
        "lat": 28.057355,
        "lng": 83.80421,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #113 =====
    {
        "municipality": "Bhirkot",
        "ward": "1",
        "station": "Bhirkot Municipality Ward No. 1 Office, Bayarghari (Kha)",
        "code": "",
        "voters": "692",
        "range": "S.No. 673 to 1364",
        "lat": 28.056435,
        "lng": 83.80471,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #114 =====
    {
        "municipality": "Bhirkot",
        "ward": "2",
        "station": "Krishi Sewa Kendra, Bayarghari (Ka)",
        "code": "3084",
        "voters": "644",
        "range": "S.No. 1 to 644",
        "lat": 28.029156,
        "lng": 83.790021,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #115 =====
    {
        "municipality": "Bhirkot",
        "ward": "2",
        "station": "Krishi Sewa Kendra, Bayarghari (Kha)",
        "code": "",
        "voters": "665",
        "range": "S.No. 645 to 1309",
        "lat": 28.030801,
        "lng": 83.788905,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #116 =====
    {
        "municipality": "Bhirkot",
        "ward": "2",
        "station": "Dhruwa Deurali Basic School, Balamadanda Kegha",
        "code": "3089",
        "voters": "995",
        "range": "S.No. 1 to 995",
        "lat": 28.031374,
        "lng": 83.791206,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #117 =====
    {
        "municipality": "Bhirkot",
        "ward": "3",
        "station": "Kalika Secondary School, Bheterpata",
        "code": "2894",
        "voters": "1036",
        "range": "S.No. 1 to 1036",
        "lat": 28.035733,
        "lng": 83.829573,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #118 =====
    {
        "municipality": "Bhirkot",
        "ward": "3",
        "station": "Shahid Shukra Ma.Vi., Bastra Deurali",
        "code": "2897",
        "voters": "1046",
        "range": "S.No. 1 to 1046",
        "lat": 28.033723,
        "lng": 83.828671,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #119 =====
    {
        "municipality": "Bhirkot",
        "ward": "3",
        "station": "Jana Jyoti Secondary School, Syanichaur Gumadi",
        "code": "2901",
        "voters": "1028",
        "range": "S.No. 1 to 1028",
        "lat": 28.034835,
        "lng": 83.831901,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #120 =====
    {
        "municipality": "Bhirkot",
        "ward": "4",
        "station": "Chhangchhangdi Basic School, Chhangchhangdi",
        "code": "3070",
        "voters": "818",
        "range": "S.No. 1 to 818",
        "lat": 28.020147,
        "lng": 83.791202,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #121 =====
    {
        "municipality": "Bhirkot",
        "ward": "4",
        "station": "Dabhungthati Ma.Vi., Dabhungthati",
        "code": "3074",
        "voters": "566",
        "range": "S.No. 1 to 566",
        "lat": 28.017142,
        "lng": 83.780769,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #122 =====
    {
        "municipality": "Waling",
        "ward": "3",
        "station": "Majhakot Shivalaya Ma.Vi., Majhakot",
        "code": "2905",
        "voters": "845",
        "range": "S.No. 1 to 845",
        "lat": 28.013174,
        "lng": 83.84133,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #123 =====
    {
        "municipality": "Waling",
        "ward": "3",
        "station": "Balrun Basic School, Koldanda",
        "code": "2908",
        "voters": "701",
        "range": "S.No. 1 to 701",
        "lat": 28.014344,
        "lng": 83.841723,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #124 =====
    {
        "municipality": "Waling",
        "ward": "4",
        "station": "Jethkanya Basic School, Eladi (Ka)",
        "code": "2959",
        "voters": "560",
        "range": "S.No. 1 to 560",
        "lat": 27.997954,
        "lng": 83.849567,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #125 =====
    {
        "municipality": "Waling",
        "ward": "4",
        "station": "Jethkanya Basic School, Eladi (Kha)",
        "code": "",
        "voters": "600",
        "range": "S.No. 561 to 1160",
        "lat": 27.997526,
        "lng": 83.848524,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #126 =====
    {
        "municipality": "Waling",
        "ward": "4",
        "station": "Janhit Basic School, Paudure",
        "code": "2962",
        "voters": "750",
        "range": "S.No. 1 to 750",
        "lat": 27.998196,
        "lng": 83.849828,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #127 =====
    {
        "municipality": "Waling",
        "ward": "4",
        "station": "Kusundanda A.Vi., Chihare",
        "code": "10231",
        "voters": "613",
        "range": "S.No. 1 to 613",
        "lat": 27.997731,
        "lng": 83.849272,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #128 =====
    {
        "municipality": "Biruwa",
        "ward": "1",
        "station": "Nava Jyoti Ma.Vi., Biruwa (Ka)",
        "code": "12034",
        "voters": "784",
        "range": "S.No. 1 to 784",
        "lat": 28.033694,
        "lng": 83.897359,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #129 =====
    {
        "municipality": "Biruwa",
        "ward": "1",
        "station": "Nava Jyoti Ma.Vi., Biruwa (Kha)",
        "code": "",
        "voters": "806",
        "range": "S.No. 785 to 1590",
        "lat": 28.032834,
        "lng": 83.897328,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #130 =====
    {
        "municipality": "Biruwa",
        "ward": "2",
        "station": "Jamune Danda Ma.Vi., Jamune Danda (Ka)",
        "code": "2873",
        "voters": "756",
        "range": "S.No. 1 to 756",
        "lat": 28.046688,
        "lng": 83.880406,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #131 =====
    {
        "municipality": "Biruwa",
        "ward": "2",
        "station": "Jamune Danda Ma.Vi., Jamune Danda (Kha)",
        "code": "",
        "voters": "780",
        "range": "S.No. 757 to 1536",
        "lat": 28.047384,
        "lng": 83.879172,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #132 =====
    {
        "municipality": "Biruwa",
        "ward": "2",
        "station": "Tulsichaur Basic School, Gaukha",
        "code": "2887",
        "voters": "301",
        "range": "S.No. 1 to 301",
        "lat": 28.05497,
        "lng": 83.857941,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #133 =====
    {
        "municipality": "Biruwa",
        "ward": "3",
        "station": "Shiddha Mandali Basic School, Khali (Ka)",
        "code": "2736",
        "voters": "700",
        "range": "S.No. 1 to 700",
        "lat": 28.06305,
        "lng": 83.883892,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #134 =====
    {
        "municipality": "Biruwa",
        "ward": "3",
        "station": "Shiddha Mandali Basic School, Khali (Kha)",
        "code": "",
        "voters": "735",
        "range": "S.No. 701 to 1435",
        "lat": 28.062626,
        "lng": 83.884257,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #135 =====
    {
        "municipality": "Biruwa",
        "ward": "3",
        "station": "Dhowadi Bhandyang Basic School, Dhowadi Bhandyang",
        "code": "2740",
        "voters": "489",
        "range": "S.No. 1 to 489",
        "lat": 28.06347,
        "lng": 83.896156,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #136 =====
    {
        "municipality": "Biruwa",
        "ward": "4",
        "station": "Divya Prakash Ma.Vi., Saunepani (Ka)",
        "code": "2726",
        "voters": "616",
        "range": "S.No. 1 to 616",
        "lat": 28.048883,
        "lng": 83.908943,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #137 =====
    {
        "municipality": "Biruwa",
        "ward": "4",
        "station": "Divya Prakash Ma.Vi., Saunepani (Kha)",
        "code": "",
        "voters": "637",
        "range": "S.No. 617 to 1253",
        "lat": 28.04763,
        "lng": 83.908013,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #138 =====
    {
        "municipality": "Biruwa",
        "ward": "4",
        "station": "Bhavishya Nirman Ma.Vi., Sthangaira (Ka)",
        "code": "2728",
        "voters": "728",
        "range": "S.No. 1 to 728",
        "lat": 28.065086,
        "lng": 83.918065,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #139 =====
    {
        "municipality": "Biruwa",
        "ward": "4",
        "station": "Bhavishya Nirman Ma.Vi., Sthangaira (Kha)",
        "code": "",
        "voters": "732",
        "range": "S.No. 729 to 1460",
        "lat": 28.064646,
        "lng": 83.918924,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #140 =====
    {
        "municipality": "Biruwa",
        "ward": "4",
        "station": "Khudi Basic School, Khorthape",
        "code": "2729",
        "voters": "841",
        "range": "S.No. 1 to 841",
        "lat": 28.058401,
        "lng": 83.933655,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #141 =====
    {
        "municipality": "Biruwa",
        "ward": "5",
        "station": "Kichanas Basic School, Nagasthan",
        "code": "2693",
        "voters": "886",
        "range": "S.No. 1 to 886",
        "lat": 28.012332,
        "lng": 83.926568,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #142 =====
    {
        "municipality": "Biruwa",
        "ward": "5",
        "station": "Devvani Basic School, Devisthan (Ka)",
        "code": "2696",
        "voters": "588",
        "range": "S.No. 1 to 588",
        "lat": 28.008,
        "lng": 83.909165,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #143 =====
    {
        "municipality": "Biruwa",
        "ward": "5",
        "station": "Devvani Basic School, Devisthan (Kha)",
        "code": "",
        "voters": "602",
        "range": "S.No. 589 to 1190",
        "lat": 28.007929,
        "lng": 83.909928,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #144 =====
    {
        "municipality": "Biruwa",
        "ward": "6",
        "station": "Jana Jagriti Basic School, Khanigaun",
        "code": "2923",
        "voters": "849",
        "range": "S.No. 1 to 849",
        "lat": 27.989408,
        "lng": 83.913438,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #145 =====
    {
        "municipality": "Biruwa",
        "ward": "6",
        "station": "Jana Priya Ma.Vi., Chittebas (Ka)",
        "code": "2927",
        "voters": "588",
        "range": "S.No. 1 to 588",
        "lat": 27.960854,
        "lng": 83.887436,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #146 =====
    {
        "municipality": "Biruwa",
        "ward": "6",
        "station": "Jana Priya Ma.Vi., Chittebas (Kha)",
        "code": "",
        "voters": "639",
        "range": "S.No. 589 to 1227",
        "lat": 27.959635,
        "lng": 83.885706,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #147 =====
    {
        "municipality": "Biruwa",
        "ward": "7",
        "station": "Jivan Jyoti Ma.Vi., Kumumbhandyang (Ka)",
        "code": "2914",
        "voters": "1008",
        "range": "S.No. 1 to 1008",
        "lat": 27.989793,
        "lng": 83.87044,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #148 =====
    {
        "municipality": "Biruwa",
        "ward": "7",
        "station": "Jivan Jyoti Ma.Vi., Kumumbhandyang (Kha)",
        "code": "",
        "voters": "1021",
        "range": "S.No. 1009 to 2029",
        "lat": 27.989127,
        "lng": 83.86961,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #149 =====
    {
        "municipality": "Biruwa",
        "ward": "8",
        "station": "Chaitanya Bhavani Basic School, Tallu Bhandyang",
        "code": "2918",
        "voters": "964",
        "range": "S.No. 1 to 964",
        "lat": 28.022353,
        "lng": 83.879006,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #150 =====
    {
        "municipality": "Biruwa",
        "ward": "8",
        "station": "Bhrung Chauki Ma.Vi., Methabhrung",
        "code": "10235",
        "voters": "1042",
        "range": "S.No. 1 to 1042",
        "lat": 28.000212,
        "lng": 83.892849,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #151 =====
    {
        "municipality": "Harinas",
        "ward": "1",
        "station": "Bhojprakash Ma.Vi. Saldanda (Ka)",
        "code": "2707",
        "voters": "728",
        "range": "S.No. 1 to 728",
        "lat": 28.049503,
        "lng": 83.94157,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #152 =====
    {
        "municipality": "Harinas",
        "ward": "1",
        "station": "Bhojprakash Ma.Vi. Saldanda (Kha)",
        "code": "",
        "voters": "751",
        "range": "S.No. 729 to 1479",
        "lat": 28.049575,
        "lng": 83.942496,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #153 =====
    {
        "municipality": "Harinas",
        "ward": "1",
        "station": "Thanapati A.Vi., Khairikot",
        "code": "10236",
        "voters": "459",
        "range": "S.No. 1 to 459",
        "lat": 28.029397,
        "lng": 83.935456,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #154 =====
    {
        "municipality": "Harinas",
        "ward": "2",
        "station": "Jana Kalyan Secondary School, Dhyarsingh Bhandyang (Ka)",
        "code": "2711",
        "voters": "644",
        "range": "S.No. 1 to 644",
        "lat": 28.033223,
        "lng": 83.981753,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #155 =====
    {
        "municipality": "Harinas",
        "ward": "2",
        "station": "Jana Kalyan Secondary School, Dhyarsingh Bhandyang (Kha)",
        "code": "",
        "voters": "668",
        "range": "S.No. 645 to 1312",
        "lat": 28.032846,
        "lng": 83.980379,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #156 =====
    {
        "municipality": "Harinas",
        "ward": "2",
        "station": "Mahima Ma.Vi., Chisapani",
        "code": "2712",
        "voters": "497",
        "range": "S.No. 1 to 497",
        "lat": 28.02262,
        "lng": 83.999655,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #157 =====
    {
        "municipality": "Harinas",
        "ward": "3",
        "station": "Kalika A.Vi., Dhupdanda (Ka)",
        "code": "10237",
        "voters": "1064",
        "range": "S.No. 1 to 1064",
        "lat": 28.012411,
        "lng": 83.954668,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #158 =====
    {
        "municipality": "Harinas",
        "ward": "3",
        "station": "Kalika A.Vi., Dhupdanda (Kha)",
        "code": "",
        "voters": "1064",
        "range": "S.No. 1065 to 2128",
        "lat": 28.011957,
        "lng": 83.953416,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #159 =====
    {
        "municipality": "Harinas",
        "ward": "4",
        "station": "Saraswati Basic School, Kulungkhola",
        "code": "2946",
        "voters": "282",
        "range": "S.No. 1 to 282",
        "lat": 28.003993,
        "lng": 83.975341,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #160 =====
    {
        "municipality": "Harinas",
        "ward": "4",
        "station": "Bal Jyoti Basic School Karanswara (Ka)",
        "code": "2952",
        "voters": "532",
        "range": "S.No. 1 to 532",
        "lat": 27.984994,
        "lng": 83.954466,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #161 =====
    {
        "municipality": "Harinas",
        "ward": "4",
        "station": "Bal Jyoti Basic School Karanswara (Kha)",
        "code": "",
        "voters": "587",
        "range": "S.No. 533 to 1119",
        "lat": 27.985892,
        "lng": 83.9528,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #162 =====
    {
        "municipality": "Harinas",
        "ward": "4",
        "station": "4 No. Ward Office, Rodikhola (Ka)",
        "code": "2954",
        "voters": "756",
        "range": "S.No. 1 to 756",
        "lat": 27.979453,
        "lng": 83.970673,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #163 =====
    {
        "municipality": "Harinas",
        "ward": "4",
        "station": "4 No. Ward Office, Rodikhola (Kha)",
        "code": "",
        "voters": "759",
        "range": "S.No. 757 to 1515",
        "lat": 27.979655,
        "lng": 83.970832,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #164 =====
    {
        "municipality": "Harinas",
        "ward": "5",
        "station": "Kalika Deurali Secondary School, Kalwa Deurali (Ka)",
        "code": "2931",
        "voters": "812",
        "range": "S.No. 1 to 812",
        "lat": 27.976358,
        "lng": 83.926569,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #165 =====
    {
        "municipality": "Harinas",
        "ward": "5",
        "station": "Kalika Deurali Secondary School, Kalwa Deurali (Kha)",
        "code": "",
        "voters": "854",
        "range": "S.No. 813 to 1666",
        "lat": 27.977046,
        "lng": 83.926223,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #166 =====
    {
        "municipality": "Harinas",
        "ward": "6",
        "station": "Pitambar Ma.Vi., Duddi (Ka)",
        "code": "2934",
        "voters": "756",
        "range": "S.No. 1 to 756",
        "lat": 27.947131,
        "lng": 83.927897,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #167 =====
    {
        "municipality": "Harinas",
        "ward": "6",
        "station": "Pitambar Ma.Vi., Duddi (Kha)",
        "code": "",
        "voters": "756",
        "range": "S.No. 757 to 1512",
        "lat": 27.94759,
        "lng": 83.92854,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #168 =====
    {
        "municipality": "Harinas",
        "ward": "6",
        "station": "Pitambar Ma.Vi., Duddi (Ga)",
        "code": "",
        "voters": "802",
        "range": "S.No. 1513 to 2314",
        "lat": 27.947014,
        "lng": 83.92915,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #169 =====
    {
        "municipality": "Harinas",
        "ward": "7",
        "station": "Siddha Basic School, Khaddrithok",
        "code": "2937",
        "voters": "1054",
        "range": "S.No. 1 to 1054",
        "lat": 27.954919,
        "lng": 83.955894,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #170 =====
    {
        "municipality": "Harinas",
        "ward": "7",
        "station": "Amala Bhandyang Ma.Vi., Changsing (Ka)",
        "code": "2942",
        "voters": "588",
        "range": "S.No. 1 to 588",
        "lat": 27.934015,
        "lng": 83.94992,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    },

    // ===== BOOTH #171 =====
    {
        "municipality": "Harinas",
        "ward": "7",
        "station": "Amala Bhandyang Ma.Vi., Changsing (Kha)",
        "code": "",
        "voters": "610",
        "range": "S.No. 589 to 1198",
        "lat": 27.933816,
        "lng": 83.951327,
        
        // ✏️ FILL IN BELOW
        "party": "UPDATE",  // Surya/Congress/RSP
        "visits": 0,  // 0-5+
        
        "demographics": {
            "maleVoters": 0,  // Count from voter list
            "femaleVoters": 0,  // Count from voter list
            "youngVoters": 0,  // Age 18-35
            "rspVoterPercent": 0  // Estimate 0-100
        },
        
        "boothRepresentatives": [
            {
                "name": "UPDATE_NAME",
                "role": "Booth President",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_2", 
                "role": "Booth Secretary",
                "phone": "98XXXXXXXX"
            },
            {
                "name": "UPDATE_REP_3",
                "role": "Booth Coordinator",
                "phone": "98XXXXXXXX"
            }
        ],
        
        "localKeyPeople": [
            {
                "name": "UPDATE_PERSON_1",
                "role": "UPDATE_ROLE",  // Teacher, Business Owner, etc.
                "phone": "98XXXXXXXX",
                "influence": "Medium",  // High/Medium/Low
                "support": "Neutral"  // RSP/Neutral/Opposition
            }
        ]
    }

];

// ===============================================
// QUICK REFERENCE GUIDE
// ===============================================
/*
PARTY OPTIONS:
- "Surya" = Surya Party dominant
- "Congress" = Congress Party dominant  
- "RSP" = RSP dominant

INFLUENCE LEVELS:
- "High" = Well-known, large network, respected
- "Medium" = Known locally, moderate network
- "Low" = New, building influence

SUPPORT LEVELS:
- "RSP" = Supports RSP
- "Neutral" = No strong political alignment
- "Opposition" = Supports other parties

RSP VOTER PERCENT GUIDE:
- 0-20% = Opposition stronghold
- 20-30% = Competitive
- 30-40% = Swing area
- 40-60% = RSP leaning
- 60-100% = RSP stronghold

COMMON ROLES FOR KEY PEOPLE:
- School Principal/Teacher
- Health Post In-charge
- Business Owner
- Cooperative President
- Women's Group Leader
- Youth Club President
- Community Leader
- Former VDC Secretary
- Ward Committee Member

COMMON TEAM MEMBER ROLES:
- Volunteer Coordinator
- Women's Wing Lead
- Youth Wing Lead
- Field Organizer
- Campaign Coordinator
*/
    
    // NOTE: After updating all 171 booths, the calculatePriority and 
    // calculateOppositionStrength functions will automatically use the 
    // demographics data to determine booth priorities and opposition strength

// ===============================================
// ENHANCED POPUP DISPLAY
// ===============================================
function createPopupContent(station) {
    // Calculate derived values
    station.priority = calculatePriority(
        station.voters, 
        station.visits, 
        station.party, 
        station.demographics.rspVoterPercent
    );
    station.oppositionStrength = calculateOppositionStrength(
        station.party, 
        station.voters, 
        station.demographics.rspVoterPercent
    );
    
    const priorityColors = {
        'critical': '#e74c3c',
        'high': '#f39c12',
        'medium': '#3498db',
        'low': '#95a5a6'
    };
    
    const oppositionColors = {
        'very_high': '#c0392b',
        'high': '#e74c3c',
        'medium': '#f39c12',
        'low': '#27ae60'
    };
    
    // Demographics HTML
    const demographicsHTML = `
        <div class="demo-row">
            <span>👨 Male:</span> <strong>${station.demographics.maleVoters}</strong>
        </div>
        <div class="demo-row">
            <span>👩 Female:</span> <strong>${station.demographics.femaleVoters}</strong>
        </div>
        <div class="demo-row">
            <span>👥 Young (18-35):</span> <strong>${station.demographics.youngVoters}</strong>
        </div>
        <div class="demo-row">
            <span>📊 RSP Support:</span> 
            <strong style="color: ${station.demographics.rspVoterPercent > 40 ? '#27ae60' : station.demographics.rspVoterPercent > 30 ? '#f39c12' : '#e74c3c'}">
                ${station.demographics.rspVoterPercent}%
            </strong>
        </div>
    `;
    
    // Booth Representatives HTML (RSP Representatives)
    const boothRepsHTML = station.boothRepresentatives.map(rep => `
        <div class="team-member-item">
            <strong>${rep.name}</strong>
            <span>${rep.role}</span>
            <span>📞 ${rep.phone}</span>
        </div>
    `).join('');
    
    // Key People HTML - Limited to 3 people
    const keyPeopleHTML = station.localKeyPeople.slice(0, 3).map(person => `
        <div class="key-person-item">
            <div class="key-person-header">
                <strong>${person.name}</strong>
                <span class="support-badge ${person.support.toLowerCase()}">${person.support}</span>
            </div>
            <div class="key-person-details">
                <div>${person.role}</div>
                <div>📞 ${person.phone}</div>
                <div>Influence: <strong>${person.influence}</strong></div>
            </div>
        </div>
    `).join('');
    
    return `
        <div class="popup-container">
            <div class="popup-header">
                <h3>${station.station}</h3>
                <span class="ward-badge">${station.municipality} - Ward ${station.ward}</span>
            </div>
            
            <div class="popup-body">
                <!-- Column 1: Basic Info -->
                <div class="popup-column">
                    <h4>📍 Basic Information</h4>
                    <div class="info-row"><span>Booth Code:</span> <strong>${station.code || 'N/A'}</strong></div>
                    <div class="info-row"><span>Total Voters:</span> <strong>${station.voters}</strong></div>
                    <div class="info-row"><span>Voter Range:</span> <strong>${station.range}</strong></div>
                    <div class="info-row"><span>Campaign Visits:</span> <strong>${station.visits}</strong></div>
                    
                    <h4 style="margin-top: 15px;">📊 Demographics</h4>
                    ${demographicsHTML}
                    
                    <h4 style="margin-top: 15px;">⚠️ Campaign Status</h4>
                    <div class="info-row">
                        <span>Priority:</span> 
                        <strong style="color: ${priorityColors[station.priority]}">${station.priority.toUpperCase()}</strong>
                    </div>
                    <div class="info-row">
                        <span>Opposition:</span> 
                        <strong style="color: ${oppositionColors[station.oppositionStrength]}">${station.oppositionStrength.replace('_', ' ').toUpperCase()}</strong>
                    </div>
                </div>
                
                <!-- Column 2: RSP Booth Representatives -->
                <div class="popup-column">
                    <h4>🎯 RSP Booth Representatives</h4>
                    <div class="team-list">
                        ${boothRepsHTML}
                    </div>
                </div>
                
                <!-- Column 3: Local Key People -->
                <div class="popup-column">
                    <h4>🌟 Local Key People</h4>
                    <div class="key-people-list">
                        ${keyPeopleHTML}
                    </div>
                    
                    <div class="action-buttons" style="margin-top: 20px;">
                        <button onclick="viewDetails('${station.code}')" class="btn-action">
                            📋 Full Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===============================================
// MAP MARKER CREATION
// ===============================================
let markers = [];

function addMarkersToMap() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Filter stations based on current filters
    const filteredStations = pollingStationsData.filter(station => {
        // Calculate priority and opposition strength
        station.priority = calculatePriority(
            station.voters, 
            station.visits, 
            station.party, 
            station.demographics.rspVoterPercent
        );
        station.oppositionStrength = calculateOppositionStrength(
            station.party, 
            station.voters, 
            station.demographics.rspVoterPercent
        );
        
        if (currentFilters.party !== 'all' && station.party !== currentFilters.party) return false;
        if (currentFilters.municipality !== 'all' && station.municipality !== currentFilters.municipality) return false;
        if (currentFilters.priority !== 'all' && station.priority !== currentFilters.priority) return false;
        
        if (currentFilters.visits !== 'all') {
            if (currentFilters.visits === 0 && station.visits !== 0) return false;
            if (currentFilters.visits === '1-2' && (station.visits < 1 || station.visits > 2)) return false;
            if (currentFilters.visits === '3+' && station.visits < 3) return false;
        }
        
        return true;
    });
    
    // Add markers for filtered stations
    filteredStations.forEach(station => {
        const icon = createIcon(station.municipality, station.party, station.visits, station.priority);
        const marker = L.marker([station.lat, station.lng], { icon: icon })
            .bindPopup(createPopupContent(station), {
                maxWidth: 900,
                className: 'custom-popup'
            })
            .addTo(map);
        
        markers.push(marker);
    });
    
    updateStatistics();
    updateInsights();
}

// ===============================================
// FILTERING FUNCTIONS
// ===============================================
let currentFilters = {
    party: 'all',
    visits: 'all',
    municipality: 'all',
    priority: 'all'
};

function filterByParty(party) {
    currentFilters.party = party;
    updateActiveButton('.party-btn', party);
    addMarkersToMap();
}

function filterByVisits(visits) {
    currentFilters.visits = visits;
    updateActiveButton('.visit-btn', visits);
    addMarkersToMap();
}

function filterByMunicipality(municipality) {
    currentFilters.municipality = municipality;
    updateActiveButton('.mun-btn', municipality);
    addMarkersToMap();
}

function filterByPriority(priority) {
    currentFilters.priority = priority;
    updateActiveButton('[data-priority]', priority);
    addMarkersToMap();
}

function resetAllFilters() {
    currentFilters = {
        party: 'all',
        visits: 'all',
        municipality: 'all',
        priority: 'all'
    };
    
    document.querySelectorAll('.party-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.party-btn[data-party="all"]')?.classList.add('active');
    
    document.querySelectorAll('.visit-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.visit-btn[data-visits="all"]')?.classList.add('active');
    
    document.querySelectorAll('.mun-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.mun-btn[data-mun="all"]')?.classList.add('active');
    
    document.querySelectorAll('[data-priority]').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-priority="all"]')?.classList.add('active');
    
    addMarkersToMap();
}

function updateActiveButton(selector, value) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.classList.remove('active');
        const btnValue = btn.dataset.party || btn.dataset.visits || btn.dataset.mun || btn.dataset.priority;
        if (btnValue === value || btnValue === String(value)) {
            btn.classList.add('active');
        }
    });
}

// ===============================================
// STATISTICS UPDATE
// ===============================================
function updateStatistics() {
    const visibleStations = pollingStationsData.filter(station => {
        station.priority = calculatePriority(
            station.voters, 
            station.visits, 
            station.party, 
            station.demographics.rspVoterPercent
        );
        
        if (currentFilters.party !== 'all' && station.party !== currentFilters.party) return false;
        if (currentFilters.municipality !== 'all' && station.municipality !== currentFilters.municipality) return false;
        if (currentFilters.priority !== 'all' && station.priority !== currentFilters.priority) return false;
        if (currentFilters.visits !== 'all') {
            if (currentFilters.visits === 0 && station.visits !== 0) return false;
            if (currentFilters.visits === '1-2' && (station.visits < 1 || station.visits > 2)) return false;
            if (currentFilters.visits === '3+' && station.visits < 3) return false;
        }
        return true;
    });
    
    const suryaCount = visibleStations.filter(s => s.party === 'Surya').length;
    const congressCount = visibleStations.filter(s => s.party === 'Congress').length;
    const rspCount = visibleStations.filter(s => s.party === 'RSP').length;
    const criticalCount = visibleStations.filter(s => s.priority === 'critical').length;
    const totalVoters = visibleStations.reduce((sum, s) => sum + parseInt(s.voters), 0);
    
    // Calculate total team members across all booths
    const totalVolunteers = visibleStations.reduce((sum, s) => 
        sum + s.teamMembers.length + s.localKeyPeople.length + 1, 0); // +1 for booth leader
    
    const avgVisits = visibleStations.length > 0 
        ? (visibleStations.reduce((sum, s) => sum + s.visits, 0) / visibleStations.length).toFixed(1)
        : 0;
    
    const visitedCount = visibleStations.filter(s => s.visits > 0).length;
    const coveragePercent = visibleStations.length > 0 
        ? ((visitedCount / visibleStations.length) * 100).toFixed(0)
        : 0;
    
    // Calculate demographic totals
    const totalMaleVoters = visibleStations.reduce((sum, s) => sum + s.demographics.maleVoters, 0);
    const totalFemaleVoters = visibleStations.reduce((sum, s) => sum + s.demographics.femaleVoters, 0);
    const totalYoungVoters = visibleStations.reduce((sum, s) => sum + s.demographics.youngVoters, 0);
    const avgRSPSupport = visibleStations.length > 0
        ? (visibleStations.reduce((sum, s) => sum + s.demographics.rspVoterPercent, 0) / visibleStations.length).toFixed(1)
        : 0;
    
    document.getElementById('total-booths').textContent = visibleStations.length;
    document.getElementById('total-voters').textContent = totalVoters.toLocaleString();
    document.getElementById('campaign-progress').textContent = coveragePercent + '%';
    
    // Update mobile header stats
    const mobileBooths = document.getElementById('total-booths-mobile');
    const mobileVoters = document.getElementById('total-voters-mobile');
    const criticalCountEl = document.getElementById('critical-count');
    if (mobileBooths) mobileBooths.textContent = visibleStations.length;
    if (mobileVoters) mobileVoters.textContent = (totalVoters / 1000).toFixed(0) + 'k';
    if (criticalCountEl) criticalCountEl.textContent = criticalCount;
    
    // Update stat cards
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 6) {
        statCards[0].querySelector('.stat-value').textContent = suryaCount;
        statCards[1].querySelector('.stat-value').textContent = congressCount;
        statCards[2].querySelector('.stat-value').textContent = rspCount;
        statCards[3].querySelector('.stat-value').textContent = avgVisits;
        statCards[4].querySelector('.stat-value').textContent = criticalCount;
        statCards[5].querySelector('.stat-value').textContent = totalVolunteers;
    }
    
    // Update progress bars
    const totalBooths = pollingStationsData.length;
    updateProgressBar('.progress-bar-fill.surya', (suryaCount / totalBooths) * 100, suryaCount);
    updateProgressBar('.progress-bar-fill.congress', (congressCount / totalBooths) * 100, congressCount);
    updateProgressBar('.progress-bar-fill.rsp', (rspCount / totalBooths) * 100, rspCount);
    updateProgressBar('.progress-bar-fill.visited', coveragePercent, visitedCount);
    updateProgressBar('.progress-bar-fill.critical', (criticalCount / totalBooths) * 100, criticalCount);
    
    // Also update new progress-fill classes
    updateProgressBar('.progress-fill.surya', (suryaCount / totalBooths) * 100, suryaCount);
    updateProgressBar('.progress-fill.congress', (congressCount / totalBooths) * 100, congressCount);
    updateProgressBar('.progress-fill.rsp', (rspCount / totalBooths) * 100, rspCount);
    updateProgressBar('.progress-fill.coverage', coveragePercent, visitedCount);
}

function updateProgressBar(selector, percent, value) {
    const bar = document.querySelector(selector);
    if (bar) {
        bar.style.width = percent + '%';
        if (percent > 15) {
            bar.textContent = Math.round(percent) + '%';
        } else {
            bar.textContent = '';
        }
    }
}

// ===============================================
// INSIGHTS UPDATE
// ===============================================
function updateInsights() {
    const insights = [];
    
    // Calculate metrics
    const unvisitedBooths = pollingStationsData.filter(s => s.visits === 0);
    const criticalBooths = pollingStationsData.filter(s => {
        s.priority = calculatePriority(s.voters, s.visits, s.party, s.demographics.rspVoterPercent);
        return s.priority === 'critical';
    });
    const highOppositionBooths = pollingStationsData.filter(s => {
        s.oppositionStrength = calculateOppositionStrength(s.party, s.voters, s.demographics.rspVoterPercent);
        return s.oppositionStrength === 'very_high';
    });
    const wellCoveredBooths = pollingStationsData.filter(s => s.visits >= 3);
    const strongRSPBooths = pollingStationsData.filter(s => s.demographics.rspVoterPercent > 40);
    
    // Generate insights
    if (unvisitedBooths.length > 0) {
        insights.push({
            type: 'critical',
            text: `${unvisitedBooths.length} booths remain unvisited. Immediate deployment required!`
        });
    }
    
    if (criticalBooths.length > 0) {
        insights.push({
            type: 'warning',
            text: `${criticalBooths.length} critical priority booths need intensive campaigning.`
        });
    }
    
    if (highOppositionBooths.length > 0) {
        insights.push({
            type: 'warning',
            text: `${highOppositionBooths.length} booths have very high opposition strength.`
        });
    }
    
    if (wellCoveredBooths.length > 0) {
        insights.push({
            type: 'success',
            text: `${wellCoveredBooths.length} booths have good campaign coverage (3+ visits).`
        });
    }
    
    if (strongRSPBooths.length > 0) {
        insights.push({
            type: 'success',
            text: `${strongRSPBooths.length} booths show strong RSP support (>40%).`
        });
    }
    
    const totalVoters = pollingStationsData.reduce((sum, s) => sum + parseInt(s.voters), 0);
    insights.push({
        type: 'success',
        text: `Total voter base: ${totalVoters.toLocaleString()} across ${pollingStationsData.length} polling booths.`
    });
    
    const insightsContainer = document.getElementById('insights-container');
    if (insightsContainer) {
        insightsContainer.innerHTML = insights.map(insight => `
            <div class="insight-item ${insight.type}">
                <i class="fas ${insight.type === 'critical' ? 'fa-exclamation-circle' : insight.type === 'warning' ? 'fa-exclamation-triangle' : 'fa-check-circle'}"></i>
                <span>${insight.text}</span>
            </div>
        `).join('');
    }
}

// ===============================================
// QUICK ACTION FUNCTIONS
// ===============================================
function showHighPriorityBooths() {
    currentFilters.priority = 'critical';
    updateActiveButton('[data-priority]', 'critical');
    addMarkersToMap();
    map.setView([28.07, 83.87], 11);
}

function showUnvisitedBooths() {
    currentFilters.visits = 0;
    updateActiveButton('.visit-btn', 0);
    addMarkersToMap();
    map.setView([28.07, 83.87], 11);
}

function showTopVoterBooths() {
    resetAllFilters();
    const sortedBooths = [...pollingStationsData].sort((a, b) => parseInt(b.voters) - parseInt(a.voters));
    const topBooth = sortedBooths[0];
    map.setView([topBooth.lat, topBooth.lng], 13);
}

function scheduleVisit(stationName) {
    alert(`Scheduling visit for: ${stationName}\n\nThis will open the visit scheduling interface.`);
}

function callLeader(phone) {
    window.location.href = `tel:${phone}`;
}

function viewDetails(code) {
    alert(`Loading detailed report for booth code: ${code}`);
}

function exportCampaignData() {
    alert('Campaign data export feature - generates comprehensive PDF report with all booth statistics, team assignments, demographics, and strategic recommendations.');
}

// ===============================================
// INITIALIZATION
// ===============================================
addMarkersToMap();

// Update last sync time
setInterval(() => {
    const now = new Date();
    document.getElementById('last-update').textContent = now.toLocaleTimeString();
}, 60000);
