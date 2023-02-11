const { simpleGit, SimpleGit, SimpleGitOptions, GitResponseError } = require('simple-git');

class GitController {

    /**
     * Creates a git repository instance
     *
     * @gitOptions   {repoPath: String, branch: String}
     */
    constructor(gitOptions) {

        if (!gitOptions.branch || !gitOptions.repoPath) {
            throw new Error("Wrong gitOptions format")
        }

        const options = {
            baseDir: gitOptions.repoPath,
            binary: 'git',
            maxConcurrentProcesses: 6,
            trimmed: false,
        };

        let sg = simpleGit(options)

        this.gitConfig = {
            repo: sg,
            gitOptions
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

    async clone(repoURL) {
        await this.gitConfig.repo.clone(repoURL, this.gitConfig.baseDir)

        const options = {
            baseDir: this.gitConfig.repoPath,
            binary: 'git',
            maxConcurrentProcesses: 6,
            trimmed: false,
        };

        this.gitConfig.repo = await simpleGit(options)
        return this.gitConfig.repo
    }

}

module.exports = GitController