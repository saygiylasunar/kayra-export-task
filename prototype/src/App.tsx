import { useEffect, useMemo, useState } from 'react';
import { products } from './data/products';
import { formatCurrency, translate, type TranslationKey } from './i18n';
import type { Locale, Product } from './types';

type SortMode = 'recommended' | 'popular' | 'priceAsc' | 'priceDesc' | 'rating';
type FilterArrayKey = 'category' | 'color' | 'size' | 'style';
type BooleanFilterKey = 'verified' | 'fulfillment' | 'globalShipping' | 'fastDelivery';
type Filters = Record<FilterArrayKey, string[]> & Record<BooleanFilterKey, boolean> & { priceMax: number };
type FilterOption = { value: string; label: string };
type ActiveFilter = { kind: FilterArrayKey | BooleanFilterKey | 'price'; value: string; label: string };

const MAX_PRICE = Math.ceil(Math.max(...products.map((product) => product.oldPrice ?? product.price)) / 10) * 10;
const emptyFilters: Filters = {
  category: [],
  color: [],
  size: [],
  style: [],
  priceMax: MAX_PRICE,
  verified: false,
  fulfillment: false,
  globalShipping: false,
  fastDelivery: false,
};
const logoUrl = 'https://d2ofr4p3285gck.cloudfront.net/public/logo/logo.webp';
const booleanFilterKeys: BooleanFilterKey[] = ['verified', 'fulfillment', 'globalShipping', 'fastDelivery'];
const isBooleanFilter = (kind: ActiveFilter['kind']): kind is BooleanFilterKey => booleanFilterKeys.includes(kind as BooleanFilterKey);

