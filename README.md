# git-in-nodejs
basically makes SimpleGit even simpler


<h3>Installation</h3>

 - `npm install git-in-nodejs`
 
 <h3>Usage</h3>
 
 Importing and creating a instance from a local repository
 
 ```
  const GitController = require("git-in-nodejs");

  let repoPath = 'path/to/project'
  let branch = 'main'

  const repo = new GitController({ repoPath, branch });
 ```
 
 cloning repository
 
 ```
  let destPath = "path/to/clone/<RepoFolderName>";
  let branch = "main";
  
  const repo = await GitController.clone(destPath, branch, "https://github.com/<username>/<repo-name>");
 ```
 
 making actions
 
 ```
  let repoPath = "path/to/clone/<RepoFolderName>";
  let branch = "main";

  const repo = new GitController({repoPath, branch})

  await repo.pull();
  await repo.commitItem("commiting a single file", "path/to/file.txt")
  await repo.commitAll("commiting all files from git-in-nodejs")
  await repo.push();
 ```
 
 
