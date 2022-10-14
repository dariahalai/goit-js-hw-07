import { galleryItems } from './gallery-items.js';


const gallery = document.querySelector('.gallery');
const galleryImg = document.querySelector('.gallery__image')
const itemsMarkup = galleryItemsMarkup(galleryItems);
gallery.insertAdjacentHTML('beforeend',itemsMarkup);

function galleryItemsMarkup(galleryItems){
    return galleryItems
    .map( ({preview,original,description}) => 
   {return `<div class="gallery__item">
        <a class="gallery__link" href=${original}>
            <img
            class="gallery__image lazyload"
            data-src=${preview}
            loading="lazy"
            data-source= ${original}
            alt= ${description}
            />
        </a>
    </div>`;
})
.join('');
};

gallery.addEventListener('click',selectGalleryElem);

function selectGalleryElem(evt){
    evt.preventDefault();
    const selectedGalleryElem = evt.target.dataset.source;
    if (evt.target.nodeName !== 'IMG'){
        return;
    }

    const instance = basicLightbox.create(`
    <img src=${selectedGalleryElem}>`
    )
    instance.show()

    gallery.addEventListener('keydown',(evt) =>{
        if(evt.code === 'Escape'){
            console.log('close modal');
            instance.close();
        }
    });
};

if('loading' in HTMLImageElement.prototype){
    const lazyImg = document.querySelectorAll('img[loading="lazy"]');
    lazyImg.forEach(img =>{
        img.src = img.dataset.src;
    });
}
else{
    const script = document.createElement('script');
    script.src ='https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    script.integrity='sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
    script.crossorigin='anonymous';

    document.body.appendChild(script);
};

