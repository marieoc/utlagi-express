
const dropDownFile = () => {
    document.querySelectorAll('.drop-zone__input').forEach(inputElement => {
        const dropZoneElement = inputElement.closest('.drop-zone');
        
        // 
        dropZoneElement.addEventListener('click', (event) => {
            inputElement.click();
        });
        
        inputElement.addEventListener('change', (event) => {
            if (inputElement.files.length) {
                updateThumbnail(dropZoneElement, inputElement.files[0]);
            }
        });
        
        
        // Drag and drop event
        dropZoneElement.addEventListener('dragover', (event) => {
            event.preventDefault();
            dropZoneElement.classList.add('drop-zone--over');
        });
        
        dropZoneElement.addEventListener('dragleave', (event) => {
            dropZoneElement.classList.remove('drop-zone--over');
        });
        
        dropZoneElement.addEventListener('dragend', (event) => {
            dropZoneElement.classList.remove('drop-zone--over');
        });
        
        dropZoneElement.addEventListener('drop', (event) => {
            event.preventDefault();
            // console.log(event.dataTransfer.files); getting the file Object
            
            if (event.dataTransfer.files.length) {
                inputElement.files = event.dataTransfer.files;
                // console.log(inputElement.files);
                updateThumbnail(dropZoneElement, event.dataTransfer.files[0]);
            }
            dropZoneElement.classList.remove('drop-zone--over');
        })
        
        
    });
    
    const updateThumbnail = (dropZoneElement, file) => {
        let thumbnailElement = dropZoneElement.querySelector('.drop-zone__thumb');
        
        
        // First time - remove the prompt
        if (dropZoneElement.querySelector('.drop-zone__prompt')) {
            dropZoneElement.querySelector('.drop-zone__prompt').remove();
        }
        
        //First time - if there is no thumbnailEl, create one
        if (!thumbnailElement) {
            thumbnailElement = document.createElement('div');
            thumbnailElement.classList.add('drop-zone__thumb');
            dropZoneElement.appendChild(thumbnailElement);
        }
        
        thumbnailElement.dataset.label = file.name;
        
        // Show thumbail for image file
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.readAsDataURL(file);
            reader.onload = () => {
                thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
            };
        } else {
            thumbnailElement.style.backgroundImage = null;
        }
        
    }
};

export default dropDownFile;