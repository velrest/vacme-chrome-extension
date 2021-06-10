let pause = false;

async function initButton() {
  let select = document.querySelector("select");
  if (!select) {
    return setTimeout(initButton, 100);
  }
  const a = document.createElement("a");
  a.innerText = "Pause notifications";
  a.addEventListener("click", function () {
    pause = !pause;
    a.innerText = pause ? "Resume notifications" : "Pause notifications";
    let notification;
    if (!pause) {
      checkVacme();
      notification = new Notification("Vacme", {
        body: "Notifications resumed.",
      });
    } else {
      notification = new Notification("Vacme", {
        body: "Notifications paused.",
      });
    }
    setTimeout(() => {
      notification.close();
    }, 1000);
  });
  select.parentNode.insertBefore(a, select);
}

let checkVacme = async function () {
  let list = Array.from(document.querySelectorAll("select .ng-star-inserted"));
  if (!list.length && list.length < 2) {
    console.info("Timeout: List not rendered");
    return setTimeout(checkVacme, 100);
  }
  let available = list
    .slice(2)
    .map((e) => e.innerText)
    .filter((t) => !t.includes("keine Termine"));

  const permission = await Notification.requestPermission();
  if (permission === "granted" && available.length) {
    const notification = new Notification("Vacme", {
      body: "Available: " + available.join(", "),
    });
    setTimeout(() => {
      notification.close();
    }, 2000);
  } else {
    console.info({ permission, available });
  }

  setTimeout(() => {
    if (!pause) {
      location.reload();
    }
  }, 10000);
};

initButton();
checkVacme();
