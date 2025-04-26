export function clearTutorialStorage() {
  // Clear all session storage items that start with tutorial IDs
  Object.keys(sessionStorage).forEach((key) => {
    if (key.startsWith("tutorial-")) {
      sessionStorage.removeItem(key);
    }
  });
}

export function forceTutorialRerender() {
  // Dispatch a custom event that components can listen to
  window.dispatchEvent(new CustomEvent("tutorial-reset"));
}
