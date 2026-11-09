/* one simple exercise per emotion, in plain words anyone can follow.
   kind: breath | sensory | task | words | inquiry | media. timer (seconds) and answer
   (for riddles) are optional. Drafts by Claude, edit freely. */
const fs = require('fs');
const X = {
  happiness:     ['task', 'tell someone one good thing about your day.'],
  peace:         ['breath', 'breathe in for 4, hold for 4, breathe out for 4. do it 4 times.', 60],
  contentment:   ['sensory', 'look around. name 5 things you are glad to have.'],
  excitement:    ['media', 'play a song you love, and move to it.'],
  playfulness:   ['task', 'be silly for one minute. dance, make a funny face, or hop.', 60],
  hope:          ['words', 'say out loud: “good things can still happen.”'],
  pride:         ['words', 'say out loud: “i did that, and i’m proud of it.”'],
  relief:        ['breath', 'take a big breath in. let it out with a long sigh. do it 3 times.'],
  confidence:    ['words', 'say out loud: “i can do hard things.”'],
  trust:         ['inquiry', 'who would you call if you needed help in the night? why them?'],
  belonging:     ['task', 'send a “hi” to someone who makes you feel at home.'],
  admiration:    ['inquiry', 'think of someone you look up to. what do you have in common?'],
  acceptance:    ['words', 'say slowly: “this is how it is right now.” say it 3 times.'],
  gratitude:     ['task', 'send someone a short thank-you message.'],
  love:          ['task', 'do one small kind thing for someone you love.'],
  tenderness:    ['sensory', 'find something soft. hold it for one minute.', 60],
  compassion:    ['words', 'think of someone who is having a hard time. say: “i hope you are okay.”'],
  longing:       ['media', 'listen to a song that reminds you of someone or somewhere you miss.'],
  awe:           ['sensory', 'go outside and look up at the sky for one minute.', 60],
  curiosity:     ['inquiry', 'a riddle: what has to be broken before you can use it?', 0, 'an egg'],
  confusion:     ['inquiry', 'what is one thing you do know right now?'],
  surprise:      ['inquiry', 'a riddle: the more you take, the more you leave behind. what are they?', 0, 'footsteps'],
  nostalgia:     ['media', 'play a song from your past. listen to the whole song.'],
  sadness:       ['media', 'listen to a slow song. it’s okay to feel sad.'],
  grief:         ['words', 'say their name out loud. you can still love them.'],
  loneliness:    ['task', 'send someone a message: “thinking of you.”'],
  disappointment:['words', 'say: “it didn’t go how i hoped, and i’m okay.”'],
  hurt:          ['breath', 'put a hand on your chest. breathe slowly for one minute.', 60],
  exhaustion:    ['breath', 'lie down. close your eyes. just breathe for one minute.', 60],
  numbness:      ['sensory', 'hold something cold, or wash your face with cold water. how does it feel?'],
  courage:       ['task', 'pick one thing you’re scared to do. take one tiny step today.'],
  fear:          ['sensory', 'name 5 things you can see, 4 you can hear, and 3 you can touch.'],
  anxiety:       ['breath', 'breathe in for 4, and out for 6. do it 5 times.', 60],
  overwhelm:     ['breath', 'take two quick breaths in through your nose, then one long breath out. do it 3 times.'],
  insecurity:    ['words', 'say out loud: “i am enough, just as i am.”'],
  vulnerability: ['task', 'tell someone you trust how you really feel today.'],
  helplessness:  ['task', 'do one small thing you can: drink water, open a window, or tidy one spot.'],
  embarrassment: ['inquiry', 'will anyone remember this in a year? will you?'],
  anger:         ['breath', 'breathe in for 4, and out slowly for 8. let your shoulders drop. do it 5 times.', 60],
  frustration:   ['breath', 'blow out hard, like blowing out candles. do it 5 times.'],
  resentment:    ['inquiry', 'what would help you let this go, even a little?'],
  jealousy:      ['inquiry', 'what are you afraid will happen? how likely is it, really?'],
  envy:          ['inquiry', 'if you had what they have, what would change for you?'],
  restlessness:  ['sensory', 'press your feet into the floor. feel the ground hold you.', 60],
  disgust:       ['sensory', 'wash your hands slowly in warm water. notice how you feel.'],
  guilt:         ['task', 'say sorry, or fix one small thing, if you can.'],
  shame:         ['words', 'put a hand on your heart and say: “i made a mistake. i am still good.”'],
  boredom:       ['sensory', 'close your eyes. count every sound you can hear for one minute.', 60],
};
global.window = {}; require('vm').runInThisContext(fs.readFileSync('data.js', 'utf8'));
for (const c of window.CARDS) {
  const x = X[c.name]; if (!x) throw new Error('missing ' + c.name);
  c.exercise = {kind: x[0], text: x[1]};
  if (x[2]) c.exercise.timer = x[2];
  if (x[3]) c.exercise.answer = x[3];
}
const src = fs.readFileSync('data.js', 'utf8');
const head = src.slice(0, src.indexOf('window.CARDS=')).replace('base = one of the 8 base emotions', 'exercise {kind, text, timer?, answer?} is a draft by Claude too (tools/add-exercises.cjs).\n   base = one of the 8 base emotions');
fs.writeFileSync('data.js', head + 'window.CARDS=' + JSON.stringify(window.CARDS, null, 1) + ';\n');
console.log('ok');
