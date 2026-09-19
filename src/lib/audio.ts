/**
 * Web Audio API Sound Effects Synthesizer
 * Zero external audio assets required; ultra-fast, responsive, customizable SFX
 */

class SoundEngine {
  private ctx: AudioContext | null = null
  private isMuted: boolean = false
  private volume: number = 0.5

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
  }

  public getMuted(): boolean {
    return this.isMuted
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol))
  }

  public getVolume(): number {
    return this.volume
  }

  // Button Click (Crisp Cyber Click)
  public playClick() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04)

    gain.gain.setValueAtTime(0.15 * this.volume, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start()
    osc.stop(this.ctx.currentTime + 0.05)
  }

  // Correct Answer (Upward Harmonious Chime)
  public playCorrect() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator()
      const gain = this.ctx!.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, now + idx * 0.06)

      gain.gain.setValueAtTime(0.2 * this.volume, now + idx * 0.06)
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25)

      osc.connect(gain)
      gain.connect(this.ctx!.destination)

      osc.start(now + idx * 0.06)
      osc.stop(now + idx * 0.06 + 0.26)
    })
  }

  // Incorrect Answer (Low Dual Buzz)
  public playWrong() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(180, now)
    osc.frequency.linearRampToValueAtTime(130, now + 0.2)

    gain.gain.setValueAtTime(0.2 * this.volume, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.25)
  }

  // Level Clear / Fanfare (Grand Arpeggio)
  public playLevelClear() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const chord = [440, 554.37, 659.25, 880, 1108.73] // A Major

    chord.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator()
      const gain = this.ctx!.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + i * 0.08)

      gain.gain.setValueAtTime(0.25 * this.volume, now + i * 0.08)
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.6)

      osc.connect(gain)
      gain.connect(this.ctx!.destination)

      osc.start(now + i * 0.08)
      osc.stop(now + i * 0.08 + 0.65)
    })
  }

  // XP Tally (Rapid Shimmer)
  public playXpTally() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1200 + Math.random() * 400, this.ctx.currentTime)

    gain.gain.setValueAtTime(0.08 * this.volume, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start()
    osc.stop(this.ctx.currentTime + 0.06)
  }

  // Achievement Unlock (Majestic Brass Fanfare)
  public playAchievement() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    const now = this.ctx.currentTime
    const notes = [392.00, 523.25, 659.25, 783.99, 1046.50] // G4, C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator()
      const gain = this.ctx!.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, now + idx * 0.1)

      gain.gain.setValueAtTime(0.25 * this.volume, now + idx * 0.1)
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.8)

      osc.connect(gain)
      gain.connect(this.ctx!.destination)

      osc.start(now + idx * 0.1)
      osc.stop(now + idx * 0.1 + 0.85)
    })
  }
}

export const soundEngine = new SoundEngine()
