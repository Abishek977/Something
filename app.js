// --- Map Initialization ---
const map = L.map('map', {
    center: [28.07, 83.87],  // Syangja District center
    zoom: 11,
    maxZoom: 18,
    minZoom: 9,
    scrollWheelZoom: true,
    zoomControl: true
});

// --- Base Layer ---
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

// --- Custom Icons for different municipalities (8 colors) ---
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

function createIcon(municipality, party, visits) {
    const color = municipalityColors[municipality] || '#95A5A6';
    const size = visits >= 3 ? 16 : visits >= 1 ? 14 : 12;
    
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style='background-color:${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);'></div>`,
        iconSize: [size + 4, size + 4],
        iconAnchor: [(size + 4) / 2, (size + 4) / 2]
    });
}

// --- Sample names for key personnel (Nepali names) ---
const nepaliNames = [
    'Ram Bahadur Sharma', 'Sita Kumari Thapa', 'Krishna Prasad Poudel',
    'Gita Devi Gurung', 'Hari Prasad Karki', 'Maya Kumari Rai',
    'Shyam Bahadur Tamang', 'Mina Kumari Sharma', 'Laxman Prasad Adhikari',
    'Kamala Devi Shrestha', 'Bhim Bahadur Magar', 'Radha Kumari Subedi',
    'Mohan Prasad Aryal', 'Saraswati Devi KC', 'Ramesh Kumar Thapa',
    'Sunita Kumari Pun', 'Govinda Prasad Ghimire', 'Laxmi Kumari Gautam',
    'Dipak Bahadur Rana', 'Anita Devi Pandey', 'Prakash Kumar Basnet',
    'Bimala Kumari Pokhrel', 'Nabin Prasad Khadka', 'Indira Kumari Bhandari',
    'Suresh Bahadur Thapa', 'Parvati Devi Ale', 'Keshab Prasad Regmi',
    'Sarita Kumari Rijal', 'Bishnu Prasad Mainali', 'Shova Kumari Dahal'
];

// --- Generate random contact details ---
function generateContacts() {
    const contacts = [];
    for (let i = 0; i < 3; i++) {
        const randomName = nepaliNames[Math.floor(Math.random() * nepaliNames.length)];
        const phone = `98${Math.floor(10000000 + Math.random() * 90000000)}`;
        contacts.push({ name: randomName, phone: phone });
    }
    return contacts;
}

// --- Generate random party affiliation ---
function getRandomParty() {
    const parties = ['Surya', 'Congress', 'RSP'];
    return parties[Math.floor(Math.random() * parties.length)];
}

// --- Generate random visit count ---
function getRandomVisits() {
    return Math.floor(Math.random() * 6); // 0 to 5 visits
}

// --- Polling stations data with CORRECTED coordinates (WGS84) ---
// Converted from Modified Everest 1830 / UTM Zone 45N to WGS84
const pollingStationsData = [
    {"municipality": "Arjunchaupari", "ward": "1", "station": "Parkanya Ma.Vi., Ajayameru Shree (Ka)", "code": "3109", "voters": "1064", "range": "S.No. 1 to 1064", "lat": 28.088265, "lng": 83.744582},
    {"municipality": "Arjunchaupari", "ward": "1", "station": "Parkanya Ma.Vi., Ajayameru Shree (Kha)", "code": "", "voters": "1064", "range": "S.No. 1065 to 2128", "lat": 28.089678, "lng": 83.744219},
    {"municipality": "Arjunchaupari", "ward": "1", "station": "Parkanya Ma.Vi., Ajayameru Shree (Ga)", "code": "", "voters": "1079", "range": "S.No. 2129 to 3207", "lat": 28.08868, "lng": 83.745727},
    {"municipality": "Arjunchaupari", "ward": "2", "station": "Ranicharri Basic School, Khate (Ka)", "code": "3113", "voters": "1064", "range": "S.No. 1 to 1064", "lat": 28.084101, "lng": 83.773558},
    {"municipality": "Arjunchaupari", "ward": "2", "station": "Ranicharri Basic School, Khate (Kha)", "code": "", "voters": "1075", "range": "S.No. 1065 to 2139", "lat": 28.083686, "lng": 83.772998},
    {"municipality": "Arjunchaupari", "ward": "3", "station": "Saraswati Basic School, Adhikharka", "code": "3120", "voters": "517", "range": "S.No. 1 to 517", "lat": 28.098717, "lng": 83.725123},
    {"municipality": "Arjunchaupari", "ward": "3", "station": "Ward No. 3 Office, Simalchaur (Ka)", "code": "11673", "voters": "728", "range": "S.No. 1 to 728", "lat": 28.099719, "lng": 83.761239},
    {"municipality": "Arjunchaupari", "ward": "3", "station": "Ward No. 3 Office, Simalchaur (Kha)", "code": "", "voters": "755", "range": "S.No. 729 to 1483", "lat": 28.101285, "lng": 83.760048},
    {"municipality": "Arjunchaupari", "ward": "4", "station": "Jan Ma.Vi., Rapakot (Ka)", "code": "3117", "voters": "756", "range": "S.No. 1 to 756", "lat": 28.115341, "lng": 83.74965},
    {"municipality": "Arjunchaupari", "ward": "4", "station": "Jan Ma.Vi., Rapakot (Kha)", "code": "", "voters": "760", "range": "S.No. 757 to 1516", "lat": 28.114564, "lng": 83.749628},
    {"municipality": "Arjunchaupari", "ward": "4", "station": "Shahid A.Vi., Khor", "code": "10233", "voters": "287", "range": "S.No. 1 to 287", "lat": 28.123414, "lng": 83.737983},
    {"municipality": "Arjunchaupari", "ward": "5", "station": "Sarvodaya Ma.Vi., Talpokhari", "code": "2862", "voters": "929", "range": "S.No. 1 to 929", "lat": 28.134957, "lng": 83.717233},
    {"municipality": "Arjunchaupari", "ward": "5", "station": "5 No. Ward Office, Pipaldanda", "code": "2865", "voters": "695", "range": "S.No. 1 to 695", "lat": 28.133647, "lng": 83.741975},
    {"municipality": "Arjunchaupari", "ward": "5", "station": "Kalika Basic School, Mulabari", "code": "2869", "voters": "872", "range": "S.No. 1 to 872", "lat": 28.122233, "lng": 83.721162},
    {"municipality": "Arjunchaupari", "ward": "6", "station": "Gaunpharka Janhit Basic School, Kulebari", "code": "2845", "voters": "869", "range": "S.No. 1 to 869", "lat": 28.123345, "lng": 83.780695},
    {"municipality": "Arjunchaupari", "ward": "6", "station": "Jan Vikas Basic School, Siudbari", "code": "2849", "voters": "782", "range": "S.No. 1 to 782", "lat": 28.126588, "lng": 83.806689},
    {"municipality": "Arjunchaupari", "ward": "6", "station": "Darau Ma.Vi., Darau", "code": "2852", "voters": "589", "range": "S.No. 1 to 589", "lat": 28.109425, "lng": 83.787657},
    {"municipality": "Arjunchaupari", "ward": "6", "station": "Rashtriya A.Vi., Tamakhabari", "code": "10234", "voters": "434", "range": "S.No. 1 to 434", "lat": 28.112029, "lng": 83.803119},
    {"municipality": "Aandhikhola", "ward": "1", "station": "Trishahid Ma.Vi., Panchhmul (Ka)", "code": "2853", "voters": "868", "range": "S.No. 1 to 868", "lat": 28.144095, "lng": 83.756005},
    {"municipality": "Aandhikhola", "ward": "1", "station": "Trishahid Ma.Vi., Panchhmul (Kha)", "code": "", "voters": "920", "range": "S.No. 869 to 1788", "lat": 28.144508, "lng": 83.755026},
    {"municipality": "Aandhikhola", "ward": "1", "station": "Gaunpharka Basic School, Dhadhu (Ka)", "code": "2854", "voters": "532", "range": "S.No. 1 to 532", "lat": 28.138416, "lng": 83.762478},
    {"municipality": "Aandhikhola", "ward": "1", "station": "Gaunpharka Basic School, Dhadhu (Kha)", "code": "", "voters": "581", "range": "S.No. 533 to 1113", "lat": 28.140343, "lng": 83.762535},
    {"municipality": "Aandhikhola", "ward": "1", "station": "Janhit Ma.Vi., Majhakateri", "code": "2859", "voters": "740", "range": "S.No. 1 to 740", "lat": 28.131297, "lng": 83.768391},
    {"municipality": "Aandhikhola", "ward": "2", "station": "Jana Pradip Ma.Vi., Duipiple (Ka)", "code": "2565", "voters": "672", "range": "S.No. 1 to 672", "lat": 28.16737, "lng": 83.7844},
    {"municipality": "Aandhikhola", "ward": "2", "station": "Jana Pradip Ma.Vi., Duipiple (Kha)", "code": "", "voters": "709", "range": "S.No. 673 to 1381", "lat": 28.168654, "lng": 83.783601},
    {"municipality": "Aandhikhola", "ward": "2", "station": "Dahare Basic School, Ukhabari", "code": "2569", "voters": "698", "range": "S.No. 1 to 698", "lat": 28.159733, "lng": 83.80296},
    {"municipality": "Aandhikhola", "ward": "2", "station": "Chilaunebas Health Post, Chilaunebas", "code": "11674", "voters": "875", "range": "S.No. 1 to 875", "lat": 28.160531, "lng": 83.771283},
    {"municipality": "Aandhikhola", "ward": "3", "station": "Rashtriya Ma.Vi., Puwadanda (Ka)", "code": "2557", "voters": "840", "range": "S.No. 1 to 840", "lat": 28.18646, "lng": 83.771844},
    {"municipality": "Aandhikhola", "ward": "3", "station": "Rashtriya Ma.Vi., Puwadanda (Kha)", "code": "", "voters": "841", "range": "S.No. 841 to 1681", "lat": 28.186979, "lng": 83.772621},
    {"municipality": "Aandhikhola", "ward": "3", "station": "Andhadhi Prakash Ma.Vi., Athgaure", "code": "2563", "voters": "836", "range": "S.No. 1 to 836", "lat": 28.195115, "lng": 83.776567},
    {"municipality": "Aandhikhola", "ward": "4", "station": "Sepat Siranchaur Ma.Vi., Sepat", "code": "2586", "voters": "1009", "range": "S.No. 1 to 1009", "lat": 28.181741, "lng": 83.78968},
    {"municipality": "Aandhikhola", "ward": "4", "station": "Shrawan Ma.Vi., Wangsing Deurali (Ka)", "code": "2589", "voters": "756", "range": "S.No. 1 to 756", "lat": 28.205621, "lng": 83.801511},
    {"municipality": "Aandhikhola", "ward": "4", "station": "Shrawan Ma.Vi., Wangsing Deurali (Kha)", "code": "", "voters": "803", "range": "S.No. 757 to 1559", "lat": 28.203908, "lng": 83.799922},
    {"municipality": "Aandhikhola", "ward": "5", "station": "Saraswati Basic School, Setidabhan", "code": "2797", "voters": "858", "range": "S.No. 1 to 858", "lat": 28.170102, "lng": 83.812307},
    {"municipality": "Aandhikhola", "ward": "5", "station": "Pradhan Paneru Ma.Vi., Rangthethati (Ka)", "code": "2801", "voters": "1008", "range": "S.No. 1 to 1008", "lat": 28.157591, "lng": 83.833709},
    {"municipality": "Aandhikhola", "ward": "5", "station": "Pradhan Paneru Ma.Vi., Rangthethati (Kha)", "code": "", "voters": "1031", "range": "S.No. 1009 to 2039", "lat": 28.159098, "lng": 83.834137},
    {"municipality": "Aandhikhola", "ward": "6", "station": "Laxmi Basic School, Dhakaldanda", "code": "2802", "voters": "610", "range": "S.No. 1 to 610", "lat": 28.149735, "lng": 83.819957},
    {"municipality": "Aandhikhola", "ward": "6", "station": "Bhagwati Ma.Vi., Lamiswara Ninuwabot (Ka)", "code": "2832", "voters": "588", "range": "S.No. 1 to 588", "lat": 28.134582, "lng": 83.842051},
    {"municipality": "Aandhikhola", "ward": "6", "station": "Bhagwati Ma.Vi., Lamiswara Ninuwabot (Kha)", "code": "", "voters": "605", "range": "S.No. 589 to 1193", "lat": 28.132812, "lng": 83.842626},
    {"municipality": "Aandhikhola", "ward": "6", "station": "Sharada Temple Ma.Vi., Tikaja (Ka)", "code": "2835", "voters": "588", "range": "S.No. 1 to 588", "lat": 28.13742, "lng": 83.810272},
    {"municipality": "Aandhikhola", "ward": "6", "station": "Sharada Temple Ma.Vi., Tikaja (Kha)", "code": "", "voters": "619", "range": "S.No. 589 to 1207", "lat": 28.138409, "lng": 83.810297},
    {"municipality": "Putalibazar", "ward": "1", "station": "Tribhuwan Adarsh Ma.Vi. Syanjabazar (Ka)", "code": "2745", "voters": "840", "range": "S.No. 1 to 840", "lat": 28.069215, "lng": 83.818768},
    {"municipality": "Putalibazar", "ward": "1", "station": "Tribhuwan Adarsh Ma.Vi. Syanjabazar (Kha)", "code": "", "voters": "868", "range": "S.No. 841 to 1708", "lat": 28.070144, "lng": 83.818302},
    {"municipality": "Putalibazar", "ward": "1", "station": "Tribhuwan Adarsh Ma.Vi. Syanjabazar (Ga)", "code": "", "voters": "891", "range": "S.No. 1709 to 2599", "lat": 28.069422, "lng": 83.818149},
    {"municipality": "Putalibazar", "ward": "2", "station": "Barahaguthi Basic School, Chidwa", "code": "2732", "voters": "967", "range": "S.No. 1 to 967", "lat": 28.092325, "lng": 83.886789},
    {"municipality": "Putalibazar", "ward": "2", "station": "Thumkidanda Temple, Kusunde (Ka)", "code": "2749", "voters": "672", "range": "S.No. 1 to 672", "lat": 28.078791, "lng": 83.895022},
    {"municipality": "Putalibazar", "ward": "2", "station": "Thumkidanda Temple, Kusunde (Kha)", "code": "", "voters": "687", "range": "S.No. 673 to 1359", "lat": 28.07977, "lng": 83.894933},
    {"municipality": "Putalibazar", "ward": "3", "station": "Punyashila Basic School, Nirabire (Ka)", "code": "2752", "voters": "728", "range": "S.No. 1 to 728", "lat": 28.125526, "lng": 83.888342},
    {"municipality": "Putalibazar", "ward": "3", "station": "Punyashila Basic School, Nirabire (Kha)", "code": "", "voters": "765", "range": "S.No. 729 to 1493", "lat": 28.124908, "lng": 83.889052},
    {"municipality": "Putalibazar", "ward": "3", "station": "Saraswati Ma.Vi., Gairikhet (Ka)", "code": "2757", "voters": "868", "range": "S.No. 1 to 868", "lat": 28.098697, "lng": 83.875998},
    {"municipality": "Putalibazar", "ward": "3", "station": "Saraswati Ma.Vi., Gairikhet (Kha)", "code": "", "voters": "870", "range": "S.No. 869 to 1738", "lat": 28.098861, "lng": 83.875697},
    {"municipality": "Putalibazar", "ward": "3", "station": "Kajiman Haritika Ma.Vi., Putalikhet", "code": "2759", "voters": "951", "range": "S.No. 1 to 951", "lat": 28.090572, "lng": 83.862788},
    {"municipality": "Putalibazar", "ward": "4", "station": "Ramkosh Phulbari Ma.Vi., Ramkosh (Ka)", "code": "2763", "voters": "672", "range": "S.No. 1 to 672", "lat": 28.121956, "lng": 83.857272},
    {"municipality": "Putalibazar", "ward": "4", "station": "Ramkosh Phulbari Ma.Vi., Ramkosh (Kha)", "code": "", "voters": "708", "range": "S.No. 673 to 1380", "lat": 28.121252, "lng": 83.858571},
    {"municipality": "Putalibazar", "ward": "4", "station": "Saraswati Ma.Vi., Nagdanda (Ka)", "code": "2769", "voters": "812", "range": "S.No. 1 to 812", "lat": 28.141174, "lng": 83.871133},
    {"municipality": "Putalibazar", "ward": "4", "station": "Saraswati Ma.Vi., Nagdanda (Kha)", "code": "", "voters": "830", "range": "S.No. 813 to 1642", "lat": 28.140759, "lng": 83.870952},
    {"municipality": "Putalibazar", "ward": "5", "station": "Shitala Ma.Vi., Gaude (Ka)", "code": "2649", "voters": "812", "range": "S.No. 1 to 812", "lat": 28.141526, "lng": 83.931513},
    {"municipality": "Putalibazar", "ward": "5", "station": "Shitala Ma.Vi., Gaude (Kha)", "code": "", "voters": "826", "range": "S.No. 813 to 1638", "lat": 28.140568, "lng": 83.932692},
    {"municipality": "Putalibazar", "ward": "5", "station": "Jana Jyoti Basic School, Bhrikuna", "code": "2651", "voters": "700", "range": "S.No. 1 to 700", "lat": 28.137482, "lng": 83.901919},
    {"municipality": "Putalibazar", "ward": "5", "station": "Saraswati Basic School, Katuyechaur", "code": "2653", "voters": "661", "range": "S.No. 1 to 661", "lat": 28.124474, "lng": 83.91052},
    {"municipality": "Putalibazar", "ward": "6", "station": "Shishu Kalyan Jana Priya Secondary School, Dangling Kaule", "code": "2662", "voters": "730", "range": "S.No. 1 to 730", "lat": 28.124664, "lng": 83.950018},
    {"municipality": "Putalibazar", "ward": "6", "station": "Himalaya Ma.Vi. Khalanga", "code": "2663", "voters": "940", "range": "S.No. 1 to 940", "lat": 28.140746, "lng": 83.976251},
    {"municipality": "Putalibazar", "ward": "6", "station": "Durga Bhagwati Basic School, Rayale", "code": "2669", "voters": "644", "range": "S.No. 1 to 644", "lat": 28.118982, "lng": 83.984767},
    {"municipality": "Putalibazar", "ward": "7", "station": "Janata Ma.Vi., Thuladihi (Ka)", "code": "2674", "voters": "784", "range": "S.No. 1 to 784", "lat": 28.107742, "lng": 83.925471},
    {"municipality": "Putalibazar", "ward": "7", "station": "Janata Ma.Vi., Thuladihi (Kha)", "code": "", "voters": "812", "range": "S.No. 785 to 1596", "lat": 28.106988, "lng": 83.924811},
    {"municipality": "Putalibazar", "ward": "7", "station": "Janata Ma.Vi., Thuladihi (Ga)", "code": "", "voters": "812", "range": "S.No. 1597 to 2408", "lat": 28.108206, "lng": 83.923906},
    {"municipality": "Putalibazar", "ward": "7", "station": "Sharada Ma.Vi., Lumchak Chapkhor Danda", "code": "2677", "voters": "1040", "range": "S.No. 1 to 1040", "lat": 28.101659, "lng": 83.961083},
    {"municipality": "Putalibazar", "ward": "8", "station": "Janata Basic School, Ramaniya Danda", "code": "2682", "voters": "716", "range": "S.No. 1 to 716", "lat": 28.088529, "lng": 83.903301},
    {"municipality": "Putalibazar", "ward": "8", "station": "Nuwakot Ma.Vi., Bhandyang (Ka)", "code": "2684", "voters": "644", "range": "S.No. 1 to 644", "lat": 28.097846, "lng": 83.928965},
    {"municipality": "Putalibazar", "ward": "8", "station": "Nuwakot Ma.Vi., Bhandyang (Kha)", "code": "", "voters": "696", "range": "S.No. 645 to 1340", "lat": 28.097117, "lng": 83.92981},
    {"municipality": "Putalibazar", "ward": "9", "station": "Jana Vikas Basic School, Naunche", "code": "2688", "voters": "849", "range": "S.No. 1 to 849", "lat": 28.083939, "lng": 83.925287},
    {"municipality": "Putalibazar", "ward": "9", "station": "Kolma Barahchaur Ma.Vi., Kolma Barahchaur", "code": "2689", "voters": "1052", "range": "S.No. 1 to 1052", "lat": 28.079815, "lng": 83.952568},
    {"municipality": "Putalibazar", "ward": "10", "station": "Chakramala Basic School, Rangkhola Bazar (Ka)", "code": "2790", "voters": "784", "range": "S.No. 1 to 784", "lat": 28.079429, "lng": 83.853588},
    {"municipality": "Putalibazar", "ward": "10", "station": "Chakramala Basic School, Rangkhola Bazar (Kha)", "code": "", "voters": "812", "range": "S.No. 785 to 1596", "lat": 28.079694, "lng": 83.852544},
    {"municipality": "Putalibazar", "ward": "10", "station": "Chakramala Basic School, Rangkhola Bazar (Ga)", "code": "", "voters": "816", "range": "S.No. 1597 to 2412", "lat": 28.079883, "lng": 83.85346},
    {"municipality": "Putalibazar", "ward": "11", "station": "Divya Gyan Community Basic School, Uniyachaur (Ka)", "code": "2794", "voters": "784", "range": "S.No. 1 to 784", "lat": 28.078557, "lng": 83.839413},
    {"municipality": "Putalibazar", "ward": "11", "station": "Divya Gyan Community Basic School, Uniyachaur (Kha)", "code": "", "voters": "784", "range": "S.No. 785 to 1568", "lat": 28.07982, "lng": 83.83933},
    {"municipality": "Putalibazar", "ward": "11", "station": "Divya Gyan Community Basic School, Uniyachaur (Ga)", "code": "", "voters": "786", "range": "S.No. 1569 to 2354", "lat": 28.079843, "lng": 83.839219},
    {"municipality": "Putalibazar", "ward": "12", "station": "Manakamana Ma.Vi., Pelkachaur (Ka)", "code": "2883", "voters": "644", "range": "S.No. 1 to 644", "lat": 28.054887, "lng": 83.835494},
    {"municipality": "Putalibazar", "ward": "12", "station": "Manakamana Ma.Vi., Pelkachaur (Kha)", "code": "", "voters": "677", "range": "S.No. 645 to 1321", "lat": 28.054999, "lng": 83.835567},
    {"municipality": "Putalibazar", "ward": "12", "station": "Janata Basic School, Simle", "code": "2890", "voters": "304", "range": "S.No. 1 to 304", "lat": 28.046272, "lng": 83.846498},
    {"municipality": "Putalibazar", "ward": "13", "station": "Jana Priya Basic School, Karabuje (Ka)", "code": "2780", "voters": "588", "range": "S.No. 1 to 588", "lat": 28.093129, "lng": 83.80004},
    {"municipality": "Putalibazar", "ward": "13", "station": "Jana Priya Basic School, Karabuje (Kha)", "code": "", "voters": "631", "range": "S.No. 589 to 1219", "lat": 28.091455, "lng": 83.80051},
    {"municipality": "Putalibazar", "ward": "13", "station": "Matribhumi Ma.Vi., Sataha Hatiya (Ka)", "code": "2786", "voters": "840", "range": "S.No. 1 to 840", "lat": 28.099994, "lng": 83.834051},
    {"municipality": "Putalibazar", "ward": "13", "station": "Matribhumi Ma.Vi., Sataha Hatiya (Kha)", "code": "", "voters": "868", "range": "S.No. 841 to 1708", "lat": 28.100432, "lng": 83.833757},
    {"municipality": "Putalibazar", "ward": "13", "station": "Matribhumi Ma.Vi., Sataha Hatiya (Ga)", "code": "", "voters": "868", "range": "S.No. 1709 to 2576", "lat": 28.100796, "lng": 83.834182},
    {"municipality": "Putalibazar", "ward": "13", "station": "Shanti Priya Basic School Gairi Pokhari (Ka)", "code": "9928", "voters": "672", "range": "S.No. 1 to 672", "lat": 28.103492, "lng": 83.810551},
    {"municipality": "Putalibazar", "ward": "13", "station": "Shanti Priya Basic School Gairi Pokhari (Kha)", "code": "", "voters": "679", "range": "S.No. 673 to 1351", "lat": 28.104051, "lng": 83.809315},
    {"municipality": "Putalibazar", "ward": "14", "station": "Rajasthal Ma.Vi., Satau (Ka)", "code": "2771", "voters": "980", "range": "S.No. 1 to 980", "lat": 28.121456, "lng": 83.828981},
    {"municipality": "Putalibazar", "ward": "14", "station": "Rajasthal Ma.Vi., Satau (Kha)", "code": "", "voters": "1006", "range": "S.No. 981 to 1986", "lat": 28.122139, "lng": 83.829451},
    {"municipality": "Putalibazar", "ward": "14", "station": "Shrawan Ma.Vi. Lamage (Ka)", "code": "2776", "voters": "812", "range": "S.No. 1 to 812", "lat": 28.105982, "lng": 83.855142},
    {"municipality": "Putalibazar", "ward": "14", "station": "Shrawan Ma.Vi. Lamage (Kha)", "code": "", "voters": "840", "range": "S.No. 813 to 1652", "lat": 28.105686, "lng": 83.855425},
    {"municipality": "Putalibazar", "ward": "14", "station": "Shrawan Ma.Vi. Lamage (Ga)", "code": "", "voters": "844", "range": "S.No. 1653 to 2496", "lat": 28.104876, "lng": 83.854584},
    {"municipality": "Phedikhola", "ward": "1", "station": "Damgade Ma.Vi., Damgade (Ka)", "code": "2647", "voters": "812", "range": "S.No. 1 to 812", "lat": 28.172406, "lng": 83.89726},
    {"municipality": "Phedikhola", "ward": "1", "station": "Damgade Ma.Vi., Damgade (Kha)", "code": "", "voters": "812", "range": "S.No. 813 to 1624", "lat": 28.171626, "lng": 83.898628},
    {"municipality": "Phedikhola", "ward": "1", "station": "Damgade Ma.Vi., Damgade (Ga)", "code": "", "voters": "862", "range": "S.No. 1625 to 2486", "lat": 28.171145, "lng": 83.897564},
    {"municipality": "Phedikhola", "ward": "2", "station": "Jana Sahayog Community Basic School, Syanchaur", "code": "2645", "voters": "541", "range": "S.No. 1 to 541", "lat": 28.17442, "lng": 83.879304},
    {"municipality": "Phedikhola", "ward": "2", "station": "Siddhartha Ma.Vi., Phedikhola (Ka)", "code": "2646", "voters": "868", "range": "S.No. 1 to 868", "lat": 28.150302, "lng": 83.884758},
    {"municipality": "Phedikhola", "ward": "2", "station": "Siddhartha Ma.Vi., Phedikhola (Kha)", "code": "", "voters": "868", "range": "S.No. 869 to 1736", "lat": 28.14927, "lng": 83.883122},
    {"municipality": "Phedikhola", "ward": "2", "station": "Siddhartha Ma.Vi., Phedikhola (Ga)", "code": "", "voters": "896", "range": "S.No. 1737 to 2632", "lat": 28.150407, "lng": 83.883795},
    {"municipality": "Phedikhola", "ward": "2", "station": "Siddhartha Ma.Vi., Phedikhola (Gha)", "code": "", "voters": "896", "range": "S.No. 2633 to 3528", "lat": 28.149483, "lng": 83.883146},
    {"municipality": "Phedikhola", "ward": "3", "station": "Sharada Ramaniya Danda Basic School, Pulakomukh", "code": "2603", "voters": "836", "range": "S.No. 1 to 836", "lat": 28.17177, "lng": 83.843565},
    {"municipality": "Phedikhola", "ward": "3", "station": "Jana Priya Ma.Vi., Parikabari (Ka)", "code": "2607", "voters": "588", "range": "S.No. 1 to 588", "lat": 28.160607, "lng": 83.857553},
    {"municipality": "Phedikhola", "ward": "3", "station": "Jana Priya Ma.Vi., Parikabari (Kha)", "code": "", "voters": "606", "range": "S.No. 589 to 1194", "lat": 28.160006, "lng": 83.858325},
    {"municipality": "Phedikhola", "ward": "4", "station": "Sitala Ma.Vi., Galem", "code": "2639", "voters": "865", "range": "S.No. 1 to 865", "lat": 28.20214, "lng": 83.841313},
    {"municipality": "Phedikhola", "ward": "4", "station": "Jana Adarsha Ma.Vi., Sherbazar (Ka)", "code": "2640", "voters": "812", "range": "S.No. 1 to 812", "lat": 28.182897, "lng": 83.855091},
    {"municipality": "Phedikhola", "ward": "4", "station": "Jana Adarsha Ma.Vi., Sherbazar (Kha)", "code": "", "voters": "829", "range": "S.No. 813 to 1641", "lat": 28.183179, "lng": 83.855154},
    {"municipality": "Phedikhola", "ward": "4", "station": "Adhkharka Basic School, Tokre", "code": "2642", "voters": "637", "range": "S.No. 1 to 637", "lat": 28.19699, "lng": 83.870687},
    {"municipality": "Phedikhola", "ward": "5", "station": "Barahi Basic School, Samaresh", "code": "2595", "voters": "324", "range": "S.No. 1 to 324", "lat": 28.187614, "lng": 83.830517},
    {"municipality": "Phedikhola", "ward": "5", "station": "Maidan Ma.Vi., Maidan", "code": "2598", "voters": "897", "range": "S.No. 1 to 897", "lat": 28.192858, "lng": 83.813414},
    {"municipality": "Bhirkot", "ward": "1", "station": "Raniraha Basic School, Lamachaur", "code": "3079", "voters": "819", "range": "S.No. 1 to 819", "lat": 28.056078, "lng": 83.806038},
    {"municipality": "Bhirkot", "ward": "1", "station": "Bhirkot Municipality Ward No. 1 Office, Bayarghari (Ka)", "code": "10229", "voters": "672", "range": "S.No. 1 to 672", "lat": 28.057355, "lng": 83.80421},
    {"municipality": "Bhirkot", "ward": "1", "station": "Bhirkot Municipality Ward No. 1 Office, Bayarghari (Kha)", "code": "", "voters": "692", "range": "S.No. 673 to 1364", "lat": 28.056435, "lng": 83.80471},
    {"municipality": "Bhirkot", "ward": "2", "station": "Krishi Sewa Kendra, Bayarghari (Ka)", "code": "3084", "voters": "644", "range": "S.No. 1 to 644", "lat": 28.029156, "lng": 83.790021},
    {"municipality": "Bhirkot", "ward": "2", "station": "Krishi Sewa Kendra, Bayarghari (Kha)", "code": "", "voters": "665", "range": "S.No. 645 to 1309", "lat": 28.030801, "lng": 83.788905},
    {"municipality": "Bhirkot", "ward": "2", "station": "Dhruwa Deurali Basic School, Balamadanda Kegha", "code": "3089", "voters": "995", "range": "S.No. 1 to 995", "lat": 28.031374, "lng": 83.791206},
    {"municipality": "Bhirkot", "ward": "3", "station": "Kalika Secondary School, Bheterpata", "code": "2894", "voters": "1036", "range": "S.No. 1 to 1036", "lat": 28.035733, "lng": 83.829573},
    {"municipality": "Bhirkot", "ward": "3", "station": "Shahid Shukra Ma.Vi., Bastra Deurali", "code": "2897", "voters": "1046", "range": "S.No. 1 to 1046", "lat": 28.033723, "lng": 83.828671},
    {"municipality": "Bhirkot", "ward": "3", "station": "Jana Jyoti Secondary School, Syanichaur Gumadi", "code": "2901", "voters": "1028", "range": "S.No. 1 to 1028", "lat": 28.034835, "lng": 83.831901},
    {"municipality": "Bhirkot", "ward": "4", "station": "Chhangchhangdi Basic School, Chhangchhangdi", "code": "3070", "voters": "818", "range": "S.No. 1 to 818", "lat": 28.020147, "lng": 83.791202},
    {"municipality": "Bhirkot", "ward": "4", "station": "Dabhungthati Ma.Vi., Dabhungthati", "code": "3074", "voters": "566", "range": "S.No. 1 to 566", "lat": 28.017142, "lng": 83.780769},
    {"municipality": "Waling", "ward": "3", "station": "Majhakot Shivalaya Ma.Vi., Majhakot", "code": "2905", "voters": "845", "range": "S.No. 1 to 845", "lat": 28.013174, "lng": 83.84133},
    {"municipality": "Waling", "ward": "3", "station": "Balrun Basic School, Koldanda", "code": "2908", "voters": "701", "range": "S.No. 1 to 701", "lat": 28.014344, "lng": 83.841723},
    {"municipality": "Waling", "ward": "4", "station": "Jethkanya Basic School, Eladi (Ka)", "code": "2959", "voters": "560", "range": "S.No. 1 to 560", "lat": 27.997954, "lng": 83.849567},
    {"municipality": "Waling", "ward": "4", "station": "Jethkanya Basic School, Eladi (Kha)", "code": "", "voters": "600", "range": "S.No. 561 to 1160", "lat": 27.997526, "lng": 83.848524},
    {"municipality": "Waling", "ward": "4", "station": "Janhit Basic School, Paudure", "code": "2962", "voters": "750", "range": "S.No. 1 to 750", "lat": 27.998196, "lng": 83.849828},
    {"municipality": "Waling", "ward": "4", "station": "Kusundanda A.Vi., Chihare", "code": "10231", "voters": "613", "range": "S.No. 1 to 613", "lat": 27.997731, "lng": 83.849272},
    {"municipality": "Biruwa", "ward": "1", "station": "Nava Jyoti Ma.Vi., Biruwa (Ka)", "code": "12034", "voters": "784", "range": "S.No. 1 to 784", "lat": 28.033694, "lng": 83.897359},
    {"municipality": "Biruwa", "ward": "1", "station": "Nava Jyoti Ma.Vi., Biruwa (Kha)", "code": "", "voters": "806", "range": "S.No. 785 to 1590", "lat": 28.032834, "lng": 83.897328},
    {"municipality": "Biruwa", "ward": "2", "station": "Jamune Danda Ma.Vi., Jamune Danda (Ka)", "code": "2873", "voters": "756", "range": "S.No. 1 to 756", "lat": 28.046688, "lng": 83.880406},
    {"municipality": "Biruwa", "ward": "2", "station": "Jamune Danda Ma.Vi., Jamune Danda (Kha)", "code": "", "voters": "780", "range": "S.No. 757 to 1536", "lat": 28.047384, "lng": 83.879172},
    {"municipality": "Biruwa", "ward": "2", "station": "Tulsichaur Basic School, Gaukha", "code": "2887", "voters": "301", "range": "S.No. 1 to 301", "lat": 28.05497, "lng": 83.857941},
    {"municipality": "Biruwa", "ward": "3", "station": "Shiddha Mandali Basic School, Khali (Ka)", "code": "2736", "voters": "700", "range": "S.No. 1 to 700", "lat": 28.06305, "lng": 83.883892},
    {"municipality": "Biruwa", "ward": "3", "station": "Shiddha Mandali Basic School, Khali (Kha)", "code": "", "voters": "735", "range": "S.No. 701 to 1435", "lat": 28.062626, "lng": 83.884257},
    {"municipality": "Biruwa", "ward": "3", "station": "Dhowadi Bhandyang Basic School, Dhowadi Bhandyang", "code": "2740", "voters": "489", "range": "S.No. 1 to 489", "lat": 28.06347, "lng": 83.896156},
    {"municipality": "Biruwa", "ward": "4", "station": "Divya Prakash Ma.Vi., Saunepani (Ka)", "code": "2726", "voters": "616", "range": "S.No. 1 to 616", "lat": 28.048883, "lng": 83.908943},
    {"municipality": "Biruwa", "ward": "4", "station": "Divya Prakash Ma.Vi., Saunepani (Kha)", "code": "", "voters": "637", "range": "S.No. 617 to 1253", "lat": 28.04763, "lng": 83.908013},
    {"municipality": "Biruwa", "ward": "4", "station": "Bhavishya Nirman Ma.Vi., Sthangaira (Ka)", "code": "2728", "voters": "728", "range": "S.No. 1 to 728", "lat": 28.065086, "lng": 83.918065},
    {"municipality": "Biruwa", "ward": "4", "station": "Bhavishya Nirman Ma.Vi., Sthangaira (Kha)", "code": "", "voters": "732", "range": "S.No. 729 to 1460", "lat": 28.064646, "lng": 83.918924},
    {"municipality": "Biruwa", "ward": "4", "station": "Khudi Basic School, Khorthape", "code": "2729", "voters": "841", "range": "S.No. 1 to 841", "lat": 28.058401, "lng": 83.933655},
    {"municipality": "Biruwa", "ward": "5", "station": "Kichanas Basic School, Nagasthan", "code": "2693", "voters": "886", "range": "S.No. 1 to 886", "lat": 28.012332, "lng": 83.926568},
    {"municipality": "Biruwa", "ward": "5", "station": "Devvani Basic School, Devisthan (Ka)", "code": "2696", "voters": "588", "range": "S.No. 1 to 588", "lat": 28.008, "lng": 83.909165},
    {"municipality": "Biruwa", "ward": "5", "station": "Devvani Basic School, Devisthan (Kha)", "code": "", "voters": "602", "range": "S.No. 589 to 1190", "lat": 28.007929, "lng": 83.909928},
    {"municipality": "Biruwa", "ward": "6", "station": "Jana Jagriti Basic School, Khanigaun", "code": "2923", "voters": "849", "range": "S.No. 1 to 849", "lat": 27.989408, "lng": 83.913438},
    {"municipality": "Biruwa", "ward": "6", "station": "Jana Priya Ma.Vi., Chittebas (Ka)", "code": "2927", "voters": "588", "range": "S.No. 1 to 588", "lat": 27.960854, "lng": 83.887436},
    {"municipality": "Biruwa", "ward": "6", "station": "Jana Priya Ma.Vi., Chittebas (Kha)", "code": "", "voters": "639", "range": "S.No. 589 to 1227", "lat": 27.959635, "lng": 83.885706},
    {"municipality": "Biruwa", "ward": "7", "station": "Jivan Jyoti Ma.Vi., Kumumbhandyang (Ka)", "code": "2914", "voters": "1008", "range": "S.No. 1 to 1008", "lat": 27.989793, "lng": 83.87044},
    {"municipality": "Biruwa", "ward": "7", "station": "Jivan Jyoti Ma.Vi., Kumumbhandyang (Kha)", "code": "", "voters": "1021", "range": "S.No. 1009 to 2029", "lat": 27.989127, "lng": 83.86961},
    {"municipality": "Biruwa", "ward": "8", "station": "Chaitanya Bhavani Basic School, Tallu Bhandyang", "code": "2918", "voters": "964", "range": "S.No. 1 to 964", "lat": 28.022353, "lng": 83.879006},
    {"municipality": "Biruwa", "ward": "8", "station": "Bhrung Chauki Ma.Vi., Methabhrung", "code": "10235", "voters": "1042", "range": "S.No. 1 to 1042", "lat": 28.000212, "lng": 83.892849},
    {"municipality": "Harinas", "ward": "1", "station": "Bhojprakash Ma.Vi. Saldanda (Ka)", "code": "2707", "voters": "728", "range": "S.No. 1 to 728", "lat": 28.049503, "lng": 83.94157},
    {"municipality": "Harinas", "ward": "1", "station": "Bhojprakash Ma.Vi. Saldanda (Kha)", "code": "", "voters": "751", "range": "S.No. 729 to 1479", "lat": 28.049575, "lng": 83.942496},
    {"municipality": "Harinas", "ward": "1", "station": "Thanapati A.Vi., Khairikot", "code": "10236", "voters": "459", "range": "S.No. 1 to 459", "lat": 28.029397, "lng": 83.935456},
    {"municipality": "Harinas", "ward": "2", "station": "Jana Kalyan Secondary School, Dhyarsingh Bhandyang (Ka)", "code": "2711", "voters": "644", "range": "S.No. 1 to 644", "lat": 28.033223, "lng": 83.981753},
    {"municipality": "Harinas", "ward": "2", "station": "Jana Kalyan Secondary School, Dhyarsingh Bhandyang (Kha)", "code": "", "voters": "668", "range": "S.No. 645 to 1312", "lat": 28.032846, "lng": 83.980379},
    {"municipality": "Harinas", "ward": "2", "station": "Mahima Ma.Vi., Chisapani", "code": "2712", "voters": "497", "range": "S.No. 1 to 497", "lat": 28.02262, "lng": 83.999655},
    {"municipality": "Harinas", "ward": "3", "station": "Kalika A.Vi., Dhupdanda (Ka)", "code": "10237", "voters": "1064", "range": "S.No. 1 to 1064", "lat": 28.012411, "lng": 83.954668},
    {"municipality": "Harinas", "ward": "3", "station": "Kalika A.Vi., Dhupdanda (Kha)", "code": "", "voters": "1064", "range": "S.No. 1065 to 2128", "lat": 28.011957, "lng": 83.953416},
    {"municipality": "Harinas", "ward": "4", "station": "Saraswati Basic School, Kulungkhola", "code": "2946", "voters": "282", "range": "S.No. 1 to 282", "lat": 28.003993, "lng": 83.975341},
    {"municipality": "Harinas", "ward": "4", "station": "Bal Jyoti Basic School Karanswara (Ka)", "code": "2952", "voters": "532", "range": "S.No. 1 to 532", "lat": 27.984994, "lng": 83.954466},
    {"municipality": "Harinas", "ward": "4", "station": "Bal Jyoti Basic School Karanswara (Kha)", "code": "", "voters": "587", "range": "S.No. 533 to 1119", "lat": 27.985892, "lng": 83.9528},
    {"municipality": "Harinas", "ward": "4", "station": "4 No. Ward Office, Rodikhola (Ka)", "code": "2954", "voters": "756", "range": "S.No. 1 to 756", "lat": 27.979453, "lng": 83.970673},
    {"municipality": "Harinas", "ward": "4", "station": "4 No. Ward Office, Rodikhola (Kha)", "code": "", "voters": "759", "range": "S.No. 757 to 1515", "lat": 27.979655, "lng": 83.970832},
    {"municipality": "Harinas", "ward": "5", "station": "Kalika Deurali Secondary School, Kalwa Deurali (Ka)", "code": "2931", "voters": "812", "range": "S.No. 1 to 812", "lat": 27.976358, "lng": 83.926569},
    {"municipality": "Harinas", "ward": "5", "station": "Kalika Deurali Secondary School, Kalwa Deurali (Kha)", "code": "", "voters": "854", "range": "S.No. 813 to 1666", "lat": 27.977046, "lng": 83.926223},
    {"municipality": "Harinas", "ward": "6", "station": "Pitambar Ma.Vi., Duddi (Ka)", "code": "2934", "voters": "756", "range": "S.No. 1 to 756", "lat": 27.947131, "lng": 83.927897},
    {"municipality": "Harinas", "ward": "6", "station": "Pitambar Ma.Vi., Duddi (Kha)", "code": "", "voters": "756", "range": "S.No. 757 to 1512", "lat": 27.94759, "lng": 83.92854},
    {"municipality": "Harinas", "ward": "6", "station": "Pitambar Ma.Vi., Duddi (Ga)", "code": "", "voters": "802", "range": "S.No. 1513 to 2314", "lat": 27.947014, "lng": 83.92915},
    {"municipality": "Harinas", "ward": "7", "station": "Siddha Basic School, Khaddrithok", "code": "2937", "voters": "1054", "range": "S.No. 1 to 1054", "lat": 27.954919, "lng": 83.955894},
    {"municipality": "Harinas", "ward": "7", "station": "Amala Bhandyang Ma.Vi., Changsing (Ka)", "code": "2942", "voters": "588", "range": "S.No. 1 to 588", "lat": 27.934015, "lng": 83.94992},
    {"municipality": "Harinas", "ward": "7", "station": "Amala Bhandyang Ma.Vi., Changsing (Kha)", "code": "", "voters": "610", "range": "S.No. 589 to 1198", "lat": 27.933816, "lng": 83.951327}
];

// Add party and visits data to each station
pollingStationsData.forEach(station => {
    station.party = getRandomParty();
    station.visits = getRandomVisits();
    station.contacts = generateContacts();
});

// --- Global Variables ---
let allMarkers = [];
let currentFilters = {
    party: 'all',
    visits: 'all',
    municipality: 'all'
};

// --- Add Markers to Map ---
function addMarkersToMap() {
    // Clear existing markers
    allMarkers.forEach(marker => map.removeLayer(marker));
    allMarkers = [];
    
    // Filter data
    const filteredData = pollingStationsData.filter(station => {
        if (currentFilters.party !== 'all' && station.party !== currentFilters.party) return false;
        if (currentFilters.municipality !== 'all' && station.municipality !== currentFilters.municipality) return false;
        if (currentFilters.visits !== 'all') {
            if (currentFilters.visits === 0 && station.visits !== 0) return false;
            if (currentFilters.visits === '1-2' && (station.visits < 1 || station.visits > 2)) return false;
            if (currentFilters.visits === '3+' && station.visits < 3) return false;
        }
        return true;
    });
    
    // Add markers for filtered data
    filteredData.forEach(station => {
        const icon = createIcon(station.municipality, station.party, station.visits);
        const marker = L.marker([station.lat, station.lng], { icon: icon });
        
        // Generate contact HTML
        const contactsHTML = station.contacts.map(contact => `
            <div class="contact-person">
                <span class="contact-name">${contact.name}</span>
                <span class="contact-phone"><i class="fas fa-phone"></i> ${contact.phone}</span>
            </div>
        `).join('');
        
        // Create popup content
        const popupContent = `
            <div class="custom-popup">
                <div class="popup-header">
                    <div class="popup-title">${station.station}</div>
                    <span class="popup-party ${station.party.toLowerCase()}">${station.party}</span>
                </div>
                <div class="popup-info">
                    <div class="popup-info-item">
                        <span class="popup-info-label"><i class="fas fa-map-marker-alt"></i> Municipality:</span>
                        <span class="popup-info-value">${station.municipality}</span>
                    </div>
                    <div class="popup-info-item">
                        <span class="popup-info-label"><i class="fas fa-home"></i> Ward No.:</span>
                        <span class="popup-info-value">${station.ward}</span>
                    </div>
                    ${station.code ? `
                    <div class="popup-info-item">
                        <span class="popup-info-label"><i class="fas fa-hashtag"></i> Code:</span>
                        <span class="popup-info-value">${station.code}</span>
                    </div>` : ''}
                    <div class="popup-info-item">
                        <span class="popup-info-label"><i class="fas fa-users"></i> Total Voters:</span>
                        <span class="popup-info-value">${station.voters}</span>
                    </div>
                    <div class="popup-info-item">
                        <span class="popup-info-label"><i class="fas fa-list-ol"></i> Voter Range:</span>
                        <span class="popup-info-value">${station.range}</span>
                    </div>
                </div>
                <div class="popup-contacts">
                    <h4><i class="fas fa-address-book"></i> Key Personnel:</h4>
                    ${contactsHTML}
                </div>
                <div class="popup-visits">
                    <i class="fas fa-eye"></i> Visited: <strong>${station.visits}</strong> times
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent, {
            maxWidth: 350,
            className: 'custom-leaflet-popup'
        });
        
        marker.addTo(map);
        allMarkers.push(marker);
    });
    
    updateStatistics();
}

