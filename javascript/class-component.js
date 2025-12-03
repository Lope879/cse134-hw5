class ClassCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const field = this.getAttribute('field') !== "undefined" ? this.getAttribute('field') : 'Unknown field';
        const code = this.getAttribute('code') !== "undefined" ? this.getAttribute('code') : 'Unknown code';
        const name = this.getAttribute('name') !== "undefined" ? this.getAttribute('name') : 'Unknown name';
        const note = this.getAttribute('note') !== "undefined" ? this.getAttribute('note') : 'Older picture. Nothing to say here!';
        const imageUrl = this.getAttribute('image-url') || '';

        this.innerHTML = '';
        this.innerHTML += `
            <div class="simple-card">
                <hgroup>
                <p class="field">${field} ${code}</p>
                <h2 class="name">${name}</h2>
                </hgroup>
                <p class="note">${note}</p>
                <img src="${imageUrl}" alt="${name} image"/>
            </div>
        `;
        customElements.define('class-card', ClassCard);
    }

    
}