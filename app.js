// --- Map Initialization ---
const map = L.map('map', {
    center: [28.10, 83.85],
    zoom: 11,
    maxZoom: 17,
    minZoom: 9,
    maxBounds: [
        [27.85, 83.70],
        [28.25, 84.00]
    ],
    maxBoundsViscosity: 1.0,
    scrollWheelZoom: true
});

// --- Base Layer ---
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

// --- Custom Icons for different municipalities (7 colors) ---
const municipalityColors = {
    Arjunchaupari: '#FF6B6B',
    Aandhikhola: '#4ECDC4',
    Putalibazar: '#45B7D1',
    Waling: '#F7B731',
    Phedikhola: '#A55EEA',
    Bhirkot: '#26DE81',
    Biruwa: '#FD79A8',
    Harinas: '#FC5C65'
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

// --- Enhanced polling stations data with new attributes ---
const pollingStationsData = [
    {"lat": 28.144169, "lng": 83.759528, "municipality": "Arjunchaupari", "ward": "1", "station": "Parkanya Ma.Vi., Ajayameru Shree (Ka)", "code": "3109", "voters": "1064", "range": "S.No. 1 to 1064"},
    {"lat": 28.145582, "lng": 83.759165, "municipality": "Arjunchaupari", "ward": "1", "station": "Parkanya Ma.Vi., Ajayameru Shree (Kha)", "code": "", "voters": "1064", "range": "S.No. 1065 to 2128"},
    {"lat": 28.144584, "lng": 83.760674, "municipality": "Arjunchaupari", "ward": "1", "station": "Parkanya Ma.Vi., Ajayameru Shree (Ga)", "code": "", "voters": "1079", "range": "S.No. 2129 to 3207"},
    {"lat": 28.140751, "lng": 83.777301, "municipality": "Arjunchaupari", "ward": "2", "station": "Ranicharri Basic School, Khate (Ka)", "code": "3113", "voters": "1064", "range": "S.No. 1 to 1064"},
    {"lat": 28.140336, "lng": 83.776741, "municipality": "Arjunchaupari", "ward": "2", "station": "Ranicharri Basic School, Khate (Kha)", "code": "", "voters": "1075", "range": "S.No. 1065 to 2139"},
    {"lat": 28.129302, "lng": 83.7912, "municipality": "Arjunchaupari", "ward": "3", "station": "Saraswati Basic School, Adhikharka", "code": "3120", "voters": "517", "range": "S.No. 1 to 517"},
    {"lat": 28.129282, "lng": 83.79176, "municipality": "Arjunchaupari", "ward": "3", "station": "Ward No. 3 Office, Simalchaur (Ka)", "code": "11673", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 28.130847, "lng": 83.79057, "municipality": "Arjunchaupari", "ward": "3", "station": "Ward No. 3 Office, Simalchaur (Kha)", "code": "", "voters": "755", "range": "S.No. 729 to 1483"},
    {"lat": 28.113793, "lng": 83.799416, "municipality": "Arjunchaupari", "ward": "4", "station": "Jan Ma.Vi., Rapakot (Ka)", "code": "3117", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 28.113016, "lng": 83.799394, "municipality": "Arjunchaupari", "ward": "4", "station": "Jan Ma.Vi., Rapakot (Kha)", "code": "", "voters": "760", "range": "S.No. 757 to 1516"},
    {"lat": 28.112906, "lng": 83.798979, "municipality": "Arjunchaupari", "ward": "4", "station": "Shahid A.Vi., Khor", "code": "10233", "voters": "287", "range": "S.No. 1 to 287"},
    {"lat": 28.095641, "lng": 83.79963, "municipality": "Arjunchaupari", "ward": "5", "station": "Sarvodaya Ma.Vi., Talpokhari", "code": "2862", "voters": "929", "range": "S.No. 1 to 929"},
    {"lat": 28.096955, "lng": 83.798283, "municipality": "Arjunchaupari", "ward": "5", "station": "5 No. Ward Office, Pipaldanda", "code": "2865", "voters": "695", "range": "S.No. 1 to 695"},
    {"lat": 28.095328, "lng": 83.79857, "municipality": "Arjunchaupari", "ward": "5", "station": "Kalika Basic School, Mulabari", "code": "2869", "voters": "872", "range": "S.No. 1 to 872"},
    {"lat": 28.07932, "lng": 83.792181, "municipality": "Arjunchaupari", "ward": "6", "station": "Gaunpharka Janhit Basic School, Kulebari", "code": "2845", "voters": "869", "range": "S.No. 1 to 869"},
    {"lat": 28.080994, "lng": 83.791449, "municipality": "Arjunchaupari", "ward": "6", "station": "Jan Vikas Basic School, Siudbari", "code": "2849", "voters": "782", "range": "S.No. 1 to 782"},
    {"lat": 28.080101, "lng": 83.790924, "municipality": "Arjunchaupari", "ward": "6", "station": "Darau Ma.Vi., Darau", "code": "2852", "voters": "589", "range": "S.No. 1 to 589"},
    {"lat": 28.080199, "lng": 83.791734, "municipality": "Arjunchaupari", "ward": "6", "station": "Rashtriya A.Vi., Tamakhabari", "code": "10234", "voters": "434", "range": "S.No. 1 to 434"},
    {"lat": 28.040123, "lng": 83.850061, "municipality": "Aandhikhola", "ward": "1", "station": "Trishahid Ma.Vi., Panchhmul (Ka)", "code": "2853", "voters": "868", "range": "S.No. 1 to 868"},
    {"lat": 28.040537, "lng": 83.849084, "municipality": "Aandhikhola", "ward": "1", "station": "Trishahid Ma.Vi., Panchhmul (Kha)", "code": "", "voters": "920", "range": "S.No. 869 to 1788"},
    {"lat": 28.039007, "lng": 83.850217, "municipality": "Aandhikhola", "ward": "1", "station": "Gaunpharka Basic School, Dhadhu (Ka)", "code": "2854", "voters": "532", "range": "S.No. 1 to 532"},
    {"lat": 28.040933, "lng": 83.850275, "municipality": "Aandhikhola", "ward": "1", "station": "Gaunpharka Basic School, Dhadhu (Kha)", "code": "", "voters": "581", "range": "S.No. 533 to 1113"},
    {"lat": 28.040389, "lng": 83.850379, "municipality": "Aandhikhola", "ward": "1", "station": "Janhit Ma.Vi., Majhakateri", "code": "2859", "voters": "740", "range": "S.No. 1 to 740"},
    {"lat": 28.035168, "lng": 83.868023, "municipality": "Aandhikhola", "ward": "2", "station": "Jana Pradip Ma.Vi., Duipiple (Ka)", "code": "2565", "voters": "672", "range": "S.No. 1 to 672"},
    {"lat": 28.036452, "lng": 83.867226, "municipality": "Aandhikhola", "ward": "2", "station": "Jana Pradip Ma.Vi., Duipiple (Kha)", "code": "", "voters": "709", "range": "S.No. 673 to 1381"},
    {"lat": 28.035253, "lng": 83.868218, "municipality": "Aandhikhola", "ward": "2", "station": "Dahare Basic School, Ukhabari", "code": "2569", "voters": "698", "range": "S.No. 1 to 698"},
    {"lat": 28.035717, "lng": 83.866792, "municipality": "Aandhikhola", "ward": "2", "station": "Chilaunebas Health Post, Chilaunebas", "code": "11674", "voters": "875", "range": "S.No. 1 to 875"},
    {"lat": 28.021446, "lng": 83.883453, "municipality": "Aandhikhola", "ward": "3", "station": "Karthok Basic School, Chari", "code": "2572", "voters": "670", "range": "S.No. 1 to 670"},
    {"lat": 28.026175, "lng": 83.881758, "municipality": "Aandhikhola", "ward": "3", "station": "Karthok Ma.Vi., Karthok", "code": "2575", "voters": "779", "range": "S.No. 1 to 779"},
    {"lat": 28.021896, "lng": 83.898084, "municipality": "Aandhikhola", "ward": "4", "station": "Gau Sewa A.Vi., Alamadevi (Ka)", "code": "2577", "voters": "1064", "range": "S.No. 1 to 1064"},
    {"lat": 28.022191, "lng": 83.897299, "municipality": "Aandhikhola", "ward": "4", "station": "Gau Sewa A.Vi., Alamadevi (Kha)", "code": "", "voters": "1064", "range": "S.No. 1065 to 2128"},
    {"lat": 28.022498, "lng": 83.898733, "municipality": "Aandhikhola", "ward": "4", "station": "Gau Sewa A.Vi., Alamadevi (Ga)", "code": "", "voters": "1114", "range": "S.No. 2129 to 3242"},
    {"lat": 28.00743, "lng": 83.911622, "municipality": "Aandhikhola", "ward": "5", "station": "Bagnas Ma.Vi., Dhaubang (Ka)", "code": "2578", "voters": "945", "range": "S.No. 1 to 945"},
    {"lat": 28.007767, "lng": 83.910829, "municipality": "Aandhikhola", "ward": "5", "station": "Bagnas Ma.Vi., Dhaubang (Kha)", "code": "", "voters": "991", "range": "S.No. 946 to 1936"},
    {"lat": 28.007967, "lng": 83.911212, "municipality": "Aandhikhola", "ward": "5", "station": "Basanta Basic School, Kuirekot", "code": "2579", "voters": "503", "range": "S.No. 1 to 503"},
    {"lat": 28.010175, "lng": 83.920667, "municipality": "Aandhikhola", "ward": "6", "station": "Bagnas Secondary School, Sanganbichaur (Ka)", "code": "2580", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 28.010464, "lng": 83.920046, "municipality": "Aandhikhola", "ward": "6", "station": "Bagnas Secondary School, Sanganbichaur (Kha)", "code": "", "voters": "749", "range": "S.No. 729 to 1477"},
    {"lat": 28.010074, "lng": 83.921187, "municipality": "Aandhikhola", "ward": "6", "station": "Kalika Basic School, Syang", "code": "2584", "voters": "626", "range": "S.No. 1 to 626"},
    {"lat": 28.010282, "lng": 83.919464, "municipality": "Aandhikhola", "ward": "6", "station": "Devsthan Basic School, Devisthan", "code": "2585", "voters": "504", "range": "S.No. 1 to 504"},
    {"lat": 28.008348, "lng": 83.930766, "municipality": "Aandhikhola", "ward": "7", "station": "Shree Janapriya Ma.Vi., Setidovan (Ka)", "code": "2587", "voters": "860", "range": "S.No. 1 to 860"},
    {"lat": 28.008638, "lng": 83.929986, "municipality": "Aandhikhola", "ward": "7", "station": "Shree Janapriya Ma.Vi., Setidovan (Kha)", "code": "", "voters": "895", "range": "S.No. 861 to 1755"},
    {"lat": 28.090382, "lng": 83.863152, "municipality": "Putalibazar", "ward": "1", "station": "Putalibazar Municipality, Putalibazar (Ka)", "code": "2873", "voters": "945", "range": "S.No. 1 to 945"},
    {"lat": 28.090691, "lng": 83.862381, "municipality": "Putalibazar", "ward": "1", "station": "Putalibazar Municipality, Putalibazar (Kha)", "code": "", "voters": "991", "range": "S.No. 946 to 1936"},
    {"lat": 28.090968, "lng": 83.863721, "municipality": "Putalibazar", "ward": "1", "station": "Putalibazar Municipality, Putalibazar (Ga)", "code": "", "voters": "1034", "range": "S.No. 1937 to 2970"},
    {"lat": 28.093542, "lng": 83.873041, "municipality": "Putalibazar", "ward": "2", "station": "Ward No. 2 Office, Balkunapani (Ka)", "code": "2876", "voters": "812", "range": "S.No. 1 to 812"},
    {"lat": 28.093835, "lng": 83.872262, "municipality": "Putalibazar", "ward": "2", "station": "Ward No. 2 Office, Balkunapani (Kha)", "code": "", "voters": "854", "range": "S.No. 813 to 1666"},
    {"lat": 28.096425, "lng": 83.879531, "municipality": "Putalibazar", "ward": "3", "station": "Annapurna Basic School, Kerabari (Ka)", "code": "2880", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 28.096713, "lng": 83.878761, "municipality": "Putalibazar", "ward": "3", "station": "Annapurna Basic School, Kerabari (Kha)", "code": "", "voters": "755", "range": "S.No. 729 to 1483"},
    {"lat": 28.105814, "lng": 83.872772, "municipality": "Putalibazar", "ward": "4", "station": "Panchamul Basic School, Panchamul (Ka)", "code": "2884", "voters": "644", "range": "S.No. 1 to 644"},
    {"lat": 28.106102, "lng": 83.871992, "municipality": "Putalibazar", "ward": "4", "station": "Panchamul Basic School, Panchamul (Kha)", "code": "", "voters": "668", "range": "S.No. 645 to 1312"},
    {"lat": 28.114324, "lng": 83.868343, "municipality": "Putalibazar", "ward": "5", "station": "Ganesh Ma.Vi., Bharakot (Ka)", "code": "2888", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 28.114612, "lng": 83.867563, "municipality": "Putalibazar", "ward": "5", "station": "Ganesh Ma.Vi., Bharakot (Kha)", "code": "", "voters": "756", "range": "S.No. 757 to 1512"},
    {"lat": 28.114889, "lng": 83.868903, "municipality": "Putalibazar", "ward": "5", "station": "Ganesh Ma.Vi., Bharakot (Ga)", "code": "", "voters": "802", "range": "S.No. 1513 to 2314"},
    {"lat": 28.122734, "lng": 83.859254, "municipality": "Putalibazar", "ward": "6", "station": "Ratnanagar Basic School, Banjhakhet", "code": "2893", "voters": "497", "range": "S.No. 1 to 497"},
    {"lat": 28.122996, "lng": 83.858482, "municipality": "Putalibazar", "ward": "6", "station": "Janakalyan Ma.Vi., Ratnanagar (Ka)", "code": "2897", "voters": "812", "range": "S.No. 1 to 812"},
    {"lat": 28.123284, "lng": 83.859812, "municipality": "Putalibazar", "ward": "6", "station": "Janakalyan Ma.Vi., Ratnanagar (Kha)", "code": "", "voters": "854", "range": "S.No. 813 to 1666"},
    {"lat": 28.130647, "lng": 83.850263, "municipality": "Putalibazar", "ward": "7", "station": "Janata Ma.Vi., Tingre Beshi (Ka)", "code": "2899", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 28.130935, "lng": 83.849493, "municipality": "Putalibazar", "ward": "7", "station": "Janata Ma.Vi., Tingre Beshi (Kha)", "code": "", "voters": "749", "range": "S.No. 729 to 1477"},
    {"lat": 28.137567, "lng": 83.841644, "municipality": "Putalibazar", "ward": "8", "station": "Himalaya Ma.Vi., Surupakot (Ka)", "code": "2903", "voters": "644", "range": "S.No. 1 to 644"},
    {"lat": 28.137855, "lng": 83.840874, "municipality": "Putalibazar", "ward": "8", "station": "Himalaya Ma.Vi., Surupakot (Kha)", "code": "", "voters": "668", "range": "S.No. 645 to 1312"},
    {"lat": 28.089271, "lng": 83.918362, "municipality": "Waling", "ward": "1", "station": "Janapriya Ma.Vi., Jyamire (Ka)", "code": "2777", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 28.089559, "lng": 83.917592, "municipality": "Waling", "ward": "1", "station": "Janapriya Ma.Vi., Jyamire (Kha)", "code": "", "voters": "760", "range": "S.No. 757 to 1516"},
    {"lat": 28.097682, "lng": 83.925851, "municipality": "Waling", "ward": "2", "station": "Srijana A.Vi., Dhital Beshi (Ka)", "code": "2781", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 28.097970, "lng": 83.925081, "municipality": "Waling", "ward": "2", "station": "Srijana A.Vi., Dhital Beshi (Kha)", "code": "", "voters": "755", "range": "S.No. 729 to 1483"},
    {"lat": 28.105592, "lng": 83.933342, "municipality": "Waling", "ward": "3", "station": "Shikhar Basic School, Shikhar", "code": "2785", "voters": "644", "range": "S.No. 1 to 644"},
    {"lat": 28.105880, "lng": 83.932572, "municipality": "Waling", "ward": "3", "station": "Waling Municipality Office, Waling (Ka)", "code": "2789", "voters": "868", "range": "S.No. 1 to 868"},
    {"lat": 28.106168, "lng": 83.933902, "municipality": "Waling", "ward": "3", "station": "Waling Municipality Office, Waling (Kha)", "code": "", "voters": "920", "range": "S.No. 869 to 1788"},
    {"lat": 28.113501, "lng": 83.941253, "municipality": "Waling", "ward": "4", "station": "Shanti Ma.Vi., Ramja (Ka)", "code": "2793", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 28.113789, "lng": 83.940483, "municipality": "Waling", "ward": "4", "station": "Shanti Ma.Vi., Ramja (Kha)", "code": "", "voters": "756", "range": "S.No. 757 to 1512"},
    {"lat": 28.114066, "lng": 83.941823, "municipality": "Waling", "ward": "4", "station": "Shanti Ma.Vi., Ramja (Ga)", "code": "", "voters": "802", "range": "S.No. 1513 to 2314"},
    {"lat": 28.121411, "lng": 83.949164, "municipality": "Waling", "ward": "5", "station": "Mahendra Ma.Vi., Pame (Ka)", "code": "2797", "voters": "644", "range": "S.No. 1 to 644"},
    {"lat": 28.121699, "lng": 83.948394, "municipality": "Waling", "ward": "5", "station": "Mahendra Ma.Vi., Pame (Kha)", "code": "", "voters": "668", "range": "S.No. 645 to 1312"},
    {"lat": 28.129322, "lng": 83.957075, "municipality": "Waling", "ward": "6", "station": "Deurali Basic School, Deurali", "code": "2801", "voters": "497", "range": "S.No. 1 to 497"},
    {"lat": 28.129610, "lng": 83.956305, "municipality": "Waling", "ward": "6", "station": "6 No. Ward Office, Kerunja (Ka)", "code": "2805", "voters": "812", "range": "S.No. 1 to 812"},
    {"lat": 28.129898, "lng": 83.957635, "municipality": "Waling", "ward": "6", "station": "6 No. Ward Office, Kerunja (Kha)", "code": "", "voters": "854", "range": "S.No. 813 to 1666"},
    {"lat": 28.137233, "lng": 83.964986, "municipality": "Waling", "ward": "7", "station": "Kalika Ma.Vi., Arjewa (Ka)", "code": "2807", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 28.137521, "lng": 83.964216, "municipality": "Waling", "ward": "7", "station": "Kalika Ma.Vi., Arjewa (Kha)", "code": "", "voters": "749", "range": "S.No. 729 to 1477"},
    {"lat": 28.145144, "lng": 83.972897, "municipality": "Waling", "ward": "8", "station": "Siddhartha Ma.Vi., Bhorle Tad (Ka)", "code": "2811", "voters": "644", "range": "S.No. 1 to 644"},
    {"lat": 28.145432, "lng": 83.972127, "municipality": "Waling", "ward": "8", "station": "Siddhartha Ma.Vi., Bhorle Tad (Kha)", "code": "", "voters": "668", "range": "S.No. 645 to 1312"},
    {"lat": 28.152055, "lng": 83.980808, "municipality": "Waling", "ward": "9", "station": "Janasewa Ma.Vi., Baseri (Ka)", "code": "2815", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 28.152343, "lng": 83.980038, "municipality": "Waling", "ward": "9", "station": "Janasewa Ma.Vi., Baseri (Kha)", "code": "", "voters": "760", "range": "S.No. 757 to 1516"},
    {"lat": 28.159966, "lng": 83.988719, "municipality": "Waling", "ward": "10", "station": "Janajyoti Ma.Vi., Mudikuwa (Ka)", "code": "2819", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 28.160254, "lng": 83.987949, "municipality": "Waling", "ward": "10", "station": "Janajyoti Ma.Vi., Mudikuwa (Kha)", "code": "", "voters": "755", "range": "S.No. 729 to 1483"},
    {"lat": 28.067877, "lng": 83.726631, "municipality": "Phedikhola", "ward": "1", "station": "Machhapuchhre Ma.Vi., Dhading (Ka)", "code": "2756", "voters": "644", "range": "S.No. 1 to 644"},
    {"lat": 28.068165, "lng": 83.725861, "municipality": "Phedikhola", "ward": "1", "station": "Machhapuchhre Ma.Vi., Dhading (Kha)", "code": "", "voters": "668", "range": "S.No. 645 to 1312"},
    {"lat": 28.075788, "lng": 83.734542, "municipality": "Phedikhola", "ward": "2", "station": "Kalu Pandey Ma.Vi., Kalu Pandey", "code": "2760", "voters": "497", "range": "S.No. 1 to 497"},
    {"lat": 28.076076, "lng": 83.733772, "municipality": "Phedikhola", "ward": "2", "station": "Phedikhola Municipality Office, Phedikhola (Ka)", "code": "2764", "voters": "812", "range": "S.No. 1 to 812"},
    {"lat": 28.076364, "lng": 83.735102, "municipality": "Phedikhola", "ward": "2", "station": "Phedikhola Municipality Office, Phedikhola (Kha)", "code": "", "voters": "854", "range": "S.No. 813 to 1666"},
    {"lat": 28.083699, "lng": 83.742453, "municipality": "Phedikhola", "ward": "3", "station": "Janata Basic School, Lahare", "code": "2766", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 28.083987, "lng": 83.741683, "municipality": "Phedikhola", "ward": "3", "station": "3 No. Ward Office, Pokharithok (Ka)", "code": "2770", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 28.084275, "lng": 83.743013, "municipality": "Phedikhola", "ward": "3", "station": "3 No. Ward Office, Pokharithok (Kha)", "code": "", "voters": "760", "range": "S.No. 757 to 1516"},
    {"lat": 28.091610, "lng": 83.750364, "municipality": "Phedikhola", "ward": "4", "station": "Shree Devi Basic School, Bhaluban", "code": "2773", "voters": "644", "range": "S.No. 1 to 644"},
    {"lat": 28.091898, "lng": 83.749594, "municipality": "Phedikhola", "ward": "4", "station": "4 No. Ward Office, Khahare (Ka)", "code": "11675", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 28.092186, "lng": 83.750924, "municipality": "Phedikhola", "ward": "4", "station": "4 No. Ward Office, Khahare (Kha)", "code": "", "voters": "755", "range": "S.No. 729 to 1483"},
    {"lat": 28.169421, "lng": 83.814915, "municipality": "Bhirkot", "ward": "1", "station": "Panchakanya Ma.Vi., Belchautara (Ka)", "code": "2906", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 28.169709, "lng": 83.814145, "municipality": "Bhirkot", "ward": "1", "station": "Panchakanya Ma.Vi., Belchautara (Kha)", "code": "", "voters": "756", "range": "S.No. 757 to 1512"},
    {"lat": 28.169986, "lng": 83.815485, "municipality": "Bhirkot", "ward": "1", "station": "Panchakanya Ma.Vi., Belchautara (Ga)", "code": "", "voters": "802", "range": "S.No. 1513 to 2314"},
    {"lat": 28.177332, "lng": 83.822826, "municipality": "Bhirkot", "ward": "2", "station": "Sharada Ma.Vi., Sirsekot (Ka)", "code": "2910", "voters": "644", "range": "S.No. 1 to 644"},
    {"lat": 28.177620, "lng": 83.822056, "municipality": "Bhirkot", "ward": "2", "station": "Sharada Ma.Vi., Sirsekot (Kha)", "code": "", "voters": "668", "range": "S.No. 645 to 1312"},
    {"lat": 28.184243, "lng": 83.830737, "municipality": "Bhirkot", "ward": "3", "station": "Janakala Basic School, Satyawati", "code": "2914", "voters": "497", "range": "S.No. 1 to 497"},
    {"lat": 28.184531, "lng": 83.829967, "municipality": "Bhirkot", "ward": "3", "station": "Bhrikuteshwor Ma.Vi., Bhrikot (Ka)", "code": "2918", "voters": "812", "range": "S.No. 1 to 812"},
    {"lat": 28.184819, "lng": 83.831297, "municipality": "Bhirkot", "ward": "3", "station": "Bhrikuteshwor Ma.Vi., Bhrikot (Kha)", "code": "", "voters": "854", "range": "S.No. 813 to 1666"},
    {"lat": 28.192154, "lng": 83.838648, "municipality": "Bhirkot", "ward": "4", "station": "Samabeshi Basic School, Dashdhunga", "code": "2920", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 28.192442, "lng": 83.837878, "municipality": "Bhirkot", "ward": "4", "station": "4 No. Ward Office, Manakamana (Ka)", "code": "2924", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 28.192730, "lng": 83.839208, "municipality": "Bhirkot", "ward": "4", "station": "4 No. Ward Office, Manakamana (Kha)", "code": "", "voters": "760", "range": "S.No. 757 to 1516"},
    {"lat": 28.200065, "lng": 83.846559, "municipality": "Bhirkot", "ward": "5", "station": "Janashikshya Ma.Vi., Mirlung (Ka)", "code": "2927", "voters": "644", "range": "S.No. 1 to 644"},
    {"lat": 28.200353, "lng": 83.845789, "municipality": "Bhirkot", "ward": "5", "station": "Janashikshya Ma.Vi., Mirlung (Kha)", "code": "", "voters": "668", "range": "S.No. 645 to 1312"},
    {"lat": 28.149966, "lng": 83.888301, "municipality": "Biruwa", "ward": "1", "station": "Rastriya Ma.Vi., Takum (Ka)", "code": "2823", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 28.150254, "lng": 83.887531, "municipality": "Biruwa", "ward": "1", "station": "Rastriya Ma.Vi., Takum (Kha)", "code": "", "voters": "756", "range": "S.No. 757 to 1512"},
    {"lat": 28.150531, "lng": 83.888871, "municipality": "Biruwa", "ward": "1", "station": "Rastriya Ma.Vi., Takum (Ga)", "code": "", "voters": "802", "range": "S.No. 1513 to 2314"},
    {"lat": 28.157877, "lng": 83.896212, "municipality": "Biruwa", "ward": "2", "station": "Mahendra Ma.Vi., Alampu (Ka)", "code": "2827", "voters": "644", "range": "S.No. 1 to 644"},
    {"lat": 28.158165, "lng": 83.895442, "municipality": "Biruwa", "ward": "2", "station": "Mahendra Ma.Vi., Alampu (Kha)", "code": "", "voters": "668", "range": "S.No. 645 to 1312"},
    {"lat": 28.165788, "lng": 83.904123, "municipality": "Biruwa", "ward": "3", "station": "Janata Basic School, Pelakot", "code": "2831", "voters": "497", "range": "S.No. 1 to 497"},
    {"lat": 28.166076, "lng": 83.903353, "municipality": "Biruwa", "ward": "3", "station": "Tribhuwan Ma.Vi., Biruwa (Ka)", "code": "2835", "voters": "812", "range": "S.No. 1 to 812"},
    {"lat": 28.166364, "lng": 83.904683, "municipality": "Biruwa", "ward": "3", "station": "Tribhuwan Ma.Vi., Biruwa (Kha)", "code": "", "voters": "854", "range": "S.No. 813 to 1666"},
    {"lat": 28.173699, "lng": 83.912034, "municipality": "Biruwa", "ward": "4", "station": "Bal Kalyan Basic School, Bichour", "code": "2837", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 28.173987, "lng": 83.911264, "municipality": "Biruwa", "ward": "4", "station": "4 No. Ward Office, Jhapukharka (Ka)", "code": "2841", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 28.174275, "lng": 83.912594, "municipality": "Biruwa", "ward": "4", "station": "4 No. Ward Office, Jhapukharka (Kha)", "code": "", "voters": "760", "range": "S.No. 757 to 1516"},
    {"lat": 28.219183, "lng": 83.950782, "municipality": "Harinas", "ward": "1", "station": "Bhojprakash Ma.Vi. Saldanda (Ka)", "code": "2705", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 28.219382, "lng": 83.94999, "municipality": "Harinas", "ward": "1", "station": "Bhojprakash Ma.Vi. Saldanda (Kha)", "code": "", "voters": "751", "range": "S.No. 729 to 1479"},
    {"lat": 28.21975, "lng": 83.950208, "municipality": "Harinas", "ward": "1", "station": "Thanapati A.Vi., Khairikot", "code": "10236", "voters": "459", "range": "S.No. 1 to 459"},
    {"lat": 28.216404, "lng": 83.968265, "municipality": "Harinas", "ward": "2", "station": "Jana Kalyan Secondary School, Dhyarsingh Bhandyang (Ka)", "code": "2711", "voters": "644", "range": "S.No. 1 to 644"},
    {"lat": 28.216027, "lng": 83.96689, "municipality": "Harinas", "ward": "2", "station": "Jana Kalyan Secondary School, Dhyarsingh Bhandyang (Kha)", "code": "", "voters": "668", "range": "S.No. 645 to 1312"},
    {"lat": 28.216787, "lng": 83.967321, "municipality": "Harinas", "ward": "2", "station": "Mahima Ma.Vi., Chisapani", "code": "2712", "voters": "497", "range": "S.No. 1 to 497"},
    {"lat": 28.205876, "lng": 83.982114, "municipality": "Harinas", "ward": "3", "station": "Kalika A.Vi., Dhupdanda (Ka)", "code": "10237", "voters": "1064", "range": "S.No. 1 to 1064"},
    {"lat": 28.205422, "lng": 83.98086, "municipality": "Harinas", "ward": "3", "station": "Kalika A.Vi., Dhupdanda (Kha)", "code": "", "voters": "1064", "range": "S.No. 1065 to 2128"},
    {"lat": 28.187905, "lng": 83.988261, "municipality": "Harinas", "ward": "4", "station": "Saraswati Basic School, Kulungkhola", "code": "2946", "voters": "282", "range": "S.No. 1 to 282"},
    {"lat": 28.188737, "lng": 83.989988, "municipality": "Harinas", "ward": "4", "station": "Bal Jyoti Basic School Karanswara (Ka)", "code": "2952", "voters": "532", "range": "S.No. 1 to 532"},
    {"lat": 28.189635, "lng": 83.98832, "municipality": "Harinas", "ward": "4", "station": "Bal Jyoti Basic School Karanswara (Kha)", "code": "", "voters": "587", "range": "S.No. 533 to 1119"},
    {"lat": 28.188447, "lng": 83.988431, "municipality": "Harinas", "ward": "4", "station": "4 No. Ward Office, Rodikhola (Ka)", "code": "2954", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 28.188649, "lng": 83.98859, "municipality": "Harinas", "ward": "4", "station": "4 No. Ward Office, Rodikhola (Kha)", "code": "", "voters": "759", "range": "S.No. 757 to 1515"},
    {"lat": 28.170803, "lng": 83.989535, "municipality": "Harinas", "ward": "5", "station": "Kalika Deurali Secondary School, Kalwa Deurali (Ka)", "code": "2931", "voters": "812", "range": "S.No. 1 to 812"},
    {"lat": 28.171491, "lng": 83.989189, "municipality": "Harinas", "ward": "5", "station": "Kalika Deurali Secondary School, Kalwa Deurali (Kha)", "code": "", "voters": "854", "range": "S.No. 813 to 1666"},
    {"lat": 28.154383, "lng": 83.980285, "municipality": "Harinas", "ward": "6", "station": "Pitambar Ma.Vi., Duddi (Ka)", "code": "2934", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 28.154841, "lng": 83.980929, "municipality": "Harinas", "ward": "6", "station": "Pitambar Ma.Vi., Duddi (Kha)", "code": "", "voters": "756", "range": "S.No. 757 to 1512"},
    {"lat": 28.154265, "lng": 83.98154, "municipality": "Harinas", "ward": "6", "station": "Pitambar Ma.Vi., Duddi (Ga)", "code": "", "voters": "802", "range": "S.No. 1513 to 2314"},
    {"lat": 28.144578, "lng": 83.96781, "municipality": "Harinas", "ward": "7", "station": "Siddha Basic School, Khaddrithok", "code": "2937", "voters": "1054", "range": "S.No. 1 to 1054"},
    {"lat": 28.144696, "lng": 83.966559, "municipality": "Harinas", "ward": "7", "station": "Amala Bhandyang Ma.Vi., Changsing (Ka)", "code": "2942", "voters": "588", "range": "S.No. 1 to 588"},
    {"lat": 28.144497, "lng": 83.967968, "municipality": "Harinas", "ward": "7", "station": "Amala Bhandyang Ma.Vi., Changsing (Kha)", "code": "", "voters": "610", "range": "S.No. 589 to 1198"}
];

// --- Add new attributes to each station ---
pollingStationsData.forEach(station => {
    station.party = getRandomParty();
    station.visits = getRandomVisits();
    station.contacts = generateContacts();
});

// --- Store all markers for filtering ---
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

    pollingStationsData.forEach(function(station) {
        // Apply filters
        if (currentFilters.party !== 'all' && station.party !== currentFilters.party) return;
        if (currentFilters.municipality !== 'all' && station.municipality !== currentFilters.municipality) return;
        
        if (currentFilters.visits !== 'all') {
            if (currentFilters.visits === 0 && station.visits !== 0) return;
            if (currentFilters.visits === '1-2' && (station.visits < 1 || station.visits > 2)) return;
            if (currentFilters.visits === '3+' && station.visits < 3) return;
        }
        
        const icon = createIcon(station.municipality, station.party, station.visits);
        const marker = L.marker([station.lat, station.lng], { icon: icon });
        
        // Create enhanced popup content
        const contactsHTML = station.contacts.map(contact => `
            <div class="contact-person">
                <span class="contact-name">${contact.name}</span>
                <span class="contact-phone"><i class="fas fa-phone"></i> ${contact.phone}</span>
            </div>
        `).join('');
        
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
