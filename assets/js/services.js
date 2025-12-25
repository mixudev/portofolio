// services.js
export function initializeServices() {
    window.toggleService = function(id) {
        const content = document.getElementById(`content-${id}`);
        const arrow = document.getElementById(`arrow-${id}`);
        const serviceItem = document.getElementById(`service-${id}`);
        
        if (!content || !arrow || !serviceItem) return;
        
        const isCurrentlyOpen = !content.classList.contains('hidden');
        
        // Loop semua service items untuk reset ke state default
        for (let i = 1; i <= 4; i++) {
            const otherServiceItem = document.getElementById(`service-${i}`);
            const otherContent = document.getElementById(`content-${i}`);
            const otherArrow = document.getElementById(`arrow-${i}`);
            const otherButton = otherServiceItem?.querySelector('button');
            const otherNumber = otherServiceItem?.querySelector('.service-number');
            const otherTitle = otherServiceItem?.querySelector('.service-title');
            const otherArrowContainer = otherServiceItem?.querySelector('.arrow-container');
            const otherDescription = otherServiceItem?.querySelector('.service-description');
            
            if (otherServiceItem && otherContent && otherArrow) {
                // Reset ke background putih
                otherServiceItem.classList.remove('bg-black');
                otherServiceItem.classList.add('bg-gray-50');
                
                // Reset button hover
                if (otherButton) {
                    otherButton.classList.add('hover:bg-gray-100');
                }
                
                // Reset text colors ke hitam
                if (otherNumber) {
                    otherNumber.classList.remove('text-white');
                    otherNumber.classList.add('text-gray-900');
                }
                if (otherTitle) {
                    otherTitle.classList.remove('text-white');
                    otherTitle.classList.add('text-gray-900');
                }
                if (otherDescription) {
                    otherDescription.classList.remove('text-gray-400');
                    otherDescription.classList.add('text-gray-600');
                }
                
                // Reset arrow color
                otherArrow.classList.remove('text-white');
                otherArrow.classList.add('text-gray-900');
                
                // Hapus orange circle dan rotate
                if (otherArrowContainer) {
                    otherArrowContainer.classList.remove('w-10', 'h-10', 'md:w-12', 'md:h-12', 'bg-orange-500', 'rounded-full', 'flex', 'items-center', 'justify-center');
                }
                otherArrow.classList.remove('rotate-180');
                
                // Hide content dengan fade out
                if (!otherContent.classList.contains('hidden')) {
                    otherContent.classList.add('opacity-0');
                    setTimeout(() => {
                        otherContent.classList.add('hidden');
                        otherContent.classList.remove('opacity-0', 'animate-fadeIn');
                    }, 300);
                }
            }
        }
        
        // Jika service yang diklik tidak sedang terbuka, buka dan ubah stylenya
        if (isCurrentlyOpen) {
            // Jika sudah terbuka, tutup saja (sudah di-reset di loop atas)
            return;
        }
        
        // Aktifkan service yang diklik
        const button = serviceItem.querySelector('button');
        const number = serviceItem.querySelector('.service-number');
        const title = serviceItem.querySelector('.service-title');
        const arrowContainer = serviceItem.querySelector('.arrow-container');
        const description = serviceItem.querySelector('.service-description');
        
        // Set background hitam
        serviceItem.classList.remove('bg-gray-50');
        serviceItem.classList.add('bg-black');
        
        // Hapus button hover
        if (button) {
            button.classList.remove('hover:bg-gray-100');
        }
        
        // Set text colors ke putih
        if (number) {
            number.classList.remove('text-gray-900');
            number.classList.add('text-white');
        }
        if (title) {
            title.classList.remove('text-gray-900');
            title.classList.add('text-white');
        }
        if (description) {
            description.classList.remove('text-gray-600');
            description.classList.add('text-gray-400');
        }
        
        // Set arrow color putih dan tambahkan orange circle
        arrow.classList.remove('text-gray-900');
        arrow.classList.add('text-white');
        
        if (arrowContainer) {
            arrowContainer.classList.add('w-10', 'h-10', 'md:w-12', 'md:h-12', 'bg-orange-500', 'rounded-full', 'flex', 'items-center', 'justify-center');
        }
        arrow.classList.add('rotate-180');
        
        // Show content dengan fade in
        setTimeout(() => {
            content.classList.remove('hidden');
            content.classList.add('animate-fadeIn');
        }, 50);
    };
}