const fs = require("fs");
const path = require("path");

const archiveDir = path.join(__dirname, "archive");
const currentYear = new Date().getFullYear();

const years = Array.from(
  { length: currentYear - 1985 + 1 },
  (_, i) => 1985 + i,
);

const yearsMeta = [];

years.forEach((year) => {
  const yearDir = path.join(archiveDir, year.toString());
  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir, { recursive: true });
    yearsMeta.push({ year, hasContent: false });
    return;
  }

  // Get subfolders and their first image
  const subfolders = fs
    .readdirSync(yearDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      const subfolderDir = path.join(yearDir, dirent.name);
      const images = fs
        .readdirSync(subfolderDir)
        .filter((file) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file))
        .sort();
      return {
        name: dirent.name,
        thumbnail: images.length > 0 ? images[0] : null,
      };
    });

  // A year has content only when at least one subfolder contains images
  const hasContent = subfolders.some((s) => s.thumbnail !== null);
  yearsMeta.push({ year, hasContent });

  // Write subfolders.json
  fs.writeFileSync(
    path.join(yearDir, "subfolders.json"),
    JSON.stringify(subfolders, null, 2),
  );

  // Generate images.json for each subfolder
  subfolders.forEach((subfolder) => {
    const subfolderDir = path.join(yearDir, subfolder.name);
    const images = fs
      .readdirSync(subfolderDir)
      .filter((file) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file));

    fs.writeFileSync(
      path.join(subfolderDir, "images.json"),
      JSON.stringify(images, null, 2),
    );
  });
});

// Write the year metadata used by the frontend
fs.writeFileSync(
  path.join(archiveDir, "years.json"),
  JSON.stringify(yearsMeta, null, 2),
);

console.log("Gallery, subfolders and years.json generated successfully.");
