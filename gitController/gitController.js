const { simpleGit, SimpleGit, SimpleGitOptions, GitResponseError } = require('simple-git');

class GitController {

    /**
     * Creates a git repository instance
     *
     * @gitOptions   {repoPath: String, branch: String}
     */
    constructor(gitOptions) {
        const { repoPath, branch } = gitOptions;

        const options = {
            baseDir: repoPath,
            binary: 'git',
            maxConcurrentProcesses: 6,
            trimmed: false,
        };

        let sg = simpleGit(options)
        
        this.gitConfig = {
            repo: sg,
            branch: branch,
            baseDir: sg.baseDir
        };

    }

    async commitItem(message, itemPath) {
        await this.gitConfig.repo.add(itemPath);
        return await this.gitConfig.repo.commit(message);
    }

    async commitAll(message) {
        await this.gitConfig.repo.add("./");
        return await this.gitConfig.repo.commit(message);
    }

    async push() {
        return await this.gitConfig.repo.push("origin", this.gitConfig.branch)
    }

    async pull() {
        return await this.gitConfig.repo.pull("origin", this.gitConfig.branch)
    }

    async status() {
        return await this.gitConfig.repo.status()
    }

}

// async function execute(repoPath) {
//     const options = {
//         baseDir: repoPath,
//         binary: 'git',
//         maxConcurrentProcesses: 6,
//         trimmed: false,
//     };

//     let res;
//     let repo = simpleGit(options);

//     await repo.add(".");
//     await repo.commit("commit from nodejs");
//     await repo.push("origin", "main");

//     repo = simpleGit(options_B);
//     console.log("pulling into repo-B");
//     res = await repo.pull("origin", "main");

//     console.log("Done");

// }

module.exports = GitController