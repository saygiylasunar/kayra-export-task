# Kayra Export — UX/UI & Grafik Tasarım Case

> ## İnsan liderliğinde, yapay zekâ destekli çalışma
> Bu repository, **Ersen FİLİZ tarafından yönlendirilen ve nihai kararları Ersen tarafından verilen** bir case çalışmasıdır. ChatGPT; araştırma, alternatif üretme, edge-case analizi, dokümantasyon ve teknik handoff aşamalarında yardımcı araç olarak kullanılmıştır.

| Çalışma alanı | Ersen | ChatGPT |
|---|---|---|
| Ürün yönü | **Ana karar verici** | Brief analizi, alternatif ve risk üretimi |
| UX/UI | Akış, hiyerarşi, marka uyumu ve final seçim | IA, state, responsive ve erişilebilirlik kontrolü |
| Kurumsal kimlik | Nihai görsel yön | Tutarlılık ve design-system analizi |
| TR / EN i18n | Ürün gereksinimi ve final kapsam | Locale mimarisi ve edge-case dokümantasyonu |
| Responsive / mobil | Final davranış ve öncelikler | Breakpoint, drawer, sticky CTA önerileri |
| Frontend | Uygulama öncelikleri | Prototipleme, issue ve handoff desteği |
| Nihai onay | **Ersen** | İkinci göz |

## Çalışmalar

- [01 — UX/UI Çalışması](./01%20-%20UX%20UI%20%C3%87al%C4%B1%C5%9Fmas%C4%B1/README.md)
- [Task Coverage Checklist](./01%20-%20UX%20UI%20%C3%87al%C4%B1%C5%9Fmas%C4%B1/TASK-CHECKLIST.md)
- [Analiz ve Raporlar](./01%20-%20UX%20UI%20%C3%87al%C4%B1%C5%9Fmas%C4%B1/ANALIZ-VE-RAPORLAR.md)
- [Frontend Handoff](./01%20-%20UX%20UI%20%C3%87al%C4%B1%C5%9Fmas%C4%B1/FRONTEND-HANDOFF.md)
- [02 — Grafik Tasarım Çalışması](./02%20-%20Grafik%20Tasar%C4%B1m%20%C3%87al%C4%B1%C5%9Fmas%C4%B1/README.md)
- [`prototype/` — çalışan responsive TR/EN arayüz](./prototype)

## Çalışan Prototip

Prototip, Figma tesliminin yerine geçmez; UX kararlarını gerçek tarayıcı davranışıyla doğrulamak için hazırlanmıştır.

### Özellikler
- React + TypeScript + Vite
- TR / EN i18n ve dil tercihinin korunması
- Mobile-first responsive PLP / PDP
- Mobil filtre drawer'ı
- Kategori, fiyat aralığı, renk, ölçü / ebat ve stil filtreleri
- Aktif filtre chipleri
- Fiyat / popülerlik / puan sıralaması
- Favori durumu
- Ürün / kategori / üretici araması
- Üretici görünürlüğü
- Elonky güven / fulfillment sinyalleri
- Locale-aware para biçimlendirme
- Resmî Elonky CDN görselleri ile canlı katalog hissi
- İlk açılışta case kararlarını anlatan, tekrar açılabilir **Case Manifestosu**
- Manifesto içinden `https://saygiylasunar.com` portföy yönlendirmesi

### Harici medya yaklaşımı

Prototipte kullanılan katalog görsellerinin bir bölümü **Elonky'nin kendi ürün sayfalarından ve CloudFront CDN'inden doğrudan yüklenir**. Bu tercih repository'yi gereksiz binary asset'lerle büyütmemek ve canlı marketplace hissini korumak için yapılmıştır.

- Harici görsel referansları `prototype/src/media.css` içinde ayrı tutulur.
- CDN görselleri prototip / case bağlamında görsel referans olarak kullanılır.
- Case içinde üretilmiş ürün metinleri veya UX hipotezleri, kaynak belirtilmedikçe Elonky'nin mevcut üretim verisi olarak sunulmaz.
- Harici medya yüklenemezse bile UI yüzey rengi / mevcut component yapısı kullanılabilir kalır.
- Nihai üretim ortamında hotlink yerine izinli asset pipeline / CDN yönetimi tercih edilmelidir.

### Yerelde çalıştırma
```bash
cd prototype
npm install
npm run dev
```

### Build
```bash
cd prototype
npm run build
```

Netlify yapılandırması repository kökündeki `netlify.toml` dosyasındadır.

## Kaynaklar

- Elonky: https://elonky.com/tr
- Kayra Export: https://kayraexport.com
- Portföy: https://saygiylasunar.com

> Marka renkleri için kaynak dosya / brand guideline sağlanmadığı sürece prototipteki renk paleti **kurumsal yorum** olarak değerlendirilir; resmi brand tokenı olarak sunulmaz.
