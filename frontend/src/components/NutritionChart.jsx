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
    <div className="rounded-xl bg-white px-3.5 py-2.5 shadow-lg border border-slate-200/80 text-xs">
      <p className="font-semibold text-[#1E293B] mb-1.5">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 py-0.5">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}
          </span>
          <span className="font-semibold text-[#1E293B]">{entry.value} g</span>
        </div>
      ))}
    </div>
  );
}

function DonutTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-xl bg-white px-3.5 py-2 shadow-lg border border-slate-200/80 text-xs">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: item.payload.color }}
        />
        <span className="font-semibold text-[#1E293B]">{item.name}:</span>
        <span className="font-bold text-[#166534]">{item.value}%</span>
      </div>
    </div>
  );
}

export function NutrientIntakeChart({ data }) {
  return (
    <div className="rounded-2xl bg-white p-6 border border-slate-200/70 shadow-sm h-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <div>
          <h3 className="text-base font-bold text-[#1E293B]">Nutrient Intake</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Daily macronutrient intake compared against targets (grams)
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#166534]" />
            Consumed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#DCFCE7] border border-emerald-300" />
            Daily Target
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-[260px] w-full">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} barGap={8} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              unit="g"
            />
            <Tooltip content={<BarTooltip />} cursor={{ fill: '#F8FAF7' }} />
            <Bar
              dataKey="consumed"
              name="Consumed"
              fill="#166534"
              radius={[8, 8, 0, 0]}
              barSize={32}
            />
            <Bar
              dataKey="target"
              name="Target"
              fill="#BBF7D0"
              radius={[8, 8, 0, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function MacroDistributionChart({ data }) {
  return (
    <div className="rounded-2xl bg-white p-6 border border-slate-200/70 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-base font-bold text-[#1E293B]">Macronutrient Distribution</h3>
        <p className="text-xs text-slate-500 mt-0.5">Caloric split across daily macronutrients</p>
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
          <span className="text-xs font-medium text-slate-400">Daily Split</span>
          <span className="text-xl font-bold text-[#1E293B]">100%</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center rounded-xl bg-[#F8FAF7] px-2 py-2.5 text-center"
          >
            <div className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium text-slate-600">{item.name}</span>
            </div>
            <span className="mt-1 text-sm font-bold text-[#1E293B]">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

