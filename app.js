// --- Map Initialization --- 
const map = L.map('map', {
    center: [28.10, 83.85], // Centered on Syangja district
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

// --- Custom Icons for different municipalities ---
const municipalityIcons = {
    Arjunchaupari: L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#FF6B6B; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;'></div>",
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    }),
    Aandhikhola: L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#4ECDC4; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;'></div>",
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    }),
    Putalibazar: L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#45B7D1; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;'></div>",
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    }),
    Waling: L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#F7B731; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;'></div>",
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    }),
    Phedikhola: L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#A55EEA; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;'></div>",
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    }),
    Bhirkot: L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#26DE81; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;'></div>",
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    }),
    Biruwa: L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#FD79A8; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;'></div>",
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    }),
    Harinas: L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#FC5C65; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;'></div>",
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    }),
    Default: L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='background-color:#95A5A6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;'></div>",
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    })
};

// --- Layer Groups for each municipality ---
let municipalityLayers = {
    Arjunchaupari: L.layerGroup().addTo(map),
    Aandhikhola: L.layerGroup().addTo(map),
    Putalibazar: L.layerGroup().addTo(map),
    Waling: L.layerGroup().addTo(map),
    Phedikhola: L.layerGroup().addTo(map),
    Bhirkot: L.layerGroup().addTo(map),
    Biruwa: L.layerGroup().addTo(map),
    Harinas: L.layerGroup().addTo(map)
};

