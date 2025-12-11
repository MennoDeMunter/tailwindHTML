// Lightweight carousel for the week buttons
(function(){
  const track = document.getElementById('weeks-track');
  if(!track) return;

  const slides = Array.from(track.querySelectorAll('[role="listitem"]'));
  const prev = document.getElementById('carousel-prev');
  const next = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');

  // create dots
  slides.forEach((s,i)=>{
    const btn = document.createElement('button');
    btn.className = 'carousel-dot';
    btn.setAttribute('aria-label', `Go to ${i+1}`);
    btn.addEventListener('click', ()=> scrollTo(i));
    dotsContainer.appendChild(btn);
  });
  const dots = Array.from(dotsContainer.children);

  let current = 0;
  function updateActive(){
    dots.forEach((d,i)=> d.classList.toggle('active', i===current));
  }

  function scrollTo(i){
    if(i<0) i=0; if(i>=slides.length) i=slides.length-1;
    current = i;
    slides[i].scrollIntoView({behavior:'smooth', inline:'center'});
    updateActive();
  }

  function nextSlide(){ scrollTo((current+1)%slides.length); }
  function prevSlide(){ scrollTo((current-1+slides.length)%slides.length); }

  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);

  // update current on user scroll
  let raf=false;
  track.addEventListener('scroll', ()=>{
    if(raf) return; raf=true;
    requestAnimationFrame(()=>{
      const rect = track.getBoundingClientRect();
      const center = rect.left + rect.width/2;
      let closest = 0; let dist = Infinity;
      slides.forEach((s,i)=>{
        const r = s.getBoundingClientRect();
        const c = r.left + r.width/2; const d = Math.abs(c-center);
        if(d<dist){ dist=d; closest=i }
      });
      current = closest; updateActive(); raf=false;
    })
  }, {passive:true});

  // keyboard support
  track.tabIndex = 0;
  track.addEventListener('keydown', (e)=>{
    if(e.key==='ArrowRight') nextSlide();
    if(e.key==='ArrowLeft') prevSlide();
  })

  // init
  scrollTo(0);
})();
