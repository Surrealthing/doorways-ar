/* Doorways deck · 48 cards. Card text comes from Doorways-Final.ai; prompts[0] from
   the deck's original data, prompts[1..2] are drafts for the 'next prompt' control —
   edit freely. pal = the card's own gradient palette (k-means on the printed
   number side, largest first); a/b/c are its first three.
   numOff = how far the printed number sits from the centre of its wave shape (card uv);
   the AR card shifts it by this so the number is centred. base = one of the 8 base emotions (Plutchik, love replacing anticipation). */
window.CARDS=[
 {
  "id": 1,
  "num": "#01",
  "name": "happiness",
  "base": "joy",
  "family": "happiness",
  "a": "#FBCF76",
  "b": "#F4A3A9",
  "voice": "i’m the laugh that escapes before you can hold it back. i live in the moments you don’t want to end.",
  "note": "notice where i show up. go there more often.",
  "prompts": [
   "when did you last laugh before you could stop yourself?",
   "where in your day does happiness show up without being invited?",
   "who do you feel most like yourself around?"
  ],
  "pal": [
   "#FBCF76",
   "#F4A3A9",
   "#DF75BC",
   "#7866B8"
  ],
  "c": "#DF75BC",
  "numOff": [
   -0.00069,
   -0.00138
  ]
 },
 {
  "id": 2,
  "num": "#02",
  "name": "peace",
  "base": "joy",
  "family": "happiness",
  "a": "#7AD0AE",
  "b": "#D285C9",
  "voice": "your thoughts still come, but they don’t pull you anywhere. i’m the stillness they pass through.",
  "note": "you don’t have to empty your mind to find me.",
  "prompts": [
   "where were you the last time nothing needed fixing?",
   "what helps your shoulders drop?",
   "where could you leave a little more quiet today?"
  ],
  "pal": [
   "#7AD0AE",
   "#D285C9",
   "#768FD1",
   "#E1ABD8"
  ],
  "c": "#768FD1",
  "numOff": [
   -0.01174,
   0.0069
  ]
 },
 {
  "id": 3,
  "num": "#03",
  "name": "contentment",
  "base": "joy",
  "family": "happiness",
  "a": "#9C6ABA",
  "b": "#4ABFB1",
  "voice": "i’m the full, easy feeling of having enough. no more wanting. just this.",
  "note": "enough isn’t settling. it’s a place you can stand.",
  "prompts": [
   "what in your life is already enough?",
   "what would you keep exactly as it is?",
   "when did you last stop wanting, even for a minute?"
  ],
  "pal": [
   "#9C6ABA",
   "#4ABFB1",
   "#84A2D7",
   "#E57E93"
  ],
  "c": "#84A2D7",
  "numOff": [
   -0.01174,
   0.0069
  ]
 },
 {
  "id": 4,
  "num": "#04",
  "name": "excitement",
  "base": "joy",
  "family": "happiness",
  "a": "#1589A0",
  "b": "#4952A1",
  "voice": "you feel me as a buzz under your skin, counting down to something good.",
  "note": "enjoy the waiting. it’s part of me too.",
  "prompts": [
   "what are you counting down to right now?",
   "what are you looking forward to that you haven’t told anyone?",
   "what does the waiting feel like in your body?"
  ],
  "pal": [
   "#1589A0",
   "#4952A1",
   "#BD4389",
   "#CFB937"
  ],
  "c": "#BD4389",
  "numOff": [
   -0.01312,
   0.00736
  ]
 },
 {
  "id": 5,
  "num": "#05",
  "name": "playfulness",
  "base": "joy",
  "family": "happiness",
  "a": "#74C353",
  "b": "#CB2E96",
  "voice": "i’m the part of you that does the silly voice and laughs at nothing.",
  "note": "not everything has to be serious to count.",
  "prompts": [
   "when did you last do something just because it was fun?",
   "what did you love doing before anyone was watching?",
   "where could you take the long way home this week?"
  ],
  "pal": [
   "#74C353",
   "#CB2E96",
   "#C46F89",
   "#B89B49"
  ],
  "c": "#C46F89",
  "numOff": [
   0.00069,
   -0.00092
  ]
 },
 {
  "id": 6,
  "num": "#06",
  "name": "hope",
  "base": "joy",
  "family": "happiness",
  "a": "#4A6DBC",
  "b": "#CCDC47",
  "voice": "i’m the light you keep on, even when you’re not sure anyone’s coming.",
  "note": "i don’t promise. i just keep the door open.",
  "prompts": [
   "what small light are you keeping on at the moment?",
   "what are you quietly hoping for?",
   "what keeps the door open for you, even on hard days?"
  ],
  "pal": [
   "#4A6DBC",
   "#CCDC47",
   "#B3C6B0",
   "#8F9DD5"
  ],
  "c": "#B3C6B0",
  "numOff": [
   -0.01174,
   0.0069
  ]
 },
 {
  "id": 7,
  "num": "#07",
  "name": "confidence",
  "base": "trust",
  "family": "happiness",
  "a": "#C31683",
  "b": "#74228A",
  "voice": "i’m you, trusting yourself before anyone else does. you say it once, and you mean it.",
  "note": "i don’t need to be loud. i grow each time you back yourself.",
  "prompts": [
   "when did you last walk into a room and trust what you knew?",
   "when did you last back yourself, out loud?",
   "what do you know that you don’t say often enough?"
  ],
  "pal": [
   "#C31683",
   "#74228A",
   "#ACC742",
   "#CD7A5E"
  ],
  "c": "#ACC742",
  "numOff": [
   -0.01243,
   0.00736
  ]
 },
 {
  "id": 8,
  "num": "#08",
  "name": "pride",
  "base": "joy",
  "family": "happiness",
  "a": "#9E57AF",
  "b": "#4D49A2",
  "voice": "i’m the quiet glow when you look back at what you made, or what you survived.",
  "note": "you’re allowed to be glad about yourself. i don’t need anyone smaller.",
  "prompts": [
   "what have you made, or survived, that you rarely give yourself credit for?",
   "what are you proud of that no one saw?",
   "how would you tell a friend about what you’ve done this year?"
  ],
  "pal": [
   "#9E57AF",
   "#4D49A2",
   "#B27ABF"
  ],
  "c": "#B27ABF",
  "numOff": [
   -0.01105,
   0.0069
  ]
 },
 {
  "id": 9,
  "num": "#09",
  "name": "relief",
  "base": "joy",
  "family": "happiness",
  "a": "#3FBBC2",
  "b": "#6761B4",
  "voice": "i’m the long breath out when the thing you were dreading finally passes.",
  "note": "only now do you see how much you were carrying.",
  "prompts": [
   "what did you finally put down recently?",
   "what are you still bracing for that has already passed?",
   "what would it take to breathe out today?"
  ],
  "pal": [
   "#3FBBC2",
   "#6761B4",
   "#4E8BD0"
  ],
  "c": "#4E8BD0",
  "numOff": [
   -0.01243,
   0.00736
  ]
 },
 {
  "id": 10,
  "num": "#10",
  "name": "gratitude",
  "base": "love",
  "family": "love",
  "a": "#5ABF48",
  "b": "#36B998",
  "voice": "i’m found in small things, the ones you’d miss if you weren’t looking. i help you notice them.",
  "note": "the more you notice, the more you’ll find me.",
  "prompts": [
   "whose small kindness have you never thanked?",
   "what small thing would you miss if it was gone tomorrow?",
   "who carried you a little, without being asked?"
  ],
  "pal": [
   "#5ABF48",
   "#36B998",
   "#50BFD3",
   "#8073C0"
  ],
  "c": "#50BFD3",
  "numOff": [
   -0.01243,
   0.0069
  ]
 },
 {
  "id": 11,
  "num": "#11",
  "name": "love",
  "base": "love",
  "family": "love",
  "a": "#E72B7A",
  "b": "#D27DB9",
  "voice": "i’m the warmth of being fully seen and loved as you are.",
  "note": "you don’t have to earn me. and i never ask you to disappear.",
  "prompts": [
   "who do you love in ways you’ve never said out loud?",
   "how do you show love when words are hard?",
   "where do you leave yourself out of the care you give?"
  ],
  "pal": [
   "#E72B7A",
   "#D27DB9",
   "#F15D31",
   "#5BB1D8"
  ],
  "c": "#F15D31",
  "numOff": [
   -0.00552,
   0.00736
  ]
 },
 {
  "id": 12,
  "num": "#12",
  "name": "tenderness",
  "base": "love",
  "family": "love",
  "a": "#23A3CB",
  "b": "#587CC6",
  "voice": "i’m how your voice softens around a sleeping child.",
  "note": "gentleness is its own kind of strength.",
  "prompts": [
   "what made you go soft recently?",
   "who brings out the softest part of you?",
   "where could you be gentler with yourself this week?"
  ],
  "pal": [
   "#23A3CB",
   "#587CC6",
   "#E894CE",
   "#A87DC5"
  ],
  "c": "#E894CE",
  "numOff": [
   -0.01243,
   0.0069
  ]
 },
 {
  "id": 13,
  "num": "#13",
  "name": "trust",
  "base": "trust",
  "family": "love",
  "a": "#27AD4B",
  "b": "#0BA488",
  "voice": "i’m not having to check. you say something once and know it’ll be held.",
  "note": "i’m built slowly. that’s what makes me worth keeping.",
  "prompts": [
   "who would catch you if you leaned back today?",
   "who have you trusted slowly, and why?",
   "what helps you believe someone will hold what you say?"
  ],
  "pal": [
   "#27AD4B",
   "#0BA488",
   "#4C7AC5",
   "#219CC0"
  ],
  "c": "#4C7AC5",
  "numOff": [
   -0.01243,
   0.00736
  ]
 },
 {
  "id": 14,
  "num": "#14",
  "name": "belonging",
  "base": "trust",
  "family": "love",
  "a": "#74C73B",
  "b": "#58ACD4",
  "voice": "i’m walking into a room and not having to explain yourself.",
  "note": "i’m found with the right people, never forced.",
  "prompts": [
   "where do you not have to explain yourself?",
   "who makes you feel like you don’t need to perform?",
   "where do you feel most at home that isn’t a home?"
  ],
  "pal": [
   "#74C73B",
   "#58ACD4",
   "#D867BA",
   "#30B593"
  ],
  "c": "#D867BA",
  "numOff": [
   -0.02072,
   0.00644
  ]
 },
 {
  "id": 15,
  "num": "#15",
  "name": "compassion",
  "base": "love",
  "family": "love",
  "a": "#BE4BAA",
  "b": "#E658A6",
  "voice": "i’m what moves in you when you see someone hurting and don’t look away.",
  "note": "i reach out. i don’t ask you to carry it all.",
  "prompts": [
   "whose hurt did you notice this week, and stay with?",
   "what would you offer yourself if you were someone you love?",
   "when did someone stay with your hurt, and what did that feel like?"
  ],
  "pal": [
   "#BE4BAA",
   "#E658A6",
   "#834BA6",
   "#F47D35"
  ],
  "c": "#834BA6",
  "numOff": [
   -0.01243,
   0.0069
  ]
 },
 {
  "id": 16,
  "num": "#16",
  "name": "admiration",
  "base": "trust",
  "family": "love",
  "a": "#BCA0D4",
  "b": "#7B6EBD",
  "voice": "i’m the pull toward someone who does something well, or bravely.",
  "note": "what you admire in them is often growing in you.",
  "prompts": [
   "who do you admire, and what does that say about what you value?",
   "what quality in someone else are you growing into?",
   "who did something bravely this year that stayed with you?"
  ],
  "pal": [
   "#BCA0D4",
   "#7B6EBD",
   "#7F90CD",
   "#78BF6B"
  ],
  "c": "#7F90CD",
  "numOff": [
   -0.01174,
   0.0069
  ]
 },
 {
  "id": 17,
  "num": "#17",
  "name": "awe",
  "base": "surprise",
  "family": "surprise",
  "a": "#3CB6E4",
  "b": "#9461B5",
  "voice": "you meet me under a huge sky or in front of the sea. i make you small in a good way.",
  "note": "your worries look their real size next to me.",
  "prompts": [
   "when did you last feel small in a good way?",
   "what made you go quiet recently, in a good way?",
   "where could you go this week that makes you feel small and held?"
  ],
  "pal": [
   "#3CB6E4",
   "#9461B5",
   "#778CCE",
   "#A2D0EC"
  ],
  "c": "#778CCE",
  "numOff": [
   -0.01036,
   0.0069
  ]
 },
 {
  "id": 18,
  "num": "#18",
  "name": "curiosity",
  "base": "surprise",
  "family": "surprise",
  "a": "#138D51",
  "b": "#683A98",
  "voice": "i’m the itch to know more. the question you can’t put down.",
  "note": "follow me. i usually lead somewhere worth it.",
  "prompts": [
   "what question won’t leave you alone lately?",
   "what would you learn if no one was grading you?",
   "what are you wondering about that you haven’t said out loud?"
  ],
  "pal": [
   "#138D51",
   "#683A98",
   "#1D77A2",
   "#B06273"
  ],
  "c": "#1D77A2",
  "numOff": [
   -0.01105,
   0.0069
  ]
 },
 {
  "id": 19,
  "num": "#19",
  "name": "nostalgia",
  "base": "sadness",
  "family": "sadness",
  "a": "#9464B1",
  "b": "#E89616",
  "voice": "i arrive with an old song or a familiar smell, and suddenly you’re somewhere else.",
  "note": "i remind you what you loved, so you can find it again.",
  "prompts": [
   "which song or smell takes you straight back, and to where?",
   "what did you love back then that you could find again now?",
   "which version of you do you miss, and what did they know?"
  ],
  "pal": [
   "#9464B1",
   "#E89616",
   "#4DB7B2",
   "#CA7D3A"
  ],
  "c": "#4DB7B2",
  "numOff": [
   -0.01174,
   0.00736
  ]
 },
 {
  "id": 20,
  "num": "#20",
  "name": "acceptance",
  "base": "trust",
  "family": "love",
  "a": "#50B745",
  "b": "#46BF99",
  "voice": "i’m what’s left when you stop arguing with what already is.",
  "note": "i’m not giving up. i’m letting you start from here.",
  "prompts": [
   "what are you still arguing with that has already happened?",
   "what would change if you let this be true?",
   "what is one thing you can start from, exactly as it is?"
  ],
  "pal": [
   "#50B745",
   "#46BF99",
   "#4DBEDD",
   "#4F94D6"
  ],
  "c": "#4DBEDD",
  "numOff": [
   -0.01381,
   0.00736
  ]
 },
 {
  "id": 21,
  "num": "#21",
  "name": "courage",
  "base": "fear",
  "family": "fear",
  "a": "#3F4CA3",
  "b": "#8A409A",
  "voice": "i’m the step you take while your knees are still shaking.",
  "note": "i don’t come before you start. i come as you go.",
  "prompts": [
   "what step are you taking while you’re still afraid?",
   "what would you do this week if you didn’t wait to feel ready?",
   "when were you braver than you gave yourself credit for?"
  ],
  "pal": [
   "#3F4CA3",
   "#8A409A",
   "#BE236B",
   "#B69B5F"
  ],
  "c": "#BE236B",
  "numOff": [
   -0.01243,
   0.0069
  ]
 },
 {
  "id": 22,
  "num": "#22",
  "name": "sadness",
  "base": "sadness",
  "family": "sadness",
  "a": "#13877E",
  "b": "#3F3390",
  "voice": "i’m the heaviness that settles in quietly. i slow everything down so you can feel what mattered.",
  "note": "i’m not here to stay. i’m here to be felt.",
  "prompts": [
   "what have you been missing lately?",
   "what does your sadness want you to slow down for?",
   "what do you need when you feel this heavy?"
  ],
  "pal": [
   "#13877E",
   "#3F3390",
   "#1C69AB",
   "#9E1577"
  ],
  "c": "#1C69AB",
  "numOff": [
   -0.01174,
   0.0069
  ]
 },
 {
  "id": 23,
  "num": "#23",
  "name": "grief",
  "base": "sadness",
  "family": "sadness",
  "a": "#167B65",
  "b": "#283E90",
  "voice": "i’m love with nowhere to go. i come in waves, sometimes years later.",
  "note": "i soften with time. i never ask you to forget.",
  "prompts": [
   "who or what do you still carry with you?",
   "what would you tell them if you could, today?",
   "how has your grief changed shape over time?"
  ],
  "pal": [
   "#167B65",
   "#283E90",
   "#681C82",
   "#AE1B72"
  ],
  "c": "#681C82",
  "numOff": [
   0.00069,
   0.00092
  ]
 },
 {
  "id": 24,
  "num": "#24",
  "name": "loneliness",
  "base": "sadness",
  "family": "sadness",
  "a": "#14A8A8",
  "b": "#55439E",
  "voice": "i’m having something good happen and no one to tell.",
  "note": "i’m your heart asking for connection. it’s allowed to ask.",
  "prompts": [
   "when did you last feel unseen in a full room?",
   "who would you call if you let yourself?",
   "what kind of connection are you hungry for?"
  ],
  "pal": [
   "#14A8A8",
   "#55439E",
   "#237EC5",
   "#87CDD3"
  ],
  "c": "#237EC5",
  "numOff": [
   -0.01243,
   0.0069
  ]
 },
 {
  "id": 25,
  "num": "#25",
  "name": "disappointment",
  "base": "sadness",
  "family": "sadness",
  "a": "#62C456",
  "b": "#5A81CA",
  "voice": "i’m the drop in your stomach when what you hoped for doesn’t come.",
  "note": "it hurts this much because you cared this much.",
  "prompts": [
   "what did you hope for that didn’t come, and what does it show you cared about?",
   "what did this teach you about what you want?",
   "what could you still hope for, in a different shape?"
  ],
  "pal": [
   "#62C456",
   "#5A81CA",
   "#37B9A7",
   "#37A7DE"
  ],
  "c": "#37B9A7",
  "numOff": [
   -0.0076,
   -0.00046
  ]
 },
 {
  "id": 26,
  "num": "#26",
  "name": "hurt",
  "base": "sadness",
  "family": "sadness",
  "a": "#60C8BE",
  "b": "#99C33B",
  "voice": "i’m the sting that stays after the words were said and the moment has passed.",
  "note": "i’m telling you it wasn’t okay. i deserve to be heard.",
  "prompts": [
   "which words have stayed with you longer than the moment they were said?",
   "what did you need to hear that you never heard?",
   "what would it look like to take this hurt seriously?"
  ],
  "pal": [
   "#60C8BE",
   "#99C33B",
   "#74226C",
   "#A26C2E"
  ],
  "c": "#74226C",
  "numOff": [
   -0.01934,
   0.00736
  ]
 },
 {
  "id": 27,
  "num": "#27",
  "name": "longing",
  "base": "love",
  "family": "love",
  "a": "#8A62B5",
  "b": "#9182C8",
  "voice": "i’m the reaching toward something far away. a person, a place, a time.",
  "note": "i point to what your heart still wants.",
  "prompts": [
   "what is your heart still reaching toward?",
   "what would you do if you could get a little closer to it?",
   "what part of what you long for is already here?"
  ],
  "pal": [
   "#8A62B5",
   "#9182C8",
   "#96ADD8",
   "#8ECDA6"
  ],
  "c": "#96ADD8",
  "numOff": [
   -0.02072,
   0.00736
  ]
 },
 {
  "id": 28,
  "num": "#28",
  "name": "exhaustion",
  "base": "sadness",
  "family": "sadness",
  "a": "#56C1ED",
  "b": "#7988CD",
  "voice": "i’m the weight in your body that sleep alone doesn’t fix.",
  "note": "i’m not weakness. i’m asking you to rest, even a little.",
  "prompts": [
   "what are you carrying that sleep doesn’t fix?",
   "what could you stop doing, even for one day?",
   "what does rest actually look like for you?"
  ],
  "pal": [
   "#56C1ED",
   "#7988CD",
   "#A04FA1"
  ],
  "c": "#A04FA1",
  "numOff": [
   -0.01243,
   0.00736
  ]
 },
 {
  "id": 29,
  "num": "#29",
  "name": "numbness",
  "base": "sadness",
  "family": "sadness",
  "a": "#1BADAC",
  "b": "#3881C3",
  "voice": "i’m the flatness when you expect to feel something, and don’t.",
  "note": "i’m not empty. i’m protecting you from too much at once.",
  "prompts": [
   "when did you last expect to feel something, and didn’t?",
   "what might be underneath the flatness?",
   "what small thing still reaches you, even a little?"
  ],
  "pal": [
   "#1BADAC",
   "#3881C3",
   "#B9C7D5",
   "#D15A97"
  ],
  "c": "#B9C7D5",
  "numOff": [
   -0.01312,
   0.0069
  ]
 },
 {
  "id": 30,
  "num": "#30",
  "name": "fear",
  "base": "fear",
  "family": "fear",
  "a": "#322B84",
  "b": "#762583",
  "voice": "i’m your heart racing before you know what’s wrong. i show up to keep you safe.",
  "note": "i’m trying to protect something. ask me what.",
  "prompts": [
   "when did fear last stop you, and was it right?",
   "what is your fear trying to protect?",
   "what is one small step you could take with it beside you?"
  ],
  "pal": [
   "#322B84",
   "#762583",
   "#B5204C",
   "#C38C49"
  ],
  "c": "#B5204C",
  "numOff": [
   -0.01243,
   0.0069
  ]
 },
 {
  "id": 31,
  "num": "#31",
  "name": "anxiety",
  "base": "fear",
  "family": "fear",
  "a": "#90C32B",
  "b": "#66A1BD",
  "voice": "i’m the what-ifs that won’t let you sleep.",
  "note": "i don’t always know when to stop. a slow breath helps.",
  "prompts": [
   "which what-if keeps running after the lights are off?",
   "what can you actually control in this?",
   "what helps you come back to your breath?"
  ],
  "pal": [
   "#90C32B",
   "#66A1BD",
   "#4F6CB9",
   "#65B068"
  ],
  "c": "#4F6CB9",
  "numOff": [
   -0.01312,
   0.0069
  ]
 },
 {
  "id": 32,
  "num": "#32",
  "name": "overwhelm",
  "base": "fear",
  "family": "fear",
  "a": "#CB993C",
  "b": "#7AA2C5",
  "voice": "i’m everything arriving at once, and not knowing where to begin.",
  "note": "you don’t have to do it all. just the next small thing.",
  "prompts": [
   "if you could put one thing down today, what would it be?",
   "what is the next small thing, just one?",
   "what can wait until tomorrow?"
  ],
  "pal": [
   "#CB993C",
   "#7AA2C5",
   "#DA6224",
   "#80BB5F"
  ],
  "c": "#DA6224",
  "numOff": [
   -0.01243,
   0.00736
  ]
 },
 {
  "id": 33,
  "num": "#33",
  "name": "insecurity",
  "base": "fear",
  "family": "sadness",
  "a": "#B6CE55",
  "b": "#8762AE",
  "voice": "i’m the voice asking if you’re good enough, right when it matters most.",
  "note": "i may sound convincing, but i’m not always right.",
  "prompts": [
   "where does the not-good-enough voice get loudest?",
   "whose voice does your doubt sound like?",
   "what do the people who love you see that you don’t?"
  ],
  "pal": [
   "#B6CE55",
   "#8762AE",
   "#9CAED0",
   "#DE883A"
  ],
  "c": "#9CAED0",
  "numOff": [
   -0.01174,
   0.0069
  ]
 },
 {
  "id": 34,
  "num": "#34",
  "name": "vulnerability",
  "base": "fear",
  "family": "fear",
  "a": "#6BCCC7",
  "b": "#6D69B9",
  "voice": "i’m the shaky feeling of being seen before you’re ready.",
  "note": "i’m where closeness begins.",
  "prompts": [
   "when were you last seen before you felt ready?",
   "who have you let see you lately?",
   "what would you share if you knew it would be held?"
  ],
  "pal": [
   "#6BCCC7",
   "#6D69B9",
   "#6692D3"
  ],
  "c": "#6692D3",
  "numOff": [
   -0.02141,
   0.0069
  ]
 },
 {
  "id": 35,
  "num": "#35",
  "name": "helplessness",
  "base": "fear",
  "family": "fear",
  "a": "#5FB334",
  "b": "#355AAE",
  "voice": "i’m trying everything and still not being able to change it.",
  "note": "you don’t have to carry this alone. reach for someone.",
  "prompts": [
   "who could you reach for with the thing you can’t change alone?",
   "what is one thing still in your hands?",
   "who could carry part of this with you?"
  ],
  "pal": [
   "#5FB334",
   "#355AAE",
   "#248FBB",
   "#14A067"
  ],
  "c": "#248FBB",
  "numOff": [
   -0.00483,
   0.00736
  ]
 },
 {
  "id": 36,
  "num": "#36",
  "name": "anger",
  "base": "anger",
  "family": "anger",
  "a": "#EF4231",
  "b": "#F27A8E",
  "voice": "i’m the rush through your body when something isn’t fair.",
  "note": "underneath me, there’s often hurt. listen before you act.",
  "prompts": [
   "when did you last swallow anger instead of saying something?",
   "what is your anger pointing at?",
   "what hurt might be sitting underneath it?"
  ],
  "pal": [
   "#EF4231",
   "#F27A8E",
   "#A8C1C9",
   "#D78A3B"
  ],
  "c": "#A8C1C9",
  "numOff": [
   -0.0145,
   0.00736
  ]
 },
 {
  "id": 37,
  "num": "#37",
  "name": "frustration",
  "base": "anger",
  "family": "anger",
  "a": "#833897",
  "b": "#1F8FC3",
  "voice": "i’m the tight jaw when you’ve tried again and it still won’t work.",
  "note": "i’m a sign to try it differently, or to pause.",
  "prompts": [
   "where do you keep trying the same way and expecting a different result?",
   "what would trying it differently look like?",
   "what would happen if you paused here?"
  ],
  "pal": [
   "#833897",
   "#1F8FC3",
   "#C4332C",
   "#B3AA2D"
  ],
  "c": "#C4332C",
  "numOff": [
   -0.01243,
   0.00736
  ]
 },
 {
  "id": 38,
  "num": "#38",
  "name": "resentment",
  "base": "anger",
  "family": "anger",
  "a": "#51C080",
  "b": "#E42E41",
  "voice": "i’m old anger that never got said. i’ve been waiting a long time.",
  "note": "i’m asking to be spoken, not stored.",
  "prompts": [
   "what old anger is still waiting to be said?",
   "who do you need to say something to, even gently?",
   "what would you need to let some of this go?"
  ],
  "pal": [
   "#51C080",
   "#E42E41",
   "#76B5C3",
   "#C46FB9"
  ],
  "c": "#76B5C3",
  "numOff": [
   -0.01243,
   0.0069
  ]
 },
 {
  "id": 39,
  "num": "#39",
  "name": "jealousy",
  "base": "anger",
  "family": "anger",
  "a": "#EC5065",
  "b": "#C2C24B",
  "voice": "i’m the fear of losing your place with someone who matters.",
  "note": "what’s real doesn’t need guarding.",
  "prompts": [
   "what are you most afraid of losing?",
   "what are you afraid of losing?",
   "what would help you feel secure, not guarded?"
  ],
  "pal": [
   "#EC5065",
   "#C2C24B",
   "#877CBA",
   "#61B9D2"
  ],
  "c": "#877CBA",
  "numOff": [
   -0.00345,
   0.0069
  ]
 },
 {
  "id": 40,
  "num": "#40",
  "name": "envy",
  "base": "anger",
  "family": "anger",
  "a": "#A2BA24",
  "b": "#5C72BC",
  "voice": "i’m the ache when someone has something you quietly want.",
  "note": "i can inspire you toward what you dream of.",
  "prompts": [
   "whose life did you look at a little too long this week?",
   "what is your envy telling you that you want?",
   "what is one small step toward it?"
  ],
  "pal": [
   "#A2BA24",
   "#5C72BC",
   "#7BAA54",
   "#74A2B2"
  ],
  "c": "#7BAA54",
  "numOff": [
   -0.01174,
   0.00736
  ]
 },
 {
  "id": 41,
  "num": "#41",
  "name": "disgust",
  "base": "disgust",
  "family": "anger",
  "a": "#C2242E",
  "b": "#72BDBE",
  "voice": "i’m the step back your body takes before you can explain why.",
  "note": "i mark a line. you decide what to do with it.",
  "prompts": [
   "what line did your body draw before your mind could explain it?",
   "what did your body say no to before you did?",
   "what line are you drawing, and is it yours?"
  ],
  "pal": [
   "#C2242E",
   "#72BDBE",
   "#B58895",
   "#C54870"
  ],
  "c": "#B58895",
  "numOff": [
   -0.01105,
   0.0069
  ]
 },
 {
  "id": 42,
  "num": "#42",
  "name": "guilt",
  "base": "disgust",
  "family": "sadness",
  "a": "#43B0D9",
  "b": "#77BF82",
  "voice": "i’m the weight that comes when you’ve gone against what you care about.",
  "note": "i’m about what you did, not who you are.",
  "prompts": [
   "what would repair look like for something you regret?",
   "what would repair look like, in one small step?",
   "what would you need to forgive yourself?"
  ],
  "pal": [
   "#43B0D9",
   "#77BF82",
   "#CD8657",
   "#D4322F"
  ],
  "c": "#CD8657",
  "numOff": [
   -0.01381,
   0.00736
  ]
 },
 {
  "id": 43,
  "num": "#43",
  "name": "shame",
  "base": "disgust",
  "family": "sadness",
  "a": "#C31C58",
  "b": "#71BBB0",
  "voice": "i make you want to disappear while you’re still in the room.",
  "note": "i grow in hiding. i fade when shared.",
  "prompts": [
   "what would you say to a friend who felt about themselves the way you feel now?",
   "what would happen if you shared this with someone safe?",
   "what is true about you that this feeling forgets?"
  ],
  "pal": [
   "#C31C58",
   "#71BBB0",
   "#CA8F47"
  ],
  "c": "#CA8F47",
  "numOff": [
   -0.01381,
   0.00736
  ]
 },
 {
  "id": 44,
  "num": "#44",
  "name": "embarrassment",
  "base": "fear",
  "family": "sadness",
  "a": "#3EB685",
  "b": "#E94062",
  "voice": "i’m the heat in your face when it feels like everyone is looking.",
  "note": "i pass faster than it feels. almost everyone has met me.",
  "prompts": [
   "which moment still makes your face warm, and does anyone else even remember it?",
   "what moment still makes you cringe, and can you smile at it now?",
   "what would you tell a friend who felt this way?"
  ],
  "pal": [
   "#3EB685",
   "#E94062",
   "#D58F7D",
   "#9DBE94"
  ],
  "c": "#D58F7D",
  "numOff": [
   -0.02003,
   0.0069
  ]
 },
 {
  "id": 45,
  "num": "#45",
  "name": "boredom",
  "base": "disgust",
  "family": "anger",
  "a": "#5FC354",
  "b": "#1BA3BD",
  "voice": "i’m checking the time again, and it’s only been five minutes.",
  "note": "stay with me a while. good ideas often start here.",
  "prompts": [
   "what would actually matter to you right now?",
   "what would actually feel worth your time right now?",
   "what idea keeps coming back when you sit still?"
  ],
  "pal": [
   "#5FC354",
   "#1BA3BD",
   "#2E69BA",
   "#93D685"
  ],
  "c": "#2E69BA",
  "numOff": [
   -0.02003,
   0.00736
  ]
 },
 {
  "id": 46,
  "num": "#46",
  "name": "restlessness",
  "base": "anger",
  "family": "anger",
  "a": "#2AAF5A",
  "b": "#2099BC",
  "voice": "i’m the fidget in your legs, the feeling you should be somewhere else.",
  "note": "something wants to change. take a moment to find out what.",
  "prompts": [
   "what in your life is asking to change?",
   "what wants to change in your life?",
   "where would you go if you followed the fidget?"
  ],
  "pal": [
   "#2AAF5A",
   "#2099BC",
   "#BC5EA0",
   "#BDB4CF"
  ],
  "c": "#BC5EA0",
  "numOff": [
   -0.01174,
   0.0069
  ]
 },
 {
  "id": 47,
  "num": "#47",
  "name": "confusion",
  "base": "surprise",
  "family": "surprise",
  "a": "#A0C93F",
  "b": "#6F6AAF",
  "voice": "i’m the fog when things don’t fit together yet.",
  "note": "you don’t have to know yet. clarity comes slower than i do.",
  "prompts": [
   "what don’t you need to understand yet?",
   "what do you already know, even if not everything?",
   "what question could you sit with, without needing the answer yet?"
  ],
  "pal": [
   "#A0C93F",
   "#6F6AAF",
   "#8CA1C0",
   "#C39337"
  ],
  "c": "#8CA1C0",
  "numOff": [
   -0.02141,
   0.0069
  ]
 },
 {
  "id": 48,
  "num": "#48",
  "name": "surprise",
  "base": "surprise",
  "family": "surprise",
  "a": "#86C85D",
  "b": "#67C2D7",
  "voice": "i’m the spark before you know whether to laugh or worry.",
  "note": "i make room for something you didn’t plan.",
  "prompts": [
   "what surprised you recently, and what did it change?",
   "what did you not plan for that turned out well?",
   "what would you make room for if you expected less?"
  ],
  "pal": [
   "#86C85D",
   "#67C2D7",
   "#D49E35",
   "#E35122"
  ],
  "c": "#D49E35",
  "numOff": [
   -0.01312,
   0.0069
  ]
 }
];
