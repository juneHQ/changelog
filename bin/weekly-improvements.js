require("dotenv").config();
const { Octokit } = require("@octokit/rest");

// Initialize Octokit with your personal access token
const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

// Function to get last Friday's date
function getLastFriday() {
  return new Date(new Date().setDate(new Date().getDate() - (((new Date().getDay() + 1) % 7) + 1)));
}

// Function to get the Friday before last
function getFridayBeforeLast() {
  const lastFriday = getLastFriday();
  lastFriday.setDate(lastFriday.getDate() - 7);
  return lastFriday;
}

// Function to fetch PRs from GitHub
async function fetchPRs(owner, repo) {
  const since = getFridayBeforeLast().toISOString();
  const until = getLastFriday().toISOString();

  try {
    const response = await octokit.rest.pulls.list({
      owner,
      repo,
      state: "closed",
      sort: "updated",
      direction: "desc",
      per_page: 100, // Adjust as needed
    });

    return response.data.filter(
      (pr) => pr.merged_at && pr.merged_at >= since && pr.merged_at < until
    );
  } catch (error) {
    console.error("Error fetching PRs:", error.message);
    return [];
  }
}

async function main() {
  const owner = process.env.COMPANY_GITHUB_ORG_NAME;
  const repo = process.env.COMPANY_GITHUB_REPO_NAME;
  const prs = (await fetchPRs(owner, repo)).reverse();

  return prs.map((pr) => {
    const date = new Date(pr.merged_at);
    const formattedDate = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
    return `${pr.title} - ${formattedDate}`;
  });
}

module.exports = main;