// CSV Data converted to GeoJSON format
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
    {"lat": 28.024059, "lng": 83.881161, "municipality": "Aandhikhola", "ward": "3", "station": "Rashtriya Ma.Vi., Puwadanda (Ka)", "code": "2557", "voters": "840", "range": "S.No. 1 to 840"},
    {"lat": 28.024577, "lng": 83.881937, "municipality": "Aandhikhola", "ward": "3", "station": "Rashtriya Ma.Vi., Puwadanda (Kha)", "code": "", "voters": "841", "range": "S.No. 841 to 1681"},
    {"lat": 28.02521, "lng": 83.88074, "municipality": "Aandhikhola", "ward": "3", "station": "Andhadhi Prakash Ma.Vi., Athgaure", "code": "2563", "voters": "836", "range": "S.No. 1 to 836"},
    {"lat": 28.009159, "lng": 83.889238, "municipality": "Aandhikhola", "ward": "4", "station": "Sepat Siranchaur Ma.Vi., Sepat", "code": "2586", "voters": "1009", "range": "S.No. 1 to 1009"},
    {"lat": 28.009773, "lng": 83.889641, "municipality": "Aandhikhola", "ward": "4", "station": "Shrawan Ma.Vi., Wangsing Deurali (Ka)", "code": "2589", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 28.008062, "lng": 83.888054, "municipality": "Aandhikhola", "ward": "4", "station": "Shrawan Ma.Vi., Wangsing Deurali (Kha)", "code": "", "voters": "803", "range": "S.No. 757 to 1559"},
    {"lat": 27.99152, "lng": 83.888064, "municipality": "Aandhikhola", "ward": "5", "station": "Saraswati Basic School, Setidabhan", "code": "2797", "voters": "858", "range": "S.No. 1 to 858"},
    {"lat": 27.990544, "lng": 83.889516, "municipality": "Aandhikhola", "ward": "5", "station": "Pradhan Paneru Ma.Vi., Rangthethati (Ka)", "code": "2801", "voters": "1008", "range": "S.No. 1 to 1008"},
    {"lat": 27.99205, "lng": 83.889944, "municipality": "Aandhikhola", "ward": "5", "station": "Pradhan Paneru Ma.Vi., Rangthethati (Kha)", "code": "", "voters": "1031", "range": "S.No. 1009 to 2039"},
    {"lat": 27.974437, "lng": 83.88133, "municipality": "Aandhikhola", "ward": "6", "station": "Laxmi Basic School, Dhakaldanda", "code": "2802", "voters": "610", "range": "S.No. 1 to 610"},
    {"lat": 27.975919, "lng": 83.880805, "municipality": "Aandhikhola", "ward": "6", "station": "Bhagwati Ma.Vi., Lamiswara Ninuwabot (Ka)", "code": "2832", "voters": "588", "range": "S.No. 1 to 588"},
    {"lat": 27.974149, "lng": 83.881378, "municipality": "Aandhikhola", "ward": "6", "station": "Bhagwati Ma.Vi., Lamiswara Ninuwabot (Kha)", "code": "", "voters": "605", "range": "S.No. 589 to 1193"},
    {"lat": 27.974365, "lng": 83.881454, "municipality": "Aandhikhola", "ward": "6", "station": "Sharada Temple Ma.Vi., Tikaja (Ka)", "code": "2835", "voters": "588", "range": "S.No. 1 to 588"},
    {"lat": 27.975353, "lng": 83.88148, "municipality": "Aandhikhola", "ward": "6", "station": "Sharada Temple Ma.Vi., Tikaja (Kha)", "code": "", "voters": "619", "range": "S.No. 589 to 1207"},
    {"lat": 28.142972, "lng": 83.857638, "municipality": "Putalibazar", "ward": "1", "station": "Tribhuwan Adarsh Ma.Vi. Syanjabazar (Ka)", "code": "2745", "voters": "840", "range": "S.No. 1 to 840"},
    {"lat": 28.143901, "lng": 83.857173, "municipality": "Putalibazar", "ward": "1", "station": "Tribhuwan Adarsh Ma.Vi. Syanjabazar (Kha)", "code": "", "voters": "868", "range": "S.No. 841 to 1708"},
    {"lat": 28.143179, "lng": 83.857019, "municipality": "Putalibazar", "ward": "1", "station": "Tribhuwan Adarsh Ma.Vi. Syanjabazar (Ga)", "code": "", "voters": "891", "range": "S.No. 1709 to 2599"},
    {"lat": 28.138981, "lng": 83.875587, "municipality": "Putalibazar", "ward": "2", "station": "Barahaguthi Basic School, Chidwa", "code": "2732", "voters": "967", "range": "S.No. 1 to 967"},
    {"lat": 28.139294, "lng": 83.875725, "municipality": "Putalibazar", "ward": "2", "station": "Thumkidanda Temple, Kusunde (Ka)", "code": "2749", "voters": "672", "range": "S.No. 1 to 672"},
    {"lat": 28.140273, "lng": 83.875636, "municipality": "Putalibazar", "ward": "2", "station": "Thumkidanda Temple, Kusunde (Kha)", "code": "", "voters": "687", "range": "S.No. 673 to 1359"},
    {"lat": 28.127987, "lng": 83.889319, "municipality": "Putalibazar", "ward": "3", "station": "Punyashila Basic School, Nirabire (Ka)", "code": "2752", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 28.128133, "lng": 83.889166, "municipality": "Putalibazar", "ward": "3", "station": "Punyashila Basic School, Nirabire (Kha)", "code": "", "voters": "765", "range": "S.No. 729 to 1493"},
    {"lat": 28.128379, "lng": 83.88867, "municipality": "Putalibazar", "ward": "3", "station": "Saraswati Ma.Vi., Gairikhet (Ka)", "code": "2757", "voters": "868", "range": "S.No. 1 to 868"},
    {"lat": 28.128543, "lng": 83.888369, "municipality": "Putalibazar", "ward": "3", "station": "Saraswati Ma.Vi., Gairikhet (Kha)", "code": "", "voters": "870", "range": "S.No. 869 to 1738"},
    {"lat": 28.128065, "lng": 83.890105, "municipality": "Putalibazar", "ward": "3", "station": "Kajiman Haritika Ma.Vi., Putalikhet", "code": "2759", "voters": "951", "range": "S.No. 1 to 951"},
    {"lat": 28.112379, "lng": 83.896196, "municipality": "Putalibazar", "ward": "4", "station": "Ramkosh Phulbari Ma.Vi., Ramkosh (Ka)", "code": "2763", "voters": "672", "range": "S.No. 1 to 672"},
    {"lat": 28.111675, "lng": 83.897494, "municipality": "Putalibazar", "ward": "4", "station": "Ramkosh Phulbari Ma.Vi., Ramkosh (Kha)", "code": "", "voters": "708", "range": "S.No. 673 to 1380"},
    {"lat": 28.113545, "lng": 83.897834, "municipality": "Putalibazar", "ward": "4", "station": "Saraswati Ma.Vi., Nagdanda (Ka)", "code": "2769", "voters": "812", "range": "S.No. 1 to 812"},
    {"lat": 28.11313, "lng": 83.897654, "municipality": "Putalibazar", "ward": "4", "station": "Saraswati Ma.Vi., Nagdanda (Kha)", "code": "", "voters": "830", "range": "S.No. 813 to 1642"},
    {"lat": 28.095207, "lng": 83.896488, "municipality": "Putalibazar", "ward": "5", "station": "Shitala Ma.Vi., Gaude (Ka)", "code": "2649", "voters": "812", "range": "S.No. 1 to 812"},
    {"lat": 28.09425, "lng": 83.897666, "municipality": "Putalibazar", "ward": "5", "station": "Shitala Ma.Vi., Gaude (Kha)", "code": "", "voters": "826", "range": "S.No. 813 to 1638"},
    {"lat": 28.095156, "lng": 83.896728, "municipality": "Putalibazar", "ward": "5", "station": "Jana Jyoti Basic School, Bhrikuna", "code": "2651", "voters": "700", "range": "S.No. 1 to 700"},
    {"lat": 28.09422, "lng": 83.897558, "municipality": "Putalibazar", "ward": "5", "station": "Saraswati Basic School, Katuyechaur", "code": "2653", "voters": "661", "range": "S.No. 1 to 661"},
    {"lat": 28.078336, "lng": 83.888965, "municipality": "Putalibazar", "ward": "6", "station": "Shishu Kalyan Jana Priya Secondary School, Dangling Kaule", "code": "2662", "voters": "730", "range": "S.No. 1 to 730"},
    {"lat": 28.077749, "lng": 83.889507, "municipality": "Putalibazar", "ward": "6", "station": "Himalaya Ma.Vi. Khalanga", "code": "2663", "voters": "940", "range": "S.No. 1 to 940"},
    {"lat": 28.078455, "lng": 83.889224, "municipality": "Putalibazar", "ward": "6", "station": "Durga Bhagwati Basic School, Rayale", "code": "2669", "voters": "644", "range": "S.No. 1 to 644"},
    {"lat": 28.067532, "lng": 83.875982, "municipality": "Putalibazar", "ward": "7", "station": "Janata Ma.Vi., Thuladihi (Ka)", "code": "2674", "voters": "784", "range": "S.No. 1 to 784"},
    {"lat": 28.066777, "lng": 83.875323, "municipality": "Putalibazar", "ward": "7", "station": "Janata Ma.Vi., Thuladihi (Kha)", "code": "", "voters": "812", "range": "S.No. 785 to 1596"},
    {"lat": 28.067995, "lng": 83.874418, "municipality": "Putalibazar", "ward": "7", "station": "Janata Ma.Vi., Thuladihi (Ga)", "code": "", "voters": "812", "range": "S.No. 1597 to 2408"},
    {"lat": 28.104144, "lng": 83.781263, "municipality": "Waling", "ward": "3", "station": "Majhakot Shivalaya Ma.Vi., Majhakot", "code": "2905", "voters": "845", "range": "S.No. 1 to 845"},
    {"lat": 28.105314, "lng": 83.781656, "municipality": "Waling", "ward": "3", "station": "Balrun Basic School, Koldanda", "code": "2908", "voters": "701", "range": "S.No. 1 to 701"},
    {"lat": 28.088933, "lng": 83.789513, "municipality": "Waling", "ward": "4", "station": "Jethkanya Basic School, Eladi (Ka)", "code": "2959", "voters": "560", "range": "S.No. 1 to 560"},
    {"lat": 28.088504, "lng": 83.78848, "municipality": "Waling", "ward": "4", "station": "Jethkanya Basic School, Eladi (Kha)", "code": "", "voters": "600", "range": "S.No. 561 to 1160"},
    {"lat": 28.089175, "lng": 83.789774, "municipality": "Waling", "ward": "4", "station": "Janhit Basic School, Paudure", "code": "2962", "voters": "750", "range": "S.No. 1 to 750"},
    {"lat": 28.088709, "lng": 83.789218, "municipality": "Waling", "ward": "4", "station": "Kusundanda A.Vi., Chihare", "code": "10231", "voters": "613", "range": "S.No. 1 to 613"},
    {"lat": 27.958946, "lng": 83.819813, "municipality": "Phedikhola", "ward": "4", "station": "Sitala Ma.Vi., Galem", "code": "2639", "voters": "865", "range": "S.No. 1 to 865"},
    {"lat": 27.959291, "lng": 83.818506, "municipality": "Phedikhola", "ward": "4", "station": "Jana Adarsha Ma.Vi., Sherbazar (Ka)", "code": "2640", "voters": "812", "range": "S.No. 1 to 812"},
    {"lat": 27.959573, "lng": 83.818569, "municipality": "Phedikhola", "ward": "4", "station": "Jana Adarsha Ma.Vi., Sherbazar (Kha)", "code": "", "voters": "829", "range": "S.No. 813 to 1641"},
    {"lat": 27.959481, "lng": 83.818445, "municipality": "Phedikhola", "ward": "4", "station": "Adhkharka Basic School, Tokre", "code": "2642", "voters": "637", "range": "S.No. 1 to 637"},
    {"lat": 27.940896, "lng": 83.81917, "municipality": "Phedikhola", "ward": "5", "station": "Barahi Basic School, Samaresh", "code": "2595", "voters": "324", "range": "S.No. 1 to 324"},
    {"lat": 27.941262, "lng": 83.8199, "municipality": "Phedikhola", "ward": "5", "station": "Maidan Ma.Vi., Maidan", "code": "2598", "voters": "897", "range": "S.No. 1 to 897"},
    {"lat": 28.189649, "lng": 83.920909, "municipality": "Bhirkot", "ward": "1", "station": "Raniraha Basic School, Lamachaur", "code": "3079", "voters": "819", "range": "S.No. 1 to 819"},
    {"lat": 28.190927, "lng": 83.919081, "municipality": "Bhirkot", "ward": "1", "station": "Bhirkot Municipality Ward No. 1 Office, Bayarghari (Ka)", "code": "10229", "voters": "672", "range": "S.No. 1 to 672"},
    {"lat": 28.190007, "lng": 83.91958, "municipality": "Bhirkot", "ward": "1", "station": "Bhirkot Municipality Ward No. 1 Office, Bayarghari (Kha)", "code": "", "voters": "692", "range": "S.No. 673 to 1364"},
    {"lat": 28.185692, "lng": 83.936901, "municipality": "Bhirkot", "ward": "2", "station": "Krishi Sewa Kendra, Bayarghari (Ka)", "code": "3084", "voters": "644", "range": "S.No. 1 to 644"},
    {"lat": 28.186383, "lng": 83.937942, "municipality": "Bhirkot", "ward": "2", "station": "Krishi Sewa Kendra, Bayarghari (Kha)", "code": "", "voters": "665", "range": "S.No. 645 to 1309"},
    {"lat": 28.186714, "lng": 83.937821, "municipality": "Bhirkot", "ward": "2", "station": "Dhruwa Deurali Basic School, Balamadanda Kegha", "code": "3089", "voters": "995", "range": "S.No. 1 to 995"},
    {"lat": 28.175264, "lng": 83.950639, "municipality": "Bhirkot", "ward": "3", "station": "Kalika Secondary School, Bheterpata", "code": "2894", "voters": "1036", "range": "S.No. 1 to 1036"},
    {"lat": 28.174928, "lng": 83.951081, "municipality": "Bhirkot", "ward": "3", "station": "Shahid Shukra Ma.Vi., Bastra Deurali", "code": "2897", "voters": "1046", "range": "S.No. 1 to 1046"},
    {"lat": 28.175558, "lng": 83.951351, "municipality": "Bhirkot", "ward": "3", "station": "Jana Jyoti Secondary School, Syanichaur Gumadi", "code": "2901", "voters": "1028", "range": "S.No. 1 to 1028"},
    {"lat": 28.158306, "lng": 83.95829, "municipality": "Bhirkot", "ward": "4", "station": "Chhangchhangdi Basic School, Chhangchhangdi", "code": "3070", "voters": "818", "range": "S.No. 1 to 818"},
    {"lat": 28.159855, "lng": 83.958079, "municipality": "Bhirkot", "ward": "4", "station": "Dabhungthati Ma.Vi., Dabhungthati", "code": "3074", "voters": "566", "range": "S.No. 1 to 566"},
    {"lat": 27.960917, "lng": 83.880158, "municipality": "Biruwa", "ward": "1", "station": "Nava Jyoti Ma.Vi., Biruwa (Ka)", "code": "12034", "voters": "784", "range": "S.No. 1 to 784"},
    {"lat": 27.960057, "lng": 83.880127, "municipality": "Biruwa", "ward": "1", "station": "Nava Jyoti Ma.Vi., Biruwa (Kha)", "code": "", "voters": "806", "range": "S.No. 785 to 1590"},
    {"lat": 27.955787, "lng": 83.897935, "municipality": "Biruwa", "ward": "2", "station": "Jamune Danda Ma.Vi., Jamune Danda (Ka)", "code": "2873", "voters": "756", "range": "S.No. 1 to 756"},
    {"lat": 27.956483, "lng": 83.896703, "municipality": "Biruwa", "ward": "2", "station": "Jamune Danda Ma.Vi., Jamune Danda (Kha)", "code": "", "voters": "780", "range": "S.No. 757 to 1536"},
    {"lat": 27.955252, "lng": 83.897292, "municipality": "Biruwa", "ward": "2", "station": "Tulsichaur Basic School, Gaukha", "code": "2887", "voters": "301", "range": "S.No. 1 to 301"},
    {"lat": 27.945644, "lng": 83.910856, "municipality": "Biruwa", "ward": "3", "station": "Shiddha Mandali Basic School, Khali (Ka)", "code": "2736", "voters": "700", "range": "S.No. 1 to 700"},
    {"lat": 27.94522, "lng": 83.91122, "municipality": "Biruwa", "ward": "3", "station": "Shiddha Mandali Basic School, Khali (Kha)", "code": "", "voters": "735", "range": "S.No. 701 to 1435"},
    {"lat": 27.945577, "lng": 83.911002, "municipality": "Biruwa", "ward": "3", "station": "Dhowadi Bhandyang Basic School, Dhowadi Bhandyang", "code": "2740", "voters": "489", "range": "S.No. 1 to 489"},
    {"lat": 27.929319, "lng": 83.919468, "municipality": "Biruwa", "ward": "4", "station": "Divya Prakash Ma.Vi., Saunepani (Ka)", "code": "2726", "voters": "616", "range": "S.No. 1 to 616"},
    {"lat": 27.928066, "lng": 83.918539, "municipality": "Biruwa", "ward": "4", "station": "Divya Prakash Ma.Vi., Saunepani (Kha)", "code": "", "voters": "637", "range": "S.No. 617 to 1253"},
    {"lat": 27.92975, "lng": 83.918103, "municipality": "Biruwa", "ward": "4", "station": "Bhavishya Nirman Ma.Vi., Sthangaira (Ka)", "code": "2728", "voters": "728", "range": "S.No. 1 to 728"},
    {"lat": 27.92931, "lng": 83.918961, "municipality": "Biruwa", "ward": "4", "station": "Bhavishya Nirman Ma.Vi., Sthangaira (Kha)", "code": "", "voters": "732", "range": "S.No. 729 to 1460"},
    {"lat": 27.928073, "lng": 83.918071, "municipality": "Biruwa", "ward": "4", "station": "Khudi Basic School, Khorthape", "code": "2729", "voters": "841", "range": "S.No. 1 to 841"},
    {"lat": 27.9102, "lng": 83.919849, "municipality": "Biruwa", "ward": "5", "station": "Kichanas Basic School, Nagasthan", "code": "2693", "voters": "886", "range": "S.No. 1 to 886"},
    {"lat": 27.911371, "lng": 83.918325, "municipality": "Biruwa", "ward": "5", "station": "Devvani Basic School, Devisthan (Ka)", "code": "2696", "voters": "588", "range": "S.No. 1 to 588"},
    {"lat": 27.9113, "lng": 83.919087, "municipality": "Biruwa", "ward": "5", "station": "Devvani Basic School, Devisthan (Kha)", "code": "", "voters": "602", "range": "S.No. 589 to 1190"},
    {"lat": 27.894688, "lng": 83.911569, "municipality": "Biruwa", "ward": "6", "station": "Jana Jagriti Basic School, Khanigaun", "code": "2923", "voters": "849", "range": "S.No. 1 to 849"},
    {"lat": 27.895773, "lng": 83.912178, "municipality": "Biruwa", "ward": "6", "station": "Jana Priya Ma.Vi., Chittebas (Ka)", "code": "2927", "voters": "588", "range": "S.No. 1 to 588"},
    {"lat": 27.895271, "lng": 83.911255, "municipality": "Biruwa", "ward": "6", "station": "Jana Priya Ma.Vi., Chittebas (Kha)", "code": "", "voters": "639", "range": "S.No. 589 to 1227"},
    {"lat": 27.884828, "lng": 83.897662, "municipality": "Biruwa", "ward": "7", "station": "Jivan Jyoti Ma.Vi., Kumumbhandyang (Ka)", "code": "2914", "voters": "1008", "range": "S.No. 1 to 1008"},
    {"lat": 27.884162, "lng": 83.896832, "municipality": "Biruwa", "ward": "7", "station": "Jivan Jyoti Ma.Vi., Kumumbhandyang (Kha)", "code": "", "voters": "1021", "range": "S.No. 1009 to 2029"},
    {"lat": 27.880103, "lng": 83.880457, "municipality": "Biruwa", "ward": "8", "station": "Chaitanya Bhavani Basic School, Tallu Bhandyang", "code": "2918", "voters": "964", "range": "S.No. 1 to 964"},
    {"lat": 27.879925, "lng": 83.879205, "municipality": "Biruwa", "ward": "8", "station": "Bhrung Chauki Ma.Vi., Methabhrung", "code": "10235", "voters": "1042", "range": "S.No. 1 to 1042"},
    {"lat": 28.21931, "lng": 83.949062, "municipality": "Harinas", "ward": "1", "station": "Bhojprakash Ma.Vi. Saldanda (Ka)", "code": "2707", "voters": "728", "range": "S.No. 1 to 728"},
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

