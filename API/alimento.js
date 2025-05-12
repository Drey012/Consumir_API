document.getElementById('fetchUsers').addEventListener('click', fetchUserData);

async function fetchUserData() {
    const userContainer = document.getElementById('userContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');

    loadingIndicator.classList.remove('hidden');
    userContainer.innerHTML = '';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API.');
        }

        const users = await response.json();

        loadingIndicator.classList.add('hidden');

        users.forEach(user => {
            userContainer.appendChild(createUserCard(user));
        });

    } catch (error) {
        loadingIndicator.classList.add('hidden');
        userContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <i class="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Erro ao carregar os dados</h3>
                <p class="text-gray-600">Ocorreu um erro ao buscar os dados. Tente novamente.</p>
                <button onclick="fetchUserData()" class="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition">
                    Tentar novamente
                </button>
            </div>
        `;
        console.error(error);
    }
}

function createUserCard(user) {
    const card = document.createElement('div');
    card.className = 'card p-6';

    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    const fullAddress = `${user.address.street}, ${user.address.suite}<br>${user.address.city}, ${user.address.zipcode}`;

    card.innerHTML = `
        <div class="text-center mb-6">
            <div class="user-avatar mb-4">${initials}</div>
            <h3 class="text-xl font-semibold text-gray-800">${user.name}</h3>
            <p class="text-gray-500">@${user.username}</p>
        </div>

        <div class="space-y-4">
            <div class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 text-blue-500">
                    <i class="fas fa-envelope"></i>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-gray-500">Email</p>
                    <a href="mailto:${user.email}" class="text-blue-600 hover:text-blue-800 hover:underline">${user.email}</a>
                </div>
            </div>

            <div class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 text-blue-500">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-gray-500">Endereço</p>
                    <p class="text-gray-700">${fullAddress}</p>
                </div>
            </div>

            <div class="flex items-start">
                <div class="flex-shrink-0 h-6 w-6 text-blue-500">
                    <i class="fas fa-globe"></i>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-gray-500">Localização</p>
                    <a href="https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}" target="_blank" class="map-link text-blue-600 hover:underline flex items-center">
                        <span>Ver no mapa</span>
                        <i class="fas fa-external-link-alt ml-1 text-xs"></i>
                    </a>
                </div>
            </div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span class="text-xs text-gray-500">ID: ${user.id}</span>
            <button class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded-full transition">
                <i class="fas fa-user-plus mr-1"></i> Conectar
            </button>
        </div>
    `;

    return card;
}
