// La fonction showProgram est maintenant accessible partout,
// car elle n'est pas enfermée dans l'événement DOMContentLoaded.
function showProgram(program) {
    let fileName = program
        .toLowerCase()
        .replace(/[éèêë]/g, 'e')
        .replace(/[àâä]/g, 'a')
        .replace(/[îï]/g, 'i')
        .replace(/[ôö]/g, 'o')
        .replace(/[ûü]/g, 'u')
        .replace(/[ç]/g, 'c')
        .replace(/ /g, '-')
        .replace(/[']/g, '')
        .replace(/[^a-zA-Z0-9\-]/g, '');
    window.location.href = `${fileName}.html`;
}

// Le reste du code est à l'intérieur de DOMContentLoaded
// pour s'assurer que les éléments HTML sont bien chargés avant d'être manipulés.
document.addEventListener('DOMContentLoaded', function() {
    // Logique pour le bouton Afficher/Masquer les tags
    const toggleButton = document.getElementById('toggleTagsButton');
    const tagCloud = document.getElementById('tagCloud');

    if (toggleButton && tagCloud) {
        toggleButton.addEventListener('click', function() {
            tagCloud.classList.toggle('show-all');
            if (tagCloud.classList.contains('show-all')) {
                toggleButton.textContent = 'Masquer';
            } else {
                toggleButton.textContent = 'Commencer maintenant';
            }
        });
    }

    // Logique de sélection des tags
    const tags = document.querySelectorAll('.tag');
    if (tags) {
        tags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                if (e.target.classList.contains('remove-tag')) {
                    return;
                }

                if (!tag.classList.contains('selected')) {
                    tag.classList.add('selected');
                    const cross = document.createElement('button');
                    cross.className = 'remove-tag';
                    cross.innerHTML = '✖';
                    tag.appendChild(cross);
                } else {
                    tag.classList.remove('selected');
                    const removeBtn = tag.querySelector('.remove-tag');
                    if (removeBtn) {
                        removeBtn.remove();
                    }
                }
                updateProgramsHighlight();
            });
        });
    }

    // Gère le clic sur le bouton de suppression du tag (le 'x')
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-tag')) {
            const tag = e.target.parentElement;
            tag.classList.remove('selected');
            e.target.remove();
            updateProgramsHighlight();
        }
    });

    // Fonction qui met en surbrillance les programmes correspondants aux tags sélectionnés
    function updateProgramsHighlight() {
        const selectedTags = Array.from(document.querySelectorAll('.tag.selected'));
        const selectedTagPrograms = new Set();
        selectedTags.forEach(tag => {
            const programs = tag.getAttribute('data-tags');
            if (programs) {
                programs.split(',').forEach(p => selectedTagPrograms.add(p.trim()));
            }
        });

        document.querySelectorAll('.program-block').forEach(block => {
            const title = block.querySelector('.program-block-title').textContent.trim();
            if (selectedTagPrograms.size === 0) {
                block.classList.remove('highlight');
            } else if (selectedTagPrograms.has(title)) {
                block.classList.add('highlight');
            } else {
                block.classList.remove('highlight');
            }
        });
    }
});