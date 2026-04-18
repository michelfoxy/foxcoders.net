const folderButton = document.querySelector("#folderButton");
const projectShell = document.querySelector("#projectShell");
const newButton = document.querySelector("#newButton");
const commandMenu = document.querySelector("#commandMenu");
const commandTypeButtons = document.querySelectorAll(".command-type");
const paletteList = document.querySelector("#paletteList");
const paletteHint = document.querySelector("#paletteHint");
const scriptArea = document.querySelector("#scriptArea");
const resetProgram = document.querySelector("#resetProgram");

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
  projectShell.classList.add("is-open");
  paletteHint.textContent = "Click New, then pick command types.";
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

commandTypeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.classList[1];
    renderCategory(category, button.textContent);
    commandMenu.setAttribute("hidden", "");
    newButton.setAttribute("aria-expanded", "false");
  });
});

resetProgram.addEventListener("click", () => {
  paletteList.innerHTML = "";
  paletteHint.textContent = "Click New, then pick command types.";
  scriptArea.textContent = "No blocks yet.";
});

document.addEventListener("click", (event) => {
  const clickedInsideMenu = commandMenu.contains(event.target);
  const clickedNewButton = newButton.contains(event.target);
  if (!clickedInsideMenu && !clickedNewButton) {
    commandMenu.setAttribute("hidden", "");
    newButton.setAttribute("aria-expanded", "false");
  }
});

function renderCategory(category, label) {
  paletteList.innerHTML = "";
  paletteHint.textContent = `${label} blocks`;

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
  block.style.background = colorMap[blockType] || "var(--scratch-blue)";
  if (blockType === "events" || blockType === "control") {
    block.classList.add("dark-text");
  }
  scriptArea.appendChild(block);
}
