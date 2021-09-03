const synth = window.speechSynthesis;

const speak = (thingToSay) => {
  const utterThis = new SpeechSynthesisUtterance(thingToSay);
  synth.speak(utterThis);
};

export default speak;
