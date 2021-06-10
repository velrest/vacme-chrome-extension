let checkVacme = async function () {
  location.reload();
  let available = Array.from(
    document.querySelectorAll("select .ng-star-inserted")
  )
    .slice(2)
    .map((e) => e.innerText)
    .filter((t) => !t.includes("keine Termine"));

  const permission = await Notification.requestPermission();
  if (permission === "granted" && available.length) {
    const notification = new Notification("Vacme", {
      body: "Available: " + available.join(", "),
    });
  } else {
    console.info({ permission, available });
  }

  setTimeout(checkVacme, 10000);
};

setTimeout(checkVacme, 10000);
