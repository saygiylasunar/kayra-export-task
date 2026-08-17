# UX/UI Task Coverage Checklist

Bu dosya, verilen UX/UI briefindeki maddelerin case içinde nerede karşılandığını hızlıca görmek için hazırlanmıştır.

| Brief maddesi | Durum | Case karşılığı |
|---|---:|---|
| Ürün Listeleme Sayfası / grid | ✅ | Responsive PLP ürün grid'i |
| Filtreleme sistemi | ✅ | Desktop sidebar + mobil bottom drawer |
| Kategori filtresi | ✅ | PLP filtreleri |
| Fiyat aralığı filtresi | ✅ | Range kontrolü + aktif filtre chip'i |
| Renk filtresi | ✅ | PLP filtreleri |
| Ölçü / ebat filtresi | ✅ | Ürün varyantlarından türetilen PLP filtresi |
| Stil filtresi | ✅ | PLP filtreleri |
| Fiyata göre sıralama | ✅ | Artan / azalan |
| Popülerliğe göre sıralama | ✅ | Değerlendirme hacmine göre `En popüler` prototip sıralaması |
| Ürün kartı görseli | ✅ | Resmî Elonky CDN medya referansları + fallback |
| Ürün kartı fiyatı | ✅ | Locale-aware USD formatı + eski fiyat |
| Ürün kartı başlığı | ✅ | İki satırlı responsive hiyerarşi |
| Üretici bilgisi | ✅ | Kartta ve PDP'de görünür üretici alanı |
| Favori / wishlist | ✅ | Etkileşimli favori state'i |
| PDP ürün görselleri | ✅ | Ana galeri + thumbnail yapısı |
| PDP açıklama | ✅ | TR / EN ürün açıklaması |
| PDP ölçü seçimi | ✅ | Etkileşimli varyant seçimi |
| Sepete ekleme | ✅ | Desktop CTA + mobil sticky CTA |
| Güven unsurları | ✅ | Ödeme, iade, kargo, destek, fulfillment ve üretici bağlamı |
| Tasarım düşüncesinin açıklanması | ✅ | README, analiz dokümanı ve çalışan Case Manifestosu pop-up'ı |
| Frontend issue listesi | ✅ | GitHub Issues FE-01 → FE-08 |
| Responsive / mobile-first düşünce | ✅ | 360–430 px mobil davranış + drawer + iki kolon grid |
| TR / EN global ürün düşüncesi | ✅ | Locale dosyaları + preference persistence |
| Figma linki | 🟡 | Çalışma dosyası mevcut; final görsel revizyon sonrası teslim linki sabitlenecek |
| Kısa açıklama dokümanı | 🟡 | Repo dokümantasyonu hazır; final teslimde kısa PDF/Notion özeti bağlanabilir |

## Kapsam notu

Briefin işlevsel UX gereksinimleri prototipte karşılanmıştır. Kalan işler yeni özellik eklemekten çok **final teslim paketleme** işidir: Figma'nın final revizyonu, kısa sunum dokümanının son biçimi ve canlı demo linkinin başvuru paketine bağlanması.

> Prototipteki `Doğrulanmış üretici`, bazı üretici adları ve örnek ürün verileri case hipotezi / prototip verisidir; Elonky'nin mevcut üretim verisi olarak sunulmaz.
