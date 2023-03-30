with open('restricteditems.csv',  encoding="utf8") as csv_file:
    data = csv_file.read()
lst = []

data = data.split("\n")
for i in range(1, len(data)-1):
    x = data[i].replace('\"', '')
    x=x.split(",")
    productname = x[0]
    chemicals = x[5].split(";")
    for j in range(len(chemicals)):
        if (chemicals[j].lower() not in lst):
            lst.append(chemicals[j].lower())
    if (productname.lower() not in lst):
        lst.append(productname.lower())

for i in range(len(lst)):
    print("'{}',".format(lst[i]))
    
    
    