type SoundName = "click" | "paper" | "drawer" | "dialog" | "static";

let context: AudioContext | null = null;
let rainGain: GainNode | null = null;
let rainSource: AudioBufferSourceNode | null = null;
let rainOn = false;
let rainBaseGain = 0.015;
let duckDepth = 0;
const discoveries = new Set<string>();

/* ---------- real audio ---------- */
const BG_SRC = "/portfolio/bg.mp3";
const AHA_SRC = "/portfolio/aha.mp3";
const BG_VOLUME = 0.22;

let bgAudio: HTMLAudioElement | null = null;
const fadeTimers = new WeakMap<HTMLAudioElement, number>();

/**
 * Fade an <audio> element from its current volume to `target` over `durationMs`.
 * Uses a per-element timer so simultaneous fades (bg duck + aha fade) don't
 * stomp on each other.
 */
function fadeTo(
  el: HTMLAudioElement,
  target: number,
  durationMs: number,
  onDone?: () => void,
) {
  const existing = fadeTimers.get(el);
  if (existing !== undefined) clearInterval(existing);

  const start = el.volume;
  const startTime = performance.now();

  const id = window.setInterval(() => {
    const t = Math.min((performance.now() - startTime) / durationMs, 1);
    el.volume = Math.max(0, Math.min(1, start + (target - start) * t));
    if (t >= 1) {
      clearInterval(id);
      fadeTimers.delete(el);
      onDone?.();
    }
  }, 30);

  fadeTimers.set(el, id);
}
function getContext() {
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume();
  return context;
}

function getNoiseBuffer(duration: number) {
  const audio = getContext();
  const buffer = audio.createBuffer(1, audio.sampleRate * duration, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) {
    data[index] = Math.random() * 2 - 1;
  }
  return buffer;
}

function playTone(frequency: number, duration: number, volume: number, type: OscillatorType = "sine") {
  const audio = getContext();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  const now = audio.currentTime;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain).connect(audio.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
}

export function startBackgroundScore() {
  if (bgAudio) return;

  bgAudio = new Audio(BG_SRC);
  bgAudio.loop = true;
  bgAudio.volume = 0;

  // Fade in over 2.5s once the file is ready to play.
  bgAudio.addEventListener("canplay", () => fadeTo(bgAudio!, BG_VOLUME, 2500), {
    once: true,
  });

  bgAudio.play().catch(() => {
    // If the browser blocks autoplay (rare, but happens after a long idle),
    // retry on the next user gesture.
    const retry = () => {
      bgAudio?.play().catch(() => {});
      window.removeEventListener("pointerdown", retry);
    };
    window.addEventListener("pointerdown", retry, { once: true });
  });
}
export function playDiscoveryAha(id: string) {
  if (discoveries.has(id)) return;
  discoveries.add(id);

  // Duck the background so the sting cuts through.
  if (bgAudio) fadeTo(bgAudio, BG_VOLUME * 0.3, 250);

  const aha = new Audio(AHA_SRC);
  aha.volume = 0.75;

  aha.play().catch(() => {
    // If the sting can't play (network error, blocked), restore the bg.
    if (bgAudio) fadeTo(bgAudio, BG_VOLUME, 500);
    return;
  });

  // After 2s of full-volume playback, begin fading the sting out over 2.2s.
  // Then pause it and bring the background back up.
  window.setTimeout(() => {
    fadeTo(aha, 0, 6000, () => {
      aha.pause();
      if (bgAudio) fadeTo(bgAudio, BG_VOLUME, 900);
    });
  }, 2000);
}

export function playSound(name: SoundName) {
  if (name === "click") {
    playTone(620, 0.055, 0.035, "square");
    return;
  }
  if (name === "drawer") {
    const audio = getContext();
    const source = audio.createBufferSource();
    const filter = audio.createBiquadFilter();
    const gain = audio.createGain();
    source.buffer = getNoiseBuffer(0.24);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(520, audio.currentTime);
    filter.frequency.exponentialRampToValueAtTime(120, audio.currentTime + 0.22);
    gain.gain.setValueAtTime(0.0001, audio.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, audio.currentTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.24);
    source.connect(filter).connect(gain).connect(audio.destination);
    source.start();
    window.setTimeout(() => playTone(72, 0.08, 0.05, "square"), 180);
    return;
  }
  if (name === "paper") {
    const audio = getContext();
    const source = audio.createBufferSource();
    const filter = audio.createBiquadFilter();
    const gain = audio.createGain();
    source.buffer = getNoiseBuffer(0.34);
    filter.type = "bandpass";
    filter.frequency.value = 2200;
    filter.Q.value = 0.7;
    gain.gain.setValueAtTime(0.0001, audio.currentTime);
    gain.gain.linearRampToValueAtTime(0.055, audio.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.34);
    source.connect(filter).connect(gain).connect(audio.destination);
    source.start();
    return;
  }
  if (name === "dialog") {
    playTone(240, 0.2, 0.045, "sine");
    window.setTimeout(() => playTone(360, 0.22, 0.028, "sine"), 90);
    return;
  }

  const audio = getContext();
  const buffer = audio.createBuffer(1, audio.sampleRate * 0.22, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) {
    data[index] = (Math.random() * 2 - 1) * Math.pow(1 - index / data.length, 2);
  }
  const source = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();
  source.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.value = 1400;
  filter.Q.value = 0.8;
  gain.gain.value = 0.11;
  source.connect(filter).connect(gain).connect(audio.destination);
  source.start();
}

export function setRainSource(gain: GainNode, baseGain = 0.045) {
  rainGain = gain;
  context = gain.context as AudioContext;
  rainBaseGain = baseGain;
  updateRainVolume();
}

export function clearRainSource(gain: GainNode) {
  if (rainGain === gain) rainGain = null;
}

function updateRainVolume() {
  if (!rainGain || !context) return;
  rainGain.gain.setTargetAtTime(
    !rainOn ? 0 : duckDepth > 0 ? rainBaseGain * 0.4 : rainBaseGain,
    context.currentTime,
    0.16,
  );
}

export function startRain() {
  const audio = getContext();
  if (rainSource) {
    rainOn = true;
    updateRainVolume();
    return true;
  }
  const buffer = getNoiseBuffer(2);
  const source = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();
  source.buffer = buffer;
  source.loop = true;
  filter.type = "lowpass";
  filter.frequency.value = 2800;
  gain.gain.value = 0.045;
  source.connect(filter).connect(gain).connect(audio.destination);
  source.start();
  rainSource = source;
  rainGain = gain;
  rainOn = true;
  updateRainVolume();
  return true;
}

export function toggleRain() {
  if (!rainSource) return startRain();
  rainOn = !rainOn;
  updateRainVolume();
  return rainOn;
}

export function isRainActive() {
  return rainOn;
}

export function setRainDucked(isDucked: boolean) {
  duckDepth = Math.max(0, duckDepth + (isDucked ? 1 : -1));
  updateRainVolume();
}
