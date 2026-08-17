# 01 — UX/UI Çalışması

## Kayra Export / Elonky — Ürün Listeleme ve Keşif Deneyimi

> ### İnsan liderliğinde, yapay zekâ destekli tasarım süreci
> Bu case, **Ersen tarafından yönlendirilen ve nihai kararları Ersen tarafından verilen** bir UX/UI çalışmasıdır. ChatGPT; araştırma, karşılaştırmalı analiz, alternatif üretme, dokümantasyon ve teknik handoff aşamalarında yardımcı tasarım / analiz aracı olarak kullanılmıştır.
>
> Amaç yapay zekâya tasarım yaptırmak değil; **tasarımcının karar kalitesini, araştırma hızını ve edge-case kapsamını artırmak** için onu görünür ve denetlenebilir bir araç olarak kullanmaktır.

### Çalışma ve analiz sahipliği

| Alan | Ersen | ChatGPT |
|---|---|---|
| Ürün yönü | **Ana karar verici** — kapsamı, öncelikleri ve nihai yönü belirler | Briefi analiz eder, alternatifler ve riskler çıkarır |
| UX kararları | Önerileri seçer, değiştirir veya reddeder | Akış, bilgi mimarisi, filtre, güven ve state alternatifleri üretir |
| UI / kurumsal kimlik | Görsel yön, marka uyumu ve final hiyerarşiyi belirler | Component, responsive ve tutarlılık analizi sunar |
| TR / EN i18n | Çok dilli yapıyı ürün gereksinimi olarak belirler | Locale yapısı, persistence ve metin davranışlarını dokümante eder |
| Responsive / mobil | Mobile-first yaklaşımın final kapsamını belirler | Breakpoint, drawer, sticky CTA ve responsive grid önerileri üretir |
| Frontend handoff | Uygulama önceliklerini ve final kapsamı belirler | Issue listesi, state yönetimi ve teknik edge-case notları hazırlar |
| Nihai onay | **Ersen** | İkinci göz / eleştirel kontrol |

> **Detaylı katkı matrisi ve analiz sahipliği:** [ANALIZ-VE-RAPORLAR.md](./ANALIZ-VE-RAPORLAR.md)

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

## Kurumsal Kimlik ve Marka Sistemi

Tasarım yalnızca işlevsel bir marketplace şablonu olmayacaktır. Kayra Export ile Elonky arasındaki kurumsal ilişki ve mevcut marka dili korunarak yeniden yorumlanacaktır.

### Marka hiyerarşisi
- **Elonky:** kullanıcıya dönük pazaryeri markası
- **Kayra Export:** ürünün arkasındaki şirket / case bağlamı

### Kurumsal kimlikte korunacak unsurlar
- Mevcut Elonky logo kullanımı ve güvenli boşluk alanları
- Mevcut marka renkleri ve bunlardan türetilen nötr / yüzey / durum renkleri
- Tipografi karakteri ve okunabilirlik
- İkonografi yaklaşımı
- Buton, input, chip, badge ve card gibi temel UI bileşenlerinde ortak görsel dil
- Global pazaryeri kimliğini destekleyen sade ve güven veren iletişim tonu

Kurumsal kimlik, erişilebilirlik ve kullanılabilirliğin önüne geçmeyecek; marka rengi özellikle CTA, aktif durum, link ve güven sinyallerinde kontrollü kullanılacaktır.

## Çok Dilli Deneyim — i18n / TR-EN

Çalışma yalnızca Türkçe statik mockup olarak ele alınmayacaktır. Arayüz başlangıçtan itibaren **TR / EN çok dilli kullanım** düşünülerek tasarlanacaktır.

### Frontend yaklaşımı
- `src/locales/` altında locale dosyaları
- `tr.json`
- `en.json`
- UI metinlerinin hard-coded tutulmaması
- Dil tercihi uygulama genelinde korunmalı
- Dil değişiminde kullanıcı bulunduğu sayfayı ve aktif durumu kaybetmemeli
- Filtreler, sıralama, arama, ürün sayfası ve sepet gibi akışlar locale değişiminden etkilenmeden devam etmeli

### Dil seçici
Header üzerinde erişilebilir bir **TR / EN** dil kontrolü bulunacaktır.

Örnek davranış:
- `TR` → Türkçe
- `EN` → English / Global

Mobilde dil seçimi hesap / yardımcı menü içinde de erişilebilir kalacaktır.

