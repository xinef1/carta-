// Mensagem 
const messageLines = [
  "Meu amor,",
  "",
  "a cada sorriso seu o meu dia encontra seu norte. Mesmo quando estamos longe, eu guardo seu carinho como luz que nunca se apaga.",
  "",
  "Quero ser abrigo nas suas tempestades e companheiro nas suas alegrias. Obrigado por ser você — tão inteiro, tão corajosa, tão verdadeira.",
  "",
  "Com todo meu carinho,",
  "— André"
];

const letterEl = document.getElementById('letter');
const revealBtn = document.getElementById('revealBtn');
const resetBtn = document.getElementById('resetBtn');
const signatureEl = document.getElementById('signature');
const heartsContainer = document.getElementById('hearts');

let typing = false;

function typeMessage(lines, el, cb){
  typing = true;
  el.textContent = "";
  let idx = 0, charIdx = 0;
  function step(){
    if (idx >= lines.length){ typing = false; if(cb) cb(); return; }
    const line = lines[idx];
    if (charIdx < line.length){
      el.textContent += line[charIdx++];
      setTimeout(step, 28 + Math.random()*40);
    } else {
      el.textContent += "\n";
      idx++; charIdx = 0;
      setTimeout(step, 200);
    }
  }
  step();
}

revealBtn.addEventListener('click', () => {
  if (typing) return;
  // start hearts and typing
  spawnHearts(18);
  typeMessage(messageLines, letterEl, () => {
    signatureEl.textContent = "Com carinho, sempre.";
  });
});

resetBtn.addEventListener('click', () => {
  if (typing) return;
  letterEl.textContent = "Clique em \"Mostrar carta\" para ver a mensagem...";
  signatureEl.textContent = "";
  heartsContainer.innerHTML = "";
});

// Simple hearts generator (visual confetti)
function spawnHearts(n){
  for(let i=0;i<n;i++){
    setTimeout(()=> createHeart(), i*120);
  }
}
function createHeart(){
  const h = document.createElement('div');
  h.className = 'heart';
  const size = 10 + Math.random()*28;
  h.style.width = h.style.height = size + 'px';
  h.style.left = (10 + Math.random()*80) + '%';
  h.style.top = (90 + Math.random()*10) + '%';
  h.style.opacity = 0.9;
  heartsContainer.appendChild(h);

  const dx = (Math.random()*120 - 60);
  const duration = 4000 + Math.random()*2800;
  h.animate([
    { transform: `translate(0,0) scale(0.6) rotate(0deg)`, opacity:1},
    { transform: `translate(${dx}px, -420px) scale(1) rotate(80deg)`, opacity:0.08}
  ], { duration, easing: 'cubic-bezier(.12,.9,.26,1)' })
  .onfinish = () => h.remove();
}

// Gallery / Lightbox behavior
const lightbox = document.getElementById('lightbox');
const lbImage = lightbox ? lightbox.querySelector('.lb-image') : null;
const lbCaption = lightbox ? lightbox.querySelector('.lb-caption') : null;
const lbClose = lightbox ? lightbox.querySelector('.lb-close') : null;

document.querySelectorAll('.thumbnails img').forEach(img => {
  img.addEventListener('click', () => {
    const src = img.dataset.full || img.src;
    const alt = img.alt || '';
    if (!lightbox) return;
    lbImage.src = src;
    lbImage.alt = alt;
    lbCaption.textContent = alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox(){
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lbImage.src = '';
  lbCaption.textContent = '';
}
if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });



// Optional: support pressing Enter to reveal / Esc to reset or close lightbox
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') revealBtn.click();
  if (e.key === 'Escape') {
    if (lightbox && lightbox.classList.contains('open')) closeLightbox();
    else resetBtn.click();
  }
});