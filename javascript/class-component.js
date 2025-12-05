class ClassCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const field = this.getAttribute('field') !== "undefined" ? this.getAttribute('field') : 'Unknown field';
        const code = this.getAttribute('code') !== "undefined" ? this.getAttribute('code') : 'Unknown code';
        const name = this.getAttribute('name') !== "undefined" ? this.getAttribute('name') : 'Unknown name';
        const note = this.getAttribute('note') !== "undefined" ? this.getAttribute('note') : 'Older picture. Nothing to say here!';
        const link = this.getAttribute('link') !== "undefined" ? this.getAttribute('link') : '#';
        const imageUrl = this.getAttribute('image') || '';

        this.innerHTML = '';
        this.innerHTML += `
            <div class="class-card">
                    <hgroup>
                        <p>${field} ${code}</p>
                        <h2>${name}</h2>
                        <a href="${link}">Course Info</a>
                    </hgroup>
                    <picture>
                        <img src="${imageUrl}" alt="${name} Class Image">
                    </picture>
                    <p class="class-note">${note}</p>
                </div>
        `;
    }
}

customElements.define('class-card', ClassCard);