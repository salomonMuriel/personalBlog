const WEEK_COUNT = 12;

function createElement(tag, className, html) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (html) element.innerHTML = html;
  return element;
}

function createTaskRow(task, index, isBonus) {
  const row = createElement("div", `gantt__row${isBonus ? " gantt__row--bonus" : ""}`);
  const badge = task.aiRatio ? '<span class="tag-ai">IA</span>' : "";
  row.append(createElement("div", "gantt__name", `${task.name}${badge}`));

  const track = createElement("div", "gantt__track");
  track.style.gridColumn = `${task.from + 1} / ${task.to + 2}`;
  if (task.aiRatio) track.append(createElement("div", "gantt__ghost"));

  const bar = createElement("div", `gantt__bar${task.aiRatio ? " is-ai" : ""}`);
  bar.style.setProperty("--index", index);
  if (task.aiRatio) bar.style.setProperty("--ratio", task.aiRatio);
  track.append(bar);

  const weeks = task.to - task.from + 1;
  if (task.aiRatio && weeks >= 3) {
    track.append(createElement("span", "gantt__saving", `−${Math.round((1 - task.aiRatio) * 100)} %`));
  }
  row.append(track);
  return row;
}

function createMilestoneRow(milestone) {
  const row = createElement("div", "gantt__row gantt__row--milestone");
  row.append(createElement("div", "gantt__name", `<strong>${milestone.label}</strong>`));
  const track = createElement("div", "gantt__track");
  track.style.gridColumn = `${milestone.week + 1} / ${milestone.week + 2}`;
  track.append(createElement("span", "gantt__milestone"));
  row.append(track);
  return row;
}

function renderGantt() {
  const container = document.getElementById("gantt-rows");
  let index = 0;
  SCHEDULE_GROUPS.forEach((group, groupIndex) => {
    const block = createElement("div", "gantt__group");
    block.dataset.group = groupIndex + 1;
    block.append(createElement("div", "gantt__label", `<b>${group.code}</b>${group.name}`));
    group.tasks.forEach(task => block.append(createTaskRow(task, index++, false)));
    block.append(createMilestoneRow(group.milestone));
    container.append(block);
  });

  const bonusWrapper = createElement("div", "gantt__bonus");
  const bonusBlock = createElement("div", "gantt__group gantt__group--bonus");
  bonusBlock.append(createElement("div", "gantt__label", "<b>+</b>Lo que cabe gracias a la IA"));
  BONUS_TASKS.forEach(task => bonusBlock.append(createTaskRow(task, index++, true)));
  bonusWrapper.append(bonusBlock);
  container.append(bonusWrapper);
}

function setupScheduleToggle() {
  const gantt = document.getElementById("gantt");
  const note = document.getElementById("schedule-note");
  const toggle = document.querySelector(".toggle");
  const buttons = [...toggle.querySelectorAll("button")];

  const applyMode = mode => {
    gantt.dataset.mode = mode;
    toggle.dataset.mode = mode;
    note.innerHTML = SCHEDULE_NOTES[mode];
    buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.mode === mode)));
  };
  buttons.forEach(button => button.addEventListener("click", () => applyMode(button.dataset.mode)));
  applyMode("ai");
}

renderGantt();
setupScheduleToggle();
