import { writable } from "svelte/store";

export let darkMode;

// first, check the cookie. Then check the cookie
function isDarkTheme() {
	if (!window.matchMedia) {
		return false;
	} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		return true;
	}
}

export default function dark(value, bodyClasses = "mode-dark") {
	// if value is set then use it
	if (value !== undefined) {
		return writable(value);
	}

	// otherwise look at the user's browser preference
	if (typeof window === "undefined") return writable(value);

	if (!darkMode) {
		darkMode = writable(value || isDarkTheme());
	}

	return {
		subscribe: darkMode.subscribe,
		set: v => {
			bodyClasses.split(" ").forEach(c => {
				if (v) {
					document.body.classList.add(c);
				} else {
					document.body.classList.remove(c);
				}
			});

			darkMode.set(v);
		}
	};
}
