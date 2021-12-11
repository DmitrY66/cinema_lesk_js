import { getVideo } from "./servis.js";

const listCard = document.querySelector('.other-films__list');

const renderCard = data => {

  listCard.textContent = '';

  Promise.all(data.map(async (item) => {

    const video = await getVideo(item.id, item.media_type);
    const key = video.results[0]?.key;
    // console.log('key: ', key);

    const card = document.createElement('li');
    card.className = 'other-films__item';

    const link = document.createElement('a');
    link.className = 'other-films__link tube';

    if (key) link.href = `https://youtu.be/${key}`

    if (item.vote_average == 0) {
      link.dataset.rating = '-'
    } else {
      link.dataset.rating = item.vote_average;
    }

    const img = document.createElement('img');
    img.className = 'other-films__img';
    img.alt = `постер ${item.title || item.name}`;

    // if(!item.poster_path) {
    //   console.log(item);
    // };

    img.src = item.poster_path ? 
    `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${item.poster_path}` : 
    `img/noposter.jpg`;

    link.append(img);
    card.append(link);

    return card;
  })).then(cards => listCard.append(...cards));

};


export default renderCard;

