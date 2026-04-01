import "../../styles/Stats.css";
import { JSX } from "react";
import Counter from "../common/CounterAnimation";
interface Stat {
  label: string;
  value: string;
  unit?: string;
}

export default function Stats(): JSX.Element {
  const stats: Stat[] = [
    { label: "Practices choose Adit", value: "5",unit:"K+" },
    { label: "Active users on Adit", value: "2.4" ,unit:"M+"},
    { label: "Calls handled every month", value: "30",unit:"K+" },
    { label: "Confirmed appointments every month", value: "200",unit:"K+" },
  ];

  return (
    <section className="stats">
      {stats.map((stat, i) => (
        <div key={i} className="stat-box">
          <h3><Counter value={Number(stat.value)} duration={500} />{stat.unit}</h3>
          <p>{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
