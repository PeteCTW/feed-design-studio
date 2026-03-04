import { useState } from "react";
import { Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const countries = [
  { code: "US", label: "United States", flag: "🇺🇸" },
  { code: "GB", label: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", label: "Canada", flag: "🇨🇦" },
  { code: "AU", label: "Australia", flag: "🇦🇺" },
  { code: "DE", label: "Germany", flag: "🇩🇪" },
  { code: "FR", label: "France", flag: "🇫🇷" },
  { code: "IN", label: "India", flag: "🇮🇳" },
];

const CountrySelector = () => {
  const [selected, setSelected] = useState("US");
  const current = countries.find((c) => c.code === selected)!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors font-body text-sm">
          <span className="text-base leading-none">{current.flag}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel className="font-body text-xs">Select Region</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {countries.map((c) => (
          <DropdownMenuItem
            key={c.code}
            onClick={() => setSelected(c.code)}
            className="font-body text-sm gap-2 cursor-pointer"
          >
            <span className="text-base leading-none">{c.flag}</span>
            {c.label}
            {selected === c.code && <Check className="w-3.5 h-3.5 ml-auto text-accent" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CountrySelector;
