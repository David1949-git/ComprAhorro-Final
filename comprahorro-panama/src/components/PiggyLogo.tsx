import piggyLogo from "@/assets/piggy-logo.png";

const PiggyLogo = ({ size = 32 }: { size?: number }) => {
  return (
    <div
      className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      style={{ width: size, height: size }}
    >
      <img
        src={piggyLogo}
        alt="ComprAhorro"
        width={size * 0.7}
        height={size * 0.7}
        className="w-full h-full object-contain filter drop-shadow-sm"
        loading="lazy"
      />
    </div>
  );
};

export default PiggyLogo;
