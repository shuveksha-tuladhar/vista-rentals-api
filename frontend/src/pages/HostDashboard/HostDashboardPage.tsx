import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { FiHome } from "react-icons/fi";
import HostPortalNavbar from "../../components/HostPortalNavbar";
import { getApi } from "../../utils/api";
import TypeaheadSelect from "../../components/TypeaheadSelect";
import type { TypeaheadOption } from "../../components/TypeaheadSelect";
import StatCard from "./StatCard";
import type { DashboardData, FilterOptions, ActiveFilter } from "./types";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

const CHART_GRAY_900 = "#111827";
const CHART_GRAY_700 = "#374151";
const CHART_GRAY_200 = "#e5e7eb";

const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 11 } } },
    y: { grid: { color: CHART_GRAY_200 }, ticks: { font: { size: 11 } } },
  },
};

const revenueChartOptions = {
  ...baseChartOptions,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: { parsed: { y: number } }) => ` $${ctx.parsed.y.toLocaleString()}`,
      },
    },
  },
};

const hBarOptions = {
  indexAxis: "y" as const,
  responsive: true,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { color: CHART_GRAY_200 }, ticks: { font: { size: 11 } } },
    y: { grid: { display: false }, ticks: { font: { size: 11 } } },
  },
};

const propBarOptions = {
  ...hBarOptions,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: { parsed: { x: number } }) => ` $${ctx.parsed.x.toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      grid: { color: CHART_GRAY_200 },
      ticks: {
        font: { size: 11 },
        callback: (value: number | string) => `$${Number(value).toLocaleString()}`,
      },
    },
    y: { grid: { display: false }, ticks: { font: { size: 11 } } },
  },
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
      {children}
    </h2>
  );
}

function ChartBox({ children }: { children: React.ReactNode }) {
  return <div className="border border-gray-200 p-5">{children}</div>;
}

function EmptyText({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-400 py-8 text-center">{children}</p>;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-sm text-black">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export default function HostDashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [filter, setFilter] = useState<ActiveFilter>({ type: null, value: null });
  const [propertyPerformanceTimeframe, setPropertyPerformanceTimeframe] = useState<string>('12m');
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      if (data !== null) {
        setFetching(true);
      }

      const params = new URLSearchParams();
      if (filter.type === "property" && filter.value) params.set("property_id", String(filter.value));
      if (filter.type === "city" && filter.value) params.set("city", String(filter.value));
      if (filter.type === "state" && filter.value) params.set("state", String(filter.value));
      params.set("property_performance_timeframe", propertyPerformanceTimeframe);
      const url = `/host/dashboard${params.toString() ? `?${params}` : ""}`;

      const { data: responseData, error: err } = await getApi<DashboardData>(url);
      if (responseData) {
        setData(responseData);
        setFilterOptions(responseData.filter_options);
      } else {
        setError("Failed to load dashboard. Please try again.");
        console.error(err);
      }
      setLoading(false);
      setFetching(false);
    }
    fetchDashboard();
  }, [filter, propertyPerformanceTimeframe, data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <HostPortalNavbar />
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <HostPortalNavbar />
        <div className="flex items-center justify-center h-64">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const {
    stats,
    revenue_by_6_months,
    revenue_by_12_months,
    occupancy_this_month,
    rating_breakdown,
    property_performance,
    recent_reviews,
    upcoming_checkins,
  } = data;

  if (stats.listings_count === 0) {
    return (
      <div className="min-h-screen bg-white">
        <HostPortalNavbar />
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <FiHome size={40} className="text-gray-300" />
          <p className="text-lg font-semibold text-black">
            You have no listings yet
          </p>
          <p className="text-sm text-gray-500">
            Add your first property to start earning.
          </p>
          <button
            onClick={() => navigate("/become-a-host")}
            className="mt-2 px-6 py-2 bg-black text-white text-sm font-medium"
          >
            Add a listing
          </button>
        </div>
      </div>
    );
  }

  const currentMonth = new Date().toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const allZero6 = revenue_by_6_months.every((m) => parseFloat(m.revenue) === 0);
  const allZero12 = revenue_by_12_months.every((m) => parseFloat(m.revenue) === 0);
  const noRatings = Object.values(rating_breakdown).every((v) => v === 0);
  const noPropertyRevenue = property_performance.every((p) => parseFloat(p.revenue) === 0);

  const bar6Data = {
    labels: revenue_by_6_months.map((m) => m.month),
    datasets: [
      {
        data: revenue_by_6_months.map((m) => parseFloat(m.revenue)),
        backgroundColor: revenue_by_6_months.map((m) =>
          m.month === currentMonth ? CHART_GRAY_700 : CHART_GRAY_900,
        ),
        borderWidth: 0,
        borderRadius: 2,
      },
    ],
  };

  const line12Data = {
    labels: revenue_by_12_months.map((m) => m.month),
    datasets: [
      {
        data: revenue_by_12_months.map((m) => parseFloat(m.revenue)),
        borderColor: CHART_GRAY_900,
        backgroundColor: "transparent",
        pointBackgroundColor: CHART_GRAY_900,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3,
      },
    ],
  };

  const donutData = {
    labels: ["Booked", "Available"],
    datasets: [
      {
        data: [
          occupancy_this_month.booked_nights,
          Math.max(0, occupancy_this_month.total_nights - occupancy_this_month.booked_nights),
        ],
        backgroundColor: [CHART_GRAY_900, CHART_GRAY_200],
        borderWidth: 0,
      },
    ],
  };

  const ratingBarData = {
    labels: ["5★", "4★", "3★", "2★", "1★"],
    datasets: [
      {
        data: [
          rating_breakdown["5"],
          rating_breakdown["4"],
          rating_breakdown["3"],
          rating_breakdown["2"],
          rating_breakdown["1"],
        ],
        backgroundColor: CHART_GRAY_900,
        borderWidth: 0,
        borderRadius: 2,
      },
    ],
  };

  const propBarData = {
    labels: property_performance.map((p) => p.property_name),
    datasets: [
      {
        data: property_performance.map((p) => parseFloat(p.revenue)),
        backgroundColor: CHART_GRAY_900,
        borderWidth: 0,
        borderRadius: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HostPortalNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
            {fetching && <span className="text-xs text-gray-400">Updating...</span>}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Overview of your rental business
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <TypeaheadSelect
            options={(filterOptions?.cities ?? []).map((c): TypeaheadOption => ({ label: c, value: c }))}
            value={filter.type === "city" ? String(filter.value) : ""}
            onChange={(v) => setFilter(v ? { type: "city", value: v } : { type: null, value: null })}
            placeholder="All Cities"
            disabled={filter.type === "property"}
          />

          <TypeaheadSelect
            options={(filterOptions?.states ?? []).map((s): TypeaheadOption => ({ label: s, value: s }))}
            value={filter.type === "state" ? String(filter.value) : ""}
            onChange={(v) => setFilter(v ? { type: "state", value: v } : { type: null, value: null })}
            placeholder="All States"
            disabled={filter.type === "property"}
          />

          <TypeaheadSelect
            options={(filterOptions?.properties ?? []).map((p): TypeaheadOption => ({ label: p.name, value: String(p.id) }))}
            value={filter.type === "property" ? String(filter.value) : ""}
            onChange={(v) => setFilter(v ? { type: "property", value: Number(v) } : { type: null, value: null })}
            placeholder="All Properties"
            disabled={filter.type === "city" || filter.type === "state"}
          />

          {filter.type !== null && (
            <button
              onClick={() => setFilter({ type: null, value: null })}
              className="text-sm text-gray-500 underline cursor-pointer bg-transparent border-none"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          <StatCard label="Total Revenue" value={`$${parseFloat(stats.revenue_total).toLocaleString()}`} />
          <StatCard label="This Month" value={`$${parseFloat(stats.revenue_this_month).toLocaleString()}`} />
          <StatCard label="Avg Rating" value={stats.avg_rating !== null ? `${stats.avg_rating} ★` : "—"} />
          <StatCard
            label="Total Bookings"
            value={stats.bookings_total}
            sub={stats.bookings_pending > 0 ? `${stats.bookings_pending} pending` : undefined}
          />
          <StatCard label="Active Stays" value={stats.active_stays} />
          <StatCard
            label="Avg Stay"
            value={stats.avg_stay_duration !== null ? `${stats.avg_stay_duration} nights` : "—"}
          />
          <StatCard
            label="Lead Time"
            value={stats.booking_lead_time !== null ? `${stats.booking_lead_time} days` : "—"}
            tooltip="Average number of days between when a booking is made and the check-in date."
          />
          <StatCard label="Nights Booked" value={stats.total_nights_booked} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <SectionHeading>Revenue 6mo</SectionHeading>
            <ChartBox>
              {allZero6 ? <EmptyText>No data yet.</EmptyText> : (
                <div className="h-40">
                  <Bar data={bar6Data} options={{ ...revenueChartOptions, maintainAspectRatio: false }} />
                </div>
              )}
            </ChartBox>
          </div>
          <div>
            <SectionHeading>Revenue 12mo</SectionHeading>
            <ChartBox>
              {allZero12 ? <EmptyText>No data yet.</EmptyText> : (
                <div className="h-40">
                  <Line data={line12Data} options={{ ...revenueChartOptions, maintainAspectRatio: false }} />
                </div>
              )}
            </ChartBox>
          </div>
          <div>
            <SectionHeading>Occupancy</SectionHeading>
            <ChartBox>
              {occupancy_this_month.total_nights === 0 ? <EmptyText>—</EmptyText> : (
                <div className="flex flex-col items-center">
                  <div className="h-28 w-28">
                    <Doughnut
                      data={donutData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: "68%",
                        plugins: { legend: { display: false } },
                      }}
                    />
                  </div>
                  <p className="text-xl font-semibold text-black mt-2">{occupancy_this_month.rate}%</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {occupancy_this_month.booked_nights}/{occupancy_this_month.total_nights} nights
                  </p>
                </div>
              )}
            </ChartBox>
          </div>
          <div>
            <SectionHeading>Ratings</SectionHeading>
            <ChartBox>
              {noRatings ? <EmptyText>No reviews yet.</EmptyText> : (
                <div className="h-40">
                  <Bar data={ratingBarData} options={{ ...hBarOptions, maintainAspectRatio: false }} />
                </div>
              )}
            </ChartBox>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <SectionHeading>Property Performance</SectionHeading>
            <div className="flex space-x-1 mb-2">
              {['1m', '3m', '6m', '12m', 'ytd', 'all_time'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setPropertyPerformanceTimeframe(timeframe)}
                  className={`px-3 py-1 text-xs rounded-md ${
                    propertyPerformanceTimeframe === timeframe
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {timeframe === 'all_time' ? 'All' : timeframe.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          {noPropertyRevenue ? (
            <ChartBox><EmptyText>No revenue data yet.</EmptyText></ChartBox>
          ) : (
            <ChartBox>
              {property_performance.length > 10 ? (
                <div className="overflow-y-auto" style={{ maxHeight: "260px" }}>
                  <div style={{ height: `${property_performance.length * 36}px` }}>
                    <Bar data={propBarData} options={{ ...propBarOptions, maintainAspectRatio: false }} />
                  </div>
                </div>
              ) : (
                <div className="h-48">
                  <Bar data={propBarData} options={{ ...propBarOptions, maintainAspectRatio: false }} />
                </div>
              )}
            </ChartBox>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SectionHeading>Upcoming Check-ins</SectionHeading>
            <div className="border border-gray-200 bg-white">
              {upcoming_checkins.length === 0 ? (
                <EmptyText>No check-ins in the next 14 days.</EmptyText>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Guest
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Property
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Check-in
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Nights
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcoming_checkins.map((c) => (
                      <tr
                        key={c.booking_id}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="px-4 py-3 text-black font-medium">
                          {c.guest_first_name} {c.guest_last_name}
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {c.property_name}
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {(() => { const [y, m, d] = c.check_in.split("-"); return new Date(+y, +m - 1, +d).toLocaleDateString("en-US", { month: "short", day: "numeric" }); })()}
                        </td>
                        <td className="px-4 py-3 text-right text-gray-500">
                          {c.nights}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div>
            <SectionHeading>Recent Reviews</SectionHeading>
            <div className="border border-gray-200 bg-white">
              {recent_reviews.length === 0 ? (
                <EmptyText>No reviews yet.</EmptyText>
              ) : (
                <ul>
                  {recent_reviews.map((r, i) => (
                    <li
                      key={i}
                      className="px-4 py-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <StarRating rating={r.rating} />
                        <span className="text-xs text-gray-400">
                          {new Date(r.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      {r.review && (
                        <p className="text-sm text-gray-700 mt-1 mb-1 leading-relaxed">
                          {r.review}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        {r.guest_first_name} · {r.property_name}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
