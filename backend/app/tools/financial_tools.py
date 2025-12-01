"""Financial calculation tools for AI-CFO agent."""
from typing import Optional


def calculate_gross_margin(revenue: list[float], expenses: list[float]) -> float:
    """Calculate gross margin percentage."""
    if not revenue or not expenses or len(revenue) != len(expenses):
        return 0.0
    
    total_revenue = sum(revenue)
    total_expenses = sum(expenses)
    
    if total_revenue == 0:
        return 0.0
    
    return ((total_revenue - total_expenses) / total_revenue) * 100


def calculate_average_monthly_burn(expenses: list[float]) -> float:
    """Calculate average monthly burn rate."""
    if not expenses:
        return 0.0
    return sum(expenses) / len(expenses)


def calculate_cash_runway(cash_on_hand: float, avg_burn: float) -> float:
    """Calculate cash runway in months."""
    if avg_burn <= 0:
        return float('inf') if cash_on_hand > 0 else 0.0
    return cash_on_hand / avg_burn


def detect_cash_flow_risk(
    revenue: list[float],
    expenses: list[float],
    upcoming_payments: Optional[float]
) -> str:
    """Detect cash flow risk level."""
    if not revenue or not expenses:
        return "high"
    
    avg_revenue = sum(revenue) / len(revenue)
    avg_expenses = sum(expenses) / len(expenses)
    net_cash_flow = avg_revenue - avg_expenses
    
    # High risk if negative cash flow
    if net_cash_flow < 0:
        return "high"
    
    # Medium risk if upcoming payments are significant
    if upcoming_payments and upcoming_payments > avg_revenue * 0.5:
        return "medium"
    
    # Low risk otherwise
    return "low"


def basic_unit_economics_hint(revenue: list[float], expenses: list[float]) -> str:
    """Generate a basic hint about unit economics."""
    if not revenue or not expenses:
        return "Insufficient data for unit economics analysis."
    
    avg_revenue = sum(revenue) / len(revenue)
    avg_expenses = sum(expenses) / len(expenses)
    margin = avg_revenue - avg_expenses
    
    if margin < 0:
        return "Negative unit economics detected. Revenue per period is below expenses."
    elif margin < avg_revenue * 0.2:
        return "Low margin unit economics. Consider optimizing costs or increasing prices."
    else:
        return "Positive unit economics with healthy margins."


def compute_financial_summary(
    revenue: list[float],
    expenses: list[float],
    cash_on_hand: float,
    upcoming_payments: Optional[float]
) -> dict:
    """Compute all financial metrics and return as a summary dict."""
    avg_burn = calculate_average_monthly_burn(expenses)
    runway_months = calculate_cash_runway(cash_on_hand, avg_burn)
    gross_margin = calculate_gross_margin(revenue, expenses)
    cash_flow_risk = detect_cash_flow_risk(revenue, expenses, upcoming_payments)
    unit_economics_hint = basic_unit_economics_hint(revenue, expenses)
    
    return {
        "average_monthly_burn": round(avg_burn, 2),
        "cash_runway_months": round(runway_months, 2) if runway_months != float('inf') else "infinite",
        "gross_margin_percent": round(gross_margin, 2),
        "cash_flow_risk": cash_flow_risk,
        "unit_economics_hint": unit_economics_hint,
        "average_monthly_revenue": round(sum(revenue) / len(revenue), 2) if revenue else 0,
        "average_monthly_expenses": round(avg_burn, 2)
    }

