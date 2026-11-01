/**
 * Copyright 2023 Hasnae Rehioui
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import inquirer from 'inquirer';

import { Worktree } from './list-worktrees';

export const selectWorktree = async (
    worktrees: Worktree[]
): Promise<string | undefined> => {
    if (worktrees.length === 0) return undefined;
    // Prompt UI goes to stderr so stdout carries only the selected path and
    // can be used as `cd "$(git work list)"`.
    const answer = await inquirer.createPromptModule({
        output: process.stderr
    })([
        {
            name: 'selectedPath',
            type: 'select',
            message: 'choose a worktree',
            choices: worktrees.map((worktree) => ({
                name: worktree.branch
                    ? `${worktree.path} (${worktree.branch})`
                    : worktree.path,
                value: worktree.path
            })),
            pageSize: 10
        }
    ]);
    return answer.selectedPath;
};
