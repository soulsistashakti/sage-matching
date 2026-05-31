import { useState, useEffect } from "react";

const TIERS = [
  { id:"seed", symbol:"◌", name:"Seed", tagline:"Take root.", price:"Free", priceDetail:"Always free", color:"#A0522D",
    description:"Begin here. Seed is an open, warm community of people living plant-based lives — sharing meals, ideas, and the path toward readiness. No matching yet. Just belonging.",
    features:["Full access to The Garden Path curriculum","Community forums & local events","Plant-based lifestyle resources","Monthly live Q&A with Sage educators","Readiness self-assessments"],
    cta:"Join Free", ctaStyle:"outline", philosophy:'"Not every seed blooms in the same season."' },
  { id:"sage", symbol:"◎", name:"Sage", tagline:"Meet when you're ready.", price:"$38", priceDetail:"per curated date at a partner vegan venue", color:"#A0522D", badge:"The Heart of Sage",
    description:"When you've walked the Garden Path and feel genuinely ready, we arrange one thoughtful, curated date at a partner vegan venue in your city. No swiping. No rushing. One real opportunity.",
    features:["One curated date at a partner vegan venue","Values-deep matching by our team","Pre-date preparation guide","Venue chosen for your shared aesthetic","Post-date reflection support","You decide the pace, always"],
    cta:"Begin the Path", ctaStyle:"fill", philosophy:'"$38 for a date prepared with intention. Take all the time you need to get there."' },
  { id:"grove", symbol:"◈", name:"Grove", tagline:"The rarest kind of care.", price:"$150", priceDetail:"per curated date · invitation only", color:"#A0522D", badge:"Invitation Only",
    description:"A deeply private, human-led experience. Your dedicated relationship advisor walks with you through the Garden Path and, when the moment is right, arranges a single extraordinary match.",
    features:["Dedicated human relationship advisor","One extraordinary curated date","Private, invisible profile","Exclusive Grove partner venues","Extended readiness journey — no rushing","Identity-verified members only","Post-match continued guidance"],
    cta:"Request Invitation", ctaStyle:"outline-gold", philosophy:'"Some connections are worth waiting for."' },
];

const STONES = [
  { id:"knowing", num:"01", name:"Knowing Yourself", symbol:"◌", tagline:"What's actually here.",
    body:"Most people arrive at a first date carrying a story they've never examined. Before anything else, we ask you to look. Not to fix or improve — just to see. Your values, your patterns, the things you reach for and the things you avoid. This is the ground beneath everything that follows.",
    teaching:`There is a version of you that was here before the opinions arrived. Before the conclusions you drew about yourself from what others said or didn't say. Before the habits you built to manage the discomfort of not knowing who you were.

That version hasn't gone anywhere.

Most of us move through our lives carrying a self-concept we inherited rather than discovered. We mistake our defenses for our character, our preferences for our values, our fears for our nature. We arrive at relationships not as ourselves but as a very practiced performance of ourselves.

This stone is not about self-improvement. It is not a personality quiz. It is an invitation to stop performing — even for a moment — and notice what's underneath.

The Field Practice framework calls this your native innocence: the ground-state of who you are before the accumulated conclusions took over. You don't have to excavate it dramatically. You just have to stop covering it.

Sit with what's here. Not what should be here. Not what you wish were here. What is actually, quietly, already here.

And here is the thing nobody says out loud: the person you are looking for is also looking. They exist — because you exist. You are not imagining a category of person that has no members. You are that person for someone else. Which means the search is not a fantasy. It is a direction.`,
    koans:[
      { q:"You exist — thoughtful, real, worth knowing. So why wouldn't they?", hint:"Not a trick. Just the obvious thing we forget." },
      { q:"What do you love that you've never been asked about?", hint:"Not what you do. What you love." },
      { q:"What part of yourself have you been waiting for someone else to see?", hint:"Take your time. This one knows things." },
      { q:"If you described your ideal person honestly — wouldn't they also be looking for someone exactly like you?", hint:"Sit with the logic of that for a moment." },
    ],
    walkText:"When you feel complete — go for a walk. Let what you've seen settle into your body, not your head.",
    btnText:"I see myself clearly", timeNote:"Most people spend 3–5 days here",
    cx:280, cy:108 },

  { id:"logic", num:"02", name:"The Logic of Love", symbol:"◎", tagline:"Thinking well about feeling deeply.",
    body:"Desire is not the problem. Unexamined assumptions are. We look at the places where the thinking mind constructs a story faster than reality can provide one — projection, conclusion-jumping, the gap between what someone does and what we decide it means. Clear thinking isn't cold. It's kind.",
    teaching:`The mind is a meaning-making machine. It will construct a complete narrative about another person from almost nothing — a delayed text, a tone of voice, the way they ordered their coffee. And once it has its conclusion, it will defend that conclusion as if it were fact.

This is not a flaw. It is how the mind protects us. But in intimate connection, this protective speed becomes a liability. We stop seeing the person in front of us and begin responding to the story we've built about them.

The philosopher's term for this is a faulty syllogism: a conclusion that follows logically from premises that were never examined. He didn't call when he said he would. People who care show up. Therefore he doesn't care. The logic seems airtight. But the middle premise — people who care always show up on time — was never questioned. It was assumed.

Clear thinking in love is not about being cold or analytical. It is about being honest enough to ask: is this what I see, or is this what I fear? Is this who they are, or is this who I've decided they are?

Compassion begins here. Not as a feeling — as a discipline. The discipline of not collapsing the space between what happened and what it means.

And here is the harder truth: most of the stories we tell about why love hasn't worked are built from the same unexamined premises. They're all unavailable. Nobody serious is out there. I always attract the wrong person. These feel like observations. They are conclusions masquerading as evidence.`,
    koans:[
      { q:"What conclusion have you already reached about the person you haven't met yet?", hint:"Notice how specific that conclusion is. Where did it come from?" },
      { q:"If your assumption about love were wrong — what would you have to feel?", hint:"The feeling underneath the conclusion is the real information." },
      { q:"What's the difference between a pattern you've noticed and a rule you've decided?", hint:"One is data. The other is a prison." },
      { q:"Who told you this is how it goes — and did they know?", hint:"Not accusatory. Genuinely curious." },
    ],
    walkText:"Go for a walk. Notice when your mind tries to explain something. You don't have to explain anything right now.",
    btnText:"I think more clearly now", timeNote:"Most people spend 5–7 days here",
    cx:220, cy:295 },

  { id:"patience", num:"03", name:"Patience as Practice", symbol:"◇", tagline:"Moving slowly on purpose.",
    body:"This culture treats urgency as virtue. Sage doesn't. Patience here is not waiting passively — it's an active releasing of the grip. The mind that wants to rush toward certainty is the same mind that misreads people. We sit with not knowing. We let things take the time they take.",
    teaching:`We live inside a speed that was not designed for intimacy.

Everything about modern life trains us toward instant resolution — swipe, match, meet, decide. The discomfort of not knowing is treated as a problem to be solved rather than a space to be inhabited. And so we rush. We force conclusions before they're ready. We mistake momentum for progress.

Patience is not the same as waiting. Waiting is passive — you are enduring until something changes. Patience is active — you are choosing, in each moment, not to collapse the space that connection requires in order to grow.

In Transcendental Meditation, the instruction is simple: do not force the mantra. You do not grip it. You do not try harder when the mind wanders. You return, effortlessly, without judgment. The same principle governs readiness for love. You cannot force yourself into openness. You can only release the things that are keeping you closed.

The clutching mind — the one that wants certainty, that wants to know now, that wants to lock things down before they've had time to become what they are — that mind is not your enemy. It is just afraid. And it has been moving very fast for a very long time. This stone is an invitation to let it rest.`,
    koans:[
      { q:"What are you rushing toward — and what are you actually running from?", hint:"These are often the same destination, approached from opposite directions." },
      { q:"What has slowness ever cost you that speed actually gave back?", hint:"Take your time answering this one. Appropriately." },
      { q:"If the right person arrived tomorrow, would you have been ready today?", hint:"Not a trick. A genuine question about what readiness actually requires." },
      { q:"What would you do with yourself if you stopped being in a hurry to be found?", hint:"This might be the most important question on this stone." },
    ],
    walkText:"Go for a walk with nowhere to be. Let slowness be the whole point.",
    btnText:"I have released the grip", timeNote:"Most people spend 1–2 weeks here",
    cx:340, cy:475 },

  { id:"mindful", num:"04", name:"Mindful Perspective", symbol:"◈", tagline:"Seeing clearly before the door opens.",
    body:"You have done the inner work. Now — just before you meet someone — we ask you to set it all down. Not your values or your clarity, but the effort. The trying. What arises when the clutching mind releases is not produced by thinking. It comes from somewhere quieter.",
    teaching:`There is a state the Vedic tradition calls cosmic consciousness — not an achievement, not a destination, but a natural stabilization that comes when inner silence has been sufficiently cultivated. In this state, you are fully yourself and fully awake to what is outside you simultaneously. The inner does not contract when the outer arrives. The outer does not overwhelm the inner.

This is what you are preparing for.

Not a date. Not a conversation. The capacity to actually see another human being — clearly, without projection, without the noise of your own unfinished business obscuring who they actually are.

Most of what we call attraction is recognition of the familiar — even when the familiar is harmful. We see in others the shape of our own unresolved patterns and we call it chemistry. True perspective is rarer. It requires that you have done enough of your own work that you can actually perceive someone else.

You don't produce this state. You make room for it. And in that room, something extraordinary becomes possible: you meet someone and you actually see them. And they, in turn, feel seen. That feeling — of being genuinely perceived — is what most people have been searching for their whole lives without quite knowing it.`,
    koans:[
      { q:"When you look at a stranger, who is looking?", hint:"Not what. Who." },
      { q:"What would you notice about another person if you weren't hoping for anything from them?", hint:"That freedom of attention is what this stone is training." },
      { q:"Is the version of you that gave up on love the same one that would recognize it if it arrived?", hint:"Consider this carefully. The answer matters." },
      { q:"If you set down everything you know about love — what remains?", hint:"Stay here for a while." },
    ],
    walkText:"Go for a walk. Set everything down. Don't look for anything. Just walk.",
    btnText:"I am present and open", timeNote:"Most people spend 3–5 days here",
    cx:220, cy:660 },

  { id:"blooming", num:"05", name:"Blooming", symbol:"✦", tagline:"Readiness as a natural arising.",
    body:"Blooming is not an achievement. It is what happens when the conditions are right. You will know it not because you decided you were ready, but because something in you has quietly opened. This is where this path ends — and where Sage begins to work on your behalf.",
    teaching:`A seed does not decide to bloom.

It doesn't set an intention. It doesn't make a plan. It doesn't push through the soil by willpower or follow a course. It blooms because the conditions — warmth, water, light, time — have made it possible. Because something inside it has quietly matured to the point where opening is simply what happens next.

You have walked four stones. You have looked at yourself without turning away. You have examined the stories your mind tells without immediately believing them. You have practiced the kind of patience that does not collapse under its own weight. You have begun to see clearly — not with effort, but with the ease that comes when effort is no longer needed.

What happens now is not something you produce.

There will be a moment — you may not even be able to identify it precisely — when the question of whether you are ready simply stops being a question. Not because you answered it. Because something quieter than thought has already answered it for you.

That is this stone.

Not a finish line. A flowering. The difference is everything: finish lines are conquered, flowerings are received.

You walked this path. The path walked you back. Sage will take it from here.`,
    koans:[
      { q:"Who decided you were not yet ready — and when did you agree with them?", hint:"You don't have to keep that agreement." },
      { q:"What bloomed in you on this path that you did not plant?", hint:"Notice it. Name it if you can." },
      { q:"If the person you're looking for could see you right now — what would they see?", hint:"Answer honestly. They deserve your honesty and so do you." },
      { q:"Before the first thought of love — what was there?", hint:"You don't have to answer this one. Just carry it." },
    ],
    walkText:"You are ready. We'll take it from here.",
    btnText:"I am ready to bloom", timeNote:"",
    cx:280, cy:855, final:true },
];


