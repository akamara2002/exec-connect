from statistics import mean
from typing import Iterable


def _safe_last_first_change(values: Iterable[int | float]) -> float:
    data = list(values)
    if len(data) < 2 or data[0] == 0:
        return 0.0
    return ((data[-1] - data[0]) / data[0]) * 100


def calculate_throughput_trend(output_units: list[int]) -> float:
    return round(_safe_last_first_change(output_units), 2)


def calculate_average_ops_cost(costs: list[float]) -> float:
    if not costs:
        return 0.0
    return round(mean(costs), 2)


def estimate_capacity_utilization(
    output_units: list[int],
    theoretical_max_per_month: int | None,
) -> float | None:
    if not theoretical_max_per_month:
        return None
    avg_output = sum(output_units) / len(output_units)
    utilization = (avg_output / theoretical_max_per_month) * 100
    return round(min(utilization, 100.0), 2)


def classify_service_reliability(
    on_time_rate: float | None,
    defect_rate: float | None,
) -> str:
    if on_time_rate is None and defect_rate is None:
        return "medium"

    risk_score = 0
    if on_time_rate is not None:
        if on_time_rate < 70:
            risk_score += 2
        elif on_time_rate < 90:
            risk_score += 1

    if defect_rate is not None:
        if defect_rate > 10:
            risk_score += 2
        elif defect_rate > 5:
            risk_score += 1

    if risk_score >= 3:
        return "high"
    if risk_score == 2:
        return "medium"
    return "low"


def basic_ops_hint(has_sops: str, kpi_tracking: str) -> str:
    if has_sops == "no_sops" and kpi_tracking == "no_formal_tracking":
        return "Establish basic SOPs and track at least 3 operational KPIs monthly."
    if has_sops in ("documented_outdated", "no_sops") or kpi_tracking == "manual_spreadsheets":
        return "Tighten SOP documentation and make KPI reviews a weekly ritual."
    return "Maintain documented SOPs and continuous KPI reviews to stay ahead."

