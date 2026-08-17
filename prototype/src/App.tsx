import { useMemo, useState } from 'react';
import { products } from './data/products';
import { formatCurrency, translate, type TranslationKey } from './i18n';
import type { Locale, Product } from './types';

type SortMode = 'recommended' | 'priceAsc' | 'priceDesc' | 'rating';
type Filters = { category: string[]; color: string[]; style: string[]; verified: boolean; fulfillment: boolean; globalShipping: boolean; fastDelivery: boolean };

const emptyFilters: Filters = { category: [], color: [], style: [], verified: false, fulfillment: false, globalShipping: false, fastDelivery: false };
const logoUrl = 'https://d2ofr4p3285gck.cloudfront.net/public/logo/logo.webp';

function App() {
  const [locale, setLocale] = useState<Locale>(() => (localStorage.getItem('elonky-locale') as Locale) || 'tr');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortMode>('recommended');
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const t = (key: TranslationKey) => translate(locale, key);
  const changeLocale = (next: Locale) => { setLocale(next); localStorage.setItem('elonky-locale', next); document.documentElement.lang = next; };

  const categoryOptions = useMemo(() => [...new Set(products.map((p) => p.category[locale]))], [locale]);
  const colorOptions = useMemo(() => [...new Set(products.map((p) => p.color[locale]))], [locale]);
  const styleOptions = useMemo(() => [...new Set(products.map((p) => p.style[locale]))], [locale]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(locale === 'tr' ? 'tr-TR' : 'en-US');
    const list = products.filter((p) => {
      const searchable = `${p.title[locale]} ${p.category[locale]} ${p.producer}`.toLocaleLowerCase(locale === 'tr' ? 'tr-TR' : 'en-US');
      return (!q || searchable.includes(q))
        && (!filters.category.length || filters.category.includes(p.category[locale]))
        && (!filters.color.length || filters.color.includes(p.color[locale]))
        && (!filters.style.length || filters.style.includes(p.style[locale]))
        && (!filters.verified || p.verified)
        && (!filters.fulfillment || p.fulfillment)
        && (!filters.globalShipping || p.globalShipping)
        && (!filters.fastDelivery || p.fastDelivery);
    });
    return [...list].sort((a, b) => sort === 'priceAsc' ? a.price - b.price : sort === 'priceDesc' ? b.price - a.price : sort === 'rating' ? b.rating - a.rating : a.id - b.id);
  }, [filters, locale, query, sort]);

  const activeFilterLabels = [
    ...filters.category,
    ...filters.color,
    ...filters.style,
    ...(filters.verified ? [t('verified')] : []),
    ...(filters.fulfillment ? [t('fulfillment')] : []),
    ...(filters.globalShipping ? [t('globalShipping')] : []),
    ...(filters.fastDelivery ? [t('fastDelivery')] : []),
  ];

  const toggleArrayFilter = (key: 'category' | 'color' | 'style', value: string) => setFilters((prev) => ({ ...prev, [key]: prev[key].includes(value) ? prev[key].filter((x) => x !== value) : [...prev[key], value] }));
  const removeChip = (value: string) => setFilters((prev) => ({ ...prev, category: prev.category.filter((x) => x !== value), color: prev.color.filter((x) => x !== value), style: prev.style.filter((x) => x !== value), verified: value === t('verified') ? false : prev.verified, fulfillment: value === t('fulfillment') ? false : prev.fulfillment, globalShipping: value === t('globalShipping') ? false : prev.globalShipping, fastDelivery: value === t('fastDelivery') ? false : prev.fastDelivery }));

  if (selectedProduct) return <ProductDetail locale={locale} product={selectedProduct} cartCount={cartCount} onBack={() => setSelectedProduct(null)} onAdd={() => setCartCount((c) => c + 1)} onLocale={changeLocale} t={t} />;

  return (
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
              <button className="mobile-filter" onClick={() => setDrawerOpen(true)}>☰ {t('filter')}{activeFilterLabels.length ? ` (${activeFilterLabels.length})` : ''}</button>
              <label className="sort-control"><span>{t('sort')}</span><select value={sort} onChange={(e) => setSort(e.target.value as SortMode)}><option value="recommended">{t('recommended')}</option><option value="priceAsc">{t('priceAsc')}</option><option value="priceDesc">{t('priceDesc')}</option><option value="rating">{t('rating')}</option></select></label>
            </div>
          </div>

          {activeFilterLabels.length > 0 && <div className="active-filters">{activeFilterLabels.map((label) => <button key={label} onClick={() => removeChip(label)}>{label} ×</button>)}<button className="clear-chip" onClick={() => setFilters(emptyFilters)}>{t('clearAll')}</button></div>}

          <div className="catalog-layout">
            <aside className="desktop-filters"><FilterPanel locale={locale} filters={filters} categoryOptions={categoryOptions} colorOptions={colorOptions} styleOptions={styleOptions} onToggleArray={toggleArrayFilter} onToggleBoolean={(key) => setFilters((p) => ({ ...p, [key]: !p[key] }))} onClear={() => setFilters(emptyFilters)} t={t} /></aside>
            <section className="product-area">
              {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} locale={locale} product={product} favorite={favorites.includes(product.id)} onFavorite={() => setFavorites((prev) => prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id])} onOpen={() => setSelectedProduct(product)} t={t} />)}</div> : <div className="empty-state"><div>⌕</div><h3>{t('noResults')}</h3><button onClick={() => { setFilters(emptyFilters); setQuery(''); }}>{t('reset')}</button></div>}
            </section>
          </div>
        </section>
      </main>

      {drawerOpen && <div className="drawer-backdrop" onMouseDown={() => setDrawerOpen(false)}><div className="filter-drawer" onMouseDown={(e) => e.stopPropagation()}><div className="drawer-head"><strong>{t('filters')}</strong><button onClick={() => setDrawerOpen(false)}>× <span className="sr-only">{t('close')}</span></button></div><FilterPanel locale={locale} filters={filters} categoryOptions={categoryOptions} colorOptions={colorOptions} styleOptions={styleOptions} onToggleArray={toggleArrayFilter} onToggleBoolean={(key) => setFilters((p) => ({ ...p, [key]: !p[key] }))} onClear={() => setFilters(emptyFilters)} t={t} /><button className="primary full" onClick={() => setDrawerOpen(false)}>{filtered.length} {t('results')}</button></div></div>}
    </div>
  );
}

