# 01 — UX/UI Çalışması

## Kayra Export / Elonky — Ürün Listeleme & Keşif Deneyimi

Bu çalışma, üreticiler ile alıcıları buluşturan global bir pazaryeri için ürün keşfi, karşılaştırma, güven ve satın alma deneyimini ele almaktadır.

## Amaç

Kullanıcının tekstil ve ev dekorasyonu ürünlerini hızlıca keşfedebildiği, filtreleyebildiği, karşılaştırabildiği; ürünü kadar üreticiyi de değerlendirebildiği ve perakende ya da toptan satın alma sürecine güvenle ilerleyebildiği bir deneyim tasarlamak.

> **Tasarım ilkesi:** Ürünü değil, doğru ürünü doğru üreticiden bul.

## Ana Ekranlar

1. Ürün Listeleme Sayfası (PLP)
2. PLP — Aktif filtreler / arama durumu
3. Ürün Detay Sayfası (PDP)
4. PDP — Seçili varyant / satın alma durumu

## Özgün UX Katmanları

- Ürün, kategori veya üretici bazlı arama ve otomatik öneriler
- Aktif filtre çipleri ve tek tıkla filtre temizleme
- Toptan / perakende satın alma sinyalleri
- Minimum sipariş miktarı (MOQ)
- Çok Al Az Öde / miktar bazlı fiyat kırılımı
- Videolu Ürün etiketi ve video destekli medya galerisi
- Hızlı Teslimat / Kargo Bedava gibi lojistik sinyalleri
- Kurumsal Faturaya Uygun etiketi
- Kampanya / indirim / kupon bilgileri
- Örnek taksit bilgisi — ödeme altyapısı doğrulanmadığı için prototip verisi olarak
- Doğrulanmış üretici, üretici profili ve güven sinyalleri
- Ürün karşılaştırma
- Favorilere ekleme
- Numune talep etme
- Teklif isteme
- Stok ve varyant durumu
- Fotoğraflı / videolu değerlendirmeler
- Güvenli ödeme / sipariş koruması / iade güvencesi
- Empty, loading, error ve disabled varyant durumları

## Kayra Export Ürün Gamından Örnek Kategoriler

- Vintage Türk halıları ve kilimler
- Türk havluları ve peştemaller
- Battaniye ve pikeler
- Dekoratif minder ve yastıklar
- Dijital baskılı halılar
- Dekoratif duvar ürünleri / kanvas
- Şark köşesi ve tamamlayıcı ev dekorasyonu ürünleri

## Ürün Listeleme Sayfası — PLP

### Ürün Kartı Bilgi Hiyerarşisi

Kart mümkün olduğunca hızlı taranabilir tutulurken aşağıdaki bilgiler önceliklendirilir:

- Ürün görseli
- Videolu ürün göstergesi
- Ürün adı
- Puan ve yorum sayısı
- Güncel fiyat / önceki fiyat / indirim oranı
- Kampanya veya taksit bilgisi
- Üretici / mağaza bilgisi
- Doğrulanmış üretici rozeti
- Minimum sipariş veya çoklu alım avantajı
- Hızlı teslimat / ücretsiz kargo
- Favori
- Karşılaştır

### Filtreler

- Kategori
- Fiyat aralığı
- Renk
- Ölçü / ebat
- Materyal
- Desen
- Stil
- Ürün puanı
- Fotoğraflı yorumlar
- Videolu ürünler
- Çok Al Az Öde
- Toptan satış
- Kurumsal faturaya uygun
- Hızlı teslimat
- Ücretsiz kargo
- Doğrulanmış üreticiler
- Numune mevcut

## Ürün Detay Sayfası — PDP

- Ürün fotoğraf / video galerisi
- Ürün açıklaması
- Renk, ölçü, ebat ve kategoriye özel varyantlar
- Miktar seçimi
- Miktar arttıkça fiyat avantajı
- Sepete Ekle
- Teklif İste
- Numune Talep Et
- Favorilere Ekle
- Üretici profili
- Güven ve alıcı koruması
- Teslimat ve hazırlık süresi
- Minimum sipariş miktarı
- Kurumsal fatura bilgisi
- Yorumlar / fotoğraflı ve videolu değerlendirmeler
- Benzer ürünler
- Aynı üreticiden diğer ürünler

## Ödeme / Kampanya Sunumu

Arayüzde Trendyol benzeri hızlı karar sinyalleri kullanılabilir:

- `%30 İndirim`
- `Sepette %10 İndirim`
- `Çok Al Az Öde`
- `Kargo Bedava`
- `Hızlı Teslimat`
- `Kurumsal Faturaya Uygun`
- `Videolu Ürün`
- `Toptan Satış`
- `Peşin Fiyatına 3 Taksit` gibi örnek ödeme mesajları

Taksit ve ödeme mesajları gerçek bir finansal entegrasyon doğrulanmadıkça yalnızca case/prototip verisi olarak kullanılacaktır.

## Tasarım Yaklaşımı

Arayüz, klasik B2C pazaryerlerinin hızlı taranabilirliğini; üretici güveni, toptan ticaret, global teslimat, numune ve teklif süreçleriyle birleştirmeyi amaçlar.

Çalışma yalnızca görsel arayüz üretimine değil; bilgi mimarisi, kullanıcı kararları, güven oluşturma, üretici-alıcı ilişkisi ve geliştiriciye aktarılabilir tasarım kararlarına odaklanacaktır.

## Teslimler

- Figma tasarım bağlantısı
- PLP ekranı
- Aktif filtre durumu
- Ürün kartı sistemi
- PDP ekranı
- Component / state çalışmaları
- Kısa UX karar dokümanı
- Frontend developer handoff notları
- GitHub issue listesi
- İsteğe bağlı çalışan web prototipi — Netlify üzerinden yayınlanabilir

## Durum

🟡 Çalışma devam ediyor.
