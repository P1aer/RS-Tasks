let db: IDBDatabase;

function addProfile(e) {
  e.preventDefault();
  const surname = (<HTMLInputElement>document.querySelector("#fsur")).value;
  const name = (<HTMLInputElement>document.querySelector("#fname")).value;
  const email = (<HTMLInputElement>document.querySelector("#fmail")).value;

  const transaction = db.transaction("profiles", "readwrite");
  const store = transaction.objectStore("profiles");
  console.log(store);
  // Define a person
  const person = {
    id: "1",
    name,
    email,
    surname,
    created: new Date(),
  };

  // Perform the add
  const request = store.add(person);

  request.onerror = function () {
    console.log("Error");
  };

  request.onsuccess = function () {
    console.log("Woot! Did it");
  };
}
document.addEventListener("DOMContentLoaded", () => {
  const Request = indexedDB.open("P1aer", 1);
  Request.onupgradeneeded = function () {
    const DB = Request.result;
    if (!DB.objectStoreNames.contains("profiles")) {
      // если хранилище не существует
      console.log("database created");
      DB.createObjectStore("profiles", { autoIncrement: true }); // создаем хранилище
    }
  };

  Request.onsuccess = function () {
    db = Request.result;
    console.log(db.objectStoreNames);
    const btn = document.querySelector(".challenger-form");
    btn.addEventListener("submit", addProfile);
  };

  Request.onerror = function (e) {
    console.log("Error");
    console.dir(e);
  };
});
