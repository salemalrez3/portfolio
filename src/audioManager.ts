type SoundName = "click" | "paper" | "drawer" | "dialog" | "static";

let context: AudioContext | null = null;
let rainGain: GainNode | null = null;
let rainSource: AudioBufferSourceNode | null = null;
let rainOn = false;
let rainBaseGain = 0.01;
let duckDepth = 0;
let backgroundStarted = false;
const discoveries = new Set<string>();

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
    if (backgroundStarted) return;
    const audio = getContext();
    const gain = audio.createGain();
    gain.gain.value = 0.0001;
    gain.gain.exponentialRampToValueAtTime(0.038, audio.currentTime + 2.5);
    gain.connect(audio.destination);

    const drone = audio.createOscillator();
    const undertone = audio.createOscillator();
    drone.type = "triangle";
    undertone.type = "sine";
    drone.frequency.value = 73.42;
    undertone.frequency.value = 36.71;
    drone.connect(gain);
    undertone.connect(gain);
    drone.start();
    undertone.start();
    backgroundStarted = true;
}

export function playDiscoveryAha(id: string) {
    if (discoveries.has(id)) return;
    discoveries.add(id);
    const audio = getContext();
    const gain = audio.createGain();
    const now = audio.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
    gain.connect(audio.destination);

    [392, 523.25, 659.25].forEach((frequency, index) => {
      const oscillator = audio.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start(now + index * 0.16);
      oscillator.stop(now + 3.8);
    });
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
