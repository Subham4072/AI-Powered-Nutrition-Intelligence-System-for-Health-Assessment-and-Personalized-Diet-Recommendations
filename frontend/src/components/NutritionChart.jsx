import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

function BarTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="card-floating rounded-2xl px-4 py-3 text-xs shadow-xl border border-[#176B38]/15 backdrop-blur-md">
      <p className="font-bold text-[#202B25] mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-5 py-0.5">
          <span className="flex items-center gap-2 text-[#4D5E54] font-medium">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}
          </span>
          <span className="font-bold text-[#202B25]">{entry.value} g</span>
        </div>
      ))}
    </div>
  );
}

function DonutTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div className="card-floating rounded-2xl px-4 py-2.5 text-xs shadow-xl border border-[#176B38]/15 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: item.payload.color }}
        />
        <span className="font-medium text-[#4D5E54]">{item.name}:</span>
        <span className="font-bold text-[#176B38]">{item.value}%</span>
      </div>
    </div>
  );
}

export function NutrientIntakeChart({ data }) {
  return (
    <div className="card-floating rounded-3xl p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-extrabold text-[#202B25] font-display flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#176B38]" />
              Nutrient Intake
            </h3>
            <p className="text-xs text-[#617268] mt-0.5">
              Daily macronutrient intake compared against targets (grams)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#4D5E54] font-medium">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-md bg-[#176B38]" />
              Consumed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-md bg-[#A7D7A3] border border-[#176B38]/20" />
              Daily Target
            </span>
          </div>
        </div>

        <div className="flex-1 min-h-[260px] w-full pt-2">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} barGap={8} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(23, 107, 56, 0.08)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#4D5E54', fontSize: 12, fontWeight: 600 }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#617268', fontSize: 12 }}
                unit="g"
              />
              <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(221, 245, 217, 0.25)' }} />
              <Bar
                dataKey="consumed"
                name="Consumed"
                fill="#176B38"
                radius={[8, 8, 0, 0]}
                barSize={32}
              />
              <Bar
                dataKey="target"
                name="Target"
                fill="#A7D7A3"
                radius={[8, 8, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function MacroDistributionChart({ data }) {
  return (
    <div className="card-floating rounded-3xl p-6 h-full flex flex-col justify-between">
      <div>
        <div className="mb-4">
          <h3 className="text-base font-extrabold text-[#202B25] font-display flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#10B981]" />
            Macronutrient Distribution
          </h3>
          <p className="text-xs text-[#617268] mt-0.5">Caloric split across daily macronutrients</p>
        </div>

        <div className="relative flex-1 flex items-center justify-center min-h-[210px]">
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<DonutTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[11px] font-bold text-[#617268] uppercase tracking-wider">Split</span>
            <span className="text-xl font-extrabold text-[#202B25] font-display">100%</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-[#176B38]/10">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center rounded-2xl bg-[#FAF8F0]/80 border border-[#176B38]/10 px-2 py-2.5 text-center transition-colors hover:bg-[#DDF5D9]/40"
          >
            <div className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-semibold text-[#4D5E54]">{item.name}</span>
            </div>
            <span className="mt-1 text-sm font-extrabold text-[#202B25] font-display">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
