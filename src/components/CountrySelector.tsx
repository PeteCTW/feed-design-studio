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
  { code: "US", label: "United States" },
  { code: "GB", label: "United Kingdom" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
  { code: "DE", label: "Germany" },
  { code: "FR", label: "France" },
  { code: "IN", label: "India" },
];

const flagUrl = (code: string) =>
  `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

const CountrySelector = () => {
  const [selected, setSelected] = useState("US");
  const current = countries.find((c) => c.code === selected)!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors font-body text-sm">
          <img src={flagUrl(current.code)} alt={current.label} className="w-5 h-3.5 object-cover rounded-sm" />
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
            <img src={flagUrl(c.code)} alt={c.label} className="w-5 h-auto rounded-sm" />
            {c.label}
            {selected === c.code && <Check className="w-3.5 h-3.5 ml-auto text-accent" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CountrySelector;
