#!/usr/bin/env python3
"""Render semua SVG readme menjadi satu contact sheet untuk uji visual."""
import asyncio, os
from playwright.async_api import async_playwright

SVGS = [
    ("hero-banner", 1600, 480),
    ("stats-bars", 1600, 430),
    ("marquee", 1600, 60),
    ("whatsapp-cta", 800, 140),
    ("tagline-fade", 1000, 84),
    ("wave-footer", 1600, 160),
    ("wheel", 140, 140),
]
BASE = "/home/z/my-project"
OUT = "/tmp/svgshots"
os.makedirs(OUT, exist_ok=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for name, w, h in SVGS:
            page = await browser.new_page(viewport={"width": w, "height": h})
            await page.goto(f"file://{BASE}/assets/readme/{name}.svg")
            # biar animasi CSS/SMIL jalan beberapa frame
            await page.wait_for_timeout(1200)
            await page.screenshot(path=f"{OUT}/{name}.png")
            await page.close()
        await browser.close()
    print("shots done:", os.listdir(OUT))

asyncio.run(main())
