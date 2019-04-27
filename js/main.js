const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search states.json and filter it
const searchStates = async searchText => {
  const res = await fetch("../data/states.json");
  const states = await res.json();

  // Get matches to current text input
  let matches = states.filter(state => {
    // ^ - starts with whatever user provides
    // g - global i - case insensitive
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }

  outputHtml(matches);
};

// Show outputs in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
        <div class="card text-white bg-dark mb-3">
          <div class="card-body">
            <h4 class="card-title">${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
            <small class="card-text">Lat: ${match.lat} / Long: ${match.long}</small>
          </div>
        </div>
        `
      )
      .join('');

    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchStates(search.value));
