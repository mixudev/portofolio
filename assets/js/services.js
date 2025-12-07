// services.js
export function initializeServices() {
    window.toggleService = function(id) {
        const content = document.getElementById(`content-${id}`);
        const arrow = document.getElementById(`arrow-${id}`);
        
        if (!content || !arrow) return;
        
        for (let i = 1; i <= 4; i++) {
            if (i !== id) {
                const otherContent = document.getElementById(`content-${i}`);
                const otherArrow = document.getElementById(`arrow-${i}`);
                if (otherContent && !otherContent.classList.contains('hidden')) {
                    otherContent.classList.add('hidden');
                    otherArrow.classList.remove('rotate-180');
                }
            }
        }
        
        content.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    };
}