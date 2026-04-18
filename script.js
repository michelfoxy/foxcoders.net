const folderButton = document.querySelector("#folderButton");
const projectShell = document.querySelector("#projectShell");
const newButton = document.querySelector("#newButton");
const commandMenu = document.querySelector("#commandMenu");
const commandTypeButtons = document.querySelectorAll(".command-type");
const categoryTabs = document.querySelectorAll(".cat-tab");
const paletteList = document.querySelector("#paletteList");
const paletteHint = document.querySelector("#paletteHint");
const scriptArea = document.querySelector("#scriptArea");
const resetProgram = document.querySelector("#resetProgram");
const shareProject = document.querySelector("#shareProject");
const shareStatus = document.querySelector("#shareStatus");
const foxSprite = document.querySelector("#foxSprite");
const stageSpriteName = document.querySelector(".stage-sprite-name");
const openSpriteLibrary = document.querySelector("#openSpriteLibrary");
const closeSpriteLibrary = document.querySelector("#closeSpriteLibrary");
const spriteModal = document.querySelector("#spriteModal");
const spriteSearch = document.querySelector("#spriteSearch");
const spriteGrid = document.querySelector("#spriteGrid");
const greenFlag = document.querySelector("#greenFlag");
const stopButton = document.querySelector("#stopButton");
const openCostumes = document.querySelector("#openCostumes");
const closeCostumes = document.querySelector("#closeCostumes");
const costumesModal = document.querySelector("#costumesModal");
const costumeList = document.querySelector("#costumeList");
const addCostume = document.querySelector("#addCostume");
const costumeSpeed = document.querySelector("#costumeSpeed");
const costumeSpeedLabel = document.querySelector("#costumeSpeedLabel");

let costumes = [{ name: "Fox", file: "fox.svg" }];
let currentCostumeIndex = 0;
let animationTimer = null;
let spritePickerMode = "sprite";

const spriteLibrary = [
  { name: "Fox", file: "fox.svg", tags: ["fox", "animal", "wild", "orange"] },
  { name: "Cat", file: "cat.svg", tags: ["cat", "kitty", "animal", "pet"] },
  { name: "Dog", file: "dog.svg", tags: ["dog", "puppy", "animal", "pet"] },
  { name: "Dragon", file: "dragon.svg", tags: ["dragon", "fantasy", "animal", "fire"] },
  { name: "Frog", file: "frog.svg", tags: ["frog", "animal", "green", "pond"] },
  { name: "Bee", file: "bee.svg", tags: ["bee", "bug", "insect", "animal", "honey"] },
  { name: "Fish", file: "fish.svg", tags: ["fish", "animal", "ocean", "sea", "water"] },
  { name: "Unicorn", file: "unicorn.svg", tags: ["unicorn", "animal", "magic", "fantasy", "horse"] },
  { name: "Dinosaur", file: "dinosaur.svg", tags: ["dinosaur", "dino", "animal", "rex"] },
  { name: "Panda", file: "panda.svg", tags: ["panda", "bear", "animal"] },
  { name: "Rocket", file: "rocket.svg", tags: ["rocket", "ship", "space", "thing", "vehicle"] },
  { name: "Robot", file: "robot.svg", tags: ["robot", "bot", "machine", "thing"] },
  { name: "Ghost", file: "ghost.svg", tags: ["ghost", "spooky", "halloween", "thing"] },
  { name: "Crown", file: "crown.svg", tags: ["crown", "king", "queen", "thing", "royal"] },
  { name: "Star", file: "star.svg", tags: ["star", "shape", "thing", "yellow"] },
  { name: "Heart", file: "heart.svg", tags: ["heart", "love", "shape", "thing"] },
  { name: "Apple", file: "apple.svg", tags: ["apple", "fruit", "food", "red"] },
  { name: "Pizza", file: "pizza.svg", tags: ["pizza", "food", "slice"] }
];

const colorMap = {
  motion: "var(--scratch-blue)",
  looks: "#8a55d7",
  sound: "#cf63cf",
  events: "var(--scratch-yellow)",
  control: "var(--scratch-orange)",
  sensing: "var(--scratch-cyan)",
  operators: "var(--scratch-green)",
  variables: "#ff8c1a",
  myblocks: "#ff6ca8"
};

