// Phone-speaker-friendly Wind Tunnel audio boost.
// Adds audible midrange harmonics, noise texture and compression.
playFart = function playFartLoud(type) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const now = ctx.currentTime;
  const duration = Math.max(0.42, type.duration * 1.15);

  const master = ctx.createGain();
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-28, now);
  compressor.knee.setValueAtTime(18, now);
  compressor.ratio.setValueAtTime(12, now);
  compressor.attack.setValueAtTime(0.002, now);
  compressor.release.setValueAtTime(0.2, now);
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(1.25, now + 0.025);
  master.gain.setValueAtTime(1.05, now + Math.max(0.08, duration * 0.72));
  master.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  master.connect(compressor).connect(ctx.destination);

  // Low body.
  const body = ctx.createOscillator();
  const bodyFilter = ctx.createBiquadFilter();
  const bodyGain = ctx.createGain();
  body.type = "sawtooth";
  body.frequency.setValueAtTime(Math.max(45, type.pitch), now);
  body.frequency.exponentialRampToValueAtTime(Math.max(30, type.pitch * 0.58), now + duration);
  bodyFilter.type = "lowpass";
  bodyFilter.frequency.setValueAtTime(520, now);
  bodyGain.gain.setValueAtTime(0.58, now);
  body.connect(bodyFilter).connect(bodyGain).connect(master);

  // Midrange rasp—the part phone speakers can reproduce loudly.
  const rasp = ctx.createOscillator();
  const raspFilter = ctx.createBiquadFilter();
  const raspGain = ctx.createGain();
  rasp.type = "square";
  rasp.frequency.setValueAtTime(Math.max(115, type.pitch * 2.5), now);
  rasp.frequency.exponentialRampToValueAtTime(Math.max(75, type.pitch * 1.35), now + duration);
  raspFilter.type = "bandpass";
  raspFilter.frequency.setValueAtTime(360, now);
  raspFilter.Q.setValueAtTime(0.75, now);
  raspGain.gain.setValueAtTime(0.32, now);
  rasp.connect(raspFilter).connect(raspGain).connect(master);

  // Burbling modulation.
  const wobble = ctx.createOscillator();
  const wobbleDepth = ctx.createGain();
  wobble.type = "sine";
  wobble.frequency.setValueAtTime(type.name === "Tiny Toot" ? 24 : 15 + Math.random() * 9, now);
  wobbleDepth.gain.setValueAtTime(16 + Math.random() * 12, now);
  wobble.connect(wobbleDepth);
  wobbleDepth.connect(body.frequency);
  wobbleDepth.connect(rasp.frequency);

  // Short textured air burst.
  const frames = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) {
    const t = i / frames;
    const flutter = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.019));
    data[i] = (Math.random() * 2 - 1) * (1 - t) * flutter;
  }
  const noise = ctx.createBufferSource();
  const noiseFilter = ctx.createBiquadFilter();
  const noiseGain = ctx.createGain();
  noise.buffer = buffer;
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.setValueAtTime(type.name === "Brass Section" ? 620 : 430, now);
  noiseFilter.Q.setValueAtTime(0.6, now);
  noiseGain.gain.setValueAtTime(0.42, now);
  noise.connect(noiseFilter).connect(noiseGain).connect(master);

  body.start(now);
  rasp.start(now);
  wobble.start(now);
  noise.start(now);
  body.stop(now + duration + 0.03);
  rasp.stop(now + duration + 0.03);
  wobble.stop(now + duration + 0.03);
  noise.stop(now + duration + 0.03);

  window.setTimeout(() => ctx.close().catch(() => {}), (duration + 0.35) * 1000);
};
