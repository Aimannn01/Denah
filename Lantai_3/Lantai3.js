const svg = document.getElementById('venueCanvas');
let selectedArea = null;

const areas = [
    { id: 'it_room', label: 'Ruang IT', color: '#0a73ea', x: 70, y: 220, width: 200, height: 120, rx: 10 },
    { id: 'toilet', label: 'Toilet', color: '#10bde0', x: 630, y: 470, width: 80, height: 70, rx: 10 },
    { id: 'lift', label: 'Lift', color: '#bad7c5', x: 560, y: 470, width: 60, height: 60, rx: 10 },
    { id: 'musholla', label: 'Musholla', color: '#0adc2d', x: 470, y: 470, width: 80, height: 70, rx: 10 },
    { id: 'kantin', label: 'Kantin', color: '#cc3d3d85', x: 70, y: 570, width: 100, height: 100, rx: 10 },
    { id: 'general', label: 'General', color: '#777777', x: 280, y: 230, width: 100, height: 100, rx: 10 },
    { id: 'sales', label: 'Sales Room', color: '#BD10E0', x: 760, y: 350, width: 100, height: 100, rx: 10 },
    { id: 'hc_legal', label: 'HC & Legal', color: '#9c1717', x: 70, y: 365, width: 175, height: 70, rx: 10 },
    { id: 'ruangan_1', label: 'Ruangan', color: '#118e99', x: 290, y: 470, width: 100, height: 60, rx: 10 },
    { id: 'ruangan_2', label: 'Ruangan', color: '#118e99', x: 180, y: 470, width: 100, height: 60, rx: 10 },
    { id: 'ruangan_3', label: 'Ruangan', color: '#118e99', x: 60, y: 440, width: 90, height: 60, rx: 10 },
    { id: 'finance_1', label: 'Finance', color: '#bbbbbb', x: 390, y: 260, width: 100, height: 70, rx: 10 },
    { id: 'finance_2', label: 'Finance', color: '#bbbbbb', x: 500, y: 260, width: 100, height: 70, rx: 10 },
    { id: 'finance_3', label: 'Finance', color: '#bbbbbb', x: 610, y: 260, width: 100, height: 70, rx: 10 },
    { id: 'finance_4', label: 'Finance', color: '#bbbbbb', x: 720, y: 260, width: 100, height: 70, rx: 10 },
    { id: 'border', label: '', color: 'transparent', x: 50, y: 200, width: 850, height: 480, rx: 10, type: 'border' }
];

const entrances = [{ x: 900, y: 450, label: 'Pintu Utama' }];
const markers = [];

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

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', area.x);
    rect.setAttribute('y', area.y);
    rect.setAttribute('width', area.width);
    rect.setAttribute('height', area.height);
    rect.setAttribute('fill', area.color);
    rect.setAttribute('rx', area.rx || 0);
    
    if (area.type !== 'border') {
        rect.style.cursor = 'pointer';
        rect.setAttribute('stroke', '#fff');
        rect.setAttribute('stroke-width', '1');
        rect.classList.add('area-shape');

        rect.addEventListener('click', () => {
            document.querySelectorAll('.area-shape').forEach(s => {
                s.setAttribute('stroke-width', '1');
                s.setAttribute('opacity', '1');
            });

            rect.setAttribute('stroke-width', '3');
            rect.setAttribute('stroke', '#FFD93D');
            selectedArea = area.id;

            updateSidebar(area);
        });
    } else {
        rect.setAttribute('stroke', '#ccc');
        rect.setAttribute('stroke-dasharray', '5,5');
        rect.style.pointerEvents = 'none';
    }

    g.appendChild(rect);

    if (area.label) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', area.x + area.width / 2);
        text.setAttribute('y', area.y + area.height / 2);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '11');
        text.setAttribute('font-weight', 'bold');
        text.style.pointerEvents = 'none';
        text.textContent = area.label;
        g.appendChild(text);
    }

    svg.appendChild(g);
}

function updateSidebar(area) {
    const stats = document.querySelectorAll('.stat-value');
    const areaTitle = document.querySelector('.area-title');

    if (areaTitle) areaTitle.textContent = "Detail: " + area.label;
    
    if (stats.length > 0) {
        stats[0].textContent = Math.floor(Math.random() * 10) + " Orang"; // Karyawan
        stats[1].textContent = area.label === 'Musholla' ? "1 Orang" : "0 Orang";
    }
    
    console.log("Menampilkan detail untuk:", area.label);
}

function init() {
    drawCorridor();
    areas.forEach(drawArea);
}

document.addEventListener('DOMContentLoaded', init);