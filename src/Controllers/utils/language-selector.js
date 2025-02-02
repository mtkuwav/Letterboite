const setupLanguageSelector = () => {
  const languageItems = document.querySelectorAll('[data-lang]');
  const languageButton = document.querySelector('#languageSelector');

  languageItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const { lang } = e.target.dataset;
      localStorage.setItem('language', lang);
      languageButton.textContent = e.target.textContent;
      window.location.reload();
    });
  });
};

export default setupLanguageSelector;
