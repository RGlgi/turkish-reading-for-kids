export const Speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text.toLowerCase())
  utterance.lang = 'tr-TR'
  utterance.rate = 0.5

  const voices = window.speechSynthesis.getVoices()
  const turkishVoice = voices.find((voice) => voice.lang === 'tr-TR')
  if (turkishVoice) {
    utterance.voice = turkishVoice
  }

  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}
