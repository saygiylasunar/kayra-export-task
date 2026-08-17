# Frontend Handoff

## Amaç
Figma ve çalışan prototip arasında aynı davranış modelini korumak.

## Responsive hedefleri
| Aralık | Davranış |
|---|---|
| 360–430 px | Mobile-first, 2 kolon ürün grid, filtre drawer, sticky PDP CTA |
| 768–1024 px | Tablet, 2–3 kolon grid, sıkıştırılmış navigasyon |
| 1280–1440+ px | Desktop, sol filtre paneli + 3 kolon grid |

## i18n
```text
src/locales/
├── tr.json
└── en.json
```

- UI stringleri component içine hard-code edilmemeli.
- Seçilen locale `localStorage` içinde korunur.
- Dil değişimi mevcut view / filtre / arama durumunu sıfırlamaz.
- Fiyat, sayı ve tarih biçimlendirmesi `Intl` üzerinden locale-aware olmalıdır.

## PLP davranışı
- Arama: ürün + kategori + üretici.
- Desktop: kalıcı filtre sidebar.
- Mobile: filtreler modal drawer.
- Aktif filtreler chip olarak kaldırılabilir.
- `Tümünü Temizle` tüm filtre state'ini sıfırlar.
- Sıralama filtrelerden bağımsızdır.

## PDP davranışı
- Varyant seçimi görünürdür.
- Ana CTA `Sepete Ekle` / `Add to cart` olarak korunur.
- Mobilde CTA sticky bottom action'a dönüşür.
- Üretici ve güven bilgileri ayrı karar katmanlarıdır.

## Uygulama notları
1. URL query parametrelerine filtre state senkronizasyonu ikinci iterasyonda eklenebilir.
2. PDP → PLP dönüşünde scroll pozisyonu korunmalıdır.
3. Ürün başlığı iki satır line-clamp kullanır.
4. Kritik aksiyonlar hover'a bağımlı değildir.
5. Touch hedefleri mobilde minimum 44 px hedeflenir.
6. Loading, empty ve error state'leri üretim sürümünde ayrıca componentleştirilmelidir.
