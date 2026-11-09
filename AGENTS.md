# Launch Board: notes for agents

A small React app (Vite) used for demos. People ask an agent to change it and
get a pull request with a preview link.

## Run and check

- `npm install`, then `npm run dev` for a local server on port 5173.
- `npm run build` must pass before you open a pull request.
- The app's code is in `src/`: `App.jsx` (the page), `data.js` (the sample
  launches, all made up) and `styles.css`.

## Shipping a change

1. Work on a new branch from `main`, never on `main` itself.
2. Commit with a short message that says what changed.
3. Push the branch and open a pull request with `gh pr create --fill`
   (`gh` is already signed in for this repository only).
4. Vercel builds every pull request and comments its preview link on it,
   usually within a minute. `gh pr view --comments` shows it, or
   `gh pr checks` shows the Vercel check with the link.
5. Reply with the pull request link and the preview link.

## Keep in mind

- Don't merge pull requests; a person reviews and merges.
- Keep sample content made up. Don't add real people or companies.
- There are no secrets in this app, and none should be added.
