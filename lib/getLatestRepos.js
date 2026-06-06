import axios from "axios";

const getLatestRepos = async (data, token) => {
	try {
		const username = data.githubUsername;
		const url = `https://api.github.com/search/repositories?q=user:${username}&sort=updated&order=desc`;
		const config = token ? { headers: { Authorization: `token ${token}` } } : {};
		const res = await axios.get(url, config);
		return res.data.items.slice(0, 6);
	} catch (err) {
		console.log(err);
		return [];
	}
};

export default getLatestRepos;
