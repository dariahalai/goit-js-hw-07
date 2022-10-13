import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const itemsMarkup = galleryItemsMarkup(galleryItems);
gallery.insertAdjacentHTML('beforeend',itemsMarkup);

function galleryItemsMarkup(galleryItems){
    return galleryItems
    .map( ({preview,original,description}) => 
   {return `<a class="gallery__item" href=${original}>
            <img class="gallery__image" 
            src=${preview} 
            alt=${description} 
            />
            </a>`;
})
.join('');
};

gallery.addEventListener('click',selectGalleryElem);

function selectGalleryElem(evt){
    evt.preventDefault();
    if (evt.target.nodeName !== 'IMG'){
        return;
    }
    lightbox.next()
}

const lightbox = new SimpleLightbox('.gallery a',{
    captionsData: 'alt',
    captionsDelay: 250,
}
)