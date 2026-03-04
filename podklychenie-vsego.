(function () {

  /* =========================
     ЖДЁМ BODY
  ========================= */
  function whenBodyReady(cb) {
    if (document.body) cb();
    else document.addEventListener('DOMContentLoaded', cb, { once: true });
  }

  whenBodyReady(init);

  function init() {
    const url = window.location.href;

    const blockedPaths = [
      '/answers/',
      '/schedule',
      '/questionary',
      '/diploma',
      '/goal',
      '/userTrainingFeedback',
      '/stat/',
      '/update',
      '/chatium'
    ];

    if (!url.includes('/teach/') || blockedPaths.some(p => url.includes(p))) return;
    if (/editMode[=/]1/.test(url)) return;

    const GITHUB_BASE = 'https://oleggelo2002.github.io/Stoyanov/';
    const head = document.head;

    /* =========================
       PRELOADER
    ========================= */

    const START_TIME = Date.now();

    const style = document.createElement('style');
    style.textContent = `
      #global-preloader {
        position: fixed;
        inset: 0;
        background: #131313;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #global-preloader .spinner {
        width: 48px;
        height: 48px;
        border: 4px solid rgba(240,70,26,.3);
        border-top-color: #F0461A;
        border-radius: 50%;
        animation: spin .8s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    head.appendChild(style);

    const preloader = document.createElement('div');
    preloader.id = 'global-preloader';
    preloader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(preloader);

    /* =========================
       LOADER WITH RETRY
    ========================= */

    const MAX_RETRY = 3;
    const tasks = [];

    function loadCSS(file, retry = 0) {
      return new Promise((resolve, reject) => {
        const href = GITHUB_BASE + file;

        if ([...document.styleSheets].some(s => s.href === href)) {
          resolve(); return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;

        link.onload = resolve;
        link.onerror = () => {
          link.remove();
          retry < MAX_RETRY
            ? loadCSS(file, retry + 1).then(resolve).catch(reject)
            : reject('CSS failed: ' + file);
        };

        head.appendChild(link);
      });
    }

    function loadJS(file, retry = 0) {
      return new Promise((resolve, reject) => {
        const src = GITHUB_BASE + file;

        const script = document.createElement('script');
        script.src = src;

        script.onload = () => {
          // Эмулируем DOMContentLoaded, если событие уже прошло
          if (document.readyState !== 'loading') {
            document.dispatchEvent(new Event('DOMContentLoaded'));
          }
          resolve();
        };

        script.onerror = () => {
          script.remove();
          retry < MAX_RETRY
            ? loadJS(file, retry + 1).then(resolve).catch(reject)
            : reject('JS failed: ' + file);
        };

        head.appendChild(script);
      });
    }

    /* =========================
       FILES QUEUE
    ========================= */

    const isLessonPage = url.includes('/lesson/');

    tasks.push(
      loadCSS('Calendar.css'),
      loadJS('Calendar.js'),

      loadCSS('links-block.css'),
      loadJS('links-block.js'),

      loadCSS('last-lesson.css'),
      loadJS('last-lesson.js'),

      loadCSS('Left-menu.css'),
      loadJS('left-menu.js'),

      loadCSS('Glass-card-trening.css'),
      loadJS('glass.js'),

      loadCSS('Search.css'),
      loadJS('Search.js'),

      loadJS('v-yrok-name-url.js'),
      loadJS('img-number_lesson.js'),
      loadJS('trening-block-img.js'),

      loadCSS('lesson-style.css'),
      loadJS('mvp.js')
    );

    if (!isLessonPage) {
      tasks.push(
        loadCSS('trening-and-lesson.css'),
        loadCSS('Banner.css'),
        loadJS('Banner.js')
      );
    }

    if (isLessonPage) {
      tasks.push(loadCSS('lesson-under.css'));
    }

    /* =========================
       WAIT FOR EVERYTHING
    ========================= */

    Promise.allSettled(tasks).then(() => {

      if (document.readyState === 'complete') {
        hidePreloader();
      } else {
        window.addEventListener('load', hidePreloader, { once: true });
      }

    });

    function hidePreloader() {
      const minDelay = Math.max(0, 600 - (Date.now() - START_TIME));

      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity .4s ease';
        setTimeout(() => preloader.remove(), 400);
      }, minDelay);
    }

  }

})();
