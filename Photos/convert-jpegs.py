#!/bin/env python3
from PIL import Image
from collections import deque
from multiprocessing import Process
import os

# import pillow_avif # pillow-avif-plugin for AVIF files

# Define base directory
directory = "Portraits"
base_dir = os.path.abspath(directory)  # Makes paths absolute

# Define subdirectories
input_dir = os.path.join(base_dir, "full-size-jpgs")
resized_dir = os.path.join(base_dir, "jpgs")
webp_dir = os.path.join(base_dir, "webps")
avif_dir = os.path.join(base_dir, "avifs")

# Ensure all necessary directories exist
for folder in [input_dir, resized_dir, webp_dir, avif_dir]:
    os.makedirs(folder, exist_ok=True)

# Multiprocessing queue
processes = deque()

# Resize images to 25% of their original resolution
for filename in os.listdir(input_dir):
    input_path = os.path.join(input_dir, filename)
    output_path = os.path.join(resized_dir, filename)

    image = Image.open(input_path)
    origsize = image.size
    newsize = (origsize[0], origsize[1]) # commented out size change for already small files
    
    newimage = image.resize(newsize)
    newimage.save(output_path)

# Convert resized images to WebP and AVIF using multiprocessing
for filename in os.listdir(resized_dir):
    input_path = os.path.join(resized_dir, filename)
    webp_path = os.path.join(webp_dir, f"{os.path.splitext(filename)[0]}.webp")
    avif_path = os.path.join(avif_dir, f"{os.path.splitext(filename)[0]}.avif")

    image = Image.open(input_path)

    # WebP Conversion
    im1 = image.copy()
    p = Process(target=im1.save, args=(webp_path, 'webp'), kwargs={"optimize": True, "quality": 85})
    processes.append(p)
    p.start()

    # AVIF Conversion
    im2 = image.copy()
    p = Process(target=im2.save, args=(avif_path, 'avif'), kwargs={"optimize": True, "quality": 90})
    processes.append(p)
    p.start()

# Wait for all image conversions to complete
for p in processes:
    p.join()