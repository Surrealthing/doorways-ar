/* rewrites every card's 3 prompts as short, plain questions that are easy to start
   writing about. The previous prompts are kept in tools/prompts-before-simple.json. */
const fs = require('fs');
const P = {
  happiness: ['when did you last laugh out loud?', 'what made you smile today?', 'who makes you feel happy?'],
  peace: ['where do you feel calm?', 'what helps you relax?', 'when did you last feel at peace?'],
  contentment: ['what in your life feels like enough?', 'what would you not change right now?', 'what is going well for you?'],
  excitement: ['what are you looking forward to?', 'what gets you excited lately?', 'what are you counting down to?'],
  playfulness: ['what do you do just for fun?', 'what did you love to play as a child?', 'when did you last feel silly?'],
  hope: ['what are you hoping for?', 'what gives you hope?', 'what good thing might be coming?'],
  confidence: ['what are you good at?', 'when did you last feel sure of yourself?', 'what helps you feel confident?'],
  pride: ['what are you proud of?', 'what have you done that was hard?', 'what did you do well this week?'],
  relief: ['what are you relieved about?', 'what worry has passed?', 'what did you finally let go of?'],
  gratitude: ['what are you thankful for today?', 'who would you like to thank?', 'what small thing made your day better?'],
  love: ['who do you love?', 'how do you show love?', 'who makes you feel loved?'],
  tenderness: ['who do you feel gentle with?', 'what made you feel soft lately?', 'how can you be kind to yourself today?'],
  trust: ['who do you trust?', 'what makes you trust someone?', 'who can you tell anything to?'],
  belonging: ['where do you feel at home?', 'who lets you be yourself?', 'where do you fit in?'],
  compassion: ['who needs some kindness right now?', 'how can you be kind to yourself today?', 'when did someone care for you?'],
  admiration: ['who do you look up to?', 'what do you admire in someone?', 'who inspires you?'],
  awe: ['what amazed you recently?', 'where do you feel small in a good way?', 'what is the most beautiful thing you’ve seen?'],
  curiosity: ['what do you want to learn?', 'what are you wondering about?', 'what would you like to try?'],
  nostalgia: ['what memory do you miss?', 'what song takes you back?', 'what did you love as a child?'],
  acceptance: ['what can you not change?', 'what are you learning to accept?', 'what would you let be today?'],
  courage: ['what scares you that you want to do?', 'when were you brave?', 'what small brave step can you take?'],
  sadness: ['what makes you sad right now?', 'what do you miss?', 'what do you need when you are sad?'],
  grief: ['who or what do you miss?', 'what would you say to them?', 'what do you remember most?'],
  loneliness: ['when do you feel lonely?', 'who would you like to talk to?', 'who could you reach out to today?'],
  disappointment: ['what didn’t go the way you hoped?', 'what did you want to happen?', 'what can you try next?'],
  hurt: ['what hurt you recently?', 'what do you wish someone had said?', 'what would help you feel better?'],
  longing: ['what do you long for?', 'who or what do you wish was closer?', 'what are you waiting for?'],
  exhaustion: ['what is making you tired?', 'what could you stop doing for a day?', 'what helps you rest?'],
  numbness: ['what have you stopped feeling?', 'when did you last feel something strongly?', 'what small thing still makes you feel?'],
  fear: ['what are you afraid of?', 'what would help you feel safe?', 'what would you do if you weren’t scared?'],
  anxiety: ['what are you worried about?', 'what can you control right now?', 'what helps you calm down?'],
  overwhelm: ['what feels like too much?', 'what can wait until tomorrow?', 'what is one small thing to do next?'],
  insecurity: ['when do you feel not good enough?', 'what do you like about yourself?', 'what would your best friend say about you?'],
  vulnerability: ['what is hard for you to share?', 'who do you feel safe with?', 'when did you let someone see the real you?'],
  helplessness: ['what can’t you change right now?', 'what is still in your hands?', 'who could you ask for help?'],
  anger: ['what made you angry recently?', 'what do you want to say?', 'what is under your anger?'],
  frustration: ['what is frustrating you?', 'what keeps going wrong?', 'what could you try differently?'],
  resentment: ['what are you still upset about?', 'who do you need to talk to?', 'what would help you let go?'],
  jealousy: ['who or what are you afraid of losing?', 'what makes you feel jealous?', 'what would help you feel secure?'],
  envy: ['who do you envy?', 'what do they have that you want?', 'what is one step toward it?'],
  disgust: ['what do you not want in your life?', 'what feels wrong to you?', 'where do you need to say no?'],
  guilt: ['what do you feel bad about?', 'what could you do to make it right?', 'what would help you forgive yourself?'],
  shame: ['what are you hiding?', 'what would you tell a friend who felt this way?', 'what is good about you?'],
  embarrassment: ['what moment still makes you cringe?', 'can you laugh about it now?', 'what would you tell a friend in your place?'],
  boredom: ['what bores you right now?', 'what would you rather be doing?', 'what is something new you could try?'],
  restlessness: ['what do you want to change?', 'what is making you restless?', 'where would you go right now if you could?'],
  confusion: ['what are you unsure about?', 'what do you already know?', 'who could help you understand?'],
  surprise: ['what surprised you recently?', 'what happened that you didn’t expect?', 'what good surprise would you like?'],
};
global.window = {}; require('vm').runInThisContext(fs.readFileSync('data.js', 'utf8'));
const bak = 'tools/prompts-before-simple.json';
if (!fs.existsSync(bak)) fs.writeFileSync(bak, JSON.stringify(Object.fromEntries(window.CARDS.map(c => [c.name, c.prompts])), null, 1));
for (const c of window.CARDS) { if (!P[c.name]) throw new Error('missing ' + c.name); c.prompts = P[c.name]; }
const src = fs.readFileSync('data.js', 'utf8');
const head = src.slice(0, src.indexOf('window.CARDS='))
  .replace(/prompts\[0\] from\n   the deck's original data, prompts\[1\.\.2\] are drafts for the 'next prompt' control —\n   edit freely\./, "prompts are short plain questions\n   (drafts by Claude, the older ones are in tools/prompts-before-simple.json), edit freely.");
fs.writeFileSync('data.js', head + 'window.CARDS=' + JSON.stringify(window.CARDS, null, 1) + ';\n');
console.log('ok');
