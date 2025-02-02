// OPTION 1
// const pet_to_html = ({name, care, danger, epicness}) => {
// OPTION 2
const pet_to_html = (pet) => {
    const { name, care, danger, epicness } = pet;
    // OPTION 3
    // const name = pet.name;
    // const care = pet.care;
    // ...

    // The above three options are all equivalent to each other; each
    // should be used where appropriate to improve readability.

    const rating_to_string = (rating) => {
        if (rating <= 0.3) return 'Low';
        if (rating <= 0.6) return 'Medium';
        return 'High';
    };

    return `
                <li>
                    <h4>${name}</h4>
                    <p><strong>Care:</strong>${rating_to_string(care)}</p>
                    <p><strong>Danger:</strong>${rating_to_string(danger)}</p>
                    <p><strong>Epicness:</strong>${rating_to_string(epicness)}</p>
                </li>
            `;
}

const all_pets_to_html = (pets) => {
    // do a for loop maybe
    // go through all of pets, print pet_to_html for each one
    // combine them somewhow
    const pet_html_array = pets.map(pet => {
        return pet_to_html(pet);
    })

    const pet_html = pet_html_array.join('\n');

    return `
        <ul>
            ${pet_html}
        </ul>
    `;
};

export {
    pet_to_html,
    all_pets_to_html
}