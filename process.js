import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require("fs");

function convertToJson(inputFilename, outputFilename) {
  // Read the input file
  fs.readFile(inputFilename, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // Split the file content into lines
    const lines = data.trim().split("\n");
    const result = [];

    // Process each line
    lines.forEach((line) => {
      const [name, number] = line.split(" - ");
      if (name && number) {
        result.push({ name: name.trim(), site: number.trim() });
      }
    });

    // Convert the result to JSON
    const jsonData = JSON.stringify(result, null, 4);

    // Write JSON data to the output file
    fs.writeFile(outputFilename, jsonData, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log(`Data successfully written to ${outputFilename}`);
      }
    });
  });
}

// Example usage
const inputFilename = "sites"; // Replace with your input file name
const outputFilename = "output.json"; // Output file name
convertToJson(inputFilename, outputFilename);
