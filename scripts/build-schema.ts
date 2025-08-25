/**
 * Schema Builder - Combines multiple GraphQL schema files into a single schema.
 * Useful for keeping auto-generated and custom schema definitions separate.
 * Supports glob patterns and multiple source directories.
 *
 * Usage examples:
 *   npm run build-schema -- --pattern "svsn/*.graphql" --output "svsn/generated/schema.graphql"
 *   npm run build-schema -- --pattern "vsn/*.graphql" --output "vsn/generated/schema.graphql"
 *   npm run build-schema -- --pattern "{svsn,vsn}/*.graphql" --output "combined/schema.graphql"
 */

import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";

interface SchemaConfig {
  pattern: string;
  outputFile: string;
  baseDir?: string;
}

const readSchemaFile = (filePath: string): string =>
  fs.readFileSync(filePath, "utf8");

const writeSchemaFile = (filePath: string, content: string): void => {
  // Ensure output directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, content);
};

const findSchemaFiles = (
  pattern: string,
  baseDir: string = process.cwd(),
): string[] => {
  const fullPattern = path.isAbsolute(pattern)
    ? pattern
    : path.join(baseDir, pattern);
  const files = glob.sync(fullPattern);

  if (files.length === 0) {
    throw new Error(`No schema files found matching pattern: ${pattern}`);
  }

  return files.sort(); // Sort for consistent ordering
};

const buildSchema = (config: SchemaConfig): void => {
  const baseDir = config.baseDir || process.cwd();
  const schemaFiles = findSchemaFiles(config.pattern, baseDir);

  console.log(`Found ${schemaFiles.length} schema files:`);
  schemaFiles.forEach((file) =>
    console.log(`  - ${path.relative(baseDir, file)}`),
  );

  // Create combined schema content
  const combinedSchema = schemaFiles
    .map((filePath) => {
      const content = readSchemaFile(filePath);
      return `# From: ${path.relative(baseDir, filePath)}\n${content}`;
    })
    .join("\n\n");

  // Write combined schema to output file
  const outputPath = path.isAbsolute(config.outputFile)
    ? config.outputFile
    : path.join(baseDir, config.outputFile);

  writeSchemaFile(outputPath, combinedSchema);

  console.log(
    `Combined schema written to ${path.relative(baseDir, outputPath)}`,
  );
};

const parseArgs = (): SchemaConfig => {
  const args = process.argv.slice(2);
  let pattern = "";
  let outputFile = "";
  let baseDir = "";

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--pattern":
      case "-p":
        pattern = args[++i];
        break;
      case "--output":
      case "-o":
        outputFile = args[++i];
        break;
      case "--base-dir":
      case "-b":
        baseDir = args[++i];
        break;
      case "--help":
      case "-h":
        console.log(`
Usage: node schema-builder.js [options]

Options:
  --pattern, -p    Glob pattern for schema files (required)
  --output, -o     Output file path (required)
  --base-dir, -b   Base directory (optional, defaults to current directory)
  --help, -h       Show this help message

Examples:
  node schema-builder.js --pattern "svsn/*.graphql" --output "svsn/generated/schema.graphql"
  node schema-builder.js --pattern "vsn/*.graphql" --output "vsn/generated/schema.graphql"
  node schema-builder.js --pattern "{svsn,vsn}/*.graphql" --output "combined/schema.graphql"
        `);
        process.exit(0);
        break;
    }
  }

  if (!pattern || !outputFile) {
    console.error("Error: Both --pattern and --output are required");
    console.error("Use --help for usage information");
    process.exit(1);
  }

  return { pattern, outputFile, baseDir: baseDir || undefined };
};

const main = () => {
  const config = parseArgs();
  buildSchema(config);
};

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
