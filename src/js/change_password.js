export const DisplayChangePassword = () => {
    let html = `
    <form action="main_page.html" id="change-password-form" class="flex flex-col items-center">
        <label class="self-start mt-6">Senha Atual</label>
        <input class="my-4 p-1 self-stretch rounded-md shadow-md shadow-gray-500" type="text" placeholder="Senha Atual">
        <label class="self-start mt-12">Nova Senha</label>
        <input class="my-4 p-1 self-stretch rounded-md shadow-md shadow-gray-500" type="password" placeholder="Nova Senha">
        <label class="self-start mt-6">Confirmar Nova Senha</label>
        <input class="my-4 p-1 self-stretch rounded-md shadow-md shadow-gray-500" type="password" placeholder="Confirmar Senha">
    </form>
    <button type="submit" form="change-password-form" value="submit"><yellow-button>Atualizar</yellow-button></button>
    `;

    document.querySelector("main div").innerHTML = html;

    document.dispatchEvent(new CustomEvent('contentLoaded'));
}