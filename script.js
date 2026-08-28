/* ==========================================================================
   Porto dos Açores — Script Principal
   ========================================================================== */

// 1. CONFIGURAÇÕES DE HORÁRIO E DADOS
const CONFIG = {
  // Horários de funcionamento (formato 24h: 'HH:MM')
  // 0 = Domingo, 1 = Segunda, 2 = Terça, ..., 6 = Sábado
  hours: {
    0: { open: '11:00', close: '14:00', label: 'Domingo: 11h00 às 14h00' },
    1: { open: null,    close: null,    label: 'Segunda-feira: Fechado' },
    2: { open: '11:00', close: '14:00', label: 'Terça-feira: 11h00 às 14h00' },
    3: { open: '11:00', close: '14:00', label: 'Quarta-feira: 11h00 às 14h00' },
    4: { open: '11:00', close: '14:00', label: 'Quinta-feira: 11h00 às 14h00' },
    5: { open: '11:00', close: '14:00', label: 'Sexta-feira: 11h00 às 14h00' },
    6: { open: '11:00', close: '23:00', label: 'Sábado: 11h00 às 23h00' },
  },
  whatsappNumber: '5548999999999', // Insira o número real com DDD
  whatsappMessage: 'Olá! Gostaria de consultar reservas ou o cardápio do Porto dos Açores.',
  address: 'R. Jorn. Laurindo Januário da Silva, Pântano do Sul, Florianópolis - SC',
  phone: '(48) 99999-9999',
  instagram: 'portodosacoresfloripa',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.321!2d-48.513!3d-27.781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQ2JzUxLjYiUyA0OMKwMzAnNDYuOCJX!5e0!3m2!1spt-BR!2sbr!4v1600000000000!5m2!1spt-BR!2sbr'
};

// 2. AVALIAÇÕES DO GOOGLE
const REVIEWS = [
  { name: 'Ana Paula S.', time: 'Há 2 semanas', text: 'Melhor moqueca de Floripa! Atendimento impecável e os peixes super frescos. A vista para o Pântano do Sul torna a experiência ainda melhor.', stars: 5 },
  { name: 'Carlos Eduardo', time: 'Mês passado', text: 'Ambiente aconchegante e comida de alta qualidade. A sequência de camarão de quinta-feira vale cada centavo. Voltaremos com certeza!', stars: 5 },
  { name: 'Mariana Luz', time: 'Há 1 mês', text: 'Os pastéis de siri e a caipirinha de saquê são imperdíveis. Lugar perfeito para almoçar em família no final de semana.', stars: 5 }
];

// 3. FOTOS DA GALERIA
const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80', alt: 'Prato de Frutos do Mar' },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', alt: 'Ambiente do Restaurante' },
  { src: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80', alt: 'Peixe Grelhado Fresco' },
  { src: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', alt: 'Moqueca de Camarão' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', alt: 'Mesas com Vista para o Mar' },
  { src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80', alt: 'Drink Autoral da Casa' }
];

// 4. CARDÁPIO
const MENU_ITEMS = {
  entradas: [
    { name: 'Casquinha de Siri', price: 'R$ 28', desc: 'Siri catado temperado com pimentões e ervas finas, gratinado com parmesão.' },
    { name: 'Pastéis Açorianos (6 un)', price: 'R$ 42', desc: 'Opções de Camarão com catupiry ou Berbigão refogado no alho e óleo.' },
    { name: 'Isca de Peixe Crocante', price: 'R$ 58', desc: 'Filé de peixe do dia empanado na farinha panko, acompanha molho tártaro.' }
  ],
  principais: [
    { name: 'Moqueca de Garoupa e Camarão', price: 'R$ 189', desc: 'Para 2 pessoas. Acompanha pirão, arroz branco e farofa de dendê.' },
    { name: 'Sequência de Camarão', price: 'R$ 210', desc: 'Para 2 pessoas. Camarão ao alho e óleo, à milanesa, ao bafo e ao molho branco.' },
    { name: 'Posta de Peixe Grelhada', price: 'R$ 84', desc: 'Prato individual. Acompanha purê de aipim, legumes salteados e arroz.' }
  ],
  sobremesas: [
    { name: 'Cocada Cremosa na Colher', price: 'R$ 22', desc: 'Servida morna com sorvete de creme e raspas de limão siciliano.' },
    { name: 'Pudim de Leite Condensado', price: 'R$ 18', desc: 'Receita tradicional da casa com calda de caramelo levemente queimado.' }
  ],
  bebidas: [
    { name: 'Caipirinha de Cachaça Artesanal', price: 'R$ 24', desc: 'Limão, morango ou maracujá.' },
    { name: 'Sucos Naturais (500ml)', price: 'R$ 14', desc: 'Laranja, abacaxi com hortelã ou maracujá.' },
    { name: 'Cerveja Long Neck', price: 'R$ 14', desc: 'Consulte rótulos disponíveis.' }
  ]
};

// 5. FUNÇÃO DE VERIFICAÇÃO DO STATUS (ABERTO / FECHADO)
function updateStatus() {
  const dot = document.getElementById('status-dot');
  const text = document.getElementById('status-text');
  const dateEl = document.getElementById('today-date');

  if (!dot || !text) return;

  const now = new Date();
  const day = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Formatador da data atual
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  if (dateEl) dateEl.textContent = now.toLocaleDateString('pt-BR', dateOptions);

  const todayHours = CONFIG.hours[day];

  if (!todayHours.open || !todayHours.close) {
    setClosed(dot, text);
    return;
  }

  const [openH, openM] = todayHours.open.split(':').map(Number);
  const [closeH, closeM] = todayHours.close.split(':').map(Number);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    dot.className = 'status-dot bg-emerald-500';
    text.textContent = 'ABERTO AGORA';
    text.className = 'font-display italic text-xl text-emerald-400 font-bold';
  } else {
    setClosed(dot, text);
  }
}