### Tasarım açısından i18n kuralları
- İngilizce metinlerin Türkçeden daha uzun veya daha kısa olabileceği hesaba katılacak
- Buton ve chip genişlikları sabit metne göre değil içerik davranışına göre tasarlanacak
- Ürün başlıkları ve üretici adlarında truncation / line-clamp kuralları tanımlanacak
- Tarih, para birimi ve sayı formatları locale duyarlı ele alınacak
- `$`, `₺`, `€` gibi para birimleri ürün / pazar bağlamında formatlanabilir olacak
- Metinler Figma’da mümkün olduğunca semantic isimlerle tutulacak

## Responsive ve Mobile-First Yaklaşım

Çalışma yalnızca 1440 px masaüstü ekranından ibaret olmayacaktır. Ana component sistemi responsive davranış düşünülerek kurulacaktır.

### Hedef kırılımlar
- **Mobil:** 360–430 px
- **Tablet:** 768–1024 px
- **Desktop:** 1280–1440+ px

Figma tesliminde en az:
1. Desktop PLP
2. Mobile PLP
3. Desktop PDP
4. Mobile PDP

ana durumları gösterilecektir.

### Mobil PLP davranışı
Desktop’taki kalıcı sol filtre paneli mobilde kullanılmayacaktır.

Mobilde:
- Tek veya iki kolonlu ürün grid’i
- Sticky / erişilebilir arama alanı
- `Filtrele` butonu ile bottom sheet / drawer
- `Sırala` için ayrı sheet / menu
- Aktif filtrelerin yatay kaydırılabilir chip yapısı
- Sonuç sayısı görünür fakat ikincil hiyerarşide
- Ürün kartında yalnız kritik karar bilgileri
- Favori aksiyonu dokunma alanı en az erişilebilir boyutta

### Mobil PDP davranışı
- Görsel galeri ekran genişliğini kullanır
- Ürün bilgileri tek kolon akar
- Varyant seçimleri dokunma odaklıdır
- Ana CTA mobilde sticky bottom action olarak değerlendirilebilir
- Üretici ve güven bilgileri accordion / section yapısına dönüşebilir
- Ödeme ve teslimat metinleri kartı boğmadan progressive disclosure ile verilir

### Responsive component prensipleri
- Auto Layout
- Content-driven height
- Min / max width kuralları
- 8 pt spacing sistemi
- Grid değişimi: desktop → tablet → mobile
- Breakpoint’e göre görünürlük ve yer değiştirme kuralları
- Hover’a bağımlı kritik aksiyon bulunmaması
- Touch hedeflerinin mobilde yeterli büyüklükte olması

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
3. Ürün Listeleme — mobil
4. Ürün Detay Sayfası — varsayılan durum
5. Ürün Detay Sayfası — varyant ve satın alma durumu
6. Ürün Detay Sayfası — mobil

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

- kurumsal kimliği koruyan tutarlı bir design system,
- TR / EN i18n uyumluluğu,
- mobile-first ve responsive component davranışları,
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
11. TR / EN locale değişiminde mevcut route, filtre ve kullanıcı durumu korunmalı
12. UI metinleri `tr.json` / `en.json` üzerinden yönetilmeli; component içine hard-coded metin yazılmamalı
13. Para birimi / sayı / tarih biçimlendirmesi locale duyarlı olmalı
14. Desktop filtre paneli mobilde drawer / bottom sheet davranışına dönüşmeli
15. Mobilde sıralama ve filtreleme bağımsız aksiyonlar olarak erişilebilir olmalı
16. PDP ana CTA mobilde sticky bottom action olarak değerlendirilmelidir
17. Responsive grid ve card davranışları breakpoint bazında tanımlanmalı
18. Kritik aksiyonlar hover durumuna bağımlı olmamalı

## Teslimler

- Figma tasarım bağlantısı
- Kurumsal kimlik / UI foundations
- TR / EN dil varyantları
- Desktop PLP
- Mobile PLP
- Aktif filtre durumu
- Ürün kartı sistemi
- Desktop PDP
- Mobile PDP
- Component / state çalışmaları
- Responsive davranış notları
- i18n davranış notları
- Kısa UX karar dokümanı
- Frontend developer handoff notları
- GitHub issue listesi
- İsteğe bağlı çalışan web prototipi / Netlify yayını

## Durum

🟡 Sert revizyon uygulanıyor.