function Header({ locale, query, favorites, cartCount, onLocale, onQuery, t }: { locale: Locale; query: string; favorites: number; cartCount: number; onLocale: (l: Locale) => void; onQuery: (q: string) => void; t: (k: TranslationKey) => string }) {
  return <><div className="top-strip"><div className="page-width"><span>{t('brandTagline')}</span><a href="https://elonky.com/tr/seller" target="_blank" rel="noreferrer">{t('sell')} ↗</a></div></div><header className="site-header"><div className="header-inner page-width"><a className="brand" href="#" aria-label="Elonky"><img src={logoUrl} alt="Elonky" /><span>ELONKY</span></a><div className="header-search"><span>⌕</span><input value={query} onChange={(e) => onQuery(e.target.value)} placeholder={t('searchPlaceholder')} /></div><nav className="header-actions"><div className="locale-switch" aria-label="Language"><button className={locale === 'tr' ? 'active' : ''} onClick={() => onLocale('tr')}>TR</button><button className={locale === 'en' ? 'active' : ''} onClick={() => onLocale('en')}>EN</button></div><button className="icon-action" title={t('favorites')}>♡ <b>{favorites}</b></button><button className="icon-action" title={t('cart')}>▣ <b>{cartCount}</b></button></nav></div><div className="mobile-search page-width"><span>⌕</span><input value={query} onChange={(e) => onQuery(e.target.value)} placeholder={t('searchPlaceholder')} /></div></header></>;
}

function FilterPanel({ filters, categoryOptions, colorOptions, styleOptions, onToggleArray, onToggleBoolean, onClear, t }: { locale: Locale; filters: Filters; categoryOptions: string[]; colorOptions: string[]; styleOptions: string[]; onToggleArray: (k: 'category' | 'color' | 'style', v: string) => void; onToggleBoolean: (k: 'verified' | 'fulfillment' | 'globalShipping' | 'fastDelivery') => void; onClear: () => void; t: (k: TranslationKey) => string }) {
  const group = (title: string, key: 'category' | 'color' | 'style', values: string[]) => <div className="filter-group"><h3>{title}</h3>{values.map((value) => <label key={value}><input type="checkbox" checked={filters[key].includes(value)} onChange={() => onToggleArray(key, value)} /><span>{value}</span></label>)}</div>;
  return <div className="filter-panel"><div className="filter-title"><strong>{t('filters')}</strong><button onClick={onClear}>{t('clearAll')}</button></div>{group(t('category'), 'category', categoryOptions)}{group(t('color'), 'color', colorOptions)}{group(t('style'), 'style', styleOptions)}<div className="filter-group"><h3>{t('commercial')}</h3>{([['verified','verified'],['fulfillment','fulfillment'],['globalShipping','globalShipping'],['fastDelivery','fastDelivery']] as const).map(([key, label]) => <label key={key}><input type="checkbox" checked={filters[key]} onChange={() => onToggleBoolean(key)} /><span>{t(label)}</span></label>)}</div></div>;
}