const categoryLabels = {
  motion: "Motion",
  looks: "Looks",
  sound: "Sound",
  events: "Events",
  control: "Control",
  sensing: "Sensing",
  operators: "Operators",
  variables: "Variables",
  myblocks: "My Blocks"
};

const blockCatalog = {
  motion: [
    "move (10) steps",
    "turn clockwise (15) degrees",
    "turn counterclockwise (15) degrees",
    "go to x: (0) y: (0)",
    "go to [random position]",
    "glide (1) secs to x: (0) y: (0)",
    "point in direction (90)",
    "point towards [mouse-pointer]",
    "change x by (10)",
    "set x to (0)",
    "change y by (10)",
    "set y to (0)",
    "if on edge, bounce",
    "set rotation style [all around]",
    "x position",
    "y position",
    "direction"
  ],
  looks: [
    "say [Hello!] for (2) seconds",
    "say [Hello!]",
    "think [Hmm...] for (2) seconds",
    "think [Hmm...]",
    "switch costume to [costume1]",
    "next costume",
    "switch backdrop to [backdrop1]",
    "next backdrop",
    "change size by (10)",
    "set size to (100)%",
    "show",
    "hide",
    "go to front layer",
    "go forward (1) layers"
  ],
  sound: [
    "start sound [pop]",
    "play sound [pop] until done",
    "stop all sounds",
    "change [pitch] effect by (10)",
    "set [pitch] effect to (100)",
    "clear sound effects",
    "change volume by (-10)",
    "set volume to (100)%",
    "volume"
  ],
  events: [
    "when green flag clicked",
    "when [space] key pressed",
    "when this sprite clicked",
    "when backdrop switches to [backdrop1]",
    "when [loudness] > (10)",
    "when I receive [message1]",
    "broadcast [message1]",
    "broadcast [message1] and wait"
  ],
  control: [
    "wait (1) seconds",
    "repeat (10)",
    "forever",
    "if <> then",
    "if <> then else",
    "wait until <>",
    "repeat until <>",
    "stop [all]",
    "when I start as a clone",
    "create clone of [myself]",
    "delete this clone"
  ],
  sensing: [
    "touching [mouse-pointer]?",
    "touching color [#00aaff]?",
    "color [#00aaff] is touching [#ff55aa]?",
    "distance to [mouse-pointer]",
    "ask [What's your name?] and wait",
    "answer",
    "key [space] pressed?",
    "mouse down?",
    "mouse x",
    "mouse y",
    "set drag mode [draggable]",
    "loudness",
    "timer",
    "reset timer",
    "current [year]",
    "days since 2000",
    "username"
  ],
  operators: [
    "() + ()",
    "() - ()",
    "() * ()",
    "() / ()",
    "pick random (1) to (10)",
    "<() > ()>",
    "<() < ()>",
    "<() = ()>",
    "<() and ()>",
    "<() or ()>",
    "<not ()>",
    "join [hello ] [world]",
    "letter (1) of [apple]",
    "length of [apple]",
    "[apple] contains [a]?",
    "() mod ()",
    "round ()",
    "[abs] of ()"
  ],
  variables: [],
  myblocks: []
};

folderButton.addEventListener("click", () => {
  openEditor();
  setActiveCategoryTab("motion");
  renderCategory("motion", categoryLabels.motion);
  paletteHint.textContent =
    "Click a category tab for all blocks in that group. Use New for Variables or My Blocks.";
});

newButton.addEventListener("click", () => {
  const isHidden = commandMenu.hasAttribute("hidden");
  if (isHidden) {
    commandMenu.removeAttribute("hidden");
    newButton.setAttribute("aria-expanded", "true");
  } else {
    commandMenu.setAttribute("hidden", "");
    newButton.setAttribute("aria-expanded", "false");
  }
});

categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.category;
    setActiveCategoryTab(category);
    renderCategory(category, categoryLabels[category] || category);
  });
});

commandTypeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.classList[1];
    clearCategoryTabActive();
    renderCategory(category, button.textContent);
    commandMenu.setAttribute("hidden", "");
    newButton.setAttribute("aria-expanded", "false");
  });
});

resetProgram.addEventListener("click", () => {
  paletteHint.textContent =
    "Click a category tab for all blocks in that group. Use New for Variables or My Blocks.";
  clearScriptArea();
  replaceUrlHash("");
});

