#!/bin/bash

# Создаем цикл для обработки каждого файла PNG в текущем каталоге
for file in *.png; do
    mkdir -p mobile
    # Проверяем, существует ли файл
    if [ -f "$file" ]; then
        # Получаем имя файла без расширения
        filename="${file%.*}"

        # Преобразуем файл в формат webp и изменяем размер
        magick convert "$file" -resize 1440 "${filename}.webp"
        magick convert "$file" -resize 425 "mobile/${filename}-425.webp"
    fi
done
