const svg = document.getElementById('venueCanvas');
let selectedArea = 'showroom';

const areas = [
    { id: 'showroom', label: 'Showroom Mobil', color: '#4A90E2', x: 110, y: 100, width: 310, height: 140, rx: 10, classname: 'interactive' },
    { id: 'service', label: 'Service & Spare Part', color: '#7ED321', x: 110, y: 320, width: 250, height: 160, rx: 10, classname: 'interactive' },
    { id: 'vip', label: 'Ruang Tunggu', color: '#F5A623', x: 450, y: 100, width: 120, height: 100, rx: 10, classname: 'interactive' },
    { id: 'Toilet', label: 'Toilet', color: '#10bde0', x: 115, y: 250, width: 110, height: 50, rx: 10, classname: 'interactive' },
    { id: 'sales', label: 'Sales', color: '#BD10E0', x: 230, y: 250, width: 200, height: 50, rx: 10, classname: 'interactive' },
    { id: 'customer service', label: 'Customer Service', color: '#a651b7', x: 450, y: 230, width: 100, height: 60, rx: 10, classname:'interactive' },
    { id: 'Main Entrance', label: 'Pintu Masuk/keluar', color: '#50E3C2', x: 610, y: 100, width: 120, height: 60, rx: 10, classname: 'interactive' },
    { id: 'Toilet', label: 'Toilet', color: '#10bde0', x: 750, y: 370, width: 80, height: 50, rx: 10, classname: 'interactive' },
    { id: 'Training', label: 'Training Room', color: '#FF6600', x: 780, y: 240, width: 90, height: 80, rx: 10, classname: 'interactive' },
    { id: 'Lift', label: 'Lift', color: '#bad7c5', x: 660, y: 370, width: 80, height: 80, rx: 10, classname:'interactive' },
    { id: 'Lantai 1', label: '', color: 'transparent', x: 100, y: 90, width: 800, height: 410, classname: 'non-interactive'},
];

async function updateStatsFromDatabase() {
    try {
        const response = await fetch('api_stats.php');
        const data = await response.json();

        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            const label = item.querySelector('.stat-label');
            if (label && label.innerText.includes('Sales Aktif')) {
                const value = item.querySelector('.stat-value');
                value.innerText = `${data.sales_aktif} Orang`;
            }
        });
    } catch (error) {
        console.error("Gagal mengambil data dari tabel bbm:", error);
    }
}

function drawCorridor() {
    const corridor = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    corridor.setAttribute('x', '240');
    corridor.setAttribute('y', '560');
    corridor.setAttribute('width', '520');
    corridor.setAttribute('height', '60');
    corridor.setAttribute('fill', '#E0E0E0');
    corridor.setAttribute('stroke', '#999');
    corridor.setAttribute('stroke-width', 2);
    corridor.setAttribute('rx', 5);
    svg.appendChild(corridor);
}

function drawArea(area) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    if (area.transform) g.setAttribute('transform', area.transform);

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', area.x);
    rect.setAttribute('y', area.y);
    rect.setAttribute('width', area.width);
    rect.setAttribute('height', area.height);
    rect.setAttribute('fill', area.color);
    rect.setAttribute('rx', area.rx || 0);
    rect.style.cursor = 'pointer';
    rect.classList.add('area-shape');
    
    if (area.id === selectedArea) rect.classList.add('selected');

    rect.addEventListener('click', () => {
        document.querySelectorAll('.area-shape').forEach(s => s.classList.remove('selected'));
        rect.classList.add('selected');
        selectedArea = area.id;
        console.log('Selected:', area.label);
    });

    g.appendChild(rect);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', area.x + area.width / 2);
    text.setAttribute('y', area.y + area.height / 2);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', area.id === 'reception' ? 'black' : 'white');
    text.setAttribute('font-size', area.width > 200 ? '20' : '12');
    text.setAttribute('font-weight', 'bold');
    text.textContent = area.label;
    text.style.pointerEvents = 'none';
    g.appendChild(text);

    svg.appendChild(g);
}

async function syncSalesData() {
    try {
        const response = await fetch ('api_stats.php');
        const data = await response.json();

        const salesElement = document.getElementById('sales-count');
        if (salesElement) {
            salesElement.innerText = '${data.total_sales} orang';
        }
    } catch (error) {
        console.error("gagal memuat data : ", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    drawCorridor();
    syncSalesData();
    areas.forEach(drawArea);
    
    updateStatsFromDatabase();

    const items = document.querySelectorAll('.convention-item');
    items.forEach(item => {
        item.addEventListener('click', function() {
            items.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            console.log('Area dipilih:' , this.querySelector('span:last-child').innerText);
        });
    });
});