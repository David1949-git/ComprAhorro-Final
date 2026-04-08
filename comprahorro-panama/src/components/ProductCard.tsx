import { MapPin, Phone, MessageCircle, ExternalLink } from "lucide-react";

interface Product {
  producto: string;
  tienda: string;
  precioFinal: string;
  link: string;
  imagen: string;
  tipo: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group bg-card rounded-2xl border border-border/50 shadow-soft overflow-hidden hover:shadow-card transition-all duration-300 cursor-pointer">
      {/* Product image */}
      <div className="relative">
        <img
          src={product.imagen || '/placeholder-product.png'}
          alt={product.producto}
          loading="lazy"
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-3 md:p-4 space-y-3">
        {/* Store identity with enhanced display */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center border border-primary/30">
            <span className="text-xs font-bold text-primary">{product.tienda.charAt(0)}</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">{product.tienda}</p>
            <p className="text-xs text-muted-foreground">{product.tipo === 'tienda' ? 'Tienda oficial' : 'Recomendado'}</p>
          </div>
        </div>
        
        {/* Product name */}
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
          {product.producto}
        </h3>
        
        {/* Price section with custom styling */}
        <div className="bg-[#e8f5ee] border-2 border-dashed border-[#2e7d52] rounded-lg p-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              {product.precioFinal}
            </span>
          </div>
        </div>
        
        {/* Action buttons with prioritized 'Ver en el comercio' */}
        <div className="space-y-2">
          {/* Primary action - Ver en el comercio */}
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-gradient-emerald text-primary-foreground text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition-all duration-300 shadow-elevated hover:shadow-card"
          >
            <ExternalLink size={16} strokeWidth={2} />
            Ver en el comercio
          </a>
          
          {/* Secondary actions */}
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1 border border-border text-xs font-medium py-2 rounded-lg hover:bg-muted transition-colors">
              <MessageCircle size={14} />
              Consultar
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 border border-border text-xs font-medium py-2 rounded-lg hover:bg-muted transition-colors">
              <Phone size={14} />
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
