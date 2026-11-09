/* adds `similar` (3 close feelings from the deck) and `about` (one plain line on the
   feeling) to every card in data.js. Both are drafts by Claude, edit freely. */
const fs = require('fs');
const D = {
  happiness:    [['contentment','playfulness','excitement'], 'a light, open feeling that comes when life feels good right now.'],
  peace:        [['contentment','relief','acceptance'], 'a calm with nothing to fix and nowhere you need to be.'],
  contentment:  [['peace','gratitude','happiness'], 'the quiet sense that what you have, right now, is enough.'],
  excitement:   [['curiosity','hope','playfulness'], 'energy rising toward something you want and can almost reach.'],
  playfulness:  [['happiness','curiosity','excitement'], 'the urge to try things just for the fun of it, without needing a point.'],
  hope:         [['courage','longing','excitement'], 'a belief that something better is possible, even before you can see it.'],
  pride:        [['confidence','happiness','admiration'], 'warmth at something you did or became, and are glad to own.'],
  relief:       [['peace','gratitude','happiness'], 'the loosening that comes when a weight you were carrying is set down.'],
  confidence:   [['courage','pride','trust'], 'trusting yourself enough to act before you are sure.'],
  trust:        [['belonging','acceptance','confidence'], 'feeling safe enough to rely on someone, or something, without checking.'],
  belonging:    [['trust','love','acceptance'], 'the sense of being part of something, where you don’t have to earn your place.'],
  admiration:   [['awe','gratitude','envy'], 'looking up to someone and wanting more of what you see in them.'],
  acceptance:   [['peace','compassion','trust'], 'letting something be as it is, without needing it to change first.'],
  gratitude:    [['love','contentment','relief'], 'noticing what has been given to you, and feeling it land.'],
  love:         [['tenderness','compassion','belonging'], 'deep care for someone, wanting good for them as much as for yourself.'],
  tenderness:   [['love','compassion','vulnerability'], 'a soft, gentle care, often for something small or fragile.'],
  compassion:   [['tenderness','love','acceptance'], 'feeling another’s pain and wanting to ease it.'],
  longing:      [['nostalgia','hope','loneliness'], 'a pull toward someone or something that isn’t here.'],
  awe:          [['surprise','admiration','curiosity'], 'the feeling of being small in front of something vast or beautiful.'],
  curiosity:    [['awe','excitement','playfulness'], 'wanting to know more, a door you can’t help opening.'],
  confusion:    [['overwhelm','surprise','anxiety'], 'when things don’t fit together yet and you can’t find the thread.'],
  surprise:     [['awe','confusion','excitement'], 'a jolt when something happens that you didn’t see coming.'],
  nostalgia:    [['longing','sadness','gratitude'], 'a bittersweet ache for a time that has passed.'],
  sadness:      [['grief','disappointment','loneliness'], 'a heaviness that comes with loss, or with things not being as we hoped.'],
  grief:        [['sadness','longing','numbness'], 'the deep sorrow of losing someone or something that mattered.'],
  loneliness:   [['longing','sadness','insecurity'], 'feeling unseen or apart, even sometimes among people.'],
  disappointment:[['sadness','frustration','hurt'], 'the drop when something falls short of what you hoped for.'],
  hurt:         [['sadness','resentment','vulnerability'], 'the sting when someone’s words or actions land somewhere tender.'],
  exhaustion:   [['numbness','overwhelm','sadness'], 'being worn down past what rest alone can fix.'],
  numbness:     [['exhaustion','boredom','grief'], 'a flatness where feelings should be, often a pause after too much.'],
  courage:      [['confidence','hope','vulnerability'], 'feeling afraid and moving anyway.'],
  fear:         [['anxiety','helplessness','vulnerability'], 'an alarm that something might harm you, here and now.'],
  anxiety:      [['fear','overwhelm','restlessness'], 'worry about what might happen, felt in the body before it happens.'],
  overwhelm:    [['anxiety','exhaustion','helplessness'], 'too much at once, more than you can hold right now.'],
  insecurity:   [['embarrassment','shame','envy'], 'doubting that you are enough, or that you belong.'],
  vulnerability:[['courage','tenderness','fear'], 'being open to being seen, without knowing how it will land.'],
  helplessness: [['overwhelm','fear','frustration'], 'feeling that nothing you do will change what is happening.'],
  embarrassment:[['shame','insecurity','guilt'], 'the heat of feeling exposed, as if everyone noticed.'],
  anger:        [['frustration','resentment','hurt'], 'a surge of energy when something feels wrong or unfair.'],
  frustration:  [['anger','restlessness','disappointment'], 'being blocked from something you want, again and again.'],
  resentment:   [['anger','hurt','jealousy'], 'old anger that stays, often about something never said.'],
  jealousy:     [['envy','insecurity','resentment'], 'fear of losing someone or something you hold to another.'],
  envy:         [['jealousy','admiration','insecurity'], 'wanting what someone else has, and feeling its lack in yourself.'],
  restlessness: [['boredom','anxiety','frustration'], 'an itch to move or change something, without knowing what.'],
  disgust:      [['shame','resentment','anger'], 'a pulling away from something that feels wrong or unclean.'],
  guilt:        [['shame','embarrassment','compassion'], 'the weight of feeling you did something wrong.'],
  shame:        [['guilt','embarrassment','insecurity'], 'feeling that something is wrong with who you are, not just what you did.'],
  boredom:      [['restlessness','numbness','curiosity'], 'when nothing holds your attention and time drags.'],
};
global.window = {}; require('vm').runInThisContext(fs.readFileSync('data.js','utf8'));
const names = new Set(window.CARDS.map(c => c.name));
for (const c of window.CARDS) {
  const d = D[c.name]; if (!d) throw new Error('missing ' + c.name);
  d[0].forEach(n => { if (!names.has(n)) throw new Error(`${c.name}: ${n} not in deck`); });
  c.similar = d[0]; c.about = d[1];
}
const src = fs.readFileSync('data.js', 'utf8');
const head = src.slice(0, src.indexOf('window.CARDS='))
  .replace('base = one of the 8 base emotions', 'similar (3 close feelings) and about (one plain line) are drafts by Claude, edit freely.\n   base = one of the 8 base emotions');
fs.writeFileSync('data.js', head + 'window.CARDS=' + JSON.stringify(window.CARDS, null, 1) + ';\n');
console.log('ok', window.CARDS.length);
