import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const renderGallery = (data, lightbox) => {
  const markup = data.map(item => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = item;
    return `<li class="gallery-item">
                <a class="gallery-link" href=${largeImageURL}>
                <img src=${webformatURL} alt="${tags}" /></a>
                    <ul class="image-desc">
                        <li class="image-desc-item"><p>Likes</p><p>${likes}</p></li>
                        <li class="image-desc-item"><p>Views</p><p>${views}</p></li>
                        <li class="image-desc-item"><p>Comments</p><p>${comments}</p></li>
                        <li class="image-desc-item"><p>Downloads</p><p>${downloads}</p></li>
                    </ul>
            </li>`;
  });

  return markup.join('');
};
