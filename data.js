/* Doorways deck · 48 cards. Card text comes from Doorways-Final.ai; prompts are short plain questions
   (drafts by Claude, the older ones are in tools/prompts-before-simple.json), edit freely. pal = the card's own gradient palette (k-means on the printed
   number side, largest first); a/b/c are its first three.
   numOff = how far the printed number sits from the centre of its wave shape (card uv);
   the AR card shifts it by this so the number is centred. similar (3 close feelings) and about (one plain line) are drafts by Claude, edit freely.
   base = one of the 8 base emotions (Plutchik, love replacing anticipation). */
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
   "when did you last laugh out loud?",
   "what made you smile today?",
   "who makes you feel happy?"
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
  ],
  "similar": [
   "contentment",
   "playfulness",
   "excitement"
  ],
  "about": "feeling good and glad. you might feel it when things go well or you are with people you like."
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
   "where do you feel calm?",
   "what helps you relax?",
   "when did you last feel at peace?"
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
  ],
  "similar": [
   "contentment",
   "relief",
   "acceptance"
  ],
  "about": "feeling calm and still inside. you might feel it when nothing is worrying you."
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
   "what in your life feels like enough?",
   "what would you not change right now?",
   "what is going well for you?"
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
  ],
  "similar": [
   "peace",
   "gratitude",
   "happiness"
  ],
  "about": "feeling that what you have is enough. you might feel it on a quiet, ordinary good day."
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
   "what are you looking forward to?",
   "what gets you excited lately?",
   "what are you counting down to?"
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
  ],
  "similar": [
   "curiosity",
   "hope",
   "playfulness"
  ],
  "about": "feeling full of energy about something good. you might feel it before a trip, a party or a new start."
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
   "what do you do just for fun?",
   "what did you love to play as a child?",
   "when did you last feel silly?"
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
  ],
  "similar": [
   "happiness",
   "curiosity",
   "excitement"
  ],
  "about": "wanting to have fun and be a little silly. you might feel it when you play, joke or try something just for fun."
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
   "what are you hoping for?",
   "what gives you hope?",
   "what good thing might be coming?"
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
  ],
  "similar": [
   "courage",
   "longing",
   "excitement"
  ],
  "about": "believing that something good can still happen. you might feel it when you are waiting for things to get better."
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
   "what are you good at?",
   "when did you last feel sure of yourself?",
   "what helps you feel confident?"
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
  ],
  "similar": [
   "courage",
   "pride",
   "trust"
  ],
  "about": "believing in yourself. you might feel it when you know you can do something."
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
   "what are you proud of?",
   "what have you done that was hard?",
   "what did you do well this week?"
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
  ],
  "similar": [
   "confidence",
   "happiness",
   "admiration"
  ],
  "about": "feeling good about something you did. you might feel it after working hard or doing something difficult."
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
   "what are you relieved about?",
   "what worry has passed?",
   "what did you finally let go of?"
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
  ],
  "similar": [
   "peace",
   "gratitude",
   "happiness"
  ],
  "about": "the feeling when a worry goes away. you might feel it when something you feared turns out fine."
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
   "what are you thankful for today?",
   "who would you like to thank?",
   "what small thing made your day better?"
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
  ],
  "similar": [
   "love",
   "contentment",
   "relief"
  ],
  "about": "feeling thankful. you might feel it when someone helps you or when you notice the good things you have."
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
   "who do you love?",
   "how do you show love?",
   "who makes you feel loved?"
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
  ],
  "similar": [
   "tenderness",
   "compassion",
   "belonging"
  ],
  "about": "caring deeply about someone. you might feel it for family, friends, a partner or a pet."
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
   "who do you feel gentle with?",
   "what made you feel soft lately?",
   "how can you be kind to yourself today?"
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
  ],
  "similar": [
   "love",
   "compassion",
   "vulnerability"
  ],
  "about": "a gentle, soft kind of care. you might feel it holding a baby, comforting a friend or looking after something small."
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
   "who do you trust?",
   "what makes you trust someone?",
   "who can you tell anything to?"
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
  ],
  "similar": [
   "belonging",
   "acceptance",
   "confidence"
  ],
  "about": "feeling you can count on someone. you might feel it with people who keep their word."
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
   "where do you feel at home?",
   "who lets you be yourself?",
   "where do you fit in?"
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
  ],
  "similar": [
   "trust",
   "love",
   "acceptance"
  ],
  "about": "feeling that you are part of a group. you might feel it with family, friends or a team that welcomes you."
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
   "who needs some kindness right now?",
   "how can you be kind to yourself today?",
   "when did someone care for you?"
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
  ],
  "similar": [
   "tenderness",
   "love",
   "acceptance"
  ],
  "about": "feeling for someone who is hurting and wanting to help. you might feel it when you see someone sad or in pain."
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
   "who do you look up to?",
   "what do you admire in someone?",
   "who inspires you?"
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
  ],
  "similar": [
   "awe",
   "gratitude",
   "envy"
  ],
  "about": "looking up to someone for what they do or who they are. you might feel it when someone does something you find great."
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
   "what amazed you recently?",
   "where do you feel small in a good way?",
   "what is the most beautiful thing you’ve seen?"
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
  ],
  "similar": [
   "surprise",
   "admiration",
   "curiosity"
  ],
  "about": "feeling amazed by something big or beautiful. you might feel it looking at the sea, the stars or great art."
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
   "what do you want to learn?",
   "what are you wondering about?",
   "what would you like to try?"
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
  ],
  "similar": [
   "awe",
   "excitement",
   "playfulness"
  ],
  "about": "wanting to know or find out more. you might feel it when something is new, strange or interesting."
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
   "what memory do you miss?",
   "what song takes you back?",
   "what did you love as a child?"
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
  ],
  "similar": [
   "longing",
   "sadness",
   "gratitude"
  ],
  "about": "missing a happy time from the past. you might feel it with an old song, photo or smell."
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
   "what can you not change?",
   "what are you learning to accept?",
   "what would you let be today?"
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
  ],
  "similar": [
   "peace",
   "compassion",
   "trust"
  ],
  "about": "letting something be as it is. you might feel it when you stop fighting something you cannot change."
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
   "what scares you that you want to do?",
   "when were you brave?",
   "what small brave step can you take?"
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
  ],
  "similar": [
   "confidence",
   "hope",
   "vulnerability"
  ],
  "about": "doing something even though you are scared. you might feel it when you speak up or try something new."
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
   "what makes you sad right now?",
   "what do you miss?",
   "what do you need when you are sad?"
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
  ],
  "similar": [
   "grief",
   "disappointment",
   "loneliness"
  ],
  "about": "feeling low or unhappy. you might feel it when you lose something or things don’t go the way you hoped."
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
   "who or what do you miss?",
   "what would you say to them?",
   "what do you remember most?"
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
  ],
  "similar": [
   "sadness",
   "longing",
   "numbness"
  ],
  "about": "deep sadness after losing someone or something important. it can last a long time and come in waves."
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
   "when do you feel lonely?",
   "who would you like to talk to?",
   "who could you reach out to today?"
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
  ],
  "similar": [
   "longing",
   "sadness",
   "insecurity"
  ],
  "about": "feeling alone or not close to anyone. you can feel it even when there are people around you."
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
   "what didn’t go the way you hoped?",
   "what did you want to happen?",
   "what can you try next?"
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
  ],
  "similar": [
   "sadness",
   "frustration",
   "hurt"
  ],
  "about": "feeling let down when something doesn’t happen the way you hoped."
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
   "what hurt you recently?",
   "what do you wish someone had said?",
   "what would help you feel better?"
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
  ],
  "similar": [
   "sadness",
   "resentment",
   "vulnerability"
  ],
  "about": "feeling pain because of what someone said or did. you might feel it when someone is unkind to you."
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
   "what do you long for?",
   "who or what do you wish was closer?",
   "what are you waiting for?"
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
  ],
  "similar": [
   "nostalgia",
   "hope",
   "loneliness"
  ],
  "about": "wanting someone or something that is far away. you might feel it when you miss a person or a place."
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
   "what is making you tired?",
   "what could you stop doing for a day?",
   "what helps you rest?"
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
  ],
  "similar": [
   "numbness",
   "overwhelm",
   "sadness"
  ],
  "about": "feeling very, very tired, in your body or your mind. rest doesn’t always fix it right away."
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
   "what have you stopped feeling?",
   "when did you last feel something strongly?",
   "what small thing still makes you feel?"
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
  ],
  "similar": [
   "exhaustion",
   "boredom",
   "grief"
  ],
  "about": "not feeling much at all. it can happen after a lot of stress or sadness."
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
   "what are you afraid of?",
   "what would help you feel safe?",
   "what would you do if you weren’t scared?"
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
  ],
  "similar": [
   "anxiety",
   "helplessness",
   "vulnerability"
  ],
  "about": "feeling scared that something bad might happen. your body may tense up or your heart may beat fast."
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
   "what are you worried about?",
   "what can you control right now?",
   "what helps you calm down?"
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
  ],
  "similar": [
   "fear",
   "overwhelm",
   "restlessness"
  ],
  "about": "worrying about what might happen. you might feel it in your body as a tight chest or a busy mind."
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
   "what feels like too much?",
   "what can wait until tomorrow?",
   "what is one small thing to do next?"
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
  ],
  "similar": [
   "anxiety",
   "exhaustion",
   "helplessness"
  ],
  "about": "feeling that there is too much to handle at once. you might feel it when you have too many things to do."
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
   "when do you feel not good enough?",
   "what do you like about yourself?",
   "what would your best friend say about you?"
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
  ],
  "similar": [
   "embarrassment",
   "shame",
   "envy"
  ],
  "about": "feeling unsure of yourself, or not good enough. you might feel it when you compare yourself to others."
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
   "what is hard for you to share?",
   "who do you feel safe with?",
   "when did you let someone see the real you?"
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
  ],
  "similar": [
   "courage",
   "tenderness",
   "fear"
  ],
  "about": "feeling open and unprotected. you might feel it when you share something personal or ask for help."
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
   "what can’t you change right now?",
   "what is still in your hands?",
   "who could you ask for help?"
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
  ],
  "similar": [
   "overwhelm",
   "fear",
   "frustration"
  ],
  "about": "feeling there is nothing you can do to change a situation. you might feel it when things are out of your control."
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
   "what made you angry recently?",
   "what do you want to say?",
   "what is under your anger?"
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
  ],
  "similar": [
   "frustration",
   "resentment",
   "hurt"
  ],
  "about": "feeling mad when something seems wrong or unfair. your body may feel hot or tense."
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
   "what is frustrating you?",
   "what keeps going wrong?",
   "what could you try differently?"
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
  ],
  "similar": [
   "anger",
   "restlessness",
   "disappointment"
  ],
  "about": "feeling annoyed when something keeps getting in your way. you might feel it when things don’t work."
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
   "what are you still upset about?",
   "who do you need to talk to?",
   "what would help you let go?"
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
  ],
  "similar": [
   "anger",
   "hurt",
   "jealousy"
  ],
  "about": "staying angry about something that happened before. you might feel it when you were treated unfairly."
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
   "who or what are you afraid of losing?",
   "what makes you feel jealous?",
   "what would help you feel secure?"
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
  ],
  "similar": [
   "envy",
   "insecurity",
   "resentment"
  ],
  "about": "being afraid someone will take what you have, like a friend’s attention."
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
   "who do you envy?",
   "what do they have that you want?",
   "what is one step toward it?"
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
  ],
  "similar": [
   "jealousy",
   "admiration",
   "insecurity"
  ],
  "about": "wanting something that someone else has. you might feel it when someone gets what you wish for."
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
   "what do you not want in your life?",
   "what feels wrong to you?",
   "where do you need to say no?"
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
  ],
  "similar": [
   "shame",
   "resentment",
   "anger"
  ],
  "about": "a strong feeling of not liking something and wanting to pull away. it can be about food, smells or how people act."
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
   "what do you feel bad about?",
   "what could you do to make it right?",
   "what would help you forgive yourself?"
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
  ],
  "similar": [
   "shame",
   "embarrassment",
   "compassion"
  ],
  "about": "feeling bad about something you did. you might feel it when you hurt someone or broke a promise."
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
   "what are you hiding?",
   "what would you tell a friend who felt this way?",
   "what is good about you?"
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
  ],
  "similar": [
   "guilt",
   "embarrassment",
   "insecurity"
  ],
  "about": "feeling bad about who you are, not just what you did. it can make you want to hide."
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
   "what moment still makes you cringe?",
   "can you laugh about it now?",
   "what would you tell a friend in your place?"
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
  ],
  "similar": [
   "shame",
   "insecurity",
   "guilt"
  ],
  "about": "feeling awkward when others see a mistake you made. your face may get hot or red."
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
   "what bores you right now?",
   "what would you rather be doing?",
   "what is something new you could try?"
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
  ],
  "similar": [
   "restlessness",
   "numbness",
   "curiosity"
  ],
  "about": "feeling that nothing is interesting. you might feel it when you have nothing to do, or don’t want to do what you have to."
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
   "what do you want to change?",
   "what is making you restless?",
   "where would you go right now if you could?"
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
  ],
  "similar": [
   "boredom",
   "anxiety",
   "frustration"
  ],
  "about": "not being able to settle or sit still. you might feel you want something to change."
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
   "what are you unsure about?",
   "what do you already know?",
   "who could help you understand?"
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
  ],
  "similar": [
   "overwhelm",
   "surprise",
   "anxiety"
  ],
  "about": "not understanding what is going on. you might feel it when things don’t make sense yet."
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
   "what surprised you recently?",
   "what happened that you didn’t expect?",
   "what good surprise would you like?"
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
  ],
  "similar": [
   "awe",
   "confusion",
   "excitement"
  ],
  "about": "the feeling when something unexpected happens. it can be a good surprise or a bad one."
 }
];
