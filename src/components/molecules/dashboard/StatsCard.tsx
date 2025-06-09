import React from "react";

type StatsCardProps = {
  title: string;
  value: string | number;
  change: string;
  changeType?: "positive" | "negative";
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = "positive",
}) => {
  const changeColor =
    changeType === "positive" ? "text-green-600" : "text-red-600";

  return (
    <div className="bg-pale-rose text-dark-chocolate rounded-lg h-34 pl-4 flex flex-col justify-center gap-1">
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-2xl font-bold">
        {title.includes("Total Revenue")
          ? `$${Number(value).toLocaleString()}`
          : Number(value).toLocaleString()}
      </p>
      <p className={`text-sm font-medium ${changeColor}`}>
        {changeType === "positive" ? "+" : "-"}
        {change}%
      </p>
    </div>
  );
};

export default StatsCard;
