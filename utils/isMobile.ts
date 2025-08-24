export default function () {
  if (typeof window === "undefined") {
    return;
  }
  return window.screen.width < 844;
}