shareProject.addEventListener("click", async () => {
  const blocks = getBlocksFromScript();
  const encoded = encodeProject(blocks);
  const shareUrl = buildShareUrl(encoded);
  try {
    await navigator.clipboard.writeText(shareUrl);
    showShareStatus("Link copied! Send it so others can open your project.");
  } catch {
    window.prompt("Copy this link to share your project:", shareUrl);
    showShareStatus("Copy the link from the box above to share.");
  }
  replaceUrlHash(encoded);
});

document.addEventListener("click", (event) => {
  const clickedInsideMenu = commandMenu.contains(event.target);
  const clickedNewButton = newButton.contains(event.target);
  if (!clickedInsideMenu && !clickedNewButton) {
    commandMenu.setAttribute("hidden", "");
    newButton.setAttribute("aria-expanded", "false");
  }
});

function openEditor() {
  projectShell.classList.add("is-open");
}

function setActiveCategoryTab(category) {
  categoryTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.category === category);
  });
}

function clearCategoryTabActive() {
  categoryTabs.forEach((tab) => tab.classList.remove("active"));
}

function renderCategory(category, label) {
  paletteList.innerHTML = "";
  paletteHint.textContent = `${label} — all blocks`;

  if (category === "variables") {
    renderMakeOnly(category, "Make a Variable");
    return;
  }

  if (category === "myblocks") {
    renderMakeOnly(category, "Make a Block");
    return;
  }

  const blockList = blockCatalog[category] || [];
  blockList.forEach((blockText) => {
    const paletteItem = document.createElement("li");
    const paletteButton = document.createElement("button");
    paletteButton.type = "button";
    paletteButton.className = `palette-block ${category}`;
    paletteButton.textContent = blockText;
    paletteButton.addEventListener("click", () => {
      addScriptBlock(blockText, category);
    });
    paletteItem.appendChild(paletteButton);
    paletteList.appendChild(paletteItem);
  });
}

function renderMakeOnly(category, label) {
  const infoItem = document.createElement("li");
  infoItem.className = "palette-note";
  infoItem.textContent = "This list is empty.";

  const buttonItem = document.createElement("li");
  const makeButton = document.createElement("button");
  makeButton.type = "button";
  makeButton.className = `palette-block make-button ${category}`;
  makeButton.textContent = label;
  makeButton.addEventListener("click", () => {
    addScriptBlock(label, category);
  });

  buttonItem.appendChild(makeButton);
  paletteList.appendChild(infoItem);
  paletteList.appendChild(buttonItem);
}

function addScriptBlock(text, blockType) {
  if (scriptArea.textContent === "No blocks yet.") {
    scriptArea.innerHTML = "";
  }

  const block = document.createElement("span");
  block.className = "script-block";
  block.textContent = text;
  block.dataset.type = blockType;
  block.style.background = colorMap[blockType] || "var(--scratch-blue)";
  if (blockType === "events" || blockType === "control") {
    block.classList.add("dark-text");
  }
  scriptArea.appendChild(block);
}

function clearScriptArea() {
  scriptArea.textContent = "No blocks yet.";
}

function getBlocksFromScript() {
  return [...scriptArea.querySelectorAll(".script-block")].map((el) => ({
    t: el.dataset.type || "motion",
    x: el.textContent
  }));
}

function encodeProject(blocks) {
  const json = JSON.stringify(blocks);
  return btoa(unescape(encodeURIComponent(json)));
}

function decodeProject(encoded) {
  const json = decodeURIComponent(escape(atob(encoded)));
  return JSON.parse(json);
}

function buildShareUrl(encodedPayload) {
  const url = new URL(window.location.href);
  const safe = encodeURIComponent(encodedPayload);
  url.hash = `p=${safe}`;
  return url.toString();
}

function replaceUrlHash(encodedPayload) {
  const url = new URL(window.location.href);
  url.hash = encodedPayload
    ? `p=${encodeURIComponent(encodedPayload)}`
    : "";
  history.replaceState(null, "", url.toString());
}

function showShareStatus(message) {
  shareStatus.textContent = message;
  shareStatus.removeAttribute("hidden");
  window.setTimeout(() => {
    shareStatus.setAttribute("hidden", "");
  }, 4500);
}

