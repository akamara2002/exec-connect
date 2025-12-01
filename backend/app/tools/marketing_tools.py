"""
Marketing calculation tools and utilities.
"""
from typing import Dict, Any, Optional


def calculate_CAC(
    marketing_spend: float,
    new_customers: int,
    period_days: int = 30
) -> float:
    """
    Calculate Customer Acquisition Cost (CAC).
    
    Args:
        marketing_spend: Total marketing spend in the period
        new_customers: Number of new customers acquired
        period_days: Period length in days (default: 30)
    
    Returns:
        CAC value (cost per customer)
    """
    if new_customers == 0:
        return float('inf')
    return marketing_spend / new_customers


def LTV_estimate(
    average_order_value: float,
    purchase_frequency: float,
    customer_lifespan_months: float,
    gross_margin: float = 0.3
) -> float:
    """
    Estimate Customer Lifetime Value (LTV).
    
    Args:
        average_order_value: Average value per order
        purchase_frequency: Purchases per month
        customer_lifespan_months: Expected customer lifespan in months
        gross_margin: Gross margin percentage (default: 0.3 = 30%)
    
    Returns:
        Estimated LTV
    """
    monthly_value = average_order_value * purchase_frequency
    ltv = monthly_value * customer_lifespan_months * gross_margin
    return ltv


def ROI_estimate(
    revenue: float,
    marketing_spend: float
) -> float:
    """
    Calculate Return on Investment (ROI) for marketing.
    
    Args:
        revenue: Revenue generated from marketing
        marketing_spend: Total marketing spend
    
    Returns:
        ROI as a percentage (e.g., 300 means 300% ROI)
    """
    if marketing_spend == 0:
        return float('inf')
    roi = ((revenue - marketing_spend) / marketing_spend) * 100
    return roi


def detect_risk_level(
    input_data: Dict[str, Any],
    cac: Optional[float] = None,
    ltv: Optional[float] = None,
    roi: Optional[float] = None
) -> str:
    """
    Detect overall risk level based on inputs and calculated metrics.
    
    Args:
        input_data: The CMO input data
        cac: Calculated CAC (optional)
        ltv: Calculated LTV (optional)
        roi: Calculated ROI (optional)
    
    Returns:
        Risk level: "green", "yellow", or "red"
    """
    risk_score = 0
    
    # Check brand confidence
    brand_confidence = input_data.get("brand_confidence", 3)
    if brand_confidence <= 2:
        risk_score += 2
    elif brand_confidence == 3:
        risk_score += 1
    
    # Check marketing plan status
    plan_status = input_data.get("marketing_plan_status", "").lower()
    if "none" in plan_status or "informal" in plan_status:
        risk_score += 2
    
    # Check metrics review frequency
    review_freq = input_data.get("metrics_review_frequency", "").lower()
    if "never" in review_freq or "rarely" in review_freq:
        risk_score += 2
    elif "monthly" in review_freq:
        risk_score += 1
    
    # Check effective channels
    effective_channels = input_data.get("effective_channels", [])
    if len(effective_channels) == 0:
        risk_score += 2
    elif len(effective_channels) <= 1:
        risk_score += 1
    
    # Check CAC/LTV ratio if available
    if cac and ltv and ltv > 0:
        ratio = cac / ltv
        if ratio > 0.5:  # CAC > 50% of LTV is risky
            risk_score += 2
        elif ratio > 0.3:
            risk_score += 1
    
    # Check ROI if available
    if roi is not None:
        if roi < 100:  # Less than 100% ROI is concerning
            risk_score += 2
        elif roi < 200:
            risk_score += 1
    
    # Determine risk level
    if risk_score >= 6:
        return "red"
    elif risk_score >= 3:
        return "yellow"
    else:
        return "green"


def basic_marketing_hint(input_data: Dict[str, Any]) -> str:
    """
    Generate a basic marketing hint based on input data.
    
    Args:
        input_data: The CMO input data
    
    Returns:
        A hint string
    """
    primary_challenge = input_data.get("primary_challenge", "")
    
    hints = {
        "lead_generation": "Focus on optimizing your lead generation channels. Consider A/B testing your landing pages and improving your conversion funnels.",
        "brand_awareness": "Build brand awareness through consistent messaging across all channels. Consider content marketing and social media engagement.",
        "retention": "Customer retention is key. Implement loyalty programs, personalized communication, and regular engagement campaigns.",
        "digital_eff": "Improve digital marketing effectiveness by tracking metrics, optimizing ad spend, and focusing on high-performing channels.",
        "roi": "Focus on measuring and improving ROI. Track all marketing spend and revenue attribution to identify the most profitable channels."
    }
    
    return hints.get(primary_challenge, "Review your marketing strategy regularly and ensure alignment with business goals.")

