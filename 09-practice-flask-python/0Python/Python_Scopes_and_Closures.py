def counter():
    count = [0]  # Use a list to store the count
    
    def increment():
        count[0] += 1  # Modify the first element of the list
        print("Inside increment, count =", count[0])
    
    increment()
    print("After increment, count =", count[0])

counter()
