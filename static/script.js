/*
	Анимированный фон и интеракции с указателем
	— Частицы-узлы, соединяемые линиями, реагируют на курсор
	— Производительность: requestAnimationFrame, пассивные обработчики, throttle на resize
*/

(function () {
	const canvas = document.getElementById('background-canvas');
	if (!canvas) return;
	const context = canvas.getContext('2d');

	// Настройки системы частиц
	const config = {
		density: 0.00012, // частиц на px^2
		maxVelocity: 0.3,
		linkDistance: 150,
		mouseInfluenceRadius: 140,
		colorParticle: 'rgba(190, 210, 255, 0.8)',
		colorLink: 'rgba(110,168,254, 0.28)'
	};

	let width = 0;
	let height = 0;
	let particles = [];
	let animationHandle = 0;
	const pointer = { x: null, y: null, active: false };

	function resizeCanvas() {
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		width = Math.max(window.innerWidth, 1);
		height = Math.max(window.innerHeight, 1);
		canvas.width = Math.floor(width * dpr);
		canvas.height = Math.floor(height * dpr);
		canvas.style.width = width + 'px';
		canvas.style.height = height + 'px';
		context.reset?.();
		context.scale(dpr, dpr);
	}

	function createParticles() {
		const targetCount = Math.floor(width * height * config.density);
		particles = new Array(targetCount).fill(0).map(() => ({
			x: Math.random() * width,
			y: Math.random() * height,
			vx: (Math.random() - 0.5) * config.maxVelocity,
			vy: (Math.random() - 0.5) * config.maxVelocity,
			size: 1 + Math.random() * 1.5
		}));
	}

	function updateParticles(deltaMs) {
		const delta = Math.min(deltaMs, 32); // кап для стабильности
		for (let i = 0; i < particles.length; i++) {
			const p = particles[i];

			// Влияние указателя: лёгкое притяжение
			if (pointer.active && pointer.x != null) {
				const dx = pointer.x - p.x;
				const dy = pointer.y - p.y;
				const distSq = dx * dx + dy * dy;
				const r = config.mouseInfluenceRadius;
				if (distSq < r * r) {
					const force = (1 - Math.sqrt(distSq) / r) * 0.015;
					p.vx += dx * force;
					p.vy += dy * force;
				}
			}

			// Обновление позиции
			p.x += p.vx * delta;
			p.y += p.vy * delta;

			// Трение и ограничение скорости
			p.vx *= 0.995;
			p.vy *= 0.995;
			const v = Math.hypot(p.vx, p.vy);
			if (v > config.maxVelocity) {
				const scale = config.maxVelocity / v;
				p.vx *= scale;
				p.vy *= scale;
			}

			// Периодические границы (тор)
			if (p.x < -10) p.x = width + 10;
			else if (p.x > width + 10) p.x = -10;
			if (p.y < -10) p.y = height + 10;
			else if (p.y > height + 10) p.y = -10;
		}
	}

	function drawParticles() {
		context.clearRect(0, 0, width, height);

		// Линии между близкими частицами
		for (let i = 0; i < particles.length; i++) {
			const p1 = particles[i];
			for (let j = i + 1; j < particles.length; j++) {
				const p2 = particles[j];
				const dx = p1.x - p2.x;
				const dy = p1.y - p2.y;
				const dist = Math.hypot(dx, dy);
				if (dist < config.linkDistance) {
					const alpha = 1 - dist / config.linkDistance;
					context.strokeStyle = config.colorLink;
					context.globalAlpha = Math.min(0.8, alpha * 0.9);
					context.beginPath();
					context.moveTo(p1.x, p1.y);
					context.lineTo(p2.x, p2.y);
					context.stroke();
				}
			}
		}
		context.globalAlpha = 1;

		// Сами частицы
		context.fillStyle = config.colorParticle;
		for (let i = 0; i < particles.length; i++) {
			const p = particles[i];
			context.beginPath();
			context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
			context.fill();
		}
	}

	let lastTime = performance.now();
	function loop(now) {
		const delta = now - lastTime;
		lastTime = now;
		updateParticles(delta);
		drawParticles();
		animationHandle = requestAnimationFrame(loop);
	}

	// Обработчики указателя
	function onPointerMove(e) {
		pointer.active = true;
		const rect = canvas.getBoundingClientRect();
		pointer.x = e.clientX - rect.left;
		pointer.y = e.clientY - rect.top;
	}
	function onPointerLeave() { pointer.active = false; }

	// Инициализация
	resizeCanvas();
	createParticles();
	lastTime = performance.now();
	animationHandle = requestAnimationFrame(loop);

	// Слушатели
	window.addEventListener('mousemove', onPointerMove, { passive: true });
	window.addEventListener('mouseleave', onPointerLeave, { passive: true });

	// Resize с троттлингом
	let resizeRaf = 0;
	window.addEventListener('resize', function () {
		if (resizeRaf) cancelAnimationFrame(resizeRaf);
		resizeRaf = requestAnimationFrame(() => {
			resizeCanvas();
			createParticles();
		});
	}, { passive: true });

	// Очистка при смене страницы (на всякий случай)
	window.addEventListener('beforeunload', function () {
		cancelAnimationFrame(animationHandle);
		window.removeEventListener('mousemove', onPointerMove);
		window.removeEventListener('mouseleave', onPointerLeave);
	});
})();


