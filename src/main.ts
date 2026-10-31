const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute(
  "aria-label",
  "A cheerful face with a yellow to pink gradient, curved eyebrows, hair, and a smile.",
);

// Create gradient definitions
const defs = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "defs",
);

const gradient = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "linearGradient",
);

gradient.setAttribute("id", "face-gradient");
gradient.setAttribute("x1", "0%");
gradient.setAttribute("y1", "0%");
gradient.setAttribute("x2", "100%");
gradient.setAttribute("y2", "100%");

// Yellow color
const yellow = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "stop",
);
yellow.setAttribute("offset", "0%");
yellow.setAttribute("stop-color", "#f5d36b");
gradient.append(yellow);

// Orange color
const orange = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "stop",
);
orange.setAttribute("offset", "50%");
orange.setAttribute("stop-color", "#f49b62");
gradient.append(orange);

// Pink color
const pink = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "stop",
);
pink.setAttribute("offset", "100%");
pink.setAttribute("stop-color", "#e878a0");
gradient.append(pink);

defs.append(gradient);
face.append(defs);

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "url(#face-gradient)");
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

// Curved left eyebrow
const leftEyebrow = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "path",
);

leftEyebrow.setAttribute("d", "M 60 68 Q 72 58 84 68");
leftEyebrow.setAttribute("fill", "none");
leftEyebrow.setAttribute("stroke", "#302c29");
leftEyebrow.setAttribute("stroke-width", "3");
leftEyebrow.setAttribute("stroke-linecap", "round");
face.append(leftEyebrow);

// Curved right eyebrow
const rightEyebrow = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "path",
);

rightEyebrow.setAttribute("d", "M 116 68 Q 128 58 140 68");
rightEyebrow.setAttribute("fill", "none");
rightEyebrow.setAttribute("stroke", "#302c29");
rightEyebrow.setAttribute("stroke-width", "3");
rightEyebrow.setAttribute("stroke-linecap", "round");
face.append(rightEyebrow);

// Curved hair details
const hair = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "path",
);

hair.setAttribute(
  "d",
  "M 38 55 Q 52 25 78 35 Q 100 15 122 35 Q 148 25 162 55",
);
hair.setAttribute("fill", "none");
hair.setAttribute("stroke", "#a65c45");
hair.setAttribute("stroke-width", "4");
hair.setAttribute("stroke-linecap", "round");
face.append(hair);

const nose = document.createElementNS("http://www.w3.org/2000/svg", "line");
nose.setAttribute("x1", "100");
nose.setAttribute("y1", "96");
nose.setAttribute("x2", "96");
nose.setAttribute("y2", "112");
nose.setAttribute("stroke", "#302c29");
nose.setAttribute("stroke-width", "4");
nose.setAttribute("stroke-linecap", "round");
face.append(nose);

// Curved smile using a quadratic Bezier curve
const mouth = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "path",
);

mouth.setAttribute("d", "M 75 135 Q 100 160 125 135");
mouth.setAttribute("fill", "none");
mouth.setAttribute("stroke", "#302c29");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");
face.append(mouth);

portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
