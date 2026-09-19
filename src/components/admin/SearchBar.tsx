import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div style={{ position: "relative" }}>
      <Search size={16} color="#94A3B8" style={{
        position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
        transition: "color 0.2s ease",
      }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="admin-input"
        style={{
          width: "100%", padding: "10px 12px 10px 36px",
          fontSize: 13, color: "#111827", backgroundColor: "#FFFFFF",
          border: "1px solid #E5EAF2", borderRadius: 10,
          outline: "none", boxSizing: "border-box",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.15s ease",
        }}
      />
    </div>
  );
}