function tryLoadSharedProject() {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("p");
  const fromHash =
    window.location.hash.startsWith("#p=") &&
    window.location.hash.slice(3);

  const raw = (fromHash || fromQuery || "").trim();
  const decodedPayload = raw ? decodeURIComponent(raw) : "";
  if (!decodedPayload) {
    return false;
  }

  try {
    const blocks = decodeProject(decodedPayload);
    if (!Array.isArray(blocks)) {
      return false;
    }
    openEditor();
    setActiveCategoryTab("motion");
    renderCategory("motion", categoryLabels.motion);
    paletteHint.textContent =
      "Shared project loaded. Add more blocks or use Share project to send an updated link.";
    scriptArea.innerHTML = "";
    blocks.forEach((b) => {
      if (b && typeof b.x === "string" && typeof b.t === "string") {
        addScriptBlock(b.x, b.t);
      }
    });
    if (scriptArea.children.length === 0) {
      clearScriptArea();
    }
    return true;
  } catch {
    return false;
  }
}

openSpriteLibrary.addEventListener("click", () => {
  spritePickerMode = "sprite";
  document.querySelector(".sprite-modal-head h3").textContent = "Choose a Sprite";
  spriteSearch.value = "";
  renderSprites("");
  spriteModal.removeAttribute("hidden");
  window.setTimeout(() => spriteSearch.focus(), 0);
});

closeSpriteLibrary.addEventListener("click", closeSpriteModal);

spriteModal.addEventListener("click", (event) => {
  if (event.target === spriteModal) {
    closeSpriteModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !spriteModal.hasAttribute("hidden")) {
    closeSpriteModal();
  }
});

spriteSearch.addEventListener("input", () => {
  renderSprites(spriteSearch.value);
});

function closeSpriteModal() {
  spriteModal.setAttribute("hidden", "");
}

function renderSprites(query) {
  const q = query.trim().toLowerCase();
  spriteGrid.innerHTML = "";

  const matches = spriteLibrary.filter((sprite) => {
    if (!q) return true;
    if (sprite.name.toLowerCase().includes(q)) return true;
    return sprite.tags.some((tag) => tag.includes(q));
  });

  if (matches.length === 0) {
    const empty = document.createElement("li");
    empty.className = "sprite-empty";
    empty.textContent = `No sprites match "${query}". Try cat, food, or animal.`;
    spriteGrid.appendChild(empty);
    return;
  }

  matches.forEach((sprite) => {
    const item = document.createElement("li");
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "sprite-tile";

    const img = document.createElement("img");
    img.src = `sprites/${sprite.file}`;
    img.alt = "";

    const label = document.createElement("span");
    label.textContent = sprite.name;

    tile.appendChild(img);
    tile.appendChild(label);
    tile.addEventListener("click", () => {
      pickSprite(sprite);
    });

    item.appendChild(tile);
    spriteGrid.appendChild(item);
  });
}

function pickSprite(sprite) {
  if (spritePickerMode === "costume") {
    costumes.push({ name: sprite.name, file: sprite.file });
    renderCostumes();
    closeSpriteModal();
    if (costumesModal.hasAttribute("hidden")) {
      costumesModal.removeAttribute("hidden");
    }
    return;
  }

  stopAnimation();
  costumes = [{ name: sprite.name, file: sprite.file }];
  currentCostumeIndex = 0;
  foxSprite.src = `sprites/${sprite.file}`;
  foxSprite.alt = `${sprite.name} sprite`;
  stageSpriteName.textContent = `Sprite: ${sprite.name}`;
  openCostumes.removeAttribute("hidden");
  renderCostumes();
  closeSpriteModal();
}

function setCostume(index) {
  if (index < 0 || index >= costumes.length) return;
  currentCostumeIndex = index;
  const c = costumes[index];
  foxSprite.src = `sprites/${c.file}`;
  foxSprite.alt = `${c.name} costume`;
  renderCostumes();
}

