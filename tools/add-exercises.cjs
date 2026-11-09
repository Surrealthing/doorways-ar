/* one simple exercise per emotion, in plain words anyone can follow.
   kind: breath | sensory | task | words | media | make (drawing, colour, photos; no skill needed). No questions (the prompts ask those)
   and no timers: people do them their own way. Drafts by Claude, edit freely. */
const fs = require('fs');
const X = {
  happiness:     ['task', 'tell someone one good thing about your day.'],
  peace:         ['breath', 'breathe in for 4, hold for 4, breathe out for 4. do it a few times.'],
  contentment:   ['sensory', 'look around. name 5 things you are glad to have.'],
  excitement:    ['media', 'play a song you love, and move to it.'],
  playfulness:   ['make', 'draw something with your other hand. let it be wobbly.'],
  hope:          ['make', 'draw a small door, and what you hope is on the other side.'],
  pride:         ['words', 'say out loud: “i did that, and i’m proud of it.”'],
  relief:        ['breath', 'take a big breath in. let it out with a long sigh. do it 3 times.'],
  confidence:    ['words', 'say out loud: “i can do hard things.”'],
  trust:         ['task', 'tell someone you trust one small, true thing about your day.'],
  belonging:     ['make', 'draw a circle, and put everyone you feel at home with inside it.'],
  admiration:    ['task', 'tell someone one thing you admire about them.'],
  acceptance:    ['words', 'say slowly: “this is how it is right now.” say it 3 times.'],
  gratitude:     ['task', 'send someone a short thank-you message.'],
  love:          ['task', 'do one small kind thing for someone you love.'],
  tenderness:    ['sensory', 'find something soft and hold it.'],
  compassion:    ['words', 'think of someone who is having a hard time. say: “i hope you are okay.”'],
  longing:       ['make', 'draw a map to a place or a person you miss.'],
  awe:           ['sensory', 'go outside and look up at the sky.'],
  curiosity:     ['make', 'put paper over something with a texture and rub a pencil across it. see what appears.'],
  confusion:     ['make', 'draw a tangle of lines, then colour in just one of them.'],
  surprise:      ['sensory', 'look around and find one thing you’ve never noticed before.'],
  nostalgia:     ['media', 'play a song from your past. listen to the whole song.'],
  sadness:       ['make', 'colour a page in the colour your sadness feels like today.'],
  grief:         ['words', 'say “thank you, ____,” and the one thing you’re thankful for.'],
  loneliness:    ['task', 'send someone a message: “thinking of you.”'],
  disappointment:['words', 'say: “it didn’t go how i hoped, and i’m okay.”'],
  hurt:          ['breath', 'put a hand on your chest and breathe slowly.'],
  exhaustion:    ['breath', 'lie down, close your eyes, and just breathe.'],
  numbness:      ['sensory', 'hold something cold, or wash your face with cold water. notice how it feels.'],
  courage:       ['task', 'pick one thing you’re scared to do. take one tiny step today.'],
  fear:          ['make', 'draw your fear as a funny little monster, and give it a silly name.'],
  anxiety:       ['breath', 'breathe in for 4, and out for 6. do it a few times.'],
  overwhelm:     ['breath', 'take two quick breaths in through your nose, then one long breath out. do it 3 times.'],
  insecurity:    ['words', 'say out loud: “i am enough, just as i am.”'],
  vulnerability: ['task', 'tell someone you trust how you really feel today.'],
  helplessness:  ['task', 'do one small thing you can: drink water, open a window, or tidy one spot.'],
  embarrassment: ['make', 'draw the moment as a short comic, and make it funny.'],
  anger:         ['breath', 'breathe in for 4, and out slowly for 8. let your shoulders drop.'],
  frustration:   ['breath', 'blow out hard, like blowing out candles. do it 5 times.'],
  resentment:    ['task', 'write a letter to the person you’re upset with. you don’t have to send it.'],
  jealousy:      ['words', 'say: “i don’t have to hold on so tight.”'],
  envy:          ['task', 'write down one small step toward what you want.'],
  restlessness:  ['sensory', 'press your feet into the floor and feel the ground hold you.'],
  disgust:       ['sensory', 'wash your hands slowly in warm water. notice how you feel.'],
  guilt:         ['task', 'say sorry, or fix one small thing, if you can.'],
  shame:         ['words', 'put a hand on your heart and say: “i made a mistake. i am still good.”'],
  boredom:       ['make', 'take photos of one ordinary thing from lots of different angles.'],
};
global.window = {}; require('vm').runInThisContext(fs.readFileSync('data.js', 'utf8'));
for (const c of window.CARDS) {
  const x = X[c.name]; if (!x) throw new Error('missing ' + c.name);
  c.exercise = {kind: x[0], text: x[1]};
}
const src = fs.readFileSync('data.js', 'utf8');
const head = src.slice(0, src.indexOf('window.CARDS=')).replace('base = one of the 8 base emotions', 'exercise {kind, text, timer?, answer?} is a draft by Claude too (tools/add-exercises.cjs).\n   base = one of the 8 base emotions');
fs.writeFileSync('data.js', head + 'window.CARDS=' + JSON.stringify(window.CARDS, null, 1) + ';\n');
console.log('ok');