// --- Add Markers to Map ---
pollingStationsData.forEach(function(station) {
    const municipality = station.municipality;
    const icon = municipalityIcons[municipality] || municipalityIcons.Default;
    
    const marker = L.marker([station.lat, station.lng], { icon: icon });
    
    // Add to appropriate layer
    if (municipalityLayers[municipality]) {
        municipalityLayers[municipality].addLayer(marker);
    }
    
    // Create popup content
    const popupContent = `
        <div style="max-width: 300px;">
            <b>${station.station}</b><br>
            <b>Municipality:</b> ${station.municipality}<br>
            <b>Ward No.:</b> ${station.ward}<br>
            ${station.code ? `<b>Code:</b> ${station.code}<br>` : ''}
            <b>Total Voters:</b> ${station.voters}<br>
            <b>Voter Range:</b> ${station.range}
        </div>
    `;
    marker.bindPopup(popupContent);
});

// --- Button Events ---
document.getElementById('arjunchaupari-btn').addEventListener('click', () => {
    toggleLayer('Arjunchaupari');
    setActiveButton('arjunchaupari');
});
document.getElementById('aandhikhola-btn').addEventListener('click', () => {
    toggleLayer('Aandhikhola');
    setActiveButton('aandhikhola');
});
document.getElementById('putalibazar-btn').addEventListener('click', () => {
    toggleLayer('Putalibazar');
    setActiveButton('putalibazar');
});
document.getElementById('waling-btn').addEventListener('click', () => {
    toggleLayer('Waling');
    setActiveButton('waling');
});
document.getElementById('phedikhola-btn').addEventListener('click', () => {
    toggleLayer('Phedikhola');
    setActiveButton('phedikhola');
});
document.getElementById('bhirkot-btn').addEventListener('click', () => {
    toggleLayer('Bhirkot');
    setActiveButton('bhirkot');
});
document.getElementById('biruwa-btn').addEventListener('click', () => {
    toggleLayer('Biruwa');
    setActiveButton('biruwa');
});
document.getElementById('harinas-btn').addEventListener('click', () => {
    toggleLayer('Harinas');
    setActiveButton('harinas');
});
document.getElementById('all-btn').addEventListener('click', () => {
    showAllLayers();
    setActiveButton('all');
});

// --- Layer Toggle Function ---
function toggleLayer(municipality) {
    // Hide all layers
    Object.keys(municipalityLayers).forEach(mun => {
        if (mun !== municipality && map.hasLayer(municipalityLayers[mun])) {
            map.removeLayer(municipalityLayers[mun]);
        }
    });

    // Show selected layer
    const layer = municipalityLayers[municipality];
    if (!map.hasLayer(layer)) {
        map.addLayer(layer);
    }
}

// --- Show All Layers ---
function showAllLayers() {
    Object.keys(municipalityLayers).forEach(mun => {
        if (!map.hasLayer(municipalityLayers[mun])) {
            map.addLayer(municipalityLayers[mun]);
        }
    });
}

// --- Active Button UI Feedback ---
function setActiveButton(type) {
    document.querySelectorAll('#map-controls button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${type}-btn`).classList.add('active');
}
