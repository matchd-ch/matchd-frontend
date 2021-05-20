export function calculateMargins(): void {
  setTimeout(() => {
    const root = document.documentElement;
    const headerHeight = (document.querySelector("header") as HTMLElement).offsetHeight;
    const footerHeight = (document.querySelector("footer") as HTMLElement).offsetHeight;
    root.style.setProperty("--contentMarginTop", `${headerHeight}px`);
    root.style.setProperty("--contentMarginBottom", `${footerHeight}px`);
  }, 0);
}
