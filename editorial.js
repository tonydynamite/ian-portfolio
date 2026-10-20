// Progressive enhancement: all content stays visible without JavaScript.
const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav?.classList.toggle('s',scrollY>8),{passive:true});
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const lb=document.getElementById('lb');
if(lb){
  lb.setAttribute('aria-label','Image preview');
  const close=document.createElement('button');
  close.className='lightbox-close';close.type='button';close.textContent='×';close.setAttribute('aria-label','Close image preview');lb.append(close);
  const preview=lb.querySelector('img');let opener;
  const open=(image)=>{opener=image;preview.src=image.currentSrc||image.src;preview.alt=image.alt||'';lb.showModal();close.focus();};
  document.querySelectorAll('figure img,.logo img,.lead img,.tile img').forEach(image=>{
    image.classList.add('zoomable');image.tabIndex=0;image.setAttribute('role','button');image.setAttribute('aria-label',image.alt?'Enlarge: '+image.alt:'Enlarge image');
    image.addEventListener('click',()=>open(image));
    image.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(image);}});
  });
  close.addEventListener('click',()=>lb.close());
  lb.addEventListener('click',e=>{if(e.target===lb)lb.close();});
  lb.addEventListener('close',()=>{preview.removeAttribute('src');opener?.focus({preventScroll:true});});
}
// Play only visible clips. Reduced-motion visitors keep the original posters.
const videos=[...document.querySelectorAll('video')];
const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
  if(isIntersecting&&!reducedMotion.matches&&!document.hidden)target.play().catch(()=>{});
  else target.pause();
}),{threshold:.25});
videos.forEach(video=>observer.observe(video));
document.addEventListener('visibilitychange',()=>{if(document.hidden)videos.forEach(video=>video.pause());});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)videos.forEach(video=>video.pause());});
