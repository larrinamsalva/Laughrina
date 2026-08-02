const comedyModes = {
  "Porch Talk": { emoji: "🪑", note: "Everyday stories", jokes: [["I cleaned one corner of the room and immediately started acting like I had my life together.","suspiciously productive"],["I don't gossip. I provide emotionally accurate neighborhood updates.","community service"],["Some days I am a powerful warrior. Other days I lose my phone while holding it.","range"],["I sat down for five minutes and my body submitted a formal request to remain seated forever.","management is reviewing it"]] },
  "Read the Room": { emoji: "👀", note: "People-watching", jokes: [["Nothing tests your patience like someone saying ‘calm down’ while contributing absolutely no calm.","bold strategy"],["He entered the room with the confidence of a man who had never replayed a conversation at 2 a.m.","must be peaceful"],["Some people don't read the room. They skim the title and start a podcast.","volume one"],["You can tell a lot about a person by how quickly they make someone else's story about themselves.","speed networking"]] },
  "Animal Chaos": { emoji: "🐾", note: "Pets run the house", jokes: [["My dogs don't bark at danger. They bark because a leaf has made a personal decision.","security team"],["A cat will ignore the expensive bed and sleep inside the box it came in. Honestly, that's financial wisdom.","tiny accountant"],["I opened a snack quietly. Eight dogs appeared like I had activated a furry emergency broadcast system.","they heard the cheese"],["The dog watched me clean the floor, then brought in one leaf. Teamwork means different things to different species.","quality control"]] },
  "Truth Hits Different": { emoji: "✨", note: "Funny but real", jokes: [["Growth is realizing you don't need the last word. You just need a dramatic exit and a snack.","healing journey"],["Your ego is not your bodyguard. Sometimes it's just a loud intern with no training.","please revoke the badge"],["I forgive, but my memory keeps excellent meeting notes.","minutes approved"],["Being kind doesn't mean being available for nonsense during business hours.","office closed"]] },
  "RV Life": { emoji: "🚐", note: "Tiny home, big stories", jokes: [["RV living teaches minimalism. Mostly because every object is already touching three other objects.","open concept"],["In an RV, walking to the kitchen is one step. Somehow I still forget why I went there.","long journey"],["The weather said light rain. The RV park said character development.","waterfront property"],["You haven't known suspense until you hear a mystery sound inside an RV at midnight.","probably fine"]] },
  "Wildflower Wit": { emoji: "🌻", note: "Soft heart, sharp eye", jokes: [["I am one with nature, except mosquitoes. That relationship is currently in litigation.","boundaries"],["I talked to my plants today. They listened better than half the people I know.","strong listeners"],["Wildflowers don't ask permission to bloom. They also don't answer group texts, which feels healthy.","unavailable and thriving"],["I went outside to find peace and immediately stepped in something mysterious.","nature answered"]] }
};

const moods = [["😊","Need a smile","Porch Talk"],["😮‍💨","Long day","Animal Chaos"],["👀","I noticed something","Read the Room"],["🔥","Tiny bit spicy","Truth Hits Different"],["🎲","Surprise me","random"]];
const roasts = {1:["You are doing great. Your decision-making just occasionally wears flip-flops to a construction site.","You're not a mess. You're a limited-edition organizational mystery.","You have main-character energy and background-tab memory."],2:["You said ‘I got this’ with the confidence of someone who had not yet looked at the instructions.","Your attention span just left to investigate a noise in another room.","You're not avoiding the task. You're giving it time to think about what it did."],3:["That plan had confidence, glitter, and absolutely no adult supervision.","Your ego brought a microphone to a conversation that needed headphones.","You didn't miss the red flag. You admired the fabric and asked whether it came in purple."]};

