// Modal lightbox for images: injects modal and binds clicks on all images
(function(){
  function createModal(){
    const overlay = document.createElement('div');
    overlay.className = 'image-modal-overlay';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-hidden','true');

    const content = document.createElement('div');
    content.className = 'image-modal-content';

    const img = document.createElement('img');
    img.alt = '';

    const close = document.createElement('button');
    close.className = 'image-modal-close';
    close.setAttribute('aria-label','Close image');
    close.textContent = '✕';

    content.appendChild(img);
    overlay.appendChild(content);
    overlay.appendChild(close);
    document.body.appendChild(overlay);

    function open(src, alt){
      img.src = src;
      img.alt = alt || '';
      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden','false');
      // focus the close button for accessibility
      close.focus();
    }
    function closeModal(){
      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden','true');
      img.src = '';
    }

    // close interactions
    close.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e)=>{
      if(e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && overlay.classList.contains('show')) closeModal();
    });

    return { open, close: closeModal };
  }

  function init(){
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', bind);
    } else bind();

    function bind(){
      const modal = createModal();
      // delegate clicks on images
      document.body.addEventListener('click', (e)=>{
        const img = e.target.closest && e.target.closest('img');
        if(!img) return;
        // avoid opening images that are inside the modal itself
        if(img.closest('.image-modal-content')) return;
        const src = img.dataset.large || img.src;
        const alt = img.alt || img.getAttribute('aria-label') || '';
        e.preventDefault && e.preventDefault();
        modal.open(src, alt);
      });
    }
  }

  init();
})();