function renderCostumes() {
  costumeList.innerHTML = "";
  costumes.forEach((c, i) => {
    const li = document.createElement("li");
    li.className = "costume-row" + (i === currentCostumeIndex ? " is-current" : "");

    const thumb = document.createElement("div");
    thumb.className = "costume-thumb";
    const img = document.createElement("img");
    img.src = `sprites/${c.file}`;
    img.alt = "";
    thumb.appendChild(img);

    const meta = document.createElement("div");
    meta.className = "costume-meta";
    const idx = document.createElement("span");
    idx.className = "costume-index";
    idx.textContent = `Costume ${i + 1}`;
    const name = document.createElement("span");
    name.className = "costume-name";
    name.textContent = c.name;
    meta.appendChild(idx);
    meta.appendChild(name);

    const actions = document.createElement("div");
    actions.className = "costume-actions";

    const pickBtn = document.createElement("button");
    pickBtn.type = "button";
    pickBtn.textContent = "Show";
    pickBtn.addEventListener("click", () => setCostume(i));

    const upBtn = document.createElement("button");
    upBtn.type = "button";
    upBtn.textContent = "↑";
    upBtn.disabled = i === 0;
    upBtn.addEventListener("click", () => moveCostume(i, -1));

    const downBtn = document.createElement("button");
    downBtn.type = "button";
    downBtn.textContent = "↓";
    downBtn.disabled = i === costumes.length - 1;
    downBtn.addEventListener("click", () => moveCostume(i, 1));

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "delete";
    delBtn.textContent = "✕";
    delBtn.disabled = costumes.length <= 1;
    delBtn.addEventListener("click", () => deleteCostume(i));

    actions.appendChild(pickBtn);
    actions.appendChild(upBtn);
    actions.appendChild(downBtn);
    actions.appendChild(delBtn);

    li.appendChild(thumb);
    li.appendChild(meta);
    li.appendChild(actions);
    costumeList.appendChild(li);
  });
}

function moveCostume(index, delta) {
  const target = index + delta;
  if (target < 0 || target >= costumes.length) return;
  const [item] = costumes.splice(index, 1);
  costumes.splice(target, 0, item);
  if (currentCostumeIndex === index) currentCostumeIndex = target;
  else if (currentCostumeIndex === target) currentCostumeIndex = index;
  renderCostumes();
}

function deleteCostume(index) {
  if (costumes.length <= 1) return;
  costumes.splice(index, 1);
  if (currentCostumeIndex >= costumes.length) {
    currentCostumeIndex = costumes.length - 1;
  }
  setCostume(currentCostumeIndex);
}

openCostumes.addEventListener("click", () => {
  costumesModal.removeAttribute("hidden");
  renderCostumes();
});

closeCostumes.addEventListener("click", () => {
  costumesModal.setAttribute("hidden", "");
});

costumesModal.addEventListener("click", (event) => {
  if (event.target === costumesModal) {
    costumesModal.setAttribute("hidden", "");
  }
});

addCostume.addEventListener("click", () => {
  spritePickerMode = "costume";
  document.querySelector(".sprite-modal-head h3").textContent = "Add a Costume";
  spriteSearch.value = "";
  renderSprites("");
  spriteModal.removeAttribute("hidden");
  window.setTimeout(() => spriteSearch.focus(), 0);
});

costumeSpeed.addEventListener("input", () => {
  costumeSpeedLabel.textContent = `${costumeSpeed.value} ms / costume`;
  if (animationTimer) {
    stopAnimation();
    startAnimation();
  }
});

function startAnimation() {
  if (animationTimer) return;
  greenFlag.classList.add("is-active");
  stopButton.classList.remove("is-active");
  if (costumes.length <= 1) {
    foxSprite.classList.add("is-running");
    return;
  }
  const tick = () => {
    setCostume((currentCostumeIndex + 1) % costumes.length);
  };
  animationTimer = window.setInterval(tick, parseInt(costumeSpeed.value, 10));
}

function stopAnimation() {
  if (animationTimer) {
    window.clearInterval(animationTimer);
    animationTimer = null;
  }
  greenFlag.classList.remove("is-active");
  stopButton.classList.add("is-active");
  window.setTimeout(() => stopButton.classList.remove("is-active"), 350);
}

const stageCanvas = document.querySelector(".stage-canvas");

const sprite = {
  x: 0,
  y: 0,
  direction: 90,
  size: 100,
  visible: true,
  rotationStyle: "all around",
  bubbleEl: null
};

let scriptRunId = 0;
let scriptRunning = false;
let scriptAbort = null;

function applySpriteTransform() {
  let rot = sprite.direction - 90;
  let flipX = 1;
  if (sprite.rotationStyle === "left-right") {
    rot = 0;
    flipX = sprite.direction < 0 || sprite.direction > 180 ? -1 : 1;
  } else if (sprite.rotationStyle === "don't rotate") {
    rot = 0;
  }
  const s = sprite.size / 100;
  foxSprite.style.transformOrigin = "center center";
  foxSprite.style.transform =
    `translate(${sprite.x}px, ${-sprite.y}px) rotate(${rot}deg) scale(${s * flipX}, ${s})`;
  foxSprite.style.visibility = sprite.visible ? "visible" : "hidden";
  positionBubble();
}