const fartTypes = [
  {name:"Tiny Toot",emoji:"🌬️",pitch:180,duration:.35,stars:2,safety:"Adorable",comments:["Did somebody open a soda?","That fart apologized before it left.","A mouse somewhere just said, ‘Excuse you.’"]},
  {name:"Silent Assassin",emoji:"🤫",pitch:120,duration:1.15,stars:5,safety:"Delayed danger",comments:["The room will figure it out eventually.","No sound. Just consequences.","Maintain eye contact and deny everything."]},
  {name:"Tractor Pull",emoji:"🚜",pitch:135,duration:1.45,stars:4,safety:"Farm equipment",comments:["That wasn't a fart. That was a diesel engine asking for overtime.","Three dogs left and one cat filed a complaint.","Sounds expensive."]},
  {name:"Taco Tuesday",emoji:"🌮",pitch:155,duration:1.05,stars:5,safety:"Spicy emergency",comments:["The beans have entered the chat.","This is why the windows have handles.","Your stomach just launched a mariachi band."]},
  {name:"Rocket Booster",emoji:"🚀",pitch:175,duration:1.3,stars:5,safety:"Clear the launchpad",comments:["Houston, we have propulsion.","That fart achieved low Earth orbit.","Three... two... too late!"]},
  {name:"Wet & Risky",emoji:"🐸",pitch:115,duration:.95,stars:5,safety:"Do not trust",comments:["That one came with paperwork.","A brave choice in light-colored pants.","Never gamble on a fart after forty."]},
  {name:"Brass Section",emoji:"🎺",pitch:220,duration:.85,stars:3,safety:"Musical",comments:["In the key of B-flatulent.","The orchestra would like its tuba back.","That fart had a solo and an encore."]},
  {name:"Nuclear Option",emoji:"☢️",pitch:105,duration:1.9,stars:5,safety:"Evacuate immediately",comments:["That fart has its own weather system.","The wallpaper just curled up.","Code brown. Repeat: code brown."]}
];
const fortunes=["Today's wind becomes tomorrow's legend.","Beans remember.","A closed window reveals a true friend.","Some heroes wear capes. Others open windows.","Great pressure creates great stories.","The quietest breeze may carry the loudest lesson.","Never trust a silent room after taco night."];

const $=s=>document.querySelector(s), randomItem=a=>a[Math.floor(Math.random()*a.length)];
const moodGrid=$("#moodGrid"),modeGrid=$("#modeGrid"),jokeText=$("#jokeText"),jokeTag=$("#jokeTag"),modeLabel=$("#modeLabel"),nextButton=$("#nextButton"),favoriteButton=$("#favoriteButton"),favoritesList=$("#favoritesList"),favoriteCount=$("#favoriteCount"),roastSlider=$("#roastSlider"),roastButton=$("#roastButton"),themeButton=$("#themeButton"),clearFavorites=$("#clearFavorites");
let currentMode="Porch Talk",currentJoke={text:comedyModes[currentMode].jokes[0][0],tag:comedyModes[currentMode].jokes[0][1]},favorites=JSON.parse(localStorage.getItem("laughrina-favorites")||"[]"),windCount=Number(localStorage.getItem("laughrina-wind-count")||0);
function chooseRandomMode(){return randomItem(Object.keys(comedyModes));}
function showJoke(mode=currentMode){currentMode=mode==="random"?chooseRandomMode():mode;const [text,tag]=randomItem(comedyModes[currentMode].jokes);currentJoke={text,tag,mode:currentMode};jokeText.textContent=text;jokeTag.textContent=`— ${tag}`;modeLabel.textContent=currentMode.toUpperCase();document.querySelectorAll(".mode-button").forEach(b=>b.classList.toggle("active",b.dataset.mode===currentMode));updateFavoriteButton();}
function renderControls(){moods.forEach(([e,l,m])=>{const b=document.createElement("button");b.className="mood-chip";b.type="button";b.textContent=`${e} ${l}`;b.onclick=()=>showJoke(m);moodGrid.appendChild(b);});Object.entries(comedyModes).forEach(([n,d])=>{const b=document.createElement("button");b.className="mode-button";b.type="button";b.dataset.mode=n;b.innerHTML=`${d.emoji} ${n}<small>${d.note}</small>`;b.onclick=()=>showJoke(n);modeGrid.appendChild(b);});}
function isSaved(t){return favorites.some(i=>i.text===t);}function updateFavoriteButton(){const s=isSaved(currentJoke.text);favoriteButton.textContent=s?"♥ Saved":"♡ Save";favoriteButton.classList.toggle("saved",s);}function saveFavorites(){localStorage.setItem("laughrina-favorites",JSON.stringify(favorites));renderFavorites();updateFavoriteButton();}
function renderFavorites(){favoritesList.innerHTML="";favoriteCount.textContent=`${favorites.length} saved`;if(!favorites.length){favoritesList.innerHTML='<p class="empty-state">Your favorite jokes will wait here like snacks hidden from everybody else.</p>';return;}favorites.forEach((item,index)=>{const row=document.createElement("div");row.className="favorite-item";row.innerHTML=`<p><strong>${item.mode||"Laughrina"}</strong><br>${item.text}</p>`;const x=document.createElement("button");x.type="button";x.textContent="×";x.onclick=()=>{favorites.splice(index,1);saveFavorites();};row.appendChild(x);favoritesList.appendChild(row);});}
nextButton.onclick=()=>showJoke(currentMode);favoriteButton.onclick=()=>{favorites=isSaved(currentJoke.text)?favorites.filter(i=>i.text!==currentJoke.text):[currentJoke,...favorites];saveFavorites();};roastButton.onclick=()=>{const level=roastSlider.value;currentMode="Gentle Fire";currentJoke={text:randomItem(roasts[level]),tag:["warm tease","little crispy","truth with glitter"][level-1],mode:"Gentle Fire"};jokeText.textContent=currentJoke.text;jokeTag.textContent=`— ${currentJoke.tag}`;modeLabel.textContent="GENTLE FIRE";updateFavoriteButton();$(".stage-card").scrollIntoView({behavior:"smooth",block:"center"});};themeButton.onclick=()=>{document.body.classList.toggle("light");const light=document.body.classList.contains("light");themeButton.textContent=light?"☀":"☾";localStorage.setItem("laughrina-theme",light?"light":"dark");};clearFavorites.onclick=()=>{favorites=[];saveFavorites();};

