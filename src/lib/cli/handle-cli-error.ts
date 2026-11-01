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

const SIGINT_EXIT_CODE = 130;

/**
 * Shared top-level error handler for every CLI entry point.
 * A user cancelling a prompt (ctrl+c) exits quietly instead of printing a stack trace.
 */
export const handleCliError = (error: unknown): void => {
    if (error instanceof Error && error.name === 'ExitPromptError') {
        process.exitCode = SIGINT_EXIT_CODE;
        return;
    }
    console.error(error);
    process.exitCode = 1;
};