function setClosed(dot, text) {
  dot.className = 'status-dot bg-rose-500';
  text.textContent = 'FECHADO AGORA';
  text.className = 'font-display italic text-xl text-rose-400 font-bold';
}

// 6. RENDERIZADORES DE CONTEÚDO
function renderHoursList() {
  const container = document.getElementById('hours-list');
  if (!container) return;
  const today = new Date().getDay();

  container.innerHTML = Object.keys(CONFIG.hours).map(d => {
    const isToday = parseInt(d) === today;
    const label = CONFIG.hours[d].label;
    return `
      <li class="py-3 flex items-center justify-between ${isToday ? 'font-bold text-coral' : 'text-ink/80'}">
        <span>${label.split(':')[0]}</span>
        <span>${label.split(':').slice(1).join(':')} ${isToday ? '<span class="text-xs bg-coral/10 text-coral px-2 py-0.5 rounded-full ml-2">Hoje</span>' : ''}</span>
      </li>
    `;
  }).join('');
}

function renderMenu(category = 'entradas') {
  const container = document.getElementById('menu-panels');
  if (!container) return;

  const items = MENU_ITEMS[category] || [];
  container.innerHTML = items.map(item => `
    <div class="bg-inksoft/50 border border-white/10 rounded-2xl p-6 transition-all hover:border-coral2/50">
      <div class="flex items-start justify-between gap-4 mb-2">
        <h4 class="font-display text-lg font-semibold text-cream">${item.name}</h4>
        <span class="font-mono text-coral2 font-bold text-base shrink-0">${item.price}</span>
      </div>
      <p class="text-sand/70 text-sm leading-relaxed">${item.desc}</p>
    </div>
  `).join('');
}

function renderReviews() {
  const container = document.getElementById('reviews-grid');
  if (!container) return;

  container.innerHTML = REVIEWS.map(r => `
    <div class="bg-white border border-azulejo/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-4">
          <span class="font-semibold text-ink">${r.name}</span>
          <span class="text-xs text-ink/40 font-mono">${r.time}</span>
        </div>
        <div class="text-amber-400 text-sm mb-3">${'★'.repeat(r.stars)}</div>
        <p class="text-ink/80 text-sm leading-relaxed">"${r.text}"</p>
      </div>
      <div class="mt-4 pt-4 border-t border-azulejo/5 flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/></svg>
        <span class="text-xs text-ink/50 font-mono">Avaliação do Google</span>
      </div>
    </div>
  `).join('');
}

function renderGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  container.innerHTML = GALLERY.map(g => `
    <div class="gallery-card h-64 bg-inksoft">
      <img src="${g.src}" alt="${g.alt}" loading="lazy" class="w-full h-full object-cover">
    </div>
  `).join('');
}

// 7. INICIALIZAÇÃO DE EVENTOS
document.addEventListener('DOMContentLoaded', () => {
  updateStatus();
  setInterval(updateStatus, 30000); // Atualiza o status a cada 30 segundos

  renderHoursList();
  renderMenu('entradas');
  renderReviews();
  renderGallery();

  // Links dinâmicos
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
  document.querySelectorAll('[data-wa-link]').forEach(el => el.href = waUrl);
  
  const telLink = document.querySelector('[data-tel-link]');
  if (telLink) telLink.href = `tel:${CONFIG.whatsappNumber}`;

  const addressEl = document.getElementById('address-text');
  if (addressEl) addressEl.textContent = CONFIG.address;

  const phoneEl = document.getElementById('phone-text');
  if (phoneEl) phoneEl.textContent = CONFIG.phone;

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const mapFrame = document.getElementById('map-frame');
  if (mapFrame) mapFrame.src = CONFIG.mapEmbedUrl;

  // Controle das abas do cardápio
  document.querySelectorAll('.menu-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.menu-tab').forEach(t => t.setAttribute('aria-selected', 'false'));
      e.target.setAttribute('aria-selected', 'true');
      renderMenu(e.target.dataset.tab);
    });
  });

  // Menu Mobile Toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isOpen);
      
      if (isOpen) {
        mobileMenu.style.maxHeight = '0px';
        mobileMenu.classList.add('opacity-0');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      } else {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        mobileMenu.classList.remove('opacity-0');
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
      }
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.style.maxHeight = '0px';
        mobileMenu.classList.add('opacity-0');
        menuBtn.setAttribute('aria-expanded', 'false');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      });
    });
  }

  // Scroll Reveal Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});