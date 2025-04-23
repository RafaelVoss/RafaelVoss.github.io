export const DisplayEditUser = () => {
    let html = `
    <p class="self-start">Nome</p>
    <p class="self-start mb-2 text-sm text-slate-700">User 1</p>
    <p class="self-start mt-2">Usuário</p>
    <p class="self-start mb-2 text-sm text-slate-700">User123</p>
    <form action="main_page.html" id="edit-user-form" class="flex flex-col items-center">
        <label class="self-start mt-6">Email</label>
        <input class="my-4 p-1 self-stretch rounded-md shadow-md shadow-gray-500" type="text" placeholder="user1@example.com">
        <label class="self-start mt-6">Celular</label>
        <input class="my-4 p-1 self-stretch rounded-md shadow-md shadow-gray-500" type="password" placeholder="(19)9 1234-5678">
    </form>
    <button type="submit" form="edit-user-form" value="submit"><yellow-button>Atualizar</yellow-button></button>
    `;

    document.querySelector("main div").innerHTML = html;

    document.dispatchEvent(new CustomEvent('contentLoaded'));
}