const svg = document.getElementById('venueCanvas');
let selectedArea = 'showroom';
const areas = [
    { id: 'meeting room', label: 'Meeting Room', color: '#4A90E2', x: 110, y: 110, width: 210, height: 140, rx: 10 },
    { id: 'Toilet', label: 'Toilet', color: '#10bde0', x: 700, y: 370, width: 100, height: 70, rx: 10, classname: 'interactive' },
    { id: 'Lift', label: 'Lift', color: '#bad7c5', x: 600, y: 370, width: 80, height: 80, rx: 10, classname: 'interactive' },
    { id: 'Musholla', label: 'Musholla', color: '#0adc2d', x: 350, y: 330, width: 100, height: 70, rx: 10, classname: 'interactive'},
    { id: 'Ruangan 1', label: 'Ruangan 1', color: '#9b59b6', x: 450, y: 110, width: 100, height: 100, rx: 10, classname: 'interactive'},
    { id: 'Ruangan 2', label: 'Ruangan 2', color: '#9b59b6', x: 570, y: 110, width: 100, height: 100, rx: 10, classname: 'interactive'},
    { id: 'Ruangan 3', label: 'Ruangan 3', color: '#9b59b6', x: 690, y: 110, width: 100, height: 100, rx: 10, classname: 'interactive'},
    { id: 'Lantai 2', label: '', color: 'transparent', x: 100, y: 100, width: 800, height: 500, rx: 10, classname: 'non-interactive'},
    { id: 'Ruangan 4', label: 'Ruangan koord', color: '#cd443d', x: 280, y: 450, width: 100, height: 60, rx: 10, classname: 'interactive'},
    { id: 'Ruangan 5', label: 'Ruangan 5', color: '#9b59b6', x: 400, y: 450, width: 100, height: 60, rx: 10, classname: 'interactive'},
    { id: 'Ruang kantin', label: 'Ruang kantin', color: '#cc3d3d85', x: 150, y: 450, width: 100, height: 100, rx: 10, classname: 'interactive'},
    { id: 'Ruangan ###', label: 'Ruangan ###', }
];

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

drawCorridor();
areas.forEach(drawArea);
entrances.forEach(drawEntrance);
markers.forEach(drawMarker);

