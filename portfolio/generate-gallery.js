const fs = require("fs");
const path = require("path");

const archiveDir = path.join(__dirname, "archive");
const currentYear = new Date().getFullYear();

const years = Array.from(
  { length: currentYear - 1985 + 1 },
  (_, i) => 1985 + i,
);

const yearsMeta = [];

// Helper function for natural/numeric sorting of filenames (e.g., -(1), -(2), -(10))
function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

years.forEach((year) => {
  const yearDir = path.join(archiveDir, year.toString());

  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir, { recursive: true });
    yearsMeta.push({
      year,
      hasContent: false,
      categories: 0,
      images: 0,
    });
    return;
  }

  // Get all subfolders and sort their images naturally
  const subfolders = fs
    .readdirSync(yearDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      const subfolderDir = path.join(yearDir, dirent.name);
      const images = fs
        .readdirSync(subfolderDir)
        .filter((file) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file))
        .sort(naturalSort); // <-- Applied natural sort here
      return {
        name: dirent.name,
        thumbnail: images.length > 0 ? images[0] : null,
        imageCount: images.length,
      };
    });

  const categories = subfolders.length;
  const images = subfolders.reduce((sum, s) => sum + s.imageCount, 0);
  const hasContent = images > 0;

  yearsMeta.push({
    year,
    hasContent,
    categories,
    images,
  });

  // Write subfolders.json
  const subfoldersForJson = subfolders.map((s) => ({
    name: s.name,
    thumbnail: s.thumbnail,
  }));

  fs.writeFileSync(
    path.join(yearDir, "subfolders.json"),
    JSON.stringify(subfoldersForJson, null, 2),
  );

  // Generate images.json for each subfolder with natural sort
  subfolders.forEach((subfolder) => {
    const subfolderDir = path.join(yearDir, subfolder.name);
    const imageList = fs
      .readdirSync(subfolderDir)
      .filter((file) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file))
      .sort(naturalSort); // <-- Applied natural sort here

    fs.writeFileSync(
      path.join(subfolderDir, "images.json"),
      JSON.stringify(imageList, null, 2),
    );
  });
});

// Write the year metadata used by the frontend
fs.writeFileSync(
  path.join(archiveDir, "years.json"),
  JSON.stringify(yearsMeta, null, 2),
);

console.log(
  "Gallery, subfolders and years.json generated successfully with correct sequence order.",
); 

/*const fs = require("fs");
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
    yearsMeta.push({
      year,
      hasContent: false,
      categories: 0,
      images: 0,
    });
    return;
  }

  // Get all subfolders
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
        imageCount: images.length,
      };
    });

  const categories = subfolders.length;
  const images = subfolders.reduce((sum, s) => sum + s.imageCount, 0);
  const hasContent = images > 0;

  yearsMeta.push({
    year,
    hasContent,
    categories,
    images,
  });

  // Write subfolders.json (keep original format for frontend)
  const subfoldersForJson = subfolders.map((s) => ({
    name: s.name,
    thumbnail: s.thumbnail,
  }));

  fs.writeFileSync(
    path.join(yearDir, "subfolders.json"),
    JSON.stringify(subfoldersForJson, null, 2),
  );

  // Generate images.json for each subfolder
  subfolders.forEach((subfolder) => {
    const subfolderDir = path.join(yearDir, subfolder.name);
    const imageList = fs
      .readdirSync(subfolderDir)
      .filter((file) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file));

    fs.writeFileSync(
      path.join(subfolderDir, "images.json"),
      JSON.stringify(imageList, null, 2),
    );
  });
});

// Write the year metadata used by the frontend
fs.writeFileSync(
  path.join(archiveDir, "years.json"),
  JSON.stringify(yearsMeta, null, 2),
);

console.log(
  "Gallery, subfolders and years.json generated successfully.",
); 

 */
