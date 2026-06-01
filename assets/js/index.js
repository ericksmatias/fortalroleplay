
        // ===== DATA NO HEADER =====
        (function(){
            const now = new Date();
            const days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
            document.getElementById('header-weekday').textContent = days[now.getDay()];
            document.getElementById('header-daynum').textContent = now.getDate();
        })();

        // ===== GREETING POPUP — Apple notification style =====
        (function() {
            const h = new Date().getHours();
            const day = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });
            const dayPT = day.charAt(0).toUpperCase() + day.slice(1);

            // Frases rotativas por período (pt + outros idiomas embaralhados)
            const PHRASES = {
                morning: [
                    { main: 'Bom dia', sub: 'Fortaleza tá te esperando.' },
                    { main: 'Buenos días', sub: 'La ciudad empieza a despertar.' },
                    { main: 'Good morning', sub: 'The city is wide awake.' },
                    { main: 'Bonjour', sub: "La ville s'éveille pour toi." },
                    { main: 'Buongiorno', sub: 'La città ti aspetta.' },
                    { main: 'Bom dia', sub: dayPT + ' é dia de explorar.' },
                    { main: 'Bom dia', sub: 'Café primeiro. Mapa depois.' },
                    { main: 'Bom dia', sub: 'Hoje Fortaleza tem agenda.' },
                ],
                afternoon: [
                    { main: 'Boa tarde', sub: 'Hora de planejar a noite.' },
                    { main: 'Good afternoon', sub: 'Plan your night here.' },
                    { main: 'Buenas tardes', sub: 'La noche empieza a planearse.' },
                    { main: 'Bonne après-midi', sub: 'La nuit arrive bientôt.' },
                    { main: 'Boa tarde', sub: 'O sol tá quente. O mapa tá frio.' },
                    { main: 'Boa tarde', sub: 'Fortaleza em modo tarde.' },
                    { main: 'Boa tarde', sub: dayPT + ' à tarde merece rolê.' },
                    { main: 'Boa tarde', sub: '127 locais te esperando.' },
                ],
                evening: [
                    { main: 'Boa noite', sub: 'Fortaleza acende agora.' },
                    { main: 'Good evening', sub: 'Fortaleza never sleeps.' },
                    { main: 'Buenas noches', sub: 'La ciudad se ilumina.' },
                    { main: 'Bonsoir', sub: "La ville s'illumine." },
                    { main: 'Boa noite', sub: 'Hora de decidir o rolê.' },
                    { main: 'Boa noite', sub: 'A cidade acaba de começar.' },
                    { main: 'Boa noite', sub: 'Onde você vai hoje?' },
                    { main: 'Boa noite', sub: dayPT + ' à noite em Fortaleza.' },
                ],
                latenight: [
                    { main: 'Boa madrugada', sub: 'Você e a cidade que não dorme.' },
                    { main: 'Late night', sub: 'Still exploring?' },
                    { main: 'Boa madrugada', sub: 'O Route ainda está de pé.' },
                    { main: 'Buenas noches', sub: 'Sigues explorando?' },
                    { main: 'Boa madrugada', sub: 'Fortaleza às 3AM tem endereço.' },
                    { main: 'Boa madrugada', sub: 'A cidade nunca fecha de verdade.' },
                ],
            };

            const period = h >= 5 && h < 12 ? 'morning'
                         : h >= 12 && h < 18 ? 'afternoon'
                         : h >= 18 && h < 22 ? 'evening'
                         : 'latenight';

            const list = PHRASES[period];
            let idx = 0;

            function showGreeting(phrase) {
                const popup = document.getElementById('greeting-popup');
                const mainEl = document.getElementById('greeting-main');
                const subEl  = document.getElementById('greeting-sub');
                mainEl.textContent = phrase.main;
                subEl.textContent  = phrase.sub;
                popup.classList.remove('hiding');
                popup.classList.add('visible');
                // Auto-dismiss after 4.5s
                setTimeout(() => {
                    popup.classList.add('hiding');
                    popup.classList.remove('visible');
                }, 4500);
            }

            // Show first phrase after 800ms (after page loads)
            setTimeout(() => {
                showGreeting(list[idx]);
                // Rotate phrases every 8s (while page is open)
                setInterval(() => {
                    idx = (idx + 1) % list.length;
                    const popup = document.getElementById('greeting-popup');
                    popup.classList.add('hiding');
                    popup.classList.remove('visible');
                    setTimeout(() => showGreeting(list[idx]), 500);
                }, 8000);
            }, 800);
        })();

        // ===== API CONFIG =====
        const API_URL = 'http://localhost:5254/api';

        // ===== CATEGORY SVG ICONS =====
        const CAT_SVG = {
            '#8e4ec6': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
            '#c0392b': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
            '#007aff': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
            '#34c759': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>`,
            '#e8a020': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
        };
        function getCatSVG(color) { return CAT_SVG[color] || CAT_SVG['#e8a020']; }

        const PIN_SVG_PATH = {
            '#8e4ec6': 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
            '#c0392b': 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z',
            '#007aff': null, 
            '#34c759': 'M3 11l19-9-9 19-2-8-8-2z',
            '#e8a020': null, 
        };

        function getPinSVGHtml(color, size) {
            const s = size;
            const sw = Math.max(1.5, s * 0.12);
            if (color === '#007aff') {
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
            }
            if (color === '#e8a020') {
                return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
            }
            const d = PIN_SVG_PATH[color] || 'M3 11l19-9-9 19-2-8-8-2z';
            return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
        }

        // ===== DATABASE =====
        const FALLBACK_DATABASE = [
            // --- CULT / ALTERNATIVO (Roxo) ---
            { name: "A Quitanda", cat: "Alternativo Chique", color: "#8e4ec6", lat: -3.7378, lon: -38.5109, desc: "Mercado orgânico cult da Aldeota. Clientela que compra azeite extravirgem e discute Chico Buarque. O Google Maps chama de 'concorrido e aconchegante'. A clientela chama de lar." },
            { name: "Budega do Raul", cat: "Universitário Gourmet", color: "#8e4ec6", lat: -3.7449, lon: -38.5294, desc: "Bar universitário no Benfica onde a coxinha custa o dobro do boteco vizinho e ainda assim a fila não para. Reviews lotados de 'melhor da região'. Frequentadores de mestrado pagando preço de doutorado." },
            { name: "Mormaço Bar", cat: "Cool & Vento", color: "#8e4ec6", lat: -3.7218, lon: -38.5106, desc: "Vista pro mar, ventania permanente e público que fala de cinema europeu enquanto paga R$35 no drinque. Avaliações falam em 'ambiente único de Fortaleza'. Verdade." },
            { name: "Brisa de Fortaleza", cat: "Visual", color: "#8e4ec6", lat: -3.7208, lon: -38.5078, desc: "Vista pro mar pra quem tem iPhone Pro e vota no PSOL." },
            { name: "Parqland", cat: "Festa Hype", color: "#8e4ec6", lat: -3.7321, lon: -38.5478, desc: "Touro Neon. Gente bonita, suada e muito glitter na Parquelândia." },
            { name: "Fuzuê Bar", cat: "Esquenta Nobre", color: "#8e4ec6", lat: -3.7260, lon: -38.5041, desc: "Esquenta oficial do Meireles. Gente desconstruída de Uber Black." },
            { name: "Giz Cozinha Boêmia", cat: "Samba Caviar", color: "#8e4ec6", lat: -3.7299, lon: -38.5036, desc: "Samba de rico. Garçom de gravata e feijoada preço de ouro." },
            { name: "Teresa & Jorge", cat: "Cult Turístico", color: "#8e4ec6", lat: -3.7195, lon: -38.5142, desc: "Era raiz, virou point turístico. Samba excelente." },
            { name: "Zelig Drink Bar", cat: "Nova York", color: "#8e4ec6", lat: -3.7305, lon: -38.5045, desc: "Escondido e escuro. Parece bar de filme noir." },
            { name: "Culinária da Van", cat: "Regional Cult", color: "#8e4ec6", lat: -3.7447, lon: -38.5285, desc: "A chef Van é celebridade. Panelada premiada no Benfica." },
            { name: "O Mar Menino", cat: "Gastronomia Arte", color: "#8e4ec6", lat: -3.7358, lon: -38.5020, desc: "Comida que parece quadro. Lugar de arquitetos." },
            { name: "Bulls Beer House", cat: "Rock Pub", color: "#8e4ec6", lat: -3.7381, lon: -38.5073, desc: "Rock e burger na Aldeota. Metaleiros programadores." },
            { name: "Clandestino", cat: "Jazz & Blues", color: "#8e4ec6", lat: -3.7418, lon: -38.5302, desc: "Um dos raros bares de jazz de verdade em Fortaleza, escondido no Benfica. Avaliações consistentes de 'experiência única'. Pequeno, quente e completamente fora do radar de quem não é do bairro." },
            { name: "Hey Joe Food 'n' Bar", cat: "Descolado", color: "#8e4ec6", lat: -3.7342, lon: -38.5088, desc: "Comida saudável e gente tatuada bonita." },
            { name: "Boozer's Pub", cat: "Hostel Vibe", color: "#8e4ec6", lat: -3.7255, lon: -38.5080, desc: "Gringos e rock clássico. Parece que você tá viajando." },
            { name: "Cervejaria Capitosa", cat: "Artesanal", color: "#8e4ec6", lat: -3.7355, lon: -38.5002, desc: "Público que discute lúpulo a noite toda." },
            { name: "Brauhaus", cat: "Alemão", color: "#8e4ec6", lat: -3.7334, lon: -38.5062, desc: "Templo da cerveja importada." },
            { name: "Mayú", cat: "Alta Gastronomia", color: "#8e4ec6", lat: -3.7335, lon: -38.4969, desc: "Restaurante do Senac. Comida experimental." },
            { name: "Cinema do Dragão", cat: "Cinefilia", color: "#8e4ec6", lat: -3.7200, lon: -38.5175, desc: "Filmes que ninguém entende e debate sobre semiótica." },
            { name: "Café Couture", cat: "Jazz & Drinks", color: "#8e4ec6", lat: -3.7342, lon: -38.5050, desc: "Piano e luz vermelha. Boemia afrancesada." },
            { name: "Brewstone Pub", cat: "Cerveja & Rock", color: "#8e4ec6", lat: -3.7360, lon: -38.5010, desc: "Pub com cerveja própria e cardápio de hambúrguer que aparece em várias listas de 'melhores da cidade'. Ambiente escuro, trilha sonora acertada. Um dos poucos pubs com identidade própria na Aldeota." },
            { name: "Amika Coffee", cat: "Café Geek", color: "#8e4ec6", lat: -3.7363, lon: -38.5018, desc: "Café que entende o que é trabalho remoto de verdade: Wi-Fi decente, tomadas acessíveis, barulho tolerável. Reviews cheios de 'ótimo lugar pra trabalhar'. O único café da cidade onde o notebook não é enfeite." },
            { name: "Le Pain Le Café", cat: "Francês", color: "#8e4ec6", lat: -3.7340, lon: -38.4978, desc: "Croissant e ar condicionado. Madames e cults." },
            { name: "Benévolo", cat: "Gelato", color: "#8e4ec6", lat: -3.7330, lon: -38.4962, desc: "Sorvete e café. Ponto de encontro pós-almoço." },
            { name: "Museu da Fotografia", cat: "Cultura", color: "#8e4ec6", lat: -3.7210, lon: -38.5170, desc: "Ar condicionado gelado e fotos incríveis." },
            { name: "Caixa Cultural", cat: "Exposições", color: "#8e4ec6", lat: -3.7193, lon: -38.5184, desc: "Exposições gratuitas na Praia de Iracema." },
            // --- UNDERGROUND / RAIZ (Vermelho) ---
            { name: "Route Fortaleza", cat: "O Caos", color: "#c0392b", lat: -3.7192, lon: -38.5162, desc: "A balada mais famosa e mais infame de Fortaleza, na Praia de Iracema. Cinco andares de arrependimento preventivo. Reviews no Google divididos entre 'melhor noite da minha vida' e 'nunca mais'. Ambos estão certos." },
            { name: "Bar do Seu Nonato", cat: "Raiz Intelectual", color: "#c0392b", lat: -3.7441, lon: -38.5362, desc: "Bar de boteco raiz no Benfica, um dos mais antigos da área. Panelada às terças que virou quase ritual. Reviews falam em 'atendimento familiar' e 'preço justo'. Tipo de lugar que não existe mais em Fortaleza — exceto aqui." },
            { name: "Bar do Vinil", cat: "Hipster Raiz", color: "#c0392b", lat: -3.7430, lon: -38.5340, desc: "Bar de vinil no Benfica que resistiu à era do streaming. Toca LP de verdade em uma vitrola de verdade enquanto serve cerveja barata. Reviews falam em 'experiência nostálgica'. Um dos últimos do tipo na cidade." },
            { name: "Rap Bar", cat: "Cena Urbana", color: "#c0392b", lat: -3.7255, lon: -38.5258, desc: "Ponto de encontro da cena urbana no Centro. Cerveja em lata no preço que devia ser o padrão. Reviews elogiam o 'ambiente autêntico'. Frequentado por quem ainda acredita que o Centro tem vida." },
            { name: "Budega dos Pinhões", cat: "Praça", color: "#c0392b", lat: -3.7215, lon: -38.5197, desc: "Esquenta pro nada. Bebe em pé na praça." },
            { name: "Pitombeira Bar", cat: "Raiz", color: "#c0392b", lat: -3.7425, lon: -38.5365, desc: "Mesa bamba e garçom amigo íntimo." },
            { name: "Mambembe", cat: "Cultural Caos", color: "#c0392b", lat: -3.7197, lon: -38.5179, desc: "Festa na rua e liberdade total na PI." },
            { name: "Chopp do Bixiga", cat: "Clássico Dragão", color: "#c0392b", lat: -3.7196, lon: -38.5168, desc: "Chopp de vinho famoso e perigoso." },
            { name: "Praça dos Leões", cat: "Rua", color: "#c0392b", lat: -3.7280, lon: -38.5270, desc: "Underground real. Cerveja de isopor." },
            { name: "Raimundo dos Queijos", cat: "Patrimônio", color: "#c0392b", lat: -3.7272, lon: -38.5282, desc: "Domingo de manhã é lei no Centro." },
            { name: "Leão do Sul", cat: "Azia Boa", color: "#c0392b", lat: -3.7268, lon: -38.5272, desc: "Pastel com caldo de cana lendário." },
            { name: "Praça da Gentilândia", cat: "Benfica Soul", color: "#c0392b", lat: -3.7420, lon: -38.5352, desc: "Skate, litrão e debate político." },
            { name: "Serpentina", cat: "Cerveja Raiz", color: "#c0392b", lat: -3.7248, lon: -38.5252, desc: "Artesanal no Centro, mesa na calçada." },
            { name: "Gandaia Club", cat: "LGBTQIA+", color: "#c0392b", lat: -3.7198, lon: -38.5186, desc: "Templo do pop e do suor." },
            { name: "Haus", cat: "Eletrônico", color: "#c0392b", lat: -3.7195, lon: -38.5172, desc: "Balada de música eletrônica na Praia de Iracema, uma das poucas da cidade com curadoria musical consistente. Reviews elogiam o som e criticam a fila. Frequentado por quem sabe o nome do DJ." },
            { name: "Level", cat: "Balada Drag", color: "#c0392b", lat: -3.7197, lon: -38.5164, desc: "Shows de Drag Queen e festa até amanhecer." },
            { name: "Centro Fashion", cat: "Moda & Caos", color: "#c0392b", lat: -3.7152, lon: -38.5395, desc: "Onde a sacoleira guerreira faz a moda girar." },
            { name: "Mercado Central", cat: "Turista & Local", color: "#c0392b", lat: -3.7285, lon: -38.5368, desc: "O mercado de artesanato mais famoso de Fortaleza, com mais de 600 boxes. Reviews de turistas entusiasmados e fortalezenses que foram 'uma vez e nunca mais'. Renda, cajuína, bordado e aquela sensação de labirinto que nunca termina." },
            { name: "Mercado São Sebastião", cat: "Café Nordestino", color: "#c0392b", lat: -3.7295, lon: -38.5352, desc: "Cuscuz, panelada e gritaria." },
            { name: "Beco da Poeira", cat: "Hardcore", color: "#c0392b", lat: -3.7278, lon: -38.5298, desc: "Comércio popular extremo." },
            { name: "Praça do Ferreira", cat: "Marco Zero", color: "#c0392b", lat: -3.7262, lon: -38.5262, desc: "A praça mais central de Fortaleza, patrimônio histórico com o famoso Galo do Sobral. Reviews de turistas encantados e moradores saudosos. Palco de manifestações, encontros e toda a vida pública que ainda existe no Centro." },
            { name: "Bar do Biel", cat: "Sinuca", color: "#c0392b", lat: -3.7230, lon: -38.5252, desc: "Sinuca e cerveja barata no Centro." },
            { name: "Assis da Picanha", cat: "Picanha Raiz", color: "#c0392b", lat: -3.7318, lon: -38.5398, desc: "Picanha boa e barata." },
            { name: "Churrascaria O Osmar", cat: "Fartura", color: "#c0392b", lat: -3.7505, lon: -38.5498, desc: "Ponto de taxistas. Comida muita e barata." },
            // --- ELITE / PREMIUM (Azul) ---
            { name: "Moleskine / Moleska", cat: "Elite", color: "#007aff", lat: -3.7323, lon: -38.4930, desc: "O bar mais discretamente exclusivo da Aldeota. Iluminação baixa, clientela alta. Reviews no Google são escassos — quem vai lá não posta. Presença de empresários e políticos numa noite comum." },
            { name: "Hoots Gastropub", cat: "Rock de Rico", color: "#007aff", lat: -3.7338, lon: -38.4952, desc: "Gastropub na Aldeota com cardápio de carne nobre e rock setentista no fundo. Reviews consistentes de 'ótimo hambúrguer' e 'ambiente agradável'. Tiozão que ouve Led Zeppelin pagando bem para ouvir Led Zeppelin." },
            { name: "Austin Pub", cat: "Sertanejo Elite", color: "#007aff", lat: -3.7345, lon: -38.4902, desc: "O pub sertanejo mais frequentado da Aldeota, com décadas de história. Reviews falando em 'boa música ao vivo' e 'ambiente animado'. Território do sertanejo universitário e da paquera explícita às quintas." },
            { name: "Cervejaria Turatti", cat: "Família Rica", color: "#007aff", lat: -3.7352, lon: -38.4858, desc: "Disney de Bêbado Rico." },
            { name: "Bang's Sul", cat: "Faroeste Gourmet", color: "#007aff", lat: -3.7812, lon: -38.4812, desc: "Carne defumada cara na Zona Sul." },
            { name: "Floresta Complexo", cat: "Cover", color: "#007aff", lat: -3.7368, lon: -38.4992, desc: "Rock dos anos 80 pra tiozões." },
            { name: "Donkey Head", cat: "Cervejeiro", color: "#007aff", lat: -3.7375, lon: -38.5008, desc: "Cerveja boa na Aldeota." },
            { name: "Boteco do Ciço", cat: "Fake Raiz", color: "#007aff", lat: -3.7372, lon: -38.5025, desc: "Parece pobre, mas fica no m² mais caro." },
            { name: "Colosso Fortaleza", cat: "Super Elite", color: "#007aff", lat: -3.7555, lon: -38.4878, desc: "Wakeboard e combo de vodka caro no Edson Queiroz." },
            { name: "Zoi Restaurante", cat: "Jantar de Negócios", color: "#007aff", lat: -3.7558, lon: -38.4895, desc: "Restaurante sofisticado no Edson Queiroz, frequentemente em listas de 'melhores de Fortaleza'. Reviews elogiam o risoto e a carta de vinhos. Jantar de negócios, aniversário de 50 anos, pedido de casamento — tudo acontece aqui." },
            { name: "Iate Clube", cat: "Old Money", color: "#007aff", lat: -3.7210, lon: -38.4820, desc: "O clube náutico mais antigo de Fortaleza, fundado em 1903. Reviews raros — acesso restrito a sócios. Vista para o mar, ambiente histórico e uma distinção que o dinheiro recente ainda não conseguiu comprar." },
            { name: "Coco Bambu (Frutos)", cat: "Embaixada", color: "#007aff", lat: -3.7305, lon: -38.4958, desc: "Uma das unidades mais movimentadas da rede, famosa pelo camarão e pelas filas imensas no fim de semana. Reviews divididos entre 'melhor da rede' e 'demora absurda'. Cardápio que funciona como religião para boa parte de Fortaleza." },
            { name: "Santa Grelha", cat: "Carne de Ouro", color: "#007aff", lat: -3.7345, lon: -38.4985, desc: "Onde o empresário almoça." },
            { name: "Ryori Sushi", cat: "Japa de Rico", color: "#007aff", lat: -3.7355, lon: -38.4928, desc: "Sushi com trufa branca." },
            { name: "Ponza Frutos do Mar", cat: "Sofisticação", color: "#007aff", lat: -3.7332, lon: -38.4965, desc: "Ambiente azul e comida chique." },
            { name: "Vibe do Lago", cat: "Lago Jacarey", color: "#007aff", lat: -3.7950, lon: -38.4845, desc: "O point da Zona Sul. Famílias ricas." },
            { name: "Cabaña del Primo", cat: "Argentino", color: "#007aff", lat: -3.7362, lon: -38.4912, desc: "Parrilla porteña no Jardins Open Mall." },
            { name: "Geppos Italiano", cat: "Jardins Open Mall", color: "#007aff", lat: -3.7358, lon: -38.4908, desc: "Massa e vinho. Fingir que tá na Europa." },
            { name: "Illa Mare", cat: "Beira Mar Elite", color: "#007aff", lat: -3.7235, lon: -38.4875, desc: "Restaurante flutuante com preço pra turista." },
            { name: "Vignoli", cat: "Pizza de Rico", color: "#007aff", lat: -3.7372, lon: -38.4948, desc: "Pizza fina. Coma com luvas." },
            { name: "Samba do Vila", cat: "Pagode de Elite", color: "#007aff", lat: -3.7382, lon: -38.4985, desc: "Pagode pra quem usa sapatênis." },
            { name: "Living", cat: "Balada Playba", color: "#007aff", lat: -3.7338, lon: -38.4942, desc: "Eletrônico e funk na Aldeota." },
            { name: "Soho", cat: "Asiático", color: "#007aff", lat: -3.7405, lon: -38.4715, desc: "Japa moderno no RioMar." },
            { name: "Medit", cat: "Alta Gastronomia", color: "#007aff", lat: -3.7350, lon: -38.4902, desc: "Um dos melhores da cidade." },
            { name: "L'Ô Restaurante", cat: "Eventos", color: "#007aff", lat: -3.7248, lon: -38.5155, desc: "Oásis de riqueza no Dragão." },
            { name: "Ideal Clube", cat: "Tradicional", color: "#007aff", lat: -3.7278, lon: -38.5048, desc: "Clube da alta sociedade." },
            { name: "Misaki", cat: "Japa Fusion", color: "#007aff", lat: -3.7368, lon: -38.4918, desc: "Lagosta e ouro." },
            { name: "Picanha do Cowboy", cat: "Clássico", color: "#007aff", lat: -3.7352, lon: -38.5005, desc: "Picanha honesta em área nobre." },
            // --- POVÃO / POPULAR (Verde) ---
            { name: "Divina Picanha", cat: "Família Tradicional", color: "#34c759", lat: -3.7705, lon: -38.4855, desc: "Almoço de domingo na Sul." },
            { name: "Paraíba Raiz", cat: "Butequeiro", color: "#34c759", lat: -3.7438, lon: -38.5355, desc: "Foco é beber litrão barato." },
            { name: "Kosmika Club", cat: "Pop Glitter", color: "#34c759", lat: -3.7242, lon: -38.5198, desc: "Pop e glitter no Centro." },
            { name: "Sr. Petisco", cat: "Comida", color: "#34c759", lat: -3.7550, lon: -38.5512, desc: "Comida de boteco honesta." },
            { name: "Bar do Seu Carlos", cat: "Lenda", color: "#34c759", lat: -3.7598, lon: -38.5598, desc: "Lenda do Montese." },
            { name: "Bar do Animaw", cat: "Bicho Solto", color: "#34c759", lat: -3.7585, lon: -38.5550, desc: "Cerveja trincando e zero etiqueta." },
            { name: "Tony Do Orós", cat: "Carne de Sol", color: "#34c759", lat: -3.7658, lon: -38.5710, desc: "Restaurante simples com fama desproporcional ao visual. A carne de sol do Tony acumula reviews apaixonados há anos. 'Melhor da cidade' aparece em quase toda avaliação. Filas comuns no almoço de domingo." },
            { name: "Bar da Loura", cat: "Centro Raiz", color: "#34c759", lat: -3.7252, lon: -38.5282, desc: "Bar de bairro no Centro sem pose alguma. Mesinha na calçada, clientela fixa, cerveja fria. Reviews breves e diretos: 'bom e barato'. A definição de boteco que sumiu do resto da cidade." },
            { name: "Carneiro do Ordones", cat: "Fartura", color: "#34c759", lat: -3.7355, lon: -38.5558, desc: "Carneiro assado que virou ponto de peregrinação na Parquelândia. Reviews falam em 'imperdível' e 'deu vontade de voltar no mesmo dia'. Porções enormes, preço justo, atendimento caótico de tão cheio." },
            { name: "Bar do Mincharia", cat: "Praia Raiz", color: "#34c759", lat: -3.7202, lon: -38.5108, desc: "Pé na areia na PI." },
            { name: "Cantinho do Frango", cat: "Patrimônio", color: "#34c759", lat: -3.7362, lon: -38.5048, desc: "Frango desossado e vinil." },
            { name: "Kina do Feijão Verde", cat: "Regional", color: "#34c759", lat: -3.7305, lon: -38.5155, desc: "O melhor feijão verde." },
            { name: "Carneiro do Tércio", cat: "Zona Sul", color: "#34c759", lat: -3.7798, lon: -38.4902, desc: "Carneiro gigante na Sul." },
            { name: "Rei da Panelada", cat: "Cura Ressaca", color: "#34c759", lat: -3.7498, lon: -38.5205, desc: "A cura está aqui." },
            { name: "Colher de Pau", cat: "Turista Raiz", color: "#34c759", lat: -3.7358, lon: -38.4882, desc: "Um dos restaurantes de comida regional mais bem avaliados da Varjota. Reviews elogiam o baião de dois e a galinha caipira. Ambiente simples, sabor que não é simples. Turista e fortalezense no mesmo cardápio." },
            { name: "Arre Égua", cat: "Forró Antigo", color: "#34c759", lat: -3.7368, lon: -38.4855, desc: "Vila sertaneja turística." },
            { name: "Kukukaya", cat: "Forró Raiz", color: "#34c759", lat: -3.7448, lon: -38.5252, desc: "Dançar agarradinho." },
            { name: "Pirata Bar", cat: "Segunda-feira", color: "#34c759", lat: -3.7191, lon: -38.5166, desc: "A lenda é real: a segunda-feira do Pirata Bar na Praia de Iracema é um dos eventos mais famosos de Fortaleza há décadas. Reviews de turistas em êxtase. Uma das poucas coisas em Fortaleza que supera a reputação." },
            { name: "Lupus Bier", cat: "Humor", color: "#34c759", lat: -3.7212, lon: -38.5158, desc: "Show de humor e Rossicléa." },
            { name: "Chico do Caranguejo", cat: "Praia Futuro", color: "#34c759", lat: -3.7542, lon: -38.4440, desc: "Restaurante icônico da Praia do Futuro especializado em caranguejo. Reviews elogiam a 'experiência completa' — comer, sujar a mão, ouvir forró ao vivo. Um dos destinos turísticos mais autênticos da cidade." },
            { name: "Mercado dos Peixes", cat: "Pôr do Sol", color: "#34c759", lat: -3.7215, lon: -38.4798, desc: "Mercado de peixe com restaurante anexo próximo à Praia do Futuro. Reviews falam em 'camarão fresquíssimo' e 'experiência autêntica'. Um dos poucos lugares onde o peixe ainda chega direto do mar para o prato." },
            { name: "Orbita Blue", cat: "Praia Hype", color: "#34c759", lat: -3.7315, lon: -38.4650, desc: "Eletrônica e gente bonita na PF." },
            { name: "Santa Praia", cat: "Beach Tennis", color: "#34c759", lat: -3.7322, lon: -38.4632, desc: "Suar e beber." },
            { name: "Pastel na Hora", cat: "Lanche", color: "#34c759", lat: -3.7348, lon: -38.5052, desc: "Pastel gigante." },
            { name: "Beira Mar Grill", cat: "Churrasco", color: "#34c759", lat: -3.7252, lon: -38.4902, desc: "Rodízio na orla." },
            { name: "Coco Bambu Sul", cat: "Evento", color: "#34c759", lat: -3.7850, lon: -38.4800, desc: "Maior restaurante do Brasil." },
            { name: "Ordones Sandry", cat: "Variação", color: "#34c759", lat: -3.7360, lon: -38.5545, desc: "Versão premium do Ordones." },
            { name: "Tatu Bola", cat: "Balada Sertaneja", color: "#34c759", lat: -3.7338, lon: -38.4935, desc: "Paquera na semana." },
            { name: "Boteco Praia", cat: "Vista", color: "#34c759", lat: -3.7222, lon: -38.4948, desc: "Prédio na orla com vista." },
            { name: "Alpendre", cat: "Cultural", color: "#34c759", lat: -3.7278, lon: -38.5128, desc: "Cerveja de garrafa na calçada." },
            { name: "Náutico Clube", cat: "Clube", color: "#34c759", lat: -3.7232, lon: -38.4918, desc: "Clube da orla." },
            { name: "Círculo Militar", cat: "Clube", color: "#34c759", lat: -3.7252, lon: -38.4948, desc: "Eventos militares e vista." },
            { name: "BNB Clube", cat: "Clube", color: "#34c759", lat: -3.7480, lon: -38.5012, desc: "Festas juninas épicas." },
            { name: "Parque do Cocó", cat: "Natureza", color: "#34c759", lat: -3.7468, lon: -38.4825, desc: "Piquenique e trilha." },
            { name: "Padaria Costa Mendes", cat: "Montese", color: "#34c759", lat: -3.7598, lon: -38.5402, desc: "Pão de coco lendário." },
            { name: "Empório Delitália", cat: "Padaria Rica", color: "#34c759", lat: -3.7362, lon: -38.4948, desc: "Presunto de Parma às 22h." },
            // --- NEUTROS & MALLS (Amarelo) ---
            { name: "Boteco do Lee", cat: "Neutro", color: "#e8a020", lat: -3.7305, lon: -38.5210, desc: "O purgatório." },
            { name: "Bar da Tetê", cat: "Indefinido", color: "#e8a020", lat: -3.7321, lon: -38.5225, desc: "Ninguém define o público." },
            { name: "Relativo Bar", cat: "Depende", color: "#e8a020", lat: -3.7315, lon: -38.5218, desc: "Tudo é relativo." },
            { name: "Shopping Iguatemi", cat: "O Mall", color: "#e8a020", lat: -3.7554, lon: -38.4873, desc: "O shopping mais tradicional de Fortaleza, inaugurado em 1982. Reviews falam em 'praça de alimentação boa' e 'Cinema UCI excelente'. Território da classe média-alta consolidada que não precisa migrar para o RioMar." },
            { name: "Shopping RioMar", cat: "O Novo Rico", color: "#e8a020", lat: -3.7410, lon: -38.4718, desc: "O maior shopping de Fortaleza em área construída, com mais de 400 lojas. Reviews elogiam a variedade e criticam o estacionamento impossível no fim de semana. A âncora do vetor leste de expansão da cidade." },
            { name: "North Shopping", cat: "O do Povo", color: "#e8a020", lat: -3.7112, lon: -38.5818, desc: "Formigueiro na Bezerra." },
            { name: "Shopping Benfica", cat: "Diversidade", color: "#e8a020", lat: -3.7420, lon: -38.5378, desc: "Otakus e vovós." },
            { name: "Shopping Del Paseo", cat: "Compacto", color: "#e8a020", lat: -3.7350, lon: -38.4982, desc: "Shopping de rico velho." },
            { name: "Via Sul Shopping", cat: "Zona Sul", color: "#e8a020", lat: -3.8298, lon: -38.5210, desc: "Shopping da Seis Bocas." },
            { name: "Grand Shopping", cat: "Messejana", color: "#e8a020", lat: -3.8218, lon: -38.4902, desc: "Salvou Messejana." },
            { name: "Pão de Açúcar Náutico", cat: "Meeting Point", color: "#e8a020", lat: -3.7238, lon: -38.4928, desc: "Ponto de encontro." },
            { name: "Feirinha da Beira Mar", cat: "Turismo", color: "#e8a020", lat: -3.7255, lon: -38.4965, desc: "Feira de artesanato na orla da Beira Mar, funcionando há décadas. Reviews de turistas encantados com a renda cearense e a cajuína. Aberta nas noites dos finais de semana — uma das poucas programações gratuitas e genuínas da cidade." },
            { name: "Estátua de Iracema", cat: "Foto", color: "#e8a020", lat: -3.7196, lon: -38.5148, desc: "A estátua de Iracema Guardiã, na Praia de Iracema, é um dos símbolos mais fotografados de Fortaleza. Reviews de turistas com fotos ao pôr do sol. Ponto de encontro, de chegada e de despedida da cidade." }
        ];

        let database = [...FALLBACK_DATABASE];

        // ===== MAPA =====
        const map = L.map('map', { zoomControl: false }).setView([-3.7327, -38.5270], 13);
        window._leafletMap = map;
        let currentTileLayer;
        let currentZoom = 13;

        const TILES = {
            light:     { url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', attr: '© OpenStreetMap © Carto' },
            dark:      { url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', attr: '© OpenStreetMap © Carto' },
            satellite: { url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attr: '© Esri Satellite' },
            terrain:   { url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', attr: '© OpenStreetMap © OpenTopoMap' },
            topo:      { url: 'https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=', attr: '© Thunderforest © OpenStreetMap' },
        };

        function setMapTiles(mode) {
            if (currentTileLayer) map.removeLayer(currentTileLayer);
            const tileKey = (mode === 'topo') ? 'terrain' : mode;
            const tile = TILES[tileKey] || TILES.light;
            currentTileLayer = L.tileLayer(tile.url, {
                attribution: tile.attr,
                maxZoom: 20,
                subdomains: tileKey === 'terrain' ? 'abc' : 'abcd',
            }).addTo(map);
        }

        const savedThemeEarly = localStorage.getItem('frp-theme');
        const sysDarkEarly = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initDark = savedThemeEarly ? savedThemeEarly === 'dark' : sysDarkEarly;
        const savedTerrain = localStorage.getItem('frp-terrain') || (initDark ? 'dark' : 'light');
        setMapTiles(savedTerrain);

        // Terrain popover toggle
        const terrainPopover = document.getElementById('terrain-popover');
        const terrainToggleBtn = document.getElementById('terrain-toggle-btn');

        function activateTerrainBtn(mode) {
            document.querySelectorAll('.terrain-opt').forEach(b => {
                b.classList.toggle('active', b.dataset.terrain === mode);
            });
        }
        activateTerrainBtn(savedTerrain);

        terrainToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            terrainPopover.classList.toggle('open');
        });

        document.querySelectorAll('.terrain-opt').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const mode = btn.dataset.terrain;
                setMapTiles(mode);
                activateTerrainBtn(mode);
                localStorage.setItem('frp-terrain', mode);
                setTimeout(() => terrainPopover.classList.remove('open'), 180);
            });
        });

        document.addEventListener('click', () => terrainPopover.classList.remove('open'));
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // ── Weather / Clouds layer ──
        // Uses OpenWeatherMap free tile layer (no API key required for clouds_new)
        let weatherLayer = null;
        let weatherActive = false;
        const WEATHER_TILE = 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=demo';

        const weatherBtn = document.getElementById('weather-toggle-btn');
        if (weatherBtn) {
            weatherBtn.addEventListener('click', e => {
                e.stopPropagation();
                weatherActive = !weatherActive;
                if (weatherActive) {
                    // Try to get real weather for Fortaleza too
                    weatherLayer = L.tileLayer(WEATHER_TILE, {
                        opacity: 0.5, maxZoom: 20, attribution: '© OpenWeatherMap'
                    }).addTo(map);
                    weatherBtn.classList.add('terrain-opt', 'active');
                    terrainPopover.classList.remove('open');
                    // Show weather toast
                    showToast('Camada de nuvens ativada');
                } else {
                    if (weatherLayer) { map.removeLayer(weatherLayer); weatherLayer = null; }
                    weatherBtn.classList.remove('active');
                    showToast('Camada de nuvens desativada');
                }
            });
        }

        // ===== LÓGICA DE OCULTAR O MENU (PC e MOBILE) =====
        let isSidebarVisibleDesktop = true;
        
        document.getElementById('sidebar-toggle').addEventListener('click', () => {
            if (window.innerWidth > 768) {
                // Desktop: anima sidebar para dentro/fora
                const sidebar = document.getElementById('sidebar');
                isSidebarVisibleDesktop = !isSidebarVisibleDesktop;
                if (!isSidebarVisibleDesktop) {
                    gsap.to(sidebar, {
                        marginLeft: -380, opacity: 0, duration: 0.42, ease: 'power3.inOut',
                        onUpdate: () => window._leafletMap && window._leafletMap.invalidateSize()
                    });
                } else {
                    gsap.to(sidebar, {
                        marginLeft: 0, opacity: 1, duration: 0.42, ease: 'power3.inOut',
                        onUpdate: () => window._leafletMap && window._leafletMap.invalidateSize()
                    });
                }
            } else {
                // Mobile: alterna entre escondido (sheet-hidden) e peek
                if (typeof window.setMobileSheetState === 'function') {
                    const hidden = document.getElementById('sidebar').classList.contains('sheet-hidden');
                    window.setMobileSheetState(hidden ? 0 : 3, true);
                }
            }
        });

        // ===== PINS DO MAPA =====
        let markers = [];
        let activeColor = 'all';

        function getPinSize(zoom) {
            if (zoom >= 16) return 22;
            if (zoom >= 14) return 16;
            if (zoom >= 12) return 11;
            return 8;
        }

        function showSVGIcon(zoom) { return zoom >= 14; }

        function createPinIcon(place, zoom) {
            const size = getPinSize(zoom);
            const showIco = showSVGIcon(zoom);
            const bg = place.color;
            const svgSize = Math.round(size * 0.58);
            return L.divIcon({
                className: '',
                html: `<div class="map-pin-wrap" style="width:${size}px;height:${size}px;">
                    <div class="map-pin" style="width:${size}px;height:${size}px;background:${bg};border-width:${size>14?'2.5px':'2px'};">
                        ${showIco ? getPinSVGHtml(place.color, svgSize) : ''}
                    </div>
                </div>`,
                iconSize: [size, size],
                iconAnchor: [size/2, size/2],
                popupAnchor: [0, -size/2 - 4]
            });
        }

        function updateMarkersZoom() {
            const zoom = map.getZoom();
            markers.forEach(({ marker, place }) => {
                marker.setIcon(createPinIcon(place, zoom));
            });
        }

        map.on('zoomend', updateMarkersZoom);

        // ── Simple toast (generic messages like geolocation) ──
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            gsap.killTweensOf(toast);
            gsap.fromTo(toast,
                { opacity: 0, y: 20, x: '-50%' },
                { opacity: 1, y: 0, x: '-50%', duration: 0.28, ease: 'power2.out',
                  onComplete: () => gsap.to(toast, { opacity: 0, y: -8, x: '-50%', duration: 0.35, delay: 2.2 })
                }
            );
        }

        // ── Place toast card (shows name + category when clicking list item) ──
        function showPlaceToast(place) {
            const toast = document.getElementById('place-toast');
            document.getElementById('pt-dot').style.background  = place.color;
            document.getElementById('pt-cat').style.color       = place.color;
            document.getElementById('pt-cat').textContent       = place.cat;
            document.getElementById('pt-name').textContent      = place.name;
            gsap.killTweensOf(toast);
            gsap.fromTo(toast,
                { opacity: 0, y: 28, x: '-50%' },
                { opacity: 1, y: 0, x: '-50%', duration: 0.32, ease: 'back.out(1.8)',
                  onComplete: () => gsap.to(toast, { opacity: 0, y: -10, x: '-50%', duration: 0.3, delay: 2.5 })
                }
            );
        }

        const listContainer = document.getElementById('places-list');
        const searchBox = document.getElementById('searchBox');
        const resultsCount = document.getElementById('results-count');
        const emptyState = document.getElementById('empty-state');

        function render(items) {
            listContainer.querySelectorAll('.place-item').forEach(el => el.remove());
            markers.forEach(({ marker }) => map.removeLayer(marker));
            markers = [];

            resultsCount.textContent = items.length > 0
                ? `${items.length} ${items.length === 1 ? 'local' : 'locais'}`
                : '';
            emptyState.style.display = items.length === 0 ? 'flex' : 'none';

            const fragment = document.createDocumentFragment();
            const zoom = map.getZoom();

            items.forEach((place) => {
                const svgHtml = getCatSVG(place.color);

                const item = document.createElement('div');
                item.className = 'place-item';
                item.innerHTML = `
                    <div class="place-icon-badge" style="background:${place.color}22;color:${place.color};display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;flex-shrink:0;">
                        ${svgHtml}
                    </div>
                    <div class="place-content">
                        <span class="place-cat" style="color:${place.color}">${place.cat}</span>
                        <h3>${place.name}</h3>
                        <p>${place.desc}</p>
                    </div>
                `;

                const marker = L.marker([place.lat, place.lon], {
                    icon: createPinIcon(place, zoom)
                }).addTo(map);

                marker.on('mouseover', function() {
                    const el = this.getElement();
                    if (el) gsap.to(el.querySelector('.map-pin-wrap'), { scale: 1.5, duration: 0.18 });
                });
                marker.on('mouseout', function() {
                    const el = this.getElement();
                    if (el) gsap.to(el.querySelector('.map-pin-wrap'), { scale: 1, duration: 0.18 });
                });

                const gmapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' Fortaleza CE')}`;
                marker.bindPopup(`
                    <div style="color:${place.color};width:32px;height:32px;margin-bottom:8px;">${svgHtml}</div>
                    <div class="popup-category" style="color:${place.color}">${place.cat}</div>
                    <div class="popup-title">${place.name}</div>
                    <div class="popup-desc">${place.desc}</div>
                    <a href="${gmapsLink}" target="_blank" class="popup-btn" style="background:${place.color}">Como chegar →</a>
                `);

                item.addEventListener('click', () => {
                    document.querySelectorAll('.place-item').forEach(el => el.classList.remove('active'));
                    item.classList.add('active');
                    map.flyTo([place.lat, place.lon], 16, { duration: 1.1, easeLinearity: 0.5 });
                    marker.openPopup();
                    showPlaceToast(place);
                    gsap.fromTo(item, { scale: 0.98 }, { scale: 1, duration: 0.2, ease: 'back.out(2)' });
                });

                markers.push({ marker, place });
                fragment.appendChild(item);
            });

            listContainer.insertBefore(fragment, emptyState);

            if (items.length > 0) {
                gsap.fromTo('.place-item',
                    { opacity: 0, x: -8 },
                    { opacity: 1, x: 0, duration: 0.3, stagger: 0.025, ease: 'power2.out' }
                );
            }
        }

        async function carregarLocais() {
            const spinner = document.getElementById('list-spinner');
            const apiBadge = document.getElementById('api-badge');
            if (spinner) spinner.style.display = 'flex';

            // 1) Try live API
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 4000);
                const resp = await fetch(API_URL + '/locais', { signal: controller.signal });
                clearTimeout(timeout);
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                const dados = await resp.json();
                if (Array.isArray(dados) && dados.length > 0) {
                    database = dados.map(d => ({
                        id: d.id, name: d.name, cat: d.cat, color: d.color,
                        lat: parseFloat(d.lat), lon: parseFloat(d.lon), desc: d.desc
                    }));
                    if (apiBadge) apiBadge.textContent = 'API Online';
                    if (spinner) spinner.style.display = 'none';
                    render(database);
                    return;
                }
            } catch (e) { /* fall through */ }

            // 2) Try local JSON file
            try {
                const resp = await fetch('./data/locais.json');
                if (!resp.ok) throw new Error('JSON não encontrado');
                const dados = await resp.json();
                if (Array.isArray(dados) && dados.length > 0) {
                    database = dados;
                    if (apiBadge) apiBadge.textContent = '';
                    if (spinner) spinner.style.display = 'none';
                    render(database);
                    return;
                }
            } catch (e) { /* fall through */ }

            // 3) Inline fallback
            database = [...FALLBACK_DATABASE];
            if (apiBadge) apiBadge.textContent = '';
            if (spinner) spinner.style.display = 'none';
            render(database);
        }
        carregarLocais();

        let searchTimeout;
        searchBox.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const term = e.target.value.toLowerCase();
                let filtered = database.filter(p =>
                    p.name.toLowerCase().includes(term) ||
                    p.desc.toLowerCase().includes(term) ||
                    p.cat.toLowerCase().includes(term)
                );
                if (activeColor !== 'all') filtered = filtered.filter(p => p.color === activeColor);
                render(filtered);
            }, 150);
        });

        document.querySelectorAll('.filter-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('.filter-pill').forEach(p => {
                    p.classList.remove('active');
                    p.style.background = '';
                    p.style.borderColor = '';
                    p.style.color = '';
                });
                pill.classList.add('active');
                const color = pill.dataset.color;
                if (color === 'all') {
                    pill.style.background = 'var(--text-primary)';
                    pill.style.borderColor = 'var(--text-primary)';
                    pill.style.color = 'var(--bg-body)';
                } else {
                    pill.style.background = color;
                    pill.style.borderColor = color;
                    pill.style.color = 'white';
                }
                activeColor = color;
                const term = searchBox.value.toLowerCase();
                let filtered = color === 'all' ? database : database.filter(p => p.color === color);
                if (term) filtered = filtered.filter(p =>
                    p.name.toLowerCase().includes(term) ||
                    p.desc.toLowerCase().includes(term) ||
                    p.cat.toLowerCase().includes(term)
                );
                render(filtered);
                gsap.fromTo(pill, { scale: 0.92 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
            });
        });

        const toggle = document.getElementById('theme-toggle');
        const toggleMobile = document.getElementById('theme-toggle-mobile');
        const tabThemeLabel = document.getElementById('tab-theme-label');
        const themeLabel = document.getElementById('theme-label');

        function applyTheme(dark, save) {
            document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
            toggle.checked = dark;
            if (toggleMobile) toggleMobile.checked = dark;
            if (tabThemeLabel) tabThemeLabel.textContent = dark ? 'Escuro' : 'Claro';
            if (themeLabel) themeLabel.textContent = dark ? 'Escuro' : 'Claro';
            
            const terrain = localStorage.getItem('frp-terrain') || (dark ? 'dark' : 'light');
            if (terrain === 'light' || terrain === 'dark') {
                const newTerrain = dark ? 'dark' : 'light';
                setMapTiles(newTerrain);
                if (typeof activateTerrainBtn === 'function') activateTerrainBtn(newTerrain);
                localStorage.setItem('frp-terrain', newTerrain);
            }
            if (save) localStorage.setItem('frp-theme', dark ? 'dark' : 'light');
        }

        toggle.addEventListener('change', e => applyTheme(e.target.checked, true));
        if (toggleMobile) toggleMobile.addEventListener('change', e => applyTheme(e.target.checked, true));

        const savedTheme = localStorage.getItem('frp-theme');
        const sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(savedTheme ? savedTheme === 'dark' : sysDark, false);

        // ===== GSAP ENTRADA INICIAL =====
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.to('#main-header', { opacity: 1, y: 0, duration: 0.55 })
          .to('#sidebar', { opacity: 1, x: 0, duration: 0.45 }, '-=0.3')
          .from('#map-wrapper', { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.35');

        // ===== BOTTOM SHEET (mobile) com Trava Anti-Fuga =====
        (function() {
            if (window.innerWidth > 768) return;
            const sheet = document.getElementById('sidebar');
            const mapEl = document.getElementById('map');
            if (!sheet) return;

            const STATES = ['sheet-peek', 'sheet-mid', 'sheet-expanded', 'sheet-hidden'];
            let currentState = 0;
            window.mobileSheetState = 0;

            function applyState(idx, animate) {
                STATES.forEach(s => sheet.classList.remove(s));
                if (!animate) sheet.style.transition = 'none';
                sheet.classList.add(STATES[idx]);
                if (!animate) requestAnimationFrame(() => sheet.style.transition = '');
                currentState = idx;
                window.mobileSheetState = idx; 
                setTimeout(() => { if (window._leafletMap) window._leafletMap.invalidateSize(); }, 450);
            }
            
            window.setMobileSheetState = applyState;
            applyState(0, false);

            let startY = 0;
            let currentY = 0;
            let isDragging = false;

            function getTranslateY() {
                const matrix = new WebKitCSSMatrix(window.getComputedStyle(sheet).transform);
                return matrix.m42;
            }

            sheet.addEventListener('touchstart', e => {
                const touch = e.touches[0];
                const rect = sheet.getBoundingClientRect();
                const hitFromTop = touch.clientY - rect.top;
                // Só permite arrastar se tocar na handle area (topo 44px) OU se não estiver expandido
                if (hitFromTop > 44 && currentState === 2) return;
                // Não arrasta quando escondido
                if (document.getElementById('sidebar').classList.contains('sheet-hidden')) return;
                isDragging = true;
                startY = touch.clientY;
                currentY = getTranslateY();
                sheet.style.transition = 'none';
            }, { passive: true });

            sheet.addEventListener('touchmove', e => {
                if (!isDragging) return;
                const delta = e.touches[0].clientY - startY;
                const peekLimitY = sheet.offsetHeight - 120; 
                let newY = currentY + delta;

                if (newY < 0) newY = 0; 
                if (newY > peekLimitY) newY = peekLimitY; 

                sheet.style.transform = `translateY(${newY}px)`;
            }, { passive: true });

            sheet.addEventListener('touchend', e => {
                if (!isDragging) return;
                isDragging = false;
                sheet.style.transition = '';
                
                const delta = e.changedTouches[0].clientY - startY;
                
                if (delta < -40) applyState(Math.min(currentState + 1, 2), true); 
                else if (delta > 40) applyState(Math.max(currentState - 1, 0), true); 
                else applyState(currentState, true); 
            }, { passive: true });

            sheet.addEventListener('click', e => {
                const rect = sheet.getBoundingClientRect();
                if (e.clientY - rect.top <= 28) {
                    if (currentState < 2) applyState(currentState + 1, true);
                    else applyState(0, true);
                }
            });

            mapEl.addEventListener('click', () => {
                if (currentState > 0 && currentState !== 3) applyState(0, true);
            });

            document.getElementById('places-list').addEventListener('click', () => {
                if (currentState === 0) applyState(1, true);
            });
        })();

        // ===== GEOLOCATION =====
        const locateBtn = document.getElementById('locate-btn');
        let userMarker = null, userCircle = null;

        locateBtn.addEventListener('click', () => {
            if (!navigator.geolocation) { showToast('Geolocalização não suportada'); return; }
            locateBtn.classList.add('locating');
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    locateBtn.classList.remove('locating');
                    locateBtn.classList.add('located');
                    const { latitude: lat, longitude: lon, accuracy: acc } = pos.coords;
                    if (userMarker) { map.removeLayer(userMarker); map.removeLayer(userCircle); }
                    userCircle = L.circle([lat, lon], {
                        radius: acc, color: '#0071e3',
                        fillColor: '#0071e3', fillOpacity: 0.07, weight: 1.5
                    }).addTo(map);
                    const locIcon = L.divIcon({
                        className: '',
                        html: `<div style="width:16px;height:16px;border-radius:50%;background:#0071e3;border:3px solid white;box-shadow:0 2px 8px rgba(0,113,227,0.55);"></div>`,
                        iconSize: [16,16], iconAnchor: [8,8]
                    });
                    userMarker = L.marker([lat, lon], { icon: locIcon }).addTo(map);
                    map.flyTo([lat, lon], 16, { duration: 1.3 });
                    showToast('Você está aqui');
                },
                (err) => {
                    locateBtn.classList.remove('locating');
                    const msgs = { 1: 'Permissão negada', 2: 'Posição indisponível', 3: 'Tempo esgotado' };
                    showToast(msgs[err.code] || 'Erro ao localizar');
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
            );
        });

        // Nav hover
        document.querySelectorAll('.header-nav a').forEach(link => {
            link.addEventListener('mouseenter', () => gsap.to(link, { y: -1, duration: 0.12 }));
            link.addEventListener('mouseleave', () => gsap.to(link, { y: 0, duration: 0.12 }));
        });
    