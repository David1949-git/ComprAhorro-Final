import piggyLogo from "@/assets/piggy-logo.png";

const PiggyLogo = ({ size = 32 }: { size?: number }) => {
  return (
    <div
      className="bg-gradient-emerald rounded-lg flex items-center justify-center overflow-hidden"
      style={{ width: size, height: size }}
    >
      <img
        src={piggyLogo}
        alt="ComprAhorro"
        width={size}
        height={size}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default PiggyLogo;
