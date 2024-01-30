const movieList = document.querySelector(".movielist");
const movieTitle = document.querySelector(".movie-title");
const movieRuntime = document.querySelector(".runtime");
const movieShowtime = document.querySelector(".showtime");
const availableTickets = document.querySelector(".available-tickets");
const poster = document.querySelector(".movie-poster");
const description = document.querySelector(".description");
const buyBtn = document.querySelector(".buy");
const apiUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  loadFirstMovie();
  loadMovieMenu();
});

async function loadMovieMenu() {
  const response = await fetch(apiUrl + "/films");
  const data = await response.json();

  const movieTitles = data.map((movie) => movie.title);
  movieTitles.forEach((title) => {
    const li = document.createElement("li");
    li.textContent = title;
    movieList.appendChild(li);

    li.addEventListener("click", () => {
      const selectedMovie = data.find((movie) => movie.title === title);
      bindValues(selectedMovie);
    });
  });
}

function bindValues(movie) {
  movieTitle.textContent = movie.title;
  poster.src = movie.poster;
  description.textContent = movie.description;
  movieRuntime.textContent = `Runtime: ${movie.runtime} mins`;
  movieShowtime.textContent = `Showtime: ${movie.showtime}`;
  availableTickets.textContent = `Tickets: ${
    +movie.capacity - movie.tickets_sold
  }`;
}

async function loadFirstMovie() {
  const response = await fetch(apiUrl + "/films/1");
  const data = await response.json();
  bindValues(data);
}

buyBtn.addEventListener("click", () => {
  const splitted = availableTickets.textContent.split(":");
  const remainingTickets = Number(splitted[1].trim());
  if (remainingTickets <= 0) return;
  availableTickets.textContent = `Tickets: ${remainingTickets - 1}`;
});