function App() {
  const [locale, setLocale] = useState<Locale>(() => (localStorage.getItem('elonky-locale') as Locale) || 'tr');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortMode>('recommended');
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [manifestOpen, setManifestOpen] = useState(() => sessionStorage.getItem('elonky-manifest-seen') !== '1');

  const t = (key: TranslationKey) => translate(locale, key);
  const changeLocale = (next: Locale) => {
    setLocale(next);
    localStorage.setItem('elonky-locale', next);
    document.documentElement.lang = next;
  };
  const closeManifest = () => {
    setManifestOpen(false);
    sessionStorage.setItem('elonky-manifest-seen', '1');
  };

  const categoryOptions = useMemo<FilterOption[]>(() =>
    Array.from(new Map(products.map((product) => [product.category.tr, product.category[locale]])).entries()).map(([value, label]) => ({ value, label })), [locale]);
  const colorOptions = useMemo<FilterOption[]>(() =>
    Array.from(new Map(products.map((product) => [product.color.tr, product.color[locale]])).entries()).map(([value, label]) => ({ value, label })), [locale]);
  const styleOptions = useMemo<FilterOption[]>(() =>
    Array.from(new Map(products.map((product) => [product.style.tr, product.style[locale]])).entries()).map(([value, label]) => ({ value, label })), [locale]);
  const sizeOptions = useMemo<FilterOption[]>(() =>
    [...new Set(products.flatMap((product) => product.sizes))].map((value) => ({ value, label: value })), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(locale === 'tr' ? 'tr-TR' : 'en-US');
    const list = products.filter((product) => {
      const searchable = `${product.title[locale]} ${product.category[locale]} ${product.producer}`.toLocaleLowerCase(locale === 'tr' ? 'tr-TR' : 'en-US');
      return (!q || searchable.includes(q))
        && (!filters.category.length || filters.category.includes(product.category.tr))
        && (!filters.color.length || filters.color.includes(product.color.tr))
        && (!filters.size.length || filters.size.some((size) => product.sizes.includes(size)))
        && (!filters.style.length || filters.style.includes(product.style.tr))
        && product.price <= filters.priceMax
        && (!filters.verified || product.verified)
        && (!filters.fulfillment || product.fulfillment)
        && (!filters.globalShipping || product.globalShipping)
        && (!filters.fastDelivery || product.fastDelivery);
    });

    return [...list].sort((a, b) => {
      if (sort === 'popular') return b.reviews - a.reviews;
      if (sort === 'priceAsc') return a.price - b.price;
      if (sort === 'priceDesc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return a.id - b.id;
    });
  }, [filters, locale, query, sort]);

  const labelFor = (options: FilterOption[], value: string) => options.find((option) => option.value === value)?.label ?? value;
  const activeFilters: ActiveFilter[] = [
    ...filters.category.map((value) => ({ kind: 'category' as const, value, label: labelFor(categoryOptions, value) })),
    ...filters.color.map((value) => ({ kind: 'color' as const, value, label: labelFor(colorOptions, value) })),
    ...filters.size.map((value) => ({ kind: 'size' as const, value, label: value })),
    ...filters.style.map((value) => ({ kind: 'style' as const, value, label: labelFor(styleOptions, value) })),
    ...(filters.priceMax < MAX_PRICE ? [{ kind: 'price' as const, value: String(filters.priceMax), label: `${t('priceUpTo')} ${formatCurrency(locale, filters.priceMax)}` }] : []),
    ...(filters.verified ? [{ kind: 'verified' as const, value: 'true', label: t('verified') }] : []),
    ...(filters.fulfillment ? [{ kind: 'fulfillment' as const, value: 'true', label: t('fulfillment') }] : []),
    ...(filters.globalShipping ? [{ kind: 'globalShipping' as const, value: 'true', label: t('globalShipping') }] : []),
    ...(filters.fastDelivery ? [{ kind: 'fastDelivery' as const, value: 'true', label: t('fastDelivery') }] : []),
  ];

  const toggleArrayFilter = (key: FilterArrayKey, value: string) => setFilters((prev) => ({
    ...prev,
    [key]: prev[key].includes(value) ? prev[key].filter((item) => item !== value) : [...prev[key], value],
  }));
  const removeActiveFilter = (entry: ActiveFilter) => setFilters((prev) => {
    if (entry.kind === 'price') return { ...prev, priceMax: MAX_PRICE };
    if (isBooleanFilter(entry.kind)) return { ...prev, [entry.kind]: false };
    return { ...prev, [entry.kind]: prev[entry.kind].filter((item) => item !== entry.value) };
  });

  const listing = (
    <div className="app-shell">
      <Header locale={locale} query={query} favorites={favorites.length} cartCount={cartCount} onLocale={changeLocale} onQuery={setQuery} t={t} />
      <main>
        <section className="hero page-width">
          <div>
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1>{t('heroTitle')}</h1>
            <p>{t('heroBody')}</p>
          </div>
          <div className="hero-trust" aria-label="Marketplace trust signals">
            <span>🌍 {t('trustShipping')}</span><span>🔒 {t('trustPayment')}</span><span>◉ {t('trustSupport')}</span>
          </div>
        </section>

        <section className="catalog page-width">
          <div className="catalog-toolbar">
            <div><span className="muted">{t('home')} / {t('textiles')}</span><h2>{t('textiles')}</h2><strong>{filtered.length} {t('results')}</strong></div>
            <div className="toolbar-actions">
              <button className="mobile-filter" onClick={() => setDrawerOpen(true)}>☰ {t('filter')}{activeFilters.length ? ` (${activeFilters.length})` : ''}</button>
              <label className="sort-control"><span>{t('sort')}</span><select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}><option value="recommended">{t('recommended')}</option><option value="popular">{t('popular')}</option><option value="priceAsc">{t('priceAsc')}</option><option value="priceDesc">{t('priceDesc')}</option><option value="rating">{t('rating')}</option></select></label>
            </div>
          </div>

          {activeFilters.length > 0 && <div className="active-filters">{activeFilters.map((entry) => <button key={`${entry.kind}:${entry.value}`} onClick={() => removeActiveFilter(entry)}>{entry.label} ×</button>)}<button className="clear-chip" onClick={() => setFilters(emptyFilters)}>{t('clearAll')}</button></div>}

          <div className="catalog-layout">
            <aside className="desktop-filters"><FilterPanel locale={locale} filters={filters} categoryOptions={categoryOptions} colorOptions={colorOptions} sizeOptions={sizeOptions} styleOptions={styleOptions} onToggleArray={toggleArrayFilter} onToggleBoolean={(key) => setFilters((prev) => ({ ...prev, [key]: !prev[key] }))} onPrice={(value) => setFilters((prev) => ({ ...prev, priceMax: value }))} onClear={() => setFilters(emptyFilters)} t={t} /></aside>
            <section className="product-area">
              {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} locale={locale} product={product} favorite={favorites.includes(product.id)} onFavorite={() => setFavorites((prev) => prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id])} onOpen={() => setSelectedProduct(product)} t={t} />)}</div> : <div className="empty-state"><div>⌕</div><h3>{t('noResults')}</h3><button onClick={() => { setFilters(emptyFilters); setQuery(''); }}>{t('reset')}</button></div>}
            </section>
          </div>
        </section>
      </main>

      {drawerOpen && <div className="drawer-backdrop" onMouseDown={() => setDrawerOpen(false)}><div className="filter-drawer" onMouseDown={(event) => event.stopPropagation()}><div className="drawer-head"><strong>{t('filters')}</strong><button onClick={() => setDrawerOpen(false)}>× <span className="sr-only">{t('close')}</span></button></div><FilterPanel locale={locale} filters={filters} categoryOptions={categoryOptions} colorOptions={colorOptions} sizeOptions={sizeOptions} styleOptions={styleOptions} onToggleArray={toggleArrayFilter} onToggleBoolean={(key) => setFilters((prev) => ({ ...prev, [key]: !prev[key] }))} onPrice={(value) => setFilters((prev) => ({ ...prev, priceMax: value }))} onClear={() => setFilters(emptyFilters)} t={t} /><button className="primary full" onClick={() => setDrawerOpen(false)}>{filtered.length} {t('results')}</button></div></div>}
    </div>
  );

  return <>
    {selectedProduct
      ? <ProductDetail locale={locale} product={selectedProduct} cartCount={cartCount} onBack={() => setSelectedProduct(null)} onAdd={() => setCartCount((count) => count + 1)} onLocale={changeLocale} t={t} />
      : listing}
    <ManifestoButton label={t('manifestOpen')} onClick={() => setManifestOpen(true)} />
    <CaseManifesto open={manifestOpen} onClose={closeManifest} t={t} />
  </>;
}

