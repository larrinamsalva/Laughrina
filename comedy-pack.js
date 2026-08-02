// Expanded original comedy library for Laughrina Studio.
// Loaded after app.js so every existing mode gains a much deeper rotation.

const extraComedy = {
  "Porch Talk": [
    ["I made a to-do list so organized I needed a nap just from looking at it.", "administrative exhaustion"],
    ["I went into the kitchen for one thing and came back with a snack, a spoon, and no memory of the mission.", "side quest completed"],
    ["I finally folded the laundry. Now it lives permanently in a clean pile with management potential.", "promotion pending"],
    ["My house is not cluttered. It is displaying several unfinished thoughts at once.", "open-concept thinking"],
    ["I said I would sit down for five minutes. My body heard 'retire immediately.'", "early retirement"],
    ["I opened the refrigerator three times like new food might spawn if I showed enough commitment.", "loot box"],
    ["I don't procrastinate. I let ideas marinate until the deadline adds flavor.", "seasoned panic"],
    ["I cleaned the whole room except for one chair. That chair is now the regional clothing department.", "retail expansion"],
    ["I bought a planner to become organized. I currently do not know where the planner is.", "successful mystery"],
    ["Nothing makes you feel rich like finding twenty dollars in a coat you already own.", "personal stimulus check"],
    ["I was going to be productive today, but the couch presented a very convincing counterargument.", "motion denied"],
    ["I put something somewhere safe. It has now entered witness protection.", "identity concealed"]
  ],
  "Read the Room": [
    ["Some people bring energy into a room. Others bring a full presentation about themselves.", "slides included"],
    ["He didn't interrupt the conversation. He simply replaced it with his autobiography.", "unauthorized reboot"],
    ["Nothing says confidence like being loudly wrong before anyone has finished the question.", "fast-track certainty"],
    ["She said, 'I hate drama,' with the tone of someone arriving with three seasons already filmed.", "renewed for season four"],
    ["Some people listen to understand. Others wait for a breathing gap so they can restart their podcast.", "commercial break"],
    ["He walked in with enough ego to require its own parking spot.", "oversized vehicle"],
    ["You ever meet someone whose apology somehow gives you homework?", "action items attached"],
    ["They said, 'No offense,' and then assembled the offense in front of everybody.", "some assembly required"],
    ["She can turn any conversation into a competition, including who is more relaxed.", "national champion of calm"],
    ["Some people do not cross boundaries. They redecorate them and ask why you're upset.", "unauthorized renovation"],
    ["He didn't miss the point. He drove past it, waved, and opened a different business.", "new location"],
    ["The room got quiet and somehow he took that as encouragement.", "signal misread"]
  ],
  "Animal Chaos": [
    ["My dog heard a wrapper open from three rooms away but somehow cannot hear his own name from four feet.", "selective acoustics"],
    ["The cat pushed a glass toward the edge while maintaining eye contact. That was not curiosity. That was policy.", "terms enforced"],
    ["My dogs protect the house from delivery drivers and then welcome every actual moth like family.", "security priorities"],
    ["I bought my pet an expensive toy. He prefers the receipt and one mysterious sock.", "luxury rejected"],
    ["A dog will stare at you eating like you personally canceled dinner.", "betrayal documented"],
    ["The cat woke me up at 4 a.m. because apparently sunrise requires supervision.", "management shift"],
    ["My dog brought me a stick too large for the doorway, then looked at me like architecture had failed him.", "building complaint"],
    ["Pets do not understand personal space. They understand available body heat.", "shared utilities"],
    ["I swept the floor and the dog immediately shook himself like he had been waiting for a clean canvas.", "artistic collaboration"],
    ["A cat can hear a can open in another zip code but ignores every direct question.", "legal counsel advised silence"],
    ["My dog chased his tail for ten minutes and still seemed shocked it followed him home.", "ongoing investigation"],
    ["I told the animals to settle down. They formed a committee and rejected the proposal.", "motion defeated"]
  ],
  "Truth Hits Different": [
    ["Healing is realizing closure sometimes looks like blocking the number and making tacos.", "ceremony complete"],
    ["Not every opinion deserves a front-row seat in your nervous system.", "tickets revoked"],
    ["A boundary is not rude just because someone enjoyed you without one.", "free trial ended"],
    ["You can forgive somebody and still remove their key to the building.", "access updated"],
    ["Growth is when the old argument calls and you let it go to voicemail.", "peace is screening calls"],
    ["Some lessons arrive as wisdom. Others arrive wearing red flags and asking to borrow money.", "tuition was expensive"],
    ["Being the bigger person is exhausting. Sometimes I would like to be medium-sized and well-rested.", "reasonable dimensions"],
    ["Your peace does not need a debate team.", "case dismissed"],
    ["Maturity is knowing you could say it, but choosing a snack and silence instead.", "appeal withdrawn"],
    ["You are allowed to outgrow people who only liked the version of you with no boundaries.", "software updated"],
    ["Confidence is quiet. Ego keeps checking whether everybody noticed it arrived.", "attendance confirmed"],
    ["The truth does not always yell. Sometimes it just stops explaining itself.", "final notice"]
  ],
  "RV Life": [
    ["In an RV, misplacing something means it is either two feet away or gone forever.", "tiny Bermuda Triangle"],
    ["RV storage is a game where every useful object is behind the one thing you never use.", "expert mode"],
    ["You have not experienced trust until someone uses the bathroom while the RV is moving.", "relationship milestone"],
    ["Every RV has one cabinet that opens during travel like it is trying to escape.", "parole attempt"],
    ["The RV refrigerator has two temperatures: frozen lettuce and suspicious milk.", "precision cooling"],
    ["When the whole RV shakes, you first check the wind and then count the dogs.", "standard procedure"],
    ["RV life is learning that one extension cord can determine the mood of an entire household.", "power diplomacy"],
    ["A mystery drip in an RV turns everybody into a plumber, detective, and spiritual negotiator.", "three new careers"],
    ["The campground said the site was level. The coffee sliding off the table filed a disagreement.", "independent review"],
    ["In a regular house, you walk away from an argument. In an RV, you rotate slightly.", "personal space achieved"],
    ["Every RV repair begins with confidence and ends with six screws left over.", "bonus hardware"],
    ["The awning only behaves when there is no wind, no rain, and no audience.", "performance anxiety"]
  ],
  "Wildflower Wit": [
    ["I went outside to ground myself. Nature assigned me three mosquito bites and a pinecone in my shoe.", "session complete"],
    ["My plants are thriving because they receive water, sunlight, and none of my unsolicited advice.", "healthy leadership"],
    ["I asked the universe for a sign. A bird pooped near me. The message lacked detail.", "clarification requested"],
    ["Gardening is mostly moving dirt around while pretending you understand timing.", "earth management"],
    ["The weeds in my yard have confidence, resilience, and apparently a five-year expansion plan.", "aggressive growth"],
    ["I bought one plant for peace. Now I run a tiny hospital with seventeen dramatic patients.", "botanical emergency room"],
    ["Nature is healing, but it is also full of bugs who do not respect emotional journeys.", "boundaries ignored"],
    ["A flower can bloom through concrete, and I still need three alarms to get out of bed.", "different strengths"],
    ["I whispered encouragement to a plant and accidentally became emotionally responsible for it.", "adoption finalized"],
    ["The moon was beautiful, the air was peaceful, and then I walked into a spiderweb.", "plot twist"],
    ["I love being one with nature until nature starts crawling up my pant leg.", "unity paused"],
    ["Trees lose their leaves every year without posting a dramatic explanation. Inspirational.", "quiet rebrand"]
  ]
};

