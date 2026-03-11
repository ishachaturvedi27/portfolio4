import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';

class Ocean {
  constructor(gameEnv) {
    console.log("Game environment path:", gameEnv.path);

    const path = gameEnv.path;
    const width = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;

    // ---------- BACKGROUND ----------
    const bgData = {
      name: "reef_bg",
      src: path + "/images/gamify/bg/reef.png",
      pixels: { height: 772, width: 1134 }
    };

    // ---------- PLAYER (Octopus) ----------
    const OCTOPUS_SCALE_FACTOR = 5;
    const playerData = {
      id: 'Octopus',
      greeting: "Hi I am Octopus, the water wanderer. I am looking for wisdom and adventure!",
      src: path + "/images/gamify/water/octopus.png",
      SCALE_FACTOR: OCTOPUS_SCALE_FACTOR,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 50,
      GRAVITY: true,
      INIT_POSITION: { x: 8, y: height - (height / OCTOPUS_SCALE_FACTOR) }, // matches original
      pixels: { height: 250, width: 167 },
      orientation: { rows: 3, columns: 2 },
      down: { row: 0, start: 0, columns: 2 },
      downLeft: { row: 0, start: 0, columns: 2, mirror: true, rotate: Math.PI / 16 },
      downRight: { row: 0, start: 0, columns: 2, rotate: -Math.PI / 16 },
      left: { row: 1, start: 0, columns: 2, mirror: true },
      right: { row: 1, start: 0, columns: 2 },
      up: { row: 0, start: 0, columns: 2 },
      upLeft: { row: 1, start: 0, columns: 2, mirror: true, rotate: -Math.PI / 16 },
      upRight: { row: 1, start: 0, columns: 2, rotate: Math.PI / 16 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 }
    };

    // ---------- NPC (Goldfish) ----------
    const goldData = {
      id: 'Goldfish',
      greeting: "Enemy Goldfish",
      src: path + "/images/gamify/water/gold.png",
      SCALE_FACTOR: 8,
      ANIMATION_RATE: 15,
      pixels: { width: 200, height: 100 },
      INIT_POSITION: { x: width / 2, y: height / 2 }, // visible in-game
      orientation: { rows: 1, columns: 2 },
      down: { row: 0, start: 0, columns: 2 },
      hitbox: { widthPercentage: 0.25, heightPercentage: 0.55 }
    };

    // ---------- OBJECTS ----------
    this.classes = [
      { class: GameEnvBackground, data: bgData },
      { class: Player, data: playerData },
      { class: Npc, data: goldData }
    ];
  }
}

export default Ocean;