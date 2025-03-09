from math import e, isnan

user_input = input("Enter a number: ")

# if user_input.isdigit():
#     number = int(user_input)
#     if number % 2 == 0:
#         print("The number is even.")
#     else:
#         print("The number is odd.")
# else:
#     print("Invalid input. Please enter a number.")

try:
    isnan(int(user_input))
    arr = list(user_input)
    print(arr)
    # now sum the elements of the list
    sum = 0
    for i in arr:
        sum += int(i)
    print(sum)
except ValueError:
    print("Invalid input. Please enter a number.")