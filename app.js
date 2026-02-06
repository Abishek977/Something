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
// WITH DEMOGRAPHICS, KEY PEOPLE & LOCAL ISSUES
// ===============================================
// ===============================================
// UPDATED DATA TEMPLATE - ALL 171 BOOTHS
// Enhanced with Local Issues and Booth Representatives
// ===============================================

const pollingStationsData = [
    // ===== BOOTH #1 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "1",
        "station": "Parkanya Ma.Vi., Ajayameru Shree (Ka)",
        "code": "3109",
        "voters": "1064",
        "range": "S.No. 1 to 1064",
        "lat": 28.088265,
        "lng": 83.744582,
        "party": "RSP",
        "visits": 1,
        "demographics": {
            "maleVoters": 521,
            "femaleVoters": 542,
            "youngVoters": 287,
            "rspVoterPercent": 33
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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

    // ===== BOOTH #2 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "1",
        "station": "Parkanya Ma.Vi., Ajayameru Shree (Kha)",
        "code": "",
        "voters": "1064",
        "range": "S.No. 1065 to 2128",
        "lat": 28.089678,
        "lng": 83.744219,
        "party": "RSP",
        "visits": 2,
        "demographics": {
            "maleVoters": 521,
            "femaleVoters": 542,
            "youngVoters": 287,
            "rspVoterPercent": 36
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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

    // ===== BOOTH #3 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "1",
        "station": "Parkanya Ma.Vi., Ajayameru Shree (Ga)",
        "code": "",
        "voters": "1079",
        "range": "S.No. 2129 to 3207",
        "lat": 28.08868,
        "lng": 83.745727,
        "party": "RSP",
        "visits": 3,
        "demographics": {
            "maleVoters": 528,
            "femaleVoters": 550,
            "youngVoters": 291,
            "rspVoterPercent": 39
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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

    // ===== BOOTH #4 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "2",
        "station": "Ranicharri Basic School, Khate (Ka)",
        "code": "3113",
        "voters": "1064",
        "range": "S.No. 1 to 1064",
        "lat": 28.084101,
        "lng": 83.773558,
        "party": "RSP",
        "visits": 4,
        "demographics": {
            "maleVoters": 521,
            "femaleVoters": 542,
            "youngVoters": 287,
            "rspVoterPercent": 42
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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

    // ===== BOOTH #5 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "2",
        "station": "Ranicharri Basic School, Khate (Kha)",
        "code": "",
        "voters": "1075",
        "range": "S.No. 1065 to 2139",
        "lat": 28.083686,
        "lng": 83.772998,
        "party": "RSP",
        "visits": 5,
        "demographics": {
            "maleVoters": 526,
            "femaleVoters": 548,
            "youngVoters": 290,
            "rspVoterPercent": 45
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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

    // ===== BOOTH #6 =====
    {
        "municipality": "Arjunchaupari",
        "ward": "3",
        "station": "Saraswati Basic School, Adhikharka",
        "code": "3120",
        "voters": "517",
        "range": "S.No. 1 to 517",
        "lat": 28.098717,
        "lng": 83.725123,
        "party": "RSP",
        "visits": 0,
        "demographics": {
            "maleVoters": 253,
            "femaleVoters": 263,
            "youngVoters": 139,
            "rspVoterPercent": 48
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
        "party": "UPDATE",
        "visits": 0,
        "demographics": {
            "maleVoters": 0,
            "femaleVoters": 0,
            "youngVoters": 0,
            "rspVoterPercent": 0
        },
        "localIssues": {
            "roadAccessibility": "Medium",
            "healthCare": "Low",
            "education": "High",
            "tourism": "Low",
            "employment": "Medium"
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
                "influence": "High",
                "support": "RSP"
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
    }
];

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = pollingStationsData;
}

// ===============================================
// POPUP CONTENT CREATION WITH LOCAL ISSUES
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

    // Get color for issue level
    function getIssueColor(level) {
        if (level === 'High') return '#27ae60';
        if (level === 'Medium') return '#f39c12';
        if (level === 'Low') return '#e74c3c';
        return '#95a5a6';
    }
    
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

    // Local Issues HTML
    const localIssuesHTML = `
        <div class="issue-item">
            <span>🛣️ Road Access:</span>
            <strong style="color: ${getIssueColor(station.localIssues.roadAccessibility)}">${station.localIssues.roadAccessibility}</strong>
        </div>
        <div class="issue-item">
            <span>🏥 Health Care:</span>
            <strong style="color: ${getIssueColor(station.localIssues.healthCare)}">${station.localIssues.healthCare}</strong>
        </div>
        <div class="issue-item">
            <span>📚 Education:</span>
            <strong style="color: ${getIssueColor(station.localIssues.education)}">${station.localIssues.education}</strong>
        </div>
        <div class="issue-item">
            <span>🏞️ Tourism:</span>
            <strong style="color: ${getIssueColor(station.localIssues.tourism)}">${station.localIssues.tourism}</strong>
        </div>
        <div class="issue-item">
            <span>💼 Employment:</span>
            <strong style="color: ${getIssueColor(station.localIssues.employment)}">${station.localIssues.employment}</strong>
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
                
                <!-- Column 2: RSP Booth Representatives & Local Issues -->
                <div class="popup-column">
                    <h4>🎯 RSP Booth Representatives</h4>
                    <div class="team-list">
                        ${boothRepsHTML}
                    </div>

                    <h4 style="margin-top: 15px;">📋 Local Issues & Demands</h4>
                    <div class="issues-list">
                        ${localIssuesHTML}
                    </div>
                </div>
                
                <!-- Column 3: Local Key People & Local Issues -->
                <div class="popup-column">
                    <h4>🌟 Local Key People</h4>
                    <div class="key-people-list">
                        ${keyPeopleHTML}
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
        const marker = L.marker([station.lat, station.lng], {
            icon: createIcon(station.municipality, station.party, station.visits, station.priority)
        })
            .bindPopup(createPopupContent(station), {
                maxWidth: 900,
                className: 'custom-popup'
            })
            .addTo(map);
        
        markers.push(marker);
    });
    
    // Update statistics
    updateStatistics();
}

// ===============================================
// FILTER STATE & FUNCTIONS
// ===============================================
let currentFilters = {
    party: 'all',
    visits: 'all',
    municipality: 'all',
    priority: 'all'
};

function filterByParty(party) {
    currentFilters.party = party;
    updateActiveButton('.party-btn', 'party', party);
    addMarkersToMap();
}

function filterByVisits(visits) {
    currentFilters.visits = visits;
    updateActiveButton('.visit-btn', 'visits', visits);
    addMarkersToMap();
}

function filterByMunicipality(municipality) {
    currentFilters.municipality = municipality;
    updateActiveButton('.mun-btn', 'mun', municipality);
    addMarkersToMap();
}

function filterByPriority(priority) {
    currentFilters.priority = priority;
    updateActiveButton('[data-priority]', 'priority', priority);
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

function updateActiveButton(selector, dataAttr, value) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.classList.remove('active');
        const btnValue = btn.getAttribute(`data-${dataAttr}`);
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
    
    const totalBooths = visibleStations.length;
    const totalVoters = visibleStations.reduce((sum, s) => sum + parseInt(s.voters), 0);
    const totalVisits = visibleStations.reduce((sum, s) => sum + s.visits, 0);
    const avgVisits = totalBooths > 0 ? (totalVisits / totalBooths).toFixed(1) : 0;
    const criticalCount = visibleStations.filter(s => s.priority === 'critical').length;
    const visitedCount = visibleStations.filter(s => s.visits > 0).length;
    const campaignProgress = totalBooths > 0 ? Math.round((visitedCount / totalBooths) * 100) : 0;
    
    // Update header stats
    document.getElementById('total-booths').textContent = totalBooths;
    document.getElementById('total-voters').textContent = totalVoters.toLocaleString();
    document.getElementById('campaign-progress').textContent = campaignProgress + '%';
    
    // Update dashboard stats
    document.querySelectorAll('.stat-card .stat-value')[0].textContent = totalBooths;
    document.querySelectorAll('.stat-card .stat-value')[1].textContent = totalVoters.toLocaleString();
    document.querySelectorAll('.stat-card .stat-value')[2].textContent = avgVisits;
    document.querySelectorAll('.stat-card .stat-value')[3].textContent = criticalCount;
    
    // Update progress bars
    const suryaPercent = totalBooths > 0 ? Math.round((suryaCount / totalBooths) * 100) : 0;
    const congressPercent = totalBooths > 0 ? Math.round((congressCount / totalBooths) * 100) : 0;
    const rspPercent = totalBooths > 0 ? Math.round((rspCount / totalBooths) * 100) : 0;
    const visitedPercent = campaignProgress;
    const criticalPercent = totalBooths > 0 ? Math.round((criticalCount / totalBooths) * 100) : 0;
    
    document.querySelectorAll('.progress-bar-fill')[0].style.width = suryaPercent + '%';
    document.querySelectorAll('.progress-bar-fill')[0].textContent = suryaPercent + '%';
    
    document.querySelectorAll('.progress-bar-fill')[1].style.width = congressPercent + '%';
    document.querySelectorAll('.progress-bar-fill')[1].textContent = congressPercent + '%';
    
    document.querySelectorAll('.progress-bar-fill')[2].style.width = rspPercent + '%';
    document.querySelectorAll('.progress-bar-fill')[2].textContent = rspPercent + '%';
    
    document.querySelectorAll('.progress-bar-fill')[3].style.width = visitedPercent + '%';
    document.querySelectorAll('.progress-bar-fill')[3].textContent = visitedPercent + '%';
    
    document.querySelectorAll('.progress-bar-fill')[4].style.width = criticalPercent + '%';
    document.querySelectorAll('.progress-bar-fill')[4].textContent = criticalPercent + '%';
    
    // Generate insights
    const insights = [];
    if (criticalCount > 0) {
        insights.push({
            icon: 'fas fa-exclamation-circle',
            text: `${criticalCount} critical booths need immediate attention`,
            type: 'critical'
        });
    }
    
    const unvisitedCount = visibleStations.filter(s => s.visits === 0).length;
    if (unvisitedCount > 0) {
        insights.push({
            icon: 'fas fa-map-marked-alt',
            text: `${unvisitedCount} booths not yet visited`,
            type: 'warning'
        });
    }
    
    if (rspPercent < 30) {
        insights.push({
            icon: 'fas fa-chart-line',
            text: `RSP dominance at ${rspPercent}% - need to expand coverage`,
            type: 'warning'
        });
    } else if (rspPercent > 50) {
        insights.push({
            icon: 'fas fa-thumbs-up',
            text: `Strong RSP presence at ${rspPercent}%`,
            type: 'success'
        });
    }
    
    if (campaignProgress < 50) {
        insights.push({
            icon: 'fas fa-running',
            text: `Campaign at ${campaignProgress}% - accelerate outreach`,
            type: 'info'
        });
    }
    
    // Update insights container
    const insightsContainer = document.getElementById('insights-container');
    if (insights.length > 0) {
        insightsContainer.innerHTML = insights.map(insight => `
            <div class="insight-item ${insight.type}">
                <i class="${insight.icon}"></i>
                <span>${insight.text}</span>
            </div>
        `).join('');
    } else {
        insightsContainer.innerHTML = `
            <div class="insight-item success">
                <i class="fas fa-check-circle"></i>
                <span>Campaign running smoothly!</span>
            </div>
        `;
    }
}

// ===============================================
// QUICK ACTION FUNCTIONS
// ===============================================
function showHighPriorityBooths() {
    resetAllFilters();
    currentFilters.priority = 'critical';
    updateActiveButton('[data-priority]', 'priority', 'critical');
    addMarkersToMap();
}

function showUnvisitedBooths() {
    resetAllFilters();
    currentFilters.visits = 0;
    updateActiveButton('.visit-btn', 'visits', 0);
    addMarkersToMap();
}

function showTopVoterBooths() {
    resetAllFilters();
    const topBooths = [...pollingStationsData]
        .sort((a, b) => parseInt(b.voters) - parseInt(a.voters))
        .slice(0, 10);
    
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    topBooths.forEach(station => {
        station.priority = calculatePriority(
            station.voters, 
            station.visits, 
            station.party, 
            station.demographics.rspVoterPercent
        );
        
        const marker = L.marker([station.lat, station.lng], {
            icon: createIcon(station.municipality, station.party, station.visits, station.priority)
        })
            .bindPopup(createPopupContent(station), {
                maxWidth: 900,
                className: 'custom-popup'
            })
            .addTo(map);
        
        markers.push(marker);
    });
    
    if (topBooths.length > 0) {
        map.fitBounds(topBooths.map(s => [s.lat, s.lng]));
    }
}

function exportCampaignData() {
    const csvData = [];
    csvData.push(['Municipality', 'Ward', 'Station', 'Code', 'Voters', 'Party', 'Visits', 'Priority', 'RSP Support %'].join(','));
    
    pollingStationsData.forEach(station => {
        const priority = calculatePriority(
            station.voters, 
            station.visits, 
            station.party, 
            station.demographics.rspVoterPercent
        );
        
        csvData.push([
            station.municipality,
            station.ward,
            `"${station.station}"`,
            station.code,
            station.voters,
            station.party,
            station.visits,
            priority,
            station.demographics.rspVoterPercent
        ].join(','));
    });
    
    const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campaign-data.csv';
    a.click();
}

function viewDetails(code) {
    alert(`Viewing details for booth ${code}. Full details system coming soon!`);
}

// ===============================================
// INITIALIZATION
// ===============================================
document.addEventListener('DOMContentLoaded', function() {
    addMarkersToMap();
    updateStatistics();
    
    // Update last sync time
    const now = new Date();
    document.getElementById('last-update').textContent = now.toLocaleTimeString();
});
// === HAMBURGER MENU FUNCTIONALITY ===
(function() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(menuToggle);
    
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    const leftPanel = document.querySelector('.left-panel');
    
    menuToggle.onclick = function(e) {
        e.stopPropagation();
        leftPanel.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        this.querySelector('i').className = leftPanel.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    };
    
    menuOverlay.onclick = function() {
        leftPanel.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuToggle.querySelector('i').className = 'fas fa-bars';
    };
    
    leftPanel.onclick = function(e) {
        if (e.target.tagName === 'BUTTON' && window.innerWidth <= 900) {
            setTimeout(() => {
                leftPanel.classList.remove('active');
                menuOverlay.classList.remove('active');
                menuToggle.querySelector('i').className = 'fas fa-bars';
            }, 300);
        }
    };
})();