function resetSpriteState() {
  sprite.x = 0;
  sprite.y = 0;
  sprite.direction = 90;
  sprite.size = 100;
  sprite.visible = true;
  sprite.rotationStyle = "all around";
  hideBubble();
  applySpriteTransform();
}

function showBubble(text, kind) {
  hideBubble();
  const bubble = document.createElement("div");
  bubble.className = `speech-bubble ${kind === "think" ? "think" : "say"}`;
  bubble.textContent = String(text);
  stageCanvas.appendChild(bubble);
  sprite.bubbleEl = bubble;
  positionBubble();
}

function hideBubble() {
  if (sprite.bubbleEl) {
    sprite.bubbleEl.remove();
    sprite.bubbleEl = null;
  }
}

function positionBubble() {
  if (!sprite.bubbleEl) return;
  const stageRect = stageCanvas.getBoundingClientRect();
  const cx = stageRect.width / 2;
  const cy = stageRect.height / 2;
  const halfW = (foxSprite.width || foxSprite.offsetWidth || 140) / 2;
  const halfH = (foxSprite.height || foxSprite.offsetHeight || 140) / 2;
  const left = cx + sprite.x + halfW * 0.6;
  const top = cy - sprite.y - halfH - 8;
  sprite.bubbleEl.style.left = `${Math.max(4, Math.min(stageRect.width - 4, left))}px`;
  sprite.bubbleEl.style.top = `${Math.max(4, top)}px`;
}

function stageBounds() {
  const r = stageCanvas.getBoundingClientRect();
  const halfW = r.width / 2 - (foxSprite.offsetWidth || 140) / 2;
  const halfH = r.height / 2 - (foxSprite.offsetHeight || 140) / 2;
  return { halfW: Math.max(20, halfW), halfH: Math.max(20, halfH) };
}

function clampToStage() {
  const { halfW, halfH } = stageBounds();
  if (sprite.x > halfW) sprite.x = halfW;
  if (sprite.x < -halfW) sprite.x = -halfW;
  if (sprite.y > halfH) sprite.y = halfH;
  if (sprite.y < -halfH) sprite.y = -halfH;
}

function bounceIfEdge() {
  const { halfW, halfH } = stageBounds();
  let bounced = false;
  if (sprite.x > halfW) { sprite.x = halfW; sprite.direction = -sprite.direction; bounced = true; }
  if (sprite.x < -halfW) { sprite.x = -halfW; sprite.direction = -sprite.direction; bounced = true; }
  if (sprite.y > halfH) { sprite.y = halfH; sprite.direction = 180 - sprite.direction; bounced = true; }
  if (sprite.y < -halfH) { sprite.y = -halfH; sprite.direction = 180 - sprite.direction; bounced = true; }
  if (bounced) applySpriteTransform();
}

function moveSteps(n) {
  const r = (sprite.direction * Math.PI) / 180;
  sprite.x += n * Math.sin(r);
  sprite.y += n * Math.cos(r);
  applySpriteTransform();
}

function turnBy(deg) {
  sprite.direction = ((sprite.direction + deg + 540) % 360) - 180;
  applySpriteTransform();
}

