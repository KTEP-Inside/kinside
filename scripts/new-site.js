const fs = require("fs/promises");
const path = require("path");

const generateNewSite = async (args) => {
	const [name] = args;

	if (!name) {
		throw new TypeError("You must pass site name");
	}

	const template = await fs
		.readFile(path.resolve("templates", "sites", "index.md"))
		.then((buffer) => buffer.toString());
	const filledTemplate = template
		.replaceAll("template-name", name)
		.replaceAll('"created-at"', formateDate(new Date()));

	const siteDirPath = path.resolve("src", "sites", name);
	await fs.mkdir(siteDirPath, {
		recursive: true,
	});
	await fs.writeFile(path.join(siteDirPath, "index.md"), filledTemplate),
		console.log("Created success");
};

/**
 *
 * @param {Date} date
 * @returns string
 */
const formateDate = (date) => {
	const year = date.getFullYear();
	const month = date.getUTCMonth().toString().padStart(2, 0);
	const day = date.getDate().toString().padStart(2, 0);

	return [year, month, day].join("-");
};

generateNewSite(process.argv.slice(2));
