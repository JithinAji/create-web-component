/*
Creted by JIthin Aji
Use this to create the folders and files for a basic typescript web component 
 */

const { ADDRGETNETWORKPARAMS } = require("dns");
var fs = require("fs");

let componentName = "";

const args = process.argv.slice(2);

args.forEach((arg) => {
  if (arg.indexOf("name=") == 0) {
    componentName = arg.replace("name=", "");
    console.log(arg);
  }
});

if (componentName === "") componentName = args[0];

if (!fs.existsSync(`./${componentName}/ts`)) {
  fs.mkdirSync(`./${componentName}`);
  fs.mkdirSync(`./${componentName}/ts`);
}

let tsFileName = componentName.substr(componentName.indexOf("-") + 1);

function capitalize(input) {
  var words = input.split("-");
  var CapitalizedWords = [];
  words.forEach((element) => {
    CapitalizedWords.push(
      element[0].toUpperCase() + element.slice(1, element.length)
    );
  });
  return CapitalizedWords.join("");
}

function manifestName(input) {
  var words = input.split("-");
  var CapitalizedWords = [];
  words.forEach((element) => {
    CapitalizedWords.push(
      element[0].toUpperCase() + element.slice(1, element.length)
    );
  });
  return CapitalizedWords.join(" ");
}

fs.writeFile(
  `./${componentName}/ts/${tsFileName}.ts`,
  `
// last modified:
class ${capitalize(componentName)} extends HTMLElement {
  private shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback(): void {}
  disconnectedCallback(): void {}
  static getObservedAttributes() {}
  attributeChangedCallback(): void {}
}
customElements.define("${componentName}", ${capitalize(componentName)});
`,
  function (err) {
    if (err) throw err;
    console.log("ts File is created successfully.");
  }
);

fs.writeFile(
  `./${componentName}/manifest.json`,
  `
  {
    "name": "${manifestName(componentName)}",
    "type": "${componentName}",
    "tagName": "${componentName}",
    "version": 1.0,
    "customElementsVersion": 1,
    "description": "${manifestName(componentName)}",
    "files": {
        "js": [],
        "css": []
    },
    "attributes":[],
    "events":[],
    "methods":[]
  }
  `,
  function (err) {
    if (err) throw err;
    console.log("manifest File is created successfully.");
  }
);

fs.writeFile(
  `./${componentName}/tsconfig.json`,
  `
  {
    "compilerOptions": {     
      "target": "es6" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
      "module": "commonjs" /* Specify what module code is generated. */,
      "rootDir": "./ts" /* Specify the root folder within your source files. */,
      "outDir": "",                                   /* Specify an output folder for all emitted files. */
      "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables allowSyntheticDefaultImports for type compatibility. */,
      "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,
  
      "strict": true /* Enable all strict type-checking options. */,
      "skipLibCheck": true /* Skip type checking all .d.ts files. */
    }
  }
`,
  function (err) {
    if (err) throw err;
    console.log("tsconfig File is created successfully.");
  }
);
