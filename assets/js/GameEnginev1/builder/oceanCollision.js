import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';
import Npc from '/assets/js/GameEnginev1/essentials/Npc.js';
import Barrier from '/assets/js/GameEnginev1/essentials/Barrier.js';

class oceanCollision {
    constructor(gameEnv) {

        const path = gameEnv.path;

        // ---------- BACKGROUND ----------
        const bgData = {
            name: "reef_bg",
            src: path + "/images/gamify/bg/reef.png",
            pixels: { height: 772, width: 1134 }
        };

        // ---------- PLAYER ----------
        const playerData = {
            id: 'playerData',
            src: path + "/images/gamify/bg/school-fish.png",

            SCALE_FACTOR: 4,
            STEP_FACTOR: 600,
            ANIMATION_RATE: 80,

            INIT_POSITION: { x: 100, y: 300 },

            pixels: { height: 225, width: 225 },

            orientation: { rows: 4, columns: 4 },

            down: { row: 0, start: 0, columns: 3 },
            downRight: { row: 1, start: 0, columns: 3 },
            downLeft: { row: 0, start: 0, columns: 3 },
            left: { row: 2, start: 0, columns: 3 },
            right: { row: 1, start: 0, columns: 3 },
            up: { row: 3, start: 0, columns: 3 },

            hitbox: {
                widthPercentage: 0.3,
                heightPercentage: 0.3
            },

            keypress: { up: 87, left: 65, down: 83, right: 68 }
        };

        // ---------- NPC ----------
        const npcData1 = {
            id: 'goldfish',
            greeting: 'glub glub',
            src: path + "/images/gamify/water/gold.png",

            SCALE_FACTOR: 6,
            ANIMATION_RATE: 60,

            INIT_POSITION: { x: 500, y: 300 },

            pixels: { height: 225, width: 225 },

            orientation: { rows: 1, columns: 1 },

            hitbox: {
                widthPercentage: 0.2,
                heightPercentage: 0.2
            }
        };

        // ---------- REEF COLLISION ----------
        const barrierData = {
            id: 'reefBarrier',
            src: path + "/images/gamify/bg/reef.png",

            SCALE_FACTOR: 3,

            INIT_POSITION: {
                x: gameEnv.innerWidth / 2,
                y: gameEnv.innerHeight - 150
            },

            pixels: { height: 300, width: 600 },

            hitbox: {
                widthPercentage: 0.8,
                heightPercentage: 0.5
            }
        };

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData1 },
            { class: Barrier, data: barrierData }
        ];
    }
}

export default oceanCollision;