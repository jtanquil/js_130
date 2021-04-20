## JS 130 - Lesson 4 Notes ##

- `.gitignore`: create at the top level for every project
    - add `node_modules` to the `.gitignore`, no reason to copy downloaded modules to github
- node packages
    -  node packages and `require`
        - don't need to give relative paths to `require` when importing packages installed with `npm`, it looks inside `node_modules` to find a folder with the same name as the argument
        - depending on the structure of the package, you may or may not be able to only import specific parts of it via `require`
            - each file of the package exports its public names with `module.exports`, which are then imported with `require` regardless of whether you need to actually use them in code or not, which can be burdensome on system memory
            - importing the whole file and only assigning the necessary parts to variables in your code can lessen the memory issues since the rest of the imported package will be eligible for garbage collection:
            ```javascript
            const test = require('testPackage').testFunc; // everything else imported up for GC
            ```
    - **local vs global packages**
        - **local packages**: local (to a project) install done with `npm install` without the `--global` option
            - *recommended to use local install for most packages**: lets different projects use the versions of packages it needs, prevent errors due to sharing packages between projects with different dependencies
            - **how `node_modules` works**: local install downloads and installs a package into the `node_modules` folder
                - `npm` looks for an existing directory named `node_modules` in the current folder, then looks up the directory hierarchy until it finds one; if it doesn't find one, it creates `node_modules` in the directory in which `npm install` was run
                - **this is why you shouldn't nest your project directory inside a directory that already contains a `node_modules` directory** - install all dependencies inside your project directory, not above it
        - **global packages**: install with the `-g` flag
            - on UNIX systems, node installs these in `/usr/local/lib/node` or `/usr/local/lib/node_modules`
            - can be done with some packages that provide command-line executables (like Heroku), but generally stick to installing things locally unless the documentation explicitly recommends or allows global installation
- `package.json` and `package-lock.json`: file that lists all the packages (and versions of those packages) needed by the project, along with other configuration settings
    - `npm init`: initializes the `package.json` file; asks questions about the project that populate some fields in `package.json`
    - `dependencies`: key in `package.json` meant to store the names/versions of the project's dependencies
        - `npm install` (no arguments or options) will install dependencies detected in the `dependencies` key in `package.json`, then create a new file called `package-lock.json` that contains more precise data on the project's dependencies (and the dependencies of those dependencies, etc)
            - next `npm install`,  `npm` will look at `package-lock.json` and install the specific versions specified there
        - must add `package-lock.json` to the git repo so other developers can install the right versions of dependencies for the project
        - adding new dependencies: either add the dependency to `package.json`, or use `npm install`
            - `--save`/`-S`: flag to add to `npm install ...` that saves the package to the dependencies list in `package.json`
            - `devDependencies`: key in `package.json` saved for packages that are only needed for development (code linters, debuggers, minifiers)
                - `--save-dev` will add to this
                - ESLint typically added here
- local executable packages and `npx`
    - running an executable package, like `eslint`, directly from the terminal will run the globally installed `eslint` executable if it's globally installed (**always install ESLint locally**)
    - running the executable with `npx` will run the locally installed version of that package
        - if the package isn't locally or globally installed, it will download and use a temporary version of that package
- `npm uninstall ...`: uninstalls a dependency (removes it from `node_modules`)
    - `--save`/`--save-dev`: add this flag to also remove from dependencies/dev dependencies
- `npm prune`: remove dependencies, useful for removing packages from `node_modules` after removing dependencies manually from `package.json`

- transpilation
    - process of converting source code written in one language into another language with a similar level of abstraction
    - typically in the context of JavaScript, it means taking code written in a superset of JavaScript and rewriting it in plain JavaScript
    - common scenario: transpiling ES6+ JavaScript into ES5 JavaScript; **Babel** is a package that can do this
- Babel
    - install: recommended to locally install Babel; need to install `@babel/core` and `@babel/cli`, install to dev
    - transpiling: `npx babel [input directory] --out-dir [output directory]` will transpile everything in the input directory and put the transpiled files in the output directory
        - need to actually tell Babel to transpile in a particular way, this command by itself won't change the code beyond some small syntactical changes
        - one way: install a Babel `env` preset - plug-in that provides information needed to compile one version of JavaScript to another:
            - `npm install --save-dev @babel/preset-env` installs the preset
            - `npx babel [input directory] --out-dir [output directory] --presets=@babel/preset-env` will transpile, telling Babel what preset to use with the `--presets` flag; this will transpile to ES5

- automating tasks with `npm` scripts
    - `scripts` object in `package.json`: contains key/value pairs where each key is the name of the script, and the value is the script itself (command line scripts)
    - run with `npm run [script name]`
    - example: can add Babel transpilation to `scripts`, just run that command every time necessary instead of the entire `npx` command
        - `npm` scripts knows how to find command-line executables, prefers local installations when running the scripts, so don't need `npx`:
            ```javascript
            // in scripts
            "babel": "babel lib --out-dir dist --presets=@babel/preset-env"
            ```
            - this can only run pre-installed packages; with `npx`, `npx` would search for and install packages for one-time execution

- packaging node modules:
    - create a `package.json` file
    - provide values for the `name`, `version` and `main` fields:
        - `name` is the name of the package
        - `version` is the initial module version
        - `main` is the name of the file that Node will load when someone imports the package
            - typically `index.js` in the root directory of the project
    - publish with `npm publish --access public`
        - need an `npm` account to do this