function Header({ locale, query, favorites, cartCount, onLocale, onQuery, t }: { locale: Locale; query: string; favorites: number; cartCount: number; onLocale: (locale: Locale) => void; onQuery: (query: string) => void; t: (key: TranslationKey) => string }) {
  return <><div className="top-strip"><div className="page-width"><span>{t('brandTagline')}</span><a href="https://elonky.com/tr/seller" target="_blank" rel="noreferrer">{t('sell')} ↗</a></div></div><header className="site-header"><div className="header-inner page-width"><a className="brand" href="#" aria-label="Elonky"><img src={logoUrl} alt="Elonky" /><span>ELONKY</span></a><div className="header-search"><span>⌕</span><input value={query} onChange={(event) => onQuery(event.target.value)} placeholder={t('searchPlaceholder')} /></div><nav className="header-actions"><div className="locale-switch" aria-label="Language"><button className={locale === 'tr' ? 'active' : ''} onClick={() => onLocale('tr')}>TR</button><button className={locale === 'en' ? 'active' : ''} onClick={() => onLocale('en')}>EN</button></div><button className="icon-action" title={t('favorites')}>♡ <b>{favorites}</b></button><button className="icon-action" title={t('cart')}>▣ <b>{cartCount}</b></button></nav></div><div className="mobile-search page-width"><span>⌕</span><input value={query} onChange={(event) => onQuery(event.target.value)} placeholder={t('searchPlaceholder')} /></div></header></>;
}

