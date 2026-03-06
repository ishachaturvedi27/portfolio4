import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';
import Npc from '/assets/js/GameEnginev1/essentials/Npc.js';
import Barrier from '/assets/js/GameEnginev1/essentials/Barrier.js';

class Ocean {
    constructor(gameEnv) {

        const path = gameEnv.path;

        // ---------- BACKGROUND ----------
        const bgData = {
            name: "reef_bg",
            src: path + "/images/gamify/bg/reef.png",
            pixels: { height: 772, width: 1134 }
        };

        // ---------- PLAYER (School Fish) ----------
        const playerData = {
            id: 'playerData',
            src: path + "/images/gamify/bg/school-fish.png",

            SCALE_FACTOR: 5,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,

            INIT_POSITION: { x: 100, y: 300 },

            pixels: { height: 225, width: 225 },

            orientation: { rows: 4, columns: 4 },

            down: { row: 0, start: 0, columns: 3 },
            downRight: { row: 1, start: 0, columns: 3, rotate: Math.PI/16 },
            downLeft: { row: 0, start: 0, columns: 3, rotate: -Math.PI/16 },
            left: { row: 2, start: 0, columns: 3 },
            right: { row: 1, start: 0, columns: 3 },
            up: { row: 3, start: 0, columns: 3 },
            upLeft: { row: 2, start: 0, columns: 3, rotate: Math.PI/16 },
            upRight: { row: 3, start: 0, columns: 3, rotate: -Math.PI/16 },

            hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },

            keypress: { up: 87, left: 65, down: 83, right: 68 }
        };

        // ---------- NPC (Gold) ----------
        const npcData1 = {
            id: 'goldfish',
            greeting: 'glub glub',
            src: path + "/images/gamify/water/gold.png",

            SCALE_FACTOR: 6,
            ANIMATION_RATE: 50,

            INIT_POSITION: { x: 500, y: 300 },

            pixels: { height: 225, width: 225 },

            orientation: { rows: 1, columns: 1 },

            down: { row: 0, start: 0, columns: 1 },
            right: { row: 0, start: 0, columns: 1 },
            left: { row: 0, start: 0, columns: 1 },
            up: { row: 0, start: 0, columns: 1 },

            hitbox: { widthPercentage: 0.2, heightPercentage: 0.2 },

            dialogues: ['glub glub'],

            reaction: function () {
                if (this.dialogueSystem) {
                    this.showReactionDialogue();
                }
            },

            interact: function () {
                if (this.dialogueSystem) {
                    this.showRandomDialogue();
                }
            }
        };

        // ---------- BARRIER ----------
        const barrierData = {
            id: 'reefBarrier',
            src: path + "/images/gamify/water/octopus.png",

            SCALE_FACTOR: 4,
            INIT_POSITION: { x: 300, y: 350 },

            pixels: { height: 225, width: 225 },

            hitbox: { widthPercentage: 0.4, heightPercentage: 0.4 }
        };

        // ---------- OBJECTS ----------
        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData1 },
            { class: Barrier, data: barrierData }
        ];
    }
}

export default ocean;