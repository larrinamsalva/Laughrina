// Distinct Wind Tunnel sound engine. Each button uses a different rhythm and texture.
let laughSoundContext;

function makeNoiseBuffer(ctx, duration) {
  const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let smooth = 0;
  for (let i = 0; i < length; i++) {
    smooth = smooth * 0.78 + (Math.random() * 2 - 1) * 0.22;
    data[i] = smooth;
  }
  return buffer;
}

function addBurst(ctx, destination, start, duration, frequency, volume, flutter = 11, wet = false) {
  const source = ctx.createBufferSource();
  source.buffer = makeNoiseBuffer(ctx, duration);

  const filter = ctx.createBiquadFilter();
  filter.type = wet ? "lowpass" : "bandpass";
  filter.frequency.setValueAtTime(frequency, start);
  filter.Q.setValueAtTime(wet ? 0.45 : 0.8, start);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.018);

  const steps = Math.max(2, Math.floor(duration * flutter));
  for (let i = 1; i < steps; i++) {
    const when = start + (duration * i) / steps;
    gain.gain.setValueAtTime(i % 2 ? volume * 0.35 : volume, when);
  }
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  source.connect(filter).connect(gain).connect(destination);
  source.start(start);
  source.stop(start + duration + 0.02);
}

function addRumble(ctx, destination, start, duration, frequency, volume, wobbleRate = 7) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const lfo = ctx.createOscillator();
  const depth = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(frequency, start);
  osc.frequency.exponentialRampToValueAtTime(Math.max(38, frequency * 0.72), start + duration);
  lfo.frequency.setValueAtTime(wobbleRate, start);
  depth.gain.setValueAtTime(frequency * 0.22, start);
  lfo.connect(depth).connect(osc.frequency);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(gain).connect(destination);
  osc.start(start);
  lfo.start(start);
  osc.stop(start + duration + 0.02);
  lfo.stop(start + duration + 0.02);
}

playFart = async function playDistinctFart(type) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  laughSoundContext ||= new AudioCtx({ latencyHint: "interactive" });
  if (laughSoundContext.state === "suspended") await laughSoundContext.resume();

  const ctx = laughSoundContext;
  const now = ctx.currentTime + 0.015;
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -30;
  compressor.knee.value = 12;
  compressor.ratio.value = 10;
  compressor.attack.value = 0.003;
  compressor.release.value = 0.16;
  const master = ctx.createGain();
  master.gain.value = 2.3;
  master.connect(compressor).connect(ctx.destination);

  switch (type.name) {
    case "Tiny Toot":
      addBurst(ctx, master, now, 0.16, 620, 1.2, 20);
      addRumble(ctx, master, now, 0.18, 125, 0.35, 18);
      break;

    case "Silent Assassin":
      addBurst(ctx, master, now, 0.95, 240, 0.65, 5);
      addRumble(ctx, master, now + 0.12, 0.82, 58, 0.42, 4);
      break;

    case "Tractor Pull":
      [0, 0.18, 0.36, 0.55, 0.76, 0.98].forEach((offset, index) => {
        addBurst(ctx, master, now + offset, 0.17, 300 - index * 18, 1.0, 14);
      });
      addRumble(ctx, master, now, 1.22, 72, 0.72, 9);
      break;

    case "Taco Tuesday":
      [0, 0.1, 0.22, 0.39, 0.61].forEach((offset, index) => {
        addBurst(ctx, master, now + offset, 0.13 + index * 0.025, 390 - index * 25, 1.15, 23);
      });
      addRumble(ctx, master, now + 0.08, 0.78, 86, 0.5, 13);
      break;

    case "Rocket Booster":
      addBurst(ctx, master, now, 1.15, 460, 1.0, 28);
      addRumble(ctx, master, now, 1.25, 92, 0.62, 16);
      addBurst(ctx, master, now + 0.88, 0.28, 720, 0.8, 32);
      break;

    case "Wet & Risky":
      [0, 0.16, 0.31, 0.48].forEach((offset, index) => {
        addBurst(ctx, master, now + offset, 0.22, 170 - index * 12, 1.05, 8, true);
      });
      addRumble(ctx, master, now, 0.82, 48, 0.7, 5);
      break;

    case "Brass Section":
      addRumble(ctx, master, now, 0.62, 145, 0.68, 22);
      addBurst(ctx, master, now, 0.62, 540, 0.9, 17);
      addRumble(ctx, master, now + 0.58, 0.18, 190, 0.45, 28);
      break;

    case "Nuclear Option":
      addRumble(ctx, master, now, 1.75, 46, 0.95, 6);
      addBurst(ctx, master, now, 1.65, 205, 1.15, 7, true);
      [0.25, 0.58, 0.92, 1.28].forEach(offset => addBurst(ctx, master, now + offset, 0.24, 330, 0.72, 18));
      break;

    default:
      addBurst(ctx, master, now, 0.65, 320, 1.0, 12);
      addRumble(ctx, master, now, 0.68, 70, 0.55, 8);
  }
};