let audioCtx;
async function playFart(type){
  const AudioCtx=window.AudioContext||window.webkitAudioContext;
  if(!AudioCtx)return;
  audioCtx ||= new AudioCtx({latencyHint:"interactive"});
  if(audioCtx.state==="suspended") await audioCtx.resume();

  const ctx=audioCtx, now=ctx.currentTime;
  const compressor=ctx.createDynamicsCompressor();
  compressor.threshold.value=-28;
  compressor.knee.value=8;
  compressor.ratio.value=12;
  compressor.attack.value=.002;
  compressor.release.value=.18;

  const master=ctx.createGain();
  master.gain.value=2.8;
  master.connect(compressor).connect(ctx.destination);

  const length=Math.floor(ctx.sampleRate*type.duration);
  const buffer=ctx.createBuffer(1,length,ctx.sampleRate);
  const data=buffer.getChannelData(0);
  let smooth=0;
  for(let i=0;i<length;i++){
    const t=i/ctx.sampleRate;
    const envelope=Math.sin(Math.PI*Math.min(1,t/type.duration));
    const flutter=.55+.45*Math.sin(2*Math.PI*(18+Math.random()*7)*t);
    smooth=smooth*.72+(Math.random()*2-1)*.28;
    data[i]=smooth*flutter*envelope*.95;
  }

  const noise=ctx.createBufferSource();
  noise.buffer=buffer;
  const band=ctx.createBiquadFilter();
  band.type="bandpass";
  band.frequency.value=Math.max(180,type.pitch*2.2);
  band.Q.value=.7;
  const noiseGain=ctx.createGain();
  noiseGain.gain.value=1.7;
  noise.connect(band).connect(noiseGain).connect(master);

  const osc=ctx.createOscillator();
  const oscGain=ctx.createGain();
  osc.type="square";
  osc.frequency.setValueAtTime(type.pitch,now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(75,type.pitch*.68),now+type.duration);
  oscGain.gain.setValueAtTime(.001,now);
  oscGain.gain.exponentialRampToValueAtTime(.8,now+.025);
  for(let i=1;i<8;i++)oscGain.gain.setValueAtTime(i%2?.75:.3,now+i*(type.duration/9));
  oscGain.gain.exponentialRampToValueAtTime(.001,now+type.duration);
  osc.connect(oscGain).connect(master);

  noise.start(now);
  osc.start(now);
  noise.stop(now+type.duration);
  osc.stop(now+type.duration+.03);
}

function chooseFart(type){playFart(type);windCount++;localStorage.setItem("laughrina-wind-count",windCount);$("#windCount").textContent=windCount;$("#fartEmoji").textContent=type.emoji;$("#fartName").textContent=type.name.toUpperCase();$("#fartComment").textContent=randomItem(type.comments);$("#fartStars").textContent="★".repeat(type.stars)+"☆".repeat(5-type.stars);$("#safetyRating").textContent=`Public safety: ${type.safety}`;$(".fart-result").classList.remove("puff");void $(".fart-result").offsetWidth;$(".fart-result").classList.add("puff");}
function renderFarts(){const grid=$("#fartGrid");fartTypes.forEach(type=>{const b=document.createElement("button");b.className="fart-button";b.type="button";b.innerHTML=`<span>${type.emoji}</span><strong>${type.name}</strong>`;b.onclick=()=>chooseFart(type);grid.appendChild(b);});$("#windCount").textContent=windCount;$("#regretButton").onclick=()=>chooseFart(randomItem(fartTypes));$("#fortuneButton").onclick=()=>{$("#fortuneText").textContent=`🥠 “${randomItem(fortunes)}”`;};}
if(localStorage.getItem("laughrina-theme")==="light"){document.body.classList.add("light");themeButton.textContent="☀";}renderControls();renderFavorites();renderFarts();showJoke("Porch Talk");