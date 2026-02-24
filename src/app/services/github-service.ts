export type CommitMetadata = {
  repo: string;
  message: string;
  author: string;
  date: string;
  sha: string;
  url: string;
};

export async function getLatestCommit(
  owner: string = "FilippoDude",
  repo: string,
  token?: string,
): Promise<CommitMetadata> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch commits for ${owner}/${repo}`);
  }

  const data = await res.json();
  const commit = data[0];

  return {
    repo: `${owner}/${repo}`,
    message: commit.commit.message,
    author: commit.commit.author.name,
    date: commit.commit.author.date,
    sha: commit.sha,
    url: commit.html_url,
  };
}
