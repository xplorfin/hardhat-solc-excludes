# hardhat-solc-excludes

Sometimes, you want to exclude certain files or directories from being compiled by Hardhat. Unfortunately,
there's no inbuilt way to do that. 

Enter **hardhat-solc-excludes**.

By importing hardhat-solc-excludes (`import @xplorfin/hardhat-solc-excludes`), Hardhat's Solidity configuration
interface is extended with an `excludes` sub-object, which looks something like

```typescript
interface SolcExcludes {
    files?: string[],
    directories?: string[],
}
```

The internal Hardhat subtask responsible for gathering the list of Solidity files to compile is overridden 
with one that does _more or less_ the same thing, save for filtering out files and directories which are defined 
in the `excludes` object. 

## Installation

- Yarn: `yarn add --dev @xplorfin/hardhat-solc-excludes`
- NPM: `npm i --save-dev @xplorfin/hardhat-solc-excludes`

## Usage

```typescript
// hardhat.config.ts

// make sure hardhat-solc-excludes is imported somewhere close to the top of your hardhat config file.
import {HardhatUserConfig} from "hardhat/types";
import "@xplorfin/hardhat-solc-excludes";

const hardhatConfig: HardhatUserConfig = {
    /* your hardhat config goes here */
    solidity: {
        compilers: [
            {
                version: "0.7.6",
                settings: {/*...*/},
            },
            {
                version: "0.6.12",
                settings: {/*...*/},
                // Exclude files/directories at the compiler level
                excludes: {
                    files: ["MyContractToExclude.sol"]
                }
            }
        ],
        // Exclude files/directories at the global config level (applies to ALL compilers) 
        excludes: {
            directories: [
                "contracts/directory_to_exclude"
            ]
        }
    }
};

export default hardhatConfig;
```

## Contributing/Issues

### Issues
Open an issue on GitHub, and we'll take a look. 

### Pull Requests (Features, bug fixes, etc.)
Open an issue and accompanying pull request on GitHub, and we'll review it from there.

This project is licensed under the MIT license, which means you can modify it however you'd like. That being said,
if you're (legally, morally, etc.) able to push your changes upstream, please do! 