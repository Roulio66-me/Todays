document.addEventListener("DOMContentLoaded", function() {
    const showHideButton = document.getElementById('showHideButton');
    const tagCloud = document.getElementById('tagCloud');
    const tags = document.querySelectorAll('.tag');
    const programBlocks = document.querySelectorAll('.program-block');

    // Toggle tags visibility
    showHideButton.addEventListener('click', () => {
        tagCloud.classList.toggle('show-all');
        if (tagCloud.classList.contains('show-all')) {
            showHideButton.textContent = 'Masquer';
        } else {
            showHideButton.textContent = 'Rechercher';
        }
    });

    // Handle tag selection
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const selectedTags = tag.getAttribute('data-tags').split(',');
            tags.forEach(t => t.classList.remove('selected'));
            tag.classList.add('selected');

            programBlocks.forEach(block => {
                const programName = block.getAttribute('data-program-name');
                const isMatch = selectedTags.some(selectedTag => programName.includes(selectedTag.trim()));

                if (isMatch) {
                    block.classList.add('highlight');
                } else {
                    block.classList.remove('highlight');
                }
            });
        });
    });
});