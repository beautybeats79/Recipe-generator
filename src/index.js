const form = document.getElementById("recipe-form");
const output = document.getElementById("output");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const veggies = document.getElementById("veggies").value;
  const protein = document.getElementById("protein").value;
  const extras = document.getElementById("extras").value;
  const time = document.getElementById("time").value;
  const exclude = document.getElementById("exclude").value;

  output.innerHTML = "Thinking... 🍳";

  const apiKey = "f0aaa5691cfa79897f985t035b4a46fo";
  const context =
    "You're a friendly AI chef who gives clear and concise recipe suggestions. Keep responses fun, in HTML, and under 100 words.";

  const prompt = `Give me a recipe using these ingredients:
  Vegetables: ${veggies}
  Protein: ${protein}
  Extras: ${extras}
  Time available to cook: ${time}
  Avoid: ${exclude}`;

  const url = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  axios
    .get(url)
    .then((response) => {
      output.innerHTML = "";
      const parser = new DOMParser();
      let decoded = parser.parseFromString(response.data.answer, "text/html")
        .body.textContent;

      console.log("API response:", response.data.answer);

      decoded = decoded
        .replace(/```html\s*/i, "")
        .replace(/```$/, "")
        .trim();

      new Typewriter(output, {
        delay: 25,
        autoStart: true,
        cursor: "|",
      })
        .typeString(decoded)
        .start();
    })
    .catch((error) => {
      output.innerHTML =
        "Sorry! Couldn't generate a recipe right now. Please try again later.";
      console.error(error);
    });
});
