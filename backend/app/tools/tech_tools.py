"""
Technology diagnostic tools and calculators.
"""
from typing import Dict, Any, List


def calculate_infra_score(input_data: Dict[str, Any]) -> float:
    """Calculate infrastructure maturity score (0-100)."""
    score = 50.0  # Base score
    
    # Stack maturity
    maturity_map = {
        "Early-stage MVP": 20,
        "Growing product with some scalable components": 50,
        "Scalable architecture ready for enterprise": 80,
        "Established enterprise-grade platform": 100,
    }
    
    maturity = input_data.get("tech_stack_maturity", "")
    if maturity in maturity_map:
        score = maturity_map[maturity]
    
    # DevOps impact
    devops_map = {
        "Fully embraced with CI/CD pipelines": 20,
        "Partial adoption with manual deployments": 0,
        "No cloud or DevOps practices": -20,
    }
    
    devops = input_data.get("devops_maturity", "")
    if devops in devops_map:
        score += devops_map[devops]
    
    # Security policies
    if input_data.get("has_security_policies"):
        score += 10
    else:
        score -= 10
    
    return max(0, min(100, score))


def devops_maturity_score(input_data: Dict[str, Any]) -> float:
    """Calculate DevOps maturity score (0-100)."""
    devops_map = {
        "Fully embraced with CI/CD pipelines": 90,
        "Partial adoption with manual deployments": 40,
        "No cloud or DevOps practices": 10,
    }
    
    devops = input_data.get("devops_maturity", "No cloud or DevOps practices")
    return devops_map.get(devops, 10)


def estimate_cloud_cost_efficiency(input_data: Dict[str, Any]) -> Dict[str, Any]:
    """Estimate cloud cost efficiency metrics."""
    devops = input_data.get("devops_maturity", "")
    
    if "Fully embraced" in devops:
        efficiency = "High"
        estimated_savings = "20-30%"
    elif "Partial" in devops:
        efficiency = "Medium"
        estimated_savings = "10-15%"
    else:
        efficiency = "Low"
        estimated_savings = "0-5%"
    
    return {
        "efficiency_level": efficiency,
        "estimated_cost_savings": estimated_savings,
        "recommendations": [
            "Automate resource scaling",
            "Implement cost monitoring",
            "Optimize resource allocation"
        ] if efficiency != "High" else []
    }


def detect_risk_level(input_data: Dict[str, Any]) -> str:
    """Detect overall risk level."""
    risk_indicators = 0
    
    # Operational risks
    operational_risk = input_data.get("operational_risks", "")
    if "High risk" in operational_risk:
        risk_indicators += 3
    elif "Manageable" in operational_risk:
        risk_indicators += 1
    
    # Security policies
    if not input_data.get("has_security_policies", False):
        risk_indicators += 2
    
    # DevOps maturity
    devops = input_data.get("devops_maturity", "")
    if "No cloud" in devops:
        risk_indicators += 2
    
    # Business alignment
    alignment = input_data.get("business_alignment", 5)
    if alignment <= 2:
        risk_indicators += 1
    
    if risk_indicators >= 5:
        return "high"
    elif risk_indicators >= 2:
        return "medium"
    else:
        return "low"


def basic_tech_hint(input_data: Dict[str, Any]) -> List[str]:
    """Generate basic technology hints based on input."""
    hints = []
    
    challenges = input_data.get("biggest_challenge", [])
    
    if "Scaling infrastructure and users" in challenges:
        hints.append("Consider implementing auto-scaling and load balancing")
    
    if "Security and compliance" in challenges:
        hints.append("Prioritize security audits and compliance frameworks")
    
    if "Integrating with external platforms/tools" in challenges:
        hints.append("Implement API gateway and integration patterns")
    
    devops = input_data.get("devops_maturity", "")
    if "No cloud" in devops or "Partial" in devops:
        hints.append("Adopt CI/CD practices to improve deployment reliability")
    
    if not input_data.get("has_security_policies", False):
        hints.append("Document and implement security policies immediately")
    
    return hints


def calculate_all_tools(input_data: Dict[str, Any]) -> Dict[str, Any]:
    """Calculate all tool metrics."""
    return {
        "infra_score": calculate_infra_score(input_data),
        "devops_maturity_score": devops_maturity_score(input_data),
        "cloud_efficiency": estimate_cloud_cost_efficiency(input_data),
        "risk_level": detect_risk_level(input_data),
        "hints": basic_tech_hint(input_data),
    }

