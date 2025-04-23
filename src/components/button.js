class ButtonYellow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <link href="/src/css/output.css" rel="stylesheet">
      <button class="
        px-4 
        py-2 
        my-8
        rounded-xl 
        text-stone-800 
        font-semibold
        bg-yellow-300 
        shadow-md 
        shadow-gray-600 
        cursor-pointer
        hover:bg-yellow-400 
      ">
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('yellow-button', ButtonYellow);

class ButtonRed extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <button class="
          px-4 
          py-2 
          my-8
          rounded-xl 
          text-stone-800 
          font-semibold
          bg-red-300 
          shadow-md 
          shadow-gray-600 
          cursor-pointer
          hover:bg-red-400 
        ">
          <slot></slot>
        </button>
      `;
    }
  }
  
  customElements.define('red-button', ButtonRed);

  class ButtonRedder extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <button class="
          px-4 
          py-2 
          my-8
          rounded-xl 
          text-stone-800 
          font-semibold
          bg-red-500 
          shadow-md 
          shadow-gray-600 
          cursor-pointer
          hover:bg-red-600 
        ">
          <slot></slot>
        </button>
      `;
    }
  }
  
  customElements.define('redder-button', ButtonRedder);

  class ButtonGreen extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <button class="
          px-4 
          py-2 
          my-8
          rounded-xl 
          text-stone-800 
          font-semibold
          bg-green-300 
          shadow-md 
          shadow-gray-600 
          cursor-pointer
          hover:bg-green-400 
        ">
          <slot></slot>
        </button>
      `;
    }
  }
  
  customElements.define('green-button', ButtonGreen);

class ButtonNav extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <button class="
          w-full
          my-2
          py-6 
          rounded-xl 
          text-stone-800 
          font-semibold
          bg-slate-500 
          shadow-md 
          shadow-gray-600 
          cursor-pointer
          hover:bg-slate-600 
        ">
          <slot></slot>
        </button>
      `;
    }
  }
  
  customElements.define('nav-button', ButtonNav);

  class ButtonDoc extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <button class="
          w-full
          my-2
          py-6 
          rounded-xl 
          text-stone-800 
          font-semibold
          bg-slate-500 
          shadow-md 
          shadow-gray-600 
          cursor-pointer
          hover:bg-slate-600 
        ">
          <h4 class="
          text-2xl 
          border-b-2 
          border-solid
          border-black
          pb-2
          mb-4">
            <slot name="title-slot"></slot>
          </h4>
          <p>
            <slot name="description-slot"></slot>
          </p>
        </button>
      `;
    }
  }
  
  customElements.define('doc-button', ButtonDoc);

  class ButtonBurger extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#FF0000" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 stroke-slate-700 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      `;
    }
  }
  
  customElements.define('hamburger-button', ButtonBurger);

  class ButtonSearch extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 stroke-slate-700 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      `;
    }
  }
  
  customElements.define('search-button', ButtonSearch);

  class ButtonSend extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
      `;
    }
  }
  
  customElements.define('send-button', ButtonSend);

  class ButtonPhoto extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
        </svg>
      `;
    }
  }
  
  customElements.define('photo-button', ButtonPhoto);

  class ButtonFilm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      `;
    }
  }
  
  customElements.define('film-button', ButtonFilm);

  class ButtonAudio extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
        </svg>
      `;
    }
  }
  
  customElements.define('audio-button', ButtonAudio);

  class ButtonDelete extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link href="/src/css/output.css" rel="stylesheet">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

      `;
    }
  }
  
  customElements.define('delete-button', ButtonDelete);