const regExpBranchName = /^([\w-]+)$/;
const checkBranchNamePattern = (branchName) => regExpBranchName.test(branchName);

const regExpRepoName = /^([\w-]+)(\/)([\w-]+)$/;
const checkRepoNamePattern = (repoName) => regExpRepoName.test(repoName);

const regExpPeriod = /^(\d+)$/;
const checkPeriodPattern = (period) => regExpPeriod.test(period);

const minNum = (num) => (number) => Number(number) >= num;
const maxNum = (num) => (number) => Number(number) <= num;
