import { Tag, MapPin, Phone, MessageCircle, Clock, ExternalLink } from "lucide-react";

interface Deal {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  store: string;
  storeColor: string;
  discount: number;
  location: string;
  distance: string;
  reference: string;
  condition: string;
  stock: string;
  isOpen: boolean;
  phone: string;
  whatsapp: string;
  productUrl: string;
  storeLogo?: string;
}

const deals: Deal[] = [
  {
    id: 1,
    name: "Arroz Gallo Dorado 5lb",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    price: 3.49,
    originalPrice: 4.99,
    store: "Super 99",
    storeColor: "bg-primary",
    discount: 30,
    location: "Vía España",
    distance: "1.2 km",
    reference: "Ref: SW-07-DIR",
    condition: "Nuevo",
    stock: "En stock",
    isOpen: true,
    phone: "+507 222-1234",
    whatsapp: "+507 6678-1234",
    productUrl: "https://super99.com/p/arroz-gallo-dorado-5lb",
    storeLogo: "/stores/super99.png"
  },
  {
    id: 2,
    name: "Aceite Ideal 1L",
    image: "https://images.unsplash.com/photo-1474979266404-7f28db3f3721?w=300&h=300&fit=crop",
    price: 2.79,
    originalPrice: 3.59,
    store: "Riba Smith",
    storeColor: "bg-primary",
    discount: 22,
    location: "MultiPlaza",
    distance: "2.5 km",
    reference: "Ref: AO-01-ORG",
    condition: "Nuevo",
    stock: "En stock",
    isOpen: true,
    phone: "+507 215-5678",
    whatsapp: "+507 6123-5678",
    productUrl: "https://ribasmith.com/p/aceite-ideal-1l",
    storeLogo: "/stores/ribasmith.png"
  },
  {
    id: 3,
    name: "Leche Nestlé 1L",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop",
    price: 1.25,
    originalPrice: 1.75,
    store: "El Machetazo",
    storeColor: "bg-primary",
    discount: 29,
    location: "Centro Comercial Los Pueblos",
    distance: "3.8 km",
    reference: "Ref: MK-12-FRE",
    condition: "Nuevo",
    stock: "En stock",
    isOpen: false,
    phone: "+507 270-9012",
    whatsapp: "+507 6456-9012",
    productUrl: "https://elmachetazo.com/p/leche-nestle-1l",
    storeLogo: "/stores/machetazo.png"
  },
  {
    id: 4,
    name: "Detergente Xedex 2kg",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop",
    price: 4.99,
    originalPrice: 6.50,
    store: "Rey",
    storeColor: "bg-primary",
    discount: 23,
    location: "Albrook Mall",
    distance: "4.1 km",
    reference: "Ref: DT-05-CLE",
    condition: "Nuevo",
    stock: "En stock",
    isOpen: true,
    phone: "+507 317-3456",
    whatsapp: "+507 6789-3456",
    productUrl: "https://rey.com/p/detergente-xedex-2kg",
    storeLogo: "/stores/rey.png"
  },
];

const FeaturedDeals = () => {
  return (
    <section className="container mx-auto px-4 py-10 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center">
            <Tag size={18} className="text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Ofertas Destacadas</h2>
        </div>
        <button className="text-sm font-medium text-primary hover:underline underline-offset-4">
          Ver todas
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {deals.map((deal, i) => (
          <div
            key={deal.id}
            className="group bg-card rounded-2xl border border-border/50 shadow-soft overflow-hidden hover:shadow-card transition-all duration-300 cursor-pointer"
            style={{ animation: `fade-in-up 0.5s ease-out ${i * 0.1}s both` }}
          >
            {/* Discount badge */}
            <div className="relative">
              <img
                src={deal.image}
                alt={deal.name}
                loading="lazy"
                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-gradient-emerald text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-lg">
                -{deal.discount}%
              </span>
            </div>

            <div className="p-3 md:p-4 space-y-3">
              {/* Header with location and distance */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={12} strokeWidth={2} />
                  <span>{deal.location} · {deal.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${deal.isOpen ? 'bg-[#7ecfa4]' : 'bg-gray-400'}`} />
                  <span className={`text-xs font-medium ${deal.isOpen ? 'text-[#2e7d52]' : 'text-gray-500'}`}>
                    {deal.isOpen ? 'ABIERTO' : 'CERRADO'}
                  </span>
                </div>
              </div>

              {/* Store identity with enhanced display */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center border border-primary/30">
                  <span className="text-xs font-bold text-primary">{deal.store.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{deal.store}</p>
                  <p className="text-xs text-muted-foreground">Tienda oficial</p>
                </div>
              </div>
              
              {/* Product name */}
              <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
                {deal.name}
              </h3>
              
              {/* Product reference and condition */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{deal.reference}</span>
                <span>·</span>
                <span>{deal.condition}</span>
                <span>·</span>
                <span>{deal.stock}</span>
              </div>
              
              {/* Price section with custom styling */}
              <div className="bg-[#e8f5ee] border-2 border-dashed border-[#2e7d52] rounded-lg p-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-foreground">
                    ${deal.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    ${deal.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Action buttons with prioritized 'Ver en el comercio' */}
              <div className="space-y-2">
                {/* Primary action - Ver en el comercio */}
                <a
                  href={deal.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-emerald text-primary-foreground text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition-all duration-300 shadow-elevated hover:shadow-card"
                >
                  <ExternalLink size={16} strokeWidth={2} />
                  Ver en el comercio
                </a>
                
                {/* Secondary actions */}
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${deal.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 bg-[#1a9e50] text-white text-xs font-medium py-2 rounded-lg hover:bg-[#158a42] transition-colors"
                  >
                    <MessageCircle size={14} />
                    WhatsApp
                  </a>
                  <button className="flex-1 flex items-center justify-center gap-1 border border-border text-xs font-medium py-2 rounded-lg hover:bg-muted transition-colors">
                    <Phone size={14} />
                    Llamar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDeals;
