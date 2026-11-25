#!/bin/bash
# Batch B - gambar pendukung
mkdir -p /home/z/my-project/public/images
cd /home/z/my-project/public/images

gen() {
  local prompt="$1" out="$2" size="$3"
  if [ -s "$out" ]; then echo "SKIP $out"; return; fi
  z-ai image -p "$prompt" -o "./$out" -s "$size" > /dev/null 2>&1 && echo "OK $out" || echo "FAIL $out"
}

gen "Studio product photo of a muscular large displacement naked streetfighter motorcycle, matte black with orange accents, side view, dark studio background with dramatic rim lighting, professional automotive photography, high quality" "motor-bigbike.png" "1024x1024"
gen "Studio product photo of a futuristic electric scooter motorcycle with LED light strip, white and teal colors, side view, dark studio background with cool ambient lighting, professional automotive product photography, high quality" "motor-elektrik.png" "1024x1024"
gen "Modern motorcycle showroom interior at night, rows of shiny new motorcycles on glossy dark floor, warm orange accent lighting, glass storefront, premium dealership atmosphere, cinematic wide angle photography, high quality" "showroom.png" "1344x768"
gen "Professional motorcycle mechanic in uniform servicing a motorcycle engine in a clean modern workshop, warm lighting, shallow depth of field, cinematic photography, high quality detailed" "service.png" "1024x1024"
gen "Close up of hands holding clipboard inspecting a clean well maintained used motorcycle, dealer evaluating second hand motorcycle condition, warm natural light, professional photography, high quality" "cek-bekas.png" "1024x1024"
gen "Happy Indonesian customer shaking hands with motorcycle dealer in front of new scooter in showroom, warm celebratory atmosphere, professional photography, high quality" "tradein.png" "1024x1024"
echo "BATCH B DONE"
