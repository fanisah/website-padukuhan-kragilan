export { navigationLinks } from "../../../data/navigation";

export function goTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

