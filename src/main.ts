const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute("aria-label", "A neutral face");

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "#f3cf87");
head.setAttribute("stroke", "#302c29");
head.setAttribute("stroke-width", "4");
face.append(head);

const leftEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
leftEye.setAttribute("cx", "72");
leftEye.setAttribute("cy", "82");
leftEye.setAttribute("rx", "6");
leftEye.setAttribute("ry", "9");
leftEye.setAttribute("fill", "#302c29");
face.append(leftEye);

const rightEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
rightEye.setAttribute("cx", "128");
rightEye.setAttribute("cy", "82");
rightEye.setAttribute("rx", "6");
rightEye.setAttribute("ry", "9");
rightEye.setAttribute("fill", "#302c29");
face.append(rightEye);

const nose = document.createElementNS("http://www.w3.org/2000/svg", "line");
nose.setAttribute("x1", "100");
nose.setAttribute("y1", "96");
nose.setAttribute("x2", "96");
nose.setAttribute("y2", "112");
nose.setAttribute("stroke", "#302c29");
nose.setAttribute("stroke-width", "4");
nose.setAttribute("stroke-linecap", "round");
face.append(nose);

const mouth = document.createElementNS("http://www.w3.org/2000/svg", "line");
mouth.setAttribute("x1", "75");
mouth.setAttribute("y1", "137");
mouth.setAttribute("x2", "125");
mouth.setAttribute("y2", "137");
mouth.setAttribute("stroke", "#302c29");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");
face.append(mouth);

face.setAttribute(
  "aria-label",
  "A cheerful face with symmetrical freckles, decorative circles, triangles, and stars",
);

// Creating SVG elements
function addShape(type: string, attributes: Record<string, string>) {
  const shape = document.createElementNS("http://www.w3.org/2000/svg", type);

  for (const [key, value] of Object.entries(attributes)) {
    shape.setAttribute(key, value);
  }

  face.append(shape);
}

// 100 freckles arranged symmetrically on both cheeks
for (let row = 0; row < 10; row++) {
  for (let col = 0; col < 5; col++) {
    const x = 48 + col * 8;
    const y = 95 + row * 4;

    // Left cheek
    addShape("circle", {
      cx: String(x),
      cy: String(y),
      r: "1.7",
      fill: "#a65c45",
    });

    // Right cheek
    addShape("circle", {
      cx: String(200 - x),
      cy: String(y),
      r: "1.7",
      fill: "#a65c45",
    });
  }
}

// 100 decorative circles around the head
for (let i = 0; i < 100; i++) {
  const angle = (i / 100) * Math.PI * 2;

  addShape("circle", {
    cx: String(100 + 82 * Math.cos(angle)),
    cy: String(100 + 82 * Math.sin(angle)),
    r: "3",
    fill: "#e5a34c",
  });
}

// 16 decorative triangles around the portrait
for (let i = 0; i < 16; i++) {
  const angle = (i / 16) * Math.PI * 2;
  const x = 100 + 72 * Math.cos(angle);
  const y = 100 + 72 * Math.sin(angle);

  const points = [
    `${x},${y - 5}`,
    `${x - 4},${y + 4}`,
    `${x + 4},${y + 4}`,
  ].join(" ");

  addShape("polygon", {
    points,
    fill: "#e58b83",
  });
}

// 12 decorative stars around the portrait
for (let i = 0; i < 12; i++) {
  const angle = (i / 12) * Math.PI * 2;
  const x = 100 + 65 * Math.cos(angle);
  const y = 100 + 65 * Math.sin(angle);
  const points = [];

  for (let j = 0; j < 10; j++) {
    const radius = j % 2 === 0 ? 5 : 2.3;
    const a = (j / 10) * Math.PI * 2 - Math.PI / 2;

    points.push(
      `${x + radius * Math.cos(a)}, ${y + radius * Math.sin(a)}`,
    );
  }

  addShape("polygon", {
    points: points.join(" "),
    fill: "#f4c542",
  });
}

portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
