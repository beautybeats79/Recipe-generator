const form = document.getElementById("recipe-form");
const output = document.getElementById("output");
const loading = document.getElementById("loading");
const saveButton = document.getElementById("save-recipe");

const savedRecipe = localStorage.getItem("savedRecipe");
if (savedRecipe) {
  output.innerText = savedRecipe;
  saveButton.classList.remove("hidden");
}

// Save recipe button
saveButton.addEventListener("click", function () {
  const recipeText = output.innerText;
  localStorage.setItem("savedRecipe", recipeText);
  alert("Recipe saved! You can find it in your browser's local storage.");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  loading.classList.remove("hidden");
  output.textContent = "";
  saveButton.classList.add("hidden");

  const veggies = document.getElementById("veggies").value.trim();
  const protein = document.getElementById("protein").value.trim();
  const extras = document.getElementById("extras").value.trim();
  const time = document.getElementById("time").value.trim();
  const exclude = document.getElementById("exclude").value.trim();

  const apiKey = "f0aaa5691cfa79897f985t035b4a46fo";
  const context = `
You're a friendly AI chef who gives clear and concise recipe suggestions. Always reply in HTML format like this:
<h3>🍲 Recipe Name: [Name]</h3>
<h4>🥕 Ingredients:</h4>
<ul>
<li>Ingredient 1</li>
<li>Ingredient 2</li>
</ul>
<h4>👩‍🍳 Method:</h4>
<ol>
<li>Step 1</li>
<li>Step 2</li>
</ol>
Keep it short, fun, and under 100 words.
`;

  const prompt = `Give me a recipe using:
  Vegetables: ${veggies}
  Protein: ${protein}
  Extras: ${extras}
  Time: ${time}
  Avoid: ${exclude}`;

  try {
    const url = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
      prompt
    )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

    const response = await axios.get(url);
    let decoded = new DOMParser().parseFromString(
      response.data.answer,
      "text/html"
    ).body.innerHTML;

    output.innerHTML = decoded;
    saveButton.classList.remove("hidden");
  } catch (error) {
    output.textContent = "Sorry! Couldn't generate a recipe right now.";
    console.error(error);
  } finally {
    loading.classList.add("hidden");
  }
});
