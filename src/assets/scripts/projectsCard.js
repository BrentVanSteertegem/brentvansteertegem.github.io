const projectsCard = () => {
  const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));

  const init = () => {
    registerListeners();
  };

  const registerListeners = () => {
    document.querySelectorAll('.project .card__link').forEach((cardBack) => {
      cardBack.addEventListener('click', (ev) => {
        const project = ev.target.parentElement.parentElement.parentElement;
        const cl = [...project.classList].filter((e) => {
          return e !== 'project' && e !== 'card';
        });
        const modal = document.querySelector(`.${cl[0]} .modal`);
        if (modal) {
          modal.parentElement.classList.toggle('positioned_for_modal--projects');
          modal.classList.toggle('hidden');
          if (!document.querySelector('html').classList.contains('no_scroll')) {
            document.querySelector('html').classList.add('no_scroll');
          }
        }
      });
    });
    window.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('button--close')) {
        isMobile && window.screen.width < 896 ? document.querySelector('html').classList.toggle('no_scroll') : '';
        ev.target.parentElement.parentElement.parentElement.classList.toggle('positioned_for_modal--projects');
        ev.target.parentElement.parentElement.classList.add('hidden');
      }
    });
  };

 
  init();
}
projectsCard();