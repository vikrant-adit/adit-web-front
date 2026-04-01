const StatsSection = () => {
  const stats = [
    {
      number: "3.5K",
      description: "Practices choose Adit"
    },
    {
      number: "2.4M+",
      description: "Active users on Adit"
    },
    {
      number: "20K+",
      description: "Calls handled every month"
    },
    {
      number: "200K+",
      description: "Confirmed appointments every month"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display tracking-tight text-4xl md:text-5xl font-bold text-navy mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground text-sm md:text-base">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;