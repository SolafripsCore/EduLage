import os, re

# monogram, accent, filename
INSTITUTIONS = [
    ("MIT", "#8A1B2E", "mit"),
    ("OXF", "#002147", "oxford"),
    ("ETH", "#1F407A", "ethz"),
    ("TUD", "#0C6E8F", "delft"),
    ("SP", "#1B3A6B", "sciencespo"),
    ("NUS", "#003D7C", "nus"),
    ("THU", "#5D1268", "tsinghua"),
    ("UT", "#1E3A5F", "tokyo"),
    ("IITB", "#00417D", "iitb"),
    ("UofT", "#002A5C", "toronto"),
    ("UOM", "#0B2A4A", "melbourne"),
    ("UCT", "#00447C", "uct"),
    ("UI", "#0B6E4F", "ibadan"),
    ("UON", "#0E4B3A", "nairobi"),
    ("USP", "#1A5632", "usp"),
    ("KAU", "#0E5C6B", "kaust"),
]

SIZES = {1: 40, 2: 34, 3: 27, 4: 21}

OUT = "/home/ubuntu/repos/EduLage/public/institutions"
os.makedirs(OUT, exist_ok=True)

for mono, accent, name in INSTITUTIONS:
    fs = SIZES[min(len(mono), 4)]
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="{mono}">
  <circle cx="48" cy="48" r="47" fill="{accent}"/>
  <circle cx="48" cy="48" r="41" fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.5"/>
  <text x="48" y="48" fill="#ffffff" font-family="Georgia, 'Times New Roman', serif" font-size="{fs}" font-weight="600" letter-spacing="0.5" text-anchor="middle" dominant-baseline="central">{mono}</text>
</svg>
"""
    with open(os.path.join(OUT, f"{name}.svg"), "w") as fh:
        fh.write(svg)
    print(name, mono, accent)
