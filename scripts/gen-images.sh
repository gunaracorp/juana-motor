#!/bin/bash
# Batch image generation for Juana Motor website
mkdir -p /home/z/my-project/public/images
cd /home/z/my-project/public/images

gen() {
  local prompt="$1"
  local out="$2"
  local size="$3"
  if [ -s "$out" ]; then echo "SKIP $out (exists)"; return; fi
  z-ai image -p "$prompt" -o "./$out" -s "$size" && echo "OK $out" || echo "FAIL $out"
}

# 1. Hero - dramatic sport bike
gen "Dramatic studio photograph of a modern red and black sport motorcycle, three-quarter front view, dark charcoal background with orange neon rim lighting, glossy reflections on floor, cinematic automotive photography, high quality, detailed" "hero-bike.png" "1440x720"

# 2. Automatic scooter red (matic)
gen "Studio product photo of a modern red automatic scooter motorcycle similar to Indonesian urban scooters, side view, clean dark studio background with warm amber lighting, professional automotive product photography, high quality" "motor-matic.png" "1024x1024"

# 3. Sport bike
gen "Studio product photo of a sleek racing sport motorcycle with full fairing in black and red livery, side view, dark studio background with dramatic red rim light, professional automotive photography, high quality detailed" "motor-sport.png" "1024x1024"

# 4. Underbone bebek
gen "Studio product photo of an Indonesian underbone cub motorcycle, blue and white colors, side view, clean dark studio background with soft amber lighting, professional automotive product photography, high quality" "motor-bebek.png" "1024x1024"

# 5. Trail dirt bike
gen "Studio product photo of an enduro dirt trail motorcycle with knobby tires in green and white, side view, dark studio background with dramatic lighting, professional automotive photography, high quality detailed" "motor-trail.png" "1024x1024"

# 6. Retro classic
gen "Studio product photo of a retro classic style motorcycle with round headlamp, brown seat, cream and dark green tank, side view, dark studio background with warm golden lighting, professional automotive photography, high quality" "motor-retro.png" "1024x1024"

# 7. Big bike
gen "Studio product photo of a muscular large displacement naked streetfighter motorcycle, matte black with orange accents, side view, dark studio background with dramatic rim lighting, professional automotive photography, high quality" "motor-bigbike.png" "1024x1024"

# 8. Electric motorcycle
gen "Studio product photo of a futuristic electric scooter motorcycle with LED light strip, white and teal colors, side view, dark studio background with cool ambient lighting, professional automotive product photography, high quality" "motor-elektrik.png" "1024x1024"

# 9. Showroom interior
gen "Modern motorcycle showroom interior at night, rows of shiny new motorcycles on glossy dark floor, warm orange accent lighting, glass storefront, premium dealership atmosphere, cinematic wide angle photography, high quality" "showroom.png" "1344x768"

# 10. Service mechanic
gen "Professional motorcycle mechanic in uniform servicing a motorcycle engine in a clean modern workshop, warm lighting, shallow depth of field, cinematic photography, high quality detailed" "service.png" "1024x1024"

# 11. Used bike inspection
gen "Close up of hands holding clipboard inspecting a clean well maintained used motorcycle, dealer evaluating second hand motorcycle condition, warm natural light, professional photography, high quality" "cek-bekas.png" "1024x1024"

# 12. Trade-in handshake
gen "Happy Indonesian customer shaking hands with motorcycle dealer in front of new scooter in showroom, warm celebratory atmosphere, professional photography, high quality" "tradein.png" "1024x1024"

# 13. Helmet gear flatlay
gen "Flat lay of motorcycle riding gear, helmet gloves jacket, dark background with orange accents, professional product photography, high quality" "gear.png" "1024x1024"

# 14. Logo mark
gen "Minimalist emblem logo for motorcycle dealership, bold letter J integrated with motorcycle wheel and speed lines, red and gold on dark background, premium automotive badge style, vector-like clean design, high quality" "logo-jm.png" "1024x1024"

echo "ALL DONE"
