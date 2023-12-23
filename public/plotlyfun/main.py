import csv
import json

# Replace 'data.txt' with your file name
input_file = 'stops.txt'
output_file = 'stops.json'

# Read the CSV and convert it into a list of dictionaries (one per row)
data = []
with open(input_file, mode='r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        data.append(row)

# Write the data to a JSON file
with open(output_file, mode='w', encoding='utf-8') as file:
    json.dump(data, file, indent=4)