function ProductCard({ locale, product, favorite, onFavorite, onOpen, t }: { locale: Locale; product: Product; favorite: boolean; onFavorite: () => void; onOpen: () => void; t: (k: TranslationKey) => string }) {
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return <article className="product-card"><div className={`product-visual pattern-${product.pattern}`}><div className="visual-badges">{discount > 0 && <span className="discount">-{discount}%</span>}{product.fulfillment && <span>{t('fulfillment')}</span>}</div><button className={`favorite ${favorite ? 'is-favorite' : ''}`} onClick={onFavorite} aria-label={t('favorites')}>{favorite ? '♥' : '♡'}</button><div className="pattern-mark">ELONKY</div></div><div className="product-copy"><span className="product-category">{product.category[locale]}</span><h3>{product.title[locale]}</h3><div className="rating">★ {product.rating.toLocaleString(locale === 'tr' ? 'tr-TR' : 'en-US')} <span>· {product.reviews} {t('reviews')}</span></div><div className="price-line"><strong>{formatCurrency(locale, product.price)}</strong>{product.oldPrice && <del>{formatCurrency(locale, product.oldPrice)}</del>}</div><div className="producer"><div><span>{t('producer')}</span><strong>{product.producer} {product.verified && '✓'}</strong></div><small>{product.producerLocation[locale]}</small></div><div className="delivery-flags">{product.globalShipping && <span>🌍 {t('globalShipping')}</span>}{product.fastDelivery && <span>⚡ {t('fastDelivery')}</span>}</div><button className="card-link" onClick={onOpen}>{t('viewProduct')} →</button></div></article>;
}

function ProductDetail({ locale, product, cartCount, onBack, onAdd, onLocale, t }: { locale: Locale; product: Product; cartCount: number; onBack: () => void; onAdd: () => void; onLocale: (l: Locale) => void; t: (k: TranslationKey) => string }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const add = () => { onAdd(); setAdded(true); window.setTimeout(() => setAdded(false), 1200); };
  return <div className="app-shell"><Header locale={locale} query="" favorites={0} cartCount={cartCount} onLocale={onLocale} onQuery={() => {}} t={t} /><main className="page-width pdp"><button className="back-link" onClick={onBack}>← {t('back')}</button><div className="pdp-grid"><section className="pdp-gallery"><div className={`pdp-main-image pattern-${product.pattern}`}><span>ELONKY / {product.category[locale]}</span></div><div className="thumb-row"><div className={`thumb pattern-${product.pattern}`} /><div className="thumb pattern-canvas" /><div className="thumb pattern-linen" /></div></section><section className="pdp-info"><span className="product-category">{product.category[locale]}</span><h1>{product.title[locale]}</h1><div className="rating">★ {product.rating} <span>· {product.reviews} {t('reviews')}</span></div><div className="pdp-price">{formatCurrency(locale, product.price)} {product.oldPrice && <del>{formatCurrency(locale, product.oldPrice)}</del>}</div><p className="pdp-description">{product.description[locale]}</p><div className="variant-block"><strong>{t('selectSize')}</strong><div className="size-options">{product.sizes.map((s) => <button key={s} className={size === s ? 'active' : ''} onClick={() => setSize(s)}>{s}</button>)}</div></div><div className="stock">● {t('liveStock')}</div><button className="primary add-cart" onClick={add}>{added ? `✓ ${t('added')}` : t('addToCart')}</button><div className="trust-card"><div><strong>🔒 {t('securePayment')}</strong><span>{t('refund')}</span></div><div><strong>🌍 {t('shipping')}</strong><span>{product.fulfillment ? t('fulfillment') : t('fastDelivery')}</span></div><div><strong>◉ {t('support')}</strong><span>{t('producerTrust')}</span></div></div><div className="producer-card"><span>{t('producerProfile')}</span><h3>{product.producer} {product.verified && '✓'}</h3><p>{product.producerLocation[locale]} · {product.material[locale]} · {product.style[locale]}</p></div></section></div><section className="why-panel"><span className="eyebrow">UX NOTE</span><h2>{t('why')}</h2><p>{t('whyBody')}</p></section></main><div className="mobile-sticky-cta"><div><small>{product.title[locale]}</small><strong>{formatCurrency(locale, product.price)}</strong></div><button className="primary" onClick={add}>{t('addToCart')}</button></div></div>;
}

export default App;
