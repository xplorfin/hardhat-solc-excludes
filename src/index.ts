import "hardhat/types/config"
import {subtask, extendConfig, HardhatUserConfig} from "hardhat/config";
import {HardhatConfig, HardhatRuntimeEnvironment, TaskArguments} from "hardhat/types";
import { TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS } from "hardhat/builtin-tasks/task-names";

import {promisify} from "util";
import glob from "glob";
import path from "path";

const SOL_PATTERN: string = "**/*.sol"

declare module "hardhat/types/config" {
    interface SolcExcludes {
        files?: string[],
        directories?: string[],
    }

    interface SolidityConfig {
        excludes: SolcExcludes
    }

    interface SolcUserConfig {
        excludes?: SolcExcludes
    }

    interface MultiSolcUserConfig {
        excludes?: SolcExcludes
    }
}

extendConfig(function(config: HardhatConfig, userConfig: HardhatUserConfig) {
    if (!userConfig.solidity || typeof userConfig.solidity === 'string') {
        return
    }

    config.solidity.excludes = Object.assign(
        {
            files: [],
            contracts: [],
            directories: [],
        },
        userConfig.solidity.excludes
    );
})

subtask(
    TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS,
    async (_: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<string[]> => {
        const { config: { solidity: { excludes }, paths: { sources, root } } } = hre;

        return promisify(glob)(path.join(sources, SOL_PATTERN))
            .then((res: string[]): string[] => {
                return res
                    .filter((p: string) => !(excludes.files || []).includes(path.basename(p)))
                    .filter((p: string) => !((excludes.directories || []).some((d: string) => p.replace(root, "").includes(d))));
            });
    }
)