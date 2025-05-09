"""
Post processing for text
"""

def format_text(text:str) -> str:
    headings = [   
        "Definition / Introduction",
        "Examples and Analogies",
        "Classification and Types",
        "Causes and Origin",
        "Origin, History and Background"
        "Major Thinkers or Contributors",
        "Motivation or Purpose",
        "Supporting Arguments or Evidence",
        "Criticism and Counterarguments",
        "Controversies and Debates",
        "Historical and Cultural Context",
        "Usages and Applications",
        "Scope and Boundaries",
        "Signs and Characteristics",
        "Core Components",
        "Significance",
        "Diagnosis and Detection",
        "How it Works",
        "Interdisciplinary Connections",
        "Effects and Impact",
        "Management and Interventions",
        "Ongoing Research and Developments",
        "Misconceptions"
    ]
    for heading in headings:
        if text.find("heading"):
            text.replace(heading, "\n{heading}\n")

    return text