const screen = {
	userProfile: document.querySelector(".profile-data"),
	renderUser(user) {
		this.userProfile.innerHTML = `
		<div class="info">
			<img src="${user.avatarUrl}" alt="foto do perfil do usuário" />
			<div class="data">
				<h1>${user.name ?? "Não possui nome cadastrado"}</h1>
				<p>${user.bio ?? "Não possui biografia cadastrada"}</p>
				<div class="follow">
					<p><strong>Seguidores:</strong> ${user.followers}</p>
					<p><strong>Segue:</strong> ${user.following}</p>
				</div>
			</div>
		</div>`;

		let repositoriesItens = ``;
		user.repositories.forEach((repo) => {
			let repoLanguage = repo.language;
			if (repoLanguage == null) {
				repoLanguage = "Nenhuma";
			}

			repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">
				<h2>${repo.name}</h2>
				<div class="repo-info">
					<p>🍴 ${repo.forks_count}</p>
					<p>⭐ ${repo.stargazers_count}</p>
					<p>👀 ${repo.watchers_count}</p>
					<p>👨‍💻 ${repoLanguage}</p>
				</div>
			</a></li>`;
		});

		if (user.repositories.length > 0) {
			this.userProfile.innerHTML += `
         <div class="repositories section">
            <h2 class="repositories-title">Repositórios</h2>
            <ul>${repositoriesItens}</ul>
         </div>`;
		}

		let eventsItems = ``;
		user.events.forEach((event) => {
			if (event.type !== "PushEvent" && event.type !== "CreateEvent") return;

			const commitPath = event.payload.commits;
			if (event.type === "PushEvent" && commitPath && commitPath.length > 0) {
				eventsItems += `<li><h3><strong>${event.repo.name}</strong> - ${commitPath[0].message}</h3></li>`;
			} else {
				eventsItems += `<li><h3><strong>${event.repo.name}</strong> - Sem mensagem de commit</h3></li>`;
			}
		});

		if (eventsItems) {
			this.userProfile.innerHTML += `
    <div class="events">
        <h2>Eventos</h2>
        <ul class="events-list">${eventsItems}</ul>
    </div>`;
		}
	},
	renderNotFound() {
		this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
	},
};

export { screen };
