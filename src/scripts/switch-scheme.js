const lightStyles = document.querySelectorAll(
	"link[rel=stylesheet][media*=prefers-color-scheme][media*=light]"
);
const darkStyles = document.querySelectorAll(
	"link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]"
);
const controls = document.querySelectorAll(".scheme-switcher__control");

const SCHEME_KEY = "KI-color-scheme";

const setupSwitcher = () => {
	const scheme = getSavedScheme() || "auto";

	if (scheme !== null) {
		const target = document.querySelector(
			`.scheme-switcher__control--${scheme}`
		);
		target.checked = true;
		setupScheme(scheme);
	}

	controls.forEach((control) => {
		control.addEventListener("change", (evt) => {
			setupScheme(evt.target.value);
		});
	});
};

const setupScheme = (scheme) => {
	setupMedia(scheme);

	if (scheme === "auto") {
		return clearScheme();
	}

	return saveScheme(scheme);
};

const setupMedia = (scheme) => {
	let lightMedia = "(prefers-color-scheme: light)";
	let darkMedia = "(prefers-color-scheme: dark)";

	if (scheme !== "auto") {
		lightMedia = scheme === "light" ? "all" : "not all";
		darkMedia = scheme === "dark" ? "all" : "not all";
	}

	darkStyles.forEach((style) => (style.media = darkMedia));
	lightStyles.forEach((style) => (style.media = lightMedia));
};

const saveScheme = (scheme) => {
	localStorage.setItem(SCHEME_KEY, scheme);
};

const getSavedScheme = () => {
	return localStorage.getItem(SCHEME_KEY);
};

const clearScheme = () => {
	localStorage.removeItem(SCHEME_KEY);
};

setupSwitcher();
