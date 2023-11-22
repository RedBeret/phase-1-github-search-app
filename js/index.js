document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchValue = document.getElementById('search').value;
        searchUsers(searchValue);
    });

    function searchUsers(query) {
        fetch(`https://api.github.com/search/users?q=${query}`)
            .then(response => response.json())
            .then(data => {
                userList.innerHTML = data.items.map(user =>
                    `<li onclick="fetchUserRepos('${user.login}')">${user.login}</li>`
                ).join('');
            });
    }

    window.fetchUserRepos = function (username) {
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => response.json())
            .then(repos => {
                reposList.innerHTML = repos.map(repo =>
                    `<li>${repo.name}</li>`
                ).join('');
            });
    }
});

