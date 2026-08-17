# 01 — UX/UI Çalışması

## Kayra Export / Elonky — Ürün Listeleme ve Keşif Deneyimi

Bu çalışma, Kayra Export tarafından geliştirilen Elonky pazaryeri için ürün keşfi, filtreleme, üretici görünürlüğü, güven ve satın alma kararını iyileştiren bir UX/UI önerisidir.

> **Tasarım ilkesi:** Doğru ürünü, doğru üreticiden, güvenle keşfet.

## Kaynak Çerçevesi

### Case briefinden gelen zorunluluklar
- Ürün Listeleme Sayfası (PLP)
- Ürün grid yapısı
- Filtreleme sistemi
- Sıralama
- Ürün kartı
- Kategori, fiyat, renk, ölçü ve stil filtreleri
- Ürün görseli, fiyat, başlık, üretici bilgisi ve favori
- Ürün Detay Sayfası (PDP)
- Ürün görselleri, açıklama, ölçü seçimi ve sepete ekleme
- Güven unsurları
- Tasarım kararlarının açıklanması
- Frontend geliştirici için issue / handoff notları

### Kayra Export ve Elonky’den doğrulanan ürün gerçekliği
Elonky; üreticiler, küçük işletmeler, markalar ve global alıcılar arasında köprü kuran global bir pazaryeri olarak konumlanmaktadır. Kayra Export; üretim, e-ihracat, lojistik ve yazılım altyapısını birlikte yöneten bir yapı olarak Elonky’yi geliştirmektedir.

Elonky tarafında öne çıkan mevcut değer önerileri:
- Güvenli, erişilebilir ve adil alışveriş
- Hızlı teslimat
- Şeffaf fiyatlandırma
- Güvenilir süreç yönetimi
- Uygun maliyetli lojistik
- Fulfillment by Elonky
- Dünya çapında kargo
- Güvenli ödeme
- Canlı destek
- Geri ödeme güvencesi
- Kupon / promosyon kodu desteği
- Canlı stok bilgisi
- Ürün fotoğrafları, özellikleri ve yorumlar

## Ürün Kapsamı

Case senaryosu tekstil ürünleri üzerine kurulduğu için ana PLP tekstil odaklı tutulacaktır. Elonky’nin mevcut kategori yapısından yararlanılabilecek örnekler:

- Ev Tekstilleri
- Döşeme ve Halılar
- Yastık Kılıfları
- Kilim Çantalar
- Plaj Havluları
- Yatak Takımı ve Nevresim

Kayra Export’un üretim ve e-ihracat deneyiminden yararlanılabilecek örnek ürünler:

- Vintage Türk halıları ve kilimler
- Türk havluları ve peştemaller
- Battaniye ve pikeler
- Dekoratif minder ve yastıklar
- Dijital baskılı halılar
- Dekoratif duvar ürünleri

## Ana Ekranlar

1. Ürün Listeleme Sayfası — varsayılan durum
2. Ürün Listeleme — aktif filtre / arama durumu
3. Ürün Detay Sayfası — varsayılan durum
4. Ürün Detay Sayfası — varyant ve satın alma durumu

## PLP — Ürün Listeleme

### Arama
Arama yalnızca ürün adı değil; kategori ve üretici üzerinden de sonuç üretecek şekilde düşünülür.

Örnek placeholder:

**Ürün, kategori veya üretici ara**

### Filtreler

#### Case zorunlulukları
- Kategori
- Fiyat aralığı
- Renk
- Ölçü / ebat
- Stil

#### Ürün bağlamına göre eklenen filtreler
- Materyal
- Desen
- Ürün puanı
- Stokta olanlar
- Doğrulanmış üretici
- Hızlı teslimat
- Fulfillment by Elonky
- Dünya çapında gönderim

### Aktif filtre yönetimi
Seçilen filtreler sonuçların üstünde chip olarak görünür. Tek tek kaldırılabilir veya “Tümünü Temizle” aksiyonu kullanılabilir.

### Sıralama
- Önerilen
- En Yeniler
- Fiyat: Artan
- Fiyat: Azalan
- En Yüksek Puan

## Ürün Kartı

Ürün kartının amacı mümkün olduğunca hızlı taranabilir kalırken briefte özellikle vurgulanan **üretici bilgisini** satın alma kararının görünür bir parçası haline getirmektir.

### Bilgi hiyerarşisi
1. Ürün görseli
2. Favori
3. Ürün adı
4. Puan / yorum
5. Güncel fiyat ve varsa indirim
6. Üretici / mağaza
7. Doğrulanmış üretici göstergesi
8. Teslimat / fulfillment sinyali

### Örnek kart

**El Dokuması Vintage Türk Kilimi**  
★ 4,9 · 126 değerlendirme  
**$154.80**  ~~$258.00~~  · %40 indirim  
Anadolu Rug Studio ✓  
**Fulfillment by Elonky** · Dünya çapında gönderim

