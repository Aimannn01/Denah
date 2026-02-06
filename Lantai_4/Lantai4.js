const svg = document.getElementById('venueCanvas');
let selectedArea = 'showroom';

// Data area dealer mobil
const areas = [
    { id: 'Ruang IT', label: 'Ruang IT', color: '#0a73ea', x: 70, y: 220, width: 200, height: 120, rx: 10, classname: 'interactive' },
    { id: 'Toilet', label: 'Toilet', color: '#10bde0', x: 630, y: 470, width: 80, height: 70, rx: 10, classname: 'interactive' },
    { id: 'Lift', label: 'Lift', color: '#bad7c5', x: 560, y: 470, width: 60, height: 60, rx: 10, classname: 'interactive' },
    { id: 'Musholla', label: 'Musholla', color: '#0adc2d', x: 470, y: 470, width: 80, height: 70, rx: 10, classname: 'interactive' },
    { id: 'Kantin', label: 'Kantin', color: '#cc3d3d85', x: 70, y: 570, width: 100, height: 100, rx: 10, classname: 'interactive'},
    { id: 'General', label: 'General', color: '#777777', x: 280, y: 230, width: 100, height: 100, rx: 10, classname: 'interactive'},
    { id: 'Sales', label: 'Sales Room', color: '#BD10E0', x: 760, y: 350, width: 100, height: 100, rx: 10, classname: 'interactive'},
    { id: 'Room', label: 'Human Capital & Legal Room', color: '#9c1717', x: 70, y: 365, width: 175, height: 70, rx: 10, classname: 'interactive'},
    { id: 'Ruangan', label: 'Ruangan', color: '#118e99', x: 290, y: 470, width: 100, height: 60, rx: 10, classname: 'interactive'},
    { id: 'Ruangan', label: 'Ruangan', color: '#118e99', x: 180, y: 470, width: 100, height: 60, rx: 10, classname: 'interactive'},
    { id: 'Ruangan', label: 'Ruangan', color: '#118e99', x: 60, y: 440, width: 90, height: 60, rx: 10, classname: 'interactive'},
    { id: 'Finance', label: 'Finance Room', color: '#bbbbbb', x: 390, y:260, width: 100, height: 70, rx: 10, classname: 'interactive'},
    { id: 'Lantai 4', label: '', color: 'transparent', x: 50, y: 200, width: 850, height: 480, rx: 10, classname: 'non-interactive', },
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
    text.setAttribute('fill', area.id === 'reception' ? 'black' : 'white'); // Yellow needs dark text
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

function SelectedElement(){
    Box.classList.remove('non-interactive');
    Box.classList.add('interactive');
    box.textContent = selectedArea;
}

drawCorridor();
areas.forEach(drawArea);
entrances.forEach(drawEntrance);
markers.forEach(drawMarker);