// --- Filter Functions ---
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

function resetAllFilters() {
    currentFilters = {
        party: 'all',
        visits: 'all',
        municipality: 'all'
    };
    
    // Reset all button states
    document.querySelectorAll('.party-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.party-btn[data-party="all"]').classList.add('active');
    
    document.querySelectorAll('.visit-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.visit-btn[data-visits="all"]').classList.add('active');
    
    document.querySelectorAll('.mun-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.mun-btn[data-mun="all"]').classList.add('active');
    
    addMarkersToMap();
}

function updateActiveButton(selector, value) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.party === value || btn.dataset.visits === value || btn.dataset.mun === value) {
            btn.classList.add('active');
        }
    });
}

// --- Update Statistics ---
function updateStatistics() {
    const visibleStations = pollingStationsData.filter(station => {
        if (currentFilters.party !== 'all' && station.party !== currentFilters.party) return false;
        if (currentFilters.municipality !== 'all' && station.municipality !== currentFilters.municipality) return false;
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
    
    const totalVoters = visibleStations.reduce((sum, s) => sum + parseInt(s.voters), 0);
    const avgVisits = visibleStations.length > 0 
        ? (visibleStations.reduce((sum, s) => sum + s.visits, 0) / visibleStations.length).toFixed(1)
        : 0;
    
    document.getElementById('total-booths').textContent = visibleStations.length;
    document.getElementById('total-voters').textContent = totalVoters.toLocaleString();
    document.getElementById('surya-count').textContent = suryaCount;
    document.getElementById('congress-count').textContent = congressCount;
    document.getElementById('rsp-count').textContent = rspCount;
    document.getElementById('avg-visits').textContent = avgVisits;
}

// --- Initialize Map ---
addMarkersToMap();




