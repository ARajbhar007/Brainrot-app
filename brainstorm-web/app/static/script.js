let questions = [];
let index = 0;
let score = 0;

function startGame() {
  const category = document.getElementById("category").value;
  const level = document.getElementById("level").value;

  fetch("/get_questions", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ category, level })
  })
  .then(res => res.json())
  .then(data => {
    questions = data;
    index = 0;
    score = 0;
    showQuestion();
  });
}

function showQuestion() {
  const quizDiv = document.getElementById("quiz");
  if (index >= questions.length) {
    quizDiv.innerHTML = `<h2>Game Over</h2><p>Score: ${score}/${questions.length}</p>`;
    return;
  }

  const q = questions[index];
  quizDiv.innerHTML = `<h3>Q${index + 1}: ${q.q}</h3>`;
  q.options.forEach(opt => {
    quizDiv.innerHTML += `<button onclick="checkAnswer('${opt}')">${opt}</button><br>`;
  });
}

function checkAnswer(selected) {
  if (selected === questions[index].a) score++;
  index++;
  showQuestion();
}
