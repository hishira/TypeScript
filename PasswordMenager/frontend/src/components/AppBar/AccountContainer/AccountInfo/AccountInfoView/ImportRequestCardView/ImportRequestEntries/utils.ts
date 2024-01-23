export const MapEntries = (e: EntriesToImport): EntriesToImport => ({
  email: (e.email === "" ? "-" : e.email) ?? "-",
  password: (e.password === "" ? "-" : e.password) ?? "-",
  title: (e.title === "" ? "-" : e.title) ?? "-",
  url: (e.url === "" ? "-" : e.url) ?? "-",
  username: (e.username === "" ? "-" : e.username) ?? "-",
});
