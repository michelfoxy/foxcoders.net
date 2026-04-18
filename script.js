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

greenFlag.addEventListener("click", () => {
  if (!openCostumes.hasAttribute("hidden") || costumes.length > 0) {
    stopAnimation();
    setCostume(0);
    startAnimation();
  } else {
    startAnimation();
  }
});

stopButton.addEventListener("click", stopAnimation);

if (tryLoadSharedProject()) {
  /* loaded from link */
} else {
  /* wait for Folder */
}
