#!/usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import { exec } from 'child_process';
import inquirer from 'inquirer';
import gitClone from 'git-clone';
import fs from 'fs';
import path from 'path';

program.version('1.0.0')
  .argument('<project-name>', 'Create a new React component project')
  .action((projectName) => {
    console.log(chalk.green(`Creating a new React component project: ${projectName}`));

    inquirer.prompt([
      {
        type: 'input',
        name: 'version',
        message: 'Enter the package version:',
        default: '1.0.0'
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Enter the repository URL:'
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Enter keywords (comma-separated):'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Enter the author name:'
      },
      {
        type: 'input',
        name: 'license',
        message: 'Enter the license:'
      }
    ]).then(answers => {
      const templateRepoUrl = 'https://github.com/octa-labs-official/create-react-package-template';
      gitClone(templateRepoUrl, projectName, {}, () => {
        console.log(chalk.green('Project created successfully!'));

        // Update package.json with user inputs
        const packageJsonPath = `${projectName}/package.json`;
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        packageJson.name = projectName;
        packageJson.version = answers.version;
        packageJson.repository.url = answers.repository;
        packageJson.keywords = answers.keywords.split(',').map(keyword => keyword.trim());
        packageJson.author = answers.author;
        packageJson.license = answers.license;
        packageJson.bugs.url = `${answers.repository}/issues`;
        packageJson.homepage = `${answers.repository}#readme`;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        // Remove the .git directory
        const gitDirPath = path.join(projectName, '.git');
        fs.rm(gitDirPath, { recursive: true, force: true }, (err) => {
          if (err) {
            console.error(chalk.red('Failed to remove .git directory:'), err);
            return;
          }
          console.log(chalk.yellow('Removed .git directory.'));
        });

        // Install dependencies
        console.log(chalk.green('Installing dependencies...'));
        exec(`cd ${projectName} && npm install`, (err, stdout, stderr) => {
          if (err) {
            console.error(chalk.red('Error installing dependencies:'), err);
            return;
          }
          console.log(chalk.green('Dependencies installed successfully!'));
          console.log(chalk.yellow('Your project is ready. Navigate to the project directory and start coding!'));
        });
      });
    });
  });

program.parse(process.argv);
