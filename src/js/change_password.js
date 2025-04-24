export const DisplayChangePassword = () => {
    let html = `
    <form action="main_page.html" id="change-password-form" class="flex flex-col items-center">
        <label class="self-start mt-6">Current Password</label>
        <input class="my-4 p-1 self-stretch rounded-md shadow-md shadow-gray-500" type="text" placeholder="Current Password">
        <label class="self-start mt-12">New Password</label>
        <input class="my-4 p-1 self-stretch rounded-md shadow-md shadow-gray-500" type="password" placeholder="New Password">
        <label class="self-start mt-6">Confirm New Password</label>
        <input class="my-4 p-1 self-stretch rounded-md shadow-md shadow-gray-500" type="password" placeholder="Confirm Password">
    </form>
    <button type="submit" form="change-password-form" value="submit"><yellow-button>Update</yellow-button></button>
    `;

    document.querySelector("main div").innerHTML = html;

    document.dispatchEvent(new CustomEvent('contentLoaded'));
}