#!/bin/bash

# Скрипт оптимизации изображений для PageSpeed
# Запустить: chmod +x optimize-images.sh && ./optimize-images.sh

echo "🖼️  Оптимизация изображений для производительности..."

# Функция для сжатия PNG/JPG в WebP
optimize_images() {
  local dir=$1
  local quality=$2

  find "$dir" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) ! -name "*webp*" | while read -r file; do
    # Пропускаем, если уже есть webp версия
    if [ ! -f "${file%.*}.webp" ]; then
      echo "Converting: $file"

      # Используем imagemagick если доступен
      if command -v convert &> /dev/null; then
        convert "$file" -quality $quality "${file%.*}.webp"
      # Или cwebp если доступен
      elif command -v cwebp &> /dev/null; then
        cwebp -q $quality "$file" -o "${file%.*}.webp"
      fi
    fi
  done
}

# Оптимизировать все каталоги изображений
echo "Converting portfolio images..."
optimize_images "static/portfolio" 75

echo "Converting certificates images..."
optimize_images "static/certificates" 75

echo "Converting reviews images..."
optimize_images "static/reviews" 75

echo "Converting icons..."
optimize_images "static/icon" 85

echo "✅ Оптимизация завершена!"
echo "📝 Совет: Используйте WebP форматы в компонентах через <picture> теги"
