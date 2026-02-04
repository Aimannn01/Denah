const svg = document.getElementById('venueCanvas');
let selectedArea = 'showroom';

// Data area Kantor
const areas = [
    { id: 'meeting room', label: 'Meeting Room', color: '#4A90E2', x: 250, y: 250, width: 210, height: 140, rx: 10 },
    { id: 'Toilet', label: 'Toilet', color: '#10bde0', x: 600, y: 470, width: 100, height: 70, rx: 10, classname: 'interactive' },
    { id: 'Lift', label: 'Lift', color: '#bad7c5', x: 500, y: 470, width: 80, height: 80, rx: 10, classname: 'interactive' },
    { id: 'Musholla', label: 'Musholla', color: '#0adc2d', x: 310, y: 430, width: 100, height: 70, rx: 10, classname: 'interactive'},
    { id: 'Ruangan 1', label: 'Ruangan 1', color: '#9b59b6', x: 550, y: 300, width: 100, height: 100, rx: 10, classname: 'interactive'},
    { id: 'Ruangan 2', label: 'Ruangan 2', color: '#9b59b6', x: 675, y: 300, width: 100, height: 100, rx: 10, classname: 'interactive'},
    { id: 'Ruangan 3', label: 'Ruangan 3', color: '#9b59b6', x: 800, y: 300, width: 100, height: 100, rx: 10, classname: 'interactive'},
    { id: 'Lantai 2', label: 'Lantai 2', color: '#f39c12', x: 400, y: 100, width: 300, height: 120, rx: 10 },
];

// 1. Draw Corridor FIRST (so it's in the background)
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

    const corridorText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    corridorText.setAttribute('x', '500');
    corridorText.setAttribute('y', '595');
    corridorText.setAttribute('text-anchor', 'middle');
    corridorText.setAttribute('fill', '#666');
    corridorText.setAttribute('font-size', '14');
    corridorText.setAttribute('font-weight', 'bold');
}

// 2. Modified Draw Area to handle transformations
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

// 3. Draw Entrance and Markers (Same logic as yours)
function drawEntrance(entrance) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', entrance.x - 60);
    rect.setAttribute('y', entrance.y);
    rect.setAttribute('width', 120);
    rect.setAttribute('height', 50);
    rect.setAttribute('fill', '#FFD93D');
    rect.setAttribute('stroke', '#333');
    rect.setAttribute('stroke-width', 2);
    rect.setAttribute('rx', 5);
    g.appendChild(rect);

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    icon.setAttribute('x', entrance.x);
    icon.setAttribute('y', entrance.y + 25);
    icon.setAttribute('text-anchor', 'middle');
    icon.textContent = '🚪 ' + entrance.label;
    g.appendChild(icon);

    svg.appendChild(g);
}

function drawMarker(marker) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const iconMap = { 'car': '🚗', 'desk': '💼', 'toilet': '🚻', 'coffee': '☕' };
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', marker.x);
    circle.setAttribute('cy', marker.y);
    circle.setAttribute('r', '15');
    circle.setAttribute('fill', marker.color);
    circle.setAttribute('stroke', 'white');
    g.appendChild(circle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', marker.x);
    text.setAttribute('y', marker.y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-size', '12');
    text.textContent = iconMap[marker.type] || '•';
    g.appendChild(text);

    svg.appendChild(g);
}

// Execution
drawCorridor();
areas.forEach(drawArea);
entrances.forEach(drawEntrance);
markers.forEach(drawMarker);