function pickRandom(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

function sleep(ms, runId) {
  return new Promise((resolve) => {
    if (ms <= 0) {
      requestAnimationFrame(() => resolve());
      return;
    }
    const t = window.setTimeout(() => resolve(), ms);
    if (scriptAbort) {
      scriptAbort.then(() => {
        window.clearTimeout(t);
        resolve();
      });
    }
  });
}

function glide(seconds, tx, ty, runId) {
  return new Promise((resolve) => {
    const startX = sprite.x;
    const startY = sprite.y;
    const start = performance.now();
    const dur = Math.max(0, seconds * 1000);
    function step(now) {
      if (runId !== scriptRunId || !scriptRunning) {
        resolve();
        return;
      }
      const t = dur === 0 ? 1 : Math.min(1, (now - start) / dur);
      sprite.x = startX + (tx - startX) * t;
      sprite.y = startY + (ty - startY) * t;
      applySpriteTransform();
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    }
    requestAnimationFrame(step);
  });
}

function nextCostume() {
  if (costumes.length <= 1) return;
  setCostume((currentCostumeIndex + 1) % costumes.length);
}

function prevCostume() {
  if (costumes.length <= 1) return;
  setCostume((currentCostumeIndex - 1 + costumes.length) % costumes.length);
}

function switchCostumeByName(name) {
  const idx = costumes.findIndex(
    (c) => c.name.toLowerCase() === String(name).toLowerCase()
  );
  if (idx >= 0) setCostume(idx);
  else nextCostume();
}

const blockHandlers = [
  { re: /^move \((-?\d+(?:\.\d+)?)\) steps$/i,
    run: (m) => { moveSteps(parseFloat(m[1])); } },
  { re: /^turn (?:clockwise|cw|↻) \((-?\d+(?:\.\d+)?)\) degrees$/i,
    run: (m) => { turnBy(parseFloat(m[1])); } },
  { re: /^turn (?:counterclockwise|ccw|↺) \((-?\d+(?:\.\d+)?)\) degrees$/i,
    run: (m) => { turnBy(-parseFloat(m[1])); } },
  { re: /^go to x: \((-?\d+(?:\.\d+)?)\) y: \((-?\d+(?:\.\d+)?)\)$/i,
    run: (m) => { sprite.x = +m[1]; sprite.y = +m[2]; applySpriteTransform(); } },
  { re: /^go to \[random position\]$/i,
    run: () => {
      const { halfW, halfH } = stageBounds();
      sprite.x = pickRandom(-halfW, halfW);
      sprite.y = pickRandom(-halfH, halfH);
      applySpriteTransform();
    } },
  { re: /^glide \((-?\d+(?:\.\d+)?)\) secs to x: \((-?\d+(?:\.\d+)?)\) y: \((-?\d+(?:\.\d+)?)\)$/i,
    run: (m, runId) => glide(+m[1], +m[2], +m[3], runId) },
  { re: /^point in direction \((-?\d+(?:\.\d+)?)\)$/i,
    run: (m) => { sprite.direction = parseFloat(m[1]); applySpriteTransform(); } },
  { re: /^change x by \((-?\d+(?:\.\d+)?)\)$/i,
    run: (m) => { sprite.x += parseFloat(m[1]); applySpriteTransform(); } },
  { re: /^set x to \((-?\d+(?:\.\d+)?)\)$/i,
    run: (m) => { sprite.x = parseFloat(m[1]); applySpriteTransform(); } },
  { re: /^change y by \((-?\d+(?:\.\d+)?)\)$/i,
    run: (m) => { sprite.y += parseFloat(m[1]); applySpriteTransform(); } },
  { re: /^set y to \((-?\d+(?:\.\d+)?)\)$/i,
    run: (m) => { sprite.y = parseFloat(m[1]); applySpriteTransform(); } },
  { re: /^if on edge, bounce$/i,
    run: () => { bounceIfEdge(); } },
  { re: /^set rotation style \[(.+?)\]$/i,
    run: (m) => { sprite.rotationStyle = m[1].toLowerCase(); applySpriteTransform(); } },

  { re: /^say \[(.*?)\] for \((-?\d+(?:\.\d+)?)\) seconds$/i,
    run: async (m, runId) => { showBubble(m[1], "say"); await sleep(+m[2] * 1000, runId); if (runId === scriptRunId) hideBubble(); } },
  { re: /^say \[(.*?)\]$/i,
    run: (m) => { if (m[1] === "") hideBubble(); else showBubble(m[1], "say"); } },
  { re: /^think \[(.*?)\] for \((-?\d+(?:\.\d+)?)\) seconds$/i,
    run: async (m, runId) => { showBubble(m[1], "think"); await sleep(+m[2] * 1000, runId); if (runId === scriptRunId) hideBubble(); } },
  { re: /^think \[(.*?)\]$/i,
    run: (m) => { if (m[1] === "") hideBubble(); else showBubble(m[1], "think"); } },
  { re: /^switch costume to \[(.+?)\]$/i,
    run: (m) => { switchCostumeByName(m[1]); } },
  { re: /^next costume$/i,
    run: () => { nextCostume(); } },
  { re: /^change size by \((-?\d+(?:\.\d+)?)\)$/i,
    run: (m) => { sprite.size = Math.max(5, sprite.size + parseFloat(m[1])); applySpriteTransform(); } },
  { re: /^set size to \((-?\d+(?:\.\d+)?)\)%$/i,
    run: (m) => { sprite.size = Math.max(5, parseFloat(m[1])); applySpriteTransform(); } },
  { re: /^show$/i,
    run: () => { sprite.visible = true; applySpriteTransform(); } },
  { re: /^hide$/i,
    run: () => { sprite.visible = false; applySpriteTransform(); } },

  { re: /^wait \((-?\d+(?:\.\d+)?)\) seconds$/i,
    run: (m, runId) => sleep(+m[1] * 1000, runId) },

  { re: /^when green flag clicked$/i, run: () => {} },
  { re: /^when \[.+?\] key pressed$/i, run: () => {} },
  { re: /^when this sprite clicked$/i, run: () => {} },
  { re: /^when backdrop switches to \[.+?\]$/i, run: () => {} },
  { re: /^when \[.+?\] > \(.+?\)$/i, run: () => {} },
  { re: /^when I receive \[.+?\]$/i, run: () => {} },
  { re: /^broadcast \[.+?\](?: and wait)?$/i, run: () => {} }
];

async function execBlock(text, runId) {
  for (const handler of blockHandlers) {
    const m = text.match(handler.re);
    if (m) {
      try {
        await handler.run(m, runId);
      } catch (err) {
        console.warn("Block failed:", text, err);
      }
      return;
    }
  }
}

async function runProgram(blocks, runId) {
  let i = 0;
  if (blocks.length > 0) {
    const hatIdx = blocks.findIndex((b) => /^when green flag clicked$/i.test(b.text));
    if (hatIdx >= 0) i = hatIdx + 1;
  }

  while (i < blocks.length && runId === scriptRunId && scriptRunning) {
    const text = blocks[i].text;

    let m = text.match(/^repeat \((\d+)\)$/i);
    if (m) {
      const n = parseInt(m[1], 10);
      const next = blocks[i + 1];
      if (next) {
        for (let k = 0; k < n && runId === scriptRunId && scriptRunning; k++) {
          await execBlock(next.text, runId);
          await sleep(0, runId);
        }
        i += 2;
      } else {
        i += 1;
      }
      continue;
    }

    if (/^forever$/i.test(text)) {
      const next = blocks[i + 1];
      if (next) {
        while (runId === scriptRunId && scriptRunning) {
          await execBlock(next.text, runId);
          await sleep(0, runId);
        }
      }
      i = blocks.length;
      continue;
    }

    if (/^stop \[all\]$/i.test(text)) {
      scriptRunning = false;
      break;
    }

    await execBlock(text, runId);
    i += 1;
  }
}

function getProgramBlocks() {
  return [...scriptArea.querySelectorAll(".script-block")].map((el) => ({
    type: el.dataset.type || "motion",
    text: el.textContent.trim()
  }));
}

function stopProgram() {
  scriptRunning = false;
  scriptRunId += 1;
  if (scriptAbort && scriptAbort._resolve) {
    scriptAbort._resolve();
  }
  greenFlag.classList.remove("is-active");
  stopButton.classList.add("is-active");
  window.setTimeout(() => stopButton.classList.remove("is-active"), 350);
}

async function startProgram() {
  stopProgram();
  stopAnimation();

  const blocks = getProgramBlocks();
  if (blocks.length === 0) {
    setCostume(0);
    startAnimation();
    return;
  }

  resetSpriteState();
  scriptRunId += 1;
  const myRunId = scriptRunId;
  scriptRunning = true;
  greenFlag.classList.add("is-active");

  let resolveAbort;
  scriptAbort = new Promise((r) => { resolveAbort = r; });
  scriptAbort._resolve = resolveAbort;

  try {
    await runProgram(blocks, myRunId);
  } finally {
    if (myRunId === scriptRunId) {
      scriptRunning = false;
      greenFlag.classList.remove("is-active");
    }
  }
}

greenFlag.addEventListener("click", () => {
  startProgram();
});

stopButton.addEventListener("click", () => {
  stopProgram();
  stopAnimation();
});

window.addEventListener("resize", () => {
  applySpriteTransform();
});

resetSpriteState();

if (tryLoadSharedProject()) {
  /* loaded from link */
} else {
  /* wait for Folder */
}
