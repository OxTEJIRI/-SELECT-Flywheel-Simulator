// Synthesized sound effects (Web Audio, no assets). Silent until the first user
// gesture, because browsers block audio before that. Purely cosmetic: sound never
// reads or changes the model.

let ctx: AudioContext | null = null;
let out: GainNode | null = null;
let enabled = true;
let unlocked = false;

export function setEnabled(on: boolean) {
  enabled = on;
}

export function isEnabled() {
  return enabled;
}

function ensure(): AudioContext | null {
  if (!enabled || !unlocked) return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    out = ctx.createGain();
    out.gain.value = 0.6;
    const comp = ctx.createDynamicsCompressor();
    out.connect(comp);
    comp.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

// Call once; the first pointer or key press unlocks audio.
export function installUnlock() {
  const unlock = () => {
    unlocked = true;
    ensure();
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
  };
  window.addEventListener('pointerdown', unlock);
  window.addEventListener('keydown', unlock);
}

function tone(freq: number, dur: number, type: OscillatorType, gain: number, delay = 0, slideTo?: number) {
  const c = ensure();
  if (!c || !out) return;
  const t = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g);
  g.connect(out);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

const PENTATONIC = [0, 2, 4, 7, 9];
let lastBlip = 0;

// A pool taking in $SELECT. Pitch climbs with how full the pools are, like water rising.
export function blip(level: number) {
  const now = performance.now();
  if (now - lastBlip < 90) return;
  lastBlip = now;
  const degree = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
  const octave = Math.floor(Math.min(1, Math.max(0, level)) * 2) * 12;
  const f = 330 * Math.pow(2, (degree + octave) / 12);
  tone(f, 0.18, 'sine', 0.05);
  tone(f * 2, 0.1, 'sine', 0.015);
}

let lastSweep = 0;
// Moving a control. Pitch follows the price multiple (1x to 10x).
export function sweep(multiple: number) {
  const now = performance.now();
  if (now - lastSweep < 70) return;
  lastSweep = now;
  const f = 180 * Math.pow(2, ((multiple - 1) / 9) * 2.5);
  tone(f, 0.14, 'triangle', 0.05, 0, f * 1.35);
}

export function tick() {
  tone(1400, 0.04, 'square', 0.012);
}

// Preset or share confirmation: a rising arpeggio.
export function chime() {
  [523.25, 659.25, 783.99].forEach((f, i) => tone(f, 0.28, 'sine', 0.06, i * 0.07));
}

// The $GOOD proof: a low thump and an open chord.
export function bid() {
  tone(110, 0.5, 'sine', 0.2, 0, 42);
  [261.63, 392, 523.25, 783.99].forEach((f, i) => tone(f, 0.9, 'triangle', 0.045, 0.05 + i * 0.05));
}

export function down() {
  tone(420, 0.3, 'triangle', 0.05, 0, 140);
}