Object.entries(extraComedy).forEach(([modeName, jokes]) => {
  if (modes[modeName]) modes[modeName].jokes.push(...jokes);
});

roasts[1].push(
  "You are not disorganized. Your belongings are participating in an unsupervised scavenger hunt.",
  "You have excellent instincts. They just occasionally take the scenic route.",
  "Your brain has twenty-seven tabs open and one of them is playing music somewhere.",
  "You are doing your best, and your best currently has snacks in its pocket.",
  "Your schedule is less of a plan and more of a hopeful suggestion.",
  "You bring sparkle everywhere, including places that specifically requested a broom."
);

roasts[2].push(
  "You approached that simple task like it had three seasons and a surprise villain.",
  "Your attention span saw a squirrel and left no forwarding address.",
  "You keep saying 'almost done' like time cannot hear you.",
  "Your plan has tremendous confidence for something held together by one reminder and a screenshot.",
  "You did not ignore the instructions. You gave them the freedom to express themselves elsewhere.",
  "You have the follow-through of a shopping cart with one bad wheel."
);

roasts[3].push(
  "That decision had all the structural integrity of a lawn chair in a hurricane.",
  "Your ego arrived early, took the microphone, and forgot the material.",
  "You saw the warning signs and treated them like decorative bunting.",
  "That excuse has been reheated so many times it now qualifies as leftovers.",
  "You are not late to the lesson. You are entering dramatically during the final exam.",
  "Your logic took a smoke break and never clocked back in."
);
