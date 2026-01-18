import csv
from datetime import datetime

# Define the CSV file name
csv_file = 'products.csv'

# Define the number of rows
num_rows = 10000

# Define the column names
fieldnames = ['name', 'description', 'price', 'supplier_id', 'created_at', 'modified_at', 'org_id']

# Open the CSV file for writing
with open(csv_file, mode='w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()

    # Generate and write the rows
    for i in range(1, num_rows + 1):
        writer.writerow({
            'name': 'Product {}'.format(i),
            'description': 'Description for Product {}'.format(i) if i % 2 == 0 else '',
            'price': round(10.0 + i * 0.1, 2),
            'supplier_id':  1,  # Random supplier_id between 1 and 10
            'created_at': datetime.utcnow().isoformat() + 'Z',
            'modified_at': datetime.utcnow().isoformat() + 'Z',
            'org_id': '51'
        })

print('{} rows written to {}'.format(num_rows, csv_file))