const PARABLES = {
  knowing: [
    "There is a teaching in the Brihadaranyaka Upanishad about a student who asks his teacher: how do I know that consciousness exists? The teacher lights a lamp. What do you see? Light, says the student. And what sees the light? The student is quiet for a long time. The thing that sees cannot be seen — but its existence is proven by the fact that seeing happens at all. You are the lamp that proves the light. The one you are looking for is looking by the same light.",
    "In the court of Harun al-Rashid there was a musician who played only for himself, late at night, when the palace was quiet. One night a woman passing the courtyard stopped and listened without his knowing. When he finished she said: that is the most beautiful thing I have ever heard. He asked how she had found him. She said: I heard something that sounded like it wasn’t meant for anyone. Those are always the truest things. I followed it here.",
    "Nasreddin once walked into the village square carrying a lantern in broad daylight. What are you looking for, Nasreddin? He said: myself. You won’t find yourself out here, they said. He said: I know. But I got tired of looking in the dark alone. I thought if I brought a light, someone might help me look.",
    "In the Vedic tradition there is a teaching called Indra’s Net. An infinite net stretching in all directions. At every node where the threads cross, there hangs a jewel. Each jewel reflects every other jewel. When you polish one jewel — when you become more clearly yourself — every other jewel in the net reflects that clarification. The one you are looking for is already in the net. The question is only whether you have polished the surface enough to see it.",
  ],
  logic: [
    "A fox once looked up at a cluster of grapes hanging high on a vine. He jumped. He could not reach them. He jumped again. Still too high. He walked away and told everyone he met: those grapes are sour. No one asked him how he knew. He had not tasted them. He had only failed to reach them. The conclusion arrived to protect him from the trying. It was not about the grapes at all.",
    "A student came to a Zen master and said: I have decided that people cannot be trusted. The master poured him tea until the cup overflowed. The student cried out. The master said: you came here full. There is no room for anything new. The student asked: what do I do? The master said: first, notice that you are holding the cup.",
    "A merchant’s cart lost a wheel on the same road three times in one year. He declared the road cursed and refused to travel it again. His competitor took the road every week without incident. The merchant grew poor waiting for a different road. The wheel had been loose all along. The road had nothing to do with it. We name the place where the pain happened. We do not always name the thing we carried there.",
    "In the Arabian Nights there is a story of a young man who was told by his father: the sea is not for our family. We are not sea people. The young man believed this for forty years. When his father died he found in his belongings a captain’s log. His father had sailed every ocean before he was born. He had simply been afraid his son would love it more than he loved him.",
  ],
  patience: [
    "Rumi tells of a chickpea boiling in a pot. It keeps trying to jump out. The cook keeps pushing it back down. Finally the chickpea cries out: why are you doing this to me? The cook says: I am not punishing you. I am making you into something that can nourish another person. The chickpea stops fighting the water. This is not a story about suffering. It is a story about what rushing costs.",
    "In the Mahabharata, Yudhishthira walks toward heaven and refuses to hurry even when the others run ahead. One by one they fall. He continues at the same pace. When he arrives he is the only one who makes it. The gatekeeper says: speed was the test. You passed by ignoring it. Yudhishthira says: I was not ignoring it. I simply had nowhere to hurry to. I was already going where I was going.",
    "A monk spent twenty years preparing his monastery for an important visitor. He swept the floors, arranged the flowers, perfected the tea ceremony. The visitor arrived on a day the monk had gone to market. A student received the guest. Afterward the visitor said: that was the finest reception I have ever received. The monk understood then that he had been preparing for a performance. The student had simply been present.",
    "There is a Lakota teaching: the soul travels at the pace of a slow walk. When we move too fast, we arrive somewhere our soul has not yet reached. We stand in a place feeling nothing because we are not yet there. Slow down, the elders said, not because the destination is far. But so that you arrive whole.",
  ],
  mindful: [
    "In the Chandogya Upanishad, a father tells his son: look at that river. Taste the water from the middle. Now taste from the edge. Is there a difference? No, says the son. The father says: you are like that water. Wherever you look from, you are the same one looking. That sameness — that is what you are. Tat tvam asi. That thou art.",
    "A dervish was known for seeing into people. A merchant asked: how do you do it? The dervish said: I stopped wanting anything from them. The merchant said: but then what do you get? The dervish said: everything. When you want nothing, you can finally see what is actually there.",
    "In a past life, the Bodhisattva was a gardener who had tended a garden for so long without flowers that he stopped looking up. One morning a student came running: the garden is full of blossoms. It had bloomed three days ago. He had walked past it every morning looking at the ground. The version of us that has stopped expecting anything is not always the best guide to what is already arriving.",
    "A student asked: what is love? The master said: put down everything you know about it first. He put down the disappointments, the theories, the stories. When he had put down everything, he looked up. The master said: now. What do you notice? The student looked around as if seeing it for the first time. He said: it is very quiet in here. The master said: yes. That is where it lives.",
  ],
  blooming: [
    "In the Arabian Nights there is a story of a prince who was told by a sorcerer that he could not claim his kingdom until he found a blue rose. He spent thirty years searching. On the last day of his life an old woman handed him a white rose and said: I have been offering you this since the beginning. He said: but it is not blue. She said: it never was. The sorcerer told you that so you would keep searching instead of ruling. The prince held the rose. It was exactly what he had needed all along.",
    "The Vedic teachers spoke of something called the Self that was not built but revealed. Like a sculptor who does not create the figure but removes the stone around it. You did not grow what bloomed on this path. You removed what was covering it. This is the oldest definition of readiness: not the addition of something new, but the clearing away of what was never yours to carry.",
    "Rumi writes: out beyond ideas of wrongdoing and rightdoing, there is a field. I’ll meet you there. That field is not a place. It is a state of being — what remains when you have set down the performance of yourself. The one you are looking for is not looking for your performance. They are looking for the one who shows up in that field. That person is already here. They are reading this.",
    "The Mandukya Upanishad speaks of turiya — the fourth state, beyond waking, dreaming, and deep sleep. It is not a state you enter. It is the ground in which all other states arise. Before the first thought of love, before the first hope or fear — that ground was there. It is still there. It has never been absent. Blooming is not an arrival. It is a recognition of what was always already the case.",
  ],
};

