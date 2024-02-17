import { getImages } from './js/api.js';
import { renderGallery } from './js/gallery.js';

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-btn');
const loader = document.querySelector('.loader');

let lightbox;
let countPage = 1;
let searchValue;

form.addEventListener('submit', onSearchImages);
loadBtn.addEventListener('click', onLoadImages);

async function onSearchImages(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  loader.classList.remove('hidden');
  loadBtn.classList.add('hidden');
  searchValue = form.elements.q.value.trim();
  countPage = 1;
  try {
    if (searchValue !== '') {
      const data = await getImages(searchValue, countPage);
      if (data.hits.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          backgroundColor: '#EF4040',
          titleColor: '#FFFFFF',
          messageColor: '#FFFFFF',
        });
      } else {
        const galleryMarkup = renderGallery(data.hits, lightbox);
        gallery.insertAdjacentHTML('beforeend', galleryMarkup);
        lightbox.refresh();
        loadBtn.classList.remove('hidden');
      }
    } else {
      iziToast.show({
        message: 'Please fill out the search field',
        position: 'topRight',
        backgroundColor: '#EF4040',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
      });
      loader.classList.add('hidden');
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add('hidden');
    form.reset();
  }
}

async function onLoadImages() {
  loadBtn.classList.add('hidden');
  loader.classList.remove('hidden');
  countPage += 1;
  try {
    const data = await getImages(searchValue, countPage);
    const galleryMarkup = renderGallery(data.hits, lightbox);
    gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    lightbox.refresh();
    loadBtn.classList.remove('hidden');
    if (data.totalHits - countPage * 40 <= 0) {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#03a9f4',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
      });
      loadBtn.classList.add('hidden');
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
  });
});

