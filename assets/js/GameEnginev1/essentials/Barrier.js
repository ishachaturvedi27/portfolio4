import GameObject from './GameObject.js';

class Barrier extends GameObject {
    constructor(data, gameEnv) {
        super(gameEnv);
        
        this.data = data;
        
        // Position and size in game coordinates
        this.x = data.x || 0;
        this.y = data.y || 0;
        this.color = data.color || 'rgba(255, 0, 0, 0.3)';
        this.visible = data.visible !== undefined ? data.visible : true;
        this.hitbox = data.hitbox || { widthPercentage: 0.0, heightPercentage: 0.0 };

        // Create a dedicated canvas for collision (like Character/Npc)
        this.canvas = document.createElement('canvas');
        this.canvas.id = data.id || `barrier_${Math.random().toString(36).slice(2, 7)}`;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        const container = this.gameEnv?.container;
        if (container) container.appendChild(this.canvas);
        this.canvas.style.imageRendering = 'pixelated';
        this.canvas.style.zIndex = (data.zIndex !== undefined) ? String(data.zIndex) : '11';
        this.canvas.style.position = 'absolute';

        // Load sprite if provided
        this.spriteSheet = null;
        this.spriteReady = false;
        
        // Initialize size (will be updated when sprite loads)
        if (data.SCALE_FACTOR && this.gameEnv) {
            const size = this.gameEnv.innerHeight / data.SCALE_FACTOR;
            this.width = Math.round(size);
            this.height = Math.round(size);
        } else {
            this.width = data.width || 100;
            this.height = data.height || 100;
        }
        
        this.canvas.width = Math.max(1, this.width);
        this.canvas.height = Math.max(1, this.height);
        
        if (data.src) {
            this.spriteSheet = new Image();
            this.spriteSheet.onload = () => {
                this.spriteReady = true;
                this.resize();
                this.update();
            };
            this.spriteSheet.onerror = () => {
                console.warn('Failed to load barrier sprite:', data.src);
            };
            this.spriteSheet.src = data.src;
        }

        // Initial draw and position
        if (!data.src) {
            this.update();
        } else {
            // Set up canvas and position even before sprite loads
            this.setupCanvas();
        }
    }

    update() {
        this.draw();
        this.setupCanvas();
    }

    draw() {
        // Clear canvas
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.visible) return;

        // Draw sprite if loaded
        if (this.spriteReady && this.spriteSheet) {
            this.drawSprite();
        } else {
            // Fallback to rectangle
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.strokeStyle = 'rgba(225, 0, 0, 0.8)';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    drawSprite() {
        if (!this.spriteReady || !this.spriteSheet) return;
        
        const pixels = this.data.pixels || { width: this.spriteSheet.naturalWidth, height: this.spriteSheet.naturalHeight };
        const frameWidth = pixels.width;
        const frameHeight = pixels.height;

        // Keep canvas at scaled size, not pixel size
        // canvas.width/height are already set to the scaled game size in constructor and resize()
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(
            this.spriteSheet,
            0, 0, frameWidth, frameHeight,
            0, 0, this.canvas.width, this.canvas.height
        );
    }

    setupCanvas() {
        // Calculate width and height based on SCALE_FACTOR or direct properties
        let displayWidth = this.width;
        let displayHeight = this.height;
        
        if (this.spriteReady && this.data.SCALE_FACTOR) {
            // Calculate size based on scale factor
            const size = this.gameEnv.innerHeight / this.data.SCALE_FACTOR;
            displayWidth = size;
            displayHeight = size;
        }
        
        // Position barrier canvas in game space; y offset includes gameEnv.top
        this.canvas.style.width = `${displayWidth}px`;
        this.canvas.style.height = `${displayHeight}px`;
        this.canvas.style.left = `${this.x}px`;
        const topOffset = (this.gameEnv?.top || 0);
        this.canvas.style.top = `${topOffset + this.y}px`;
    }

    resize() {
        // Reposition relative to new game size proportionally
        if (!this.gameEnv) return;
        const newW = this.gameEnv.innerWidth;
        const newH = this.gameEnv.innerHeight;
        
        // For sprites, recalculate size based on SCALE_FACTOR
        if (this.spriteReady && this.data.SCALE_FACTOR) {
            const size = newH / this.data.SCALE_FACTOR;
            this.width = Math.round(size);
            this.height = Math.round(size);
        } else if (this.canvas && this.canvas.width && this.canvas.height) {
            // Simple proportional scaling to keep placement relative; safe if env changes
            const prevW = parseFloat(this.canvas.style.width) || this.canvas.width;
            const prevH = parseFloat(this.canvas.style.height) || this.canvas.height;
            const scaleX = newW / (this.gameEnv.canvas?.width || newW);
            const scaleY = newH / (this.gameEnv.canvas?.height || newH);
            this.x = Math.round(this.x * scaleX);
            this.y = Math.round(this.y * scaleY);
            this.width = Math.round(this.width * scaleX);
            this.height = Math.round(this.height * scaleY);
            this.canvas.width = Math.max(1, this.width);
            this.canvas.height = Math.max(1, this.height);
        }
        this.update();
    }

    destroy() {
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        const idx = this.gameEnv?.gameObjects?.indexOf?.(this) ?? -1;
        if (idx > -1) this.gameEnv.gameObjects.splice(idx, 1);
    }
}

export default Barrier;