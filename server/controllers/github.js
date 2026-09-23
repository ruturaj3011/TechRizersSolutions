import { ok, error } from '../utils/response.js';

export async function getRepositories(req, res) {
	try {
		let query = (req.query.username || req.query.org || req.query.url || '').trim();
		if (!query) {
			return error(res, 'Please provide a GitHub username, organization, or repository URL', 400);
		}

		// If full URL is passed, extract the username/org or repo
		if (query.startsWith('http://') || query.startsWith('https://')) {
			try {
				const parsed = new URL(query);
				const parts = parsed.pathname.replace(/^\/|\/$/g, '').split('/');
				if (parts.length >= 1 && parts[0]) {
					query = parts[0];
				}
			} catch {
				// keep query as-is
			}
		}

		const headers = {
			'Accept': 'application/vnd.github.v3+json',
			'User-Agent': 'TechRizers-Enterprise-App'
		};

		if (process.env.GITHUB_TOKEN) {
			headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
		}

		// Try user repos first, fallback to org repos
		let url = `https://api.github.com/users/${encodeURIComponent(query)}/repos?type=public&sort=updated&per_page=30`;
		let ghRes = await fetch(url, { headers });

		if (ghRes.status === 404) {
			// Try org endpoint
			url = `https://api.github.com/orgs/${encodeURIComponent(query)}/repos?type=public&sort=updated&per_page=30`;
			ghRes = await fetch(url, { headers });
		}

		if (!ghRes.ok) {
			if (ghRes.status === 404) {
				return error(res, `GitHub user or organization '${query}' was not found.`, 404);
			}
			if (ghRes.status === 403) {
				return error(res, 'GitHub API rate limit exceeded. Please try again in a few minutes.', 429);
			}
			return error(res, 'Unable to load repositories right now. Please try again.', ghRes.status);
		}

		const repos = await ghRes.json();
		if (!Array.isArray(repos)) {
			return error(res, 'Invalid response received from GitHub', 502);
		}

		// Filter public repositories only and map needed fields
		const cleanRepos = repos
			.filter((r) => !r.private)
			.map((r) => ({
				name: r.name,
				fullName: r.full_name,
				description: r.description || '',
				language: r.language || 'Code',
				stars: r.stargazers_count || 0,
				forks: r.forks_count || 0,
				topics: Array.isArray(r.topics) ? r.topics : [],
				updatedAt: r.updated_at,
				url: r.html_url,
				homepage: r.homepage || '',
				defaultBranch: r.default_branch || 'main'
			}));

		return ok(res, cleanRepos, `Found ${cleanRepos.length} public repositories for '${query}'`);
	} catch (err) {
		console.error('GitHub API error:', err);
		return error(res, 'Unable to load repositories right now. Please try again.', 500);
	}
}