Kart üzerinde aynı anda çok sayıda kampanya rozeti kullanılmayacaktır. Görsel hiyerarşi sade tutulacaktır.

## Üretici Görünürlüğü

Briefte üretici bilgisinin kritik olduğu özellikle belirtildiği için üretici adı ikincil metadata olarak saklanmayacaktır.

Ürün kartında:
- Üretici / mağaza adı
- Doğrulanmış üretici göstergesi

PDP’de daha ayrıntılı:
- Üretici adı
- Üretici konumu
- Üretici / mağaza puanı
- Yanıt ve hizmet göstergeleri, veri mevcutsa
- Gönderim kapsamı
- Fulfillment by Elonky kullanımı
- Üreticinin diğer ürünleri

## PDP — Ürün Detayı

### Ürün alanı
- Fotoğraf galerisi
- Video mevcutsa video
- Ürün başlığı
- Puan ve değerlendirmeler
- Fiyat / indirim
- Renk
- Ölçü / ebat
- Miktar
- Canlı stok durumu
- Sepete Ekle
- Favorilere Ekle

### Güven ve süreç alanı
Elonky’nin gerçek değer önerileri PDP üzerinde görünür hale getirilir:

- Güvenli ödeme
- Dünya çapında kargo
- Hızlı / güvenilir teslimat
- Fulfillment by Elonky
- Geri ödeme güvencesi
- 7/24 destek
- Şeffaf fiyatlandırma

### Ödeme bilgisi
Case çalışmasında doğrulanmamış “peşin fiyatına X taksit” gibi mesajlar ana UX’e dahil edilmeyecektir.

Elonky’nin işlem rehberinde belirtilen mevcut ödeme seçenekleri gerektiğinde PDP / checkout bağlamında referans alınabilir:
- Kredi / banka kartı
- PayPal
- Apple Pay
- Google Pay
- Klarna
- Link (Stripe)

## Özgün UX Katmanları

Aşağıdakiler briefte zorunlu değildir; tasarımcı önerisi olarak ele alınır:

### Ürün karşılaştırma
Özellikle tekstil ürünlerinde fiyat, ölçü, materyal, üretici ve teslimat kriterlerini karşılaştırmayı kolaylaştırır.

### Üretici odaklı arama
Kullanıcı ürünü bildiği kadar üreticiyi de doğrudan arayabilir.

### Aktif filtre chipleri
Filtrelerin görünür ve kolay geri alınabilir olmasını sağlar.

### Durum tasarımları
- Loading / skeleton
- Sonuç bulunamadı
- Hata
- Stokta yok
- Pasif varyant
- Favoriye eklendi

## Tasarımdan Çıkarılan / İkincil Planlanan Öğeler

Aşağıdaki öğeler gerçek platform davranışı doğrulanmadan ana ekranın parçası yapılmayacaktır:

- Peşin fiyatına X taksit
- Kurumsal faturaya uygun rozeti
- Çok Al Az Öde
- Zorunlu toptan / perakende mod geçişi
- MOQ / minimum sipariş miktarı
- Numune talebi
- Teklif iste

Bu öğeler daha sonra Kayra Export tarafından ürün gereksinimi olarak doğrulanırsa ikinci faz özelliği olarak tasarlanabilir.

## Tasarım Yaklaşımı

Arayüzün hedefi Trendyol kopyası üretmek değildir. Mevcut Elonky deneyiminin ürün keşfini korurken;

- daha güçlü üretici görünürlüğü,
- daha açık güven sinyalleri,
- daha kontrollü bilgi yoğunluğu,
- daha iyi filtre yönetimi,
- global gönderim / fulfillment bilgisinin doğru yerde sunulması

üzerinden daha güçlü bir pazaryeri deneyimi önermektir.

## Frontend Handoff için Öncelikli Issue Başlıkları

1. Filtre durumu URL query parametreleri ile korunmalı
2. PDP’den PLP’ye dönüşte filtre ve scroll konumu korunmalı
3. Sıralama seçimi filtrelerden bağımsız çalışmalı
4. Stokta olmayan varyantlar görünür fakat pasif kalmalı
5. Favori aksiyonu giriş yapılmadığında kaybolmamalı
6. Ürün kartlarında uzun başlık / üretici isimleri taşma kurallarına sahip olmalı
7. Görsel alanlarında loading ve fallback state bulunmalı
8. Empty state aktif filtreleri temizleme aksiyonu sunmalı
9. Fiyat ve indirim bilgileri erişilebilir biçimde okunmalı
10. Üretici doğrulama rozeti tooltip / açıklama ile anlamlandırılmalı

## Teslimler

- Figma tasarım bağlantısı
- PLP
- Aktif filtre durumu
- Ürün kartı sistemi
- PDP
- Component / state çalışmaları
- Kısa UX karar dokümanı
- Frontend developer handoff notları
- GitHub issue listesi
- İsteğe bağlı çalışan web prototipi / Netlify yayını

## Durum

🟡 Sert revizyon uygulanıyor.
