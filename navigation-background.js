document.addEventListener('DOMContentLoaded', function() {
    // 创建导航背景容器
    const body = document.body;
    const navBackground = document.createElement('div');
    navBackground.className = 'navigation-background';
    body.appendChild(navBackground);
    
    // 创建地图网格
    createMapGrid(navBackground);
    
    // 创建动态路线
    createRoutes(navBackground);
    
    // 创建导航点标记
    createNavigationMarkers(navBackground);
});

// 创建地图网格背景
function createMapGrid(container) {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'map-grid';
    container.appendChild(gridContainer);
    
    // 创建网格线
    for (let i = 0; i < 20; i++) {
        // 水平线
        const horizontalLine = document.createElement('div');
        horizontalLine.className = 'grid-line horizontal';
        horizontalLine.style.top = `${i * 5}%`;
        gridContainer.appendChild(horizontalLine);
        
        // 垂直线
        const verticalLine = document.createElement('div');
        verticalLine.className = 'grid-line vertical';
        verticalLine.style.left = `${i * 5}%`;
        gridContainer.appendChild(verticalLine);
    }
}

// 创建动态路线
function createRoutes(container) {
    const routesContainer = document.createElement('div');
    routesContainer.className = 'routes-container';
    container.appendChild(routesContainer);
    
    // 创建多条路线
    const routeColors = ['#1a73e8', '#4CAF50', '#FF5722'];
    const routePaths = [
        generateRandomPath(),
        generateRandomPath(),
        generateRandomPath()
    ];
    
    routePaths.forEach((path, index) => {
        const route = document.createElement('div');
        route.className = 'route';
        routesContainer.appendChild(route);
        
        // 创建SVG路径
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        route.appendChild(svg);
        
        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', path);
        pathElement.setAttribute('stroke', routeColors[index]);
        pathElement.setAttribute('stroke-width', '3');
        pathElement.setAttribute('fill', 'none');
        pathElement.setAttribute('stroke-dasharray', '10, 5');
        pathElement.setAttribute('stroke-linecap', 'round');
        pathElement.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(pathElement);
        
        // 添加动画效果
        const length = pathElement.getTotalLength();
        pathElement.style.strokeDasharray = length;
        pathElement.style.strokeDashoffset = length;
        pathElement.style.animation = `drawRoute ${5 + index * 2}s forwards ease-in-out infinite alternate`;
        
        // 创建移动的导航点
        const navPoint = document.createElement('div');
        navPoint.className = 'nav-point';
        navPoint.style.backgroundColor = routeColors[index];
        route.appendChild(navPoint);
        
        // 设置导航点沿路径移动的动画
        navPoint.style.animation = `moveAlongPath${index} ${8 + index * 2}s infinite ease-in-out`;
        
        // 创建关键帧动画
        createKeyframesForPath(path, index);
    });
}

// 创建导航点标记
function createNavigationMarkers(container) {
    const markersContainer = document.createElement('div');
    markersContainer.className = 'markers-container';
    container.appendChild(markersContainer);
    
    // 创建多个导航标记点
    for (let i = 0; i < 8; i++) {
        const marker = document.createElement('div');
        marker.className = 'nav-marker';
        marker.style.left = `${10 + Math.random() * 80}%`;
        marker.style.top = `${10 + Math.random() * 80}%`;
        marker.style.animationDelay = `${i * 0.5}s`;
        markersContainer.appendChild(marker);
        
        // 添加脉冲效果
        const pulse = document.createElement('div');
        pulse.className = 'marker-pulse';
        marker.appendChild(pulse);
    }
}

// 生成随机路径
function generateRandomPath() {
    const width = 100;
    const height = 100;
    const points = [];
    const numPoints = 5 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < numPoints; i++) {
        const x = (i === 0) ? 0 : (i === numPoints - 1) ? width : Math.random() * width;
        const y = (i === 0) ? height * Math.random() : (i === numPoints - 1) ? height * Math.random() : Math.random() * height;
        points.push({ x, y });
    }
    
    // 生成SVG路径
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1];
        const currPoint = points[i];
        const cpx1 = prevPoint.x + (currPoint.x - prevPoint.x) * 0.5;
        const cpy1 = prevPoint.y;
        const cpx2 = prevPoint.x + (currPoint.x - prevPoint.x) * 0.5;
        const cpy2 = currPoint.y;
        path += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${currPoint.x} ${currPoint.y}`;
    }
    
    return path;
}

// 为路径创建关键帧动画
function createKeyframesForPath(path, index) {
    // 创建样式元素
    const style = document.createElement('style');
    document.head.appendChild(style);
    
    // 解析路径点
    const pathPoints = parsePathToPoints(path);
    let keyframes = `@keyframes moveAlongPath${index} {\n`;
    
    pathPoints.forEach((point, i) => {
        const percent = (i / (pathPoints.length - 1)) * 100;
        keyframes += `  ${percent}% { transform: translate(${point.x}%, ${point.y}%); }\n`;
    });
    
    keyframes += '}';
    style.textContent += keyframes;
}

// 解析SVG路径为点数组
function parsePathToPoints(path) {
    // 简化版解析，实际应用中可能需要更复杂的解析
    const points = [];
    const numPoints = 20; // 生成20个点用于动画
    
    for (let i = 0; i < numPoints; i++) {
        const percent = i / (numPoints - 1);
        // 简单的线性插值，实际应用中可能需要更精确的路径计算
        points.push({
            x: 10 + percent * 80, // 保持在视图范围内
            y: 10 + Math.sin(percent * Math.PI * 2) * 40 + Math.random() * 20
        });
    }
    
    return points;
}

// 添加路径绘制动画
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes drawRoute {
    0% {
        stroke-dashoffset: 1000;
    }
    100% {
        stroke-dashoffset: 0;
    }
}
</style>
`);