function FilterPanel({ locale, filters, categoryOptions, colorOptions, sizeOptions, styleOptions, onToggleArray, onToggleBoolean, onPrice, onClear, t }: { locale: Locale; filters: Filters; categoryOptions: FilterOption[]; colorOptions: FilterOption[]; sizeOptions: FilterOption[]; styleOptions: FilterOption[]; onToggleArray: (key: FilterArrayKey, value: string) => void; onToggleBoolean: (key: BooleanFilterKey) => void; onPrice: (value: number) => void; onClear: () => void; t: (key: TranslationKey) => string }) {
  const group = (title: string, key: FilterArrayKey, values: FilterOption[]) => <div className="filter-group"><h3>{title}</h3>{values.map((option) => <label key={option.value}><input type="checkbox" checked={filters[key].includes(option.value)} onChange={() => onToggleArray(key, option.value)} /><span>{option.label}</span></label>)}</div>;
  return <div className="filter-panel"><div className="filter-title"><strong>{t('filters')}</strong><button onClick={onClear}>{t('clearAll')}</button></div>{group(t('category'), 'category', categoryOptions)}<div className="filter-group"><h3>{t('price')}</h3><div className="price-filter-copy"><span>{formatCurrency(locale, 0)}</span><strong>{formatCurrency(locale, filters.priceMax)}</strong></div><input className="price-range" type="range" min="0" max={MAX_PRICE} step="10" value={filters.priceMax} onChange={(event) => onPrice(Number(event.target.value))} aria-label={t('price')} /></div>{group(t('color'), 'color', colorOptions)}{group(t('size'), 'size', sizeOptions)}{group(t('style'), 'style', styleOptions)}<div className="filter-group"><h3>{t('commercial')}</h3>{([['verified','verified'],['fulfillment','fulfillment'],['globalShipping','globalShipping'],['fastDelivery','fastDelivery']] as const).map(([key, label]) => <label key={key}><input type="checkbox" checked={filters[key]} onChange={() => onToggleBoolean(key)} /><span>{t(label)}</span></label>)}</div></div>;
}

function ProductCard({ locale, product, favorite, onFavorite, onOpen, t }: { locale: Locale; product: Product; favorite: boolean; onFavorite: () => void; onOpen: () => void; t: (key: TranslationKey) => string }) {
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return <article className="product-card"><div className={`product-visual pattern-${product.pattern}`}><div className="visual-badges">{discount > 0 && <span className="discount">-{discount}%</span>}{product.fulfillment && <span>{t('fulfillment')}</span>}</div><button className={`favorite ${favorite ? 'is-favorite' : ''}`} onClick={onFavorite} aria-label={t('favorites')}>{favorite ? '♥' : '♡'}</button><div className="pattern-mark">ELONKY</div></div><div className="product-copy"><span className="product-category">{product.category[locale]}</span><h3>{product.title[locale]}</h3><div className="rating">★ {product.rating.toLocaleString(locale === 'tr' ? 'tr-TR' : 'en-US')} <span>· {product.reviews} {t('reviews')}</span></div><div className="price-line"><strong>{formatCurrency(locale, product.price)}</strong>{product.oldPrice && <del>{formatCurrency(locale, product.oldPrice)}</del>}</div><div className="producer"><div><span>{t('producer')}</span><strong>{product.producer} {product.verified && '✓'}</strong></div><small>{product.producerLocation[locale]}</small></div><div className="delivery-flags">{product.globalShipping && <span>🌍 {t('globalShipping')}</span>}{product.fastDelivery && <span>⚡ {t('fastDelivery')}</span>}</div><button className="card-link" onClick={onOpen}>{t('viewProduct')} →</button></div></article>;
}

