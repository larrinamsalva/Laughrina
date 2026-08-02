// Phone-friendly fart synthesis: filtered air, low rumble, and sputtering pulses.
playFart = function playFartNatural(type) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  if (ctx.state === "suspended") ctx.resume();

  const now = ctx.currentTime;
  const duration = Math.max(0.5, type.duration * 1.1);
  const master = ctx.createGain();
  const compressor = ctx.createDynamicsCompressor();

  compressor.threshold.setValueAtTime(-24, now);
  compressor.knee.setValueAtTime(20, now);
  compressor.ratio.setValueAtTime(8, now);
  compressor.attack.setValueAtTime(0.003, now);
  compressor.release.setValueAtTime(0.18, now);

  master.gain.setValueAtTime(0.9, now);
  master.connect(compressor).connect(ctx.destination);

  // Low body rumble, kept subtle so it does not sound like a laser.
  const body = ctx.createOscillator();
  const bodyGain = ctx.createGain();
  const bodyFilter = ctx.createBiquadFilter();
  body.type = "sine";
  body.frequency.setValueAtTime(Math.max(52, type.pitch * 0.9), now);
  body.frequency.exponentialRampToValueAtTime(Math.max(38, type.pitch * 0.55), now + duration);
  bodyFilter.type = "lowpass";
  bodyFilter.frequency.setValueAtTime(180, now);
  bodyGain.gain.setValueAtTime(0.001, now);
  bodyGain.gain.linearRampToValueAtTime(0.28, now + 0.03);
  bodyGain.gain.setValueAtTime(0.2, now + duration * 0.65);
  bodyGain.gain.linearRampToValueAtTime(0.001, now + duration);
  body.connect(bodyFilter).connect(bodyGain).connect(master);

  // Airy raspberry texture.
  const frames = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let smooth = 0;
  for (let i = 0; i < frames; i++) {
    const t = i / ctx.sampleRate;
    const raw = Math.random() * 2 - 1;
    smooth = smooth * 0.84 + raw * 0.16;
    const flutterRate = type.name === "Tiny Toot" ? 34 : 18 + (type.pitch % 12);
    const flutter = Math.pow(Math.max(0, Math.sin(2 * Math.PI * flutterRate * t)), 1.8);
    const envelope = Math.sin(Math.PI * Math.min(1, t / duration));
    data[i] = smooth * flutter * envelope * 1.8;
  }

  const noise = ctx.createBufferSource();
  const noiseFilter = ctx.createBiquadFilter();
  const noiseGain = ctx.createGain();
  noise.buffer = buffer;
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.setValueAtTime(type.name === "Brass Section" ? 420 : 280, now);
  noiseFilter.Q.setValueAtTime(0.7, now);
  noiseGain.gain.setValueAtTime(type.name === "Silent Assassin" ? 0.45 : 0.85, now);
  noise.connect(noiseFilter).connect(noiseGain).connect(master);

  // Uneven sputter bursts make it sound organic instead of electronic.
  const burstCount = type.name === "Tiny Toot" ? 2 : 4 + Math.floor(Math.random() * 4);
  for (let i = 0; i < burstCount; i++) {
    const burst = ctx.createOscillator();
    const burstGain = ctx.createGain();
    const start = now + (i / burstCount) * duration + Math.random() * 0.035;
    const len = Math.min(0.11 + Math.random() * 0.09, duration / 2);
    burst.type = "triangle";
    burst.frequency.setValueAtTime(90 + Math.random() * 55, start);
    burst.frequency.exponentialRampToValueAtTime(55 + Math.random() * 25, start + len);
    burstGain.gain.setValueAtTime(0.001, start);
    burstGain.gain.linearRampToValueAtTime(0.22 + Math.random() * 0.18, start + 0.015);
    burstGain.gain.linearRampToValueAtTime(0.001, start + len);
    burst.connect(burstGain).connect(master);
    burst.start(start);
    burst.stop(start + len + 0.02);
  }

  body.start(now);
  noise.start(now);
  body.stop(now + duration + 0.03);
  noise.stop(now + duration + 0.03);

  window.setTimeout(() => ctx.close().catch(() => {}), (duration + 0.4) * 1000);
};