const PROFILES = [
  { id:1, name:"Sasha", age:31, location:"Brooklyn, NY", bio:"Fermentation nerd, rooftop gardener. Looking for someone who appreciates slowness as much as I do.", values:["Zero Waste","Patience","Activism"], emoji:"🌿", tier:"sage" },
  { id:2, name:"Oren", age:34, location:"Portland, OR", bio:"Chef and food justice organizer. I cook for large groups on Sundays. I believe in long tables and long conversations.", values:["Food Justice","Community","Depth"], emoji:"🍃", tier:"grove" },
  { id:3, name:"Mira", age:28, location:"Austin, TX", bio:"Yoga teacher and herbalist. I want a partner who takes their ethics as seriously as their pleasure.", values:["Holistic Health","Ethics","Presence"], emoji:"☘️", tier:"sage" },
  { id:4, name:"Dax", age:36, location:"Chicago, IL", bio:"Environmental attorney. Recently perfected a sourdough focaccia that will make you question everything.", values:["Environment","Slow Living","Curiosity"], emoji:"🌱", tier:"grove" },
];

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Nunito:wght@400;600;700;800&family=Jost:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
.sage-root{background:#FAF0EE;color:#3A1A10;font-family:'Nunito',sans-serif;font-weight:400;min-height:100vh;overflow-x:hidden;}
.grain{position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:256px;}

/* NAV */
nav{display:flex;justify-content:space-between;align-items:center;padding:22px 48px;position:sticky;top:0;z-index:200;background:rgba(240,235,225,0.95);backdrop-filter:blur(16px);border-bottom:1px solid rgba(10,26,14,0.1);}
.logo{font-family:'Cormorant Garamond',serif;font-size:22px;letter-spacing:0.14em;color:#1A4828;font-weight:600;cursor:pointer;}
.nav-r{display:flex;gap:8px;align-items:center;}
.nbtn{background:none;border:1px solid rgba(45,102,64,0.5);color:#2D6640;padding:8px 16px;border-radius:1px;font-family:'Nunito',sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;transition:all .2s;font-weight:700;}
.nbtn:hover{background:rgba(45,102,64,0.08);}
.nbtn.active{border-color:rgba(45,102,64,0.9);color:#1A4828;background:rgba(45,102,64,0.1);}

/* SHARED */
.divider{height:1px;background:linear-gradient(90deg,transparent,rgba(45,102,64,.2),transparent);margin:0 48px;position:relative;}
.botanical-divider{display:flex;justify-content:center;align-items:center;padding:8px 48px;}
.sec{padding:90px 48px;}
.sec-ey{font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#2D6640;margin-bottom:18px;font-family:'Nunito',sans-serif;font-weight:800;}
.sec-h{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,4vw,54px);font-weight:300;color:#3A1A10;line-height:1.06;}
.sec-h em{font-style:italic;color:#2D6640;}
.btn-fill{background:#2D6640;color:#F2EDE4;border:none;padding:13px 34px;border-radius:1px;font-family:'Nunito',sans-serif;font-size:11px;letter-spacing:.13em;text-transform:uppercase;cursor:pointer;transition:all .25s;font-weight:800;}
.btn-fill:hover{background:#1A4828;transform:translateY(-2px);}
.btn-ghost{background:none;color:#2D6640;border:2px solid #2D6640;padding:13px 26px;border-radius:1px;font-family:'Nunito',sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:all .25s;font-weight:700;}
.btn-ghost:hover{background:#2D6640;color:#F2EDE4;}

/* BOTANICALS */
.botanical{position:absolute;opacity:0.12;pointer-events:none;}
.botanical-hero-tl{top:60px;left:20px;width:180px;transform:rotate(-15deg);}
.botanical-hero-br{bottom:40px;right:20px;width:140px;transform:rotate(165deg);}
.botanical-section{width:120px;opacity:0.09;}

/* HERO */
.hero{min-height:92vh;display:flex;align-items:center;padding:80px 48px;position:relative;overflow:hidden;}
.hero-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 55% 70% at 58% 40%,rgba(210,120,110,0.22) 0%,transparent 65%),radial-gradient(ellipse 28% 42% at 8% 88%,rgba(200,105,95,0.18) 0%,transparent 55%);}
.hero-content{position:relative;max-width:620px;}
.eyebrow{font-size:10px;letter-spacing:0.26em;text-transform:uppercase;color:#2D6640;margin-bottom:28px;display:flex;align-items:center;gap:14px;font-family:'Nunito',sans-serif;font-weight:800;}
.eyebrow::before{content:'';display:block;width:28px;height:1px;background:#2D6640;opacity:.6;}
h1.hero-h{font-family:'Cormorant Garamond',serif;font-size:clamp(50px,7vw,96px);line-height:.94;font-weight:300;color:#3A1A10;margin-bottom:28px;}
h1.hero-h em{font-style:italic;color:#2D6640;}
.hero-body{font-size:20px;line-height:1.72;color:#3A1A10;max-width:560px;margin-bottom:14px;font-weight:600;font-family:'Nunito',sans-serif;}
.hero-phil{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:28px;color:#2D6640;margin-bottom:46px;}
.hero-body{font-size:15px;line-height:1.88;color:#3A1A10;max-width:480px;margin-bottom:14px;font-weight:400;font-family:'Nunito',sans-serif;}
.hero-phil{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:#1A4828;margin-bottom:46px;}
.hero-cta{display:flex;gap:14px;flex-wrap:wrap;align-items:center;}
.hero-float{position:absolute;right:48px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:10px;}
.fc{background:rgba(255,255,255,.026);border:1px solid rgba(212,132,122,.1);border-radius:4px;padding:15px 18px;width:190px;backdrop-filter:blur(8px);animation:flt 4s ease-in-out infinite;}
.fc:nth-child(2){animation-delay:.9s;margin-left:18px;}
.fc:nth-child(3){animation-delay:1.8s;}
@keyframes flt{0%,100%{transform:translateY(0);}50%{transform:translateY(-7px);}}
.fc-name{font-family:'Cormorant Garamond',serif;font-size:14px;color:#3A1A10;margin-bottom:3px;}
.fc-loc{font-size:10px;color:#3A1A10;letter-spacing:.04em;}
.fc-tags{display:flex;gap:5px;margin-top:9px;flex-wrap:wrap;}
.fc-tag{font-size:9px;padding:2px 7px;border:1px solid rgba(45,102,64,.2);border-radius:1px;color:#2D6640;letter-spacing:.05em;}

/* MANIFESTO */
.manifesto{padding:72px 48px;background:linear-gradient(135deg,rgba(212,132,122,.18) 0%,rgba(45,102,64,.06) 100%);border-top:1px solid rgba(45,102,64,.1);border-bottom:1px solid rgba(45,102,64,.1);position:relative;overflow:hidden;}
.m-quote{font-family:'Cormorant Garamond',serif;font-size:clamp(20px,2.8vw,32px);line-height:1.45;font-weight:300;font-style:italic;color:#3A1A10;margin-bottom:18px;}
.m-attr{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#1A4828;font-weight:800;}

/* TIERS */
.tiers-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(10,26,14,.08);margin-top:56px;}
.tier-card{background:#FDFAF8;padding:44px 36px;position:relative;transition:background .3s;}
.tier-card:hover{background:rgba(255,255,255,.02);}
.tier-badge-pill{position:absolute;top:20px;right:20px;font-size:9px;letter-spacing:.12em;text-transform:uppercase;padding:3px 10px;border-radius:1px;}
.tier-sym{font-size:28px;margin-bottom:18px;display:block;}
.tier-name{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;margin-bottom:5px;}
.tier-tag{font-size:12px;color:#3A1A10;margin-bottom:22px;letter-spacing:.04em;font-family:'Nunito',sans-serif;font-weight:600;}
.tier-price{display:flex;align-items:baseline;gap:5px;margin-bottom:5px;flex-wrap:wrap;}
.tier-price-n{font-family:'Cormorant Garamond',serif;font-size:40px;font-weight:300;}
.tier-price-d{font-size:11px;color:#3A1A10;max-width:130px;line-height:1.5;}
.tier-line{height:1px;background:rgba(229,221,208,.07);margin:20px 0;}
.tier-desc{font-size:13px;line-height:1.82;color:#3A1A10;margin-bottom:24px;font-family:'Nunito',sans-serif;}
.tier-features{list-style:none;margin-bottom:28px;}
.tier-features li{font-size:12px;color:#3A1A10;padding:8px 0;border-bottom:1px solid rgba(229,221,208,.05);display:flex;align-items:flex-start;gap:9px;font-family:'Nunito',sans-serif;}
.tier-features li::before{content:'—';color:#2D6640;font-size:10px;flex-shrink:0;margin-top:2px;}
.tier-phil{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:13px;color:#3A1A10;margin-bottom:28px;line-height:1.7;}
.tcta{width:100%;padding:12px 0;border-radius:1px;font-family:'Nunito',sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:all .25s;font-weight:800;}
.tcta:hover{transform:translateY(-1px);}

/* STEPS */
.steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(10,26,14,.08);margin-top:56px;}
.step{background:#FDFAF8;padding:44px 36px;transition:background .3s;}
.step:hover{background:rgba(255,255,255,.02);}
.step-n{font-family:'Cormorant Garamond',serif;font-size:56px;font-weight:300;color:#2D6640;line-height:1;margin-bottom:18px;}
.step-t{font-family:'Cormorant Garamond',serif;font-size:20px;color:#2D6640;margin-bottom:10px;font-weight:400;}
.step-b{font-size:13px;line-height:1.8;color:#3A1A10;font-family:'Nunito',sans-serif;}

/* DEMO */
.demo-wrap{max-width:380px;margin:48px auto 0;}
.card-stage{position:relative;width:340px;height:520px;margin:0 auto 36px;}
.card-bg{position:absolute;width:326px;height:504px;left:7px;top:8px;background:rgba(255,248,245,.95);border:1px solid rgba(212,132,122,.15);border-radius:12px;}
.pcard{position:absolute;inset:0;background:linear-gradient(155deg,#FFF8F5 0%,#FDF5F0 100%);border:1px solid rgba(212,132,122,.16);border-radius:12px;padding:40px 34px;display:flex;flex-direction:column;text-align:left;transition:transform .38s cubic-bezier(.4,0,.2,1),opacity .38s;user-select:none;}
.pcard.sl{transform:translateX(-135%) rotate(-12deg);opacity:0;}
.pcard.sr{transform:translateX(135%) rotate(12deg);opacity:0;}
.p-dot{position:absolute;top:20px;right:20px;width:7px;height:7px;border-radius:50%;}
.p-emoji{font-size:46px;margin-bottom:22px;line-height:1;}
.p-name{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:300;color:#3A1A10;margin-bottom:3px;}
.p-meta{font-size:11px;color:#3A1A10;letter-spacing:.06em;margin-bottom:18px;}
.p-bio{font-size:13px;line-height:1.82;color:#3A1A10;margin-bottom:22px;flex:1;}
.p-tags{display:flex;gap:7px;flex-wrap:wrap;}
.p-tag{font-size:10px;padding:3px 10px;border:1px solid rgba(212,132,122,.2);border-radius:1px;color:#3A1A10;letter-spacing:.06em;}
.card-btns{display:flex;justify-content:center;gap:18px;margin-bottom:24px;}
.cbtn{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;transition:all .2s;border:none;}
.cbtn:hover{transform:scale(1.1);}
.cbtn.pass{background:rgba(229,221,208,.05);border:1px solid rgba(229,221,208,.1);}
.cbtn.like{background:rgba(212,132,122,.1);border:1px solid rgba(212,132,122,.22);}
.demo-hint{font-size:11px;color:#2D6640;letter-spacing:.08em;text-align:center;}

/* MATCH MODAL */
.moverlay{position:fixed;inset:0;z-index:500;background:rgba(9,22,14,.94);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(22px);}
.mmodal{text-align:center;padding:60px 48px;border:1px solid rgba(212,132,122,.17);border-radius:8px;background:rgba(25,58,36,.42);max-width:400px;width:90%;}
.m-glyph{font-size:50px;margin-bottom:18px;}
.m-title{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:300;color:#3A1A10;margin-bottom:9px;}
.m-sub{font-size:14px;line-height:1.8;color:#3A1A10;margin-bottom:14px;}
.m-note{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:13px;color:#3A1A10;margin-bottom:36px;}
.m-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;}
.m-fill{background:#D4847A;color:#09160E;border:none;padding:12px 32px;border-radius:1px;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:.13em;text-transform:uppercase;cursor:pointer;font-weight:500;}
.m-skip{background:none;border:1px solid rgba(229,221,208,.13);color:#3A1A10;padding:12px 22px;border-radius:1px;font-family:'Jost',sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;}

/* ═══ GARDEN PATH ════════════════════════════════════════════════════ */
.gp-page{min-height:100vh;}
.gp-header{padding:72px 48px 52px;position:relative;overflow:hidden;border-bottom:1px solid rgba(229,221,208,.04);}
.gp-header-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 45% 70% at 12% 50%,rgba(210,120,110,.2) 0%,transparent 60%);}
.gp-header-inner{position:relative;max-width:580px;}
.gp-h1{font-family:'Cormorant Garamond',serif;font-size:clamp(40px,6vw,76px);line-height:.95;font-weight:300;color:#3A1A10;margin-bottom:24px;}
.gp-h1 em{font-style:italic;color:#2D6640;}
.gp-sub{font-size:14px;line-height:1.9;color:#3A1A10;max-width:480px;margin-bottom:14px;font-weight:300;}
.gp-phil{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:14px;color:#2D6640;}
.gp-research{width:100%;max-width:800px;margin:0 auto 24px auto;padding:36px 48px;background:rgba(45,102,64,.05);border-left:3px solid #2D6640;border-radius:0 6px 6px 0;box-sizing:border-box;text-align:center;}
.gp-research-text{font-size:16px;line-height:2;color:#3A1A10;font-family:'Nunito',sans-serif;font-weight:500;margin-bottom:16px;}
.gp-research-attr{font-size:11px;letter-spacing:.08em;color:#2D6640;font-family:'Nunito',sans-serif;font-weight:700;margin-top:8px;margin-bottom:16px;}
.gp-walk-method{width:100%;max-width:800px;margin:0 auto 24px auto;padding:28px 48px;border-left:3px solid rgba(210,120,110,.4);background:rgba(210,120,110,.06);border-radius:0 6px 6px 0;box-sizing:border-box;text-align:center;}
.gp-walk-method-label{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#A0522D;font-family:'Nunito',sans-serif;font-weight:800;margin-bottom:10px;}
.gp-walk-method-text{font-size:14px;line-height:1.88;color:#3A1A10;font-family:'Nunito',sans-serif;font-weight:500;}
.gp-prog{display:flex;align-items:center;gap:16px;padding:24px 48px;}
.gp-prog-track{flex:1;height:2px;background:rgba(10,26,14,.08);border-radius:1px;overflow:hidden;}
.gp-prog-fill{height:100%;background:linear-gradient(90deg,#D4847A,#D4847A);border-radius:1px;transition:width .8s ease;}
.gp-prog-label{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#2D6640;white-space:nowrap;font-family:'Nunito',sans-serif;font-weight:800;}

/* DESKTOP two-col */
.gp-body{display:flex;padding:0 0 80px;}
.gp-path-col{flex-shrink:0;width:440px;padding:28px 12px 28px 48px;}
.gp-path-sticky{position:sticky;top:88px;}
.gp-detail-col{flex:1;padding:48px 48px 48px 40px;display:flex;flex-direction:column;background:#FDFAF8;}
.path-svg{width:100%;height:auto;display:block;}

/* Detail panel — light mode HIGH CONTRAST */
.gp-empty{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:17px;color:rgba(30,65,40,.45);line-height:1.8;margin-top:120px;text-align:center;}
.sd{animation:fadeUp .4s ease both;}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
.sd-num{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#2D6640;margin-bottom:10px;font-family:'Nunito',sans-serif;font-weight:800;}
.sd-name{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,3.5vw,46px);font-weight:300;color:#3A1A10;margin-bottom:6px;line-height:1.05;}
.sd-tagline{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;color:#2D6640;margin-bottom:24px;}
.sd-body{font-size:15px;line-height:1.88;color:#3A1A10;margin-bottom:28px;font-weight:700;font-family:'Nunito',sans-serif;}
.sd-teaching{margin-bottom:32px;border-left:3px solid rgba(40,107,64,.4);padding-left:20px;}
.sd-teaching-para{font-size:15px;line-height:1.88;color:#3A1A10;margin-bottom:16px;font-family:'Nunito',sans-serif;font-weight:600;}
.sd-teaching-para:last-child{margin-bottom:0;}
.sd-koans{margin-bottom:32px;padding:24px 0;border-top:2px solid rgba(40,107,64,.18);border-bottom:2px solid rgba(40,107,64,.18);}
.sd-koans-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:#2D6640;margin-bottom:20px;font-family:'Nunito',sans-serif;font-weight:800;}
.sd-koan{display:flex;gap:16px;align-items:flex-start;margin-bottom:6px;}
.sd-koan:last-child{margin-bottom:0;}
.sd-koan-num{font-size:10px;color:#2D6640;font-family:'Nunito',sans-serif;font-weight:700;flex-shrink:0;margin-top:3px;letter-spacing:.06em;}
.sd-koan-text{font-family:'Nunito',sans-serif;font-size:17px;color:#3A1A10;line-height:1.55;font-weight:800;}
.sd-time{font-size:11px;letter-spacing:.08em;color:#2D6640;margin-bottom:24px;display:flex;align-items:center;gap:8px;font-family:'Nunito',sans-serif;font-weight:700;}
.sd-time::before{content:'◷';font-size:12px;}
.sd-walk{display:flex;align-items:flex-start;gap:12px;padding:18px 20px;border:1px solid rgba(40,107,64,.3);border-radius:8px;background:rgba(40,107,64,.08);max-width:460px;margin-bottom:28px;}
.sd-walk-i{font-size:18px;opacity:.85;flex-shrink:0;margin-top:1px;}
.sd-walk-t{font-family:'Nunito',sans-serif;font-size:15px;color:#3A1A10;line-height:1.7;font-weight:800;}
.sd-actions{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}
.sd-btn{background:#1A4828;color:#F2EDE4;border:none;padding:13px 30px;border-radius:2px;font-family:'Nunito',sans-serif;font-size:11px;letter-spacing:.13em;text-transform:uppercase;cursor:pointer;font-weight:800;transition:all .25s;}
.sd-btn:hover{background:#235c34;transform:translateY(-1px);}
.sd-btn.bloom{background:linear-gradient(135deg,#1A4828,#235c34);}
.sd-done{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#2D6640;display:flex;align-items:center;gap:6px;font-family:'Nunito',sans-serif;font-weight:800;}
.sd-done::before{content:'✓';font-size:12px;}
.sd-locked{font-size:14px;color:#3A1A10;font-family:'Nunito',sans-serif;font-weight:600;}

/* REFLECTION */
.sd-reflection{margin-bottom:8px;}
.sd-reflection-para{font-size:15px;line-height:1.92;color:#3A1A10;margin-bottom:18px;font-family:'Nunito',sans-serif;font-weight:500;}
.sd-reflection-para:last-child{margin-bottom:0;}
.reflecting-dots{display:flex;justify-content:center;gap:8px;margin-top:32px;}
.reflecting-dots span{width:10px;height:10px;border-radius:50%;background:#2A6B40;opacity:0.4;animation:dotPulse 1.4s ease-in-out infinite;}
.reflecting-dots span:nth-child(2){animation-delay:0.2s;}
.reflecting-dots span:nth-child(3){animation-delay:0.4s;}
@keyframes dotPulse{0%,80%,100%{opacity:0.2;transform:scale(0.85);}40%{opacity:0.8;transform:scale(1);}}
.bloom-banner{padding:48px 36px;background:linear-gradient(135deg,rgba(40,107,64,.1) 0%,rgba(232,224,210,.95) 100%);border:1px solid rgba(40,107,64,.2);border-radius:8px;max-width:440px;animation:fadeUp .6s ease both;text-align:center;}
.bloom-banner h2{font-family:'Cormorant Garamond',serif;font-size:40px;font-weight:600;color:#3A1A10;margin-bottom:12px;}
.bloom-banner p{font-size:13px;line-height:1.88;color:#3A1A10;margin-bottom:28px;font-family:'Nunito',sans-serif;}

/* EMAIL GATE — light */
.email-gate{padding:64px 48px;display:flex;align-items:center;justify-content:center;min-height:55vh;}
.email-gate-inner{max-width:480px;text-align:center;}
.email-gate-icon{font-size:52px;margin-bottom:24px;}
.email-gate-title{font-family:'Cormorant Garamond',serif;font-size:40px;font-weight:300;color:#3A1A10;margin-bottom:16px;}
.email-gate-body{font-size:14px;line-height:1.88;color:#3A1A10;margin-bottom:36px;font-family:'Nunito',sans-serif;}
.email-gate-form{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:16px;}
.email-input{background:#fff;border:1.5px solid rgba(40,107,64,.35);color:#3A1A10;padding:12px 20px;border-radius:2px;font-family:'Nunito',sans-serif;font-size:14px;width:260px;outline:none;transition:border-color .2s;}
.email-input:focus{border-color:#2D6640;}
.email-input::placeholder{color:#3A1A10;}
.email-gate-note{font-size:11px;color:#3A1A10;letter-spacing:.06em;font-family:'Nunito',sans-serif;}

/* KOAN RESPONSE FIELDS — high contrast */
.sd-koan-block{margin-bottom:28px;}
.sd-koan-hint{font-size:12px;color:#2D6640;font-style:italic;font-family:'Nunito',sans-serif;margin:6px 0 10px 28px;}
.sd-koan-response{width:100%;background:#fff;border:1.5px solid rgba(40,107,64,.28);color:#3A1A10;padding:14px 16px;border-radius:6px;font-family:'Nunito',sans-serif;font-size:13px;line-height:1.7;resize:vertical;outline:none;transition:border-color .2s;margin-top:8px;}
.sd-koan-response:focus{border-color:#2D6640;}
.sd-koan-response::placeholder{color:#3A1A10;}
.sd-koan-count{font-size:10px;color:#3A1A10;text-align:right;margin-top:4px;font-family:'Nunito',sans-serif;}
.sd-nudge-btn{margin-top:12px;background:#fff;border:2px solid #2A6B40;color:#2D6640;padding:12px 24px;border-radius:24px;font-family:'Nunito',sans-serif;font-size:14px;font-weight:800;cursor:pointer;transition:all .2s;letter-spacing:.04em;display:block;width:100%;text-align:center;box-shadow:0 2px 8px rgba(40,107,64,.15);}
.sd-nudge-btn:hover{background:#2A6B40;color:#fff;}
.sd-nudge-btn:disabled{opacity:0.55;cursor:default;}
.sd-nudge{margin-top:12px;padding:14px 16px;background:rgba(40,107,64,.07);border-left:3px solid #2A6B40;border-radius:0 6px 6px 0;font-family:'Nunito',sans-serif;font-size:14px;font-weight:500;color:#3A1A10;line-height:1.7;font-style:italic;}

/* MOBILE BOTTOM SHEET — warm cream with more contrast */
.bs-overlay{position:fixed;inset:0;z-index:300;background:rgba(5,14,8,0.65);backdrop-filter:blur(4px);animation:fadeIn .25s ease;}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
.bs{position:fixed;bottom:0;left:0;right:0;z-index:301;background:#FDFAF8;border-top:2px solid rgba(60,110,70,0.2);border-radius:20px 20px 0 0;padding:0 28px 48px 28px;max-height:88vh;overflow-y:auto;animation:slideUp .32s cubic-bezier(.32,1,.48,1);}
@keyframes slideUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
.bs-handle{width:40px;height:4px;background:rgba(60,100,70,0.3);border-radius:2px;margin:14px auto 28px;}
.bs-close{position:absolute;top:16px;right:20px;background:none;border:none;font-size:18px;color:rgba(30,60,38,0.5);cursor:pointer;padding:4px;}

/* PULSE animation for next stone */
@keyframes pulse{
  0%{box-shadow:0 0 0 0 rgba(212,132,122,0.5);}
  70%{box-shadow:0 0 0 14px rgba(212,132,122,0);}
  100%{box-shadow:0 0 0 0 rgba(212,132,122,0);}
}
.pulse-ring{animation:pulse 2.2s ease-out infinite;}

/* FOOTER */
footer{padding:48px;border-top:1px solid rgba(229,221,208,.05);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:18px;}
.footer-logo{font-family:'Cormorant Garamond',serif;font-size:19px;color:#3A1A10;letter-spacing:.12em;font-weight:300;}
.footer-links{display:flex;gap:24px;}
.fl{font-size:10px;color:#3A1A10;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:color .2s;}
.fl:hover{color:#1A4828;}
.footer-note{font-size:10px;color:#3A1A10;letter-spacing:.06em;width:100%;border-top:1px solid rgba(92,45,30,.1);padding-top:20px;margin-top:6px;}

.logic-section{width:100%;max-width:900px;margin:72px auto 0;text-align:left;padding:0 24px;}
.logic-eyebrow{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#2D6640;font-family:'Nunito',sans-serif;font-weight:800;margin-bottom:14px;}
.logic-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,3.5vw,44px);font-weight:300;color:#3A1A10;margin-bottom:16px;}
.logic-intro{font-size:15px;line-height:1.88;color:#3A1A10;font-family:'Nunito',sans-serif;font-weight:500;max-width:680px;margin-bottom:48px;}
.logic-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:40px;}
.logic-card{padding:36px;border-radius:4px;}
.logic-card.valid{background:rgba(45,102,64,.06);border:1px solid rgba(45,102,64,.2);}
.logic-card.faulty{background:rgba(192,80,74,.05);border:1px solid rgba(192,80,74,.2);}
.logic-card-label{font-size:10px;letter-spacing:.14em;text-transform:uppercase;font-family:'Nunito',sans-serif;font-weight:800;margin-bottom:12px;}
.valid-label{color:#2D6640;}
.faulty-label{color:#C0504A;}
.logic-card-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:#3A1A10;margin-bottom:24px;}
.logic-premises{display:flex;flex-direction:column;gap:14px;margin-bottom:24px;padding:20px;background:rgba(255,255,255,.5);border-radius:2px;}
.logic-premise{display:flex;gap:14px;align-items:flex-start;}
.logic-p-label{font-size:10px;font-family:'Nunito',sans-serif;font-weight:800;color:#2D6640;flex-shrink:0;margin-top:2px;letter-spacing:.06em;width:20px;}
.logic-p-text{font-size:15px;color:#3A1A10;font-family:'Nunito',sans-serif;font-weight:600;line-height:1.5;}
.logic-conclusion{display:flex;gap:14px;align-items:flex-start;padding-top:14px;border-top:1px solid rgba(45,102,64,.15);}
.logic-c-label{font-size:18px;font-family:'Cormorant Garamond',serif;color:#2D6640;flex-shrink:0;width:20px;font-style:italic;}
.logic-c-text{font-size:15px;color:#2D6640;font-family:'Nunito',sans-serif;font-weight:800;line-height:1.5;}
.faulty-conc .logic-c-label{color:#C0504A;}
.faulty-conc .logic-c-text{color:#C0504A;}
.logic-note{font-size:13px;line-height:1.82;color:#3A1A10;font-family:'Nunito',sans-serif;font-weight:500;margin-top:16px;}
.logic-footer{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:20px;text-align:center;max-width:680px;margin:0 auto;color:#3A1A10;}
.workshops-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(92,45,30,.1);margin-top:56px;}
.workshop-card{background:#FFF8F5;padding:36px 28px;display:flex;flex-direction:column;gap:8px;transition:background .2s;}
.workshop-card:hover{background:#FFF0EC;}
.workshop-icon{font-size:28px;margin-bottom:4px;}
.workshop-price{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:600;color:#1A4828;}
.workshop-name{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:#3A1A10;margin-bottom:2px;}
.workshop-when{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#A0522D;font-family:'Nunito',sans-serif;font-weight:700;margin-bottom:8px;}
.workshop-desc{font-size:13px;line-height:1.82;color:rgba(40,20,10,.8);font-family:'Nunito',sans-serif;font-weight:500;flex:1;}
.workshop-btn{margin-top:16px;background:none;border:2px solid #2D6640;color:#2D6640;padding:10px 0;font-family:'Nunito',sans-serif;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:all .2s;border-radius:1px;}
.workshop-btn:hover{background:#2D6640;color:#F2EDE4;}

@media(max-width:860px){
  nav{padding:18px 20px;}
  .hero,.sec,.manifesto,.gp-header,.gp-prog{padding-left:20px;padding-right:20px;}
  .hero{padding-top:56px;min-height:auto;}
  .hero-float{display:none;}
  .divider{margin:0 20px;}
  .tiers-grid,.steps-grid{grid-template-columns:1fr;}
  footer{padding:32px 20px;}
  .footer-links{display:none;}
  .gp-body{flex-direction:column;}
  .gp-path-col{width:100%;padding:16px 20px;}
  .gp-path-sticky{position:relative;top:0;}
  .gp-detail-col{display:none;}
}
`;

// ─── BOTANICALS ───────────────────────────────────────────────────────────────

function Botanical({ x, y, type, opacity = 0.7, scale = 1, flip = false }) {
  const t = `translate(${x},${y}) scale(${flip ? -scale : scale},${scale})`;

  if (type === "fern") return (
    <g transform={t} opacity={opacity}>
      <path d="M0,0 Q-8,-12 -14,-24 Q-6,-14 0,-4 Q6,-14 14,-24 Q8,-12 0,0" fill="rgba(30,80,35,0.8)"/>
      <path d="M0,-4 Q-10,-18 -18,-34 Q-8,-18 0,-8 Q8,-18 18,-34 Q10,-18 0,-4" fill="rgba(25,70,30,0.7)"/>
      <path d="M0,-8 Q-7,-22 -12,-38 Q-4,-20 0,-12 Q4,-20 12,-38 Q7,-22 0,-8" fill="rgba(35,85,40,0.65)"/>
      <line x1="0" y1="0" x2="0" y2="-40" stroke="rgba(20,60,25,0.5)" strokeWidth="1"/>
    </g>
  );

  if (type === "leaf") return (
    <g transform={t} opacity={opacity}>
      <path d="M0,0 Q-16,-8 -22,-22 Q-8,-12 0,-6 Q-4,-16 -2,-28 Q4,-16 0,-6 Q8,-12 22,-22 Q16,-8 0,0"
        fill="rgba(28,78,33,0.75)"/>
      <line x1="0" y1="0" x2="-2" y2="-28" stroke="rgba(20,60,25,0.4)" strokeWidth="0.8"/>
    </g>
  );

  if (type === "grass") return (
    <g transform={t} opacity={opacity}>
      {[-8,-4,0,4,8].map((dx,i) => (
        <path key={i} d={`M${dx},0 Q${dx+3*(i%2?1:-1)},-${12+i*3} ${dx+1*(i%2?2:-2)},-${22+i*4}`}
          fill="none" stroke={`rgba(35,95,40,${0.5+i*0.06})`} strokeWidth={1.2-i*0.1} strokeLinecap="round"/>
      ))}
    </g>
  );

  if (type === "flower") return (
    <g transform={t} opacity={opacity}>
      {[0,60,120,180,240,300].map((angle,i) => {
        const rad = angle * Math.PI / 180;
        return <ellipse key={i} cx={Math.cos(rad)*7} cy={Math.sin(rad)*7} rx="4" ry="3"
          transform={`rotate(${angle} ${Math.cos(rad)*7} ${Math.sin(rad)*7})`}
          fill={i%2===0 ? "rgba(180,200,140,0.6)" : "rgba(155,180,120,0.5)"}/>;
      })}
      <circle cx="0" cy="0" r="3.5" fill="rgba(220,200,100,0.5)"/>
    </g>
  );

  if (type === "moss") return (
    <g transform={t} opacity={opacity}>
      {[...Array(7)].map((_,i) => (
        <ellipse key={i} cx={(i-3)*5+Math.sin(i)*3} cy={Math.cos(i)*4} rx={4+i%3} ry={3}
          fill={`rgba(${25+i*3},${70+i*4},${30+i*2},0.65)`}/>
      ))}
    </g>
  );

  return null;
}

// ─── GARDEN PATH SVG ─────────────────────────────────────────────────────────

function GardenPathSVG({ completed, selected, onSelect }) {
  const isComplete = id => completed.includes(id);
  const isUnlocked = idx => idx === 0 || completed.includes(STONES[idx - 1].id);
  const nextUnlockedIdx = STONES.findIndex((s, idx) => isUnlocked(idx) && !isComplete(s.id));

  // Path through centered stone positions — viewBox 0 0 560 970
  const pathD = `M 280 108
    C 350 150 390 205 340 252
    C 290 299 160 278 220 295
    C 280 312 400 360 378 418
    C 356 476 220 458 340 475
    C 420 485 410 545 348 580
    C 286 615 155 635 220 660
    C 265 678 340 738 325 792
    C 312 830 280 855 280 855`;

  // Sample points along path for cobblestone placement [cx, cy, angle_deg]
  const pathPoints = [
    [280,108,0],[292,128,13],[305,150,20],[315,173,24],[320,197,20],[316,220,12],
    [306,242,4],[292,260,-8],[274,274,-16],[254,281,-12],[234,284,-5],[218,286,2],
    // curve — smaller
    [205,287,4],[196,289,4],[188,292,3],
    // straight
    [198,306,9],[215,322,16],[237,338,20],[262,354,22],[287,368,20],
    [310,381,17],[330,393,13],[350,404,9],[368,414,5],
    // curve — smaller
    [380,425,2],[385,438,-1],[382,451,-5],[372,461,-8],[358,469,-6],
    // straight
    [338,474,-3],[318,476,2],[304,490,9],[306,510,15],[318,530,18],
    [330,550,18],[340,568,14],[344,582,8],[338,596,2],[324,608,-5],
    // curve — smaller
    [306,617,-10],[286,626,-12],[265,634,-10],
    // straight
    [244,642,-6],[226,649,-2],[210,653,2],[198,656,4],
    // curve — smaller
    [192,658,4],
    // straight
    [202,670,9],[220,684,15],[242,697,18],[265,710,20],[285,722,19],
    [302,734,16],[315,745,12],[322,757,8],[323,770,3],[318,784,-2],
    [307,798,-5],[294,812,-6],[283,828,-3],[280,855,0]
  ];

  const palettes = [
    [175,160,130],[188,172,140],[165,152,122],[192,176,144],[178,162,132],
    [170,158,135],[185,168,138],[162,148,120],[195,178,148],[172,156,128],
    [183,170,148],[168,155,126],[190,175,145],[176,162,130],[186,170,138],
    [160,150,135],[178,165,145],[188,175,152],[170,158,138],[193,180,157],
  ];

  const curveZones = new Set([10,11,12,13, 23,24,25,26,27, 37,38,39, 44,45,46]);

  const cobbles = (() => {
    const list = [];
    let id = 0;
    pathPoints.forEach(([pcx, pcy, ang], ptIdx) => {
      const rad = ang * Math.PI / 180;
      const perpRad = rad + Math.PI / 2;
      const isCurve = curveZones.has(ptIdx);
      const count = isCurve ? 4 : 6;
      const hw = isCurve ? 26 : 32;
      for (let i = 0; i < count; i++) {
        const t2 = -hw + (i / (count - 1)) * hw * 2;
        const jitter = Math.sin(id * 7.3) * 2;
        const cx = pcx + Math.cos(perpRad) * t2 + jitter;
        const cy = pcy + Math.sin(perpRad) * t2 + Math.sin(id * 5.1) * 1.5;
        const pal = palettes[id % palettes.length];
        const baseRx = isCurve ? 3 : 4;
        const baseRy = isCurve ? 2 : 2.8;
        const rx = baseRx + Math.abs(Math.sin(id * 3.7)) * (isCurve ? 1.5 : 2.5);
        const ry = baseRy + Math.abs(Math.cos(id * 2.9)) * (isCurve ? 1 : 1.8);
        const rotate = ang + Math.sin(id * 4.1) * 18;
        const alpha = 0.5 + Math.abs(Math.sin(id * 6.3)) * 0.3;
        list.push({ id: id++, cx, cy, rx, ry, rotate, pal, alpha });
      }
    });
    return list;
  })();

  const botanicals = [
    { x:48, y:72, type:"fern", opacity:0.65, scale:1.2 },
    { x:508, y:95, type:"grass", opacity:0.6, scale:0.9, flip:true },
    { x:28, y:185, type:"leaf", opacity:0.7, scale:1.1 },
    { x:525, y:225, type:"moss", opacity:0.6, scale:1.0, flip:true },
    { x:35, y:355, type:"fern", opacity:0.6, scale:0.9, flip:true },
    { x:522, y:390, type:"grass", opacity:0.65, scale:1.1 },
    { x:22, y:445, type:"flower", opacity:0.55, scale:1.0 },
    { x:530, y:472, type:"leaf", opacity:0.6, scale:0.9, flip:true },
    { x:30, y:548, type:"moss", opacity:0.65, scale:1.1 },
    { x:525, y:582, type:"fern", opacity:0.6, scale:1.0, flip:true },
    { x:35, y:625, type:"grass", opacity:0.6, scale:0.9 },
    { x:518, y:662, type:"flower", opacity:0.55, scale:1.1, flip:true },
    { x:28, y:735, type:"leaf", opacity:0.65, scale:1.0 },
    { x:528, y:755, type:"fern", opacity:0.6, scale:0.9, flip:true },
    { x:40, y:825, type:"grass", opacity:0.6, scale:1.0 },
    { x:515, y:835, type:"moss", opacity:0.55, scale:1.0, flip:true },
    { x:68, y:135, type:"moss", opacity:0.5, scale:0.8 },
    { x:492, y:315, type:"grass", opacity:0.5, scale:0.8, flip:true },
    { x:52, y:505, type:"flower", opacity:0.45, scale:0.85 },
    { x:508, y:715, type:"leaf", opacity:0.5, scale:0.85, flip:true },
    { x:62, y:885, type:"fern", opacity:0.5, scale:0.85 },
    { x:502, y:905, type:"grass", opacity:0.45, scale:0.75, flip:true },
  ];

  return (
    <svg className="path-svg" viewBox="0 0 560 970" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sg">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="cs">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.45"/>
        </filter>
        <radialGradient id="gg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7EDB90" stopOpacity="0.55"/>
          <stop offset="50%" stopColor="#A0522D" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#A0522D" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="gs" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A0522D" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#A0522D" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <rect width="560" height="970" fill="#E8E0D2"/>

      {/* Garden bg blobs */}
      {[[30,100,55,70],[510,160,48,62],[22,340,60,75],[530,400,52,65],
        [25,530,58,70],[535,580,46,60],[30,750,55,68],[525,800,50,62],
        [25,910,52,65],[530,940,48,58]].map(([x,y,rx,ry],i)=>(
        <ellipse key={`bg-${i}`} cx={x} cy={y} rx={rx} ry={ry}
          fill={`rgba(${12+i%3*2},${38+i%4*5},${15+i%3*3},${0.7+i%3*0.08})`}/>
      ))}

      {/* Tiny plant dots */}
      {[...Array(60)].map((_,i)=>(
        <circle key={`d-${i}`}
          cx={3+(i*89+i*i*17)%554} cy={5+(i*113+i*43)%962}
          r={1+(i%4)*0.6} fill={`rgba(25,75,30,${0.1+i%5*0.03})`}/>
      ))}

      {/* Botanicals */}
      {botanicals.map((b,i) => <Botanical key={`bot-${i}`} {...b}/>)}

      {/* PATH — outer dark border */}
      <path d={pathD} fill="none" stroke="rgba(16,10,4,0.98)" strokeWidth="96" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Path base warm stone */}
      <path d={pathD} fill="none" stroke="rgba(168,150,118,0.95)" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Depth */}
      <path d={pathD} fill="none" stroke="rgba(145,128,98,0.5)" strokeWidth="58" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Light center */}
      <path d={pathD} fill="none" stroke="rgba(200,183,152,0.28)" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round"/>

      {/* COBBLESTONES */}
      {cobbles.map(c => (
        <ellipse key={`cob-${c.id}`}
          cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry}
          transform={`rotate(${c.rotate} ${c.cx} ${c.cy})`}
          fill={`rgba(${c.pal[0]},${c.pal[1]},${c.pal[2]},${c.alpha})`}
          stroke="rgba(88,74,52,0.3)" strokeWidth="0.4"
          filter="url(#cs)"
        />
      ))}

      {/* Grout */}
      <path d={pathD} fill="none" stroke="rgba(70,56,36,0.2)" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 11"/>

      {/* Completed glow */}
      {completed.length > 0 && (
        <path d={pathD} fill="none"
          stroke="rgba(212,132,122,0.18)" strokeWidth="76"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={`${completed.length * 210} 2500`}/>
      )}

      {/* Inner edge shadow for crispness */}
      <path d={pathD} fill="none" stroke="rgba(5,14,6,0.55)" strokeWidth="88"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>

      {/* BEGIN / READY */}
      <text x="280" y="46" textAnchor="middle" fontSize="16" fill="rgba(255,255,255,0.95)"
        fontFamily="'Nunito',sans-serif" fontWeight="800" letterSpacing="5">BEGIN</text>
      <line x1="280" y1="54" x2="280" y2="70" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="2 3"/>
      <text x="280" y="932" textAnchor="middle" fontSize="12" fill="rgba(212,132,122,0.7)"
        fontFamily="'Nunito',sans-serif" fontWeight="800" letterSpacing="4">READY</text>
      <line x1="280" y1="862" x2="280" y2="877" stroke="rgba(212,132,122,0.35)" strokeWidth="1.5" strokeDasharray="2 3"/>

      {/* PRACTICE STONES */}
      {STONES.map((stone, idx) => {
        const unlocked = isUnlocked(idx);
        const complete = isComplete(stone.id);
        const isSel = selected === stone.id;
        const isNext = idx === nextUnlockedIdx;
        const R = 40; // bigger stones

        // All stones visible — just different states
        const stoneFill = complete ? "#1E5230"
          : isSel ? "#1A4228"
          : unlocked ? "#163820"
          : "#122E1A";

        const strokeColor = complete ? "rgba(200,230,180,0.95)"
          : isSel ? "rgba(212,132,122,0.9)"
          : unlocked ? "rgba(212,132,122,0.7)"
          : "rgba(212,132,122,0.45)";

        const rimFill = complete ? "rgba(70,130,80,0.55)"
          : isSel ? "rgba(55,105,65,0.48)"
          : unlocked ? "rgba(40,88,50,0.4)"
          : "rgba(28,68,38,0.38)";

        const symbolFill = complete ? "#D4F0B8"
          : isSel ? "#C8DCA8"
          : unlocked ? "rgba(212,132,122,0.9)"
          : "rgba(212,132,122,0.6)";

        return (
          <g key={stone.id}
            onClick={() => isUnlocked(idx) && onSelect(stone.id)}
            style={{cursor: isUnlocked(idx) ? "pointer" : "default"}}
          >
            {/* Pulse ring on next unlocked stone */}
            {isNext && !complete && (
              <circle cx={stone.cx} cy={stone.cy} r={R+18}
                fill="none" stroke="rgba(212,132,122,0.55)" strokeWidth="2.5"
                className="pulse-ring"/>
            )}

            {/* Glow — always on for complete, on hover for selected */}
            {complete && (
              <circle cx={stone.cx} cy={stone.cy} r={R*2.8} fill="url(#gg)"/>
            )}
            {!complete && isSel && (
              <circle cx={stone.cx} cy={stone.cy} r={R*2.4} fill="url(#gs)"/>
            )}

            {/* Drop shadow */}
            <ellipse cx={stone.cx+1} cy={stone.cy+5} rx={R+6} ry={R+4} fill="rgba(0,0,0,0.65)"/>

            {/* Outer rim */}
            <circle cx={stone.cx} cy={stone.cy} r={R+5} fill={rimFill}/>

            {/* Stone face */}
            <circle cx={stone.cx} cy={stone.cy} r={R}
              fill={stoneFill}
              stroke={strokeColor}
              strokeWidth="2.2"
            />

            {/* Inner decorative ring */}
            <circle cx={stone.cx} cy={stone.cy} r={R-10}
              fill="none"
              stroke={complete ? "rgba(212,132,122,0.4)" : "rgba(212,132,122,0.2)"}
              strokeWidth="1"/>

            {/* Stone texture */}
            <path d={`M ${stone.cx-17} ${stone.cy-5} Q ${stone.cx} ${stone.cy-10} ${stone.cx+16} ${stone.cy-4}`}
              fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.9"/>

            {/* Symbol — BIG, radiant, unmissable */}
            {complete ? (
              /* CHECKMARK — bright green, large, glowing */
              <g filter="url(#sg)">
                <text x={stone.cx} y={stone.cy+2}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="30" fill="#7EDB90" fontFamily="serif"
                  fontWeight="bold"
                >✓</text>
              </g>
            ) : (
              /* DIAMOND — drawn as a rotated square, radiant */
              <g filter="url(#sg)">
                {/* Outer diamond glow */}
                <rect
                  x={stone.cx - 16} y={stone.cy - 16}
                  width="32" height="32"
                  transform={`rotate(45 ${stone.cx} ${stone.cy})`}
                  fill={isSel ? "rgba(212,132,122,0.25)" : "rgba(212,132,122,0.1)"}
                  stroke="none"
                  rx="2"
                />
                {/* Main diamond */}
                <rect
                  x={stone.cx - 11} y={stone.cy - 11}
                  width="22" height="22"
                  transform={`rotate(45 ${stone.cx} ${stone.cy})`}
                  fill="none"
                  stroke={isSel ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.82)"}
                  strokeWidth="2.5"
                  rx="1.5"
                />
                {/* Inner diamond dot */}
                <rect
                  x={stone.cx - 4} y={stone.cy - 4}
                  width="8" height="8"
                  transform={`rotate(45 ${stone.cx} ${stone.cy})`}
                  fill={isSel ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)"}
                  rx="1"
                />
              </g>
            )}

            {/* Name label — warm white pill, dark text, bigger */}
            <rect
              x={stone.cx - 105} y={stone.cy + R + 8}
              width="210" height="30"
              rx="15" ry="15"
              fill="rgba(245,240,228,0.94)"
            />
            <text x={stone.cx} y={stone.cy+R+28} textAnchor="middle" fontSize="14.5"
              fill="rgba(10,26,14,0.95)"
              fontFamily="'Nunito',sans-serif" fontWeight="800" letterSpacing="1.6"
            >{stone.name.toUpperCase()}</text>

            {/* Number pill */}
            <rect
              x={stone.cx - 20} y={stone.cy + R + 42}
              width="40" height="18"
              rx="9" ry="9"
              fill="rgba(212,132,122,0.38)"
            />
            <text x={stone.cx} y={stone.cy+R+54} textAnchor="middle" fontSize="11"
              fill="rgba(255,255,255,0.92)"
              fontFamily="'Nunito',sans-serif" fontWeight="700"
            >{stone.num}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── STONE DETAIL ────────────────────────────────────────────────────────────

function StoneDetail({ stone, isComplete, isUnlocked, onComplete, onClose, asSheet, email }) {
  const [responses, setResponses] = useState({});
  const [reflection, setReflection] = useState(null);
  const [reflecting, setReflecting] = useState(false);
  const [nudges, setNudges] = useState({});
  const [nudging, setNudging] = useState({});
  const allAnswered = stone?.koans?.every((_, i) => (responses[i] || "").trim().length > 0);

  if (!stone) return null;

  const callSage = async (prompt, maxTokens = 400) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ["sk-ant-api03-tzwaCsk","rgnkP8rkF-5nKOA1PBjZ","4XvOFTLnS7kD7Tleap2s","2uUomTTn3wui8s9rl6kDG11u92dfKWvCidtx1Vw-JFz6dQAA"].join(""),
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }]
      })
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return data.content?.[0]?.text || "";
  };

  const getNudge = async (i, question, answer) => {
    if (!answer.trim()) return;
    setNudging(n => ({...n, [i]: true}));
    await new Promise(r => setTimeout(r, 1200));
    try {
      const previousAnswers = stone.koans.slice(0, i).map((k, idx) => responses[idx] ? `Q${idx+1}: "${k.q}"\nAnswer: "${responses[idx]}"` : null).filter(Boolean).join("\n\n");
      const context = previousAnswers ? `Here is everything this person has written so far on this stone:\n\n${previousAnswers}\n\nNow they just wrote:` : `Someone answered this question:`;
      const text = await callSage(
        `You are the voice of Sage — a plant-based matchmaking platform built on slowness and intention. ${context}\n\n"${question}"\n\nTheir answer: "${answer}"\n\nTell them a tiny parable — 2-3 sentences. A real-feeling moment about a real-feeling person that mirrors something in what they wrote, informed by everything they have shared. No analysis. No advice. No "you". Just a small story that lands quietly and opens something. Like Khalil Gibran, not a life coach.`,
        300
      );
      setNudges(n => ({...n, [i]: text || (PARABLES[stone.id] && PARABLES[stone.id][i]) || getFallbackNudge(i, answer)}));
    } catch(e) {
      setNudges(n => ({...n, [i]: (PARABLES[stone.id] && PARABLES[stone.id][i]) || getFallbackNudge(i, answer)}));
    }
    setNudging(n => ({...n, [i]: false}));
  };

  const getFallbackNudge = (i, answer) => {
    const a = answer.trim().toLowerCase();
    const isDoubt = a.includes("sure") || a.includes("know") || a.includes("don't") ||
      a.includes("dont") || a.includes("?") || a.includes("maybe") ||
      a.includes("not sure") || a.includes("wonder") || a.includes("doubt") ||
      a.includes("what if") || a.includes("nobody") || a.includes("no one") ||
      a.includes("never") || a.includes("can't") || a.includes("cant") ||
      a.includes("won't") || a.includes("wont") || a.includes("impossible");

    if (isDoubt) {
      const doubtResponses = [
        `A woman named Sara spent three years certain the fig tree in her yard was dead. She stopped watering it. One spring morning she found a single green shoot at the base. She had been wrong about the silence. Sage isn't asking you to ignore it — it's asking you to look at it. That doubt was built from real experiences that hurt. But here's the logic: the fact that you can imagine what you want means someone who matches it is imaginable. You are not asking for something that doesn't exist in human form. You are asking for someone like you. And you exist.`,
        `A man named Joel deleted every dating app on a Tuesday in November. On Wednesday his neighbor knocked to borrow salt. They are married now. He tells this story and still shakes his head. thing you could have written. Nobody can be certain. But consider this: every person who found someone real once sat exactly where you're sitting, asking exactly that question. The doubt isn't proof it won't happen. It's proof you've been disappointed before. Those are different things.`,
        `There is a kind of certainty that arrives after pain. It feels like wisdom. Sometimes it is. Sometimes it is just the scar tissue talking. Not to convince you with arguments. But to create enough stillness that you can hear what you actually believe, underneath what disappointment has told you. You wouldn't be here if some part of you didn't think it was possible.`,
        `She had decided the door was locked. She had not tried the handle. You doubt because it matters. If it didn't matter you wouldn't be asking. The question now isn't whether someone exists — it's whether you're willing to be findable when they come looking.`,
      ];
      return doubtResponses[i % doubtResponses.length];
    }

    // Affirmative / neutral answers
    const word = answer.trim().split(" ").slice(0,4).join(" ");
    const affirmResponses = [
      `"${word}..." — notice how quickly that came. The things that arrive without hesitation are usually the truest ones. Sit with why this one is so clear.`,
      `There is something that arrives before the words do. That is the thing arriving. It knows something the thinking mind is still catching up to. "${word}" isn't random — it says something about how you move through the world. The right person will recognize it immediately.`,
      `A woman kept a journal for twenty years that no one read. When she finally showed it to someone, he said: this is exactly how I think. She had been writing to him all along without knowing it. The fact that you answered "${word}" says something important — not what you do, but who you are when no one is asking you to be anything in particular.`,
      `Something in "${word}" points toward what you actually need, not just what you think you want. Those two things are worth distinguishing before you meet someone.`,
    ];
    return affirmResponses[i % affirmResponses.length];
  };

  const getReflection = async () => {
    setReflecting(true);
    try {
      const koansAndResponses = stone.koans.map((koan, i) =>
        `Question: "${koan.q}"\nResponse: "${responses[i] || ""}"`
      ).join("\n\n");

      const prompt = `You are the voice of Sage — a plant-based matchmaking platform built on slowness, intention, and genuine readiness for love. Your tone is warm, wise, personal, and never generic. You write like a trusted guide who has read someone's journal and truly sees them.

A person just completed Stone ${stone.num}: "${stone.name}" — ${stone.tagline}

Their responses to the walking questions:
${koansAndResponses}

Write them a personal reflection of 3-4 short paragraphs.
- Open by reflecting something specific from their actual answers — show you read them
- Connect what they wrote to something deeper about what this stone is really about
- End with one quiet, forward-facing sentence that carries them toward the next stone
- Do NOT be generic. Do NOT use affirmations or wellness clichés. Do NOT mention "the journey"
- Write as if you are speaking only to this one person
- Tone: intimate, clear, grounded. Like a wise friend, not a coach.`;

      const text = await callSage(prompt, 800);
      setReflection(text || getFallbackReflection());
    } catch (e) {
      console.error("Reflection error:", e);
      setReflection(getFallbackReflection());
    }
    setReflecting(false);
  };

  const getFallbackReflection = () => {
    const firstAnswer = (responses[0] || "").trim().split(" ").slice(0, 5).join(" ");
    return `What you wrote — starting with "${firstAnswer}" — landed here with more weight than you might realize.\n\nThe fact that you walked this stone at all says something. Most people never stop long enough to ask these questions. You did. That's not nothing.\n\nThe next stone is waiting. It will ask something harder. You are more ready for it than you think.`;
  };

  const handleComplete = async () => {
    await getReflection();
  };

  const renderContent = () => {
    if (reflecting) return (
      <div className="sd" style={{textAlign:"center",padding:"60px 0"}}>
        <div style={{fontSize:48,marginBottom:24}}>🌿</div>
        <div className="sd-name" style={{fontSize:28,marginBottom:16}}>Reading what you wrote...</div>
        <p className="sd-body" style={{textAlign:"center"}}>Sage is preparing a reflection just for you.</p>
        <div className="reflecting-dots"><span/><span/><span/></div>
      </div>
    );

    if (reflection) return (
      <div className="sd">
        <div className="sd-num">Stone {stone.num} · Complete</div>
        <div className="sd-name" style={{fontSize:"clamp(24px,3vw,36px)",marginBottom:24}}>A reflection for you.</div>
        <div className="sd-reflection">
          {reflection.trim().split("\n\n").map((para, i) => (
            <p key={i} className="sd-reflection-para">{para.trim()}</p>
          ))}
        </div>
        <div className="sd-walk" style={{marginTop:32}}>
          <span className="sd-walk-i">🚶</span>
          <span className="sd-walk-t">{stone.walkText}</span>
        </div>
        <button className="sd-btn" style={{marginTop:24}} onClick={() => { onComplete(); onClose(); }}>
          Return to the path
        </button>
      </div>
    );

    return (
      <div className="sd">
        <div className="sd-num">Stone {stone.num}</div>
        <div className="sd-name">{stone.name}</div>
        <div className="sd-tagline">{stone.tagline}</div>
        <p className="sd-body">{stone.body}</p>

        {stone.teaching && (
          <div className="sd-teaching">
            {stone.teaching.trim().split("\n\n").map((para, i) => (
              <p key={i} className="sd-teaching-para">{para.trim()}</p>
            ))}
          </div>
        )}

        {stone.koans && (
          <div className="sd-koans">
            <div className="sd-koans-label">Walk with these · write what arises</div>
            {stone.koans.map((koan, i) => (
              <div key={i} className="sd-koan-block">
                <div className="sd-koan">
                  <span className="sd-koan-num">{String(i+1).padStart(2,"0")}</span>
                  <span className="sd-koan-text">{koan.q}</span>
                </div>
                {koan.hint && <div className="sd-koan-hint">{koan.hint}</div>}
                <textarea
                  className="sd-koan-response"
                  placeholder="Write what arises — there are no wrong answers."
                  maxLength={1000}
                  value={responses[i] || ""}
                  onChange={e => {
                    const val = e.target.value;
                    setResponses(r => ({...r, [i]: val}));
                  }}
                  rows={4}
                />
                <div className="sd-koan-count">{(responses[i] || "").length} / 1000</div>
                {(responses[i] || "").trim().length > 10 && !nudges[i] && (
                  <button
                    className="sd-nudge-btn"
                    onClick={() => getNudge(i, koan.q, responses[i])}
                    disabled={nudging[i]}
                  >
                    {nudging[i] ? "Sage is listening..." : "✦ Reflect on this"}
                  </button>
                )}
                {nudges[i] && (
                  <div className="sd-nudge">{nudges[i]}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {stone.timeNote && <div className="sd-time">{stone.timeNote}</div>}

        <div className="sd-walk">
          <span className="sd-walk-i">🚶</span>
          <span className="sd-walk-t">{stone.walkText}</span>
        </div>

        <div className="sd-actions">
          {isComplete ? (
            <>
              <span className="sd-done">Complete</span>
              <button className="btn-ghost" style={{padding:"9px 20px",fontSize:11}} onClick={onClose}>Return anytime</button>
            </>
          ) : isUnlocked ? (
            <>
              {!allAnswered && (
                <p className="sd-locked" style={{marginBottom:12}}>Answer each question to continue.</p>
              )}
              <button
                className={`sd-btn${stone.final?" bloom":""}`}
                onClick={handleComplete}
                disabled={!allAnswered}
                style={{opacity: allAnswered ? 1 : 0.4, cursor: allAnswered ? "pointer" : "default"}}
              >
                {stone.btnText}
              </button>
            </>
          ) : (
            <p className="sd-locked">Walk the previous stone first. The path opens one step at a time.</p>
          )}
        </div>
      </div>
    );
  };

  if (asSheet) return (
    <>
      <div className="bs-overlay" onClick={reflecting || reflection ? undefined : onClose}/>
      <div className="bs">
        <div className="bs-handle"/>
        {!reflecting && !reflection && <button className="bs-close" onClick={onClose}>✕</button>}
        {renderContent()}
      </div>
    </>
  );

  return renderContent();
}

// ─── GARDEN PATH PAGE ────────────────────────────────────────────────────────

function GardenPathPage({ onEnterSage }) {
  const [completed, setCompleted] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isUnlocked = idx => idx === 0 || completed.includes(STONES[idx - 1].id);
  const isComplete = id => completed.includes(id);
  const allComplete = completed.length === STONES.length;
  const progress = (completed.length / STONES.length) * 100;
  const selectedStone = STONES.find(s => s.id === selected);
  const selectedIdx = STONES.findIndex(s => s.id === selected);

  const completeStone = () => {
    if (!completed.includes(selected)) setCompleted(p => [...p, selected]);
    setSelected(null);
  };

  const handleEmailSubmit = () => {
    if (email.includes("@")) setEmailSubmitted(true);
  };

  return (
    <div className="gp-page">
      <div className="gp-header">
        <div className="gp-header-glow"/>
        <div className="gp-header-inner">
          <div className="eyebrow">The Garden Path</div>
          <h1 className="gp-h1">Five stones.<br/><em>No rushing.</em></h1>
          <p className="gp-sub">Tap each stone on the path to walk it. Complete all five and Sage begins working on your behalf. The path is always here to return to.</p>
          <div className="gp-research">
            <p className="gp-research-text">&ldquo;A psychologist spent 40 years studying over 3,000 couples. He could predict divorce with 94% accuracy by watching a couple interact for just a few minutes. What he was watching for had nothing to do with how compatible they were. It had everything to do with how well they knew themselves.&rdquo;</p>
            <p className="gp-research-attr">&mdash; Dr. John Gottman, University of Washington</p>
            <p className="gp-research-text" style={{marginTop:16}}>There is also a well-documented phenomenon called the bias blind spot &mdash; we are neurologically better at seeing self-delusion in others than in ourselves. We assume that because we have lived with ourselves for decades, we know ourselves.</p>
            <p className="gp-research-text" style={{marginTop:12,fontWeight:700}}>Having a library card does not mean you have read the books.</p>
            <p className="gp-research-text" style={{marginTop:12}}>The Garden Path is opening the books &mdash; and walking the stones with eyes wide open.</p>
          </div>
          <div className="gp-walk-method">
            <div className="gp-walk-method-label">The Walking Method</div>
            <p className="gp-walk-method-text">You know how solutions arrive in the shower? Not when you're trying to solve something — but the moment you stop? Walking works the same way. When your body is moving and your mind has nothing to grip, something underneath the thinking mind gets a chance to surface. That's not magic. That's how insight actually works. The walk after each stone isn't optional — it's where the real answer arrives.</p>
          </div>
          <p className="gp-phil">"The path is always here. So are you."</p>
        </div>
      </div>

      <div className="gp-prog">
        <div className="gp-prog-track"><div className="gp-prog-fill" style={{width:`${progress}%`}}/></div>
        <div className="gp-prog-label">{completed.length} / {STONES.length} stones</div>
      </div>

      {/* Email gate */}
      {!emailSubmitted ? (
        <div className="email-gate">
          <div className="email-gate-inner">
            <div className="email-gate-icon">🌿</div>
            <h2 className="email-gate-title">Before you begin</h2>
            <p className="email-gate-body">
              Your responses to each stone will be emailed to you at the end — a record of your own becoming. Enter your email to begin the path.
            </p>
            <div className="email-gate-form">
              <input
                className="email-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleEmailSubmit()}
              />
              <button
                className="sd-btn"
                onClick={handleEmailSubmit}
                disabled={!email.includes("@")}
                style={{opacity: email.includes("@") ? 1 : 0.45}}
              >
                Begin the Path
              </button>
            </div>
            <p className="email-gate-note">We will never share your email. Ever.</p>
          </div>
        </div>
      ) : (
        <>
        <div className="gp-body">
          <div className="gp-path-col">
            <div className="gp-path-sticky">
              <GardenPathSVG
                completed={completed}
                selected={selected}
                onSelect={setSelected}
                isMobile={isMobile}
              />
            </div>
          </div>

          {/* Desktop detail panel */}
          {!isMobile && (
            <div className="gp-detail-col">
              {allComplete && !selected ? (
                <div className="bloom-banner">
                  <div style={{fontSize:48,marginBottom:16}}>🌿</div>
                  <h2>You are blooming.</h2>
                  <p>Something in you is opening. Not finished — flowering. Sage will begin working on your behalf.</p>
                  <button className="sd-btn bloom" onClick={onEnterSage}>Enter Sage Matching</button>
                </div>
              ) : !selected ? (
                <p className="gp-empty">Tap a stone on the path<br/>to begin walking it.</p>
              ) : (
                <StoneDetail
                  stone={selectedStone}
                  isComplete={isComplete(selected)}
                  isUnlocked={isUnlocked(selectedIdx)}
                  onComplete={completeStone}
                  onClose={() => setSelected(null)}
                  asSheet={false}
                  email={email}
                />
              )}
            </div>
          )}
        </div>

        {/* Mobile bottom sheet */}
        {isMobile && selected && (
          <StoneDetail
            stone={selectedStone}
            isComplete={isComplete(selected)}
            isUnlocked={isUnlocked(selectedIdx)}
            onComplete={completeStone}
            onClose={() => setSelected(null)}
            asSheet={true}
            email={email}
          />
        )}

        {/* Mobile bloom banner */}
        {isMobile && allComplete && !selected && (
          <>
            <div className="bs-overlay" onClick={()=>{}}/>
            <div className="bs">
              <div className="bs-handle"/>
              <div style={{textAlign:"center",padding:"8px 0 16px"}}>
                <div style={{fontSize:48,marginBottom:16}}>🌿</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,fontWeight:600,color:"#0A1A0E",marginBottom:12}}>You are blooming.</div>
                <p style={{fontSize:13,lineHeight:1.88,color:"rgba(229,221,208,.48)",marginBottom:28}}>Something in you is opening. Not finished — flowering. Sage will begin working on your behalf.</p>
                <button className="sd-btn bloom" onClick={onEnterSage}>Enter Sage Matching</button>
              </div>
            </div>
          </>
        )}
        </>
      )}
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function SageApp() {
  const [tab, setTab] = useState("home");
  const [cardIdx, setCardIdx] = useState(0);
  const [swipe, setSwipe] = useState(null);
  const [matched, setMatched] = useState(false);
  const profile = PROFILES[cardIdx % PROFILES.length];
  const tierColor = t => t === "grove" ? "#A0522D" : "#A0522D";
  const doSwipe = dir => {
    if (swipe) return;
    setSwipe(dir);
    setTimeout(() => {
      if (dir === "right" && cardIdx === 1) setMatched(true);
      setCardIdx(i => i + 1);
      setSwipe(null);
    }, 380);
  };

  return (
    <div className="sage-root">
      <style>{CSS}</style>
      <div className="grain"/>
      <nav>
        <div className="logo" onClick={() => setTab("home")}>Sage</div>
        <div className="nav-r">
          <button className={`nbtn${tab==="home"?" active":""}`} onClick={() => setTab("home")}>Overview</button>
          <button className={`nbtn${tab==="path"?" active":""}`} onClick={() => setTab("path")}>The Garden Path</button>
          <button className={`nbtn${tab==="demo"?" active":""}`} onClick={() => setTab("demo")}>Try Demo</button>
        </div>
      </nav>

      {tab === "home" && <>
        <section className="hero">
          <div className="hero-glow"/>
          <div className="hero-content">
            <div className="eyebrow">Plant-based matchmaking</div>
            <h1 className="hero-h"><span style={{color:"#C2185B"}}>Bloom <span style={{fontSize:"1.3em",verticalAlign:"middle"}}>🌸</span></span><br/><em>in your own time.</em></h1>
            <p className="hero-body">Sage is a plant-based matchmaking platform built on one radical idea: you meet someone when you are truly ready. Not before.</p>
            <p className="hero-phil">"We don't rush seeds. We don't rush people."</p>
            <div className="hero-cta">
              <button className="btn-fill" onClick={() => setTab("path")}>Begin the Garden Path</button>
              <button className="btn-ghost" onClick={() => setTab("demo")}>See the Demo</button>
              <button className="btn-ghost" onClick={() => { window.location.href="mailto:brenda@brenda-brewer.com"; }}>Need extra help? Work With Us.</button>
            </div>
          </div>
          <div className="hero-float">
            {PROFILES.slice(0,3).map((p,i) => (
              <div className="fc" key={p.id} style={{animationDelay:`${i*.85}s`}}>
                <div className="fc-name">{p.emoji} {p.name}, {p.age}</div>
                <div className="fc-loc">{p.location}</div>
                <div className="fc-tags">{p.values.map(v=><span className="fc-tag" key={v}>{v}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="manifesto">
          <div style={{maxWidth:680}}>
            <p className="m-quote">"Swiping platforms want you addicted. Sage wants you to bloom."</p>
            <div className="m-attr">— The Sage Philosophy</div>
          </div>
        </div>

        <section className="sec">
          <div className="sec-ey">Membership</div>
          <h2 className="sec-h">Three depths.<br/><em>One philosophy.</em></h2>
          <p style={{fontSize:14,lineHeight:1.88,color:"rgba(229,221,208,.43)",maxWidth:500,marginTop:18,fontWeight:300}}>No subscriptions. No infinite swiping. Pay per date — prepared with care, held with intention.</p>
          <div className="tiers-grid">
            {TIERS.map(tier => (
              <div className="tier-card" key={tier.id} style={{borderTop:`2px solid ${tier.color}18`}}>
                {tier.badge && <div className="tier-badge-pill" style={{background:`${tier.color}12`,color:tier.color,border:`1px solid ${tier.color}30`}}>{tier.badge}</div>}
                <span className="tier-sym" style={{color:tier.color}}>{tier.symbol}</span>
                <div className="tier-name" style={{color:tier.color}}>{tier.name}</div>
                <div className="tier-tag">{tier.tagline}</div>
                <div className="tier-price">
                  <span className="tier-price-n" style={{color:tier.color}}>{tier.price}</span>
                  <span className="tier-price-d">{tier.priceDetail}</span>
                </div>
                <div className="tier-line"/>
                <p className="tier-desc">{tier.description}</p>
                <ul className="tier-features">{tier.features.map(f=><li key={f}>{f}</li>)}</ul>
                <p className="tier-phil">{tier.philosophy}</p>
                <button className="tcta" onClick={() => setTab("path")}
                  style={tier.ctaStyle==="fill"
                    ? {background:"#2D6640",color:"#F2EDE4",border:"none"}
                    : {background:"none",border:"2px solid #2D6640",color:"#2D6640"}}
                >{tier.cta}</button>
              </div>
            ))}
          </div>
        </section>

        <div className="botanical-divider">
          <svg viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="20" x2="160" y2="20" stroke="#2D6640" strokeOpacity="0.15" strokeWidth="1"/>
            <ellipse cx="200" cy="20" rx="8" ry="8" fill="#2D6640" fillOpacity="0.15"/>
            <ellipse cx="200" cy="20" rx="4" ry="4" fill="#2D6640" fillOpacity="0.25"/>
            <path d="M192 12 C194 8 198 7 200 7" stroke="#2D6640" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
            <path d="M208 12 C206 8 202 7 200 7" stroke="#2D6640" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
            <path d="M192 28 C194 32 198 33 200 33" stroke="#2D6640" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
            <path d="M208 28 C206 32 202 33 200 33" stroke="#2D6640" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
            <line x1="240" y1="20" x2="400" y2="20" stroke="#2D6640" strokeOpacity="0.15" strokeWidth="1"/>
          </svg>
        </div>

        <section className="sec">
          <div className="sec-ey">The experience</div>
          <h2 className="sec-h">Slow by design.<br/><em>Extraordinary by outcome.</em></h2>
          <div className="steps-grid">
            {[
              {n:"01",t:"Walk the Garden Path",b:"Start at Seed — free, always. Move through five stones at your own pace. There is no clock."},
              {n:"02",t:"Signal your readiness",b:"When Blooming completes, our team reviews your profile and begins the matching process."},
              {n:"03",t:"One curated date",b:"We select a partner vegan venue, prepare both parties, and arrange the meeting. $38 at Sage. $150 at Grove."},
            ].map(s=>(
              <div className="step" key={s.n}>
                <div className="step-n">{s.n}</div>
                <div className="step-t">{s.t}</div>
                <p className="step-b">{s.b}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="botanical-divider">
          <svg viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="20" x2="160" y2="20" stroke="#2D6640" strokeOpacity="0.15" strokeWidth="1"/>
            <ellipse cx="200" cy="20" rx="8" ry="8" fill="#2D6640" fillOpacity="0.15"/>
            <ellipse cx="200" cy="20" rx="4" ry="4" fill="#2D6640" fillOpacity="0.25"/>
            <path d="M192 12 C194 8 198 7 200 7" stroke="#2D6640" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
            <path d="M208 12 C206 8 202 7 200 7" stroke="#2D6640" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
            <path d="M192 28 C194 32 198 33 200 33" stroke="#2D6640" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
            <path d="M208 28 C206 32 202 33 200 33" stroke="#2D6640" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
            <line x1="240" y1="20" x2="400" y2="20" stroke="#2D6640" strokeOpacity="0.15" strokeWidth="1"/>
          </svg>
        </div>

        {/* LOGIC SECTION */}
        <section className="sec">
          <div className="sec-ey">Live Workshops</div>
          <h2 className="sec-h">Do the work.<br/><em>Together.</em></h2>
          <p style={{fontSize:15,lineHeight:1.88,color:"#3A1A10",maxWidth:560,marginTop:18,fontFamily:"'Nunito',sans-serif",fontWeight:500}}>
            Small, intimate workshops that deepen the Garden Path work. Led by Sage founder Brenda Brewer — plant-based, mindfulness teacher, relationship coach, and the person who built this platform from the ground up. Each workshop is a room where the real work happens.
          </p>
          <div className="workshops-grid">
            {[
              { name:"Garden Path Live", price:"$30", desc:"A facilitated walk through each stone — together. Bring your questions, your doubt, your readiness. Leave with more clarity than you arrived with.", when:"Monthly · Online & NYC", icon:"🌿" },
              { name:"The Logic of Love", price:"$25", desc:"A workshop on the stories we tell. We examine the faulty syllogisms, the stolen conclusions, the assumptions that have been running the show. Clear thinking is an act of love.", when:"Bi-monthly · Online", icon:"◎" },
              { name:"Patience as Practice", price:"$20", desc:"A walking workshop. We meet in Central Park, walk together, and sit with the questions. No agenda. No destination. Just the practice of slowing down.", when:"Monthly · Central Park, NYC", icon:"🚶" },
              { name:"Blooming Intensive", price:"$65", desc:"A half-day readiness intensive for those who have completed the Garden Path and are ready to take the final step. Small group. Deep work. The last thing before matching begins.", when:"Quarterly · NYC", icon:"✦" },
            ].map(w => (
              <div className="workshop-card" key={w.name}>
                <div className="workshop-icon">{w.icon}</div>
                <div className="workshop-price">{w.price}</div>
                <div className="workshop-name">{w.name}</div>
                <div className="workshop-when">{w.when}</div>
                <p className="workshop-desc">{w.desc}</p>
                <button className="workshop-btn">Reserve a Spot</button>
              </div>
            ))}
          </div>
        </section>

        <div className="botanical-divider">
          <svg viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="20" x2="160" y2="20" stroke="#2D6640" strokeOpacity="0.15" strokeWidth="1"/>
            <ellipse cx="200" cy="20" rx="8" ry="8" fill="#2D6640" fillOpacity="0.15"/>
            <ellipse cx="200" cy="20" rx="4" ry="4" fill="#2D6640" fillOpacity="0.25"/>
            <path d="M192 12 C194 8 198 7 200 7" stroke="#2D6640" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
            <path d="M208 12 C206 8 202 7 200 7" stroke="#2D6640" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
            <path d="M192 28 C194 32 198 33 200 33" stroke="#2D6640" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
            <path d="M208 28 C206 32 202 33 200 33" stroke="#2D6640" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
            <line x1="240" y1="20" x2="400" y2="20" stroke="#2D6640" strokeOpacity="0.15" strokeWidth="1"/>
          </svg>
        </div>

        <footer>
          <div className="footer-logo">Sage</div>
          <div className="footer-links">{["The Garden Path","Workshops","Memberships","Partner Venues","About","Contact"].map(l=><span key={l} className="fl">{l}</span>)}</div>
          <div className="footer-note">© 2026 Sage · Plant-based matchmaking built on intention · New York</div>
        </footer>
      </>}

      {tab === "path" && <GardenPathPage onEnterSage={() => setTab("demo")}/>}

      {tab === "demo" && (
        <section className="sec" style={{minHeight:"82vh",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
          <div className="sec-ey">Interactive demo</div>
          <h2 className="sec-h" style={{marginBottom:14}}>Meet who's<br/><em>walking the path.</em></h2>
          <p style={{fontSize:14,lineHeight:1.82,color:"#3A1A10",maxWidth:400,fontWeight:500,fontFamily:"'Nunito',sans-serif"}}>These profiles are from members who have completed at least two stones of the Garden Path.</p>
          <div className="demo-wrap">
            <div className="card-stage">
              <div className="card-bg"/>
              <div className={`pcard${swipe==="left"?" sl":swipe==="right"?" sr":""}`}>
                <div className="p-dot" style={{background:tierColor(profile.tier)}}/>
                <div className="p-emoji">{profile.emoji}</div>
                <div className="p-name">{profile.name}, {profile.age}</div>
                <div className="p-meta">{profile.location}</div>
                <p className="p-bio">{profile.bio}</p>
                <div className="p-tags">{profile.values.map(v=><span className="p-tag" key={v}>{v}</span>)}</div>
              </div>
            </div>
            <div className="card-btns">
              <button className="cbtn pass" onClick={()=>doSwipe("left")}>✕</button>
              <button className="cbtn like" onClick={()=>doSwipe("right")}>♡</button>
            </div>
            <p className="demo-hint">Pass or like · a match moment awaits</p>
            <button className="btn-ghost" style={{marginTop:32}} onClick={()=>setTab("home")}>← Back to Overview</button>
          </div>
          <div className="logic-section">
            <div className="logic-eyebrow">The Mathematics of Logic</div>
            <h3 className="logic-title">Why Sage thinks the way it does.</h3>
            <p className="logic-intro">Most of us walk around carrying conclusions we never chose. About animals. About love. About who shows up and who disappears. We built those conclusions from experiences that hurt — and then we called them facts.

Aristotle first described the syllogism around 350 BC. He was trying to answer a simple question: how do we know when we actually know something? The syllogism was his answer — a three-part structure that forces every conclusion to show its work. It has been the foundation of Western logic ever since. Sage uses it the same way Aristotle did: not to win arguments, but to find out what we actually believe.

Here are two examples. One about what we eat. One about who we love.</p>
            <div className="logic-grid">
              <div className="logic-story">

A man named Thomas grew up on a farm in Kentucky. His grandfather raised cattle. His father raised cattle. Thomas ate meat the way he breathed air — without deciding to.

One afternoon his daughter asked him where hamburgers came from. He told her. “I grew up on this farm. My grandfather raised cattle. His father raised cattle.”

She was quiet for a long time. Then she said: “But Daddy — did the cow want to?” Thomas had no answer.

He had never asked the question.

The premise — eating animals is natural and therefore right — had never been examined. That night he ran the logic again from the beginning.</div><div className="logic-card valid">
                <div className="logic-card-label valid-label">✓ Valid Argument</div>
                <div className="logic-card-title">The Ethics of What We Eat</div>
                <div className="logic-premises">
                  <div className="logic-premise"><span className="logic-p-label">P1</span><span className="logic-p-text">Torture is unethical.</span></div>
                  <div className="logic-premise"><span className="logic-p-label">P2</span><span className="logic-p-text">Modern factory farming tortures animals.</span></div>
                  <div className="logic-conclusion"><span className="logic-c-label">∴</span><span className="logic-c-text">Modern factory farming is unethical.</span></div>
                </div>
                <p className="logic-note">Both premises hold. The conclusion follows necessarily. This is why Sage is plant-based — not as a lifestyle preference, but as a logical conclusion.</p>
              </div>
              <div className="logic-story">

A woman named Diane had been on three great dates with a man named Marcus. The kind where you lose track of time. The kind where you’re already thinking about the fourth one on the way home.

Then he went quiet.

She waited three days. By day two she had already decided: he wasn’t serious. By day three she had decided: none of them ever are. By day four she had deleted the app.

What Diane didn’t know was that on day one, he had been in the emergency room with his mother. He called on day four. She couldn’t answer because she had already deleted the app.

The premise — he wasn’t serious — had no evidence.</div><div className="logic-card faulty">
                <div className="logic-card-label faulty-label">✗ Faulty Argument</div>
                <div className="logic-card-title">The Logic We Use in Love</div>
                <div className="logic-premises">
                  <div className="logic-premise"><span className="logic-p-label">P1</span><span className="logic-p-text">People who care always show up on time.</span></div>
                  <div className="logic-premise"><span className="logic-p-label">P2</span><span className="logic-p-text">He did not call when he said he would.</span></div>
                  <div className="logic-conclusion faulty-conc"><span className="logic-c-label">∴</span><span className="logic-c-text">Therefore, he does not care.</span></div>
                </div>
                <p className="logic-note">Premise 1 was never examined. It was assumed. This is what The Garden Path is for.</p>
              </div>
            </div>
            <p className="logic-footer">The same discipline that leads a clear thinker to veganism leads a Sage member to love. <em>Examine the premise. Run the logic again from the beginning.</em></p>
          </div>

          {/* LOGIC SECTION */}
          
        </section>
      )}

      {matched && (
        <div className="moverlay">
          <div className="mmodal">
            <div className="m-glyph">🌿</div>
            <div className="m-title">A Match</div>
            <p className="m-sub">You and <strong style={{color:"#A0522D"}}>Oren</strong> have expressed mutual interest.<br/>When you're both ready, we'll arrange the rest.</p>
            <p className="m-note">"We'll find the right venue, prepare you both, and hold the space for something real."</p>
            <div className="m-btns">
              <button className="m-fill" onClick={()=>setMatched(false)}>Continue the Path</button>
              <button className="m-skip" onClick={()=>setMatched(false)}>Keep Browsing</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