function ProductDetail({ locale, product, cartCount, onBack, onAdd, onLocale, t }: { locale: Locale; product: Product; cartCount: number; onBack: () => void; onAdd: () => void; onLocale: (locale: Locale) => void; t: (key: TranslationKey) => string }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const add = () => { onAdd(); setAdded(true); window.setTimeout(() => setAdded(false), 1200); };
  return <div className="app-shell"><Header locale={locale} query="" favorites={0} cartCount={cartCount} onLocale={onLocale} onQuery={() => {}} t={t} /><main className="page-width pdp"><button className="back-link" onClick={onBack}>← {t('back')}</button><div className="pdp-grid"><section className="pdp-gallery"><div className={`pdp-main-image pattern-${product.pattern}`}><span>ELONKY / {product.category[locale]}</span></div><div className="thumb-row"><div className={`thumb pattern-${product.pattern}`} /><div className="thumb pattern-canvas" /><div className="thumb pattern-linen" /></div></section><section className="pdp-info"><span className="product-category">{product.category[locale]}</span><h1>{product.title[locale]}</h1><div className="rating">★ {product.rating} <span>· {product.reviews} {t('reviews')}</span></div><div className="pdp-price">{formatCurrency(locale, product.price)} {product.oldPrice && <del>{formatCurrency(locale, product.oldPrice)}</del>}</div><p className="pdp-description">{product.description[locale]}</p><div className="variant-block"><strong>{t('selectSize')}</strong><div className="size-options">{product.sizes.map((option) => <button key={option} className={size === option ? 'active' : ''} onClick={() => setSize(option)}>{option}</button>)}</div></div><div className="stock">● {t('liveStock')}</div><button className="primary add-cart" onClick={add}>{added ? `✓ ${t('added')}` : t('addToCart')}</button><div className="trust-card"><div><strong>🔒 {t('securePayment')}</strong><span>{t('refund')}</span></div><div><strong>🌍 {t('shipping')}</strong><span>{product.fulfillment ? t('fulfillment') : t('fastDelivery')}</span></div><div><strong>◉ {t('support')}</strong><span>{t('producerTrust')}</span></div></div><div className="producer-card"><span>{t('producerProfile')}</span><h3>{product.producer} {product.verified && '✓'}</h3><p>{product.producerLocation[locale]} · {product.material[locale]} · {product.style[locale]}</p></div></section></div><section className="why-panel"><span className="eyebrow">UX NOTE</span><h2>{t('why')}</h2><p>{t('whyBody')}</p></section></main><div className="mobile-sticky-cta"><div><small>{product.title[locale]}</small><strong>{formatCurrency(locale, product.price)}</strong></div><button className="primary" onClick={add}>{t('addToCart')}</button></div></div>;
}

function ManifestoButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button className="manifest-trigger" onClick={onClick}>✦ {label}</button>;
}

function CaseManifesto({ open, onClose, t }: { open: boolean; onClose: () => void; t: (key: TranslationKey) => string }) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return <div className="manifest-backdrop" onMouseDown={onClose}><section className="manifest-modal" role="dialog" aria-modal="true" aria-labelledby="case-manifest-title" onMouseDown={(event) => event.stopPropagation()}><header className="manifest-head"><div><span className="eyebrow">{t('manifestEyebrow')}</span><h2 id="case-manifest-title">{t('manifestTitle')}</h2></div><button className="manifest-close" onClick={onClose} aria-label={t('close')}>×</button></header><p className="manifest-intro">{t('manifestIntro')}</p><div className="manifest-grid"><article><span>01</span><h3>{t('manifestProducerTitle')}</h3><p>{t('manifestProducerBody')}</p></article><article><span>02</span><h3>{t('manifestTrustTitle')}</h3><p>{t('manifestTrustBody')}</p></article><article><span>03</span><h3>{t('manifestMobileTitle')}</h3><p>{t('manifestMobileBody')}</p></article><article><span>04</span><h3>{t('manifestPrototypeTitle')}</h3><p>{t('manifestPrototypeBody')}</p></article></div><div className="manifest-process"><strong>{t('manifestProcessTitle')}</strong><p>{t('manifestProcessBody')}</p></div><p className="manifest-source-note">{t('manifestSourceNote')}</p><footer className="manifest-footer"><div><strong>Ersen FİLİZ</strong><span>Saygıyla Sunar</span></div><div className="manifest-actions"><a className="manifest-primary" href="https://saygiylasunar.com" target="_blank" rel="noreferrer">{t('manifestVisit')} ↗</a><button className="manifest-secondary" onClick={onClose}>{t('manifestContinue')}</button></div></footer></section></div>;
}

export default App;
