#!/bin/bash
# Batch A - gambar utama
mkdir -p /home/z/my-project/public/images
cd /home/z/my-project/public/images

gen() {
  local prompt="$1" out="$2" size="$3"
  if [ -s "$out" ]; then echo "SKIP $out"; return; fi
  z-ai image -p "$prompt" -o "./$out" -s "$size" > /dev/null 2>&1 && echo "OK $out" || echo "FAIL $out"
}

gen "Dramatic studio photograph of a modern red and black sport motorcycle, three-quarter front view, dark charcoal background with orange neon rim lighting, glossy reflections on floor, cinematic automotive photography, high quality, detailed" "hero-bike.png" "1440x720"
gen "Studio product photo of a modern red automatic scooter motorcycle, side view, clean dark studio background with warm amber lighting, professional automotive product photography, high quality" "motor-matic.png" "1024x1024"
gen "Studio product photo of a sleek racing sport motorcycle with full fairing in black and red livery, side view, dark studio background with dramatic red rim light, professional automotive photography, high quality detailed" "motor-sport.png" "1024x1024"
gen "Studio product photo of an Indonesian underbone cub motorcycle, blue and white colors, side view, clean dark studio background with soft amber lighting, professional automotive product photography, high quality" "motor-bebek.png" "1024x1024"
gen "Studio product photo of an enduro dirt trail motorcycle with knobby tires in green and white, side view, dark studio background with dramatic lighting, professional automotive photography, high quality detailed" "motor-trail.png" "1024x1024"
gen "Studio product photo of a retro classic style motorcycle with round headlamp, brown seat, cream and dark green tank, side view, dark studio background with warm golden lighting, professional automotive photography, high quality" "motor-retro.png" "1024x1024"
echo "BATCH A DONE"
