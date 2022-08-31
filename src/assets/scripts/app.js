import typer from './typer.js';

const app = () => {
  const $content = document.querySelectorAll('.content');
  let $current = 0;
  const $navLinks = [...document.querySelectorAll('.nav__link')];
  let customScrollActive = true;
  let scrollEventActive = true;
  let lastScrollTimestamp;
  const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));

  const init = () => {
    $navLinks.push(document.querySelector('.button--contact'));
    registerListeners();
    setActiveNavLink();
    $current = $navLinks.indexOf(document.querySelector('.nav__link--active'));
    typer();
    isMobile && window.screen.width < 896 ? '' : document.querySelector('html').classList.add('no_scroll');
  };

  const registerListeners = () => {
    window.addEventListener('wheel', (ev) => {    
      ev.preventDefault();
      if (customScrollActive === true) {
        const scrollDown = ev.wheelDelta < 0;
        scrollInterval(scrollDown);   
      }
    }, {passive: false});
    window.addEventListener('popstate', () => setActiveNavLink());
    setTimeout(() => window.addEventListener('scroll', () => scrollEvent()), 750);
    $navLinks.forEach($navLink => {
      $navLink.addEventListener('click', () => {
        scrollEventActive = false;
        setTimeout(() => { scrollEventActive = true}, 750);
      });
    });
    document.querySelectorAll('.project .card__link').forEach((cardBack) => {
      cardBack.addEventListener('click', (ev) => {
        const project = ev.target.parentElement.parentElement.parentElement;
        const cl = [...project.classList].filter((e) => {
          return e !== 'project' && e !== 'card';
        });
        const modal = document.querySelector(`.${cl[0]} .modal`);
        if (modal) {
          modal.parentElement.classList.toggle('positioned_for_modal');
          modal.classList.toggle('hidden');
          if (!document.querySelector('html').classList.contains('no_scroll')) {
            document.querySelector('html').classList.add('no_scroll');
          }
          customScrollActive = false;
        }
      });
    });
    window.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('button--close')) {
        customScrollActive = true
        isMobile && window.screen.width < 896 ? document.querySelector('html').classList.toggle('no_scroll') : '';
        ev.target.parentElement.parentElement.parentElement.classList.toggle('positioned_for_modal');
        ev.target.parentElement.parentElement.classList.add('hidden');
      }
    });
  };
  
  const updateRef = () => {
    window.location.href = `./#${$content[$current].id}`;
  };
  
  const setActiveNavLink = () => {
    {
      const activeItem = document.querySelector('.nav__link--active');
      if (activeItem) {
        activeItem.classList.remove('nav__link--active');
      }
      const newActiveItem = document.querySelector(`#nav_${window.location.href.includes('#') ? 
      window.location.href.substring(window.location.href.indexOf('#')+1) : 'Home'}`);
      newActiveItem.classList.add('nav__link--active');
    }
  }
  
  const scrollEvent = () => {
    if (scrollEventActive) {
      if ($content[$current].getBoundingClientRect().bottom <= ((window.screen.height - 48)/2)) {
        $current ++;
        updateRef();
      } else if ($content[$current].getBoundingClientRect().top > ((window.screen.height - 48)/2)) {
        $current --;
        updateRef();
      }
      lastScrollTimestamp = Date.now();
      setTimeout(() => snapNav(), 750);
    }
  };

  const snapNav = () => {
    if(isMobile && lastScrollTimestamp+500 < Date.now()) {
      window.scrollTo(0, ($current * window.screen.height));
    }
  }

  const scrollInterval = (scrollDown) => {
    let navItem;
    window.location.href.includes('#') ? navItem = window.location.href.substring(window.location.href.indexOf('#') + 1) : navItem = 'Home';
    if (scrollDown) {
      switch (navItem) {
        case 'Home':
          return window.location.href = './#Services';
        case 'Services':
          return window.location.href = './#Projects';
        case 'Projects':
          return window.location.href = './#Technologies';
        case 'Technologies':
          return window.location.href = './#Contact';
        default:
          break;
      }
    } else {
      switch (navItem) {
        case 'Services':
          return window.location.href = './#Home';
        case 'Projects':
          return window.location.href = './#Services';
        case 'Technologies':
          return window.location.href = './#Projects';
        case 'Contact':
          return window.location.href = './#Technologies';
        default:
          break;
      }
    }
  };

  init();
}
app();